import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !contactEmail) {
      return NextResponse.json(
        { error: "The email channel is not configured yet. Please use GitHub or LinkedIn for now." },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const safeName = name.replace(/[\r\n]/g, " ");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: `"Kevin Cruz Portfolio" <${smtpUser}>`,
      to: contactEmail,
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
