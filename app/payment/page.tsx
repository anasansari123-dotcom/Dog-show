import { redirect } from "next/navigation";

// Payment now lives on the Register page.
export default function PaymentPage() {
  redirect("/register#payment");
}
