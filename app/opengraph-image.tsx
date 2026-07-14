import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Syberspace - AI customer support and omni-platform automation for African businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0f1e",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Gradient glow blobs */}
        <div style={{ position: "absolute", top: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", display: "flex" }} />

        {/* Badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 999,
          border: "1px solid rgba(0,212,255,0.3)",
          background: "rgba(0,212,255,0.08)",
          marginBottom: 28,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00d4ff", display: "flex" }} />
          <span style={{ color: "#00d4ff", fontSize: 16, fontWeight: 600 }}>AI Support · Omni-Platform Automation · Africa</span>
        </div>

        {/* Logo wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24 }}>
          <span style={{ fontSize: 72, fontWeight: 800, color: "#ffffff", letterSpacing: "-2px" }}>Syber</span>
          <span style={{ fontSize: 72, fontWeight: 800, background: "linear-gradient(135deg, #00d4ff, #7c3aed)", backgroundClip: "text", color: "transparent", letterSpacing: "-2px" }}>space</span>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: 28, color: "#94a3b8", margin: 0, textAlign: "center", maxWidth: 700, lineHeight: 1.4 }}>
          AI customer support, lead capture, and workflow automation for African businesses.
        </p>

        {/* Service pills */}
        <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap", justifyContent: "center", maxWidth: 900 }}>
          {["Process Automation", "AI Bots", "Web Scraping", "Data Analysis", "AI Consultation"].map((s) => (
            <div key={s} style={{
              padding: "8px 18px", borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "#cbd5e1", fontSize: 16, display: "flex",
            }}>{s}</div>
          ))}
        </div>

        {/* URL */}
        <p style={{ position: "absolute", bottom: 32, fontSize: 18, color: "#475569", margin: 0 }}>
          syberspacesolutions.live
        </p>
      </div>
    ),
    { ...size },
  );
}
