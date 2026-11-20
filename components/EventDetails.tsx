"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Hourglass, IndianRupee, MapPin } from "lucide-react";
import { EVENT, FACILITIES } from "@/lib/data";
import { Icon, Reveal, SectionHeading } from "./ui";

const INFO = [
  { icon: CalendarDays, label: "Show Date", value: EVENT.dateLabel },
  { icon: Clock, label: "Timing", value: EVENT.time },
  { icon: Hourglass, label: "Last Date for Entry", value: EVENT.lastEntry },
  { icon: IndianRupee, label: "Entry Fee", value: `${EVENT.fee} per dog` },
  { icon: MapPin, label: "Venue", value: `${EVENT.venue}, ${EVENT.venueCity}` },
];

export default function EventDetails() {
  return (
    <section id="event" className="grain relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-auc-blue/30 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          dark
          eyebrow="The Event"
          title={<>Everything you need to know about <span className="text-gold-gradient">Show Day</span></>}
          subtitle="A full day of breed competitions, awards and celebration — designed for dogs, owners and families."
        />

        {/* Info cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {INFO.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.08} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <div className="glass group h-full rounded-3xl p-6 transition duration-500 hover:-translate-y-2 hover:border-gold/60 hover:bg-white/10">
                <div className="btn-gold flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:rotate-12">
                  <it.icon className="h-6 w-6" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-white/50">{it.label}</p>
                <p className="mt-1 font-display text-lg font-bold leading-snug">{it.value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Layout + facilities */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal x={-50} y={0}>
            <div className="group relative overflow-hidden rounded-3xl border border-gold/40 shadow-2xl">
              <Image
                src="/images/event-layout.jpeg"
                alt="AUC Grand Dog Show event layout plan"
                width={1280}
                height={853}
                className="h-auto w-full transition duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold-light">Event Layout & Plan</p>
                  <p className="font-display text-2xl font-bold">A grand ground built for champions</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="font-display text-3xl font-bold">Key Facilities</h3>
              <p className="mt-2 text-white/60">Thoughtfully planned so every dog and visitor has a comfortable, safe experience.</p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {FACILITIES.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-auc-amber/60 hover:bg-auc-amber/10"
                >
                  <Icon name={f.icon} className="h-7 w-7 text-auc-amber" />
                  <span className="text-xs font-semibold leading-tight text-white/85">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <Reveal className="mt-20">
          <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:grid-cols-[1fr_1.6fr]">
            <div className="flex flex-col justify-center p-8 md:p-10">
              <MapPin className="h-10 w-10 text-auc-amber" />
              <h3 className="mt-4 font-display text-3xl font-bold">Find the Venue</h3>
              <p className="mt-3 text-lg text-white/80">{EVENT.venue}</p>
              <p className="text-white/60">{EVENT.venueCity}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-6 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 font-bold transition hover:scale-105"
              >
                <MapPin className="h-4 w-4" /> Get Directions
              </a>
            </div>
            <iframe
              title="Venue map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(EVENT.mapQuery)}&output=embed`}
              className="h-80 w-full grayscale-[30%] lg:h-full lg:min-h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
