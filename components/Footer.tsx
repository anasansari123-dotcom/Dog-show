import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { CONTACTS, EVENT, NAV_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-[#060e22] text-white/70">
      <div className="h-1.5 bg-gradient-to-r from-auc-green via-auc-blue to-auc-amber" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 md:px-8 lg:grid-cols-[1.2fr_0.8fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="inline-block rounded-2xl bg-white p-3">
            <Image src="/images/logo-transparent.png" alt="AUC Foundation" width={180} height={65} className="h-14 w-auto" />
          </Link>
          <p className="mt-5 max-w-xs text-sm">{EVENT.tagline}. {EVENT.affiliation}.</p>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold text-white">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {[...NAV_LINKS, { href: "/register", label: "Register" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:pl-1 hover:text-auc-amber">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold text-white">{EVENT.name}</h4>
          <p className="mt-3 text-sm">{EVENT.subtitle}</p>
          <p className="mt-3 text-sm">{EVENT.dateLabel} · {EVENT.time}</p>
          <p className="mt-3 flex gap-2 text-sm"><MapPin className="h-4 w-4 shrink-0 text-auc-amber" /> {EVENT.venue}, {EVENT.venueCity}</p>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold text-white">Inquiry</h4>
          <ul className="mt-3 space-y-3 text-sm">
            {CONTACTS.map((c) => (
              <li key={c.phone}>
                <a href={`tel:+91${c.phone}`} className="flex items-start gap-2 transition hover:text-auc-amber">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-auc-amber" /> {c.name} ({c.role}) — {c.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs">
        © 2026 Alliance for Universal Care Foundation. All rights reserved. · Event Partner: {EVENT.partner}
      </div>
    </footer>
  );
}
