import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string, link?: string) {
  if (!value) return "";
  const displayValue = link
    ? `<a href="${escapeHtml(link)}" style="color:#0891b2">${escapeHtml(value)}</a>`
    : escapeHtml(value);
  return `<tr><td style="padding:8px 12px 8px 0;color:#64748b;width:145px;vertical-align:top;font-size:14px">${escapeHtml(label)}</td><td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600">${displayValue}</td></tr>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Quietly accept bot submissions without sending mail.
    if (clean(body.companyWebsite)) return NextResponse.json({ success: true });

    const submission = {
      name: clean(body.name, 100),
      email: clean(body.email, 160).toLowerCase(),
      phone: clean(body.phone, 40),
      company: clean(body.company, 120),
      website: clean(body.website, 250),
      goal: clean(body.goal, 120),
      timeline: clean(body.timeline, 80),
      budget: clean(body.budget, 80),
      details: clean(body.details, 3000),
      consent: clean(body.consent, 10),
    };

    if (!submission.name || !emailPattern.test(submission.email) || !submission.goal || !submission.timeline || submission.details.length < 20 || submission.consent !== "yes") {
      return NextResponse.json({ error: "Please complete all required fields with valid information." }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    if (!gmailUser || !gmailPassword) {
      console.error("[/api/launchpad] Gmail credentials are not configured.");
      return NextResponse.json({ error: "Email delivery is temporarily unavailable. Please email syberspace247@gmail.com." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPassword },
    });

    const websiteHref = submission.website
      ? (/^https?:\/\//i.test(submission.website) ? submission.website : `https://${submission.website}`)
      : "";

    await transporter.sendMail({
      from: `"Syberspace Launchpad" <${gmailUser}>`,
      to: "syberspace247@gmail.com",
      replyTo: submission.email,
      subject: `🚀 Launchpad request — ${submission.goal} from ${submission.name}`,
      text: [
        "New Syberspace Launchpad submission",
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        submission.phone && `Phone / WhatsApp: ${submission.phone}`,
        submission.company && `Company: ${submission.company}`,
        submission.website && `Website: ${submission.website}`,
        `Project type: ${submission.goal}`,
        `Timeline: ${submission.timeline}`,
        submission.budget && `Budget: ${submission.budget}`,
        "",
        "Project details:",
        submission.details,
      ].filter(Boolean).join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#0f172a">
          <div style="padding:24px;background:linear-gradient(135deg,#06b6d4,#7c3aed);border-radius:14px 14px 0 0;color:white">
            <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px">Syberspace AI Launchpad</p>
            <h1 style="margin:0;font-size:22px">New project request</h1>
          </div>
          <div style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 14px 14px">
            <table style="width:100%;border-collapse:collapse">
              ${row("Name", submission.name)}
              ${row("Email", submission.email, `mailto:${submission.email}`)}
              ${row("Phone / WhatsApp", submission.phone)}
              ${row("Company", submission.company)}
              ${row("Website", submission.website, websiteHref)}
              ${row("Project type", submission.goal)}
              ${row("Timeline", submission.timeline)}
              ${row("Budget", submission.budget)}
            </table>
            <div style="margin-top:20px;padding:18px;background:white;border:1px solid #e2e8f0;border-radius:10px">
              <p style="margin:0 0 8px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px">Project details</p>
              <p style="margin:0;white-space:pre-wrap;line-height:1.6;font-size:14px">${escapeHtml(submission.details)}</p>
            </div>
            <p style="margin:18px 0 0;font-size:12px;color:#94a3b8">Submitted from syberspacesolutions.live/launchpad</p>
          </div>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/launchpad] Submission error:", error);
    return NextResponse.json({ error: "We could not send your request. Please try again or email us directly." }, { status: 500 });
  }
}
