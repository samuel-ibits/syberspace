import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import CustomIcon, { type CustomIconName } from "@/components/CustomIcon";
import Logo from "@/components/Logo";
import WebsiteSprintForm from "@/components/WebsiteSprintForm";

const url = "https://www.syberspacesolutions.live/website-sprint";

export const metadata: Metadata = {
  title: "Fashion & Beauty ₦50K Website Sprint",
  description: "A ₦50,000 website package for Nigerian fashion and beauty brands, including one year of hosting and a .com.ng domain.",
  alternates: { canonical: url },
  openGraph: {
    title: "Syberspace Fashion & Beauty ₦50K Website Sprint",
    description: "For tailors, hair vendors, makeup artists, skincare brands, and lash or nail studios. Website, hosting, and .com.ng for ₦50,000.",
    url,
    type: "website",
  },
};

const included = [
  "A professionally designed responsive business website",
  "Mobile, tablet, and desktop optimization",
  "Product, price, service, portfolio, or lookbook sections",
  "WhatsApp ordering and booking enquiry buttons",
  "Basic contact or enquiry form",
  "Basic metadata and SEO foundations",
  "One standard .com.ng domain registration for the first year",
  "One year of standard website hosting",
  "A short discovery and project-direction session",
  "Instagram and social links, launch support, and a practical handover",
];

const excluded = [
  "Paid advertising",
  "Premium stock assets or licensed content",
  "E-commerce or online payment functionality",
  "Complex dashboards, custom applications, or advanced integrations",
  "Ongoing maintenance, content updates, or marketing services",
];

const process: { icon: CustomIconName; title: string; text: string }[] = [
  { icon: "send", title: "Request a slot", text: "Tell us about your business, project, timeline, and the result you want." },
  { icon: "search", title: "Fit and scope review", text: "We confirm whether your needs fit the ₦50,000 package and clarify the project direction." },
  { icon: "message", title: "Approve the direction", text: "If the proposed direction fits your needs, you approve the project and pay the ₦50,000 package fee." },
  { icon: "rocket", title: "Build and launch", text: "We build, review, launch, and hand over your website with hosting and the .com.ng domain." },
];

export default function WebsiteSprintPage() {
  return (
    <main data-theme="light" className="min-h-screen bg-white text-slate-950">
      <CustomCursor />
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Syberspace home"><Logo width={170} height={38} monochromeText /></Link>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"><CustomIcon name="arrow-right" className="h-4 w-4 rotate-180" /> Back to Syberspace</Link>
      </header>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">Syberspace Fashion &amp; Beauty ₦50K Website Sprint</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Your Instagram gets attention. Your website should turn it into orders.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">A professional website for tailors, hair vendors, makeup artists, skincare brands, and lash or nail studios—complete with one year of hosting and a standard .com.ng domain for ₦50,000.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#apply" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-700">Request a Project Slot <CustomIcon name="arrow-right" className="h-4 w-4" /></a>
              <a href="#package" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 hover:bg-slate-100">See What’s Included</a>
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500">Limited to 10 qualified project requests for this campaign.</p>
          </div>
          <aside className="rounded-3xl border border-cyan-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.1)] sm:p-9">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-700">Complete starter package</p>
            <p className="mt-4 text-6xl font-extrabold tracking-tight text-slate-950">₦50,000</p>
            <p className="mt-2 text-lg font-bold text-slate-950">website + hosting + .com.ng</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />Show products, prices, services, or your portfolio</li>
              <li className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />One year of standard hosting</li>
              <li className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />One standard .com.ng domain for the first year</li>
            </ul>
            <div className="mt-6 rounded-2xl bg-cyan-50 p-4 text-sm font-semibold leading-relaxed text-cyan-900">Apply first. If the proposed direction and package fit your needs, you approve the project before paying.</div>
          </aside>
        </div>
      </section>

      <section id="package" className="mx-auto max-w-7xl scroll-mt-8 px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">The package</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Everything your fashion or beauty brand needs to look legitimate online.</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">Move beyond scattered Instagram posts and DMs. Give customers one credible place to see your work, understand your prices, and start an order or booking through WhatsApp. Simple web application ideas can be reviewed, while complex custom applications require a separate quote.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="flex items-center gap-3 text-2xl font-bold"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><CustomIcon name="check" className="h-5 w-5" /></span>Included</h3>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">{included.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />{item}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h3 className="flex items-center gap-3 text-2xl font-bold"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-slate-700"><CustomIcon name="x" className="h-5 w-5" /></span>Not included</h3>
            <p className="mt-4 text-sm text-slate-600">Anything outside the package must be separately scoped, priced, and approved before work begins.</p>
            <ul className="mt-6 space-y-4">{excluded.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700"><CustomIcon name="x" className="mt-0.5 h-4 w-4 flex-none text-slate-500" />{item}</li>)}</ul>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950"><strong>Renewals:</strong> the package covers the first year of standard hosting and one available standard .com.ng domain. Hosting and domain renewal after the first year are not included in the ₦50,000 fee.</div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">Good fit</p>
            <h2 className="mt-3 text-4xl font-extrabold">This Sprint is for you if…</h2>
            <ul className="mt-8 space-y-4 text-sm leading-relaxed text-slate-700">
              {[
                "You run a fashion or beauty brand, studio, salon, or independent service business.",
                "You sell through Instagram or WhatsApp and need a clearer place to show products, prices, or services.",
                "You can approve the project and provide feedback promptly.",
                "You are ready to invest ₦50,000 if the proposed direction fits your needs.",
              ].map((item) => <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />{item}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">How it works</p>
            <h2 className="mt-3 text-4xl font-extrabold">From request to launch</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">{process.map((step, index) => <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><CustomIcon name={step.icon} className="h-5 w-5" /></span><p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">Step {index + 1}</p><h3 className="mt-1 font-bold text-slate-950">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section id="apply" className="mx-auto max-w-4xl scroll-mt-8 px-4 py-20 sm:px-6 lg:px-8"><WebsiteSprintForm /></section>

      <section id="terms" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold">Campaign terms at a glance</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
            <li>Submitting a request does not guarantee acceptance; Syberspace confirms fit, scope, content readiness, and capacity first.</li>
            <li>The ₦50,000 fee covers only the starter website package described on this page.</li>
            <li>The included .com.ng domain is subject to availability and covers one standard registration for the first year.</li>
            <li>Standard hosting is included for one year. Domain and hosting renewal after the first year are billed separately.</li>
            <li>E-commerce, payments, complex dashboards, custom applications, advanced integrations, advertising, premium assets, maintenance, and marketing are excluded unless separately quoted in writing.</li>
            <li>Clients must supply accurate information, content, images, approvals, and feedback within agreed timelines.</li>
            <li>Syberspace may pause or close the campaign once the available project slots are filled.</li>
          </ul>
          <p className="mt-6 text-sm text-slate-600">Questions before applying? <a href="mailto:syberspace247@gmail.com" className="font-semibold text-cyan-700 underline">Contact Syberspace</a>.</p>
        </div>
      </section>
    </main>
  );
}
