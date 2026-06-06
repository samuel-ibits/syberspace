"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  const trailX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX); mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = () => {
      const el = document.elementFromPoint(mouseX.get(), mouseY.get());
      const isClickable = el?.closest("a,button,[role=button],input,textarea,select,details") != null;
      setHovering(isClickable);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [visible]);

  // Only on desktop
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Trail dot */}
      <motion.div
        style={{ x: trailX, y: trailY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{ scale: clicking ? 0.6 : hovering ? 2.5 : 1, opacity: visible ? 1 : 0 }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      >
        <div className="w-8 h-8 rounded-full border border-cyan-400/60 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
      {/* Main dot */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{ scale: clicking ? 0.7 : 1, opacity: visible ? 1 : 0 }}
      >
        <div className={`rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          hovering ? "w-3 h-3 bg-cyan-400" : "w-2 h-2 bg-cyan-400"
        }`} />
      </motion.div>
    </>
  );
}
