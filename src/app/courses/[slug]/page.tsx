import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import { CourseDetailPage } from "@/components/courses/course-detail-page";
import { CourseStructuredData } from "@/components/courses/course-structured-data";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all courses
export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

// Generate metadata for each course
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return {
      title: "Course Not Found | Shajeel Afzal",
    };
  }

  return {
    title: `${course.title} | Shajeel Afzal Courses`,
    description: course.description,
    keywords: [
      ...course.tags,
      course.category,
      "online course",
      "programming tutorial",
      "Shajeel Afzal",
    ],
    openGraph: {
      title: course.title,
      description: course.description,
      url: `https://shajeelafzal.com/courses/${course.slug}`,
      type: "website",
      images: [
        {
          url: course.heroImage || course.thumbnail,
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
      images: [course.heroImage || course.thumbnail],
    },
    alternates: {
      canonical: `https://shajeelafzal.com/courses/${course.slug}`,
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <CourseStructuredData course={course} />
      <main id="main-content">
        <CourseDetailPage course={course} />
      </main>
    </>
  );
}