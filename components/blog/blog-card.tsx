import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    excerpt: string;
    image?: string;
    category: string;
    date: string;
    slug: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card key={post._id} className="overflow-hidden h-fit p-0">
      <div className="aspect-video relative">
        <Image
          src={post.image || "/placeholder.svg?height=200&width=400"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="pt-6">
        <div className="mb-2">
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-muted-foreground mb-4 h-5">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center py-6">
        <span className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString()}
        </span>
        <Button variant="link" size="sm" asChild>
          <Link href={`/blog/${post.slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
