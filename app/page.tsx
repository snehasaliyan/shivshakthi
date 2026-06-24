import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DualHubVisualizer from "@/components/DualHubVisualizer";
import ProductGrid from "@/components/ProductGrid";
import ShadeCardExplorer from "@/components/ShadeCardExplorer";
import QualityBadges from "@/components/QualityBadges";
import ETPSection from "@/components/ETPSection";
import ClientMarquee from "@/components/ClientMarquee";
import IndiaDistributionMap from "@/components/IndiaDistributionMap";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DualHubVisualizer />
        <ProductGrid />
        <ShadeCardExplorer />
        <QualityBadges />
        <ETPSection />
        <ClientMarquee />
        <IndiaDistributionMap />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
