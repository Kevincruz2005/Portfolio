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

export async function GET() {
  return NextResponse.json(
    { configured: Boolean(getMailConfiguration()) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    const website = typeof payload.website === "string" ? payload.website.trim() : "";

    if (website) {
      return NextResponse.json({ success: true });
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
        { status: 400 },
      );
    }

    const mail = getMailConfiguration();

    if (!mail) {
      return NextResponse.json(
        { error: `Email delivery is being configured. Contact me at ${profile.email}.` },
        { status: 503 },
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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "The message could not be sent. Please try again." },
      { status: 500 },
    );
  }
}
