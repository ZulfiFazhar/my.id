import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "app/blogs/posts");

export interface MDXPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  category: string;
  readTime: number;
  tags: string[];
  author: string;
  content: string;
  imageUrl?: string;
}

// Blog image mapping based on category and slug
const getBlogImage = (slug: string, category: string): string => {
  const imageMap: Record<string, string> = {
    "getting-started-nextjs-15": "/images/blogs/nextjs-15.jpg",
    "building-scalable-apis-nodejs": "/images/blogs/nodejs-api.jpg",
    "introduction-machine-learning": "/images/blogs/machine-learning.jpg",
    "react-performance-optimization": "/images/blogs/react-performance.jpg",
  };

  // Return specific image if exists, otherwise use category-based image
  if (imageMap[slug]) {
    return imageMap[slug];
  }

  // Fallback images based on category
  const categoryImages: Record<string, string> = {
    Frontend: "/images/blogs/frontend-default.jpg",
    Backend: "/images/blogs/backend-default.jpg",
    "AI/ML": "/images/blogs/ai-ml-default.jpg",
    DevOps: "/images/blogs/devops-default.jpg",
  };

  return categoryImages[category] || "/images/blogs/blog-default.jpg";
};

export function getAllMDXPosts(): MDXPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: slug, // Use slug as id
        slug,
        content,
        imageUrl: data.imageUrl || getBlogImage(slug, data.category),
        ...data,
      } as MDXPost;
    });

  return allPostsData.sort((a, b) => {
    return (
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  });
}

export function getMDXPost(slug: string): MDXPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id: slug, // Use slug as id
      slug,
      content,
      imageUrl: data.imageUrl || getBlogImage(slug, data.category),
      ...data,
    } as MDXPost;
  } catch (error) {
    console.error(`Error fetching MDX post for slug "${slug}":`, error);
    return null;
  }
}
