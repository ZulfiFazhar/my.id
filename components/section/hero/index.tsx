import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
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

      <div className="flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Hi, I&apos;m Zulfi, a Full-Stack Developer & AIoT Specialist
        </h1>
        <p className="text-base mb-6">
          I&apos;m passionate about building innovative solutions that bridge
          the gap between software and hardware. With a background in computer
          science and a love for tinkering, I specialize in creating full-stack
          applications with a focus on AI and IoT technologies. Let&apos;s
          explore my work and see how I can help bring your ideas to life.
        </p>
        <Button className="w-full md:w-auto py-5 hover:cursor-pointer">
          View Projects
        </Button>
      </div>
    </section>
  );
}
