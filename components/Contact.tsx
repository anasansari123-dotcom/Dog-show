"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { CONTACTS, EVENT } from "@/lib/data";
import { PawSvg, Reveal, SectionHeading } from "./ui";

export default function Contact() {
  return (
    <section id="contact" className="grain relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-auc-green/30 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-auc-blue/40 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading dark eyebrow="Get in touch" title={<>Meet the <span className="text-gold-gradient">Organising Team</span></>} subtitle="Questions about entries, sponsorship or the event? Call or WhatsApp us anytime." />

        <div className="grid gap-6 md:grid-cols-3">
          {CONTACTS.map((c, i) => (
            <Reveal key={c.phone} delay={i * 0.12}>
              <div className="glass group relative h-full overflow-hidden rounded-3xl p-8 text-center transition duration-500 hover:-translate-y-2 hover:border-gold/60">
                <PawSvg className="absolute -right-6 -top-6 h-28 w-28 text-white/5 transition duration-700 group-hover:rotate-45 group-hover:text-auc-amber/10" />
                <div className="btn-gold mx-auto flex h-20 w-20 items-center justify-center rounded-full font-display text-3xl font-black">
                  {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{c.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-widest text-gold-light">{c.role}</p>
                <p className="mt-1 text-sm text-white/60">AUC Foundation</p>
                <div className="mt-6 flex justify-center gap-3">
                  <a href={`tel:+91${c.phone}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy transition hover:scale-105">
                    <Phone className="h-4 w-4" /> {c.phone}
                  </a>
                  <a href={`https://wa.me/91${c.phone}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${c.name}`} className="inline-flex items-center rounded-full bg-[#25D366] p-2.5 text-white transition hover:scale-110">
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#5b21b6] to-[#7c3aed] p-8 text-center shadow-2xl">
              <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
                <PawSvg className="h-16 w-16 text-white" />
              </motion.div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Event Partner</p>
              <h3 className="mt-2 font-display text-4xl font-black">{EVENT.partner}</h3>
              <p className="mt-3 text-sm text-white/80">Proudly supporting the AUC Grand Dog Show 2026</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Invitation() {
  return (
    <section id="invitation" className="pb-24 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-cream text-navy shadow-xl shadow-navy/5 md:grid-cols-[auto_1fr]">
            <Image src="/images/invitation.jpeg" alt="Special guest invitation" width={1060} height={1484} className="h-72 w-full object-cover object-top md:h-80 md:w-60" />
            <div className="p-8 md:pl-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-auc-blue">You&apos;re invited</p>
              <h3 className="mt-2 font-display text-3xl font-bold md:text-4xl">Join us as our Special Guest</h3>
              <p className="mt-3 max-w-xl text-slate-600">
                Your esteemed presence will be a great encouragement for our team and the entire dog community. See you on{" "}
                <b>{EVENT.dateLabel}</b>!
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
