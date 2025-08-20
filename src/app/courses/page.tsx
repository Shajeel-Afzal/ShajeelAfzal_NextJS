import type { Metadata } from "next";
import { CoursesClient } from "./courses-client";
import { getCoursesData } from "@/lib/courses-data";

export const metadata: Metadata = {
  title: "Courses | Shajeel Afzal - Mobile App & AI Development Training",
  description: "Explore comprehensive courses on mobile app development, AI, chatbots, and modern web technologies. Learn from industry expert Shajeel Afzal with practical, hands-on training.",
  keywords: [
    "mobile app development courses",
    "React Native training",
    "AI development courses",
    "chatbot development",
    "Flutter courses",
    "JavaScript training",
    "Next.js courses",
    "programming tutorials"
  ],
  openGraph: {
    title: "Professional Development Courses - Shajeel Afzal",
    description: "Master mobile development, AI, and modern web technologies with expert-led courses and practical projects.",
    url: "https://shajeelafzal.com/courses",
    type: "website",
    images: [
      {
        url: "/images/shajeel_afzal.png",
        width: 1200,
        height: 630,
        alt: "Shajeel Afzal Courses - Mobile App & AI Development Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Development Courses - Shajeel Afzal",
    description: "Master mobile development, AI, and modern web technologies with expert-led courses and practical projects.",
    images: ["/images/shajeel_afzal.png"],
  },
  alternates: {
    canonical: "https://shajeelafzal.com/courses",
  },
};

export default function CoursesPage() {
  const courses = getCoursesData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Professional Development Courses",
    "description": "Comprehensive courses on mobile app development, AI, chatbots, and modern web technologies taught by industry expert Shajeel Afzal.",
    "url": "https://shajeelafzal.com/courses",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": courses.map((course, index) => ({
        "@type": "Course",
        "position": index + 1,
        "name": course.title,
        "description": course.description,
        "url": `https://shajeelafzal.com/courses/${course.slug}`,
        "provider": {
          "@type": "Organization",
          "name": "Shajeel Afzal",
          "url": "https://shajeelafzal.com"
        },
        "instructor": {
          "@type": "Person",
          "name": course.instructor.name,
          "image": `https://shajeelafzal.com${course.instructor.image}`
        },
        "courseMode": "online",
        "educationalLevel": course.level,
        "timeRequired": course.duration,
        "inLanguage": course.language,
        "isAccessibleForFree": course.isFree,
        "offers": course.isFree ? undefined : {
          "@type": "Offer",
          "price": course.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://shajeelafzal.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Courses",
          "item": "https://shajeelafzal.com/courses"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoursesClient courses={courses} />
    </>
  );
}