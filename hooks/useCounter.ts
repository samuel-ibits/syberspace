"use client";
import { useEffect, useState } from "react";

export function useCounter(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (!active) return;
    setCount(0);
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return count;
}
