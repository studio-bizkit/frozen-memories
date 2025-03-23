"use client"

import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Picture1 from "/public/images/slide1.jpg";
import Picture2 from "/public/images/slide2.jpg";
import Picture3 from "/public/images/slide3.jpg";
import Picture4 from "/public/images/slide1.jpg";
import Picture5 from "/public/images/slide2.jpg";
import Picture6 from "/public/images/slide3.jpg";
import Picture7 from "/public/images/slide1.jpg";

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scales = [
    useTransform(scrollYProgress, [0, 1], [1, 4]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 8]),
    useTransform(scrollYProgress, [0, 1], [1, 9]),
  ];

  const pictures = [Picture1, Picture2, Picture3, Picture4, Picture5, Picture6, Picture7];

  const positions = [
    "top-0 left-0",
    "top-[-30vh] left-[5vw] w-[35vw] h-[30vh]",
    "top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]",
    "left-[27.5vw] w-[25vw] h-[25vh]",
    "top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]",
    "top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]",
    "top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]",
  ];

  return (
    <div ref={container} className="relative h-[300vh] text-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {pictures.map((src, index) => (
          <motion.div key={index} style={{ scale: scales[index] }} className="absolute flex h-full w-full items-center justify-center">
            {index === 0 ? "hello" : ""}
            <div className={`relative ${positions[index]}`}>
              <Image src={src} fill alt="image" placeholder="blur" className="object-cover" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
