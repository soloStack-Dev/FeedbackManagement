// Home page — EventFlow landing page built from Context/home-page-build-prompt.md
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { LivePulse } from "@/components/home/LivePulse";
import { Features } from "@/components/home/Features";
import { Analytics } from "@/components/home/Analytics";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LivePulse />
        <Features />
        <Analytics />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}