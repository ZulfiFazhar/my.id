import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ConditionalBreadcrumb } from "@/components/navbar/conditional-breadcrumb";
import { ThemeProvider } from "@/lib/theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zulfi Fadilah Azhar - Full Stack Developer & AI Enthusiast",
    template: "%s | Zulfi Fadilah Azhar",
  },
  icons: {
    icon: "/avatartion.png",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and AIoT solutions. Explore my portfolio of web applications, and innovative projects.",
  keywords: [
    "Zulfi Fadilah Azhar",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "AI Developer",
    "IoT Developer",
    "AIoT Developer",
    "Web Development",
    "Data Engineering",
    "Software Engineer",
    "Portfolio",
    "Indonesia Developer",
  ],
  authors: [{ name: "Zulfi Fadilah Azhar" }],
  creator: "Zulfi Fadilah Azhar",
  metadataBase: new URL("https://zulfifazhar.my.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zulfifazhar.my.id",
    title: "Zulfi Fadilah Azhar - Full Stack Developer & AI Enthusiast",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and AIoT solutions. Explore my portfolio of web applications, and innovative projects.",
    siteName: "Zulfi Fadilah Azhar Portfolio",
    images: [
      {
        url: "/zulfi.webp",
        width: 1200,
        height: 630,
        alt: "Zulfi Fadilah Azhar - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zulfi Fadilah Azhar - Full Stack Developer & AI Enthusiast",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and AIoT solutions.",
    images: ["/zulfi.webp"],
    creator: "@zulfifazhar_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "3dueLQkIykrE_03qDv92dAjwhsmVYU6KgdcWKdzGEjE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" />

        <AuthProvider>
          <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
            <TooltipProvider>
              <ConditionalBreadcrumb>{children}</ConditionalBreadcrumb>
              <Navbar />
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
