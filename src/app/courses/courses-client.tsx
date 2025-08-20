"use client";

import { useState, useMemo } from "react";
import { Search, Filter, SortAsc, Book, Clock, Award, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, searchCourses, sortCourses } from "@/lib/courses-data";
import Image from "next/image";
import Link from "next/link";

interface CoursesClientProps {
  courses: Course[];
}

export function CoursesClient({ courses }: CoursesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "title-asc" | "title-desc" | "date-new" | "date-old">("featured");

  const filteredAndSortedCourses = useMemo(() => {
    let filteredCourses = courses;

    // Apply search filter
    if (searchQuery.trim()) {
      filteredCourses = searchCourses(searchQuery);
    }

    // Apply price filter
    if (priceFilter === "free") {
      filteredCourses = filteredCourses.filter(course => course.isFree);
    } else if (priceFilter === "paid") {
      filteredCourses = filteredCourses.filter(course => !course.isFree);
    }

    // Apply sorting
    return sortCourses(filteredCourses, sortBy);
  }, [courses, searchQuery, priceFilter, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setPriceFilter("all");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Development Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Master mobile development, AI, and modern web technologies with expert-led courses. 
            Build practical skills through hands-on projects and real-world applications.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{courses.length}</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{courses.filter(c => c.isFree).length}</div>
              <div className="text-sm text-muted-foreground">Free Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{courses.filter(c => c.featured).length}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Price Filter */}
              <Tabs value={priceFilter} onValueChange={(value) => setPriceFilter(value as typeof priceFilter)}>
                <TabsList>
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                  <TabsTrigger value="free">Free</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
                <SelectTrigger className="w-[200px]">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="date-new">Newest First</SelectItem>
                  <SelectItem value="date-old">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="title-asc">Title: A to Z</SelectItem>
                  <SelectItem value="title-desc">Title: Z to A</SelectItem>
                </SelectContent>
              </Select>

              {/* Reset Filters */}
              {(searchQuery || priceFilter !== "all" || sortBy !== "featured") && (
                <Button variant="outline" onClick={resetFilters}>
                  <Filter className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredAndSortedCourses.length} of {courses.length} courses
          </div>
        </div>

        {/* Courses Grid */}
        {filteredAndSortedCourses.length === 0 ? (
          <div className="text-center py-20">
            <Book className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {course.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary">
                      Featured
                    </Badge>
                  )}
                  {course.isFree && (
                    <Badge className="absolute top-4 right-4 bg-green-600">
                      Free
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {/* Course Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {course.level}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {course.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {course.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{course.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-lg font-semibold">
                          {course.isFree ? "Free" : `$${course.price}`}
                        </span>
                      </div>
                      <Link href={`/courses/${course.slug}`}>
                        <Button size="sm">
                          View Course
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-3xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with our comprehensive courses.
              Get personalized guidance and support throughout your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#consultation">
                <Button size="lg">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  Contact on WhatsApp
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}