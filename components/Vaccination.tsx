"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Cat, CheckCircle2, Dog, ListChecks, Stethoscope, Syringe } from "lucide-react";
import { useState } from "react";
import { VACCINATION } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

export default function Vaccination() {
  const [pet, setPet] = useState<"dog" | "cat">("dog");
  const list = pet === "dog" ? VACCINATION.dogRecommended : VACCINATION.catRecommended;
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const done = VACCINATION.checklist.filter((c) => checked[c]).length;

  return (
    <section id="vaccination" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Health & Safety"
          title={<>Vaccination <span className="text-brand-gradient">Guidelines</span></>}
          subtitle="Healthy animals make a safe show for everyone. Please check these before show day."
        />

        {/* Mandatory banner */}
        <Reveal>
          <div className="flex flex-col gap-5 rounded-3xl border-2 border-red-200 bg-red-50 p-6 md:flex-row md:items-center md:p-8">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg">
              <AlertTriangle className="h-7 w-7" />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold text-navy">Mandatory for entry</h3>
              <ul className="mt-3 grid gap-2 md:grid-cols-3">
                {VACCINATION.mandatory.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /> {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Recommended vaccines */}
          <Reveal x={-30} y={0}>
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy/5 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-navy">
                  <Syringe className="h-6 w-6 text-auc-blue" /> Recommended Vaccines
                </h3>
                <div className="flex rounded-full bg-slate-100 p-1">
                  {(["dog", "cat"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPet(p)}
                      className={`relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold capitalize transition ${pet === p ? "text-white" : "text-slate-500"}`}
                    >
                      {pet === p && <motion.span layoutId="vac-pill" className="absolute inset-0 rounded-full bg-navy" />}
                      <span className="relative flex items-center gap-1.5">
                        {p === "dog" ? <Dog className="h-4 w-4" /> : <Cat className="h-4 w-4" />} {p}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.ul key={pet} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-3">
                {list.map((v) => (
                  <li key={v.name} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-5 py-4">
                    <div>
                      <p className="font-bold text-navy">{v.name}</p>
                      <p className="text-sm text-slate-500">{v.note}</p>
                    </div>
                    {v.note.startsWith("Mandatory") ? (
                      <span className="shrink-0 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">Required</span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-auc-green/10 px-3 py-1 text-xs font-bold text-auc-green">Recommended</span>
                    )}
                  </li>
                ))}
              </motion.ul>

              <p className="mt-5 flex items-start gap-2 rounded-2xl bg-amber-50 p-4 text-sm text-slate-600">
                <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-auc-amber" />
                Vaccines should be given well before show day. Please confirm the schedule with your own veterinarian. A vet desk is available at the venue.
              </p>
            </div>
          </Reveal>

          {/* Interactive checklist */}
          <Reveal x={30} y={0}>
            <div className="grain relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-auc-green to-navy p-6 text-white shadow-2xl md:p-8">
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="flex items-center gap-2 font-display text-2xl font-bold">
                    <ListChecks className="h-6 w-6 text-auc-amber" /> Show-Day Checklist
                  </h3>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold">
                    {done}/{VACCINATION.checklist.length}
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
                  <motion.div className="h-full rounded-full bg-auc-amber" animate={{ width: `${(done / VACCINATION.checklist.length) * 100}%` }} />
                </div>
                <ul className="mt-6 space-y-2.5">
                  {VACCINATION.checklist.map((c) => (
                    <li key={c}>
                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 transition hover:bg-white/10">
                        <input
                          type="checkbox"
                          checked={!!checked[c]}
                          onChange={(e) => setChecked((s) => ({ ...s, [c]: e.target.checked }))}
                          className="h-5 w-5 shrink-0 accent-auc-amber"
                        />
                        <span className={`text-sm font-medium transition ${checked[c] ? "text-white/50 line-through" : ""}`}>{c}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                {done === VACCINATION.checklist.length && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 text-center font-display text-lg font-bold text-gold-light">
                    All set — see you in the ring! 🐾
                  </motion.p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
