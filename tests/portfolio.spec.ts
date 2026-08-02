import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "Thoughtful systems grow into reliable infrastructure." },
  { path: "/projects", heading: "Projects and experiments." },
  { path: "/about", heading: "Building software from the inside out." },
  { path: "/capabilities", heading: "What I use to build." },
  { path: "/contact", heading: "Send a direct message." },
];

const viewports = [
  { name: "small phone", width: 360, height: 800 },
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 720 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const route of routes) {
  test(`${route.path} exposes its primary content and shared navigation`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(route.heading);
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    await expect(page.locator("main")).toHaveAttribute("id", "main-content");
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });
}

for (const viewport of viewports) {
  test(`all routes avoid horizontal overflow at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of routes) {
      await page.goto(route.path);
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.scrollWidth, route.path).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    }
  });
}

test("project archive uses compact cards with GitHub as the only outbound action", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator(".project-archive-card")).toHaveCount(11);
  const links = page.locator(".project-archive-card > footer a");
  await expect(links).toHaveCount(11);
  for (let index = 0; index < (await links.count()); index += 1) {
    await expect(links.nth(index)).toHaveAttribute("href", /^https:\/\/github\.com\//);
  }
});

test("mobile navigation is keyboard dismissible and routes between pages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.locator('button[aria-controls="primary-navigation"]');
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: "Projects", exact: true })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("skip link receives first keyboard focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
});

test("résumé is a real PDF", async ({ request }) => {
  const response = await request.get("/Kevin_Cruz_Resume.pdf");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/pdf");
  const body = await response.body();
  expect(body.subarray(0, 4).toString()).toBe("%PDF");
});

test("all routes have no serious automated accessibility violations", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    expect(serious, route.path).toEqual([]);
  }
});

test("email contact restores the check-and-unlock flow", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ configured: true }),
      });
      return;
    }
    await route.continue();
  });
  await page.goto("/contact");
  await expect(page.getByText("Email delivery ready")).toBeVisible();
  const message = page.getByRole("textbox", { name: "Message", exact: true });
  await expect(message).toBeDisabled();

  await page.getByLabel("Name").fill("Recruiter Test");
  await page.getByLabel("Reply email").fill("recruiter@example.com");
  await page.getByRole("button", { name: "Verify email" }).click();

  await expect(message).toBeEnabled();
  await message.fill("A valid local test message that is not submitted.");
  await expect(page.getByRole("button", { name: "Send message" })).toBeEnabled();
});

test("contact page reports unavailable delivery without exposing server configuration", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByText("Email setup required").first()).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Message", exact: true })).toBeDisabled();
  await expect(page.getByRole("link", { name: /LinkedIn/ })).toBeVisible();
});

test("contact readiness endpoint reports a boolean", async ({ request }) => {
  const response = await request.get("/api/contact");
  expect(response.ok()).toBeTruthy();
  const body = (await response.json()) as { configured?: unknown };
  expect(typeof body.configured).toBe("boolean");
});

test("contact API rejects malformed input without sending email", async ({ request }) => {
  const response = await request.post("/api/contact", {
    data: { name: "", email: "invalid", message: "short" },
  });
  expect(response.status()).toBe(400);
});

test("home remains readable with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".calm-birds")).toHaveCSS("display", "none");
});

test("home uses a viewport stage inside an extended scroll story and loads its landscape", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const landscape = page.locator(".calm-landscape-image");
  await expect(landscape).toBeVisible();
  await expect
    .poll(() => landscape.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0))
    .toBe(true);

  const layout = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>(".calm-hero");
    const stage = document.querySelector<HTMLElement>(".calm-hero-stage");
    return {
      width: hero?.getBoundingClientRect().width,
      heroHeight: hero?.getBoundingClientRect().height,
      stageHeight: stage?.getBoundingClientRect().height,
      stagePosition: stage ? window.getComputedStyle(stage).position : null,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
    };
  });

  expect(layout.width).toBe(layout.viewportWidth);
  expect(layout.heroHeight).toBeGreaterThan(layout.viewportHeight * 1.5);
  expect(layout.stageHeight).toBe(layout.viewportHeight);
  expect(layout.stagePosition).toBe("sticky");
  expect(layout.documentWidth).toBe(layout.viewportWidth);
  expect(layout.documentHeight).toBeGreaterThan(layout.viewportHeight * 2);
});

test("project archive provides a static readable grid for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects");

  await expect(page.locator(".project-stack-card")).toHaveCount(11);
  await expect(page.locator(".project-stack-card").last()).toBeVisible();
  await expect(page.locator(".project-scroll-stage")).toHaveCSS("position", "relative");
});

test("mobile home keeps its content clear of the footer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const layout = await page.evaluate(() => {
    const copy = document.querySelector<HTMLElement>(".calm-hero-content");
    const footer = document.querySelector<HTMLElement>(".calm-home-footer");
    return {
      copyTop: copy?.getBoundingClientRect().top,
      copyBottom: copy?.getBoundingClientRect().bottom,
      footerTop: footer?.getBoundingClientRect().top,
    };
  });

  expect(layout.copyTop).toBeGreaterThan(300);
  expect(layout.footerTop).toBeGreaterThan((layout.copyBottom ?? 0) + 24);
  await expect(page.getByRole("link", { name: "Browse projects" })).toBeVisible();
});

test("core project content remains available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/projects");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".project-archive-card")).toHaveCount(11);
  await context.close();
});
