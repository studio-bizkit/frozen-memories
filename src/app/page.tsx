import Image from "next/image";
import Hero from "../components/Hero";
import NavigationBar from "../components/Navbar";
import CircularGallery from "../components/CircluarGallery";
import AnimatedSection from "../components/AnimatedSection";

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
      <main className="flex-1 flex flex-col items-center justify-center py-16 gap-1 text-center">
        <div className="px-8 sm:px-20 flex flex-col items-start justify-center w-full">
          <AnimatedSection />
        </div>
        <div
          style={{
            height: "600px",
            position: "relative",
            width: "100%",
            marginBottom:"1000px"
          }}
        >
          <CircularGallery
            bend={0}
            textColor="black"
            borderRadius={0.05}
            items={items}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Footer Component
const Footer = () => (
  <footer className="flex flex-wrap items-center justify-center gap-6 py-6 border-t bg-gray-50">
    <FooterLink
      href=""
      icon="/file.svg"
      text="Learn"
    />
    <FooterLink
      href=""
      icon="/window.svg"
      text="Examples"
    />
    <FooterLink
      href=""
      icon="/globe.svg"
      text="Go to nextjs.org →"
    />
  </footer>
);

interface FooterLinkProps {
  href: string;
  icon: string;
  text: string;
}

const FooterLink = ({ href, icon, text }: FooterLinkProps) => (
  <a
    className="flex items-center gap-2 text-gray-600 hover:text-black transition duration-200 hover:underline"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image src={icon} alt={text} width={16} height={16} aria-hidden />
    {text}
  </a>
);
