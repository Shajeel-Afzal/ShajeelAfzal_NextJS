import type { Metadata } from "next";
import { ConsultationBooking } from "@/components/consultation-booking";

export const metadata: Metadata = {
  title: "Book Free Consultation | Shajeel Afzal | Mobile App & AI Developer",
  description: "Schedule a free consultation with expert Mobile App Developer, AI Engineer & Chatbot Specialist Shajeel Afzal. Get technical guidance and project recommendations.",
  openGraph: {
    title: "Book Free Consultation | Shajeel Afzal",
    description: "Schedule a free consultation to discuss your mobile app, AI, or chatbot project with expert developer Shajeel Afzal.",
    images: ["/images/shajeel_afzal.png"],
  },
};

export default function ConsultationPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <ConsultationBooking />
      </div>
    </main>
  );
}