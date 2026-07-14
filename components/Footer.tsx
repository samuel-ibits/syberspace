"use client";
import { motion, type Variants } from "framer-motion";
import Logo from "./Logo";
import { SERVICE_PAGES } from "@/lib/service-pages";
import CustomIcon, { type CustomIconName } from "@/components/CustomIcon";

const services = SERVICE_PAGES.map(service => ({
  label: service.shortName,
  href: `/services/${service.slug}`,
}));
const company  = [
  { label: "About Us",      href: "/about"         },
  { label: "Trust",         href: "/trust"         },
  { label: "Compare Zendesk", href: "/compare/syberspace-vs-zendesk" },
  { label: "AI Chat Monitor", href: "/ai-chat-monitor-for-businesses" },
  { label: "Pricing",       href: "#pricing"        },
  { label: "How It Works",  href: "#how-it-works"   },
  { label: "Case Studies",  href: "#case-studies"   },
  { label: "FAQ",           href: "#faq"            },
  { label: "Insights",      href: "#insights"       },
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
              <Logo width={160} height={36} />
            </a>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              We plug cutting-edge AI into your existing business. No rebuilding required — just results.
            </p>
            <div className="flex gap-3">
              <motion.a href="https://web.facebook.com/syberspacenetwork" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                <CustomIcon name="facebook" className="h-4 w-4" />
              </motion.a>
              <motion.a href="https://www.instagram.com/syberspace_solutions" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                <CustomIcon name="instagram" className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s.href}>
                  <motion.a href={s.href} whileHover={{ x: 4 }} className="text-sm block transition-colors" style={{ color: "var(--text-muted)" }}>{s.label}</motion.a>
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
                { icon: "mail" as CustomIconName, label: "syberspace247@gmail.com", href: "mailto:syberspace247@gmail.com" },
                { icon: "phone" as CustomIconName, label: "+234 808 626 9431",        href: "tel:+2348086269431"              },
                { icon: "whatsapp" as CustomIconName, label: "Messaging",                href: "https://wa.me/2348086269431?text=Hi%20Syberspace%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20AI%20services." },
              ].map(c => (
                <li key={c.label}>
                  <motion.a href={c.href} whileHover={{ x: 4 }} className="flex items-center gap-2 text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                    <CustomIcon name={c.icon} className="h-4 w-4" />{c.label}
                  </motion.a>
                </li>
              ))}
              <li className="pt-1">
                <div className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  <CustomIcon name="location" className="h-4 w-4 flex-shrink-0" />
                  <span>After 2nd Transformer, 4 Abdullahi Sabah St, Momoh Sani Ave, Gwagwalada, FCT</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} Syberspace. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm flex-wrap justify-center">
            <motion.a href="/privacy" whileHover={{ color: "var(--accent-cyan)" }} className="transition-colors" style={{ color: "var(--text-faint)" }}>Privacy Policy</motion.a>
            <motion.a href="/terms"   whileHover={{ color: "var(--accent-cyan)" }} className="transition-colors" style={{ color: "var(--text-faint)" }}>Terms of Service</motion.a>
            <span className="inline-flex items-center gap-1.5" style={{ color: "var(--text-faint)" }}>
              <CustomIcon name="location" className="h-4 w-4" />
              Built in Nigeria
            </span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
