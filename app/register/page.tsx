import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Register from "@/components/Register";

export const metadata: Metadata = {
  title: "Register",
  description: "Register your dog for the AUC Grand Dog Show 2026. Entry fee ₹1,500 · Last date 10 December 2026.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Register"
        title={<>Dog <span className="text-gold-gradient">Entry Form</span></>}
        subtitle="Entry fee ₹1,500 per dog · Last date for entry: 10 December 2026"
        image="/images/entry-form.jpeg"
      />
      <Register />
    </>
  );
}
