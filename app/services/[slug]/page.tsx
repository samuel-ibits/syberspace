import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServicePage, SERVICE_PAGES, SITE_URL } from "@/lib/service-pages";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return SERVICE_PAGES.map(service => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: url,
    },
    keywords: [
      service.primaryKeyword,
      service.name,
      service.shortName,
      "AI automation for business owners",
      "AI tools for website owners",
      "Syberspace",
    ],
    openGraph: {
      title: `${service.metaTitle} | Syberspace`,
      description: service.metaDescription,
      url,
      type: "website",
      siteName: "Syberspace",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.metaTitle} | Syberspace`,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) notFound();

  const url = `${SITE_URL}/services/${service.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    url,
    description: service.metaDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Place", name: "Africa" },
    ],
    audience: {
      "@type": "Audience",
      audienceType: service.audience,
    },
    serviceType: service.primaryKeyword,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.name, item: url },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      {[serviceSchema, breadcrumbSchema, faqSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap gap-2 text-sm" aria-label="Breadcrumb" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline" style={{ color: "var(--accent-cyan)" }}>Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:underline" style={{ color: "var(--accent-cyan)" }}>Services</Link>
          <span>/</span>
          <span>{service.shortName}</span>
        </nav>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>
              {service.primaryKeyword}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              {service.heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {service.heroDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#booking"
                className="inline-flex justify-center rounded-xl px-6 py-3 font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}
              >
                Book a free AI audit
              </Link>
              <Link
                href="/#contact"
                className="inline-flex justify-center rounded-xl px-6 py-3 font-semibold"
                style={{ border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}
              >
                Contact Syberspace
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl p-6" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <h2 className="text-lg font-bold">Best for</h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {service.audience}
            </p>
          </aside>
        </div>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">What you get</h2>
            <ul className="mt-6 space-y-4">
              {service.outcomes.map(outcome => (
                <li key={outcome} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: "var(--accent-cyan)" }} />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Common use cases</h2>
            <ul className="mt-6 space-y-4">
              {service.useCases.map(useCase => (
                <li key={useCase} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: "var(--accent-cyan)" }} />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Questions about {service.shortName}</h2>
        <div className="mt-6 space-y-4">
          {service.faqs.map(faq => (
            <details key={faq.question} className="rounded-2xl p-5" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              <summary className="cursor-pointer font-semibold">{faq.question}</summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
