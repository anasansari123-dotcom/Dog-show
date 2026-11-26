"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Download, Images, Mic, Newspaper, Phone } from "lucide-react";
import { CONTACTS, PRESS_KIT, WHATSAPP_NUMBER } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

const accreditation = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello AUC Team, I'm from the media and would like to cover the AUC Grand Dog Show 2026 (20 December). Name / Organisation:",
)}`;

const secretary = CONTACTS.find((c) => c.role === "General Secretary") ?? CONTACTS[0];

export default function MediaKit() {
  return (
    <section id="press" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Press & Media"
          title={<>Media <span className="text-brand-gradient">Centre</span></>}
          subtitle="Official logos, posters and event material for news, social media and partners — free to download and share."
        />

        {/* Press kit */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {PRESS_KIT.map((k, i) => (
            <motion.a
              key={k.src}
              href={k.src}
              download={k.file}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className={`relative aspect-[4/3] overflow-hidden ${k.type === "PNG" ? "bg-slate-50" : "bg-slate-100"}`}>
                <Image
                  src={k.src}
                  alt={k.title}
                  fill
                  sizes="(min-width:768px) 33vw, 50vw"
                  className={`${k.type === "PNG" ? "object-contain p-8" : "object-cover object-top"} transition duration-700 group-hover:scale-105`}
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-bold text-navy">{k.title}</p>
                  <p className="text-xs text-slate-500">{k.type}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-auc-amber transition group-hover:bg-auc-amber group-hover:text-navy">
                  <Download className="h-5 w-5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Info cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-auc-green text-white">
                <Images className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-navy">Photos from our last show</h3>
              <p className="mt-2 text-sm text-slate-600">
                39 photos from the AUC Championship Dog Show, Varanasi (15 March 2026) are in our gallery.
              </p>
              <Link href="/gallery" className="mt-4 inline-block text-sm font-bold text-auc-blue hover:underline">
                Open gallery →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-auc-blue text-white">
                <Camera className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-navy">Photo credit</h3>
              <p className="mt-2 text-sm text-slate-600">
                Varanasi show photos: <span className="font-semibold">Diganta Dhara / Dogs99.com</span>. Please keep this credit when you use those photos.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="grain relative h-full overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-2xl">
              <span className="btn-gold flex h-12 w-12 items-center justify-center rounded-2xl">
                <Mic className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">Covering the show?</h3>
              <p className="mt-2 text-sm text-white/70">Journalists, YouTubers and photographers — tell us you're coming and we'll help on show day.</p>
              <div className="mt-5 flex flex-col gap-2.5">
                <a href={accreditation} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold">
                  <Newspaper className="h-4 w-4" /> Media Enquiry
                </a>
                <a href={`tel:+91${secretary.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold transition hover:bg-white/10">
                  <Phone className="h-4 w-4" /> {secretary.name}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
