"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Noise from "./Noise";
import BlurText from "./BlurText";
import { ChevronsDown } from "lucide-react"; // Import an arrow icon
import { useLenis } from "lenis/react";
import MuxBackground from "./MuxBackground";

const images = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const lenis = useLenis();

  const hasMux = Boolean(process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID);

  useEffect(() => {
    if (hasMux) return; // Disable slideshow timer if Mux is available
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [hasMux]);

  const scrollToNextSection = () => {
    lenis?.scrollTo(window.innerHeight - 100);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Layer: Mux when configured, otherwise image slideshow */}
      {hasMux ? (
        <MuxBackground className="absolute inset-0 z-0" />
      ) : (
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            className="absolute inset-0 w-full h-full object-cover z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      )}

      <Noise
        patternSize={100}
        patternScaleX={2}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={10}
      />
      <div className="absolute inset-0 pointer-events-none z-1 bg-black/20 md:hidden"></div>
      <div className="absolute inset-0 pointer-events-none z-1 bg-black/10 0 w-full hidden md:flex"></div>

      {/* Overlay Content */}
      <div className="absolute pb-10 pl-10 md:pb-20 md:pl-20 inset-0 flex flex-col items-start justify-end text-white/90 bg-black/50 z-90 ">
        <div className="flex flex-col gap-2 justify-start items-start">
          <div className="flex flex-row gap-2 justify-end items-end p-0">
            <BlurText
              text="You create the"
              delay={50}
              animateBy="words"
              direction="bottom"
              onAnimationComplete={() => {}}
              className="text-xl md:text-4xl font-normal font-satoshi -mb-1 space-x-0 text-second-background"
            />
            <BlurText
              text="memories,"
              delay={60}
              animateBy="words"
              direction="bottom"
              onAnimationComplete={() => {}}
              className="text-xl md:text-4xl font-playfair-display font-bold italic -mb-0.5 text-second-background"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end items-end p-0 mb-5">
          <BlurText
            text="we"
            delay={50}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={() => {}}
            className="text-xl md:text-4xl font-normal font-satoshi -mb-1  space-x-0 text-second-background"
          />
          <BlurText
            text="preserve "
            delay={60}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={() => {}}
            className="text-xl md:text-4xl font-playfair-display font-bold italic -mb-0.5 text-second-background"
          />
          <BlurText
            text="them."
            delay={50}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={() => {}}
            className="text-xl md:text-4xl font-normal font-satoshi -mb-1  space-x-0 text-second-background"
          />
        </div>
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
              className="flex flex-row items-center  text-sm"
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-xs uppercase tracking-wide text-second-background/80 hover:text-second-background">
                Scroll Down
              </span>
              <ChevronsDown size={12} className="mt-0" />
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Progress Bar */}
      {!hasMux && (
        <motion.div
          key={index} // Restarts animation on new image
          className="absolute bottom-0 left-0 w-full h-1 bg-white/30"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
