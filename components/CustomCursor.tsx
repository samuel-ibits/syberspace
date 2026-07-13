"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible]   = useState(false);
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
    const up   = () => setClicking(false);
    const checkHover = () => {
      const el = document.elementFromPoint(mouseX.get(), mouseY.get());
      setHovering(el?.closest("a,button,[role=button],input,textarea,select,details") != null);
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
  }, [visible, mouseX, mouseY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        style={{ x: trailX, y: trailY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{ scale: clicking ? 0.7 : hovering ? 1.8 : 1, opacity: visible ? 0.5 : 0 }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      >
        <div className="w-8 h-8 rounded-full border border-cyan-400 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Crosshair cursor */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{ scale: clicking ? 0.75 : hovering ? 1.3 : 1, opacity: visible ? 1 : 0 }}
        transition={{ scale: { type: "spring", stiffness: 400, damping: 22 } }}
      >
        {/* Horizontal bar */}
        <div className="absolute bg-cyan-400 -translate-x-1/2 -translate-y-1/2"
          style={{ width: hovering ? 14 : 12, height: 1.5, left: 0, top: 0 }} />
        {/* Vertical bar */}
        <div className="absolute bg-cyan-400 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 1.5, height: hovering ? 14 : 12, left: 0, top: 0 }} />
        {/* Centre dot */}
        <div className="absolute bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ width: 3, height: 3, left: 0, top: 0 }} />
      </motion.div>
    </>
  );
}
