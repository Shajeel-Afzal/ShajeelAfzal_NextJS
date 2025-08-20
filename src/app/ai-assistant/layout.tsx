import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Assistant | Shajeel Afzal - Get Instant Help & Guidance",
  description: "Chat with Shajeel's AI assistant for instant answers about mobile app development, AI integration, chatbot solutions, and project consultation. Available 24/7.",
  keywords: [
    "AI assistant",
    "mobile app consultation",
    "AI development help",
    "chatbot consultation",
    "project guidance",
    "Shajeel Afzal AI"
  ],
  openGraph: {
    title: "AI Assistant | Get Instant Help with Your Project",
    description: "Chat with Shajeel's AI assistant for immediate guidance on mobile apps, AI solutions, and project planning.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AIAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}