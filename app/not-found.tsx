"use client";

import { useTheme } from "@/lib/theme";
import FuzzyText from "@/components/ui/fuzzy";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const { actualTheme } = useTheme();
  const textColor = actualTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <section
      id="error"
      className="flex flex-col items-center justify-center min-h-[90vh] gap-6"
    >
      <div className="text-center space-y-2">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover={true}
          color={textColor}
          fontSize="clamp(5.5rem, 8vw, 8rem)"
        >
          404
        </FuzzyText>
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover={true}
          color={textColor}
          fontSize="clamp(1.5rem, 2vw, 2.5rem)"
        >
          Page Not Found
        </FuzzyText>
      </div>

      <p className="text-muted-foreground text-center max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex gap-4 flex-col sm:flex-row">
        <Button asChild variant="default">
          <Link href="/" className="flex items-center gap-2">
            <Home className="size-4" />
            Go Home
          </Link>
        </Button>
        <Button asChild variant="outline" onClick={() => window.history.back()}>
          <span className="flex items-center gap-2 cursor-pointer">
            <ArrowLeft className="size-4" />
            Go Back
          </span>
        </Button>
      </div>
    </section>
  );
}
