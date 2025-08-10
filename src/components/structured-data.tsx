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
          "url": "https://shajeelafzal.com/images/shajeel-afzal.jpg"
        },
        "jobTitle": ["Mobile App Developer", "AI Engineer", "Chatbot Developer"],
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance Developer"
        },
        "alumniOf": {
          "@type": "Organization", 
          "name": "Your University"
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
          "TypeScript"
        ],
        "sameAs": [
          "https://linkedin.com/in/shajeelafzal",
          "https://github.com/shajeelafzal",
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
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://shajeelafzal.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://shajeelafzal.com/#service",
        "name": "Shajeel Afzal Development Services",
        "url": "https://shajeelafzal.com",
        "logo": "https://shajeelafzal.com/logo.png",
        "image": "https://shajeelafzal.com/images/services-banner.jpg",
        "description": "Professional mobile app development, AI integration, and chatbot development services for businesses worldwide.",
        "provider": {
          "@id": "https://shajeelafzal.com/#person"
        },
        "areaServed": "Worldwide",
        "serviceType": [
          "Mobile App Development",
          "AI Development", 
          "Chatbot Development",
          "Custom Software Development"
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
                "description": "Cross-platform mobile applications using React Native and Flutter"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "AI Agent Development",
                "description": "Custom AI agents and chatbots for business automation"
              }
            }
          ]
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1234567890",
          "contactType": "Customer Service",
          "availableLanguage": ["English"]
        }
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