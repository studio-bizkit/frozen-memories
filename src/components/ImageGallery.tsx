"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BlurText from "./BlurText";

interface ImageType {
  src: string;
  alt: string;
  width: number;
  height: number;
  clientName?: string;
}

interface ImageGalleryProps {
  images: ImageType[];
  groupByClient?: boolean;
}

const ImageGallery = ({ images, groupByClient = false }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  // Group images by client if needed
  const groupedImages = groupByClient
    ? images.reduce((acc, image) => {
        const clientName = image.clientName || "Uncategorized";
        if (!acc[clientName]) {
          acc[clientName] = [];
        }
        acc[clientName].push(image);
        return acc;
      }, {} as Record<string, ImageType[]>)
    : { All: images };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full px-4 md:px-8 py-8">
      {Object.entries(groupedImages).map(([clientName, clientImages]) => (
        <div key={clientName} className="mb-12">
          {groupByClient && clientName !== "All" && (
            <BlurText
              // text="We capture your most precious moments with creativity and passion."
              delay={500}
              animateBy="words"
              direction="bottom"
              onAnimationComplete={() => {}}
              className="text-2xl mb-2 text-accent-dark flex flex-row justify-start items-start"
            >
              <h3 className="text-2xl font-medium mb-6 text-left">
                {clientName}
              </h3>
            </BlurText>
          )}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {clientImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                className="relative overflow-hidden cursor-pointer group h-64 sm:h-72 md:h-80"
                variants={item}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  style={{
                    objectFit: "cover",
                    filter: "brightness(0.9)",
                    transition: "all 0.5s ease",
                  }}
                  className="group-hover:brightness-100 group-hover:scale-105 transition-all duration-300"
                  priority={index < 4} // Prioritize loading for first 4 images
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-70 transition-opacity duration-500 flex items-center justify-center">
                  <div className="p-4 text-white">
                    <p className="font-medium">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
                quality={90}
                priority
              />
            </div>
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
              onClick={() => setSelectedImage(null)}
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

export default ImageGallery;
