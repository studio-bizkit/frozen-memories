"use client";

import BlurText from "./BlurText";

export default function AnimatedSection() {
  return (
    <>
      <div className="flex flex-row gap-2 justify-end items-end p-0 mb-3">
        <BlurText
          text="Freeze the"
          delay={50}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={() => {}}
          className="text-4xl font-bold font-satoshi -mb-1 tracking-tight space-x-0"
        />
        <BlurText
          text="memories"
          delay={60}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={() => {}}
          className="text-4xl font-playfair-display font-bold text-accent italic -mb-0.5 tracking-tight"
        />
      </div>
      <BlurText
        text="We capture your most precious moments with creativity and passion."
        delay={100}
        animateBy="words"
        direction="bottom"
        onAnimationComplete={() => {}}
        className="text-2xl mb-2"
      />
    </>
  );
}
