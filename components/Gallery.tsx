"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GALLERY } from "@/lib/data";
import { SectionHeading } from "./ui";

export default function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length)), []);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, close, step]);

  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Gallery & Downloads" title={<>Posters, Plans & <span className="text-brand-gradient">Invitations</span></>} subtitle="Click any image to view it full-screen or download it to share." />

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {GALLERY.map((g, i) => (
            <motion.button
              key={g.src}
              onClick={() => setIdx(i)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className="group relative mb-5 block w-full overflow-hidden rounded-3xl bg-slate-100 shadow-lg break-inside-avoid"
            >
              <Image src={g.src} alt={g.title} width={g.w} height={g.h} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-auto w-full transition duration-700 group-hover:scale-110 group-hover:rotate-1" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy/70 opacity-0 backdrop-blur-[2px] transition duration-500 group-hover:opacity-100">
                <span className="flex h-14 w-14 scale-50 items-center justify-center rounded-full bg-white text-navy transition duration-500 group-hover:scale-100">
                  <ZoomIn className="h-6 w-6" />
                </span>
                <span className="translate-y-4 font-display text-xl font-bold text-white transition duration-500 group-hover:translate-y-0">{g.title}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="relative max-h-[88vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={GALLERY[idx].src} alt={GALLERY[idx].title} width={GALLERY[idx].w} height={GALLERY[idx].h} className="max-h-[80vh] w-auto rounded-2xl object-contain" />
              <div className="mt-3 flex items-center justify-between text-white">
                <span className="font-display text-lg font-bold">{GALLERY[idx].title}</span>
                <a href={GALLERY[idx].src} download className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/25">
                  <Download className="h-4 w-4" /> Download
                </a>
              </div>
            </motion.div>
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
              <X />
            </button>
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
              <ChevronLeft />
            </button>
            <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
