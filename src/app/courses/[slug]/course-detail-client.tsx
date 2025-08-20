"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Clock, 
  Award, 
  Globe, 
  BookOpen, 
  CheckCircle, 
  Star,
  ExternalLink,
  ArrowLeft,
  Share2,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course } from "@/lib/courses-data";

interface CourseDetailClientProps {
  course: Course;
  relatedCourses: Course[];
}

export function CourseDetailClient({ course, relatedCourses }: CourseDetailClientProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: course.title,
          text: course.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-8">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-foreground transition-colors">
            Courses
          </Link>
          <span>/</span>
          <span className="text-foreground">{course.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Back Button */}
            <Link href="/courses">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
            </Link>

            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={course.heroImage}
                alt={course.title}
                width={800}
                height={400}
                className={`w-full h-64 md:h-80 object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              {course.featured && (
                <Badge className="absolute top-4 left-4 bg-primary">
                  Featured Course
                </Badge>
              )}
              {course.isFree && (
                <Badge className="absolute top-4 right-4 bg-green-600">
                  Free Course
                </Badge>
              )}
            </div>

            {/* Title and Description */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.fullDescription}</p>
              
              {/* Course Meta */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-primary" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>{course.category}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                <TabsTrigger value="prerequisites">Prerequisites</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="space-y-4">
                <h3 className="text-xl font-semibold">Course Curriculum</h3>
                <div className="space-y-4">
                  {course.curriculum.map((section, index) => (
                    <Card key={section.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Section {index + 1}: {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-start gap-2">
                              <Play className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                              <span className="text-sm">{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="outcomes" className="space-y-4">
                <h3 className="text-xl font-semibold">Learning Outcomes</h3>
                <p className="text-muted-foreground mb-4">
                  After completing this course, you will be able to:
                </p>
                <div className="grid gap-3">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="prerequisites" className="space-y-4">
                <h3 className="text-xl font-semibold">Prerequisites</h3>
                <p className="text-muted-foreground mb-4">
                  Before taking this course, you should have:
                </p>
                <div className="grid gap-3">
                  {course.prerequisites.map((prerequisite, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{prerequisite}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-4">
                <h3 className="text-xl font-semibold">Your Instructor</h3>
                <div className="flex items-start gap-4">
                  <Image
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{course.instructor.name}</h4>
                    <p className="text-muted-foreground">{course.instructor.bio}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Price and Enrollment Card */}
              <Card>
                <CardHeader>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      {course.isFree ? "Free" : `$${course.price}`}
                    </div>
                    {!course.isFree && (
                      <p className="text-sm text-muted-foreground">One-time payment</p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <Link 
                      href={course.enrollmentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {course.isFree ? "Start Learning" : "Enroll Now"}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Course
                  </Button>

                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Have questions? 
                      <Link 
                        href="https://wa.me/your-number" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-1"
                      >
                        Contact me on WhatsApp
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Course Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <Card key={relatedCourse.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={relatedCourse.thumbnail}
                      alt={relatedCourse.title}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedCourse.isFree && (
                      <Badge className="absolute top-2 right-2 bg-green-600">
                        Free
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {relatedCourse.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {relatedCourse.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        {relatedCourse.isFree ? "Free" : `$${relatedCourse.price}`}
                      </span>
                      <Link href={`/courses/${relatedCourse.slug}`}>
                        <Button size="sm" variant="outline">
                          View Course
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-3xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with expert-led courses.
              Get personalized guidance and support throughout your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#consultation">
                <Button size="lg">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg">
                  Explore More Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}