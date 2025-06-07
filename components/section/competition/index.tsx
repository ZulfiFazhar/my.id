"use client";

import { Button } from "@/components/ui/button";
import { competitions } from "@/types/competitions";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Competition() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          <h2 className="text-2xl font-bold">Competitions History</h2>
        </div>
        <div className="relative pt-8">
          <div className="absolute lg:left-1/2 left-4 top-0 bottom-0 w-0.5 bg-gray-300 transform lg:-translate-x-1/2"></div>
          <div className="space-y-12">
            {competitions.map((comp, index) => (
              <div key={comp.id} className="relative">
                <div
                  className={`absolute lg:left-1/2 left-4 transform lg:-translate-x-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-4 border-white z-10 ${
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
                  <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm mt-8">
                    <div className="p-4 lg:p-6 rounded-lg">
                      <div className="space-y-3 lg:space-y-4">
                        <div className="text-xs font-medium text-gray-500">
                          {new Date(comp.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                              {comp.title}
                            </h3>
                            <p className="text-xs lg:text-sm text-gray-600 mt-1">
                              Organized by {comp.organizer}
                            </p>
                          </div>
                          <span
                            className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start ${
                              comp.status === "Upcoming"
                                ? "bg-blue-100 text-blue-800"
                                : comp.status === "Ongoing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
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
    <section id="competition" className="container flex flex-col py-4 gap-3">
      <div className="max-w-full">
        <h2 className="text-2xl font-bold">Competitions History</h2>
      </div>

      {/* Timeline Container */}
      <div className="relative pt-8">
        {/* Timeline Line */}
        <div className="absolute lg:left-1/2 left-4 top-0 bottom-0 w-0.5 bg-gray-300 transform lg:-translate-x-1/2"></div>

        <div className="space-y-12">
          {competitions.map((comp, index) => (
            <div key={comp.id} className="relative">
              {/* Timeline Dot */}
              <div
                className={`absolute lg:left-1/2 left-4 transform lg:-translate-x-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-4 border-white z-10 ${
                  comp.status === "Upcoming"
                    ? "bg-blue-500"
                    : comp.status === "Ongoing"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              ></div>

              {/* Timeline Content */}
              <div
                className={`w-full lg:w-1/2 ${
                  index % 2 === 0 ? "lg:pr-8 pl-12" : "lg:pl-8 lg:ml-auto pl-12"
                }`}
              >
                <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group mt-8">
                  {/* Timeline Arrow - Hidden on mobile */}
                  <div
                    className={`absolute top-8 w-0 h-0 hidden lg:block ${
                      index % 2 === 0
                        ? "right-0 translate-x-full border-t-8 border-b-8 border-l-8 border-transparent border-l-white"
                        : "left-0 -translate-x-full border-t-8 border-b-8 border-r-8 border-transparent border-r-white"
                    }`}
                  ></div>

                  <div className="p-4 lg:p-6 rounded-lg">
                    {/* Content Section */}
                    <div className="space-y-3 lg:space-y-4">
                      {/* Date */}
                      <div className="flex justify-between items-center">
                        <div className="text-xs font-medium text-gray-500">
                          {new Date(comp.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <span
                          className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start ${
                            comp.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : comp.status === "Ongoing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {comp.status.charAt(0).toUpperCase() +
                            comp.status.slice(1)}
                        </span>
                      </div>

                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                            {comp.title}
                          </h3>
                          <p className="text-xs lg:text-sm text-gray-600 mt-1">
                            Organized by {comp.organizer}
                          </p>
                          {/* Result */}
                        </div>
                        <p className="text-base font-bold text-foreground">
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
                        <div className="pt-3 lg:pt-4 border-t border-gray-100">
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

                          <p className="text-gray-700 mb-3 lg:mb-4 text-xs lg:text-sm leading-relaxed">
                            {comp.description}
                          </p>

                          <div className="grid grid-cols-1 gap-1 lg:gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-500">
                                📅 Dates:
                              </span>
                              <span className="text-xs text-gray-700">
                                {new Date(comp.startDate).toLocaleDateString()}{" "}
                                - {new Date(comp.endDate).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-500">
                                📍 Location:
                              </span>
                              <span className="text-xs text-gray-700">
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
                          className="text-xs p-0 text-gray-500"
                        >
                          {expandedCards.has(comp.id)
                            ? "Hide Details"
                            : "Show Details"}
                        </Button>
                      </div>

                      {/* Hover indicator - Desktop only */}
                      <div className="hidden lg:block text-center opacity-60 group-hover:opacity-0 transition-opacity duration-300">
                        <span className="text-xs text-gray-400">
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
