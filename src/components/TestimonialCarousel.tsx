"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    text: "First testimonial goes here. Praising your product or service and expressing satisfaction.",
    author: "Ansub",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg",
  },
  {
    text: "Another testimonial goes here. Praising your product or service and expressing satisfaction.",
    author: "Lex Collins",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg",
  },
  {
    text: "Third testimonial goes here. Praising your product or service and expressing satisfaction.",
    author: "Alex Jones",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg",
  },
  {
    text: "Fourth testimonial goes here. Praising your product or service and expressing satisfaction.",
    author: "John Doe",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg",
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

  const { text, author, image } = testimonials[currentTestimonial];

  const variants = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  const dotVariants = {
    active: { scale: 1.2, backgroundColor: "#3f3f46" },
    inactive: { scale: 1, backgroundColor: "#D1D5DB" },
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
            <img src={image} alt={author} className="m-0 h-24 w-24" />
            <p className="m-0 text-left text-2xl font-medium tracking-tight text-white">
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
