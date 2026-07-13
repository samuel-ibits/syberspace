"use client";

import { motion } from "framer-motion";
import CustomIcon, { type CustomIconName } from "@/components/CustomIcon";

const contactItems = [
  {
    icon: "location" as CustomIconName,
    title: "Office Address",
    lines: ["After 2nd Transformer, 4 Abdullahi Sabah St,", "Momoh Sani Ave, Gwagwalada 902101,", "Federal Capital Territory, Nigeria"],
  },
  {
    icon: "phone" as CustomIconName,
    title: "Phone",
    lines: ["+234 808 626 9431"],
    href: "tel:+2348086269431",
  },
  {
    icon: "mail" as CustomIconName,
    title: "Email",
    lines: ["syberspace247@gmail.com"],
    href: "mailto:syberspace247@gmail.com",
  },
  {
    icon: "clock" as CustomIconName,
    title: "Business Hours",
    lines: ["Monday - Saturday: 8:00am - 6:00pm WAT", "Sunday: By appointment only"],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)", color: "var(--accent-cyan)" }}>
            Find Us
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Visit or <span className="gradient-text">get in touch</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Based in Gwagwalada, FCT - serving clients across Nigeria and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactItems.map(item => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl theme-card">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--accent-cyan)" }}>
                  <CustomIcon name={item.icon} className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                  {item.lines.map((line, index) =>
                    item.href && index === 0 ? (
                      <a key={line} href={item.href} className="block text-sm hover:underline" style={{ color: "#06b6d4" }}>{line}</a>
                    ) : (
                      <p key={line} className="text-sm" style={{ color: "var(--text-muted)" }}>{line}</p>
                    )
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-3 flex-wrap">
              <a href="https://wa.me/2348086269431?text=Hi%20Syberspace%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20AI%20services."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}>
                <CustomIcon name="whatsapp" className="h-4 w-4" />
                WhatsApp Us
              </a>
              <a href="mailto:syberspace247@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                <CustomIcon name="mail" className="h-4 w-4" />
                Send Email
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)", height: 420 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.9939426693813!2d7.0637437746679685!3d8.92896679054749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e89002e298887%3A0x74801bda3430aeb4!2sSyberspace!5e1!3m2!1sen!2sng!4v1781277249794!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Syberspace office location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
