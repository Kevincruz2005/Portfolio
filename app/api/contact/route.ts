import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { profile } from "@/lib/data";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getMailConfiguration = () => {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_EMAIL?.trim() || user;

  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !pass || !recipient) {
    return null;
  }

  return { host, port, user, pass, recipient };
};

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const globalRateLimit = globalThis as typeof globalThis & {
  contactRateLimit?: Map<string, RateLimitEntry>;
};
const rateLimitMap = globalRateLimit.contactRateLimit ?? new Map<string, RateLimitEntry>();
globalRateLimit.contactRateLimit = rateLimitMap;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const checkRateLimit = (ip: string) => {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetTime - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
};

export async function GET() {
  return NextResponse.json(
    { configured: Boolean(getMailConfiguration()) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : request.headers.get("x-real-ip") || "127.0.0.1";

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait before trying again." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > 16_384) {
      return NextResponse.json(
        { error: "The message is too large." },
        { status: 413, headers: { "Cache-Control": "no-store" } },
      );
    }

    let payload: Record<string, unknown>;
    try {
      payload = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { error: "Send a valid JSON request." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    const website = typeof payload.website === "string" ? payload.website.trim() : "";

    if (website) {
      return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
    }

    if (
      name.length < 2 ||
      name.length > 100 ||
      email.length > 254 ||
      !EMAIL_PATTERN.test(email) ||
      message.length < 10 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "Enter a valid name, reply email and message." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    const mail = getMailConfiguration();

    if (!mail) {
      return NextResponse.json(
        { error: `Email delivery is being configured. Contact me at ${profile.email}.` },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    const transporter = nodemailer.createTransport({
      host: mail.host,
      port: mail.port,
      secure: mail.port === 465,
      auth: { user: mail.user, pass: mail.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    const safeName = name.replace(/[\r\n]/g, " ");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: `"${profile.name} Portfolio" <${mail.user}>`,
      to: mail.recipient,
      replyTo: email,
      subject: `Portfolio message from ${safeName}`,
      text: `${message}\n\nFrom: ${name} <${email}>`,
      html: `<p>${safeMessage}</p><hr /><p>From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    });

    return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(
      { error: "The message could not be sent. Please try again." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
