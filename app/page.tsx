import { Hero } from "@/components/section/hero";
import { About } from "@/components/section/about";
import { Tech } from "@/components/section/tech";
import { Projects } from "@/components/section/projects";
import { Competition } from "@/components/section/competition";
import { Blogs } from "@/components/section/blogs";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Tech />
      <Projects />
      <Competition />
      <Blogs />
    </main>
  );
}
