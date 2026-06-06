"use client";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const services = ["Process Automation", "Web Scraping", "Data Cleaning", "AI Bots", "Data Analysis", "AI Consultation"];
const company  = [
  { label: "About Us",      href: "#about"       },
  { label: "Pricing",       href: "#pricing"      },
  { label: "How It Works",  href: "#how-it-works" },
  { label: "Testimonials",  href: "#testimonials" },
];

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0  },
};

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg-surface)" }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-3xl pointer-events-none" style={{ background: "var(--glow-cyan)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <a href="#home" className="block mb-4">
              <Image src="/logo.svg" alt="Syberspace" width={160} height={36} />
            </a>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              We plug cutting-edge AI into your existing business. No rebuilding required — just results.
            </p>
            <div className="flex gap-3">
              {["in","𝕏","ig"].map(icon => (
                <motion.div key={icon} whileHover={{ scale: 1.15, y: -2 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-colors"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  {icon}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <motion.a href="#services" whileHover={{ x: 4 }} className="text-sm block transition-colors" style={{ color: "var(--text-muted)" }}>{s}</motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Company</h4>
            <ul className="space-y-2.5">
              {company.map(l => (
                <li key={l.label}>
                  <motion.a href={l.href} whileHover={{ x: 4 }} className="text-sm block transition-colors" style={{ color: "var(--text-muted)" }}>{l.label}</motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: "📧", label: "hello@syberspace.com.ng", href: "mailto:hello@syberspace.com.ng" },
                { icon: "📞", label: "+234 800 000 0000",        href: "tel:+2348000000000"              },
                { icon: "💬", label: "WhatsApp",                 href: "https://wa.me/2348000000000"    },
              ].map(c => (
                <li key={c.label}>
                  <motion.a href={c.href} whileHover={{ x: 4 }} className="flex items-center gap-2 text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                    <span className="text-base">{c.icon}</span>{c.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} Syberspace. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: "var(--text-faint)" }}>
            Built in Nigeria 🇳🇬 · Serving businesses worldwide
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
