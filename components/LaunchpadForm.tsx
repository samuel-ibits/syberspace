"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomIcon from "@/components/CustomIcon";

const categories = [
  "Retail & E-commerce", "Food & Restaurant", "Health & Beauty", "Education & Training",
  "Professional Services", "Technology & Software", "Agriculture", "Fashion & Apparel",
  "Real Estate", "Logistics & Transport", "Entertainment & Media", "Other",
];
const referralSources = ["Facebook", "Instagram", "WhatsApp", "Friend or colleague", "Google search", "Other"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="block text-sm font-semibold text-slate-800">{children}</span>;
}

function FormSection({ title, optional = false, children }: { title: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-slate-200 p-5 sm:p-6">
      <legend className="px-2 text-lg font-bold text-slate-950">
        {title} {optional && <span className="text-sm font-medium text-slate-500">(optional)</span>}
      </legend>
      <div className="mt-2 space-y-5">{children}</div>
    </fieldset>
  );
}

export default function LaunchpadForm() {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const inputClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/launchpad", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "We could not submit your application.");
      form.reset();
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[560px] flex-col items-center justify-center px-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-white"><CustomIcon name="check" className="h-8 w-8" /></div>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-950">Application received</h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600">Thank you for applying to the Syberspace Business Launchpad. We review applications within 3–5 business days and will contact you if your business is selected.</p>
            <button type="button" onClick={() => setSubmitted(false)} className="mt-7 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Submit another application</button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Apply now</p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Business Launchpad Application</h2>
              <p className="mt-2 text-sm text-slate-600">Tell us about your business and what a professional landing page could help you achieve. Fields marked with * are required.</p>
            </div>

            <FormSection title="About you and your business">
              <div className="grid gap-5 sm:grid-cols-2">
                <label><FieldLabel>Full name *</FieldLabel><input name="name" required autoComplete="name" maxLength={100} placeholder="Your full name" className={inputClass} /></label>
                <label><FieldLabel>Business name *</FieldLabel><input name="businessName" required autoComplete="organization" maxLength={140} placeholder="Your business name" className={inputClass} /></label>
                <label><FieldLabel>Phone or WhatsApp number *</FieldLabel><input name="phone" required type="tel" autoComplete="tel" maxLength={40} placeholder="+234…" className={inputClass} /></label>
                <label><FieldLabel>Email address *</FieldLabel><input name="email" required type="email" autoComplete="email" maxLength={160} placeholder="you@company.com" className={inputClass} /></label>
                <label><FieldLabel>Business category *</FieldLabel><select name="category" required defaultValue="" className={`${inputClass} appearance-none`}><option value="" disabled>Select a category</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
                <label><FieldLabel>Business location *</FieldLabel><input name="location" required maxLength={160} placeholder="City, state, country" className={inputClass} /></label>
              </div>
              <label><FieldLabel>Short description of your business *</FieldLabel><textarea name="description" required minLength={20} maxLength={1500} rows={4} placeholder="What does your business offer, and who do you serve?" className={`${inputClass} resize-y`} /></label>
            </FormSection>

            <FormSection title="Your online presence" optional>
              <div className="grid gap-5 sm:grid-cols-2">
                <label><FieldLabel>Existing website</FieldLabel><input name="website" maxLength={250} placeholder="yourbusiness.com" className={inputClass} /></label>
                <label><FieldLabel>Instagram</FieldLabel><input name="instagram" maxLength={250} placeholder="instagram.com/yourbusiness" className={inputClass} /></label>
                <label><FieldLabel>Facebook</FieldLabel><input name="facebook" maxLength={250} placeholder="facebook.com/yourbusiness" className={inputClass} /></label>
                <label><FieldLabel>TikTok</FieldLabel><input name="tiktok" maxLength={250} placeholder="tiktok.com/@yourbusiness" className={inputClass} /></label>
              </div>
              <label><FieldLabel>Other social link</FieldLabel><input name="otherSocial" maxLength={250} placeholder="Add another relevant link" className={inputClass} /></label>
            </FormSection>

            <FormSection title="Your challenge and goals">
              <label><FieldLabel>Main business challenge *</FieldLabel><textarea name="challenge" required minLength={20} maxLength={2000} rows={4} placeholder="What is making it difficult to attract, convince, or convert customers online?" className={`${inputClass} resize-y`} /></label>
              <label><FieldLabel>Desired outcome from the Launchpad *</FieldLabel><textarea name="outcome" required minLength={20} maxLength={2000} rows={4} placeholder="What would you like your new landing page to help your business achieve?" className={`${inputClass} resize-y`} /></label>
            </FormSection>

            <FormSection title="Additional information" optional>
              <label><FieldLabel>How did you hear about the Launchpad?</FieldLabel><select name="referral" defaultValue="" className={`${inputClass} appearance-none`}><option value="">Select an option</option>{referralSources.map((source) => <option key={source} value={source}>{source}</option>)}</select></label>
              <label><FieldLabel>Anything else we should know?</FieldLabel><textarea name="additional" maxLength={1500} rows={3} placeholder="Share any useful context, deadlines, or content readiness." className={`${inputClass} resize-y`} /></label>
            </FormSection>

            <FormSection title="Terms and consent">
              <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"><input name="acceptTerms" value="yes" type="checkbox" required className="mt-1 h-4 w-4 flex-none accent-cyan-600" /><span>I have read and accept the <a href="#terms" className="font-semibold text-cyan-700 underline">campaign terms</a> and understand the scope and exclusions of the Business Launchpad offer. *</span></label>
              <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"><input name="consent" value="yes" type="checkbox" required className="mt-1 h-4 w-4 flex-none accent-cyan-600" /><span>I consent to Syberspace processing my application information under its <a href="/privacy" target="_blank" className="font-semibold text-cyan-700 underline">privacy policy</a> to administer this campaign and contact me about the outcome. *</span></label>
            </FormSection>

            <label className="hidden" aria-hidden="true">Leave this empty<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
            {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <motion.button type="submit" disabled={sending} whileHover={{ scale: sending ? 1 : 1.01 }} whileTap={{ scale: sending ? 1 : 0.98 }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-700 disabled:opacity-60">
              {sending ? "Submitting your application…" : "Submit Application"}{!sending && <CustomIcon name="send" className="h-5 w-5" />}
            </motion.button>
            <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500"><CustomIcon name="clock" className="h-4 w-4" /> We review applications within 3–5 business days.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
