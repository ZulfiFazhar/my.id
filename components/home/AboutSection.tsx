"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  level?: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface AboutData {
  description: string;
  experience: string;
  image: string;
  skillCategories: SkillCategory[];
}

export default function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutData>({
    description:
      "I'm passionate about technology, design, and creating meaningful experiences. With over 5 years of experience in web development, I enjoy sharing my knowledge and insights through my blog.",
    experience: "5+ years",
    image: "/placeholder.svg?height=400&width=400",
    skillCategories: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const response = await fetch("/api/home");
        if (response.ok) {
          const data = await response.json();
          setAboutData(data.about);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAboutData();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square max-w-md mx-auto md:mx-0 bg-muted animate-pulse rounded-xl"></div>
            <div className="space-y-6">
              <div className="h-8 bg-muted rounded-md w-1/3 animate-pulse"></div>
              <div className="h-24 bg-muted rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative md:sticky md:top-0 aspect-square max-w-md mx-auto md:mx-0">
            <Image
              src={aboutData.image || "/placeholder.svg"}
              alt="Profile"
              width={400}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <p className="text-muted-foreground text-lg">
              {aboutData.description}
            </p>

            {aboutData.skillCategories.length > 0 && (
              <div className="pt-6 border-t mt-6">
                <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
                <div className="space-y-4">
                  {aboutData.skillCategories.map((category, index) => (
                    <div key={index}>
                      <h4 className="font-medium mb-2">{category.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="outline"
                            className="px-3 py-1 cursor-default"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
