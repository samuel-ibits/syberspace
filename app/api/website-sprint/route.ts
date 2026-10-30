import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { safeWebsiteSprintUrl, validateWebsiteSprintSubmission } from "@/lib/website-sprint-validation";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 50_000;

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function row(label: string, value: string, link = "") {
  if (!value) return "";
  const displayed = link ? `<a href="${escapeHtml(link)}" style="color:#0891b2">${escapeHtml(value)}</a>` : escapeHtml(value);
  return `<tr><td style="padding:8px 12px 8px 0;color:#64748b;width:180px;vertical-align:top;font-size:14px">${escapeHtml(label)}</td><td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600">${displayed}</td></tr>`;
}

function panel(label: string, value: string) {
  if (!value) return "";
  return `<div style="margin-top:14px;padding:18px;background:white;border:1px solid #e2e8f0;border-radius:10px"><p style="margin:0 0 8px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px">${escapeHtml(label)}</p><p style="margin:0;white-space:pre-wrap;line-height:1.6;font-size:14px">${escapeHtml(value)}</p></div>`;
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID().slice(0, 8);

  try {
    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return NextResponse.json({ error: "This form requires a JSON request.", requestId }, { status: 415 });
    }

    const declaredSize = Number(request.headers.get("content-length") || 0);
    if (Number.isFinite(declaredSize) && declaredSize > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "The request is too large. Shorten the responses and try again.", requestId }, { status: 413 });
    }

    let body: unknown;
    try {
      const rawBody = await request.text();
      if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
        return NextResponse.json({ error: "The request is too large. Shorten the responses and try again.", requestId }, { status: 413 });
      }
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "The request could not be read. Refresh the page and try again.", requestId }, { status: 400 });
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "The request format is invalid.", requestId }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    if (typeof input.companyWebsite === "string" && input.companyWebsite.trim()) {
      return NextResponse.json({ success: true });
    }

    const { data, fieldErrors } = validateWebsiteSprintSubmission(input);
    if (Object.keys(fieldErrors).length) {
      return NextResponse.json({ error: "Please correct the highlighted fields.", fieldErrors, requestId }, { status: 422 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    if (!gmailUser || !gmailPassword) {
      console.error(`[/api/website-sprint:${requestId}] Gmail credentials are unavailable.`);
      return NextResponse.json({ error: "Email delivery is temporarily unavailable. Please email syberspace247@gmail.com.", requestId }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPassword },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    try {
      await transporter.sendMail({
        from: `"Syberspace Fashion & Beauty ₦50K Sprint" <${gmailUser}>`,
        to: "syberspace247@gmail.com",
        replyTo: data.email,
        subject: `💼 Qualified ₦50K website lead — ${data.businessName} (${data.projectType})`,
        text: [
          "NEW ₦50K WEBSITE SPRINT LEAD", "", `Applicant: ${data.name}`, `Business / project: ${data.businessName}`,
          `Phone / WhatsApp: ${data.phone}`, `Email: ${data.email}`, `Category: ${data.category}`, `Location: ${data.location}`,
          `Project type: ${data.projectType}`, `Timeline: ${data.timeline}`, `Content ready: ${data.contentReady}`,
          "Decision-maker: Yes", "₦50,000 commitment: Yes", data.currentWebsite && `Current website: ${data.currentWebsite}`,
          "", "BUSINESS OR IDEA", data.businessDescription, "", "PROJECT GOAL", data.projectGoal,
          data.requiredFeatures && "", data.requiredFeatures && "REQUESTED FEATURES", data.requiredFeatures,
          data.referral && "", data.referral && `Referral source: ${data.referral}`,
          data.additional && `Additional information: ${data.additional}`, "", "Terms accepted: Yes", "Processing consent: Yes",
          `Reference: ${requestId}`,
        ].filter(Boolean).join("\n"),
        html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#0f172a">
          <div style="padding:24px;background:#0891b2;border-radius:14px 14px 0 0;color:white"><p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px">Syberspace Fashion &amp; Beauty ₦50K Website Sprint</p><h1 style="margin:0;font-size:22px">New qualified project lead</h1></div>
          <div style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 14px 14px">
            <div style="padding:14px 18px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:10px;color:#155e75;font-weight:700">Confirmed: decision-maker and ready to invest ₦50,000 if the proposed direction fits.</div>
            <h2 style="font-size:16px;margin:24px 0 10px">Contact and project</h2><table style="width:100%;border-collapse:collapse">${row("Full name", data.name)}${row("Business / project", data.businessName)}${row("Phone / WhatsApp", data.phone)}${row("Email", data.email, `mailto:${data.email}`)}${row("Category", data.category)}${row("Location", data.location)}${row("Project type", data.projectType)}${row("Preferred timeline", data.timeline)}${row("Content readiness", data.contentReady)}${row("Current website", data.currentWebsite, safeWebsiteSprintUrl(data.currentWebsite))}${row("Referral source", data.referral)}</table>
            ${panel("Business or idea", data.businessDescription)}${panel("Project goal", data.projectGoal)}${panel("Requested features", data.requiredFeatures)}${panel("Additional context", data.additional)}
            <p style="margin:20px 0 0;font-size:12px;color:#94a3b8">Terms accepted · Processing consent provided · Reference ${requestId}</p>
          </div></div>`,
      });
    } catch (emailError) {
      console.error(`[/api/website-sprint:${requestId}] Email delivery failed:`, emailError);
      return NextResponse.json({ error: "We could not deliver your request. Please try again or email syberspace247@gmail.com.", requestId }, { status: 502 });
    }

    return NextResponse.json({ success: true, requestId });
  } catch (error) {
    console.error(`[/api/website-sprint:${requestId}] Unexpected submission error:`, error);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again or email syberspace247@gmail.com.", requestId }, { status: 500 });
  }
}
