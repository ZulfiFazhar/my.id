import { MDXPost } from "@/lib/mdx";

export interface BlogCardProps {
  blog: {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    publishDate: string;
    readTime: number;
    tags: string[];
    imageUrl?: string;
  };
}

export interface BlogsClientProps {
  blogs: MDXPost[];
}

export interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}
