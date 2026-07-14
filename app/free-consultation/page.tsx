import type { Metadata } from "next";
import Link from "next/link";
import CustomIcon from "@/components/CustomIcon";
import FreeConsultationForm from "@/components/FreeConsultationForm";
import Logo from "@/components/Logo";
import { SITE_URL } from "@/lib/service-pages";

const url = `${SITE_URL}/free-consultation`;

export const metadata: Metadata = {
  title: "Book a Free AI Consultation",
  description:
    "Book a free 30-minute Syberspace consultation for AI customer support, omni-platform automation, lead capture, and workflow automation.",
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "Book a Free AI Consultation | Syberspace",
    description:
      "Use this page to book a free Syberspace consultation and share your website link before the call.",
    url,
    type: "website",
  },
};

const benefits = [
  "Review your website or customer journey before the call.",
  "Identify practical automation opportunities.",
  "Map the best omni-platform support and lead capture setup.",
  "Leave with clear next steps, even if you are not ready to build yet.",
];

export default function FreeConsultationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: "Book a Free AI Consultation",
    url,
    description: metadata.description,
    inLanguage: "en-NG",
    provider: { "@id": `${SITE_URL}/#organization` },
    about: ["AI consultation", "AI customer support", "omni-platform automation", "lead capture automation"],
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Logo width={170} height={38} />
          </Link>

          <p className="mt-12 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>
            Free 30-minute consultation
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            Book a free AI consultation for your business
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Share your details and, if you have one, your website link. We will review it before the call and show where AI customer support, lead capture, or workflow automation can help.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {benefits.map(benefit => (
              <div key={benefit} className="flex gap-3 rounded-xl p-4" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                <CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--accent-cyan)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{benefit}</span>
              </div>
            ))}
          </div>

          <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: "var(--accent-cyan)" }}>
            <CustomIcon name="arrow-right" className="h-4 w-4 rotate-180" />
            Back to full site
          </Link>
        </div>

        <FreeConsultationForm />
      </section>
    </main>
  );
}
