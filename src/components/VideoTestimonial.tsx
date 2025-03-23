"use client";

import BlurText from "./BlurText";
import { WordRotate } from "./magicui/word-rotate";
import TestimonialCarousel from "./TestimonialCarousel";

const ImpactTestimonials = () => {
  return (
    <div className="relative flex w-full h-[500px] items-center justify-between">
      {/* Left Side - Background Video with Gradient & Overlay Text */}
      <div className="relative w-1/2 h-full">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay (Left to Black) */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black"></div>
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-32 text-white overflow-visible">
          <div className="text-left space-y-4 flex flex-col overflow-visible">
            <BlurText
              delay={50}
              animateBy="words"
              direction="bottom"
              onAnimationComplete={() => {}}
              className="text-4xl font-semibold text-white leading-8 tracking-normal inlin flex flex-row overflow-visible"
            >
              Every
              <WordRotate
                className="text-white text-6xl font-niconne font-normal -mt-3 overflow-visible"
                words={["moment", "story", "emotion", "frame"]}
              />{" "}
              is timeless.
            </BlurText>

            <BlurText
              delay={150}
              animateBy="words"
              direction="bottom"
              onAnimationComplete={() => {}}
              className="text-lg text-white/80 max-w-xs font-roboto"
            >
              The laughter, the tears, the love—we don’t just take photos, we
              preserve emotions.
            </BlurText>
          </div>
        </div>
      </div>

      {/* Right Side - Testimonials in a Black Background */}
      <div className="w-1/2 h-full bg-black flex items-center justify-center p-10">
        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default ImpactTestimonials;
