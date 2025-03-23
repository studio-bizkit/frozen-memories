"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    text: "Frozen Memories beautifully captured the essence of our wedding day. Every picture tells a story—we couldn’t have asked for more!",
    author: "Arjun & Meera",
    manImg: "/testimonials/text/man1.jpg",
    womanImg: "/testimonials/text/woman1.jpg",
  },
  {
    text: "From pre-wedding shoots to the big day, the team was incredible! Their creativity and eye for detail made every photo breathtaking.",
    author: "Ravi & Ananya",
    manImg: "/testimonials/text/man1.jpg",
    womanImg: "/testimonials/text/woman1.jpg",
  },
  {
    text: "Their portrait session was amazing. The lighting, the angles, everything was just perfect. Highly recommended!",
    author: "Karthik & Priya",
    manImg: "/testimonials/text/man1.jpg",
    womanImg: "/testimonials/text/woman1.jpg",
  },
  {
    text: "Frozen Memories didn’t just take photos—they preserved emotions. Every candid moment was captured so beautifully!",
    author: "Vikram & Sneha",
    manImg: "/testimonials/text/man1.jpg",
    womanImg: "/testimonials/text/woman1.jpg",
  },
];

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonial(
        prevTestimonial => (prevTestimonial + 1) % testimonials.length
      );
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const { text, author, manImg, womanImg } = testimonials[currentTestimonial];

  const variants = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  const dotVariants = {
    active: { scale: 1.2, backgroundColor: "#D1D5DB" },
    inactive: { scale: 1, backgroundColor: "#3f3f46" },
  };

  return (
    <section className="py-12 md:py-24 px-12 relative">
      <div className="relative w-full max-w-xl overflow-hidden">
        {/* Gradient Overlay for Fading Effect */}
        {/* <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-white/50 via-transparent to-white/50 w-2xl"></div> */}

        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentTestimonial}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className="flex w-full flex-col items-start justify-center "
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.6,
            }}
          >
            <Image
              width={10}
              height={10}
              src={manImg}
              alt={author}
              className="relative left-0 top-0 h-10 w-10 z-5 rounded-full border-2 bg-white border-white object-cover"
            />
            <Image
              width={10}
              height={10}
              src={womanImg}
              alt={author}
              className="absolute left-5 top-0 h-10 w-10 z-4 rounded-full border-2 bg-white border-white object-cover"
            />{" "}
            <p className="m-0 text-left pt-4 text-2xl font-medium tracking-tight text-white">
              &quot;{text}&quot;
            </p>
            <div className="mx-auto mt-5 flex items-start w-full">
              <div className="flex flex-col items-start  w-full justify-center space-x-3">
                <div className="font-regular text-sm  text-white/80">
                  {author}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots for Navigation */}
        <div className="mt-8 pb-2 flex justify-start items-start">
          {testimonials.map((_, index) => (
            <motion.div
              key={index}
              className="mx-1 h-2 w-2 cursor-pointer rounded-full"
              variants={dotVariants}
              animate={index === currentTestimonial ? "active" : "inactive"}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
