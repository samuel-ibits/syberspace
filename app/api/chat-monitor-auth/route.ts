import { NextRequest, NextResponse } from "next/server";
import { CHAT_MONITOR_COOKIE, createMonitorToken, isCorrectMonitorPassword } from "@/lib/chat-monitor-auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!isCorrectMonitorPassword(String(password ?? ""))) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(CHAT_MONITOR_COOKIE, createMonitorToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(CHAT_MONITOR_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return res;
}
