"use client";

import Link from "next/link";
import { CalendarDays, ClipboardList, Clock, IndianRupee, MapPin, MessageCircle, QrCode, Send, ShieldCheck } from "lucide-react";
import { EVENT, RULES } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

const FACTS = [
  { icon: IndianRupee, label: "Entry Fee", value: `${EVENT.fee} per dog / cat` },
  { icon: Clock, label: "Last Date for Entry", value: EVENT.lastEntry },
  { icon: CalendarDays, label: "Show Day", value: `${EVENT.dateLabel} · ${EVENT.time}` },
  { icon: MapPin, label: "Venue", value: `${EVENT.venue}, ${EVENT.venueCity}` },
];

const STEPS = [
  { icon: ClipboardList, title: "Fill the entry form", text: "Dog or cat details on our Contact page.", href: "/contact#register", cta: "Open Entry Form" },
  { icon: Send, title: "Send on WhatsApp", text: "Your form opens pre-filled in WhatsApp — just press send." },
  { icon: QrCode, title: "Pay the fee", text: "Scan the QR code above with any UPI app.", href: "#payment", cta: "Go to Payment" },
  { icon: MessageCircle, title: "Share the screenshot", text: "Send the payment screenshot on WhatsApp +91 93355 52233." },
];

export default function RegisterInfo() {
  return (
    <section id="how-to-register" className="relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(31,94,32,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(246,169,40,0.12),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Registration"
          title={<>How to <span className="text-brand-gradient">Register</span></>}
          subtitle={`${EVENT.name} · ${EVENT.subtitle}. ${EVENT.affiliation}.`}
        />

        {/* Key facts */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.06}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-auc-amber">
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{f.label}</p>
                  <p className="mt-0.5 font-bold leading-snug text-navy">{f.value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RegisterSteps() {
  return (
    <section id="steps" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Steps */}
          <Reveal x={-30} y={0}>
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy/5 md:p-8">
              <h3 className="font-display text-2xl font-bold text-navy">4 simple steps</h3>
              <ol className="mt-6 space-y-5">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="btn-gold flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-lg font-black">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="flex items-center gap-2 font-bold text-navy">
                        <s.icon className="h-4 w-4 text-auc-blue" /> {s.title}
                      </p>
                      <p className="text-sm text-slate-600">{s.text}</p>
                      {s.href && (
                        <Link href={s.href} className="mt-1.5 inline-block text-sm font-bold text-auc-blue underline-offset-4 hover:underline">
                          {s.cta} →
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                href="/contact#register"
                className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold transition hover:scale-105"
              >
                <ClipboardList className="h-5 w-5" /> Fill the Entry Form
              </Link>
            </div>
          </Reveal>

          {/* Rules */}
          <Reveal x={30} y={0}>
            <div className="grain relative h-full overflow-hidden rounded-3xl bg-navy p-6 text-white shadow-2xl md:p-8">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
              <h3 className="relative flex items-center gap-2 font-display text-2xl font-bold">
                <ShieldCheck className="h-6 w-6 text-auc-amber" /> Entry Rules
              </h3>
              <ul className="relative mt-5 space-y-3">
                {RULES.map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-white/85">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-auc-amber" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
