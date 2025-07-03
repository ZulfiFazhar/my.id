"use client";

import { useState, useEffect } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
  index: number;
}

interface ActiveTableOfContentsProps {
  headings: Heading[];
}

export function ActiveTableOfContents({
  headings,
}: ActiveTableOfContentsProps) {
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

  return (
    <nav className="space-y-3 max-h-96 overflow-y-auto">
      {headings.map(({ id, text, level }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`block text-sm transition-colors leading-snug ${
            activeId === id
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-primary"
          } ${level === 3 ? "ml-4 text-xs" : ""}`}
        >
          {text}
        </a>
      ))}
    </nav>
  );
}
