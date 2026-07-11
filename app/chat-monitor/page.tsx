import { redirect } from "next/navigation";
import ChatMonitorClient from "@/components/ChatMonitorClient";
import { hasMonitorAuth } from "@/lib/chat-monitor-auth";

export default async function ChatMonitorPage() {
  if (!(await hasMonitorAuth())) {
    redirect("/chat-monitor/login");
  }

  return <ChatMonitorClient />;
}
