import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import PageHeader from "@/components/PageHeader";
import Videos from "@/components/Videos";

export const metadata: Metadata = {
  title: "Gallery & Videos",
  description: "Official posters, invitations, event plans and videos of the AUC Grand Dog Show 2026.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={<>Gallery & <span className="text-gold-gradient">Videos</span></>}
        subtitle="Posters, plans, invitations and moments from the ring — view, download and share."
        image="/images/poster-main.jpeg"
      />
      <Gallery />
      <Videos />
      <CtaBand />
    </>
  );
}
