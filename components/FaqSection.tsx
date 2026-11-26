"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { FAQ_GROUPS, WHATSAPP_NUMBER } from "@/lib/data";
import { Icon, Reveal, SectionHeading } from "./ui";

const ask = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello AUC Team, I have a question about the AUC Grand Dog Show 2026:")}`;

export default function FaqSection() {
  const [group, setGroup] = useState(FAQ_GROUPS[0].key);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      return FAQ_GROUPS.flatMap((g) => g.items.map((it) => ({ ...it, group: g.key }))).filter(
        (it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q),
      );
    }
    const g = FAQ_GROUPS.find((x) => x.key === group) ?? FAQ_GROUPS[0];
    return g.items.map((it) => ({ ...it, group: g.key }));
  }, [group, query]);

  return (
    <section id="faq" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Help Centre"
          title={<>Frequently Asked <span className="text-brand-gradient">Questions</span></>}
          subtitle="Registration, payment, vaccination, show day — find quick answers here."
        />

        {/* search */}
        <Reveal className="mx-auto mb-10 max-w-xl">
          <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3.5 shadow-lg shadow-navy/5 focus-within:border-auc-blue focus-within:ring-4 focus-within:ring-auc-blue/10">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a question… e.g. vaccination, fee, parking"
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
              aria-label="Search FAQs"
            />
          </label>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* groups */}
          <div className={`flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible ${query ? "opacity-40" : ""}`}>
            {FAQ_GROUPS.map((g) => {
              const active = !query && group === g.key;
              return (
                <button
                  key={g.key}
                  onClick={() => {
                    setGroup(g.key);
                    setQuery("");
                    setOpen(null);
                  }}
                  className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                    active ? "bg-navy text-white shadow-lg" : "bg-white text-navy hover:bg-slate-100"
                  }`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${active ? "bg-auc-amber text-navy" : "bg-slate-100 text-auc-blue"}`}>
                    <Icon name={g.icon} className="h-4 w-4" />
                  </span>
                  {g.key}
                  <span className={`ml-auto text-xs ${active ? "text-white/50" : "text-slate-400"}`}>{g.items.length}</span>
                </button>
              );
            })}
          </div>

          {/* questions */}
          <div className="space-y-3">
            {items.length === 0 && (
              <p className="rounded-2xl bg-white p-6 text-center text-slate-500">No match found. Ask us directly on WhatsApp below.</p>
            )}
            {items.map((f) => {
              const id = `${f.group}-${f.q}`;
              const isOpen = open === id;
              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors ${isOpen ? "border-auc-amber shadow-xl shadow-auc-amber/10" : "border-slate-200"}`}
                >
                  <button onClick={() => setOpen(isOpen ? null : id)} className="flex w-full items-center justify-between gap-4 p-5 text-left" aria-expanded={isOpen}>
                    <span>
                      {query && <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-auc-blue">{f.group}</span>}
                      <span className="font-bold text-navy md:text-lg">{f.q}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isOpen ? "bg-auc-amber text-navy" : "bg-slate-100 text-slate-500"}`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <p className="px-5 pb-5 leading-relaxed text-slate-600">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl bg-gradient-to-r from-auc-blue to-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xl font-bold">Still have a question?</p>
                <p className="text-sm text-white/70">Our team replies on WhatsApp.</p>
              </div>
              <a href={ask} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold transition hover:scale-105">
                <MessageCircle className="h-5 w-5" /> Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
