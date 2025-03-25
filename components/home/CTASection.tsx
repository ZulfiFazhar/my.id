import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="pt-20 py-30 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let&apos;s Connect
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Follow me on social media or check out my latest blog posts to stay
          updated.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/social">Social Media</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            asChild
          >
            <Link href="/blog">Read Blog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
