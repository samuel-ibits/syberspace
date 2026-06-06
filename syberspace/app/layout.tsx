import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Syberspace | AI-Powered Services for Your Business",
  description:
    "We plug cutting-edge AI into your existing business — process automation, web scraping, data cleaning, AI bots, data analysis, and expert consultation.",
  keywords: ["AI services", "process automation", "AI bots", "data analysis", "AI consultation", "Syberspace"],
  openGraph: {
    title: "Syberspace | AI-Powered Services for Your Business",
    description: "Supercharge your business with AI. No rebuilding — we integrate directly.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
