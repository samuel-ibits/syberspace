"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomIcon from "@/components/CustomIcon";

const launchGoals = [
  "AI customer support",
  "Website chatbot",
  "Lead capture automation",
  "Workflow automation",
  "Data dashboard or reporting",
  "Web scraping or data cleanup",
  "A new website or digital product",
  "I need help choosing",
];

const timelines = ["As soon as possible", "Within 30 days", "1–3 months", "3+ months", "Just exploring"];
const budgets = ["Under ₦250,000", "₦250,000–₦750,000", "₦750,000–₦2,000,000", "₦2,000,000+", "Not sure yet"];

export default function LaunchpadForm() {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/launchpad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "We could not submit your request.");

      setSubmitted(true);
      form.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const fieldClass = "mt-2 w-full rounded-xl px-4 py-3 text-sm theme-input";
  const labelClass = "block text-sm font-medium";

  return (
    <div className="rounded-3xl p-5 theme-card sm:p-8" style={{ boxShadow: "var(--card-shadow-lg)" }}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[540px] flex-col items-center justify-center px-4 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}>
              <CustomIcon name="check" className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold">You’re on the Launchpad</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Your project brief has reached Syberspace. We’ll review it and reply by email within one business day.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-7 rounded-xl px-5 py-3 text-sm font-semibold"
              style={{ border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}
            >
              Submit another project
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--accent-cyan)" }}>Project intake</p>
              <h2 className="mt-2 text-2xl font-bold">Tell us what you want to launch</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>Fields marked with * are required.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Full name *
                <input name="name" required autoComplete="name" maxLength={100} placeholder="Your name" className={fieldClass} />
              </label>
              <label className={labelClass}>
                Work email *
                <input name="email" type="email" required autoComplete="email" maxLength={160} placeholder="you@company.com" className={fieldClass} />
              </label>
              <label className={labelClass}>
                Phone / WhatsApp
                <input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+234…" className={fieldClass} />
              </label>
              <label className={labelClass}>
                Company or brand
                <input name="company" autoComplete="organization" maxLength={120} placeholder="Your company" className={fieldClass} />
              </label>
            </div>

            <label className={labelClass}>
              Website or social page
              <input name="website" type="text" maxLength={250} placeholder="yourcompany.com" className={fieldClass} />
            </label>

            <label className={labelClass}>
              What do you want to launch? *
              <select name="goal" required defaultValue="" className={`${fieldClass} appearance-none`}>
                <option value="" disabled>Select a project type…</option>
                {launchGoals.map((goal) => <option key={goal} value={goal}>{goal}</option>)}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Preferred timeline *
                <select name="timeline" required defaultValue="" className={`${fieldClass} appearance-none`}>
                  <option value="" disabled>Select a timeline…</option>
                  {timelines.map((timeline) => <option key={timeline} value={timeline}>{timeline}</option>)}
                </select>
              </label>
              <label className={labelClass}>
                Estimated budget
                <select name="budget" defaultValue="" className={`${fieldClass} appearance-none`}>
                  <option value="" disabled>Select a range…</option>
                  {budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
                </select>
              </label>
            </div>

            <label className={labelClass}>
              Project details *
              <textarea
                name="details"
                required
                minLength={20}
                maxLength={3000}
                rows={5}
                placeholder="What problem should this solve? Tell us about your audience, current tools, and what success looks like."
                className={`${fieldClass} resize-y`}
              />
            </label>

            <label className="hidden" aria-hidden="true">
              Leave this empty
              <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
            </label>

            <label className="flex items-start gap-3 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              <input name="consent" value="yes" type="checkbox" required className="mt-0.5 h-4 w-4 accent-cyan-500" />
              <span>I agree that Syberspace may contact me about this request. *</span>
            </label>

            {error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">{error}</p>}

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: sending ? 1 : 1.01 }}
              whileTap={{ scale: sending ? 1 : 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold disabled:opacity-60"
              style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}
            >
              {sending ? "Sending your brief…" : "Launch my project"}
              {!sending && <CustomIcon name="rocket" className="h-5 w-5" />}
            </motion.button>

            <p className="text-center text-xs" style={{ color: "var(--text-faint)" }}>
              Your submission is sent securely to syberspace247@gmail.com.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
