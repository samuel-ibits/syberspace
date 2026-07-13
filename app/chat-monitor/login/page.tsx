import type { Metadata } from "next";
import ChatMonitorLoginClient from "@/components/ChatMonitorLoginClient";

export const metadata: Metadata = {
  title: "Chat Monitor Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ChatMonitorLoginPage() {
  return <ChatMonitorLoginClient />;
}
