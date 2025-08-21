import { Metadata } from "next";
import { notFound } from "next/navigation";
import { gigs, gigCategories } from "@/data/gigs";
import { GigDetailPage } from "./components/gig-detail-page";

interface GigPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return gigs.map((gig) => ({
    category: gig.category,
    slug: gig.slug,
  }));
}

export async function generateMetadata({ params }: GigPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const gig = gigs.find(g => g.category === category && g.slug === slug);
  
  if (!gig) {
    return {};
  }

  return {
    title: gig.seoTitle || `${gig.title} | Professional Development Services`,
    description: gig.seoDescription || gig.description,
    keywords: [
      ...gig.tags,
      "development services",
      "professional services",
      "gigs marketplace",
      "Shajeel Afzal"
    ],
    openGraph: {
      title: gig.title,
      description: gig.description,
      type: 'website',
      images: gig.mediaGallery.length > 0 ? [gig.mediaGallery[0].url] : [],
    },
  };
}

export default async function GigPage({ params }: GigPageProps) {
  const { category, slug } = await params;
  const gig = gigs.find(g => g.category === category && g.slug === slug);
  const categoryData = gigCategories.find(cat => cat.slug === category);
  
  if (!gig || !categoryData) {
    notFound();
  }

  // Create serializable versions without functions
  const serializableGig = {
    ...gig,
    icon: gig.icon.name || 'Brain' // Just pass the icon name
  };
  
  const serializableCategory = {
    ...categoryData,
    icon: categoryData.icon.name || 'Brain' // Just pass the icon name
  };

  return <GigDetailPage gig={serializableGig} category={serializableCategory} />;
}