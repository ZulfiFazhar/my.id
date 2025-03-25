import Image from "next/image";
import { CheckCircle } from "lucide-react";

const aboutPoints = [
  "Full-stack developer specializing in React and Next.js",
  "Writer sharing insights on web development and technology",
  "Open source contributor and community builder",
  "Always learning and exploring new technologies",
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-md mx-auto md:mx-0">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Profile"
              width={400}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <p className="text-muted-foreground text-lg">
              I&apos;m passionate about technology, design, and creating
              meaningful experiences. With over 5 years of experience in web
              development, I enjoy sharing my knowledge and insights through my
              blog.
            </p>
            <div className="space-y-3">
              {aboutPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
