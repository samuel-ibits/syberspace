import { redirect } from "next/navigation";
import type { Metadata } from "next";
import ChatMonitorClient from "@/components/ChatMonitorClient";
import { hasMonitorAuth } from "@/lib/chat-monitor-auth";

export const metadata: Metadata = {
  title: "Chat Monitor",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ChatMonitorPage() {
  if (!(await hasMonitorAuth())) {
    redirect("/chat-monitor/login");
  }

  return <ChatMonitorClient />;
}
