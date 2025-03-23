"use client";

import BlurText from "./BlurText";

export function AboutUs() {
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
        text="Step into the captivating world of Frozen Memories, where every love story is etched into eternity through the artistry of photography. Based in Coimbatore and led by Shumsudeen, our journey began with a serendipitous moment—one that sparked a passion for preserving raw emotions and genuine connections.<br>At Frozen Memories, we believe in more than just taking pictures; we believe in capturing real bonds, real emotions, and timeless moments. Every wedding holds a unique story, and we take immense joy in becoming a part of it—understanding your vision, embracing your emotions, and turning fleeting moments into treasured keepsakes.<br>AOur heart beats for intimate weddings, where love is at its purest. These close-knit celebrations allow us to uncover the hidden gems of connection and authenticity. With an artist’s eye and a storyteller’s soul, we transform ordinary moments into extraordinary memories—preserved in frames that radiate warmth, love, and joy for a lifetime."
        delay={1000}
        animateBy="sentences"
        direction="bottom"
        onAnimationComplete={() => {}}
        className="text-md font-normal max-w-2xl"
      />
    </div>
  );
}
