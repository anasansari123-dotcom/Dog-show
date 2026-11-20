"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { PawSvg } from "./ui";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  /** set when the next section is also navy, so the curve blends in */
  dark?: boolean;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy pt-32 pb-16 text-white sm:pt-36 sm:pb-24 md:pt-44 md:pb-32">
      {image && (
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-20 blur-[2px]" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-navy/85 to-navy" />
      <motion.div
        className="absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-auc-green/40 blur-[110px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-auc-blue/50 blur-[110px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <PawSvg className="absolute right-[8%] top-32 -z-10 h-16 w-16 animate-float text-auc-amber/25" />
      <PawSvg className="absolute bottom-10 left-[10%] -z-10 h-12 w-12 animate-float text-white/10 [animation-delay:1.5s]" />

      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          aria-label="Breadcrumb"
          className="glass mx-auto inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
        >
          <Link href="/" className="transition hover:text-gold-light">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gold-light">{eyebrow}</span>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-4xl font-black leading-tight sm:text-5xl md:text-7xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-white/75"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mt-8 flex w-fit items-center gap-2"
        >
          <span className="h-1 w-12 rounded-full bg-auc-green" />
          <span className="h-1 w-12 rounded-full bg-auc-blue" />
          <span className="h-1 w-12 rounded-full bg-auc-amber" />
        </motion.div>
      </div>

      {/* curved bottom edge */}
      <svg className={`absolute inset-x-0 -bottom-px h-12 w-full md:h-16 ${dark ? "text-navy-2" : "text-cream"}`} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,80 C360,0 1080,0 1440,80 Z" />
      </svg>
    </section>
  );
}
