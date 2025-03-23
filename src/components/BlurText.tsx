"use client";

import { useRef, useEffect, useState } from "react";
import { useSprings, animated, SpringValue } from "@react-spring/web";

const AnimatedSpan = animated.span as React.FC<
  React.HTMLAttributes<HTMLSpanElement>
>;

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Record<string, string | number>[];
  easing?: ((t: number) => number) | string;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "easeOutCubic",
  onAnimationComplete,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  // Default animations based on direction
  const defaultFrom: Record<string, string | number> = {
    filter: "blur(10px)",
    opacity: 0,
    transform: direction === "top" ? "translate3d(0,-50px,0)" : "translate3d(0,50px,0)",
  };

  const defaultTo: Record<string, string | number>[] = [
    {
      filter: "blur(5px)",
      opacity: 0.5,
      transform: direction === "top" ? "translate3d(0,5px,0)" : "translate3d(0,-5px,0)",
    },
    {
      filter: "blur(0px)",
      opacity: 1,
      transform: "translate3d(0,0,0)",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom 
        ? (Object.fromEntries(
            Object.entries(animationFrom).map(([key, value]) => [key, value as unknown as SpringValue<string | number>])
          ) as Record<string, SpringValue<string | number>>)
        : defaultFrom as unknown as Record<string, SpringValue<string | number>>,
      to: inView
        ? async (next: (arg0: Record<string, SpringValue<string | number>>) => unknown) => {
            for (const step of animationTo || defaultTo) {
              await next(
                Object.fromEntries(
                  Object.entries(step).map(([key, value]) => [key, value as unknown as SpringValue<string | number>])
                ) as Record<string, SpringValue<string | number>>
              );
            }
            animatedCount.current += 1;
            if (animatedCount.current === elements.length && onAnimationComplete) {
              onAnimationComplete();
            }
          }
        : (defaultFrom as unknown as Record<string, SpringValue<string | number>>),
      delay: i * delay,
      config: typeof easing === "function" ? { easing } : {}, // Ensure config.easing is correctly passed
    }))
  );
  
  
  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {springs.map((props, index) => (
        <AnimatedSpan
          key={index}
          style={props as React.CSSProperties}
          className="inline-block transition-transform will-change-[transform,filter,opacity]"
        >
          {elements[index] === " " ? "\u00A0" : elements[index]}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </AnimatedSpan>
      ))}
    </p>
  );
};

export default BlurText;
