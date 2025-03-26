import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import RecentPostsSection from "@/components/home/RecentPostsSection";
import CTASection from "@/components/home/CTASection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <AboutSection />
      <RecentPostsSection />
      <CTASection />
    </div>
  );
}
