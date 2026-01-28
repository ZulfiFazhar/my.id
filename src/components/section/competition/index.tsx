"use client";

import { Button } from "@/components/ui/button";
import { competitions } from "@/types/competitions";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export function Competition() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [timelineProgress, setTimelineProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-competition-id");
          if (id) {
            setVisibleItems((prev) => {
              const newVisible = new Set(prev);
              if (entry.isIntersecting) {
                newVisible.add(id);
              } else {
                newVisible.delete(id);
              }
              return newVisible;
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px",
      },
    );

    // Observe all competition items
    const competitionElements = document.querySelectorAll(
      "[data-competition-id]",
    );
    competitionElements.forEach((el) => observer.observe(el));

    // Timeline progress based on scroll
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the section has been scrolled through
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - sectionTop) / (sectionHeight + windowHeight),
        ),
      );

      setTimelineProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);

  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  if (!isClient) {
    return (
      <section
        id="competition"
        className="container flex flex-col px-4 py-4 gap-3"
      >
        <div className="max-w-full">
          <h2 className="text-2xl font-bold text-foreground">
            Competitions History
          </h2>
        </div>
        <div className="relative pt-8">
          <div className="absolute lg:left-1/2 left-4 top-0 bottom-0 w-0.5 bg-border transform lg:-translate-x-1/2"></div>
          <div className="space-y-12">
            {competitions.map((comp, index) => (
              <div key={comp.id} className="relative">
                <div
                  className={`absolute lg:left-1/2 left-4 transform lg:-translate-x-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-4 border-background z-10 ${
                    comp.status === "Upcoming"
                      ? "bg-blue-500"
                      : comp.status === "Ongoing"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                ></div>
                <div
                  className={`w-full lg:w-1/2 ${
                    index % 2 === 0
                      ? "lg:pr-8 pl-12"
                      : "lg:pl-8 lg:ml-auto pl-12"
                  }`}
                >
                  <div className="relative bg-card border border-border rounded-lg shadow-sm mt-8">
                    <div className="p-4 lg:p-6 rounded-lg">
                      <div className="space-y-3 lg:space-y-4">
                        <div className="text-xs font-medium text-muted-foreground">
                          {new Date(comp.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base lg:text-lg font-semibold text-card-foreground">
                              {comp.title}
                            </h3>
                            <p className="text-xs lg:text-sm text-muted-foreground mt-1">
                              Organized by {comp.organizer}
                            </p>
                          </div>
                          <span
                            className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start ${
                              comp.status === "Upcoming"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : comp.status === "Ongoing"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            }`}
                          >
                            {comp.status.charAt(0).toUpperCase() +
                              comp.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="competition"
      className="container flex flex-col py-4 gap-3"
    >
      <div className="max-w-full">
        <h2 className="text-2xl font-bold text-foreground">
          Competitions History
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative pt-8">
        {/* Animated Timeline Line */}
        <div className="absolute lg:left-1/2 left-4 top-0 bottom-0 w-0.5 transform lg:-translate-x-1/2">
          {/* Background line */}
          <div className="absolute inset-0 bg-border"></div>
          {/* Animated progress line */}
          <div
            className="absolute top-0 left-0 w-full bg-linear-to-b from-blue-500 via-yellow-500 to-green-500 transition-all duration-300 ease-out"
            style={{
              height: `${timelineProgress * 100}%`,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            }}
          ></div>
        </div>

        <div className="space-y-12">
          {competitions.map((comp, index) => (
            <div
              key={comp.id}
              className="relative"
              data-competition-id={comp.id}
            >
              {/* Animated Timeline Dot */}
              <div
                className={`absolute lg:left-1/2 left-4 transform lg:-translate-x-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-4 border-background z-10 transition-all duration-500 ${
                  visibleItems.has(comp.id)
                    ? `scale-110 shadow-lg ${
                        comp.status === "Upcoming"
                          ? "bg-blue-500 shadow-blue-500/50"
                          : comp.status === "Ongoing"
                            ? "bg-yellow-500 shadow-yellow-500/50"
                            : "bg-green-500 shadow-green-500/50"
                      }`
                    : "bg-muted scale-100"
                }`}
              >
                {/* Pulse animation for visible items */}
                {visibleItems.has(comp.id) && (
                  <div
                    className={`absolute inset-0 rounded-full animate-ping ${
                      comp.status === "Upcoming"
                        ? "bg-blue-500"
                        : comp.status === "Ongoing"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  ></div>
                )}
              </div>

              {/* Timeline Content */}
              <div
                className={`w-full lg:w-1/2 transition-all duration-700 ${
                  visibleItems.has(comp.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-60 translate-y-4"
                } ${
                  index % 2 === 0 ? "lg:pr-8 pl-12" : "lg:pl-8 lg:ml-auto pl-12"
                }`}
              >
                <div
                  className={`relative bg-card border border-border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group mt-8 ${
                    visibleItems.has(comp.id) ? "scale-100" : "scale-95"
                  }`}
                >
                  {/* Timeline Arrow - Hidden on mobile */}
                  <div
                    className={`absolute top-8 w-0 h-0 hidden lg:block transition-all duration-300 ${
                      index % 2 === 0
                        ? "right-0 translate-x-full border-t-8 border-b-8 border-l-8 border-transparent border-l-card"
                        : "left-0 -translate-x-full border-t-8 border-b-8 border-r-8 border-transparent border-r-card"
                    } ${
                      visibleItems.has(comp.id) ? "opacity-100" : "opacity-50"
                    }`}
                  ></div>

                  <div className="p-4 lg:p-6 rounded-lg">
                    {/* Content Section */}
                    <div className="space-y-3 lg:space-y-4">
                      {/* Date */}
                      <div className="flex justify-between items-center">
                        <div
                          className={`text-xs font-medium transition-colors duration-300 ${
                            visibleItems.has(comp.id)
                              ? "text-muted-foreground"
                              : "text-muted-foreground/60"
                          }`}
                        >
                          {new Date(comp.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </div>
                        <span
                          className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start transition-all duration-300 ${
                            comp.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : comp.status === "Ongoing"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          } ${
                            visibleItems.has(comp.id) ? "scale-100" : "scale-90"
                          }`}
                        >
                          {comp.status.charAt(0).toUpperCase() +
                            comp.status.slice(1)}
                        </span>
                      </div>

                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-base lg:text-lg font-semibold transition-colors duration-300 ${
                              visibleItems.has(comp.id)
                                ? "text-card-foreground"
                                : "text-card-foreground/70"
                            }`}
                          >
                            {comp.title}
                          </h3>
                          <p
                            className={`text-xs lg:text-sm mt-1 transition-colors duration-300 ${
                              visibleItems.has(comp.id)
                                ? "text-muted-foreground"
                                : "text-muted-foreground/60"
                            }`}
                          >
                            Organized by {comp.organizer}
                          </p>
                        </div>
                        <p
                          className={`text-base font-bold transition-all duration-300 ${
                            visibleItems.has(comp.id)
                              ? "text-foreground scale-100"
                              : "text-foreground/70 scale-95"
                          }`}
                        >
                          {comp.result}
                        </p>
                      </div>

                      {/* Expandable content - Hover on desktop, click on mobile */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedCards.has(comp.id)
                            ? "max-h-96 opacity-100 lg:max-h-0 lg:opacity-0"
                            : "max-h-0 opacity-0"
                        } lg:group-hover:max-h-96 lg:group-hover:opacity-100`}
                      >
                        <div className="pt-3 lg:pt-4 border-t border-border">
                          {/* Image Section */}
                          {comp.imageUrl && (
                            <div className="mb-3 lg:mb-4">
                              <Image
                                src="./placeholder.svg"
                                alt={comp.title}
                                width={400}
                                height={200}
                                className="w-full h-32 lg:h-40 object-cover rounded-md"
                                loading="lazy"
                              />
                            </div>
                          )}

                          <p className="text-card-foreground mb-3 lg:mb-4 text-xs lg:text-sm leading-relaxed">
                            {comp.description}
                          </p>

                          <div className="grid grid-cols-1 gap-1 lg:gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                📅 Dates:
                              </span>
                              <span className="text-xs text-card-foreground">
                                {new Date(comp.startDate).toLocaleDateString()}{" "}
                                - {new Date(comp.endDate).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                📍 Location:
                              </span>
                              <span className="text-xs text-card-foreground">
                                {comp.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Details Button */}
                      <div className="lg:hidden">
                        <Button
                          variant="link"
                          onClick={() => toggleCard(comp.id)}
                          className="text-xs p-0 text-muted-foreground hover:text-foreground"
                        >
                          {expandedCards.has(comp.id)
                            ? "Hide Details"
                            : "Show Details"}
                        </Button>
                      </div>

                      {/* Hover indicator - Desktop only */}
                      <div className="hidden lg:block text-center opacity-60 group-hover:opacity-0 transition-opacity duration-300">
                        <span className="text-xs text-muted-foreground">
                          Hover for details
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
