"use client";

import Image from "next/image";
import { animate, motion, useInView } from "framer-motion";
import { HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EVENT, FOUNDER } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const STATS = [
  { to: 4, suffix: "th", label: "Championship Edition" },
  { to: 2, suffix: "", label: "Professional Show Rings" },
  { to: 11, suffix: "+", label: "On-ground Facilities" },
  { to: 1500, suffix: "", label: "Entry Fee (₹) per Dog" },
];

const PILLARS = [
  { icon: HeartHandshake, title: "Universal Care", text: "Every dog matters — from champion pedigrees to our beloved Indian Indies.", color: "bg-auc-green" },
  { icon: ShieldCheck, title: "UKC Affiliated", text: "Officially affiliated to the United Kennel Club of India for fair, expert judging.", color: "bg-auc-blue" },
  { icon: Sparkles, title: "Community First", text: "Bringing dog lovers from villages and cities together on one grand stage.", color: "bg-auc-amber" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-auc-amber/10 blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-auc-green/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Who we are"
          title={<>Alliance for <span className="text-brand-gradient">Universal Care</span> Foundation</>}
          subtitle={`${EVENT.tagline}. ${EVENT.affiliation}.`}
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Founder card */}
          <Reveal x={-60} y={0} className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-auc-green via-auc-blue to-auc-amber opacity-90" />
            <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl">
              <Image
                src={FOUNDER.photo}
                alt={FOUNDER.name}
                width={1088}
                height={960}
                className="h-[420px] w-full object-cover object-top transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/80 to-transparent p-6 pt-20 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">Founder</p>
                <h3 className="mt-1 font-display text-2xl font-bold">{FOUNDER.name}</h3>
                <p className="text-sm text-white/70">{FOUNDER.role}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -right-6 -top-6 rounded-2xl bg-white p-2 shadow-xl"
            >
              <Image src="/images/ukc-logo.jpeg" alt="UKC India" width={80} height={80} className="h-20 w-20" />
            </motion.div>
          </Reveal>

          {/* Story */}
          <div>
            <Reveal>
              <p className="font-hindi text-2xl font-bold leading-snug text-auc-blue md:text-3xl">
                “हर डॉग खास है, हर मालिक का प्यार खास है!”
              </p>
              <p className="mt-2 text-sm italic text-slate-500">Every dog is special, every owner&apos;s love is special.</p>
              <p className="mt-6 text-lg leading-relaxed text-slate-700">
                The <b>AUC Foundation</b> brings you a special dog show where you can participate with your dog, gain new knowledge and give
                your companion a prestigious platform. We want dog lovers from every village and city to join, promote love for animals and
                give their beloved companions a new stage.
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.12} x={40} y={0}>
                  <div className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className={`${p.color} flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition group-hover:rotate-6 group-hover:scale-110`}>
                      <p.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy">{p.title}</h4>
                      <p className="text-sm text-slate-600">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <Reveal className="mt-24">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-navy/10 shadow-2xl md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-navy p-8 text-center">
                <div className="text-gold-gradient font-display text-5xl font-black">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm font-medium text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
