"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Clock, IndianRupee, MapPin, MessageCircle } from "lucide-react";
import { CAT_SHOW, EVENT, WHATSAPP_NUMBER } from "@/lib/data";
import { Icon, Reveal, SectionHeading } from "./ui";

const enquire = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  `Hello AUC Team, I'd like to register my cat for the ${CAT_SHOW.name} on 20 December 2026.`,
)}`;

export default function CatShow() {
  const facts = [
    { icon: CalendarDays, text: EVENT.dateLabel },
    { icon: Clock, text: "Show time 9:00 AM" },
    { icon: IndianRupee, text: `Entry fee ${CAT_SHOW.fee}` },
    { icon: MapPin, text: `${EVENT.venue}, ${EVENT.venueCity}` },
  ];

  return (
    <section id="cat-show" className="relative overflow-hidden bg-gradient-to-br from-[#1b0f0a] via-[#2a1710] to-navy py-24 text-white md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-pink-500/15 blur-[130px]" />
      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/20 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          dark
          eyebrow="New this year"
          title={<>The <span className="text-gold-gradient">Cat Fashion Show</span></>}
          subtitle={`${CAT_SHOW.tagline}. Same day, same venue as the Grand Dog Show.`}
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal x={-40} y={0}>
            <div className="group relative mx-auto max-w-[260px] overflow-hidden sm:max-w-sm rounded-[2rem] border border-gold/40 shadow-2xl shadow-black/50">
              <Image
                src={CAT_SHOW.poster}
                alt="AUC Cat Fashion Show poster — 20 December 2026"
                width={853}
                height={1280}
                sizes="(min-width:1024px) 380px, 90vw"
                className="h-auto w-full transition duration-[1.4s] group-hover:scale-105"
              />
            </div>
          </Reveal>

          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {CAT_SHOW.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass group rounded-3xl p-6 transition duration-500 hover:-translate-y-1.5 hover:border-gold/60"
                >
                  <div className="btn-gold flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:rotate-12">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
                  <p className="mt-1 text-sm text-white/65">{f.text}</p>
                </motion.div>
              ))}
            </div>

            <Reveal className="mt-6">
              <ul className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 sm:grid-cols-2">
                {facts.map((f) => (
                  <li key={f.text} className="flex items-start gap-3 text-sm text-white/85">
                    <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-auc-amber" /> {f.text}
                  </li>
                ))}
              </ul>
              <a
                href={enquire}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold transition hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" /> Register your cat on WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
