import type { Course } from "@/types/course";

interface CourseStructuredDataProps {
  course: Course;
}

export function CourseStructuredData({ course }: CourseStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.fullDescription,
    provider: {
      "@type": "Organization", 
      name: "Shajeel Afzal",
      url: "https://shajeelafzal.com"
    },
    instructor: {
      "@type": "Person",
      name: course.instructor.name,
      jobTitle: course.instructor.title,
      description: course.instructor.bio,
      image: `https://shajeelafzal.com${course.instructor.avatar}`,
      sameAs: [
        "https://linkedin.com/in/shajeelafzal",
        "https://github.com/shajeel-afzal"
      ]
    },
    image: `https://shajeelafzal.com${course.heroImage || course.thumbnail}`,
    url: `https://shajeelafzal.com/courses/${course.slug}`,
    courseCode: course.id,
    educationalLevel: course.specifications.level,
    inLanguage: course.specifications.language,
    timeRequired: course.specifications.duration,
    numberOfCredits: course.modules.length,
    ...(course.price > 0 && {
      offers: {
        "@type": "Offer",
        price: course.price,
        priceCurrency: course.currency,
        availability: "https://schema.org/InStock",
        url: course.enrollmentUrl,
        validFrom: course.dateAdded,
        ...(course.originalPrice && {
          priceValidUntil: "2024-12-31",
          eligibleQuantity: {
            "@type": "QuantitativeValue",
            value: 1
          }
        })
      }
    }),
    ...(course.price === 0 && {
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: course.currency,
        availability: "https://schema.org/InStock",
        url: course.enrollmentUrl
      }
    }),
    coursePrerequisites: course.prerequisites,
    syllabus: course.modules.map((module, index) => ({
      "@type": "Syllabus",
      name: module.title,
      description: module.description,
      position: index + 1,
      timeRequired: module.duration,
      numberOfCredits: module.lessons
    })),
    teaches: course.learningOutcomes,
    about: course.tags,
    keywords: course.tags.join(", "),
    ...(course.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: course.rating,
        ratingCount: course.reviewCount || 1,
        bestRating: 5,
        worstRating: 1
      }
    }),
    ...(course.specifications.certificate && {
      educationalCredentialAwarded: "Certificate of Completion"
    }),
    dateCreated: course.dateAdded,
    dateModified: course.specifications.lastUpdated,
    isAccessibleForFree: course.price === 0,
    ...(course.features && {
      courseWorkload: course.features.join(", ")
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface CoursesListingStructuredDataProps {
  courses: Course[];
}

export function CoursesListingStructuredData({ courses }: CoursesListingStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://shajeelafzal.com/courses#webpage",
        url: "https://shajeelafzal.com/courses",
        name: "Professional Development Courses | Shajeel Afzal",
        description: "Discover comprehensive courses on mobile app development, AI integration, chatbot creation, and more. Learn from industry expert Shajeel Afzal.",
        isPartOf: {
          "@id": "https://shajeelafzal.com/#website"
        },
        datePublished: "2024-08-01T00:00:00Z",
        dateModified: "2024-08-20T00:00:00Z"
      },
      {
        "@type": "CollectionPage",
        "@id": "https://shajeelafzal.com/courses#collection",
        url: "https://shajeelafzal.com/courses",
        name: "Course Catalog",
        description: "Complete catalog of mobile development, AI, and chatbot courses",
        numberOfItems: courses.length,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: courses.length,
          itemListElement: courses.map((course, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Course",
              "@id": `https://shajeelafzal.com/courses/${course.slug}#course`,
              name: course.title,
              description: course.description,
              url: `https://shajeelafzal.com/courses/${course.slug}`,
              image: `https://shajeelafzal.com${course.thumbnail}`,
              provider: {
                "@type": "Organization",
                name: "Shajeel Afzal"
              },
              educationalLevel: course.specifications.level,
              timeRequired: course.specifications.duration,
              inLanguage: course.specifications.language,
              ...(course.price > 0 && {
                offers: {
                  "@type": "Offer",
                  price: course.price,
                  priceCurrency: course.currency
                }
              }),
              ...(course.rating && {
                aggregateRating: {
                  "@type": "AggregateRating", 
                  ratingValue: course.rating,
                  ratingCount: course.reviewCount || 1
                }
              })
            }
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://shajeelafzal.com/courses#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://shajeelafzal.com"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Courses",
            item: "https://shajeelafzal.com/courses"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}