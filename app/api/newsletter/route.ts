import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });

    // Notify the team
    await transporter.sendMail({
      from: `"Syberspace" <${process.env.GMAIL_USER}>`,
      to: "syberspace247@gmail.com",
      subject: "📬 New Newsletter Subscriber",
      text: `New subscriber: ${email}`,
    });

    // Welcome email to subscriber
    await transporter.sendMail({
      from: `"Syberspace" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to Syberspace Insights 🚀",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;padding:32px;border-radius:16px">
          <h2 style="color:#06b6d4;margin-bottom:8px">You're in! 🎉</h2>
          <p style="color:#94a3b8;line-height:1.6">Thanks for subscribing to Syberspace Insights. You'll receive practical AI tips, Nigerian business case studies, and early access to new tools.</p>
          <p style="color:#94a3b8;line-height:1.6">In the meantime, feel free to explore our services or book a <strong style="color:#e2e8f0">free AI audit</strong> to see exactly how AI can help your business.</p>
          <a href="https://syberspace.com.ng" style="display:inline-block;margin-top:20px;padding:12px 24px;background:linear-gradient(135deg,#06b6d4,#7c3aed);color:#fff;border-radius:8px;text-decoration:none;font-weight:600">Visit Syberspace →</a>
          <p style="margin-top:24px;font-size:12px;color:#475569">You can unsubscribe at any time by replying to this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
