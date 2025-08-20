"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Star, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { gigs, gigCategories } from "@/data/gigs";
import { GigFilters } from "@/types/gigs";
import Link from "next/link";

export function GigsListingPage() {
  const [filters, setFilters] = useState<GigFilters>({
    sortBy: "popular"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 15000]);

  const filteredGigs = useMemo(() => {
    let filtered = [...gigs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(gig => 
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(gig => gig.category === filters.category);
    }

    // Price filter
    filtered = filtered.filter(gig => 
      gig.startingPrice >= priceRange[0] && gig.startingPrice <= priceRange[1]
    );

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(gig => gig.averageRating >= filters.rating);
    }

    // Delivery time filter
    if (filters.deliveryTime) {
      filtered = filtered.filter(gig => gig.deliveryTime <= filters.deliveryTime);
    }

    // Sort
    switch (filters.sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "price_high":
        filtered.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "delivery_time":
        filtered.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case "newest":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "popular":
      default:
        filtered.sort((a, b) => b.orderCount - a.orderCount);
        break;
    }

    return filtered;
  }, [filters, searchQuery, priceRange]);

  const handleCategoryFilter = (category: string) => {
    setFilters(prev => ({ ...prev, category: category === "all" ? undefined : category }));
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy: sortBy as GigFilters["sortBy"] }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-600/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Development Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Browse and purchase high-quality development services from AI agents to mobile apps
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for services (e.g., AI agent, mobile app, chatbot)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>

            {/* Category Badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Badge
                variant={!filters.category ? "default" : "secondary"}
                className="cursor-pointer px-4 py-2"
                onClick={() => handleCategoryFilter("all")}
              >
                All Services
              </Badge>
              {gigCategories.map((category) => (
                <Badge
                  key={category.id}
                  variant={filters.category === category.id ? "default" : "secondary"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => handleCategoryFilter(category.id)}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sort Options */}
                <div>
                  <Label className="text-sm font-medium">Sort By</Label>
                  <Select value={filters.sortBy || "popular"} onValueChange={handleSortChange}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                      <SelectItem value="delivery_time">Fastest Delivery</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={15000}
                    min={0}
                    step={100}
                    className="mt-3"
                  />
                </div>

                <Separator />

                {/* Minimum Rating */}
                <div>
                  <Label className="text-sm font-medium">Minimum Rating</Label>
                  <Select value={filters.rating?.toString() || ""} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value ? parseFloat(value) : undefined }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any rating</SelectItem>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                      <SelectItem value="4.0">4.0+ stars</SelectItem>
                      <SelectItem value="3.5">3.5+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Delivery Time */}
                <div>
                  <Label className="text-sm font-medium">Delivery Time</Label>
                  <Select value={filters.deliveryTime?.toString() || ""} onValueChange={(value) => setFilters(prev => ({ ...prev, deliveryTime: value ? parseInt(value) : undefined }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any time</SelectItem>
                      <SelectItem value="7">Up to 7 days</SelectItem>
                      <SelectItem value="14">Up to 14 days</SelectItem>
                      <SelectItem value="30">Up to 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Gigs Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredGigs.length} service{filteredGigs.length !== 1 ? "s" : ""} found
              </h2>
              
              {/* Mobile Sort - visible on smaller screens */}
              <div className="lg:hidden">
                <Select value={filters.sortBy || "popular"} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="delivery_time">Fastest Delivery</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGigs.map((gig) => (
                <Link key={gig.id} href={`/gigs/${gig.category}/${gig.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <gig.icon className="h-6 w-6 text-primary" />
                          </div>
                          {gig.featured && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {gig.title}
                      </CardTitle>
                      
                      <CardDescription className="line-clamp-3">
                        {gig.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {gig.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {gig.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{gig.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Rating and Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{gig.averageRating}</span>
                          <span>({gig.reviewCount})</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{gig.deliveryTime} days</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-muted-foreground">Starting at</span>
                          <div className="text-2xl font-bold">${gig.startingPrice.toLocaleString()}</div>
                        </div>
                        
                        <Button size="sm" className="group-hover:bg-primary/90">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredGigs.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No services found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={() => {
                  setFilters({ sortBy: "popular" });
                  setSearchQuery("");
                  setPriceRange([0, 15000]);
                }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}