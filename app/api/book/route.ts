import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import crypto from "crypto";

/* ── Parse preferred-time string into an absolute Date ── */
function parseRequestedTime(time: string): Date {
  const now = new Date();
  const direct = new Date(time);
  if (!isNaN(direct.getTime()) && direct > now) return direct;

  /* fallback: next business day 10am WAT (UTC+1) */
  const d = new Date(now);
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  d.setUTCHours(9, 0, 0, 0);
  return d;
}

/* ── Date → ICS timestamp ── */
function icsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/* ── Build RFC 5545 calendar invite ── */
function buildICS(opts: {
  uid: string;
  summary: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
  organiserEmail: string;
  attendeeEmail: string;
  attendeeName: string;
}) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Syberspace//AI Consultation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${opts.uid}`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(opts.start)}`,
    `DTEND:${icsDate(opts.end)}`,
    `SUMMARY:${opts.summary}`,
    `DESCRIPTION:${opts.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${opts.location}`,
    `ORGANIZER;CN=Syberspace:mailto:${opts.organiserEmail}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;RSVP=TRUE;CN=${opts.attendeeName}:mailto:${opts.attendeeEmail}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Syberspace consultation starts in 30 minutes",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT1440M",
    "ACTION:EMAIL",
    "DESCRIPTION:Reminder: Syberspace consultation tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/* ── Try to create a Google Calendar event with Meet link ── */
async function createCalendarEvent(params: {
  name: string;
  email: string;
  service: string;
  time: string;
  start: Date;
  end: Date;
}): Promise<{ meetLink: string | null; eventLink: string | null }> {
  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_CALENDAR_ID,
  } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    return { meetLink: null, eventLink: null };
  }

  const auth = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

  const calendar = google.calendar({ version: "v3", auth });

  const event = await calendar.events.insert({
    calendarId: GOOGLE_CALENDAR_ID ?? "primary",
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: `Syberspace Consultation — ${params.name}`,
      description: [
        `Client: ${params.name}`,
        `Email: ${params.email}`,
        `Service: ${params.service}`,
        `Preferred time: ${params.time}`,
        "",
        "⚠️ Placeholder slot — reschedule to client's preferred time if needed.",
      ].join("\n"),
      start: { dateTime: params.start.toISOString(), timeZone: "Africa/Lagos" },
      end:   { dateTime: params.end.toISOString(),   timeZone: "Africa/Lagos" },
      attendees: [
        { email: "syberspace247@gmail.com", displayName: "Syberspace" },
        { email: params.email, displayName: params.name },
      ],
      conferenceData: {
        createRequest: {
          requestId: `syber-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email",  minutes: 60 * 24 },
          { method: "popup",  minutes: 30 },
        ],
      },
    },
  });

  const meetLink =
    event.data.conferenceData?.entryPoints?.find(
      (e) => e.entryPointType === "video",
    )?.uri ?? null;
  const eventLink = event.data.htmlLink ?? null;

  return { meetLink, eventLink };
}

export async function POST(req: NextRequest) {
  const { name, email, service, time } = (await req.json()) as {
    name: string;
    email: string;
    service: string;
    time: string;
  };

  const start = parseRequestedTime(time);
  const end   = new Date(start.getTime() + 60 * 60 * 1000);

  /* ── 1. Try Google Calendar → fall back to Jitsi ── */
  let meetLink: string | null = null;
  let eventLink: string | null = null;
  let usingGoogle = false;

  try {
    const result = await createCalendarEvent({ name, email, service, time, start, end });
    meetLink  = result.meetLink;
    eventLink = result.eventLink;
    usingGoogle = !!meetLink;
  } catch (err) {
    console.error("[/api/book] Google Calendar error:", err);
  }

  /* Fallback: Jitsi room */
  if (!meetLink) {
    const roomId = crypto.randomBytes(5).toString("hex");
    meetLink = `https://meet.jit.si/Syberspace-${roomId}`;
  }

  /* ── 2. Build ICS calendar invite ── */
  const uid = `syber-${crypto.randomBytes(5).toString("hex")}@syberspace.com.ng`;

  const icsContent = buildICS({
    uid,
    summary: `Syberspace AI Consultation — ${name}`,
    description: [
      `Hi ${name},`,
      ``,
      `Your free AI consultation with Syberspace is confirmed.`,
      ``,
      `Service: ${service}`,
      `Requested time: ${time}`,
      ``,
      `Join the video call: ${meetLink}`,
      ``,
      `Questions? Email syberspace247@gmail.com or WhatsApp +234 815 151 9625`,
    ].join("\n"),
    location: meetLink,
    start,
    end,
    organiserEmail: process.env.GMAIL_USER ?? "syberspace247@gmail.com",
    attendeeEmail: email,
    attendeeName: name,
  });

  const icsAttachment = {
    filename: "syberspace-consultation.ics",
    content: icsContent,
    contentType: "text/calendar; charset=utf-8; method=REQUEST",
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  const videoLabel = usingGoogle ? "Google Meet" : "Video Call";
  const calRow = eventLink
    ? `<p style="margin-top:12px;font-size:13px"><a href="${eventLink}" style="color:#7c3aed">View in Google Calendar →</a></p>`
    : "";

  /* ── 3. Team notification ── */
  try {
    await transporter.sendMail({
      from: `"Syberspace" <${process.env.GMAIL_USER}>`,
      to: "syberspace247@gmail.com",
      replyTo: email,
      subject: `New Consultation Booking — ${name} (${service})`,
      attachments: [icsAttachment],
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <div style="background:linear-gradient(135deg,#06b6d4,#7c3aed);padding:20px 24px;border-radius:8px 8px 0 0">
            <h2 style="color:#fff;margin:0">New Consultation Booking</h2>
          </div>
          <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;width:130px;font-size:14px">Name</td><td style="padding:8px 0;font-weight:600;font-size:14px">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#06b6d4">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Service</td><td style="padding:8px 0;font-size:14px">${service}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Preferred time</td><td style="padding:8px 0;font-size:14px">${time}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">${videoLabel}</td><td style="padding:8px 0;font-size:14px"><a href="${meetLink}" style="color:#06b6d4">${meetLink}</a></td></tr>
            </table>
            ${calRow}
            <p style="margin-top:16px;font-size:13px;color:#6b7280">📅 Calendar invite (.ics) attached.</p>
          </div>
        </div>`,
    });
  } catch (err) {
    console.error("[/api/book] Team email error:", err);
  }

  /* ── 4. Client confirmation ── */
  try {
    await transporter.sendMail({
      from: `"Syberspace" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Your Syberspace Consultation is Booked ✅`,
      attachments: [icsAttachment],
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <div style="background:linear-gradient(135deg,#06b6d4,#7c3aed);padding:20px 24px;border-radius:8px 8px 0 0">
            <h2 style="color:#fff;margin:0">Consultation Booked!</h2>
          </div>
          <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
            <p style="color:#374151;font-size:15px">Hi <strong>${name}</strong>, your free AI consultation with Syberspace is confirmed.</p>
            <table style="width:100%;border-collapse:collapse;margin:16px 0">
              <tr><td style="padding:8px 0;color:#6b7280;width:130px;font-size:14px">Service</td><td style="padding:8px 0;font-size:14px">${service}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Requested time</td><td style="padding:8px 0;font-size:14px">${time}</td></tr>
            </table>
            <div style="text-align:center;margin:24px 0">
              <a href="${meetLink}" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#06b6d4,#7c3aed);color:#fff;font-weight:700;border-radius:50px;text-decoration:none;font-size:15px">Join ${videoLabel}</a>
            </div>
            <div style="padding:12px 16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;margin-bottom:16px">
              <p style="color:#166534;font-size:13px;margin:0">📅 <strong>Calendar invite attached</strong> — open the .ics file to add this to Google Calendar, Outlook, or Apple Calendar.</p>
            </div>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
            <p style="color:#6b7280;font-size:13px">Questions? Reply to this email or WhatsApp us at <strong>+234 815 151 9625</strong>.</p>
          </div>
          <p style="font-size:12px;color:#9ca3af;text-align:center;margin-top:12px">Syberspace · syberspace247@gmail.com</p>
        </div>`,
    });
  } catch (err) {
    console.error("[/api/book] Client email error:", err);
  }

  return NextResponse.json({ success: true, meetLink, eventLink });
}
