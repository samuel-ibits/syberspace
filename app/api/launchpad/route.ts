import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function safeLink(value: string) {
  if (!value) return "";
  const url = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : "";
  } catch { return ""; }
}

function row(label: string, value: string, link = "") {
  if (!value) return "";
  const displayed = link ? `<a href="${escapeHtml(link)}" style="color:#0891b2">${escapeHtml(value)}</a>` : escapeHtml(value);
  return `<tr><td style="padding:8px 12px 8px 0;color:#64748b;width:150px;vertical-align:top;font-size:14px">${escapeHtml(label)}</td><td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600">${displayed}</td></tr>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (clean(body.companyWebsite)) return NextResponse.json({ success: true });

    const data = {
      name: clean(body.name, 100), businessName: clean(body.businessName, 140), phone: clean(body.phone, 40),
      email: clean(body.email, 160).toLowerCase(), category: clean(body.category, 100), location: clean(body.location, 160),
      description: clean(body.description, 1500), website: clean(body.website, 250), instagram: clean(body.instagram, 250),
      facebook: clean(body.facebook, 250), tiktok: clean(body.tiktok, 250), otherSocial: clean(body.otherSocial, 250),
      challenge: clean(body.challenge, 2000), outcome: clean(body.outcome, 2000), referral: clean(body.referral, 100),
      additional: clean(body.additional, 1500), acceptTerms: clean(body.acceptTerms, 10), consent: clean(body.consent, 10),
    };

    const requiredText = [data.name, data.businessName, data.phone, data.category, data.location, data.description, data.challenge, data.outcome];
    if (requiredText.some((value) => !value) || !emailPattern.test(data.email) || data.description.length < 20 || data.challenge.length < 20 || data.outcome.length < 20 || data.acceptTerms !== "yes" || data.consent !== "yes") {
      return NextResponse.json({ error: "Please complete all required fields with valid information." }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    if (!gmailUser || !gmailPassword) return NextResponse.json({ error: "Email delivery is temporarily unavailable. Please email syberspace247@gmail.com." }, { status: 503 });

    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: gmailUser, pass: gmailPassword } });
    const socialRows = [
      row("Website", data.website, safeLink(data.website)), row("Instagram", data.instagram, safeLink(data.instagram)),
      row("Facebook", data.facebook, safeLink(data.facebook)), row("TikTok", data.tiktok, safeLink(data.tiktok)),
      row("Other social", data.otherSocial, safeLink(data.otherSocial)),
    ].join("");

    await transporter.sendMail({
      from: `"Syberspace Business Launchpad" <${gmailUser}>`, to: "syberspace247@gmail.com", replyTo: data.email,
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
          <p style="margin:20px 0 0;font-size:12px;color:#94a3b8">Terms accepted · Processing consent provided · Submitted from syberspacesolutions.live/launchpad</p>
        </div></div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/launchpad] Submission error:", error);
    return NextResponse.json({ error: "We could not send your application. Please try again or email us directly." }, { status: 500 });
  }
}
