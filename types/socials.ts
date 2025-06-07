import { LucideIcon } from "lucide-react";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  AtSign,
  Mail,
  Globe,
  MessageCircle,
} from "lucide-react";

export interface Social {
  platform: string;
  username: string;
  url: string;
  color: string;
  icon: LucideIcon;
}

export const socials: Social[] = [
  {
    platform: "GitHub",
    username: "@yourusername",
    url: "https://github.com/yourusername",
    color: "#333333",
    icon: Github,
  },
  {
    platform: "LinkedIn",
    username: "Your Name",
    url: "https://linkedin.com/in/yourprofile",
    color: "#0077B5",
    icon: Linkedin,
  },
  {
    platform: "Twitter",
    username: "@yourusername",
    url: "https://twitter.com/yourusername",
    color: "#1DA1F2",
    icon: Twitter,
  },
  {
    platform: "Instagram",
    username: "@yourusername",
    url: "https://instagram.com/yourusername",
    color: "#E4405F",
    icon: Instagram,
  },
  {
    platform: "Threads",
    username: "Your Channel",
    url: "https://youtube.com/@yourchannel",
    color: "#0a0a0a",
    icon: AtSign,
  },
  {
    platform: "Email",
    username: "your.email@domain.com",
    url: "mailto:your.email@domain.com",
    color: "#EA4335",
    icon: Mail,
  },
  {
    platform: "Portfolio",
    username: "yourdomain.com",
    url: "https://yourdomain.com",
    color: "#8B5CF6",
    icon: Globe,
  },
  {
    platform: "Discord",
    username: "YourUsername#1234",
    url: "https://discord.gg/yourinvite",
    color: "#5865F2",
    icon: MessageCircle,
  },
];
