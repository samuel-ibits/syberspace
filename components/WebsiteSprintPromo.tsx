import Link from "next/link";
import CustomIcon from "@/components/CustomIcon";

export default function WebsiteSprintPromo() {
  return (
    <section id="website-sprint" className="border-y border-slate-200 bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">For fashion and beauty brands · 10 project slots</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">Turn Instagram attention into a website that shows prices and takes orders.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">The Syberspace Fashion &amp; Beauty ₦50K Website Sprint is for tailors, hair vendors, makeup artists, skincare brands, and lash or nail studios ready to look more legitimate online.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/website-sprint#apply" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-700">Request a Slot <CustomIcon name="arrow-right" className="h-4 w-4" /></Link>
            <Link href="/website-sprint" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 hover:bg-slate-50">View Package Details</Link>
          </div>
        </div>
        <div className="rounded-3xl border border-cyan-200 bg-slate-50 p-7 sm:p-9">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-700">The package</p>
          <p className="mt-3 text-5xl font-extrabold tracking-tight text-slate-950">₦50K</p>
          <ul className="mt-6 space-y-4 text-sm font-medium leading-relaxed text-slate-700">
            <li className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />Responsive product, price, or service showcase</li>
            <li className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />One year of standard hosting</li>
            <li className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />One standard .com.ng domain for the first year</li>
            <li className="flex gap-3"><CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />WhatsApp ordering and booking enquiries</li>
          </ul>
          <p className="mt-6 border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-500">Advanced applications, e-commerce, paid advertising, premium assets, and ongoing maintenance are outside this package.</p>
        </div>
      </div>
    </section>
  );
}
