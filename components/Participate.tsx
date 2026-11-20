"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ShieldCheck, Trophy, UserCheck } from "lucide-react";
import { useState } from "react";
import { ACTIVITIES, BENEFITS, CATEGORIES, FAQS, RULES } from "@/lib/data";
import { Icon, Reveal, SectionHeading } from "./ui";

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q} delay={i * 0.06}>
            <div
              className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                isOpen ? "border-auc-amber shadow-xl shadow-auc-amber/10" : "border-slate-200"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-navy md:text-lg">{f.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    isOpen ? "bg-auc-amber text-navy" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="px-5 pb-5 leading-relaxed text-slate-600">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function ListCard({
  title,
  items,
  icon: IconCmp,
  accent,
  delay,
}: {
  title: string;
  items: string[];
  icon: typeof Trophy;
  accent: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
        <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${accent} opacity-10 transition duration-700 group-hover:scale-[3]`} />
        <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${accent} text-white shadow-lg`}>
          <IconCmp className="h-7 w-7" />
        </div>
        <h3 className="relative mt-5 font-display text-2xl font-bold text-navy">{title}</h3>
        <ul className="relative mt-4 space-y-2.5">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-auc-green" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Participate() {
  return (
    <section id="participate" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Join the show"
          title={<>Come, be a part of the show <span className="text-brand-gradient">with your beloved companion!</span></>}
          subtitle="No fancy pedigree or professional training required — every dog and every owner is welcome."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Hindi poster preview */}
          <Reveal x={-50} y={0} className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl ring-1 ring-slate-200">
                <Image src="/images/poster-hindi.jpeg" alt="Dog show guide in Hindi" width={1024} height={1536} className="h-auto w-full" />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-auc-green px-5 py-4 text-white shadow-xl">
                <p className="font-hindi text-lg font-bold">डॉग शो का हिस्सा बनिए!</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="mb-6 font-display text-3xl font-bold text-navy">Frequently Asked Questions</h3>
            </Reveal>
            <Faq />

            {/* Handler */}
            <Reveal className="mt-8">
              <div className="flex gap-5 rounded-3xl bg-gradient-to-br from-auc-blue to-navy p-7 text-white shadow-xl">
                <UserCheck className="h-12 w-12 shrink-0 text-auc-amber" />
                <div>
                  <h4 className="font-display text-xl font-bold">Professional Handler Facility</h4>
                  <p className="mt-2 text-white/80">
                    Not comfortable presenting your dog in the ring? Our experienced handlers will help — ownership remains yours, and all
                    trophies & awards go to the registered participant.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <ListCard title="Expected Categories" items={CATEGORIES} icon={Trophy} accent="bg-auc-green" delay={0} />
          <ListCard title="Main Activities" items={ACTIVITIES} icon={Trophy} accent="bg-auc-blue" delay={0.1} />
          <ListCard title="Important Rules" items={RULES} icon={ShieldCheck} accent="bg-auc-amber" delay={0.2} />
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">* Final categories will be announced as per the event rules.</p>

        {/* Benefits */}
        <Reveal className="mt-20">
          <h3 className="text-center font-display text-3xl font-bold text-navy">Benefits of Participating</h3>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.text}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4 rounded-2xl border border-auc-amber/30 bg-gradient-to-r from-auc-amber/10 to-transparent p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-auc-amber">
                <Icon name={b.icon} className="h-6 w-6" />
              </div>
              <p className="font-semibold text-navy">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
