import { Metadata } from "next";
import { notFound } from "next/navigation";
import { gigCategories } from "@/data/gigs";
import { CategoryGigsPage } from "./components/category-gigs-page";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return gigCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = gigCategories.find(cat => cat.slug === params.category);
  
  if (!category) {
    return {};
  }

  return {
    title: `${category.name} Services | Professional Development Solutions`,
    description: `${category.description}. Browse and purchase professional ${category.name.toLowerCase()} services with transparent pricing and guaranteed delivery.`,
    keywords: [
      category.name.toLowerCase(),
      "development services",
      "professional services",
      "gigs marketplace",
      "Shajeel Afzal"
    ],
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = gigCategories.find(cat => cat.slug === params.category);
  
  if (!category) {
    notFound();
  }

  return <CategoryGigsPage category={category} />;
}