import type { Metadata } from "next";
import CatShow from "@/components/CatShow";
import CtaBand from "@/components/CtaBand";
import EventDetails from "@/components/EventDetails";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Event & Venue",
  description: "Date, timing, venue, facilities and layout plan of the AUC Grand Dog Show 2026 — plus the AUC Cat Fashion Show on the same day.",
};

export default function EventPage() {
  return (
    <>
      <PageHeader
        eyebrow="Event"
        title={<>Show Day <span className="text-gold-gradient">Details</span></>}
        subtitle="Sunday, 20 December 2026 · 9:00 AM onwards · Chahaniya, Chandauli (U.P.)"
        image="/images/event-layout.jpeg"
      />
      <EventDetails />
      <CatShow />
      <CtaBand />
    </>
  );
}
