import type { Metadata } from "next";
import About from "@/components/About";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description: "Alliance for Universal Care Foundation — promoting canine excellence and supporting animal welfare.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={<>About <span className="text-gold-gradient">AUC Foundation</span></>}
        subtitle="Promoting canine excellence and supporting animal welfare — for every dog, and every dog lover."
        image="/images/invitation.jpeg"
      />
      <About />
      <CtaBand title="Be part of our story" text="Join hundreds of dog lovers at the AUC Grand Dog Show 2026." />
    </>
  );
}
