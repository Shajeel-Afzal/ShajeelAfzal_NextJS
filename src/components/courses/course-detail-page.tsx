"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  ExternalLink, 
  CheckCircle,
  Globe,
  Calendar,
  Award,
  Play,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AuroraText } from "@/components/magicui/aurora-text";
import type { Course } from "@/types/course";
import { courses, getRelatedCourses } from "@/data/courses";

interface CourseDetailPageProps {
  course: Course;
}

export function CourseDetailPage({ course }: CourseDetailPageProps) {
  const relatedCourses = getRelatedCourses(course, courses, 3);

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return "Free";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <nav className="py-6 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/courses" className="hover:text-foreground transition-colors">
              Courses
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{course.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Back Button */}
              <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="h-4 w-4" />
                Back to Courses
              </Link>

              {/* Course Header */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{course.category}</Badge>
                  <Badge variant="outline">{course.specifications.level}</Badge>
                  {course.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                  {course.popular && (
                    <Badge className="bg-orange-500 text-white">Popular</Badge>
                  )}
                  {course.price === 0 && (
                    <Badge className="bg-green-500 text-white">Free</Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {course.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {course.fullDescription}
                </p>

                {/* Course Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  {course.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      {course.reviewCount && (
                        <span className="text-muted-foreground">
                          ({course.reviewCount} reviews)
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{course.specifications.students?.toLocaleString() || "0"} students</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {formatDate(course.specifications.lastUpdated)}</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>{course.specifications.language}</span>
                  </div>
                </div>
              </div>

              {/* Course Image/Video */}
              <div className="relative mb-12 rounded-xl overflow-hidden">
                <div className="relative h-64 md:h-80 lg:h-96">
                  <Image
                    src={course.heroImage || course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                  {course.videoPreview && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link
                        href={course.videoPreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-16 h-16 bg-primary/90 text-primary-foreground rounded-full hover:bg-primary transition-colors"
                      >
                        <Play className="h-6 w-6 ml-1" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  What you&apos;ll learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Course content
                </h2>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {index + 1}. {module.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{module.lessons} lessons</span>
                            <span>{module.duration}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{module.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              {course.prerequisites.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Prerequisites
                  </h2>
                  <div className="space-y-3">
                    {course.prerequisites.map((prerequisite, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{prerequisite}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Your instructor
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">
                          {course.instructor.name}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {course.instructor.title}
                        </p>
                        <p className="text-sm mb-4">
                          {course.instructor.bio}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {course.instructor.credentials.map((credential, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {credential}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <Card className="mb-6">
                  <CardContent className="p-6">
                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold mb-2">
                        {course.originalPrice && course.price > 0 ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-lg text-muted-foreground line-through">
                              {formatPrice(course.originalPrice, course.currency)}
                            </span>
                            <span className="text-destructive">
                              {formatPrice(course.price, course.currency)}
                            </span>
                          </div>
                        ) : (
                          <span className={course.price === 0 ? "text-green-600" : ""}>
                            {formatPrice(course.price, course.currency)}
                          </span>
                        )}
                      </div>
                      {course.originalPrice && course.price > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          Save {formatPrice(course.originalPrice - course.price, course.currency)}
                        </Badge>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={course.enrollmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mb-4"
                    >
                      <InteractiveHoverButton className="w-full text-lg py-3">
                        <ExternalLink className="h-5 w-5 mr-2" />
                        Enroll Now
                      </InteractiveHoverButton>
                    </Link>

                    {course.previewUrl && (
                      <Link
                        href={course.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mb-6"
                      >
                        <Button variant="outline" className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Preview Course
                        </Button>
                      </Link>
                    )}

                    {/* Course Details */}
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{course.specifications.duration}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Level:</span>
                        <span className="font-medium">{course.specifications.level}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Language:</span>
                        <span className="font-medium">{course.specifications.language}</span>
                      </div>
                      
                      {course.specifications.certificate && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Certificate:</span>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-green-500" />
                            <span className="font-medium">Yes</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold mb-3">This course includes:</h4>
                      <div className="space-y-2">
                        {course.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Related{" "}
                <AuroraText className="text-3xl md:text-4xl font-bold">
                  Courses 📚
                </AuroraText>
              </h2>
              <p className="text-muted-foreground">
                Continue your learning journey with these related courses
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <Card key={relatedCourse.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={relatedCourse.thumbnail}
                      alt={relatedCourse.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {relatedCourse.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {relatedCourse.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        {formatPrice(relatedCourse.price, relatedCourse.currency)}
                      </span>
                      <Link href={`/courses/${relatedCourse.slug}`}>
                        <Button variant="outline" size="sm">
                          View Course
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}