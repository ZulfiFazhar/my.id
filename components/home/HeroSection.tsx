"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroData {
  title: string;
  subtitle: string;
}

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData>({
    title: "Welcome to My Personal Website",
    subtitle:
      "I'm a developer, writer, and creator sharing my thoughts and projects with the world.",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const response = await fetch("/api/home");
        if (response.ok) {
          const data = await response.json();
          setHeroData(data.hero);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHeroData();
  }, []);

  if (isLoading) {
    return (
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 md:py-32">
        <div className="space-y-4 max-w-3xl mx-auto animate-pulse">
          <div className="h-12 bg-muted rounded-md mx-auto w-3/4"></div>
          <div className="h-6 bg-muted rounded-md mx-auto w-2/3"></div>
          <div className="h-12 bg-muted rounded-md mx-auto w-1/3 mt-6"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 md:py-32">
      <div className="space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          {heroData.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {heroData.subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-6">
          <Button size="lg" asChild>
            <Link href="/blog">
              Read My Blog <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/social">Connect With Me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
