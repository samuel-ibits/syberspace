"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import CustomIcon from "@/components/CustomIcon";

const links = [
  { label: "Services",     href: "#services"     },
  { label: "Compare",      href: "/compare/syberspace-vs-zendesk" },
  { label: "How It Works", href: "#how-it-works"  },
  { label: "Pricing",      href: "#pricing"       },
  { label: "About",        href: "/about"         },
  { label: "Contact",      href: "#contact"       },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg-base) 92%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#home" className="flex items-center">
            <Logo width={160} height={36} />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                className="relative text-sm font-medium transition-colors group"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-violet-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Right: toggle + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hidden md:flex items-center gap-3"
          >
            <ThemeToggle />
            <a
              href="#booking"
              className="px-5 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                background: "var(--accent-cyan)",
                color: "#0a0f1e",
                boxShadow: "0 6px 18px rgba(6,182,212,0.24)",
              }}
            >
              Book Consultation
            </a>
          </motion.div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              style={{ color: "var(--text-muted)" }}
              onClick={() => setOpen(!open)}
            >
              <CustomIcon name={open ? "x" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ borderTop: "1px solid var(--border)" }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-medium py-1 transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#booking"
                  onClick={() => setOpen(false)}
                  className="block mt-3 px-5 py-2 rounded-full text-sm font-semibold text-center transition-opacity hover:opacity-90"
                  style={{
                    background: "var(--accent-cyan)",
                    color: "#0a0f1e",
                  }}
                >
                  Book Consultation
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
