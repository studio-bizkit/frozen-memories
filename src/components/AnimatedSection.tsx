"use client";

import { ChevronsRight } from "lucide-react";
import BlurText from "./BlurText";
import Button from "./StyledButton";

export default function AnimatedSection() {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-center z-21 gap-2 md:gap-0">
      <div className="flex flex-col justify-start items-start">
        <div className="flex md:flex-row flex-col md:gap-2 justify-end md:items-end items-start p-0 mb-3">
          <BlurText
            text="Freeze the"
            delay={50}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={() => {}}
            className="text-4xl font-bold font-satoshi -mb-1 tracking-tight space-x-0 text-accent-dark"
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
          className="text-2xl mb-2 text-accent-dark"
        />
      </div>
      <div className="flex w-full items-end justify-start md:justify-end">
        <BlurText
          // text="We capture your most precious moments with creativity and passion."
          delay={500}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={() => {}}
          className="text-2xl mb-2 text-accent-dark"
        >
          <Button>
            <span className="text-[18px]">View more</span> <ChevronsRight size={22}/>
          </Button>
        </BlurText>
      </div>
    </div>
  );
}
