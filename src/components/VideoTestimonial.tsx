"use client";

import BlurText from "./BlurText";
import { WordRotate } from "./magicui/word-rotate";
import TestimonialCarousel from "./TestimonialCarousel";

const ImpactTestimonials = () => {
  return (
    <div className="md:relative flex flex-col md:flex-row w-full md:h-[500px] h-[800px] items-center justify-between">
      <div className="relative w-full md:w-1/3 h-full">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay (Left to Black) */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent to-accent-dark"></div> */}
        <div className="absolute inset-0 bg-accent-dark/70"></div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-32 text-white overflow-visible">
          <div className="text-left space-y-4 flex flex-col overflow-visible">
            <BlurText
              delay={50}
              animateBy="words"
              direction="bottom"
              onAnimationComplete={() => {}}
              className="text-6xl font-semibold text-white leading-12 tracking-normal inlin flex flex-row overflow-visible"
            >
              Every
              <WordRotate
                className="text-white text-7xl font-playfair-display italic font-normal -mt-1 overflow-visible"
                words={["moment", "story", "emotion", "frame"]}
              />{" "}
              is timeless.
            </BlurText>

            {/* <BlurText
              delay={150}
              animateBy="words"
              direction="bottom"
              onAnimationComplete={() => { }}
              className="text-lg text-white/80 max-w-xs font-roboto"
            >
              The laughter, the tears, the love—we don&apos;t just take photos, we
              preserve emotions.
            </BlurText> */}
          </div>
        </div>
      </div>

      {/* Right Side - Testimonials in a Black Background */}
      <div className="w-full md:w-2/3 h-full bg-accent flex items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent-dark backdrop-blur-lg"></div>
        {/* -        <video
          autoPlay
          loop
          muted
          className="md:block hidden absolute inset-0 h-full w-full object-cover opacity-10 blur-xl"
        /> */}

        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default ImpactTestimonials;
