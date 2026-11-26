import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Sponsorship from "@/components/Sponsorship";
import StallBooking from "@/components/StallBooking";

export const metadata: Metadata = {
  title: "Sponsorship",
  description: "Sponsorship packages, trophy sponsorship, stalls and catalogue advertisement tariff for AUC Grand Dog Show 2026.",
};

export default function SponsorshipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sponsorship"
        title={<>Partner <span className="text-gold-gradient">With Us</span></>}
        subtitle="Partner · Promote · Support the canine community"
        image="/images/sponsorship.jpeg"
      />
      <Sponsorship />
      <StallBooking />
      <CtaBand
        title="Let's build something great"
        text="Talk to the AUC team about the right package for your brand."
        href="/contact"
        label="Contact the Team"
      />
    </>
  );
}
