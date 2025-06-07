"use client";

import { Home, FolderOpen, BookOpen, UserRoundPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavbarProps } from "@/types/navbar";
import Link from "next/link";

const Navbar = ({
  menu = [
    { title: "Home", url: "/", icon: <Home className="size-5" /> },
    {
      title: "Projects",
      url: "/projects",
      icon: <FolderOpen className="size-5" />,
    },
    { title: "Blogs", url: "/blogs", icon: <BookOpen className="size-5" /> },
    {
      title: "Socials",
      url: "/socials",
      icon: <UserRoundPlus className="size-5" />,
    },
  ],
}: NavbarProps) => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-background/80 backdrop-blur-lg border border-accent rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-2">
          {menu.map((item) => {
            const active = isActive(item.url);
            return (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="h-12 w-12 rounded-full p-0 relative overflow-hidden"
                    >
                      <Link
                        href={item.url}
                        className="flex flex-col items-center justify-center gap-1 group relative"
                      >
                        {active && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-foreground rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                          />
                        )}
                        <motion.div
                          className={`relative z-10 ${
                            active
                              ? "text-background"
                              : "text-foreground group-hover:text-foreground"
                          }`}
                          animate={{
                            scale: active ? 1.1 : 1,
                            rotate: active ? [0, -5, 5, 0] : 0,
                          }}
                          transition={{
                            duration: active ? 0.6 : 0.3,
                            ease: "easeInOut",
                          }}
                        >
                          {item.icon}
                        </motion.div>
                      </Link>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
