import { Metadata } from "next";
import { GigsListingPage } from "./components/gigs-listing-page";

export const metadata: Metadata = {
  title: "Gigs Marketplace | Professional Development Services",
  description: "Browse and purchase professional development services including AI agents, mobile apps, web development, chatbots, backend solutions, and automation services.",
  keywords: [
    "gigs marketplace",
    "development services", 
    "AI agent development",
    "mobile app development",
    "web development",
    "chatbot development",
    "freelance developer",
    "Shajeel Afzal"
  ],
};

export default function GigsPage() {
  return <GigsListingPage />;
}