import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }


        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"${name} <${email}>" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL,
            replyTo: email,
            subject: `Portfolio Message: ${name}`,
            text: message,
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h3 style="color: #4CAF50;">New Contact Form Submission</h3>
                <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
                <hr style="border: 1px solid #eee; margin: 20px 0;">
                <p style="white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to send email" },
            { status: 500 }
        );
    }
}
