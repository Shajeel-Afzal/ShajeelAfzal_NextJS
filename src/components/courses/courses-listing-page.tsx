"use client";

import { useState, useMemo } from "react";
import { Search, Filter, SortAsc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { courses, filterCourses, sortCourses } from "@/data/courses";
import { COURSE_SORT_OPTIONS, COURSE_CATEGORIES } from "@/types/course";
import { CourseCard } from "./course-card";
import { AuroraText } from "@/components/magicui/aurora-text";

interface CourseFilters {
  search: string;
  category: string;
  priceType: string;
  level: string;
}

export function CoursesListingPage() {
  const [filters, setFilters] = useState<CourseFilters>({
    search: "",
    category: "All Categories",
    priceType: "all",
    level: "all",
  });
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    const filtered = filterCourses(courses, filters);
    return sortCourses(filtered, sortBy);
  }, [filters, sortBy]);

  const handleFilterChange = (key: keyof CourseFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "All Categories", 
      priceType: "all",
      level: "all",
    });
  };

  const hasActiveFilters = filters.search || filters.category !== "All Categories" || 
                          filters.priceType !== "all" || filters.level !== "all";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional{" "}
              <AuroraText className="text-4xl md:text-5xl font-bold">
                Development Courses 🎓
              </AuroraText>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Master cutting-edge technologies with hands-on courses designed for real-world application. 
              From mobile development to AI integration, build the skills that matter.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{courses.length} Courses</Badge>
                <Badge variant="secondary">{courses.filter(c => c.price === 0).length} Free</Badge>
                <Badge variant="secondary">{courses.filter(c => c.featured).length} Featured</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses, topics, or technologies..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle & Sort */}
            <div className="flex gap-2 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                    !
                  </Badge>
                )}
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {COURSE_SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters Row */}
          <div className={`mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-200 ${
            showFilters ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden lg:opacity-100 lg:max-h-20'
          }`}>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.priceType} onValueChange={(value) => handleFilterChange("priceType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="free">Free Only</SelectItem>
                <SelectItem value="paid">Paid Only</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold">
                {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
              </h2>
              {hasActiveFilters && (
                <p className="text-muted-foreground mt-1">
                  Filtered results based on your criteria
                </p>
              )}
            </div>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}