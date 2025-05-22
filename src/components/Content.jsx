import { Heart, HeartIcon } from "lucide-react";
import React from "react";

export default function Content() {
  return (
    <div className="bg-accent-dark py-8 px-12 h-full w-full flex flex-col justify-between font-roboto">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="flex justify-between items-end text-second-background ">
      <h1 className="text-[9vw] leading-[0.8] tracking-tighter mt-5 font-playfair-display">
        Frozen<br></br>Memories.
      </h1>
      <p className="px-12 md:px-10 md:py-12 text-second-background">©copyright</p>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex flex-col shrink-0 gap-6">
      <div className="flex flex-col gap-2 text-second-background">
        {/* <h3 className="mb-2 uppercase text-[#ffffff8a]">About</h3> */}
        <p>Home</p>
        <p>Photographs</p>
        <p>Films</p>
        <p>About Us</p>
        <p>Contact Us</p>
      </div>
      <div className="flex flex-row gap-2 text-second-background font-roboto">
        Baked with <Heart strokeWidth={1} color="red" fill="red" size="18px" className="mt-0.5" /> by Studio Bizkit
      </div>
    </div>
  );
};
