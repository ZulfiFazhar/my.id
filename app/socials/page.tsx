"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { socials } from "@/types/socials";
import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer } from "@/components/ui/stagger-container";

export default function SocialsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div>
      {/* Header */}
      <FadeIn direction="down" className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Connect With Me</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Follow my journey across different platforms. From coding tutorials to
          project updates, find me where you&apos;re most active!
        </p>
      </FadeIn>

      {/* Social Media Grid */}
      <StaggerContainer
        staggerDelay={100}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {socials.map((social) => (
          <Card
            key={social.platform}
            className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 hover:border-primary/20"
            onMouseEnter={() => setHoveredCard(social.platform)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div
                  className="p-4 rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${social.color}15` }}
                >
                  <social.icon
                    className="size-8 transition-colors duration-300"
                    style={{ color: social.color }}
                  />
                </div>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {social.platform}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{social.username}</p>
            </CardHeader>

            <CardContent>
              {/* Visit Button */}
              <Button
                asChild
                className="w-full transition-all duration-300"
                style={{
                  backgroundColor:
                    hoveredCard === social.platform ? social.color : undefined,
                  borderColor: social.color,
                }}
                variant={
                  hoveredCard === social.platform ? "default" : "outline"
                }
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>Visit {social.platform}</span>
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </StaggerContainer>

      {/* Contact Section */}
      <FadeIn>
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Let&apos;s Collaborate!</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Have an interesting project or just want to say hi? Feel free to
              reach out on any of these platforms.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {socials
                .filter((social) => social.platform !== "Portfolio")
                .slice(0, 4)
                .map((social) => (
                  <Button
                    key={social.platform}
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:scale-105 transition-transform"
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <social.icon className="size-4" />
                      <span>{social.platform}</span>
                    </a>
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
