"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Camera, MapPin } from "lucide-react";
import { PAST_SHOW } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

// Hand-picked frames for the mosaic: [src, alt, grid classes]
const MOSAIC: [string, string, string][] = [
  ["gsd-stacked", "German Shepherd stacked for the judge", "col-span-2 row-span-2"],
  ["great-dane-gaiting", "Great Dane gaiting in the ring", "col-span-2 md:col-span-1"],
  ["winner-labrador", "Labrador winner receiving a trophy", ""],
  ["stage-trophies-wide", "Trophies on the main stage", ""],
  ["dobermann-heel-1", "Dobermann in heel position", "col-span-2 md:col-span-1"],
  ["winner-rottweiler", "Rottweiler winner at the evening prize-giving", "col-span-4 md:col-span-1"],
];

export default function PastHighlights() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-amber-50/50 to-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Our last show"
          title={<>A look back at <span className="text-brand-gradient">Varanasi 2026</span></>}
          subtitle="Before the Grand Show in Chandauli, relive our UKC-affiliated championship — a full day of judging, handling, and an evening of trophies."
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Mosaic */}
          <div className="grid auto-rows-[140px] grid-cols-4 gap-3 sm:auto-rows-[180px] md:grid-cols-3">
            {MOSAIC.map(([file, alt, span], i) => (
              <motion.div
                key={file}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-2xl shadow-lg ${span || "col-span-2 md:col-span-1"}`}
              >
                <Image
                  src={`/images/past-show/${file}.jpg`}
                  alt={alt}
                  fill
                  sizes="(min-width:1024px) 30vw, 50vw"
                  className="object-cover transition duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>

          {/* Info card */}
          <Reveal x={40} y={0} className="h-full">
            <div className="grain relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-navy p-8 text-white shadow-2xl">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-auc-amber/25 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">Previous Edition</p>
                <h3 className="mt-3 font-display text-3xl font-bold leading-tight">{PAST_SHOW.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-white/75">
                  <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-auc-amber" /> {PAST_SHOW.date}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-auc-amber" /> Varanasi, Uttar Pradesh</p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {PAST_SHOW.highlights.map((h) => (
                    <div key={h.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-gold-gradient font-display text-xl font-black">{h.value}</p>
                      <p className="mt-1 text-xs leading-snug text-white/65">{h.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-auto pt-8">
                <Link
                  href="/gallery"
                  className="btn-gold group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold transition hover:scale-[1.02]"
                >
                  View Full Gallery <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/45">
                  <Camera className="h-3.5 w-3.5" /> {PAST_SHOW.credit}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
