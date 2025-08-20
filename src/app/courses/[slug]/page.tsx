import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getCoursesData } from "@/lib/courses-data";
import { CourseDetailClient } from "./course-detail-client";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const courses = getCoursesData();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} | Shajeel Afzal Courses`,
    description: course.description,
    keywords: [
      ...course.tags,
      course.category,
      course.level,
      "online course",
      "programming tutorial",
      "Shajeel Afzal"
    ],
    openGraph: {
      title: course.title,
      description: course.description,
      url: `https://shajeelafzal.com/courses/${course.slug}`,
      type: "article",
      images: [
        {
          url: course.heroImage,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
      images: [course.heroImage],
    },
    alternates: {
      canonical: `https://shajeelafzal.com/courses/${course.slug}`,
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Get related courses (same category, excluding current course)
  const allCourses = getCoursesData();
  const relatedCourses = allCourses
    .filter(c => c.category === course.category && c.id !== course.id)
    .slice(0, 3);

  // Structured data for the course
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.fullDescription,
    "url": `https://shajeelafzal.com/courses/${course.slug}`,
    "image": `https://shajeelafzal.com${course.heroImage}`,
    "provider": {
      "@type": "Organization",
      "name": "Shajeel Afzal",
      "url": "https://shajeelafzal.com"
    },
    "instructor": {
      "@type": "Person",
      "name": course.instructor.name,
      "description": course.instructor.bio,
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
      "availability": "https://schema.org/InStock",
      "url": course.enrollmentUrl
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "instructor": {
        "@type": "Person",
        "name": course.instructor.name
      }
    },
    "syllabusSections": course.curriculum.map(section => ({
      "@type": "Syllabus",
      "name": section.title,
      "description": section.lessons.join(", ")
    })),
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": course.title,
          "item": `https://shajeelafzal.com/courses/${course.slug}`
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
      <CourseDetailClient course={course} relatedCourses={relatedCourses} />
    </>
  );
}