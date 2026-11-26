"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { STALLS } from "@/lib/data";
import { Icon, Reveal, SectionHeading } from "./ui";

const wa = `https://wa.me/91${STALLS.contact.phone}?text=${encodeURIComponent(
  "Hello AUC Team, I'd like to book a stall at the AUC Grand Dog Show 2026 (20 December).",
)}`;

export default function StallBooking() {
  return (
    <section id="stalls" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Exhibitors"
          title={<>Book Your <span className="text-brand-gradient">Stall</span></>}
          subtitle="Put your kennel, pet shop or brand in front of hundreds of visitors and pet lovers on show day."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {/* Stall types */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {STALLS.types.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-auc-amber hover:shadow-xl"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-auc-amber transition group-hover:bg-auc-amber group-hover:text-navy">
                    <Icon name={t.icon} className="h-7 w-7" />
                  </span>
                  <span className="text-sm font-bold text-navy">{t.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <Reveal className="mt-10">
              <h3 className="font-display text-2xl font-bold text-navy">Why take a stall?</h3>
              <ul className="mt-5 space-y-3">
                {STALLS.benefits.map((b) => (
                  <li key={b.text} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                    <span className="btn-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                      <Icon name={b.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-slate-700">{b.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Price card + poster */}
          <Reveal x={40} y={0} className="lg:sticky lg:top-28">
            <div className="grain relative overflow-hidden rounded-[2rem] bg-navy p-8 text-white shadow-2xl">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">Stall booking fee</p>
                <p className="text-gold-gradient mt-2 font-display text-6xl font-black">{STALLS.fee}</p>
                <p className="mt-2 text-sm text-white/65">Standard-size exhibition stall with brand display at the venue.</p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={STALLS.poster}
                    alt="Stall booking poster — AUC Grand Dog Show"
                    width={1199}
                    height={1312}
                    sizes="(min-width:1024px) 400px, 90vw"
                    className="h-auto w-full"
                  />
                </div>

                <p className="mt-6 text-sm text-white/70">
                  For booking contact <span className="font-bold text-white">{STALLS.contact.name}</span>
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 font-bold transition hover:scale-[1.03]">
                    <MessageCircle className="h-5 w-5" /> WhatsApp
                  </a>
                  <a href={`tel:+91${STALLS.contact.phone}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 font-bold transition hover:bg-white/10">
                    <Phone className="h-5 w-5" /> {STALLS.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
