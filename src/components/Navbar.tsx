"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 bg-transparent z-91 ">
      <nav
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
        }}
        className={`w-full flex bg-gradient-to-b  backdrop ${
          scrolled ? "items-start py-10" : "items-start py-10"
        } justify-between px-8 md:px-10`}
      >
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
                animate={{ width: scrolled ? 60 : 150 }} // Keeps resizing behavior
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <Image src="/logo.png" alt="Logo" width={150} height={40} />
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
          className="md:hidden"
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
      </nav>

      {/* Mobile Menu with Slide & Fade Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-transparent bg-opacity-80 py-4 flex flex-col items-end px-6 gap-0"
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
