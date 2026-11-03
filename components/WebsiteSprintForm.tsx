"use client";

import { useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomIcon from "@/components/CustomIcon";
import { trackMetaLead } from "@/lib/meta-pixel";
import {
  WEBSITE_SPRINT_CATEGORIES,
  WEBSITE_SPRINT_PROJECT_TYPES,
  WEBSITE_SPRINT_REFERRAL_SOURCES,
  WEBSITE_SPRINT_TIMELINES,
  type WebsiteSprintField,
  type WebsiteSprintFieldErrors,
  validateWebsiteSprintSubmission,
} from "@/lib/website-sprint-validation";

const inputClass = "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-4";

function fieldClass(hasError: boolean) {
  return `${inputClass} ${hasError ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-cyan-600 focus:ring-cyan-100"}`;
}

function FieldError({ name, errors }: { name: WebsiteSprintField; errors: WebsiteSprintFieldErrors }) {
  return errors[name] ? <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-red-700">{errors[name]}</p> : null;
}

function TextInput({ label, name, errors, ...props }: { label: string; name: WebsiteSprintField; errors: WebsiteSprintFieldErrors } & Omit<InputHTMLAttributes<HTMLInputElement>, "name">) {
  const hasError = Boolean(errors[name]);
  return <label><span className="block text-sm font-semibold text-slate-800">{label}</span><input {...props} name={name} className={fieldClass(hasError)} aria-invalid={hasError} aria-describedby={hasError ? `${name}-error` : undefined} /><FieldError name={name} errors={errors} /></label>;
}

function TextArea({ label, name, errors, ...props }: { label: string; name: WebsiteSprintField; errors: WebsiteSprintFieldErrors } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  const hasError = Boolean(errors[name]);
  return <label><span className="block text-sm font-semibold text-slate-800">{label}</span><textarea {...props} name={name} className={`${fieldClass(hasError)} resize-y`} aria-invalid={hasError} aria-describedby={hasError ? `${name}-error` : undefined} /><FieldError name={name} errors={errors} /></label>;
}

function SelectField({ label, name, errors, children, ...props }: { label: string; name: WebsiteSprintField; errors: WebsiteSprintFieldErrors; children: ReactNode } & Omit<SelectHTMLAttributes<HTMLSelectElement>, "name">) {
  const hasError = Boolean(errors[name]);
  return <label><span className="block text-sm font-semibold text-slate-800">{label}</span><select {...props} name={name} className={`${fieldClass(hasError)} appearance-none`} aria-invalid={hasError} aria-describedby={hasError ? `${name}-error` : undefined}>{children}</select><FieldError name={name} errors={errors} /></label>;
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return <fieldset className="rounded-2xl border border-slate-200 p-5 sm:p-6"><legend className="px-2 text-lg font-bold text-slate-950">{title}</legend><div className="mt-2 space-y-5">{children}</div></fieldset>;
}

type ApiResult = { error?: string; fieldErrors?: WebsiteSprintFieldErrors; requestId?: string };

export default function WebsiteSprintForm() {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<WebsiteSprintFieldErrors>({});

  function focusFirstError(form: HTMLFormElement, errors: WebsiteSprintFieldErrors) {
    const firstField = Object.keys(errors)[0];
    if (firstField) requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus());
  }

  function handleFieldChange(event: React.FormEvent<HTMLFormElement>) {
    const field = (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).name as WebsiteSprintField;
    if (field && fieldErrors[field]) setFieldErrors((current) => ({ ...current, [field]: undefined }));
    if (error) setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const validation = validateWebsiteSprintSubmission(Object.fromEntries(new FormData(form).entries()));
    if (Object.keys(validation.fieldErrors).length) {
      setFieldErrors(validation.fieldErrors);
      setError("Please correct the highlighted fields and try again.");
      focusFirstError(form, validation.fieldErrors);
      return;
    }

    setSending(true);
    setError("");
    setFieldErrors({});
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch("/api/website-sprint", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(validation.data),
        signal: controller.signal,
      });
      let result: ApiResult = {};
      try { result = (await response.json()) as ApiResult; } catch { /* status handles malformed responses */ }
      if (!response.ok) {
        if (result.fieldErrors && Object.keys(result.fieldErrors).length) {
          setFieldErrors(result.fieldErrors);
          focusFirstError(form, result.fieldErrors);
        }
        const reference = result.requestId ? ` Reference: ${result.requestId}.` : "";
        throw new Error(`${result.error || "We could not submit your enquiry."}${reference}`);
      }
      trackMetaLead("fashion_beauty_website_sprint", {
        content_name: "Syberspace Fashion & Beauty ₦50K Website Sprint",
        content_category: "fashion_beauty_website_sprint",
        value: 50000,
        currency: "NGN",
      });
      form.reset();
      setSubmitted(true);
    } catch (submitError) {
      if (submitError instanceof DOMException && submitError.name === "AbortError") {
        setError("The request took too long. Check your connection and try again—your details are still here.");
      } else if (submitError instanceof TypeError) {
        setError("We could not reach the server. Check your internet connection and try again.");
      } else {
        setError(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
      }
    } finally {
      window.clearTimeout(timeout);
      setSending(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[500px] flex-col items-center justify-center px-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-white"><CustomIcon name="check" className="h-8 w-8" /></div>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-950">Your project request is in</h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600">We’ll review your fit for the Syberspace Fashion &amp; Beauty ₦50K Website Sprint and contact you using the details you supplied.</p>
            <button type="button" onClick={() => setSubmitted(false)} className="mt-7 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Submit another project</button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} onChange={handleFieldChange} className="space-y-6">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Request a fashion or beauty brand slot</p><h2 className="mt-2 text-3xl font-extrabold text-slate-950">Tell us what your brand needs online</h2><p className="mt-2 text-sm text-slate-600">This takes about three minutes. Fields marked with * are required.</p></div>

            <FormSection title="Your contact details">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextInput label="Full name *" name="name" errors={fieldErrors} autoComplete="name" maxLength={100} placeholder="Your full name" />
                <TextInput label="Brand or studio name *" name="businessName" errors={fieldErrors} autoComplete="organization" maxLength={140} placeholder="Your fashion or beauty brand" />
                <TextInput label="Phone or WhatsApp number *" name="phone" errors={fieldErrors} type="tel" inputMode="tel" autoComplete="tel" maxLength={40} placeholder="+234…" />
                <TextInput label="Email address *" name="email" errors={fieldErrors} type="email" inputMode="email" autoComplete="email" maxLength={160} placeholder="you@company.com" />
                <SelectField label="Brand category *" name="category" errors={fieldErrors} defaultValue=""><option value="" disabled>Select your fashion or beauty niche</option>{WEBSITE_SPRINT_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</SelectField>
                <TextInput label="Location *" name="location" errors={fieldErrors} maxLength={160} placeholder="City, state, country" />
              </div>
            </FormSection>

            <FormSection title="Your project">
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField label="What do you need? *" name="projectType" errors={fieldErrors} defaultValue=""><option value="" disabled>Select a project type</option>{WEBSITE_SPRINT_PROJECT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}</SelectField>
                <SelectField label="Preferred timeline *" name="timeline" errors={fieldErrors} defaultValue=""><option value="" disabled>Select a timeline</option>{WEBSITE_SPRINT_TIMELINES.map((timeline) => <option key={timeline} value={timeline}>{timeline}</option>)}</SelectField>
              </div>
              <TextArea label="Describe your brand and what you sell *" name="businessDescription" errors={fieldErrors} maxLength={1500} rows={4} placeholder="What products or services do you offer, and who buys from you?" />
              <TextArea label="What should the website help you achieve? *" name="projectGoal" errors={fieldErrors} maxLength={2000} rows={4} placeholder="For example: show prices clearly, look more legitimate, collect orders, book clients, or move Instagram followers to WhatsApp." />
              <TextArea label="Products, services, pages, or features you need" name="requiredFeatures" errors={fieldErrors} maxLength={1500} rows={3} placeholder="For example: lookbook, price list, product catalogue, size guide, booking enquiry, WhatsApp ordering, or location details." />
              <TextInput label="Current website (if any)" name="currentWebsite" errors={fieldErrors} inputMode="url" maxLength={250} placeholder="yourbusiness.com" />
            </FormSection>

            <FormSection title="Project readiness">
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField label="Are your logo, text, and images ready? *" name="contentReady" errors={fieldErrors} defaultValue=""><option value="" disabled>Select an option</option><option value="yes">Yes, ready</option><option value="partly">Partly ready</option><option value="no">Not yet</option></SelectField>
                <SelectField label="Can you approve this project? *" name="decisionMaker" errors={fieldErrors} defaultValue=""><option value="" disabled>Select an option</option><option value="yes">Yes, I can approve it</option><option value="no">No, someone else must approve</option></SelectField>
              </div>
              <SelectField label="If the proposed direction fits your needs, are you ready to pay ₦50,000 for the package? *" name="budgetCommitment" errors={fieldErrors} defaultValue=""><option value="" disabled>Select an option</option><option value="yes">Yes, I am ready to invest ₦50,000</option><option value="no">No, not at this time</option></SelectField>
              <SelectField label="How did you hear about the Website Sprint?" name="referral" errors={fieldErrors} defaultValue=""><option value="">Select an option</option>{WEBSITE_SPRINT_REFERRAL_SOURCES.map((source) => <option key={source} value={source}>{source}</option>)}</SelectField>
              <TextArea label="Anything else we should know?" name="additional" errors={fieldErrors} maxLength={1500} rows={3} placeholder="Share any useful context or deadline." />
            </FormSection>

            <FormSection title="Terms and consent">
              <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"><input name="acceptTerms" value="yes" type="checkbox" className="mt-1 h-4 w-4 flex-none accent-cyan-600" aria-invalid={Boolean(fieldErrors.acceptTerms)} aria-describedby={fieldErrors.acceptTerms ? "acceptTerms-error" : undefined} /><span>I have read the <a href="#terms" className="font-semibold text-cyan-700 underline">campaign terms</a> and understand the package scope, price, inclusions, and exclusions. *</span></label><FieldError name="acceptTerms" errors={fieldErrors} />
              <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"><input name="consent" value="yes" type="checkbox" className="mt-1 h-4 w-4 flex-none accent-cyan-600" aria-invalid={Boolean(fieldErrors.consent)} aria-describedby={fieldErrors.consent ? "consent-error" : undefined} /><span>I consent to Syberspace processing this information under its <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-700 underline">privacy policy</a> and contacting me about this project. *</span></label><FieldError name="consent" errors={fieldErrors} />
            </FormSection>

            <label className="hidden" aria-hidden="true">Leave this empty<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
            {error && <div role="alert" aria-live="polite" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"><p className="font-semibold">Request not submitted</p><p className="mt-1">{error}</p><p className="mt-2">If the problem continues, email <a href="mailto:syberspace247@gmail.com" className="font-semibold underline">syberspace247@gmail.com</a>.</p></div>}
            <motion.button type="submit" disabled={sending} aria-busy={sending} whileHover={{ scale: sending ? 1 : 1.01 }} whileTap={{ scale: sending ? 1 : 0.98 }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60">
              {sending ? "Submitting your project…" : "Request My ₦50K Project Slot"}{!sending && <CustomIcon name="send" className="h-5 w-5" />}
            </motion.button>
            <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500"><CustomIcon name="clock" className="h-4 w-4" /> We’ll contact qualified applicants using the details above.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
