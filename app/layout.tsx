import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const SITE_URL = "https://syberspace.com.ng";
const SITE_NAME = "Syberspace";
const TITLE = "Syberspace | AI Automation Services Nigeria — Process Automation, AI Bots & Data Analysis";
const DESCRIPTION =
  "Syberspace is a Nigerian AI-as-a-Service company that plugs cutting-edge AI into your existing business. We offer process automation, web scraping, data cleaning, custom AI bots, data analysis, and AI strategy consultation — with results in under 2 weeks. No rebuilding required.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "AI automation Nigeria",
    "AI as a service Nigeria",
    "process automation Nigeria",
    "AI bots for business",
    "web scraping service",
    "data cleaning service",
    "data analysis Nigeria",
    "AI consultation Nigeria",
    "business automation Africa",
    "chatbot development Nigeria",
    "AI integration service",
    "Syberspace",
    "artificial intelligence Nigeria",
    "machine learning services Nigeria",
    "AI agency Nigeria",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Technology",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Syberspace — AI-as-a-Service for Nigerian Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@syberspace",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0a0f1e" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7ff" },
  ],
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
