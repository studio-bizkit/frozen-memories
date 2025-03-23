"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Noise from "./Noise";
import BlurText from "./BlurText";
import { ChevronsDown } from "lucide-react"; // Import an arrow icon
import { useLenis } from "lenis/react";

const images = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const scrollToNextSection = () => {
    lenis?.scrollTo(window.innerHeight - 100);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Noise
        patternSize={100}
        patternScaleX={2}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={10}
      />
      <div className="absolute inset-0 pointer-events-none z-1 bg-black/50 md:hidden"></div>
      <div className="absolute inset-0 pointer-events-none z-1 bg-black/10 0 w-full hidden md:flex"></div>
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="absolute pb-10 inset-0 flex flex-col items-center justify-end text-white/90 bg-black/40">
        <h1 className="text-5xl font-bold "></h1>
        <BlurText
          text='"You create the memories, we preserve them"'
          delay={50}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={() => {}}
          className="text-lg mt-2 italic text-white/90"
        />

        {/* Scroll Down Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Start faded and above
          animate={{ opacity: 1, y: 0 }} // Fade in and slide down
          transition={{ duration: 0.8, ease: "easeOut", delay: 2 }}
          className="z-100"
        >
          <button
            onClick={scrollToNextSection}
            className="mt-5 transition cursor-pointer z-100"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              className="flex flex-row items-center text-white/80 hover:text-white text-sm"
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-xs uppercase tracking-wide">
                Scroll Down
              </span>
              <ChevronsDown size={12} className="mt-0" />
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        key={index} // Restarts animation on new image
        className="absolute bottom-0 left-0 w-full h-1 bg-white/30"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
    </div>
  );
}
