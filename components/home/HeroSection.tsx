import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroData {
  title: string;
  subtitle: string;
}

export default async function HeroSection() {
  let heroData: HeroData = {
    title: "Welcome to My Personal Website",
    subtitle:
      "I'm a developer, writer, and creator sharing my thoughts and projects with the world.",
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/home`, {
      cache: "no-store",
    });
    if (response.ok) {
      const data = await response.json();
      heroData = data.hero;
    }
  } catch (error) {
    console.error("Error fetching hero data:", error);
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
