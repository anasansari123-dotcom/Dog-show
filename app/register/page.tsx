import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Payment from "@/components/Payment";
import RegisterInfo, { RegisterSteps } from "@/components/RegisterInfo";
import Vaccination from "@/components/Vaccination";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register for the AUC Grand Dog Show 2026. Entry fee ₹1,500 · Last date 10 December 2026. Pay by UPI QR and share the screenshot on WhatsApp +91 93355 52233.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Register"
        title={<>Entry <span className="text-gold-gradient">Registration</span></>}
        subtitle="Entry fee ₹1,500 per dog or cat · Last date for entry: 10 December 2026"
        image="/images/entry-form.jpeg"
      />
      <RegisterInfo />
      <Payment />
      <RegisterSteps />
      <Vaccination />
    </>
  );
}
