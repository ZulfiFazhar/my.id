import { DockNavigation } from "@/components/dock-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  SquarePen,
  Globe,
  Mail,
} from "lucide-react";
// import Link from "next/link";

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-muted/30 pb-25">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Connect With Me</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Follow me on social media to stay updated with my latest projects,
            articles, and thoughts.
          </p>
        </header>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialLinks.map((link, index) => (
            <Card key={index} className="overflow-hidden p-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${link.bgColor}`}
                    >
                      <link.icon className={`h-6 w-6 ${link.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{link.platform}</h3>
                      <p className="text-sm text-muted-foreground">
                        {link.username}
                      </p>
                    </div>
                  </div>
                  <Button asChild>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Connect
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
                    <a href="mailto:contact@example.com">Email Me</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <DockNavigation />
    </div>
  );
}

const socialLinks = [
  {
    platform: "GitHub",
    username: "@ZulfiFazhar",
    url: "https://github.com/ZulfiFazhar",
    icon: Github,
    bgColor: "bg-black",
    iconColor: "text-white",
  },
  {
    platform: "Twitter",
    username: "@zulfifazhar_",
    url: "https://twitter.com/zulfifazhar_",
    icon: Twitter,
    bgColor: "bg-blue-500",
    iconColor: "text-white",
  },
  {
    platform: "LinkedIn",
    username: "Zulfi Fadilah Azhar",
    url: "https://linkedin.com/in/zulfi-fadilah-azhar",
    icon: Linkedin,
    bgColor: "bg-blue-700",
    iconColor: "text-white",
  },
  {
    platform: "Instagram",
    username: "@zulfifazhar._",
    url: "https://instagram.com/zulfifazhar._",
    icon: Instagram,
    bgColor: "bg-pink-600",
    iconColor: "text-white",
  },
  {
    platform: "Medium",
    username: "@zulfifazhar._",
    url: "https://medium.com/zulfifazhar._",
    icon: SquarePen,
    bgColor: "bg-black",
    iconColor: "text-white",
  },
  {
    platform: "Personal Website",
    username: "zulfifazhar.my.id",
    url: "https://zulfifazhar.my.id",
    icon: Globe,
    bgColor: "bg-green-600",
    iconColor: "text-white",
  },
];
