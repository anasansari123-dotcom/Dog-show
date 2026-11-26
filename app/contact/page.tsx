import type { Metadata } from "next";
import Contact, { Invitation } from "@/components/Contact";
import PageHeader from "@/components/PageHeader";
import Register from "@/components/Register";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the AUC Foundation organising team — Rahul Singh (President) and Rahul Ratan Maurya (General Secretary) — and send your dog or cat entry on WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Get In <span className="text-gold-gradient">Touch</span></>}
        subtitle="Questions about entries, sponsorship or the event? We're a call or WhatsApp away."
        image="/images/invitation.jpeg"
        dark
      />
      <Contact />
      <Register />
      <Invitation />
    </>
  );
}
