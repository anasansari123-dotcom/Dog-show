"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Cat, CheckCircle2, ClipboardList, Dog, Download, Send, Syringe, Wallet } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CAT_SHOW, EVENT, WHATSAPP_NUMBER } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

const STEPS = [
  { icon: ClipboardList, title: "Fill the form", text: "Dog or cat details" },
  { icon: Send, title: "Send on WhatsApp", text: "One tap, pre-filled" },
  { icon: Wallet, title: "Pay the fee", text: "UPI or cash", href: "#payment" },
  { icon: Syringe, title: "Bring vaccination card", text: "Anti-Rabies mandatory", href: "#vaccination" },
];

type Field = {
  name: string;
  label: string;
  required: boolean;
  type: "text" | "tel" | "email" | "date" | "select";
  options?: string[];
  wide?: boolean;
};

const CAT_FIELDS: Field[] = [
  { name: "ownerName", label: "Owner Name", required: true, type: "text" },
  { name: "mobile", label: "Mobile No.", required: true, type: "tel" },
  { name: "email", label: "Email", required: false, type: "email" },
  { name: "catName", label: "Cat's Name", required: true, type: "text" },
  { name: "breed", label: "Breed", required: true, type: "text" },
  { name: "sex", label: "Sex", required: true, type: "select", options: ["Male", "Female"] },
  { name: "dob", label: "Date of Birth", required: false, type: "date" },
  { name: "outfit", label: "Outfit / Theme (optional)", required: false, type: "text" },
  { name: "address", label: "Address with Pin Code", required: true, type: "text", wide: true },
];

const DOG_FIELDS: Field[] = [
  { name: "ownerName", label: "Owner Name", required: true, type: "text" },
  { name: "mobile", label: "Mobile No.", required: true, type: "tel" },
  { name: "email", label: "Email", required: false, type: "email" },
  { name: "dogName", label: "Dog's Registered Name", required: true, type: "text" },
  { name: "breed", label: "Breed", required: true, type: "text" },
  { name: "sex", label: "Sex", required: true, type: "select", options: ["Male", "Female"] },
  { name: "dob", label: "Date of Birth", required: false, type: "date" },
  { name: "ukc", label: "UKC Reg. No. (if any)", required: false, type: "text" },
  { name: "microchip", label: "Microchip No. (if any)", required: false, type: "text" },
  { name: "address", label: "Address with Pin Code", required: true, type: "text", wide: true },
];

export default function Register() {
  const [sent, setSent] = useState(false);
  const [kind, setKind] = useState<"dog" | "cat">("dog");
  const FIELDS = kind === "dog" ? DOG_FIELDS : CAT_FIELDS;
  const fee = kind === "dog" ? EVENT.fee : CAT_SHOW.fee;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = FIELDS.map((f) => `${f.label}: ${String(data.get(f.name) || "-").toUpperCase()}`);
    const title = kind === "dog" ? `${EVENT.name} — Dog Entry` : `${CAT_SHOW.name} — Cat Entry`;
    const msg = `*${title}*\n\n${lines.join("\n")}\n\nI have read and agree to the Terms & Conditions. Entry fee: ${fee}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="register" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(31,94,32,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(246,169,40,0.12),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Entry Form"
          title={<>Register your <span className="text-brand-gradient">Champion</span></>}
          subtitle={`Entry fee ${EVENT.fee} per dog or cat · Last date ${EVENT.lastEntry}. Fill in the details and send them to us directly on WhatsApp.`}
        />

        {/* Steps */}
        <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {STEPS.map((s, i) => {
            const body = (
              <>
                <span className="absolute right-4 top-3 font-display text-4xl font-black text-slate-100">{i + 1}</span>
                <span className="btn-gold relative flex h-11 w-11 items-center justify-center rounded-xl">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="relative mt-3 font-bold text-navy">{s.title}</p>
                <p className="relative text-xs text-slate-500">{s.text}</p>
              </>
            );
            const cls = "relative block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg";
            return (
              <Reveal key={s.title} delay={i * 0.07}>
                {s.href ? <a href={s.href} className={cls}>{body}</a> : <div className={cls}>{body}</div>}
              </Reveal>
            );
          })}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal x={-40} y={0}>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-10">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-auc-green via-auc-blue to-auc-amber" />
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-16 text-center"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
                      <CheckCircle2 className="h-20 w-20 text-auc-green" />
                    </motion.div>
                    <h3 className="mt-6 font-display text-3xl font-bold text-navy">Almost there!</h3>
                    <p className="mt-3 max-w-md text-slate-600">
                      Your entry details have opened in WhatsApp. Press send, then complete the {fee} fee payment (Cash / UPI) as guided by
                      our team.
                    </p>
                    <a href="#payment" className="mt-4 text-sm font-bold text-auc-blue underline-offset-4 hover:underline">
                      See payment steps ↓
                    </a>
                    <button onClick={() => setSent(false)} className="mt-8 rounded-full border-2 border-navy px-6 py-3 font-bold text-navy transition hover:bg-navy hover:text-white">
                      Register another {kind}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -20 }} className="grid gap-5 sm:grid-cols-2">
                    {/* Entry type */}
                    <div className="sm:col-span-2">
                      <span className="mb-2 block text-sm font-semibold text-navy">Entry for</span>
                      <div className="grid grid-cols-2 gap-3">
                        {([
                          { k: "dog", label: "Dog Show", icon: Dog, f: EVENT.fee },
                          { k: "cat", label: "Cat Fashion Show", icon: Cat, f: CAT_SHOW.fee },
                        ] as const).map((o) => (
                          <button
                            key={o.k}
                            type="button"
                            onClick={() => setKind(o.k)}
                            className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition sm:p-4 ${
                              kind === o.k ? "border-auc-amber bg-amber-50 shadow-md" : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${kind === o.k ? "bg-navy text-auc-amber" : "bg-slate-100 text-slate-500"}`}>
                              <o.icon className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block text-sm font-bold text-navy sm:text-base">{o.label}</span>
                              <span className="text-xs text-slate-500">{o.f} per entry</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    {FIELDS.map((f) => (
                      <label key={`${kind}-${f.name}`} className={`group block ${f.wide ? "sm:col-span-2" : ""}`}>
                        <span className="mb-1.5 block text-sm font-semibold text-navy">
                          {f.label} {f.required && <span className="text-red-500">*</span>}
                        </span>
                        {f.type === "select" ? (
                          <select
                            name={f.name}
                            required={f.required}
                            defaultValue=""
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-auc-blue focus:bg-white focus:ring-4 focus:ring-auc-blue/10"
                          >
                            <option value="" disabled>Select</option>
                            {f.options?.map((o) => <option key={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input
                            name={f.name}
                            type={f.type}
                            required={f.required}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 uppercase outline-none transition placeholder:normal-case focus:border-auc-blue focus:bg-white focus:ring-4 focus:ring-auc-blue/10"
                          />
                        )}
                      </label>
                    ))}
                    <label className="flex items-start gap-3 text-sm text-slate-600 sm:col-span-2">
                      <input type="checkbox" required className="mt-1 h-4 w-4 accent-auc-green" />
                      I have read, understood and agree to the Terms & Conditions. My {kind} is entered in the show at my own risk and responsibility,
                      and has a valid Anti-Rabies vaccination.
                    </label>
                    <button
                      type="submit"
                      className="btn-gold group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold transition hover:scale-[1.02] sm:col-span-2"
                    >
                      <Send className="h-5 w-5 transition group-hover:translate-x-1" /> Send Entry via WhatsApp
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal x={40} y={0}>
            <div className="sticky top-28 space-y-5">
              <div className="group relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl ring-1 ring-slate-200">
                <Image src="/images/entry-form.jpeg" alt="Printable entry form" width={1054} height={1490} className="h-auto w-full transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-navy/80 via-transparent to-transparent p-6 opacity-0 transition group-hover:opacity-100">
                  <a href="/images/entry-form.jpeg" download="AUC-Dog-Show-Entry-Form.jpeg" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold">
                    <Download className="h-5 w-5" /> Download Printable Form
                  </a>
                </div>
              </div>
              <a
                href="/images/entry-form.jpeg"
                download="AUC-Dog-Show-Entry-Form.jpeg"
                className="flex items-center justify-center gap-2 rounded-2xl bg-navy px-6 py-4 font-bold text-white transition hover:bg-auc-blue lg:hidden"
              >
                <Download className="h-5 w-5" /> Download Printable Form
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
