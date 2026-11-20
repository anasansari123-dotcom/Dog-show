"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { CalendarDays, Clock, MapPin, PawPrint, Play, Sparkles } from "lucide-react";
import { useRef } from "react";
import { EVENT } from "@/lib/data";
import Countdown from "./Countdown";
import { PawSvg } from "./ui";

const PAWS = [
  { top: "12%", left: "6%", size: 38, delay: 0, color: "text-auc-amber/30" },
  { top: "70%", left: "3%", size: 54, delay: 1.2, color: "text-auc-green/40" },
  { top: "30%", left: "46%", size: 28, delay: 2.1, color: "text-auc-blue/50" },
  { top: "82%", left: "44%", size: 44, delay: 0.6, color: "text-auc-amber/25" },
  { top: "8%", left: "88%", size: 34, delay: 1.7, color: "text-white/15" },
  { top: "58%", left: "94%", size: 48, delay: 2.6, color: "text-auc-amber/30" },
];

const TITLE_WORDS = ["Grand", "Dog", "Show"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // 3D tilt for poster card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 15 });

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative isolate min-h-svh overflow-hidden bg-navy pt-24 pb-16 text-white sm:pt-28 md:pt-32 md:pb-20"
    >
      {/* animated brand-colour glows */}
      <motion.div
        className="absolute -left-40 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-auc-green/40 blur-[120px]"
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-auc-blue/50 blur-[140px]"
        animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-auc-amber/30 blur-[130px]"
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,22,51,0.6)_70%)]" />

      {PAWS.map((p, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute -z-10 animate-float ${p.color}`}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: `${p.delay}s` }}
        >
          <PawSvg className="h-full w-full" />
        </div>
      ))}

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-5 md:gap-14 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT */}
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass inline-flex max-w-full items-center gap-2 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light sm:px-4 sm:text-sm sm:tracking-[0.2em]"
          >
            <Sparkles className="h-4 w-4" /> AUC Foundation Presents
          </motion.div>

          <h1 className="mt-5 font-display text-[2.55rem] font-black leading-[0.95] sm:mt-6 sm:text-7xl xl:text-8xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-2 block text-xl font-bold tracking-[0.28em] text-white/80 sm:text-3xl sm:tracking-[0.3em]"
            >
              AUC
            </motion.span>
            {TITLE_WORDS.map((w, i) => (
              <span key={w} className="mr-2 inline-block overflow-hidden pb-1 align-bottom sm:mr-4 sm:pb-2">
                <motion.span
                  className="text-gold-gradient inline-block"
                  initial={{ y: "110%", rotate: 6 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="mt-1 inline-block rounded-xl border-2 border-gold/60 px-3 py-0.5 text-3xl text-white sm:rounded-2xl sm:px-5 sm:py-1 sm:text-6xl"
            >
              2026
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-5 inline-block max-w-full -skew-x-6 bg-gradient-to-r from-[#7a1426] to-[#a3203a] px-3 py-2 font-display text-base font-semibold italic shadow-lg sm:mt-6 sm:px-5 sm:text-xl"
          >
            <span className="inline-block skew-x-6">{EVENT.subtitle}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25 }}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85 sm:text-base"
          >
            <span className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-auc-amber" /> {EVENT.dateLabel}</span>
            <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-auc-amber" /> {EVENT.time}</span>
            <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-auc-amber" /> Chahaniya, Chandauli (U.P.)</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Countdown to showtime</p>
            <Countdown />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55 }}
            className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Link href="/register" className="btn-gold group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition hover:scale-105 sm:w-auto sm:px-7 sm:py-4 sm:text-base">
              <PawPrint className="h-5 w-5 transition group-hover:rotate-12" /> Register Your Dog — {EVENT.fee}
            </Link>
            <Link href="/gallery#videos" className="glass inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-3.5 font-semibold transition hover:bg-white/15 sm:w-auto sm:py-4">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
                <Play className="relative h-4 w-4 fill-navy" />
              </span>
              Watch Highlights
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D poster card */}
        <motion.div style={{ y: yCard }} className="relative mx-auto w-full max-w-[min(100%,24rem)] px-2 sm:px-0 [perspective:1200px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: -25 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => {
              mx.set(0);
              my.set(0);
            }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* rotating gold ring */}
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[conic-gradient(from_0deg,#d9a63a,#1f5e20,#0f47a1,#f6a928,#d9a63a)] opacity-60 blur-2xl animate-spin-slow" />
            <div className="overflow-hidden rounded-[2rem] border-4 border-gold/70 shadow-2xl shadow-black/50">
              <Image
                src="/images/poster-main.jpeg"
                alt="AUC Grand Dog Show 2026 official poster"
                width={1024}
                height={1536}
                priority
                className="h-auto w-full"
              />
            </div>

            {/* floating UKC badge */}
            <motion.div
              style={{ transform: "translateZ(60px)" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-2 top-10 rounded-2xl bg-white p-2 shadow-2xl sm:-left-12 sm:top-16"
            >
              <Image src="/images/ukc-logo.jpeg" alt="United Kennel Club (India)" width={84} height={84} className="h-16 w-16 sm:h-20 sm:w-20" />
            </motion.div>

            {/* floating fee badge */}
            <motion.div
              style={{ transform: "translateZ(80px)" }}
              animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="btn-gold absolute right-2 bottom-16 rounded-2xl px-3 py-2 text-center sm:-right-10 sm:bottom-24 sm:px-4 sm:py-3"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest">Entry Fee</div>
              <div className="font-display text-2xl font-black">{EVENT.fee}</div>
            </motion.div>
          </motion.div>

          {/* rotating circular text seal */}
          <div className="absolute -bottom-10 -left-6 hidden h-32 w-32 sm:block">
            <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow">
              <defs>
                <path id="circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
              </defs>
              <circle cx="100" cy="100" r="98" fill="#0a1633" stroke="#d9a63a" strokeWidth="3" />
              <text fill="#f6d27a" fontSize="17" fontWeight="700" letterSpacing="5">
                <textPath href="#circle">• ALL BREED • CHAMPIONSHIP • 20 DEC 2026 </textPath>
              </text>
            </svg>
            <PawSvg className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-auc-amber" />
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#marquee"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 md:flex"
      >
        Scroll
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30 pt-2">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-white"
          />
        </span>
      </motion.a>
    </section>
  );
}
