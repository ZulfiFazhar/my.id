import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DockNavigation } from "@/components/dock-navigation";
import TopLoader from "@/components/top-loader";
import { AuthProvider } from "@/contexts/AuthContext";
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
  title: "Zulfi Personal Web",
  description: "Personal and Portfolio website of Zulfi Fadilah Azhar",
  icons: {
    icon: "/avatartion.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="progress"></div>
          <TopLoader />
          <Toaster position="top-center" richColors />
          {children}
          <DockNavigation />
        </AuthProvider>
      </body>
    </html>
  );
}
