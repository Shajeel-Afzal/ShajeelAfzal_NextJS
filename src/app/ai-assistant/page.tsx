import { AIAssistant } from "@/components/ai-assistant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Assistant | Shajeel Afzal",
  description: "Get instant help with questions about services, expertise, and projects. Powered by AI for 24/7 assistance.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-background">
      <AIAssistant />
    </div>
  );
}