"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ProgressiveBlur } from "./ui/progressive-blur";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Track scroll progress from 0 to a certain threshold (e.g., 200px)
  const { scrollY } = useScroll();

  // Transform scroll position to logo size
  // Start at 150px, decrease to 60px as user scrolls from 0 to 200px
  const logoSize = useTransform(scrollY, [0, 200], [150, 60]);

  return (
    <header className="w-full fixed top-0 left-0 bg-transparent z-[91]">
      <nav
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
        }}
        className="relative w-full flex items-start py-10 justify-between px-8 md:px-10"
      >
        {/* Progressive Blur - Behind nav content but part of navbar */}
        <ProgressiveBlur
          position="top"
          height="100%"
          className="!absolute !inset-0 !z-0"
        />

        {/* Nav Content - Above the blur */}
        <div className="relative z-10 w-full flex items-start justify-between">
          {/* Left Links */}
          <div className="hidden md:flex space-x-6">
            <NavItem href="/photography" text="Photography" mobile={false} />
            <NavItem href="/films" text="Films" mobile={false} />
          </div>

          {/* Logo in Center (Animated Size & Entrance) */}
          <div className="md:flex-grow md:flex justify-center">
            <Link href="/" className="block">
              <motion.div
                initial={{ opacity: 0, y: -20 }} // Start faded and above
                animate={{ opacity: 1, y: 0 }} // Fade in and slide down
                transition={{ duration: 0.8, ease: "easeOut", delay: 1 }} // Smooth effect
              >
                <motion.div
                  style={{
                    width: logoSize,
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={150}
                    height={40}
                    className="w-full h-auto"
                    style={{ objectFit: "contain" }}
                  />
                </motion.div>
              </motion.div>
            </Link>
          </div>

          {/* Right Links */}
          <div className="hidden md:flex space-x-6">
            <NavItem href="/about-us" text="About Us" mobile={false} />
            <NavItem href="/contact-us" text="Contact Us" mobile={false} />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative z-10"
            onClick={() => setIsOpen(!isOpen)}
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X size={28} color="white" />
            ) : (
              <Menu size={28} color="white" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu with Slide & Fade Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-transparent bg-opacity-80 py-4 flex flex-col items-end px-6 gap-0 z-20"
          >
            <NavItem href="/photography" text="Photography" mobile />
            <NavItem href="/films" text="Films" mobile />
            <NavItem href="/about-us" text="About Us" mobile />
            <NavItem href="/contact-us" text="Contact Us" mobile />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface NavItemProps {
  href: string;
  text: string;
  mobile: boolean;
}

const NavItem = ({ href, text, mobile }: NavItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <Link
      href={href}
      className={`cursor-pointer text-accent-dark hover:text-white/60 transition duration-200 font-young-serif uppercase font-weight-100 ${
        mobile ? "block text-md py-2 " : "text-base text-white"
      }`}
    >
      {text}
    </Link>
  </motion.div>
);
