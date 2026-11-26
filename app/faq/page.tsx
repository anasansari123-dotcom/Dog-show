import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import FaqSection from "@/components/FaqSection";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about registration, entry fee, payment, vaccination, show day, the Cat Fashion Show and stalls at the AUC Grand Dog Show 2026.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title={<>Got <span className="text-gold-gradient">Questions?</span></>}
        subtitle="Everything about registration, payment, vaccination and show day — in one place."
        image="/images/past-show/lab-gaiting.jpg"
      />
      <FaqSection />
      <CtaBand />
    </>
  );
}
