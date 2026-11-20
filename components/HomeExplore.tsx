"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock, Hourglass, IndianRupee } from "lucide-react";
import { EVENT } from "@/lib/data";
import { SectionHeading } from "./ui";

const QUICK = [
  { icon: CalendarDays, label: "Show Date", value: "20 Dec 2026" },
  { icon: Clock, label: "Starts", value: "9:00 AM" },
  { icon: Hourglass, label: "Entries Close", value: "10 Dec 2026" },
  { icon: IndianRupee, label: "Entry Fee", value: EVENT.fee },
];

const PAGES = [
  { href: "/about", title: "About AUC", text: "Our foundation, founder & mission of universal care.", image: "/images/founder.jpeg", pos: "object-top", accent: "from-auc-green" },
  { href: "/event", title: "Event & Venue", text: "Schedule, facilities, layout plan and directions.", image: "/images/event-layout.jpeg", pos: "object-center", accent: "from-auc-blue" },
  { href: "/participate", title: "Participate", text: "Categories, rules, FAQs & handler facility.", image: "/images/poster-hindi.jpeg", pos: "object-top", accent: "from-auc-amber" },
  { href: "/sponsorship", title: "Sponsorship", text: "Packages from ₹5,000 to ₹2,50,000 for brands.", image: "/images/sponsorship.jpeg", pos: "object-top", accent: "from-[#7a1426]" },
  { href: "/gallery", title: "Gallery & Videos", text: "Posters, invitations and moments from the ring.", image: "/images/poster-main.jpeg", pos: "object-center", accent: "from-auc-green" },
  { href: "/register", title: "Register Now", text: "Send your entry online in under 2 minutes.", image: "/images/entry-form.jpeg", pos: "object-top", accent: "from-auc-blue" },
];

export default function HomeExplore() {
  return (
    <>
      {/* quick facts */}
      <section className="mx-auto max-w-6xl px-5 pt-20 md:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {QUICK.map((q, i) => (
            <motion.div
              key={q.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:gap-4 sm:p-5"
            >
              <span className="btn-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                <q.icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{q.label}</p>
                <p className="font-display text-lg font-bold text-navy">{q.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* explore pages */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionHeading
          eyebrow="Explore"
          title={<>Everything about the <span className="text-brand-gradient">Grand Show</span></>}
          subtitle="Pick where you'd like to go next."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PAGES.map((p, i) => (
            <motion.div
              key={p.href}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={p.href} className="group relative block h-80 overflow-hidden rounded-3xl shadow-lg">
                <Image src={p.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className={`object-cover ${p.pos} transition duration-[1.2s] group-hover:scale-110`} />
                <div className={`absolute inset-0 bg-gradient-to-t ${p.accent} via-navy/70 to-transparent opacity-90 transition group-hover:opacity-100`} />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <h3 className="font-display text-3xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/85 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:max-h-20 sm:group-hover:opacity-100">
                    {p.text}
                  </p>
                </div>
                <span className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-navy transition duration-500 group-hover:rotate-45 group-hover:bg-auc-amber">
                  <ArrowUpRight className="h-6 w-6" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
