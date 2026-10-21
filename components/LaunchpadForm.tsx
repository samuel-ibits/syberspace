"use client";

import { useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomIcon from "@/components/CustomIcon";
import {
  LAUNCHPAD_CATEGORIES,
  LAUNCHPAD_REFERRAL_SOURCES,
  type LaunchpadField,
  type LaunchpadFieldErrors,
  validateLaunchpadSubmission,
} from "@/lib/launchpad-validation";

const inputClass = "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-4";

function fieldClass(hasError: boolean) {
  return `${inputClass} ${hasError ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-cyan-600 focus:ring-cyan-100"}`;
}

function FieldError({ name, errors }: { name: LaunchpadField; errors: LaunchpadFieldErrors }) {
  return errors[name] ? <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-red-700">{errors[name]}</p> : null;
}

function TextInput({ label, name, errors, ...props }: { label: string; name: LaunchpadField; errors: LaunchpadFieldErrors } & Omit<InputHTMLAttributes<HTMLInputElement>, "name">) {
  const hasError = Boolean(errors[name]);
  return <label><span className="block text-sm font-semibold text-slate-800">{label}</span><input {...props} name={name} className={fieldClass(hasError)} aria-invalid={hasError} aria-describedby={hasError ? `${name}-error` : undefined} /><FieldError name={name} errors={errors} /></label>;
}

function TextArea({ label, name, errors, ...props }: { label: string; name: LaunchpadField; errors: LaunchpadFieldErrors } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  const hasError = Boolean(errors[name]);
  return <label><span className="block text-sm font-semibold text-slate-800">{label}</span><textarea {...props} name={name} className={`${fieldClass(hasError)} resize-y`} aria-invalid={hasError} aria-describedby={hasError ? `${name}-error` : undefined} /><FieldError name={name} errors={errors} /></label>;
}

function SelectField({ label, name, errors, children, ...props }: { label: string; name: LaunchpadField; errors: LaunchpadFieldErrors; children: ReactNode } & Omit<SelectHTMLAttributes<HTMLSelectElement>, "name">) {
  const hasError = Boolean(errors[name]);
  return <label><span className="block text-sm font-semibold text-slate-800">{label}</span><select {...props} name={name} className={`${fieldClass(hasError)} appearance-none`} aria-invalid={hasError} aria-describedby={hasError ? `${name}-error` : undefined}>{children}</select><FieldError name={name} errors={errors} /></label>;
}

function FormSection({ title, optional = false, children }: { title: string; optional?: boolean; children: ReactNode }) {
  return <fieldset className="rounded-2xl border border-slate-200 p-5 sm:p-6"><legend className="px-2 text-lg font-bold text-slate-950">{title} {optional && <span className="text-sm font-medium text-slate-500">(optional)</span>}</legend><div className="mt-2 space-y-5">{children}</div></fieldset>;
}

type ApiResult = { error?: string; fieldErrors?: LaunchpadFieldErrors; requestId?: string };

export default function LaunchpadForm() {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LaunchpadFieldErrors>({});

  function focusFirstError(form: HTMLFormElement, errors: LaunchpadFieldErrors) {
    const firstField = Object.keys(errors)[0];
    if (!firstField) return;
    requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus());
  }

  function handleFieldChange(event: React.FormEvent<HTMLFormElement>) {
    const field = (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).name as LaunchpadField;
    if (field && fieldErrors[field]) setFieldErrors((current) => ({ ...current, [field]: undefined }));
    if (error) setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const rawPayload = Object.fromEntries(new FormData(form).entries());
    const validation = validateLaunchpadSubmission(rawPayload);
    if (Object.keys(validation.fieldErrors).length) {
      setFieldErrors(validation.fieldErrors);
      setError("Please correct the highlighted fields and submit again.");
      focusFirstError(form, validation.fieldErrors);
      return;
    }

    setSending(true);
    setError("");
    setFieldErrors({});
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch("/api/launchpad", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(validation.data),
        signal: controller.signal,
      });

      let result: ApiResult = {};
      try { result = (await response.json()) as ApiResult; } catch { /* handled by status below */ }

      if (!response.ok) {
        if (result.fieldErrors && Object.keys(result.fieldErrors).length) {
          setFieldErrors(result.fieldErrors);
          focusFirstError(form, result.fieldErrors);
        }
        const reference = result.requestId ? ` Reference: ${result.requestId}.` : "";
        throw new Error(`${result.error || "We could not submit your application."}${reference}`);
      }

      form.reset();
      setSubmitted(true);
    } catch (submitError) {
      if (submitError instanceof DOMException && submitError.name === "AbortError") {
        setError("The request took too long. Check your connection and try again—your form details are still here.");
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
          <motion.div key="success" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[560px] flex-col items-center justify-center px-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-white"><CustomIcon name="check" className="h-8 w-8" /></div>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-950">Application received</h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600">Thank you for applying to the Syberspace Business Launchpad. We review applications within 3–5 business days and will contact you if your business is selected.</p>
            <button type="button" onClick={() => setSubmitted(false)} className="mt-7 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Submit another application</button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} onChange={handleFieldChange} className="space-y-6">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Apply now</p><h2 className="mt-2 text-3xl font-extrabold text-slate-950">Business Launchpad Application</h2><p className="mt-2 text-sm text-slate-600">Tell us about your business and what a professional landing page could help you achieve. Fields marked with * are required.</p></div>

            <FormSection title="About you and your business">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextInput label="Full name *" name="name" errors={fieldErrors} autoComplete="name" maxLength={100} placeholder="Your full name" />
                <TextInput label="Business name *" name="businessName" errors={fieldErrors} autoComplete="organization" maxLength={140} placeholder="Your business name" />
                <TextInput label="Phone or WhatsApp number *" name="phone" errors={fieldErrors} type="tel" inputMode="tel" autoComplete="tel" maxLength={40} placeholder="+234…" />
                <TextInput label="Email address *" name="email" errors={fieldErrors} type="email" inputMode="email" autoComplete="email" maxLength={160} placeholder="you@company.com" />
                <SelectField label="Business category *" name="category" errors={fieldErrors} defaultValue=""><option value="" disabled>Select a category</option>{LAUNCHPAD_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</SelectField>
                <TextInput label="Business location *" name="location" errors={fieldErrors} maxLength={160} placeholder="City, state, country" />
              </div>
              <TextArea label="Short description of your business *" name="description" errors={fieldErrors} maxLength={1500} rows={4} placeholder="What does your business offer, and who do you serve?" />
            </FormSection>

            <FormSection title="Your online presence" optional>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextInput label="Existing website" name="website" errors={fieldErrors} inputMode="url" maxLength={250} placeholder="yourbusiness.com" />
                <TextInput label="Instagram" name="instagram" errors={fieldErrors} maxLength={250} placeholder="instagram.com/yourbusiness" />
                <TextInput label="Facebook" name="facebook" errors={fieldErrors} maxLength={250} placeholder="facebook.com/yourbusiness" />
                <TextInput label="TikTok" name="tiktok" errors={fieldErrors} maxLength={250} placeholder="tiktok.com/@yourbusiness" />
              </div>
              <TextInput label="Other social link" name="otherSocial" errors={fieldErrors} maxLength={250} placeholder="Add another relevant link" />
            </FormSection>

            <FormSection title="Your challenge and goals">
              <TextArea label="Main business challenge *" name="challenge" errors={fieldErrors} maxLength={2000} rows={4} placeholder="What is making it difficult to attract, convince, or convert customers online?" />
              <TextArea label="Desired outcome from the Launchpad *" name="outcome" errors={fieldErrors} maxLength={2000} rows={4} placeholder="What would you like your new landing page to help your business achieve?" />
            </FormSection>

            <FormSection title="Additional information" optional>
              <SelectField label="How did you hear about the Launchpad?" name="referral" errors={fieldErrors} defaultValue=""><option value="">Select an option</option>{LAUNCHPAD_REFERRAL_SOURCES.map((source) => <option key={source} value={source}>{source}</option>)}</SelectField>
              <TextArea label="Anything else we should know?" name="additional" errors={fieldErrors} maxLength={1500} rows={3} placeholder="Share any useful context, deadlines, or content readiness." />
            </FormSection>

            <FormSection title="Terms and consent">
              <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"><input name="acceptTerms" value="yes" type="checkbox" className="mt-1 h-4 w-4 flex-none accent-cyan-600" aria-invalid={Boolean(fieldErrors.acceptTerms)} aria-describedby={fieldErrors.acceptTerms ? "acceptTerms-error" : undefined} /><span>I have read and accept the <a href="#terms" className="font-semibold text-cyan-700 underline">campaign terms</a> and understand the scope and exclusions of the Business Launchpad offer. *</span></label><FieldError name="acceptTerms" errors={fieldErrors} />
              <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"><input name="consent" value="yes" type="checkbox" className="mt-1 h-4 w-4 flex-none accent-cyan-600" aria-invalid={Boolean(fieldErrors.consent)} aria-describedby={fieldErrors.consent ? "consent-error" : undefined} /><span>I consent to Syberspace processing my application information under its <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-700 underline">privacy policy</a> to administer this campaign and contact me about the outcome. *</span></label><FieldError name="consent" errors={fieldErrors} />
            </FormSection>

            <label className="hidden" aria-hidden="true">Leave this empty<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
            {error && <div role="alert" aria-live="polite" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"><p className="font-semibold">Application not submitted</p><p className="mt-1">{error}</p><p className="mt-2">If the problem continues, email <a href="mailto:syberspace247@gmail.com" className="font-semibold underline">syberspace247@gmail.com</a>.</p></div>}
            <motion.button type="submit" disabled={sending} aria-busy={sending} whileHover={{ scale: sending ? 1 : 1.01 }} whileTap={{ scale: sending ? 1 : 0.98 }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60">
              {sending ? "Submitting your application…" : "Submit Application"}{!sending && <CustomIcon name="send" className="h-5 w-5" />}
            </motion.button>
            <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500"><CustomIcon name="clock" className="h-4 w-4" /> We review applications within 3–5 business days.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
