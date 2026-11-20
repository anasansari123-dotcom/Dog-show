"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, PawPrint } from "lucide-react";
import { useEffect, useState } from "react";

import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 md:px-6 ${
          scrolled ? "bg-white/90 shadow-xl shadow-navy/10 backdrop-blur-xl" : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <Link href="/" className="flex items-center gap-3" aria-label="AUC Foundation home">
          <Image src="/images/logo-transparent.png" alt="AUC Foundation logo" width={132} height={48} className="h-10 w-auto md:h-12" priority />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative block rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active ? "text-white" : "text-navy/80 hover:text-auc-blue"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-navy"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/register"
            className="btn-gold hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition hover:scale-105 sm:inline-flex"
          >
            <PawPrint className="h-4 w-4" /> Register Now
          </Link>
          <button onClick={() => setOpen((o) => !o)} className="rounded-xl p-2 text-navy lg:hidden" aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl bg-white p-4 shadow-2xl lg:hidden"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link
                  href={l.href}
                  className={`block rounded-xl px-4 py-3 font-semibold ${
                    isActive(l.href) ? "bg-navy text-white" : "text-navy hover:bg-auc-amber/10"
                  }`}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <Link href="/register" className="btn-gold mt-2 block rounded-xl px-4 py-3 text-center font-bold">
              Register Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
