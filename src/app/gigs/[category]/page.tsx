import { Metadata } from "next";
import { notFound } from "next/navigation";
import { gigCategories } from "@/data/gigs";
import { CategoryGigsPage } from "./components/category-gigs-page";

interface SerializableGigCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Icon name instead of component
  gigCount: number;
  featured: boolean;
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return gigCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = gigCategories.find(cat => cat.slug === category);
  
  if (!categoryData) {
    return {};
  }

  return {
    title: `${categoryData.name} Services | Professional Development Solutions`,
    description: `${categoryData.description}. Browse and purchase professional ${categoryData.name.toLowerCase()} services with transparent pricing and guaranteed delivery.`,
    keywords: [
      categoryData.name.toLowerCase(),
      "development services",
      "professional services",
      "gigs marketplace",
      "Shajeel Afzal"
    ],
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = gigCategories.find(cat => cat.slug === category);
  
  if (!categoryData) {
    notFound();
  }

  // Create serializable version without function
  const serializableCategory: SerializableGigCategory = {
    ...categoryData,
    icon: categoryData.icon.name || 'Brain' // Just pass the icon name
  };

  return <CategoryGigsPage category={serializableCategory} />;
}