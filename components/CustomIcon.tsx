import type { SVGProps } from "react";

export type CustomIconName =
  | "analytics"
  | "automation"
  | "bot"
  | "brain"
  | "building"
  | "calendar"
  | "chart"
  | "check"
  | "cleaning"
  | "clock"
  | "data"
  | "education"
  | "arrow-right"
  | "chevron-down"
  | "external"
  | "facebook"
  | "globe"
  | "handshake"
  | "healthcare"
  | "instagram"
  | "lightning"
  | "location"
  | "mail"
  | "menu"
  | "message"
  | "phone"
  | "rocket"
  | "search"
  | "security"
  | "send"
  | "social"
  | "spark"
  | "star"
  | "sun"
  | "target"
  | "tools"
  | "training"
  | "truck"
  | "web"
  | "whatsapp"
  | "x"
  | "moon";

type CustomIconProps = SVGProps<SVGSVGElement> & {
  name: CustomIconName;
};

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.8,
} as const;

function IconPaths({ name }: { name: CustomIconName }) {
  switch (name) {
    case "arrow-right":
      return (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      );
    case "chevron-down":
      return <path d="m6 9 6 6 6-6" />;
    case "external":
      return (
        <>
          <path d="M10 6H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3" />
          <path d="M14 4h6v6" />
          <path d="m10 14 10-10" />
        </>
      );
    case "menu":
      return (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      );
    case "x":
      return (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </>
      );
    case "sun":
      return (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2" />
          <path d="M12 19.5v2" />
          <path d="m4.6 4.6 1.4 1.4" />
          <path d="m18 18 1.4 1.4" />
          <path d="M2.5 12h2" />
          <path d="M19.5 12h2" />
          <path d="m4.6 19.4 1.4-1.4" />
          <path d="m18 6 1.4-1.4" />
        </>
      );
    case "moon":
      return <path d="M20.5 13.5A8.2 8.2 0 0 1 10.5 3.5 7.8 7.8 0 1 0 20.5 13.5Z" />;
    case "send":
      return (
        <>
          <path d="m4 11.5 16-7.5-7.5 16-2.2-6.3L4 11.5Z" />
          <path d="m10.3 13.7 4.4-4.4" />
        </>
      );
    case "automation":
      return (
        <>
          <path d="M7 12a5 5 0 0 1 8.8-3.2" />
          <path d="M17 8V4h4" />
          <path d="M17 12a5 5 0 0 1-8.8 3.2" />
          <path d="M7 16v4H3" />
          <circle cx="12" cy="12" r="2.4" />
        </>
      );
    case "web":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17" />
          <path d="M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5" />
          <path d="M12 3.5C9.8 5.8 8.7 8.6 8.7 12s1.1 6.2 3.3 8.5" />
        </>
      );
    case "cleaning":
      return (
        <>
          <path d="M4 18h10" />
          <path d="M7 18l1.8-7.2L16 18" />
          <path d="M9.5 14h4" />
          <path d="M15.5 5.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
          <path d="M6.5 4.5l.4 1 .9.4-.9.4-.4 1-.4-1-.9-.4.9-.4.4-1Z" />
        </>
      );
    case "bot":
      return (
        <>
          <rect x="5" y="8" width="14" height="10" rx="3" />
          <path d="M12 8V5" />
          <path d="M9 12h.01" />
          <path d="M15 12h.01" />
          <path d="M9.5 15h5" />
          <path d="M3.5 12v3" />
          <path d="M20.5 12v3" />
        </>
      );
    case "analytics":
    case "chart":
      return (
        <>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M7 15l3-4 3 2 5-7" />
          <path d="M18 6h-3" />
        </>
      );
    case "data":
      return (
        <>
          <ellipse cx="12" cy="6" rx="6.5" ry="2.8" />
          <path d="M5.5 6v6c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8V6" />
          <path d="M5.5 12v5.5c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8V12" />
        </>
      );
    case "brain":
      return (
        <>
          <path d="M8.5 18a3 3 0 0 1-3-3 2.9 2.9 0 0 1 1.2-2.4A3.5 3.5 0 0 1 9.5 6h.2A3.3 3.3 0 0 1 12 4.8 3.3 3.3 0 0 1 14.3 6h.2a3.5 3.5 0 0 1 2.8 6.6 2.9 2.9 0 0 1 1.2 2.4 3 3 0 0 1-3 3" />
          <path d="M12 4.8V20" />
          <path d="M8.5 10.5h2" />
          <path d="M13.5 13.5h2" />
          <path d="M8.2 15.3h2.2" />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
          <path d="M8 3.5v4" />
          <path d="M16 3.5v4" />
          <path d="M4 10h16" />
          <path d="M8 14h2" />
          <path d="M13 14h3" />
        </>
      );
    case "mail":
      return (
        <>
          <rect x="4" y="6" width="16" height="12" rx="2.5" />
          <path d="m5 8 7 5 7-5" />
        </>
      );
    case "phone":
      return (
        <>
          <path d="M7.5 4.5 10 7l-1.7 2c.8 1.8 2.1 3.2 3.9 4l2-1.7 2.4 2.4-1 3.2c-.2.7-.9 1.1-1.6 1C8.7 17 5 13.3 4.1 8c-.1-.7.3-1.4 1-1.6l2.4-.9Z" />
        </>
      );
    case "message":
    case "whatsapp":
      return (
        <>
          <path d="M5.5 18.5 6.6 15A7.2 7.2 0 1 1 9 17.3l-3.5 1.2Z" />
          <path d="M9.6 9.2c.4 2 1.7 3.3 3.7 3.9l1.1-1.1 1.9.9c-.2 1.1-1.1 1.8-2.3 1.8-3.3 0-6-2.7-6-6 0-1.2.7-2.1 1.8-2.3l.9 1.9-1.1.9Z" />
        </>
      );
    case "social":
      return (
        <>
          <circle cx="7" cy="7" r="2.5" />
          <circle cx="17" cy="7" r="2.5" />
          <circle cx="12" cy="17" r="2.5" />
          <path d="m9 8.5 6 .1" />
          <path d="m8.5 9.2 2.3 5.5" />
          <path d="m15.5 9.2-2.3 5.5" />
        </>
      );
    case "healthcare":
      return (
        <>
          <rect x="5" y="6" width="14" height="13" rx="2.5" />
          <path d="M9 6V4.5h6V6" />
          <path d="M12 9.5v6" />
          <path d="M9 12.5h6" />
        </>
      );
    case "truck":
      return (
        <>
          <path d="M3.5 7h10v9h-10z" />
          <path d="M13.5 10h3.8l3.2 3.2V16h-7" />
          <circle cx="7" cy="17" r="1.8" />
          <circle cx="17" cy="17" r="1.8" />
        </>
      );
    case "building":
      return (
        <>
          <path d="M5 20V5.5A1.5 1.5 0 0 1 6.5 4h9A1.5 1.5 0 0 1 17 5.5V20" />
          <path d="M3.5 20h17" />
          <path d="M8 8h2" />
          <path d="M13 8h1" />
          <path d="M8 12h2" />
          <path d="M13 12h1" />
          <path d="M9.5 20v-4h3V20" />
        </>
      );
    case "rocket":
      return (
        <>
          <path d="M13.5 4.5c2.5.3 4.3 2.1 4.6 4.6l-5 5-3.8-.8-.8-3.8 5-5Z" />
          <path d="m8.7 13.3-3.2 3.2" />
          <path d="M6.5 12.5 4 15l3 1" />
          <path d="M11.5 17.5 9 20l-1-3" />
          <circle cx="14.8" cy="7.8" r="1.2" />
        </>
      );
    case "star":
      return <path d="m12 3.8 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 9.1l5-.7L12 3.8Z" />;
    case "target":
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.5" />
          <path d="M16.5 7.5 20 4" />
        </>
      );
    case "handshake":
      return (
        <>
          <path d="m7 12 3-3 2 2 2-2 3 3" />
          <path d="m5 10-2 2 4 4 2-2" />
          <path d="m19 10 2 2-4 4-2-2" />
          <path d="m9 14 2 2a1.4 1.4 0 0 0 2 0l2-2" />
        </>
      );
    case "security":
      return (
        <>
          <path d="M12 3.5 19 6v5.4c0 4-2.7 7.3-7 9.1-4.3-1.8-7-5.1-7-9.1V6l7-2.5Z" />
          <path d="m9.2 12.2 1.8 1.8 3.8-4" />
        </>
      );
    case "globe":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M5 8h14" />
          <path d="M5 16h14" />
          <path d="M12 3.5c2 2.4 3 5.2 3 8.5s-1 6.1-3 8.5" />
          <path d="M12 3.5c-2 2.4-3 5.2-3 8.5s1 6.1 3 8.5" />
        </>
      );
    case "lightning":
      return <path d="M13 3.5 5.5 13H11l-1 7.5 7.5-9.5H12l1-7.5Z" />;
    case "tools":
      return (
        <>
          <path d="M14.5 6.5a4 4 0 0 0 5 5L12 19l-3-3 7.5-7.5a4 4 0 0 1-2-2Z" />
          <path d="M5 5l4 4" />
          <path d="M4 8 8 4" />
        </>
      );
    case "training":
      return (
        <>
          <path d="m3.5 8.5 8.5-4 8.5 4-8.5 4-8.5-4Z" />
          <path d="M6.5 10v4.5c1.6 1.4 3.5 2 5.5 2s3.9-.6 5.5-2V10" />
          <path d="M20.5 8.5V14" />
        </>
      );
    case "search":
      return (
        <>
          <circle cx="10.5" cy="10.5" r="5.8" />
          <path d="m15 15 4.5 4.5" />
          <path d="M8.5 10.5h4" />
        </>
      );
    case "location":
      return (
        <>
          <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
          <circle cx="12" cy="11" r="2" />
        </>
      );
    case "clock":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </>
      );
    case "spark":
      return (
        <>
          <path d="M12 3.5 13.9 9 19.5 11 13.9 13 12 18.5 10.1 13 4.5 11 10.1 9 12 3.5Z" />
          <path d="m18 4 .6 1.6L20 6.2l-1.4.6L18 8.4l-.6-1.6-1.4-.6 1.4-.6L18 4Z" />
        </>
      );
    case "facebook":
      return <path d="M14 8h2V4h-2.5A4.5 4.5 0 0 0 9 8.5V11H6v4h3v6h4v-6h3l.8-4H13V8.5c0-.3.3-.5 1-.5Z" />;
    case "instagram":
      return (
        <>
          <rect x="5" y="5" width="14" height="14" rx="4" />
          <circle cx="12" cy="12" r="3.2" />
          <path d="M16.5 7.6h.01" />
        </>
      );
    case "check":
      return <path d="m5 12.5 4.2 4.2L19 6.8" />;
  }
}

export default function CustomIcon({ name, className = "h-5 w-5", ...props }: CustomIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...common}
      {...props}
    >
      <IconPaths name={name} />
    </svg>
  );
}
