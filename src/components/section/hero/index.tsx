import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { WordRotate } from "@/components/magicui/word-rotate";

export function Hero() {
  const introduction = "Hi, I'm Zulfi Fadilah Azhar";
  return (
    <section
      id="hero"
      className="container mx-auto grid grid-cols-1 md:grid-cols-2 pb-10 gap-6"
    >
      <div className="flex justify-start items-center">
        <Image
          src="/zulfi.webp"
          alt="Zulfi Image"
          width={100}
          height={100}
          className="w-full h-auto max-w-[416px] object-cover rounded-xl"
          loading="lazy"
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center gap-4">
        <FadeIn direction="down">
          <h1 className="text-6xl md:text-7xl font-extrabold">
            <span className="hidden dark:inline">
              <AuroraText>{introduction}</AuroraText>
            </span>
            <span className="inline dark:hidden">{introduction}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={200} direction="up">
          <div className="flex items-center text-xl md:text-2xl text-muted-foreground max-w-2xl">
            <WordRotate
              words={["Full-Stack", "ML/AI", "IoT"]}
              className="mr-1.5"
            />{" "}
            Developer
          </div>
        </FadeIn>

        <FadeIn delay={400} direction="up">
          <p className="text-muted-foreground max-w-xl">
            I create modern web applications and AI solutions that solve
            real-world problems. Passionate about clean code, user experience,
            and innovative technologies.
          </p>
        </FadeIn>

        <FadeIn delay={600} direction="up" className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/projects">View My Work</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/socials">
              <span className="inline dark:hidden">Get In Touch</span>
              <span className="hidden dark:inline">
                <AnimatedGradientText>Get In Touch</AnimatedGradientText>
              </span>
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
