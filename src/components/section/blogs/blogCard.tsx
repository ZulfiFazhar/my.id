import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogCardProps } from "@/types/blogs";

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer h-full overflow-hidden p-0 flex flex-col">
        {/* Blog Cover Image - Fixed height */}
        <div className="relative overflow-hidden h-48 flex-shrink-0">
          {blog.imageUrl && (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={400}
              height={200}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}

          {/* Category Badge Overlay */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-background/80"
            >
              {blog.category}
            </Badge>
          </div>
        </div>

        {/* Content area - Flexible */}
        <div className="flex flex-col flex-1 p-6">
          {/* Date and Read Time - Fixed position */}
          <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="size-3" />
              <span>
                {new Date(blog.publishDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-3" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          {/* Title - Fixed height */}
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors leading-snug mb-3 h-12 flex items-start">
            {blog.title}
          </CardTitle>

          {/* Description - Fixed height */}
          <CardDescription className="line-clamp-3 text-sm leading-relaxed mb-4 h-16 flex-1">
            {blog.description}
          </CardDescription>

          {/* Tags - Fixed position at bottom */}
          <div className="flex flex-wrap gap-1 mt-4">
            {blog.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs hover:bg-accent transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{blog.tags.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
