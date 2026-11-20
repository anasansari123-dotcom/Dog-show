"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PawPrint } from "lucide-react";
import { EVENT } from "@/lib/data";
import { PawSvg } from "./ui";

export default function CtaBand({
  title = "Ready to show your champion?",
  text = `Entries close on ${EVENT.lastEntry}. Secure your spot for just ${EVENT.fee} per dog.`,
  href = "/register",
  label = "Register Your Dog",
}: {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="px-5 py-20 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grain relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-auc-green via-auc-blue to-navy p-6 text-white shadow-2xl sm:rounded-[2.5rem] sm:p-10 md:p-16"
      >
        <PawSvg className="absolute -right-10 -top-10 h-56 w-56 rotate-12 text-white/10" />
        <PawSvg className="absolute -bottom-12 left-10 h-40 w-40 -rotate-12 text-auc-amber/20" />
        <div className="relative flex min-w-0 flex-col items-stretch justify-between gap-6 sm:gap-8 lg:flex-row lg:items-center">
          <div className="min-w-0">
            <h2 className="font-display text-3xl font-bold md:text-5xl">{title}</h2>
            <p className="mt-3 max-w-xl text-base text-white/80 sm:text-lg">{text}</p>
          </div>
          <Link
            href={href}
            className="btn-gold group inline-flex w-full min-w-0 max-w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3.5 text-sm font-bold transition sm:w-auto sm:px-8 sm:py-4 sm:text-lg lg:hover:scale-105"
          >
            <PawPrint className="h-5 w-5 shrink-0" /> {label}
            <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
