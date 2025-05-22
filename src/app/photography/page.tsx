import FAQ from "@/components/FAQ";
import HeroForPage from "@/components/HeroForPage";
import FixedFooter from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";

export default function Home() {
  // Sample images with dimensions for the gallery
  const galleryImages = [
    { 
      src: "/images/slide1.jpg", 
      alt: "Wedding Couple", 
      width: 1200, 
      height: 800, 
      clientName: "Smith Family"
    },
    { 
      src: "/images/slide2.jpg", 
      alt: "Beach Wedding", 
      width: 1200, 
      height: 800, 
      clientName: "Smith Family"
    },
    { 
      src: "/images/slide3.jpg", 
      alt: "Garden Ceremony", 
      width: 1200, 
      height: 800, 
      clientName: "Johnson Wedding"
    },
    { 
      src: "/images/slide1.jpg", 
      alt: "Reception", 
      width: 1200, 
      height: 800, 
      clientName: "Johnson Wedding"
    },
    { 
      src: "/images/slide2.jpg", 
      alt: "Bride Portrait", 
      width: 1200, 
      height: 800, 
      clientName: "Davis Collection"
    },
    { 
      src: "/images/slide3.jpg", 
      alt: "Family Photo", 
      width: 1200, 
      height: 800, 
      clientName: "Davis Collection"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-roboto-serif">

      <HeroForPage title="Photography" />

      <main className="flex-1 flex flex-col items-center justify-center py-16 gap-0 text-center bg-second-background">
        <div className="w-full px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Our Portfolio</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse through our collection of wedding memories captured for our amazing clients.
          </p>
          <ImageGallery images={galleryImages} groupByClient={true} />
        </div>
        
        <div className="w-full flex justify-center items-center mt-28 mb-0"> 
          <FAQ />
        </div>
      </main>

      <FixedFooter />
    </div>
  );
}
