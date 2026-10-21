import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import CustomIcon from "@/components/CustomIcon";
import LaunchpadForm from "@/components/LaunchpadForm";
import Logo from "@/components/Logo";

const url = "https://syberspacesolutions.live/launchpad";

export const metadata: Metadata = {
  title: "AI Launchpad",
  description: "Share your project with Syberspace and get a practical launch plan for AI support, automation, data, or a new digital product.",
  alternates: { canonical: url },
  openGraph: {
    title: "AI Launchpad | Syberspace",
    description: "Start your next AI, automation, data, or digital project with Syberspace.",
    url,
    type: "website",
  },
};

const steps = [
  { icon: "target" as const, title: "Share the goal", text: "Tell us what you need, your timeline, and the outcome that matters." },
  { icon: "search" as const, title: "Get a focused review", text: "We assess the best-fit tools, workflow, and quickest practical route." },
  { icon: "rocket" as const, title: "Launch with confidence", text: "You receive clear next steps and a tailored path to implementation." },
];

export default function LaunchpadPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-grid" style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}>
      <CustomCursor />
      <div className="pointer-events-none absolute -left-32 top-12 h-96 w-96 rounded-full blur-3xl" style={{ background: "var(--glow-violet)" }} />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full blur-3xl" style={{ background: "var(--glow-cyan)" }} />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Syberspace home"><Logo width={170} height={38} /></Link>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold" style={{ border: "1px solid var(--border)", background: "var(--bg-surface)" }}>
          <CustomIcon name="arrow-right" className="h-4 w-4 rotate-180" />
          Back to site
        </Link>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8 lg:pb-28 lg:pt-16">
        <div className="lg:sticky lg:top-12">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] theme-badge-cyan">
            <CustomIcon name="rocket" className="h-4 w-4" />
            Syberspace AI Launchpad
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            Turn your next idea into a <span className="gradient-text">working system.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Bring us the problem. We’ll help shape the right AI, automation, data, or digital solution—and give you a clear path from idea to launch.
          </p>

          <div className="mt-10 space-y-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4 rounded-2xl p-4" style={{ background: "color-mix(in srgb, var(--bg-surface) 78%, transparent)", border: "1px solid var(--border)" }}>
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl" style={{ background: "var(--badge-bg)", color: "var(--accent-cyan)" }}>
                  <CustomIcon name={step.icon} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Step {index + 1}</p>
                  <h2 className="mt-1 font-bold">{step.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <CustomIcon name="clock" className="h-4 w-4" style={{ color: "var(--accent-cyan)" }} />
            Expect a personal response within one business day.
          </p>
        </div>

        <LaunchpadForm />
      </section>
    </main>
  );
}
