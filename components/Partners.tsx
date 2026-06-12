"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "Son of Anton",   url: "https://www.sonofanton.live", domain: "sonofanton.live"    },
  { name: "AfternoonPrep",  url: "https://afternoonprep.com",   domain: "afternoonprep.com"  },
  { name: "AIBible",        url: "https://aibible.live",        domain: "aibible.live"       },
  { name: "SecureView",     url: "https://securview.com",       domain: "securview.com"      },
  { name: "Synth",          url: "https://heysynth.com",        domain: "heysynth.com"       },
  { name: "Virtual Try On", url: "https://virtualtryon.com",    domain: "virtualtryon.com"   },
  { name: "FastCars",       url: "https://fast4car.com",        domain: "fast4car.com"       },
  { name: "Teesas",         url: "https://teesas.com",          domain: "teesas.com"         },
  { name: "Herewa",         url: "https://harewa.com/home",           domain: "harewa.com"         },
  { name: "BrickBytes",     url: "https://brickbytes.app",      domain: "brickbytes.app"     },
  { name: "Requstory",      url: "https://requstory.com",       domain: "requstory.com"      },
  { name: "DocuHelp",       url: "https://docuhelp.ai",         domain: "docuhelp.ai"        },
];

const track = [...partners, ...partners];

function LogoImg({ domain, initials }: { domain: string; initials: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
        style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)" }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-base)" }}>
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={domain}
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function PartnerCard({ p }: { p: typeof partners[0] }) {
  const initials = p.name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.06, y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl theme-card select-none"
      style={{ minWidth: 180, textDecoration: "none" }}
    >
      <LogoImg domain={p.domain} initials={initials} />
      <span className="text-sm font-semibold whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
        {p.name}
      </span>
    </motion.a>
  );
}

export default function Partners() {
  return (
    <section
      className="py-20 overflow-hidden relative"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg-surface), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg-surface), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 theme-badge-cyan">
            Trusted by Innovators
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            Companies we&apos;ve powered with AI
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            From edtech to fintech, real businesses running smarter with Syberspace AI.
          </p>
        </motion.div>
      </div>

      {/* Marquee — pause on hover */}
      <div className="relative group">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          style={{ width: "max-content" }}
        >
          {track.map((p, i) => (
            <PartnerCard key={`${p.name}-${i}`} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
