"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar       from "@/components/Navbar";
import Hero         from "@/components/Hero";
import Services     from "@/components/Services";
import Positioning  from "@/components/Positioning";
import HowItWorks   from "@/components/HowItWorks";
import Stats        from "@/components/Stats";
import Pricing      from "@/components/Pricing";
import CaseStudies  from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Partners     from "@/components/Partners";
import FAQ          from "@/components/FAQ";
import Blog         from "@/components/Blog";
import About        from "@/components/About";
import Contact      from "@/components/Contact";
import Newsletter   from "@/components/Newsletter";
import Booking      from "@/components/Booking";
import Footer       from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import CustomIcon   from "@/components/CustomIcon";
import CustomCursor from "@/components/CustomCursor";

export default function HomeClient() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <Positioning />
      <Stats />
      <HowItWorks />
      <CaseStudies />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Blog />
      <About />
      <Contact />
      <Newsletter />
      <Booking onOpenChat={() => setChatOpen(true)} />
      <Footer />

      {/* Floating chat button */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setChatOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white"
            style={{ background: "#06b6d4", boxShadow: "0 8px 32px rgba(6,182,212,0.3)" }}
            aria-label="Open AI chat"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}>
              <CustomIcon name="message" className="h-6 w-6" />
            </motion.div>
            <motion.div className="absolute inset-0 rounded-full border-2 border-cyan-400"
              animate={{ scale: [1, 1.5, 1.8], opacity: [0.6, 0.3, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </motion.button>
        )}
      </AnimatePresence>

      <AIChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </main>
  );
}
