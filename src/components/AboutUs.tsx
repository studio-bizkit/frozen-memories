"use client";

import BlurText from "./BlurText";
// import { TypingAnimation } from "./magicui/typing-animation";

export default function AboutUs() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 max-w-4xl">
      <BlurText
        text="ABOUT US"
        delay={100}
        animateBy="words"
        direction="bottom"
        onAnimationComplete={() => {}}
        className="text-4xl font-medium mb-1"
      />
      <BlurText
        text="Step into the enchanting world of Wedding Bells, where love stories are woven into timeless tapestries through the art of photography. Our journey began with an extraordinary moment at Thrissur Pooram, where destiny brought together two kindred spirits – Aswin and Sreenath N Unnikrishnan. In That magical encounter, a spark was ignited, and Wedding Bells was born.<br>At Wedding Bells, our belief in the essence of genuine connections and authentic emotions is at the very heart of our craft. Our mantra is elegantly simple, yet it carries profound significance:   Real ties, real feelings, andmagical pictures''. We take immense joy in forging personal bonds with our cherished clients, immersing ourselves in their unique love stories and dreams for their special day.<br>At Wedding Bells, our belief in the essence of genuine connections and authentic emotions is at the very heart of our craft. Our mantra is elegantly simple, yet it carries profound significance: Real ties, real feelings, andmagical pictures''. We take immense joy in forging personal bonds with our cherished clients, immersing ourselves in their unique love stories and dreams for their special day.<br>Within the realm of intimate weddings, we discover an intimate oasis that stirs our souls. These close-knit celebrations cradle the true essence of love, and we set out to unveil the precious gems of genuine connections tucked within. With an artist's touch and a playful spirit, we elevate the ordinary into extraordinary keepsakes, brimming with authenticity and joy that will be treasured and adored throughout a lifetime."
        delay={1000}
        animateBy="sentences"
        direction="bottom"
        onAnimationComplete={() => {}}
        className="text-md font-normal"
      />
    </div>
  );
}
