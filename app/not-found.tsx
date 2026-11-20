import Link from "next/link";
import { PawSvg } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-navy px-5 pt-28 text-center text-white">
      <PawSvg className="h-20 w-20 animate-float text-auc-amber" />
      <h1 className="text-gold-gradient mt-6 font-display text-8xl font-black">404</h1>
      <p className="mt-3 text-lg text-white/70">Looks like this pup wandered off. The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn-gold mt-8 rounded-full px-8 py-4 font-bold">Back to Home</Link>
    </section>
  );
}
