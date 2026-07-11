import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_PAGES, SITE_URL } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "AI Services for Business and Website Owners",
  description:
    "Explore Syberspace AI automation, AI chatbot, web scraping, data cleaning, data analysis, and AI consulting services for businesses and website owners.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "AI Services for Business and Website Owners | Syberspace",
    description:
      "Crawlable service pages for AI automation, chatbots, web scraping, data cleaning, data analysis, and AI consulting from Syberspace.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
};

export default function ServicesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Syberspace AI services",
    itemListElement: SERVICE_PAGES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: "var(--accent-cyan)" }}>
          Back to home
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>
            Syberspace AI services
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            AI services for business and website owners
          </h1>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Find the right AI automation, chatbot, data, and consulting service for your business. Each Syberspace service is built to plug into your existing website, workflows, and tools.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PAGES.map(service => (
            <article
              key={service.slug}
              className="flex flex-col rounded-2xl p-6"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>
                {service.primaryKeyword}
              </p>
              <h2 className="mt-3 text-xl font-bold">{service.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {service.metaDescription}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-6 inline-flex font-semibold hover:underline"
                style={{ color: "var(--accent-cyan)" }}
              >
                Learn more about {service.shortName}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
