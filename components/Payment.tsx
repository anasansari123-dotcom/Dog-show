"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck, Check, Copy, Download, MessageCircle, QrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { EVENT, PAYMENT, WHATSAPP_NUMBER } from "@/lib/data";
import { Icon, Reveal, SectionHeading } from "./ui";

const shareScreenshot = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  `Hello AUC Team, I have paid the entry fee for the ${EVENT.name}. Sharing my payment screenshot below.\n\nName:\nDog / Cat / Stall Name:\nAmount Paid:`,
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

function QrCard() {
  return (
    <div className="mt-5 flex flex-col items-center gap-5 rounded-2xl bg-white p-5 text-navy shadow-xl sm:flex-row">
      <div className="shrink-0 rounded-xl border-2 border-dashed border-auc-amber/60 p-2">
        <Image
          src={PAYMENT.qr.image}
          alt={`${PAYMENT.qr.app} UPI QR code — pay to ${PAYMENT.qr.payee}`}
          width={180}
          height={180}
          className="h-44 w-44 rounded-lg"
        />
      </div>
      <div className="text-center sm:text-left">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Scan &amp; Pay</p>
        <p className="mt-1 font-display text-xl font-black leading-tight">{PAYMENT.qr.payee}</p>
        <p className="mt-1 text-sm text-slate-600">Use {PAYMENT.qr.app}, Google Pay, Paytm or any UPI app.</p>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
          {["PhonePe", "GPay", "Paytm", "BHIM"].map((a) => (
            <span key={a} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              {a}
            </span>
          ))}
        </div>
        <a
          href={PAYMENT.qr.image}
          download="AUC-Dog-Show-Payment-QR.png"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-xs font-bold text-white transition hover:bg-auc-blue"
        >
          <Download className="h-3.5 w-3.5" /> Download QR
        </a>
        <p className="mt-2 text-[11px] text-slate-400 sm:hidden">
          On mobile? Download the QR, then scan it from your gallery inside your UPI app.
        </p>
      </div>
    </div>
  );
}

function ShareScreenshot() {
  return (
    <div className="mt-6 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-5 text-center">
      <p className="flex items-center justify-center gap-2 font-display text-lg font-bold">
        <BadgeCheck className="h-5 w-5 text-auc-amber" /> Payment done?
      </p>
      <p className="mt-1 text-sm text-white/70">Share your payment screenshot on WhatsApp to confirm your entry.</p>
      <a
        href={shareScreenshot}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-full flex-col items-center justify-center rounded-2xl bg-[#25D366] px-6 py-4 font-bold text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-[1.02] hover:bg-[#1fba59]"
      >
        <span className="flex items-center gap-2 text-base sm:text-lg">
          <MessageCircle className="h-5 w-5" /> After Payment, Share Screenshot
        </span>
        <span className="mt-0.5 text-sm font-semibold tracking-wide text-white/90">on WhatsApp +91 93355 52233</span>
      </a>
    </div>
  );
}

export default function Payment() {
  const upiLink = PAYMENT.upiId
    ? `upi://pay?pa=${encodeURIComponent(PAYMENT.upiId)}&pn=${encodeURIComponent(PAYMENT.upiName)}&cu=INR`
    : null;

  return (
    <section id="payment" className="bg-slate-50 pt-12 pb-24 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Payment"
          title={<>Fees & <span className="text-brand-gradient">Payment</span></>}
          subtitle="Simple, transparent fees. Scan the QR to pay by UPI, then share the screenshot on WhatsApp."
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
              <ol className="space-y-3 border-t border-slate-100 p-6">
                {PAYMENT.notes.map((n, i) => (
                  <motion.li
                    key={n}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3 text-sm text-slate-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-auc-amber text-xs font-black text-navy">{i + 1}</span>
                    {n}
                  </motion.li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* How to pay */}
          <Reveal x={30} y={0}>
            <div className="grain relative h-full overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-2xl md:p-9">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
              <div className="relative">
                <h3 className="flex items-center gap-2 font-display text-2xl font-bold">
                  <QrCode className="h-6 w-6 text-auc-amber" /> Scan &amp; Pay
                </h3>

                <QrCard />

                {(PAYMENT.upiId || PAYMENT.bank) && (
                  <div className="mt-4 space-y-3">
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
                )}

                <ShareScreenshot />

                <p className="mt-4 flex items-center gap-2 text-xs text-white/55">
                  <ShieldCheck className="h-4 w-4 shrink-0" /> Pay only via this official QR and confirm on WhatsApp +91 93355 52233.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
