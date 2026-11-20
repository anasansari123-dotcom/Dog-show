"use client";

import { motion } from "framer-motion";
import { Award, Check, Crown, Handshake, Medal, Megaphone, Star, Target, TrendingUp, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { CATALOGUE_ADS, MAIN_SPONSORS, OTHER_SPONSORS, TROPHY_SPONSORS, WHATSAPP_NUMBER } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

const TABS = ["Main Packages", "Trophy Packages", "Stalls & Catalogue"] as const;
const TIER_ICONS = [Crown, Trophy, Star, Medal, Handshake];

const WHY = [
  { icon: Users, text: "Brand Visibility" },
  { icon: Target, text: "Direct Access to Dog Owners & Breeders" },
  { icon: Megaphone, text: "On-Ground & Digital Promotion" },
  { icon: Award, text: "Association with a Prestigious Canine Event" },
  { icon: Handshake, text: "Network with Industry Stakeholders" },
  { icon: TrendingUp, text: "Grow in the Pet & Canine Segment" },
];

const waLink = (pkg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello AUC Team, I'm interested in the "${pkg}" sponsorship for AUC Grand Dog Show 2026.`)}`;

export default function Sponsorship() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Main Packages");
  const [featured, ...rest] = MAIN_SPONSORS;

  return (
    <section id="sponsor" className="relative overflow-hidden bg-gradient-to-b from-cream to-amber-50/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Partner with us"
          title={<>Sponsorship <span className="text-brand-gradient">Opportunities</span></>}
          subtitle="Partner. Promote. Support the canine community — and put your brand in front of passionate dog lovers."
        />

        {/* Tabs */}
        <Reveal className="mb-12 flex justify-center">
          <div className="relative flex flex-wrap justify-center gap-1 rounded-full bg-navy p-1.5 shadow-xl">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative rounded-full px-4 py-2.5 text-sm font-bold transition sm:px-6 ${tab === t ? "text-navy" : "text-white/70 hover:text-white"}`}
              >
                {tab === t && (
                  <motion.span layoutId="tab-pill" className="btn-gold absolute inset-0 rounded-full" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div key={tab} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {tab === "Main Packages" && (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              {/* Featured */}
              <div className="grain relative overflow-hidden rounded-[2rem] bg-navy p-8 text-white shadow-2xl md:p-10">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
                <div className="relative">
                  <span className="btn-gold inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest">
                    <Crown className="h-4 w-4" /> Most Exclusive
                  </span>
                  <h3 className="mt-6 font-display text-4xl font-bold">{featured.tier}</h3>
                  <p className="text-gold-gradient mt-3 font-display text-6xl font-black">{featured.price}</p>
                  <ul className="mt-8 space-y-3">
                    {featured.perks.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-white/85">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-auc-amber text-navy">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a href={waLink(featured.tier)} target="_blank" rel="noopener noreferrer" className="btn-gold mt-10 inline-flex rounded-full px-8 py-4 font-bold transition hover:scale-105">
                    Become the Powered-By Partner
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {rest.map((s, i) => {
                  const TierIcon = TIER_ICONS[i + 1];
                  return (
                    <motion.a
                      key={s.tier}
                      href={waLink(s.tier)}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      whileHover={{ y: -8 }}
                      className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:border-auc-amber hover:shadow-2xl"
                    >
                      <div className="flex items-center justify-between">
                        <TierIcon className="h-9 w-9 text-auc-amber transition group-hover:rotate-12 group-hover:scale-110" />
                        <span className="rounded-full bg-navy px-3 py-1 font-display text-lg font-bold text-gold-light">{s.price}</span>
                      </div>
                      <h4 className="mt-4 font-display text-xl font-bold text-navy">{s.tier}</h4>
                      <ul className="mt-3 flex-1 space-y-1.5 text-sm text-slate-600">
                        {s.perks.map((p) => (
                          <li key={p} className="flex gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-auc-green" /> {p}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-4 text-sm font-bold text-auc-blue group-hover:underline">Enquire →</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "Trophy Packages" && (
            <div className="grid gap-6 md:grid-cols-3">
              {TROPHY_SPONSORS.map((t, i) => (
                <motion.div
                  key={t.tier}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`relative overflow-hidden rounded-[2rem] border bg-white p-8 text-center shadow-lg ${i === 2 ? "border-gold md:scale-105" : "border-slate-200"}`}
                >
                  <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${t.color} shadow-xl`}>
                    <Trophy className="h-12 w-12 text-white drop-shadow" />
                  </div>
                  <h4 className="mt-5 font-display text-2xl font-bold text-navy">{t.tier} Trophy Sponsor</h4>
                  <p className="mt-2 font-display text-4xl font-black text-auc-blue">{t.price}</p>
                  <ul className="mt-6 space-y-2 text-left text-slate-600">
                    {t.perks.map((p) => (
                      <li key={p} className="flex gap-2">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-auc-green" /> {p}
                      </li>
                    ))}
                  </ul>
                  <a href={waLink(`${t.tier} Trophy`)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-navy px-6 py-3 font-bold text-white transition hover:bg-auc-blue">
                    Sponsor a Trophy
                  </a>
                </motion.div>
              ))}
            </div>
          )}

          {tab === "Stalls & Catalogue" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                {OTHER_SPONSORS.map((o, i) => (
                  <motion.div
                    key={o.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-auc-amber hover:shadow-lg"
                  >
                    <div>
                      <h4 className="font-display text-xl font-bold text-navy">{o.name}</h4>
                      <p className="text-sm text-slate-500">{o.note}</p>
                    </div>
                    <span className="btn-gold shrink-0 rounded-xl px-4 py-2 font-display text-xl font-black">{o.price}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden rounded-3xl bg-navy text-white shadow-2xl">
                <div className="bg-gradient-to-r from-auc-blue to-navy px-6 py-5">
                  <h4 className="font-display text-2xl font-bold">Catalogue Advertisement Tariff</h4>
                </div>
                <ul>
                  {CATALOGUE_ADS.map((c) => (
                    <li key={c.name} className="flex items-center justify-between border-b border-white/10 px-6 py-4 transition last:border-0 hover:bg-white/5">
                      <span className="font-medium">{c.name}</span>
                      <span className="font-display text-lg font-bold text-gold-light">{c.price}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Why partner */}
        <Reveal className="mt-20">
          <h3 className="text-center font-display text-3xl font-bold text-navy">Why Partner with AUC?</h3>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {WHY.map((w, i) => (
            <Reveal key={w.text} delay={i * 0.07}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-auc-amber transition group-hover:bg-auc-amber group-hover:text-navy">
                  <w.icon className="h-7 w-7" />
                </div>
                <p className="text-sm font-semibold text-navy">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
