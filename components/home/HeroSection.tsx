import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 md:py-32">
      <div className="space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Welcome to My Personal Website
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          I&apos;m a developer, writer, and creator sharing my thoughts and
          projects with the world.
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
