"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
  text?: string;
  children?: ReactNode; // Allow React elements inside
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters" | "sentences";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Record<string, string | number>;
  easing?: ((t: number) => number) | string;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  children,
  delay = 300,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "easeInOut",
  onAnimationComplete,
}) => {
  const content = text || children; // Use `text` if available, else `children`

  const elements =
    typeof content === "string"
      ? animateBy === "sentences"
        ? content.split(/<br\s*\/?>/i).map(sentence => sentence.trim()) // Split by <br>
        : animateBy === "words"
        ? content.split(" ")
        : content.split("")
      : [content]; // If children, treat as one block

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Default animation settings
  const defaultFrom = {
    opacity: 0,
    filter: "blur(30px)",
    y: direction === "top" ? -10 : 10,
  };

  const defaultTo = {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
  };

  const variants = {
    hidden: animationFrom || defaultFrom,
    visible: (i: number) => ({
      ...(animationTo || defaultTo),
      transition: {
        delay: i * (delay / 1000),
        duration: 1.6,
        ease: easing as unknown,
      },
    }),
  };

  // Separate return condition for "sentences"
  if (animateBy === "sentences") {
    return (
      <p
        ref={ref}
        className={`blur-text ${className} flex flex-wrap items-center gap-6`}
      >
        {elements.map((sentence, i) => (
          <motion.span
            key={i}
            className="inline-flex transition-transform will-change-[transform,filter,opacity]"
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={i}
            onAnimationComplete={
              i === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {sentence}
            {i < elements.length - 1 && "\u00A0"} {/* Add non-breaking space */}
          </motion.span>
        ))}
      </p>
    );
  }

  // Default return for "words" & "letters" & children
  return (
    <span
      ref={ref}
      className={`blur-text ${className} inline-flex flex-wrap items-center`}
    >
      {elements.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block transition-transform will-change-[transform,filter,opacity]"
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={i}
          onAnimationComplete={
            i === elements.length - 1 ? onAnimationComplete : undefined
          }
        >
          {char === " " ? "\u00A0" : char}
          {animateBy === "words" && i < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
