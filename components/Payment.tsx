"use client";

import { motion } from "framer-motion";
import { Check, Copy, MessageCircle, QrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { PAYMENT, WHATSAPP_NUMBER } from "@/lib/data";
import { Icon, Reveal, SectionHeading } from "./ui";

const askDetails = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello AUC Team, I have sent my entry. Please share the payment details for the AUC Grand Dog Show 2026.",
)}`;

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-widest text-white/50">{label}</p>
        <p className="truncate font-mono font-semibold">{value}</p>
      </div>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/20"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function Payment() {
  const upiLink = PAYMENT.upiId
    ? `upi://pay?pa=${encodeURIComponent(PAYMENT.upiId)}&pn=${encodeURIComponent(PAYMENT.upiName)}&cu=INR`
    : null;

  return (
    <section id="payment" className="bg-slate-50 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Payment"
          title={<>Fees & <span className="text-brand-gradient">Payment</span></>}
          subtitle="Simple, transparent fees. Pay by UPI or cash once our team confirms your entry."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Fee table */}
          <Reveal x={-30} y={0}>
            <div className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-navy/5">
              <div className="bg-gradient-to-r from-auc-blue to-navy px-6 py-5 text-white">
                <h3 className="font-display text-2xl font-bold">Fee Structure</h3>
              </div>
              <ul>
                {PAYMENT.fees.map((f) => (
                  <li key={f.label} className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-4 last:border-0">
                    <span className="font-semibold text-navy">{f.label}</span>
                    <span className="btn-gold shrink-0 rounded-lg px-3 py-1 font-display text-lg font-black">{f.amount}</span>
                  </li>
                ))}
              </ul>
              <div className="grid gap-3 border-t border-slate-100 p-6 sm:grid-cols-2">
                {PAYMENT.methods.map((m) => (
                  <div key={m.title} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-auc-amber">
                      <Icon name={m.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-bold text-navy">{m.title}</p>
                      <p className="text-sm text-slate-600">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* How to pay */}
          <Reveal x={30} y={0}>
            <div className="grain relative h-full overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-2xl md:p-9">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
              <div className="relative">
                <h3 className="flex items-center gap-2 font-display text-2xl font-bold">
                  <QrCode className="h-6 w-6 text-auc-amber" /> How to Pay
                </h3>

                {PAYMENT.upiId || PAYMENT.bank ? (
                  <div className="mt-5 space-y-3">
                    {PAYMENT.upiId && <CopyRow label="UPI ID" value={PAYMENT.upiId} />}
                    {PAYMENT.bank && (
                      <>
                        <CopyRow label="Account Name" value={PAYMENT.bank.accountName} />
                        <CopyRow label="Account No." value={PAYMENT.bank.accountNo} />
                        <CopyRow label="IFSC" value={PAYMENT.bank.ifsc} />
                      </>
                    )}
                    {upiLink && (
                      <a href={upiLink} className="btn-gold flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold sm:hidden">
                        Pay with a UPI app
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
                    Payment details are shared by our team on WhatsApp after you send your entry — so every payment is matched to the right dog.
                  </p>
                )}

                <ol className="mt-6 space-y-3">
                  {PAYMENT.notes.map((n, i) => (
                    <motion.li
                      key={n}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-3 text-sm text-white/85"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-auc-amber text-xs font-black text-navy">{i + 1}</span>
                      {n}
                    </motion.li>
                  ))}
                </ol>

                <a
                  href={askDetails}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold transition hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5" /> Get Payment Details
                </a>
                <p className="mt-4 flex items-center gap-2 text-xs text-white/50">
                  <ShieldCheck className="h-4 w-4" /> Only pay to details shared by the official AUC numbers.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
