"use client";
import BlurText from "../../components/BlurText";
import CardSwap, { Card } from "../../components/CardSwap";
import { HeroParallax } from "../../components/ui/hero-parallax";
// const handleAnimationComplete = () => {
//   console.log("Animation completed!");
// };

const Hero = () => {
  return (
    <div
      className="
    w-full  
    "
    >
      {" "}
      {/* LEFT SIDE - TEXT */}
      {/* <div className="w-full  flex-1 min-w-75 max-w-165.5 lg:w-1/2">
        <BlurText
          text="Everyone Is Making Content. We Make It Viral."
          delay={200}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="
        font-bold
        text-6xl
        sm:text-7xl
        md:text-7xl
        lg:text-7xl
        xl:text-7xl
        text-center lg:text-left
      "
        />

        <BlurText
          text="At Vision9, we drive measurable sales and leads through performance marketing, strategic branding, and high-impact UGC content."
          delay={300}
          animateBy="words"
          direction="top"
          className="
    mt-10
    font-medium
    text-gray-700
    text-2xl
   
    text-center
    lg:text-left
    max-w-2xl
  "
        />
      </div> */}
      {/* RIGHT SIDE - CARD / IMAGE */}
      {/* <div className="w-full  flex-1  min-w-75  max-w-165.5 lg:w-1/2">
        <BlurText
          text="Everyone Is Making Content. We Make It Viral."
          delay={200}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="
        font-bold
        text-6xl
        sm:text-7xl
        md:text-7xl
        lg:text-7xl
        xl:text-7xl
        text-center lg:text-left
      "
        />
      </div> */}

         <HeroParallax products={products} />;

    </div>
  );
};

export default Hero;



export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/rogue.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

