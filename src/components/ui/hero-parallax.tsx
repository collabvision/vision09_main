"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import BlurText from "../BlurText";

import { NoiseBackground } from "@/components/ui/noise-background";


export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 100]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[150vh] mt-[52vh] px-5 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};



export const Header = () => {
  const handleAnimationComplete = () => {
  console.log("Animation completed!");
};
  return (
    // <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
    //   <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
    //     The Ultimate <br /> development studio
    //   </h1>
    //   <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
    //     We build beautiful products with the latest technologies and frameworks.
    //     We are a team of passionate developers and designers that love to build
    //     amazing products.
    //   </p>
    // </div>

     <div className="w-[90%] md:w-[70%] relative mx-auto py-20 sm:py-10 md:py-20 px-4  left-0 top-0">
          {/* <BlurText text ="Everyone Is Making Content. We Make It Viral." delay={200} animateBy="words" direction="top" onAnimationComplete={handleAnimationComplete} className=" font-bold text-6xl sm:text-7xl md:text-7xl lg:text-7xl xl:text-7xl text-center lg:text-left " /> */}
    
            {/* <BlurText
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
      /> */}
      <div className="flex mt-7 justify-start items-center gap-2">
           {/* <NoiseBackgroundDemo /> */}
                {/* <NoiseBackgroundDemo/> */}
      </div>
   


    </div>
    
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      // whileHover={{
      //   y: -20,
      // }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};

export function NoiseBackgroundDemo() {
  return (
    <div className="flex justify-center">
      <NoiseBackground
        containerClassName="w-fit p-2 rounded-full mx-auto"
        gradientColors={[
          "rgb(255, 100, 150)",
          "rgb(100, 150, 255)",
          "rgb(255, 200, 100)",
        ]}>
        <button
          className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]">
          Book a Strategy Call &rarr;
        </button>

        
      </NoiseBackground>
    </div>
  );
}

