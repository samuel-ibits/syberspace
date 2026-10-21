import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import CustomIcon, { type CustomIconName } from "@/components/CustomIcon";
import LaunchpadForm from "@/components/LaunchpadForm";
import Logo from "@/components/Logo";

const url = "https://syberspacesolutions.live/launchpad";

export const metadata: Metadata = {
  title: "Business Launchpad — Professional Landing Page",
  description: "Apply for the Syberspace Business Launchpad. Selected small businesses receive a professional one-page website with the development fee waived.",
  alternates: { canonical: url },
  openGraph: { title: "Syberspace Business Launchpad", description: "A better digital start for selected small businesses. Apply for a professional landing page with the development fee waived.", url, type: "website" },
};

const included = [
  "One responsive landing page", "Business name and introduction", "Products or services overview",
  "Business contact details", "Social media links supplied by you", "WhatsApp contact or enquiry button",
  "Basic enquiry form", "Basic metadata and SEO foundations", "20-minute discovery or onboarding consultation",
  "A handover explaining how to use your page",
];
const excluded = [
  "Domain registration", "Hosting or third-party subscription costs", "Paid advertising",
  "Premium stock assets or licensed content", "E-commerce or online payment functionality",
  "Complex dashboards, custom applications, or advanced integrations", "Ongoing maintenance, content updates, or marketing services",
];
const eligibility = [
  "You operate or are preparing to launch a legitimate small business.",
  "You can provide accurate business information and the required content.",
  "You are willing to participate in a short discovery call.",
  "You understand the offer scope and exclusions.",
  "You agree to the campaign terms and privacy notice.",
];
const process: { icon: CustomIconName; title: string; text: string }[] = [
  { icon: "send", title: "Submit your application", text: "Complete the application with honest, useful information about your business." },
  { icon: "search", title: "Review and selection", text: "We select businesses whose needs, readiness, and goals match this package." },
  { icon: "message", title: "Discovery call", text: "Selected businesses receive a 20-minute consultation to align on content and goals." },
  { icon: "rocket", title: "Build and handover", text: "We build your landing page, hand it over, and explain how to use it." },
];

export default function LaunchpadPage() {
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">Business Launchpad</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Your business deserves a better digital start.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">We’re selecting a limited number of small businesses for the Syberspace Business Launchpad—an initiative designed to help promising businesses establish a professional online presence.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#apply" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-700">Apply Now <CustomIcon name="arrow-right" className="h-4 w-4" /></a>
              <a href="#details" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 hover:bg-slate-100">View Full Details</a>
            </div>
          </div>
          <aside className="rounded-3xl border border-cyan-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.1)] sm:p-9">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-700">Selected businesses receive</p>
            <p className="mt-4 text-5xl font-extrabold tracking-tight text-slate-950">₦0</p>
            <p className="mt-1 text-lg font-bold text-slate-950">website development fee</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">Get a professional single-page business website built by Syberspace. You only cover any separately approved third-party costs, such as your domain or hosting.</p>
            <div className="mt-6 rounded-2xl bg-cyan-50 p-4 text-sm font-semibold leading-relaxed text-cyan-900">Limited to 10 selected businesses. Subject to confirmation and available capacity.</div>
          </aside>
        </div>
      </section>

      <section id="details" className="mx-auto max-w-7xl scroll-mt-8 px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">The offer</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Everything needed for a credible first impression.</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">Selected businesses receive a basic, single-page responsive landing website with the development fee waived.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="flex items-center gap-3 text-2xl font-bold"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><CustomIcon name="check" className="h-5 w-5" /></span>Included in the package</h3>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">{included.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />{item}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h3 className="flex items-center gap-3 text-2xl font-bold"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-slate-700"><CustomIcon name="x" className="h-5 w-5" /></span>Not included</h3>
            <p className="mt-4 text-sm text-slate-600">Any additional work must be separately scoped and approved by the client.</p>
            <ul className="mt-6 space-y-4">{excluded.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700"><CustomIcon name="x" className="mt-0.5 h-4 w-4 flex-none text-slate-500" />{item}</li>)}</ul>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950"><strong>Important:</strong> We do not silently add recurring charges or imply that third-party expenses are covered. You are responsible for any agreed third-party costs associated with putting your page online.</div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">Who can apply</p><h2 className="mt-3 text-4xl font-extrabold">Eligibility criteria</h2>
            <ol className="mt-8 space-y-4">{eligibility.map((item, index) => <li key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700"><span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">{index + 1}</span><span className="pt-1">{item}</span></li>)}</ol>
            <p className="mt-5 text-sm leading-relaxed text-slate-500">The campaign may prioritize applicants whose needs match the package and whose content is ready.</p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">How it works</p><h2 className="mt-3 text-4xl font-extrabold">The application process</h2>
            <div className="mt-8 space-y-4">{process.map((step, index) => <div key={step.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"><span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><CustomIcon name={step.icon} className="h-5 w-5" /></span><div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Step {index + 1}</p><h3 className="mt-1 font-bold text-slate-950">{step.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p></div></div>)}</div>
          </div>
        </div>
      </section>

      <section id="apply" className="mx-auto max-w-4xl scroll-mt-8 px-4 py-20 sm:px-6 lg:px-8"><LaunchpadForm /></section>

      <section id="terms" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold">Campaign terms at a glance</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
            <li>Submitting an application does not guarantee selection. Selection depends on fit, readiness, and available capacity.</li>
            <li>The waived fee applies only to the basic one-page website package described above.</li>
            <li>Domain, hosting, subscriptions, premium assets, and additional work are not included unless agreed separately in writing.</li>
            <li>Applicants must supply accurate business information, copy, images, contact details, and required approvals promptly.</li>
            <li>Syberspace may pause or close applications once campaign capacity is reached.</li>
          </ul>
          <p className="mt-6 text-sm text-slate-600">Questions before applying? <a href="mailto:syberspace247@gmail.com" className="font-semibold text-cyan-700 underline">Contact Syberspace</a>.</p>
        </div>
      </section>
    </main>
  );
}
