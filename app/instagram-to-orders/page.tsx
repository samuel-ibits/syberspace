import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CustomIcon, { type CustomIconName } from "@/components/CustomIcon";
import InstagramToOrdersForm from "@/components/InstagramToOrdersForm";
import Logo from "@/components/Logo";

const url = "https://www.syberspacesolutions.live/instagram-to-orders";

export const metadata: Metadata = {
  title: "Instagram-to-Orders Website Sprint",
  description: "A professional order-ready website for Nigerian fashion and beauty brands, delivered in 7 business days for ₦50,000.",
  alternates: { canonical: url },
  openGraph: {
    title: "Turn Your Instagram Into an Order-Ready Website",
    description: "Website, WhatsApp ordering, one-year hosting and .com.ng for ₦50,000. Pay ₦25,000 to start and the balance after approval.",
    url,
    type: "website",
    images: [{ url: "/campaigns/instagram-to-orders-meta-ad.png", width: 1254, height: 1254 }],
  },
};

const deliverables: Array<{ icon: CustomIconName; title: string; text: string }> = [
  { icon: "phone", title: "WhatsApp ordering", text: "Customers tap from a product or service straight into a private order conversation." },
  { icon: "web", title: "Prices in one place", text: "Display up to 15 products or services with clear prices, photos and descriptions." },
  { icon: "instagram", title: "A professional showcase", text: "Present your work, brand story, location and social links in a polished mobile experience." },
  { icon: "chart", title: "Lead tracking", text: "Meta Pixel and enquiry tracking help you see when visitors become genuine prospects." },
];

const included = [
  "Mobile-first website designed around your brand",
  "Home, About, Products or Services, Gallery and Contact sections",
  "Up to 15 products or services uploaded",
  "WhatsApp Order Now and booking-enquiry buttons",
  "Instagram and social-media links",
  "Contact or customer-enquiry form",
  "Google Maps or studio-location integration where needed",
  "Facebook Pixel and lead-event tracking",
  "Basic copy polishing and two revision rounds",
  "One available standard .com.ng domain for the first year",
  "One year of standard hosting and SSL security",
  "14 days of post-launch technical support",
];

const excluded = [
  "Online card payments or full e-commerce checkout",
  "Paid advertising spend or ongoing campaign management",
  "Premium stock assets or licensed content",
  "Complex dashboards, custom applications or advanced integrations",
  "Ongoing maintenance, content updates or marketing services",
];

export default function InstagramToOrdersPage() {
  return (
    <main data-theme="light" className="min-h-screen bg-white text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Syberspace home"><Logo width={170} height={38} monochromeText /></Link>
        <a href="#get-plan" className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800">Get My Free Plan</a>
      </header>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">For Nigerian fashion and beauty brands</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">Your Instagram gets attention. Give customers a professional place to order.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">We turn fashion and beauty Instagram pages into polished, mobile-first websites where customers can see your prices, trust your brand and order through WhatsApp.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#get-plan" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-700">Get My Free Website Sales Plan <CustomIcon name="arrow-right" className="h-5 w-5" /></a>
              <a href="#package" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 text-base font-bold text-slate-800 hover:bg-slate-100">See the ₦50k Package</a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-500"><CustomIcon name="security" className="h-4 w-4" /> Private WhatsApp conversation—not a group. No obligation to buy.</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
            <Image src="/campaigns/instagram-to-orders-meta-ad.png" alt="A Nigerian fashion and beauty entrepreneur viewing an order-ready website and Instagram page" width={1254} height={1254} priority className="h-auto w-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">Built for how your customers buy</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Stop making serious customers search through old posts and highlights.</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">When prices, services and order instructions are scattered across Instagram, interested customers delay, ask repetitive questions or leave. Your website becomes the trusted home of your brand while WhatsApp remains the place where you close the order.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item) => <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><CustomIcon name={item.icon} className="h-5 w-5" /></span><h3 className="mt-5 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p></article>)}
        </div>
      </section>

      <section id="package" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">Instagram-to-Orders Website Sprint</p>
            <p className="mt-4 text-6xl font-extrabold tracking-tight">₦50,000</p>
            <p className="mt-3 text-xl font-bold">₦25,000 to begin. ₦25,000 after you approve the completed website.</p>
            <p className="mt-5 leading-relaxed text-slate-600">Once we receive your logo, photos, prices and business information, the standard package is prepared within 7 business days.</p>
            <div className="mt-7 rounded-2xl border border-cyan-200 bg-white p-5"><p className="font-bold text-cyan-900">Approve before final payment</p><p className="mt-2 text-sm leading-relaxed text-slate-600">You review the completed website on a private preview link. The remaining ₦25,000 is due only after the included revision process and your approval.</p></div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-3xl font-extrabold">Everything needed to look legitimate and start orders</h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">{included.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-800">Included launch bonuses</p>
            <h2 className="mt-3 text-3xl font-extrabold">We also help you introduce the website properly.</h2>
            <ul className="mt-7 space-y-4 text-sm text-slate-700">
              {["Instagram bio and link audit", "Digital price-list template", "Ready-to-edit WhatsApp order-message templates", "Website launch graphic for Instagram Stories", "Simple guide for changing prices and images"].map((item) => <li key={item} className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />{item}</li>)}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Not included</p>
            <h2 className="mt-3 text-3xl font-extrabold">A focused starter package—not an unlimited custom build.</h2>
            <ul className="mt-7 space-y-4 text-sm text-slate-700">{excluded.map((item) => <li key={item} className="flex gap-3"><CustomIcon name="x" className="mt-0.5 h-4 w-4 flex-none text-slate-500" />{item}</li>)}</ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">Anything outside the package is separately scoped and approved before work begins. Hosting and domain renewals after the first year are billed separately.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Simple process</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">From Instagram page to order-ready website</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {["Request your free plan", "Review the recommendation", "Pay ₦25,000 to begin", "Approve, pay the balance and launch"].map((step, index) => <div key={step} className="rounded-2xl border border-white/15 bg-white/5 p-6"><p className="text-sm font-bold text-cyan-300">0{index + 1}</p><p className="mt-4 text-lg font-bold">{step}</p></div>)}
          </div>
        </div>
      </section>

      <section id="get-plan" className="mx-auto grid max-w-7xl scroll-mt-8 gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:px-8">
        <div className="lg:sticky lg:top-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">Start with clarity, not payment</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight">Get your free Website Sales Plan.</h2>
          <p className="mt-5 leading-relaxed text-slate-600">We will review your Instagram and recommend the pages, price presentation and WhatsApp order flow your brand needs. If the plan is a fit, you can choose the ₦50,000 package.</p>
          <ul className="mt-7 space-y-4 text-sm text-slate-700">
            <li className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />Takes about 60 seconds</li>
            <li className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />Private WhatsApp follow-up</li>
            <li className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />No payment or group required</li>
          </ul>
        </div>
        <InstagramToOrdersForm />
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold">Questions before requesting your plan?</h2>
          <div className="mt-8 space-y-5">
            {[
              ["Do I have to join a WhatsApp group?", "No. After the form, you continue in a private WhatsApp conversation with Syberspace."],
              ["Can customers pay directly on the website?", "Online payment and full e-commerce checkout are not included. The starter package sends customers to WhatsApp to complete the order or booking."],
              ["When does the 7-business-day timeline begin?", "After the initial ₦25,000 payment and after we receive the content needed for the agreed package."],
              ["Is the free plan the finished website design?", "No. It is a personalised recommendation covering the website structure and customer journey. Website design begins after you approve the package."],
            ].map(([question, answer]) => <details key={question} className="rounded-2xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-bold">{question}</summary><p className="mt-3 text-sm leading-relaxed text-slate-600">{answer}</p></details>)}
          </div>
        </div>
      </section>
    </main>
  );
}
