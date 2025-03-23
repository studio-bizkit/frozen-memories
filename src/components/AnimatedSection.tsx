"use client";

import BlurText from "./BlurText";

export default function AnimatedSection() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <>
      <BlurText
        text="We are Frozen Memories"
        delay={50}
        animateBy="words"
        direction="bottom"
        onAnimationComplete={handleAnimationComplete}
        className="text-2xl font-bold mb-1 font-roboto"
      />
      <BlurText
        text="We capture your most precious moments with creativity and passion."
        delay={100}
        animateBy="words"
        direction="bottom"
        onAnimationComplete={handleAnimationComplete}
        className="text-xl mb-2 font-roboto"
      />
    </>
  );
}
