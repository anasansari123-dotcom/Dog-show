"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EVENT } from "@/lib/data";

function diff() {
  const ms = Math.max(0, new Date(EVENT.dateISO).getTime() - Date.now());
  return {
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor((ms / 3600000) % 24),
    Minutes: Math.floor((ms / 60000) % 60),
    Seconds: Math.floor((ms / 1000) % 60),
  };
}

export default function Countdown() {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid w-full max-w-md grid-cols-4 gap-1.5 sm:flex sm:gap-3">
      {(["Days", "Hours", "Minutes", "Seconds"] as const).map((k) => {
        const v = t ? String(t[k]).padStart(2, "0") : "--";
        return (
          <div key={k} className="glass relative min-w-0 overflow-hidden rounded-2xl py-3 text-center sm:w-20">
            <div className="relative h-9 overflow-hidden sm:h-10">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={v}
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 font-display text-3xl font-bold text-gold-light tabular-nums sm:text-4xl"
                >
                  {v}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/60 sm:text-xs">{k}</div>
          </div>
        );
      })}
    </div>
  );
}
