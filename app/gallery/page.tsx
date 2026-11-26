import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import PageHeader from "@/components/PageHeader";
import Videos from "@/components/Videos";

export const metadata: Metadata = {
  title: "Gallery & Videos",
  description: "Photos from the AUC Championship Dog Show, Varanasi (15 March 2026), plus official posters and videos of the AUC Grand Dog Show 2026.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={<>Gallery & <span className="text-gold-gradient">Videos</span></>}
        subtitle="Ring action, winners, ceremonies and trophies from our last show — plus every official poster to view, download and share."
        image="/images/past-show/stage-trophies-wide.jpg"
      />
      <Gallery />
      <Videos />
      <CtaBand />
    </>
  );
}
