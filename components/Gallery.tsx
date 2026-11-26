"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, Download, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GALLERY, GALLERY_CATEGORIES, PAST_SHOW, type GalleryCategory } from "@/lib/data";
import { SectionHeading } from "./ui";

type FilterKey = "All" | GalleryCategory;
const PAGE = 12;

export default function Gallery() {
  const [filter, setFilter] = useState<FilterKey>("All");
  const [shown, setShown] = useState(PAGE);
  const [idx, setIdx] = useState<number | null>(null);

  const items = useMemo(() => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)), [filter]);
  const visible = items.slice(0, shown);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: GALLERY.length };
    for (const g of GALLERY) c[g.category] = (c[g.category] ?? 0) + 1;
    return c;
  }, []);

  const pick = (k: FilterKey) => {
    setFilter(k);
    setShown(PAGE);
    setIdx(null);
  };

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback(
    (d: number) => setIdx((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

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

  const current = idx !== null ? items[idx] : null;

  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title={<>Moments from the <span className="text-brand-gradient">Ring</span></>}
          subtitle={`Highlights from our ${PAST_SHOW.title.replace("AUC ", "")} (${PAST_SHOW.date}), plus official posters for the 2026 Grand Show.`}
        />

        {/* Filters */}
        <div className="mb-10 flex justify-center">
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-navy p-1.5 shadow-xl [scrollbar-width:none]">
            {GALLERY_CATEGORIES.map((c) => {
              const active = filter === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => pick(c.key)}
                  className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition sm:px-5 ${
                    active ? "text-navy" : "text-white/70 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="gallery-pill"
                      className="btn-gold absolute inset-0 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    {c.label}
                    <span className={`ml-1.5 text-xs ${active ? "text-navy/60" : "text-white/40"}`}>{counts[c.key] ?? 0}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry grid */}
        <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visible.map((g, i) => (
            <motion.button
              key={g.src}
              onClick={() => setIdx(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative mb-5 block w-full overflow-hidden rounded-3xl bg-slate-100 text-left shadow-lg break-inside-avoid"
              aria-label={`Open ${g.title}`}
            >
              <Image
                src={g.src}
                alt={g.title}
                width={g.w}
                height={g.h}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="h-auto w-full transition duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-navy/75 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold-light backdrop-blur">
                {GALLERY_CATEGORIES.find((c) => c.key === g.category)?.label}
              </span>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/90 via-navy/20 to-transparent p-5 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="flex w-full items-end justify-between gap-3">
                  <span className="translate-y-3 font-display text-lg font-bold leading-snug text-white transition duration-500 group-hover:translate-y-0">
                    {g.title}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-navy">
                    <ZoomIn className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {shown < items.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShown((s) => s + PAGE)}
              className="rounded-full border-2 border-navy px-8 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              Load more photos ({items.length - shown} more)
            </button>
          </div>
        )}

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
          <Camera className="h-4 w-4" /> Event photography: Diganta Dhara for Dogs99.com
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && idx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="relative max-h-[88vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.title}
                width={current.w}
                height={current.h}
                sizes="90vw"
                className="max-h-[78vh] w-auto rounded-2xl object-contain"
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-white">
                <div>
                  <p className="font-display text-lg font-bold">{current.title}</p>
                  <p className="text-xs text-white/60">
                    {current.past ? `${PAST_SHOW.title} · ${PAST_SHOW.date} · ${PAST_SHOW.credit}` : "AUC Grand Dog Show 2026"}
                    <span className="ml-2 text-white/40">
                      {idx + 1} / {items.length}
                    </span>
                  </p>
                </div>
                <a
                  href={current.src}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/25"
                >
                  <Download className="h-4 w-4" /> Download
                </a>
              </div>
            </motion.div>
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
              <X />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            >
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
