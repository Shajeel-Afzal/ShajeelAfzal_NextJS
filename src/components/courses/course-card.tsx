"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Star, BookOpen, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return "Free";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatStudentCount = (count?: number) => {
    if (!count) return "";
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <MagicCard className="h-full group cursor-pointer">
      <div className="relative">
        {/* Course Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {course.featured && (
              <Badge variant="default" className="bg-primary/90 text-primary-foreground">
                Featured
              </Badge>
            )}
            {course.popular && (
              <Badge variant="secondary" className="bg-orange-500/90 text-white">
                Popular
              </Badge>
            )}
            {course.price === 0 && (
              <Badge variant="secondary" className="bg-green-500/90 text-white">
                Free
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="absolute top-3 right-3">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-sm font-semibold">
                {course.originalPrice && course.price > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground line-through text-xs">
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
              </span>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {course.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {course.specifications.level}
            </Badge>
          </div>
          
          <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {course.description}
          </p>

          {/* Course Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{course.specifications.duration}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>{course.modules.length} modules</span>
            </div>
            
            {course.specifications.students && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{formatStudentCount(course.specifications.students)}</span>
              </div>
            )}
          </div>

          {/* Rating */}
          {course.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
              {course.reviewCount && (
                <span className="text-xs text-muted-foreground">
                  ({course.reviewCount} reviews)
                </span>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
            {course.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-0">
                +{course.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Link href={`/courses/${course.slug}`} className="flex-1">
              <InteractiveHoverButton className="w-full text-sm">
                Learn More
              </InteractiveHoverButton>
            </Link>
            
            <Link
              href={course.enrollmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button variant="outline" size="sm" className="px-3">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </MagicCard>
  );
}