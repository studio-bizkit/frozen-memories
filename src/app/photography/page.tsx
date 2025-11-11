import FAQ from "@/components/FAQ";
import HeroForPage from "@/components/HeroForPage";
import FixedFooter from "@/components/Footer";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";

export default function Home() {
  // Combine all images from public/Baby Shower and public/Wedding into a single flow
  const babyShowerImages = [
    "/Baby Shower/1.jpg",
    "/Baby Shower/2.jpg",
    "/Baby Shower/3.jpg",
    "/Baby Shower/4.jpg",
    "/Baby Shower/5.jpg",
    "/Baby Shower/6.jpg",
    "/Baby Shower/7.jpg",
    "/Baby Shower/8.jpg",
    "/Baby Shower/8 copy.jpg",
    "/Baby Shower/9.jpg",
    "/Baby Shower/10.jpg",
    "/Baby Shower/11.jpg",
    "/Baby Shower/12.jpg",
    "/Baby Shower/13.jpg",
    "/Baby Shower/Samyuktha’s Babyshower.jpg",
  ];

  const weddingImages = [
    "/Wedding/1.jpg",
    "/Wedding/1 (2).jpg",
    "/Wedding/2.jpg",
    "/Wedding/2 (2).jpg",
    "/Wedding/3.jpg",
    "/Wedding/3 (2).jpg",
    "/Wedding/4.jpg",
    "/Wedding/4 (2).jpg",
    "/Wedding/5.jpg",
    "/Wedding/6.jpg",
    "/Wedding/6 (2).jpg",
    "/Wedding/7.jpg",
    "/Wedding/7 (2).jpg",
    "/Wedding/8.jpg",
    "/Wedding/8-2.jpg",
    "/Wedding/9.jpg",
    "/Wedding/9-2.jpg",
    "/Wedding/10.jpg",
    "/Wedding/10a.jpg",
    "/Wedding/11.jpg",
    "/Wedding/12.jpg",
    "/Wedding/13.jpg",
  ];

  const allImages = [...babyShowerImages, ...weddingImages];

  return (
    <div className="flex flex-col min-h-screen font-roboto-serif">

      <HeroForPage title="Photography" />

      <main className="flex-1 flex flex-col items-center justify-center py-16 gap-0 text-center bg-second-background">
        <div className="w-full px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Our Portfolio</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Browse through our collection of wedding memories captured for our amazing clients.
          </p>
          <ParallaxScroll images={allImages} />
        </div>
        
        <div className="w-full flex justify-center items-center mt-28 mb-0"> 
          <FAQ />
        </div>
      </main>

      <FixedFooter />
    </div>
  );
}
