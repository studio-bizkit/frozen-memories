"use client";
import { useScroll, useTransform, MotionValue } from "motion/react";
import { useState, useCallback, useEffect, useRef, useMemo, memo } from "react";
import { motion, useSpring } from "motion/react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  onClick: () => void;
  translateY: MotionValue<number>;
  className?: string;
}

// Lazy-loaded image component with Intersection Observer
const LazyImage = memo(({ src, alt, onClick, translateY, className }: LazyImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = imgRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before image comes into view
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      ref={imgRef}
      style={{ 
        y: translateY,
        willChange: "transform",
      }}
      className={cn("cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="relative h-80 w-full overflow-hidden rounded-lg">
        {isVisible && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover object-left-top transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            quality={75}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        )}
        {!isLoaded && isVisible && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>
    </motion.div>
  );
});

LazyImage.displayName = "LazyImage";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use container-based scroll instead of window scroll for better performance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Reduce parallax intensity for lighter effect (from 200px to 80px)
  // Use spring for smoother animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const translateFirst = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -80]),
    springConfig
  );
  const translateSecond = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 80]),
    springConfig
  );
  const translateThird = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -80]),
    springConfig
  );

  // Memoize image partitions to avoid recalculation
  const { firstPart, secondPart, thirdPart } = useMemo(() => {
    const third = Math.ceil(images.length / 3);
    return {
      firstPart: images.slice(0, third),
      secondPart: images.slice(third, 2 * third),
      thirdPart: images.slice(2 * third),
    };
  }, [images]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeLightbox]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <div
      ref={containerRef}
      className={cn("items-start w-full", className)}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 pb-40 px-10"
        style={{ 
          transform: "translateZ(0)", // GPU acceleration
          willChange: "transform",
        }}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <LazyImage
              key={"grid-1" + idx}
              src={el}
              alt={`Gallery image ${idx + 1}`}
              onClick={() => setSelectedImage(el)}
              translateY={translateFirst}
            />
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <LazyImage
              key={"grid-2" + idx}
              src={el}
              alt={`Gallery image ${idx + firstPart.length + 1}`}
              onClick={() => setSelectedImage(el)}
              translateY={translateSecond}
            />
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <LazyImage
              key={"grid-3" + idx}
              src={el}
              alt={`Gallery image ${idx + firstPart.length + secondPart.length + 1}`}
              onClick={() => setSelectedImage(el)}
              translateY={translateThird}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <motion.div
            className="relative w-full h-full max-w-7xl max-h-[90vh]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Full view"
              fill
              sizes="90vw"
              className="object-contain select-none cursor-zoom-out"
              quality={90}
              priority
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all z-10"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
