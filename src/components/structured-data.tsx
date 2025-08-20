export function PersonalWebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://shajeelafzal.com/#person",
        "name": "Shajeel Afzal",
        "url": "https://shajeelafzal.com",
        "image": {
          "@type": "ImageObject",
          "url": "https://shajeelafzal.com/images/shajeel_afzal.png",
          "width": 400,
          "height": 400
        },
        "jobTitle": ["Mobile App Developer", "AI Engineer", "Chatbot Developer"],
        "description": "Certified Mobile Apps Developer, AI Engineer & Chatbot Specialist helping businesses build cutting-edge solutions that drive growth and innovation.",
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance Developer"
        },
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Software Developer",
          "occupationalCategory": "Technology",
          "skills": [
            "Mobile App Development",
            "Artificial Intelligence",
            "Chatbot Development",
            "React Native",
            "Flutter",
            "Machine Learning"
          ]
        },
        "knowsAbout": [
          "Mobile App Development",
          "React Native",
          "Flutter",
          "Artificial Intelligence",
          "Machine Learning",
          "Chatbot Development",
          "Node.js",
          "Python",
          "JavaScript",
          "TypeScript",
          "Next.js",
          "AI Agent Development",
          "Natural Language Processing"
        ],
        "sameAs": [
          "https://linkedin.com/in/shajeelafzal",
          "https://github.com/shajeel-afzal",
          "https://twitter.com/shajeelafzal"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://shajeelafzal.com/#website",
        "url": "https://shajeelafzal.com",
        "name": "Shajeel Afzal - Mobile App & AI Developer",
        "description": "Expert Mobile Apps Developer, AI Engineer & Chatbot Specialist helping businesses build cutting-edge solutions that drive growth and innovation.",
        "publisher": {
          "@id": "https://shajeelafzal.com/#person"
        },
        "inLanguage": "en-US",
        "copyrightYear": "2025",
        "copyrightHolder": {
          "@id": "https://shajeelafzal.com/#person"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://shajeelafzal.com/#service",
        "name": "Shajeel Afzal Development Services",
        "url": "https://shajeelafzal.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://shajeelafzal.com/images/shajeel_afzal.png"
        },
        "image": {
          "@type": "ImageObject",
          "url": "https://shajeelafzal.com/images/shajeel_afzal.png"
        },
        "description": "Professional mobile app development, AI integration, and chatbot development services for businesses worldwide.",
        "provider": {
          "@id": "https://shajeelafzal.com/#person"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Worldwide"
        },
        "serviceType": [
          "Mobile App Development",
          "AI Development",
          "Chatbot Development",
          "Custom Software Development",
          "AI Agent Development",
          "Cross-platform Development"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Development Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Mobile App Development",
                "description": "Cross-platform mobile applications using React Native and Flutter with modern UI/UX design"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Agent Development",
                "description": "Custom AI agents and chatbots for business automation, customer support, and workflow optimization"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Software Solutions",
                "description": "Full-stack web applications and APIs using modern technologies like Next.js, Node.js, and cloud platforms"
              }
            }
          ]
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "availableLanguage": ["English"],
          "url": "https://shajeelafzal.com/contact"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://shajeelafzal.com/#breadcrumbs",
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
            "name": "Services",
            "item": "https://shajeelafzal.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Portfolio",
            "item": "https://shajeelafzal.com/portfolio"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Courses",
            "item": "https://shajeelafzal.com/courses"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "About",
            "item": "https://shajeelafzal.com/about"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Contact",
            "item": "https://shajeelafzal.com/contact"
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