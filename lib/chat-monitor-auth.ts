import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";

export const CHAT_MONITOR_COOKIE = "syberspace_chat_monitor";

function getMonitorPassword() {
  return process.env.CHAT_MONITOR_PASSWORD ?? "syberspace-admin";
}

function getMonitorSecret() {
  return process.env.CHAT_MONITOR_SECRET ?? process.env.NEXTAUTH_SECRET ?? getMonitorPassword();
}

export function createMonitorToken() {
  return createHmac("sha256", getMonitorSecret())
    .update(`chat-monitor:${getMonitorPassword()}`)
    .digest("hex");
}

export function isCorrectMonitorPassword(password: string) {
  const expected = Buffer.from(getMonitorPassword());
  const supplied = Buffer.from(password);
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}

export function requestHasMonitorAuth(req: NextRequest) {
  return req.cookies.get(CHAT_MONITOR_COOKIE)?.value === createMonitorToken();
}

export async function hasMonitorAuth() {
  const cookieStore = await cookies();
  return cookieStore.get(CHAT_MONITOR_COOKIE)?.value === createMonitorToken();
}
