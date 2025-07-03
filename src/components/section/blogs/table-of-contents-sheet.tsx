"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
  index: number;
}

interface TableOfContentsSheetProps {
  headings: Heading[];
}

export function TableOfContentsSheet({ headings }: TableOfContentsSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="fixed -right-2 top-1/2 -translate-y-1/2 z-50 lg:hidden opacity-70 hover:opacity-100 hover:right-0 transition-all duration-200">
          <Button
            variant="secondary"
            size="sm"
            className="h-12 w-14 pr-2 rounded-l-lg shadow-lg border bg-background/90 backdrop-blur-sm"
          >
            <BookOpen className="size-4" />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 sm:w-96">
        <SheetHeader className="pb-0">
          <SheetTitle className="text-left">Table of Contents</SheetTitle>
        </SheetHeader>
        <nav className="space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {headings.map(({ id, text, level }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`block text-sm transition-colors leading-snug border-l-2 pl-3 py-1 ${
                activeId === id
                  ? "text-primary font-semibold border-primary bg-primary/5"
                  : "text-muted-foreground border-transparent hover:text-primary hover:border-primary"
              } ${level === 3 ? "ml-4 text-xs" : ""}`}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {text}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
