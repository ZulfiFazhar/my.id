import { LucideIcon } from "lucide-react";
import {
  Github,
  Linkedin,
  LibraryBig,
  Instagram,
  AtSign,
  Mail,
  Globe,
  Disc3,
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
    platform: "Email",
    username: "zulfi.fadilazhar@gmail.com",
    url: "mailto:zulfi.fadilazhar@gmail.com",
    color: "#EA4335",
    darkColor: "#f87171",
    icon: Mail,
  },
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
    platform: "Instagram",
    username: "@zulfifazhar._",
    url: "https://instagram.com/zulfifazhar_",
    color: "#E4405F",
    darkColor: "#fb7185",
    icon: Instagram,
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
    platform: "Threads",
    username: "@zulfifazhar._",
    url: "https://youtube.com/@yourchannel",
    color: "#0a0a0a",
    darkColor: "#f3f4f6",
    icon: AtSign,
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
    platform: "Spotify",
    username: "zull",
    url: "https://open.spotify.com/user/31ffayofrgccrbl6ecyrzemzpoq4?si=db6a58ef562f4e00",
    color: "#1ed760",
    darkColor: "#22ff8e",
    icon: Disc3,
  },
];
