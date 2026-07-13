import { NextRequest, NextResponse } from "next/server";
import type { ChatMessageRole, ChatSessionStatus } from "@/lib/chat-types";
import { requestHasMonitorAuth } from "@/lib/chat-monitor-auth";
import { appendChatMessage, getChatSession, listChatSessions, updateChatSession } from "@/lib/local-chat-store";

export const runtime = "nodejs";

const validRoles: ChatMessageRole[] = ["user", "assistant", "agent", "system"];
const validStatuses: ChatSessionStatus[] = ["active", "needs_agent", "closed"];

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");

  if (sessionId) {
    const session = await getChatSession(sessionId);
    return NextResponse.json({ session });
  }

  if (!requestHasMonitorAuth(req)) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const sessions = await listChatSessions();
  return NextResponse.json({ sessions });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sessionId = String(body.sessionId ?? "").trim();
  const role = body.message?.role as ChatMessageRole;
  const text = String(body.message?.text ?? "").trim();
  const status = body.status as ChatSessionStatus | undefined;

  if (!sessionId || !validRoles.includes(role) || !text) {
    return NextResponse.json({ error: "Invalid chat message payload." }, { status: 400 });
  }

  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid chat session status." }, { status: 400 });
  }

  const monitorOnlyPost = role === "agent" || role === "system" || status === "active" || status === "closed";
  if (monitorOnlyPost && !requestHasMonitorAuth(req)) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const session = await appendChatMessage({
    sessionId,
    visitorName: body.visitorName,
    visitorContact: body.visitorContact,
    status,
    message: {
      id: body.message.id,
      clientMessageId: body.message.clientMessageId,
      role,
      text,
      author: body.message.author,
      createdAt: body.message.createdAt,
    },
  });

  return NextResponse.json({ session });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const sessionId = String(body.sessionId ?? "").trim();
  const status = body.status as ChatSessionStatus | undefined;

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session id." }, { status: 400 });
  }

  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid chat session status." }, { status: 400 });
  }

  const monitorOnlyPatch = body.readBy === "agent" || status === "active" || status === "closed";
  if (monitorOnlyPatch && !requestHasMonitorAuth(req)) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const session = await updateChatSession(sessionId, {
    status,
    readBy: body.readBy,
    visitorName: body.visitorName,
    visitorContact: body.visitorContact,
  });

  return NextResponse.json({ session });
}
