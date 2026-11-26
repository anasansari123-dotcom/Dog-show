import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import MediaKit from "@/components/MediaKit";
import PageHeader from "@/components/PageHeader";
import Videos from "@/components/Videos";

export const metadata: Metadata = {
  title: "Media",
  description: "Videos, official logos, posters and press kit of the AUC Grand Dog Show 2026, plus media enquiries.",
};

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media"
        title={<>Media & <span className="text-gold-gradient">Press</span></>}
        subtitle="Watch our videos, download the press kit and get in touch to cover the show."
        image="/images/poster-landscape-2026.jpg"
      />
      <Videos light />
      <MediaKit />
      <CtaBand title="Spread the word" text="Share the official posters with your dog-loving friends and community." href="/register" label="Register Your Dog" />
    </>
  );
}
