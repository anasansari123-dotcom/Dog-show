"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Expand, Hourglass, IndianRupee, MapPin, Navigation } from "lucide-react";
import { EVENT, FACILITIES } from "@/lib/data";
import { Icon, Reveal, SectionHeading } from "./ui";

const INFO = [
  { icon: CalendarDays, label: "Show Date", value: "Sun, 20 Dec 2026" },
  { icon: Clock, label: "Timing", value: EVENT.time },
  { icon: Hourglass, label: "Last Date for Entry", value: EVENT.lastEntry },
  { icon: IndianRupee, label: "Entry Fee", value: `${EVENT.fee} / dog` },
];

const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT.mapQuery)}`;

export default function EventDetails() {
  return (
    <section id="event" className="relative overflow-hidden bg-white pt-14 pb-24 text-navy md:pt-20 md:pb-32">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="The Event"
          title={<>Everything you need to know about <span className="text-brand-gradient">Show Day</span></>}
          subtitle="A full day of breed competitions, awards and celebration — designed for dogs, owners and families."
        />

        {/* Key info — one "ticket" panel */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-navy/5">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {INFO.map((it, i) => (
                <div
                  key={it.label}
                  className={`flex items-center gap-3 p-4 sm:gap-4 sm:p-6 ${i % 2 === 0 ? "border-r border-slate-200" : ""} ${
                    i < 2 ? "border-b border-slate-200 lg:border-b-0" : ""
                  } ${i === 1 ? "lg:border-r" : ""}`}
                >
                  <span className="btn-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl">
                    <it.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">{it.label}</p>
                    <p className="mt-0.5 font-display text-base font-bold leading-tight text-navy sm:text-lg">{it.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* venue strip */}
            <div className="flex flex-col gap-4 border-t border-dashed border-gold/50 bg-gradient-to-r from-amber-50 via-white to-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-auc-amber sm:h-12 sm:w-12 sm:rounded-2xl">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">Venue</p>
                  <p className="font-display text-base font-bold leading-snug text-navy sm:text-lg">{EVENT.venue}</p>
                  <p className="text-sm text-slate-500">{EVENT.venueCity}</p>
                </div>
              </div>
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:scale-105"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </div>
          </div>
        </Reveal>

        {/* Layout plan + facilities */}
        <div className="mt-20 grid items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Reveal x={-40} y={0}>
            <figure>
              <a
                href="/images/event-layout.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-3xl border border-gold/40 shadow-2xl shadow-navy/15"
                aria-label="Open the full event layout plan"
              >
                <Image
                  src="/images/event-layout.jpeg"
                  alt="AUC Grand Dog Show event layout plan"
                  width={1280}
                  height={853}
                  sizes="(min-width:1024px) 55vw, 100vw"
                  className="h-auto w-full transition duration-[1.5s] group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100 max-lg:opacity-100">
                  <Expand className="h-3.5 w-3.5" /> View full size
                </span>
              </a>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-auc-blue">Event Layout & Plan</span>
                  <span className="font-display text-xl font-bold text-navy">A grand ground built for champions</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="font-display text-3xl font-bold text-navy">Key Facilities</h3>
              <p className="mt-2 text-slate-600">Thoughtfully planned so every dog and visitor has a comfortable, safe experience.</p>
            </Reveal>
            <ul className="mt-6 grid grid-cols-2 gap-2.5 [&>li:last-child:nth-child(odd)]:col-span-2">
              {FACILITIES.map((f, i) => (
                <motion.li
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 transition hover:border-auc-amber hover:bg-amber-50 sm:px-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy">
                    <Icon name={f.icon} className="h-5 w-5 text-auc-amber" />
                  </span>
                  <span className="text-xs font-semibold leading-tight text-navy sm:text-sm">{f.label}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Map */}
        <Reveal className="mt-20">
          <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-navy/5 lg:grid-cols-[1fr_1.6fr]">
            <div className="flex flex-col justify-center p-7 md:p-10">
              <MapPin className="h-10 w-10 text-auc-amber" />
              <h3 className="mt-4 font-display text-3xl font-bold text-navy">Find the Venue</h3>
              <p className="mt-3 text-lg text-slate-700">{EVENT.venue}</p>
              <p className="text-slate-500">{EVENT.venueCity}</p>
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-6 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 font-bold transition hover:scale-105"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </div>
            <iframe
              title="Venue map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(EVENT.mapQuery)}&output=embed`}
              className="h-72 w-full sm:h-80 lg:h-full lg:min-h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
