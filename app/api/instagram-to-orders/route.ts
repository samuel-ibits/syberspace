import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateInstagramToOrdersSubmission } from "@/lib/instagram-to-orders-validation";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 20_000;

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID().slice(0, 8);

  try {
    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return NextResponse.json({ error: "This form requires a JSON request.", requestId }, { status: 415 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "The request is too large.", requestId }, { status: 413 });
    }

    let body: unknown;
    try { body = JSON.parse(rawBody); } catch {
      return NextResponse.json({ error: "The request could not be read. Refresh and try again.", requestId }, { status: 400 });
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "The request format is invalid.", requestId }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    if (typeof input.companyWebsite === "string" && input.companyWebsite.trim()) return NextResponse.json({ success: true });

    const { data, fieldErrors } = validateInstagramToOrdersSubmission(input);
    if (Object.keys(fieldErrors).length) {
      return NextResponse.json({ error: "Please correct the highlighted fields.", fieldErrors, requestId }, { status: 422 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    if (!gmailUser || !gmailPassword) {
      console.error(`[/api/instagram-to-orders:${requestId}] Gmail credentials are unavailable.`);
      return NextResponse.json({ error: "Email delivery is temporarily unavailable. Please email syberspace247@gmail.com.", requestId }, { status: 503 });
    }

    const readinessLabel = data.investmentReadiness === "ready" ? "Ready to invest ₦50,000" : data.investmentReadiness === "payment-plan" ? "Interested in ₦25,000 / ₦25,000 payment arrangement" : "Researching only";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPassword },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    try {
      await transporter.sendMail({
        from: `"Instagram-to-Orders Lead" <${gmailUser}>`,
        to: "syberspace247@gmail.com",
        replyTo: data.email || gmailUser,
        subject: `✨ Website Sales Plan lead — @${data.instagramHandle} (${readinessLabel})`,
        text: [
          "NEW INSTAGRAM-TO-ORDERS LEAD", "", `Name: ${data.name}`, `WhatsApp: ${data.phone}`,
          data.email && `Email: ${data.email}`, `Instagram: @${data.instagramHandle}`, `Category: ${data.category}`,
          `Investment readiness: ${readinessLabel}`, "Consent: Yes", `Reference: ${requestId}`,
        ].filter(Boolean).join("\n"),
        html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0f172a"><div style="padding:24px;background:#0891b2;color:white;border-radius:14px 14px 0 0"><p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px">Instagram-to-Orders Website Sprint</p><h1 style="margin:0;font-size:22px">New Website Sales Plan lead</h1></div><div style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 14px 14px"><p style="margin:0 0 18px;padding:14px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:10px;color:#155e75;font-weight:700">${escapeHtml(readinessLabel)}</p><p><strong>Name:</strong> ${escapeHtml(data.name)}</p><p><strong>WhatsApp:</strong> ${escapeHtml(data.phone)}</p>${data.email ? `<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>` : ""}<p><strong>Instagram:</strong> <a href="https://instagram.com/${encodeURIComponent(data.instagramHandle)}">@${escapeHtml(data.instagramHandle)}</a></p><p><strong>Category:</strong> ${escapeHtml(data.category)}</p><p style="margin-top:20px;font-size:12px;color:#94a3b8">Consent provided · Reference ${requestId}</p></div></div>`,
      });
    } catch (emailError) {
      console.error(`[/api/instagram-to-orders:${requestId}] Email delivery failed:`, emailError);
      return NextResponse.json({ error: "We could not deliver your request. Please try again or message Syberspace directly.", requestId }, { status: 502 });
    }

    return NextResponse.json({ success: true, requestId });
  } catch (error) {
    console.error(`[/api/instagram-to-orders:${requestId}] Unexpected submission error:`, error);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again.", requestId }, { status: 500 });
  }
}
