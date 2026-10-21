import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { safeHttpUrl, validateLaunchpadSubmission } from "@/lib/launchpad-validation";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 60_000;

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function row(label: string, value: string, link = "") {
  if (!value) return "";
  const displayed = link ? `<a href="${escapeHtml(link)}" style="color:#0891b2">${escapeHtml(value)}</a>` : escapeHtml(value);
  return `<tr><td style="padding:8px 12px 8px 0;color:#64748b;width:150px;vertical-align:top;font-size:14px">${escapeHtml(label)}</td><td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600">${displayed}</td></tr>`;
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID().slice(0, 8);

  try {
    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return NextResponse.json({ error: "This form requires a JSON request.", requestId }, { status: 415 });
    }

    const declaredSize = Number(request.headers.get("content-length") || 0);
    if (Number.isFinite(declaredSize) && declaredSize > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "The application is too large. Shorten the responses and try again.", requestId }, { status: 413 });
    }

    let body: unknown;
    try {
      const rawBody = await request.text();
      if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
        return NextResponse.json({ error: "The application is too large. Shorten the responses and try again.", requestId }, { status: 413 });
      }
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "The application could not be read. Refresh the page and try again.", requestId }, { status: 400 });
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "The application format is invalid.", requestId }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    if (typeof input.companyWebsite === "string" && input.companyWebsite.trim()) {
      return NextResponse.json({ success: true });
    }

    const { data, fieldErrors } = validateLaunchpadSubmission(input);
    if (Object.keys(fieldErrors).length) {
      return NextResponse.json({ error: "Please correct the highlighted fields.", fieldErrors, requestId }, { status: 422 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    if (!gmailUser || !gmailPassword) {
      console.error(`[/api/launchpad:${requestId}] Gmail credentials are unavailable.`);
      return NextResponse.json({ error: "Email delivery is temporarily unavailable. Please email syberspace247@gmail.com.", requestId }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPassword },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    const socialRows = [
      row("Website", data.website, safeHttpUrl(data.website)),
      row("Instagram", data.instagram, safeHttpUrl(data.instagram)),
      row("Facebook", data.facebook, safeHttpUrl(data.facebook)),
      row("TikTok", data.tiktok, safeHttpUrl(data.tiktok)),
      row("Other social", data.otherSocial, safeHttpUrl(data.otherSocial)),
    ].join("");

    try {
      await transporter.sendMail({
        from: `"Syberspace Business Launchpad" <${gmailUser}>`,
        to: "syberspace247@gmail.com",
        replyTo: data.email,
        subject: `🚀 Business Launchpad application — ${data.businessName} (${data.category})`,
        text: [
          "NEW BUSINESS LAUNCHPAD APPLICATION", "", `Applicant: ${data.name}`, `Business: ${data.businessName}`,
          `Phone / WhatsApp: ${data.phone}`, `Email: ${data.email}`, `Category: ${data.category}`, `Location: ${data.location}`,
          "", "BUSINESS DESCRIPTION", data.description, "", "ONLINE PRESENCE",
          data.website && `Website: ${data.website}`, data.instagram && `Instagram: ${data.instagram}`,
          data.facebook && `Facebook: ${data.facebook}`, data.tiktok && `TikTok: ${data.tiktok}`,
          data.otherSocial && `Other: ${data.otherSocial}`, "", "MAIN CHALLENGE", data.challenge,
          "", "DESIRED OUTCOME", data.outcome, "", data.referral && `Referral source: ${data.referral}`,
          data.additional && `Additional information: ${data.additional}`, "", "Terms accepted: Yes", "Processing consent: Yes",
        ].filter(Boolean).join("\n"),
        html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#0f172a">
          <div style="padding:24px;background:#0891b2;border-radius:14px 14px 0 0;color:white"><p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px">Syberspace Business Launchpad</p><h1 style="margin:0;font-size:22px">New application</h1></div>
          <div style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 14px 14px">
            <h2 style="font-size:16px;margin:0 0 10px">Applicant and business</h2><table style="width:100%;border-collapse:collapse">${row("Full name", data.name)}${row("Business name", data.businessName)}${row("Phone / WhatsApp", data.phone)}${row("Email", data.email, `mailto:${data.email}`)}${row("Category", data.category)}${row("Location", data.location)}</table>
            <div style="margin-top:20px;padding:18px;background:white;border:1px solid #e2e8f0;border-radius:10px"><p style="margin:0 0 8px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px">Business description</p><p style="margin:0;white-space:pre-wrap;line-height:1.6;font-size:14px">${escapeHtml(data.description)}</p></div>
            ${socialRows ? `<h2 style="font-size:16px;margin:24px 0 10px">Online presence</h2><table style="width:100%;border-collapse:collapse">${socialRows}</table>` : ""}
            <div style="margin-top:20px;padding:18px;background:white;border:1px solid #e2e8f0;border-radius:10px"><p style="margin:0 0 8px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px">Main challenge</p><p style="margin:0;white-space:pre-wrap;line-height:1.6;font-size:14px">${escapeHtml(data.challenge)}</p></div>
            <div style="margin-top:14px;padding:18px;background:white;border:1px solid #e2e8f0;border-radius:10px"><p style="margin:0 0 8px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px">Desired outcome</p><p style="margin:0;white-space:pre-wrap;line-height:1.6;font-size:14px">${escapeHtml(data.outcome)}</p></div>
            ${data.referral || data.additional ? `<h2 style="font-size:16px;margin:24px 0 10px">Additional information</h2><table style="width:100%;border-collapse:collapse">${row("Referral source", data.referral)}</table>${data.additional ? `<p style="font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.additional)}</p>` : ""}` : ""}
            <p style="margin:20px 0 0;font-size:12px;color:#94a3b8">Terms accepted · Processing consent provided · Reference ${requestId}</p>
          </div></div>`,
      });
    } catch (emailError) {
      console.error(`[/api/launchpad:${requestId}] Email delivery failed:`, emailError);
      return NextResponse.json({ error: "We could not deliver your application. Please try again or email syberspace247@gmail.com.", requestId }, { status: 502 });
    }

    return NextResponse.json({ success: true, requestId });
  } catch (error) {
    console.error(`[/api/launchpad:${requestId}] Unexpected submission error:`, error);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again or email syberspace247@gmail.com.", requestId }, { status: 500 });
  }
}
