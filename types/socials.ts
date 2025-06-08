import { LucideIcon } from "lucide-react";
import {
  Github,
  Linkedin,
  LibraryBig,
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
  darkColor: string; // Alternative color for dark mode
  icon: LucideIcon;
}

export const socials: Social[] = [
  {
    platform: "GitHub",
    username: "@ZulfiFazhar",
    url: "https://github.com/ZulfiFazhar",
    color: "#333333",
    darkColor: "#f0f6ff",
    icon: Github,
  },
  {
    platform: "LinkedIn",
    username: "Zulfi Fadilah Azhar",
    url: "https://linkedin.com/in/zulfi-fadilah-azhar/",
    color: "#0077B5",
    darkColor: "#60a5fa",
    icon: Linkedin,
  },
  {
    platform: "Medium",
    username: "Zulfi Fadilah Azhar",
    url: "https://medium.com/@zulfifazhar._",
    color: "#242424",
    darkColor: "#e5e7eb",
    icon: LibraryBig,
  },
  {
    platform: "Instagram",
    username: "@yourusername",
    url: "https://instagram.com/zulfifazhar_",
    color: "#E4405F",
    darkColor: "#fb7185",
    icon: Instagram,
  },
  {
    platform: "Threads",
    username: "Your Channel",
    url: "https://youtube.com/@yourchannel",
    color: "#0a0a0a",
    darkColor: "#f3f4f6",
    icon: AtSign,
  },
  {
    platform: "Email",
    username: "zulfi.fadilazhar@gmail.com",
    url: "mailto:zulfi.fadilazhar@gmail.com",
    color: "#EA4335",
    darkColor: "#f87171",
    icon: Mail,
  },
  {
    platform: "Portfolio",
    username: "zulfifazhar.my.id",
    url: "https://www.zulfifazhar.my.id",
    color: "#8B5CF6",
    darkColor: "#a78bfa",
    icon: Globe,
  },
  {
    platform: "Discord",
    username: "zulfi121",
    url: "https://discordapp.com/users/518323232651345935",
    color: "#5865F2",
    darkColor: "#818cf8",
    icon: MessageCircle,
  },
];
