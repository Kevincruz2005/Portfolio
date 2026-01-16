import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }

        // Configure Nodemailer transporter
        // NOTE: You need to add these environment variables to your .env.local file
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your preferred provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `Resume Downloaded by ${name}`,
            text: `
                User Details:
                Name: ${name}
                Email: ${email}
                
                Time: ${new Date().toLocaleString()}
            `,
        };

        // Send email
        // Note: We don't await this or handle failure strictly to prevent blocking the download if email fails, 
        // but for a robust system you might want to log errors.
        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("Failed to send email notification:", emailError);
            // We still proceed to return success so the user can download the resume
        }

        return NextResponse.json({ success: true, message: 'Lead captured' });

    } catch (error) {
        console.error('Resume API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
