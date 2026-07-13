import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const privatePaths = ["/api/", "/chat-monitor/"];

  return {
    rules: [
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
        ],
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: "https://syberspace.com.ng/sitemap.xml",
    host: "https://syberspace.com.ng",
  };
}
