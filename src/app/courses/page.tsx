import type { Metadata } from "next";
import { CoursesListingPage } from "@/components/courses/courses-listing-page";

export const metadata: Metadata = {
  title: "Courses | Mobile Development & AI Training | Shajeel Afzal",
  description: "Discover comprehensive courses on mobile app development, AI integration, chatbot creation, and more. Learn from industry expert Shajeel Afzal with hands-on projects and real-world applications.",
  keywords: [
    "mobile development courses",
    "React Native training",
    "Flutter courses", 
    "AI development training",
    "chatbot development course",
    "programming courses",
    "Shajeel Afzal courses"
  ],
  openGraph: {
    title: "Professional Development Courses | Shajeel Afzal",
    description: "Master mobile development, AI integration, and chatbot creation with comprehensive courses designed for real-world application.",
    url: "https://shajeelafzal.com/courses",
    type: "website",
    images: [
      {
        url: "/images/courses/courses-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shajeel Afzal Development Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Development Courses | Shajeel Afzal", 
    description: "Master mobile development, AI integration, and chatbot creation with hands-on courses.",
    images: ["/images/courses/courses-og-image.jpg"],
  },
  alternates: {
    canonical: "https://shajeelafzal.com/courses",
  },
};

export default function CoursesPage() {
  return (
    <main id="main-content">
      <CoursesListingPage />
    </main>
  );
}