import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* Send a WhatsApp notification via CallMeBot (free) */
async function notifyWhatsApp(text: string) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  const phone  = process.env.WHATSAPP_NOTIFY_NUMBER ?? "2348151519625";
  if (!apiKey) return;
  try {
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${apiKey}`,
    );
  } catch { /* non-critical, never throw */ }
}

export async function POST(req: NextRequest) {
  const { name, email, contact, service, message } = await req.json();
  const replyContact = String(contact || email || "").trim();
  const replyContactIsEmail = isValidEmail(replyContact);

  if (!name || !replyContact || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const isHumanRequest = service === "Human Agent Request";

  await transporter.sendMail({
    from: `"Syberspace Website" <${process.env.GMAIL_USER}>`,
    to: "syberspace247@gmail.com",
    replyTo: replyContactIsEmail ? replyContact : undefined,
    subject: `${isHumanRequest ? "🔴 LIVE REP REQUESTED" : "New Enquiry"}${service ? ` — ${service}` : ""} from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <div style="background:${isHumanRequest ? "linear-gradient(135deg,#ef4444,#dc2626)" : "linear-gradient(135deg,#06b6d4,#7c3aed)"};padding:20px 24px;border-radius:8px 8px 0 0">
          <h2 style="color:#fff;margin:0;font-size:20px">${isHumanRequest ? "🔴 Live Rep Requested" : "New Website Enquiry"}</h2>
        </div>
        <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6b7280;width:120px;font-size:14px">Name</td><td style="padding:8px 0;font-weight:600;font-size:14px">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">${isHumanRequest ? "Contact" : "Email"}</td><td style="padding:8px 0;font-size:14px">${replyContactIsEmail ? `<a href="mailto:${replyContact}" style="color:#06b6d4">${replyContact}</a>` : replyContact}</td></tr>
            ${service ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Service</td><td style="padding:8px 0;font-size:14px">${service}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p style="color:#374151;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</p>
          ${isHumanRequest ? `
          <div style="margin-top:16px;padding:12px 16px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px">
            <p style="color:#dc2626;font-weight:600;margin:0 0 6px">Action needed — reply to this client directly:</p>
            ${replyContactIsEmail ? `<a href="mailto:${replyContact}" style="color:#06b6d4">${replyContact}</a>` : `<span style="color:#111827">${replyContact}</span>`}
          </div>` : ""}
        </div>
        <p style="font-size:12px;color:#9ca3af;text-align:center;margin-top:16px">Sent via syberspace.com.ng</p>
      </div>
    `,
  });

  /* WhatsApp alert for human agent requests */
  if (isHumanRequest) {
    const waText = `🔴 LIVE REP REQUEST\n\nName: ${name}\nContact: ${replyContact}\nIssue: ${message.replace("HUMAN AGENT REQUEST\n", "").trim()}\n\nReply to them directly.`;
    await notifyWhatsApp(waText);
  }

  return NextResponse.json({ success: true });
}
