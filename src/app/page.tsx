import Hero from "../components/Hero";
import NavigationBar from "../components/Navbar";
import CircularGallery from "../components/CircluarGallery";
import AnimatedSection from "../components/AnimatedSection";
import ImpactTestimonials from "@/components/VideoTestimonial";
import { AboutUs } from "@/components/AboutUs";
import FixedFooter from "../components/Footer";
import ZoomParallax from "../components/ZoomParallax";

export default function Home() {
  const items = [
    { image: "/images/slide1.jpg", text: "test" },
    { image: "/images/slide2.jpg", text: "test 2" },
    { image: "/images/slide3.jpg", text: "test 3" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-roboto-serif">
      {/* Navbar */}
      <NavigationBar />

      <Hero />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 gap-0 text-center">
        <div className="px-8 sm:px-20 flex flex-col items-start justify-center w-full">
          <AnimatedSection />
        </div>
        <div className="h-[600px] relative w-full mb-12">
          <CircularGallery
            bend={0}
            textColor="black"
            borderRadius={0.05}
            items={items}
          />
        </div>
        <div className="relative w-full mb-20">
          <ImpactTestimonials />
        </div>
        <AboutUs />
        <div className="w-full">
          <ZoomParallax />
        </div>
      </main>

      <FixedFooter />
    </div>
  );
}
