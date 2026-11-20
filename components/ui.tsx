"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  PawPrint, Trophy, Users, BookOpen, Handshake, Medal, Heart, Target, Mic, House, Store, Crown,
  Gavel, ClipboardList, Stethoscope, UtensilsCrossed, Camera, Car, type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const ICONS: Record<string, LucideIcon> = {
  PawPrint, Trophy, Users, BookOpen, Handshake, Medal, Heart, Target, Mic, House, Store, Crown,
  Gavel, ClipboardList, Stethoscope, UtensilsCrossed, Camera, Car,
};

/** Fade/slide content in once it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  x = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] ${
          dark ? "bg-white/10 text-gold-light" : "bg-auc-amber/15 text-auc-blue"
        }`}
      >
        <PawPrint className="h-3.5 w-3.5" /> {eyebrow}
      </span>
      <h2
        className={`mt-5 font-display text-4xl font-bold leading-tight md:text-5xl ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg ${dark ? "text-white/70" : "text-slate-600"}`}>{subtitle}</p>
      )}
      <div className="mx-auto mt-6 flex items-center justify-center gap-2">
        <span className="h-1 w-10 rounded-full bg-auc-green" />
        <span className="h-1 w-10 rounded-full bg-auc-blue" />
        <span className="h-1 w-10 rounded-full bg-auc-amber" />
      </div>
    </Reveal>
  );
}

/** Render a lucide icon by its string name (used by data.ts). */
export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? PawPrint;
  return <Cmp className={className} />;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-auc-green via-auc-blue to-auc-amber"
    />
  );
}

export function PawSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden>
      <ellipse cx="18" cy="20" rx="6" ry="8" />
      <ellipse cx="32" cy="13" rx="6" ry="8" />
      <ellipse cx="46" cy="20" rx="6" ry="8" />
      <ellipse cx="54" cy="34" rx="5" ry="7" />
      <ellipse cx="10" cy="34" rx="5" ry="7" />
      <path d="M32 30c-9 0-17 10-17 18 0 6 5 8 10 7 3-.5 5-2 7-2s4 1.5 7 2c5 1 10-1 10-7 0-8-8-18-17-18z" />
    </svg>
  );
}
