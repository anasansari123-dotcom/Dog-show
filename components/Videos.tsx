"use client";

import { motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { VIDEOS } from "@/lib/data";
import { SectionHeading } from "./ui";

function VideoCard({ v, i }: { v: (typeof VIDEOS)[number]; i: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const play = () => {
    ref.current?.play().then(() => setPlaying(true)).catch(() => {});
  };
  const pause = () => {
    ref.current?.pause();
    setPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: i === 1 ? 0 : i === 0 ? -4 : 4 }}
      whileInView={{ opacity: 1, y: i === 1 ? -30 : 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: i === 1 ? -42 : -12, rotate: 0 }}
      onMouseEnter={play}
      onMouseLeave={pause}
      className="group relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[2rem] border-4 border-white/10 bg-black shadow-2xl transition-[border-color] hover:border-gold/70"
    >
      <video
        ref={ref}
        src={v.src}
        poster={v.poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        onClick={() => (playing ? pause() : play())}
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30 transition-opacity duration-500 ${
          playing ? "opacity-40" : "opacity-100"
        }`}
      />

      {!playing && (
        <button
          onClick={play}
          aria-label={`Play ${v.title}`}
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-xl transition group-hover:scale-110"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
          <Play className="relative ml-1 h-7 w-7 fill-navy" />
        </button>
      )}

      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white backdrop-blur transition hover:bg-black/70"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">{v.caption}</p>
        <h3 className="font-display text-xl font-bold">{v.title}</h3>
      </div>
    </motion.div>
  );
}

export default function Videos() {
  return (
    <section id="videos" className="grain relative overflow-hidden bg-gradient-to-b from-navy to-navy-2 py-24 text-white md:py-32">
      <div className="absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-auc-green/30 blur-[100px]" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-auc-amber/20 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          dark
          eyebrow="Watch"
          title={<>Moments from the <span className="text-gold-gradient">Ring</span></>}
          subtitle="Hover or tap to play. Turn on sound for the full experience."
        />
        <div className="grid gap-10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.src} v={v} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
