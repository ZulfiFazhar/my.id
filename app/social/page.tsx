/* eslint-disable @typescript-eslint/no-explicit-any */
// social-page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { connectToDatabase, formatMongoData } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import Social from "@/models/Social";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  SquarePen,
  Globe,
  Mail,
} from "lucide-react";

export const revalidate = 60;

async function getSocials() {
  try {
    await connectToDatabase();
    const socials = await Social.find({});
    return formatMongoData(socials);
  } catch (error) {
    console.error("Error fetching socials:", error);
    return [];
  }
}

// Fungsi untuk mendapatkan komponen ikon
function getIconComponent(iconName: string) {
  const icons: Record<string, any> = {
    Github,
    Twitter,
    Linkedin,
    Instagram,
    SquarePen,
    Globe,
    Mail,
  };
  return icons[iconName] || icons.Github;
}

// Impor SocialCard secara dinamis
const LazySocialCard = dynamic(
  () => import("@/components/social/social-card"),
  {
    loading: () => <div>Loading...</div>,
  }
);

export default async function SocialPage() {
  const socialLinks = await getSocials();

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Connect With Me</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Follow me on social media to stay updated with my latest projects,
            articles, and thoughts.
          </p>
        </header>

        {socialLinks.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No social links found</h2>
            <p className="text-muted-foreground">
              Check back later for ways to connect!
            </p>
          </div>
        ) : (
          <Suspense fallback={<div>Loading social links...</div>}>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialLinks.map((link: any) => (
                <LazySocialCard
                  key={link._id}
                  social={link}
                  getIconComponent={getIconComponent}
                />
              ))}
            </div>
          </Suspense>
        )}

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Other Ways to Connect</h2>
          <div className="max-w-fit mx-auto space-y-4">
            <Card className="p-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        zulfi.fadilazhar@gmail.com
                      </p>
                    </div>
                  </div>
                  <Button className="w-full sm:w-fit" variant="outline" asChild>
                    <a href="mailto:zulfi.fadilazhar@gmail.com">Email Me</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
