import { BREEDS } from "@/lib/data";
import { PawSvg } from "./ui";

export default function Marquee() {
  const items = [...BREEDS, ...BREEDS];
  return (
    <div id="marquee" className="relative z-10 -mt-6 overflow-hidden">
      <div className="-rotate-1 bg-gradient-to-r from-auc-green via-auc-blue to-auc-amber py-4 shadow-xl">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
          {items.map((b, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-xl font-bold text-white md:text-2xl">
              {b}
              <PawSvg className="h-6 w-6 text-white/70" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
