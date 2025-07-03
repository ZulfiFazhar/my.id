import { Hero } from "@/components/section/hero";
import { About } from "@/components/section/about";
import { Tech } from "@/components/section/tech";
import { Projects } from "@/components/section/projects";
import { Competition } from "@/components/section/competition";
import { Blogs } from "@/components/section/blogs";
import { FadeIn } from "@/components/ui/fade-in";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <FadeIn direction="up">
        <Hero />
      </FadeIn>

      {/* About Section */}
      <FadeIn>
        <About />
      </FadeIn>

      {/* Tech Section */}
      <FadeIn>
        <Tech />
      </FadeIn>

      {/* Projects Section */}
      <FadeIn>
        <Projects />
      </FadeIn>

      {/* Competition Section */}
      <FadeIn>
        <Competition />
      </FadeIn>

      {/* Blogs Section */}
      <FadeIn>
        <Blogs />
      </FadeIn>
    </div>
  );
}
