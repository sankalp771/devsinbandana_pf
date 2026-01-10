import { HeroSection } from "@/components/hero-section";
import { DailyDrop } from "@/components/daily-drop";

export default function Home() {
  return (
    <main className="min-h-screen bg-asphalt overflow-x-hidden selection:bg-neon-green selection:text-asphalt">
      <HeroSection />
      <DailyDrop />
    </main>
  );
}
