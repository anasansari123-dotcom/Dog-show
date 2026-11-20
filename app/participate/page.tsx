import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Participate from "@/components/Participate";

export const metadata: Metadata = {
  title: "Participate",
  description: "Categories, activities, rules, FAQs and handler facility for the AUC Grand Dog Show 2026.",
};

export default function ParticipatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Participate"
        title={<>Bring Your <span className="text-gold-gradient">Best Friend</span></>}
        subtitle="No pedigree or training required — every dog and every owner is welcome on our stage."
        image="/images/poster-hindi.jpeg"
      />
      <Participate />
      <CtaBand />
    </>
  );
}
