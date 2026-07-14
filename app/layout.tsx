import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const SITE_URL = "https://syberspacesolutions.live";
const SITE_NAME = "Syberspace";
const SEO_TITLE = "AI Customer Support and Omni-Platform Automation for African Businesses | Syberspace";
const SEO_DESCRIPTION =
  "Syberspace helps African business and website owners add AI customer support, omni-platform automation, lead capture, workflow automation, analytics, and AI consulting without rebuilding their systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "AI automation Nigeria",
    "AI automation services Nigeria",
    "AI as a service Nigeria",
    "process automation Nigeria",
    "business automation Nigeria",
    "AI chatbot for website Nigeria",
    "AI bots for business",
    "AI tools for business owners",
    "AI tools for website owners",
    "web scraping service",
    "web scraping services Nigeria",
    "data cleaning service",
    "data cleaning services Nigeria",
    "data analysis Nigeria",
    "AI consultation Nigeria",
    "business automation Africa",
    "chatbot development Nigeria",
    "AI integration service",
    "Syberspace",
    "artificial intelligence Nigeria",
    "machine learning services Nigeria",
    "AI agency Nigeria",
    "AI customer support Africa",
    "omni-platform automation Africa",
    "omnichannel AI support Africa",
    "lead capture automation Africa",
    "Zendesk alternative Nigeria",
    "customer support automation SMEs",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Technology",
  alternates: {
    canonical: SITE_URL,
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "AI-readable Syberspace summary" },
        { url: "/llms-full.txt", title: "Full AI-readable Syberspace service guide" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Syberspace AI customer support and omni-platform automation for African businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ["/opengraph-image"],
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
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7ff" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xkjdbfj3md");
            `,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
