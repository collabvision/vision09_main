"use client";

import { HyperText } from "../../components/ui/hyper-text";
import { motion } from "framer-motion";

const Branding = () => {
  return <HeroSection />;
};

export default Branding;

function HyperTextDemo() {
  return (
    <HyperText>
      From brand identity and visual language to digital and offline creatives,
      we deliver end-to-end branding solutions - including design, printing, and
      on-ground execution of banners, brochures, pamphlets, standees, and
      more—ensuring consistent brand visibility and impact across every
      touchpoint.
    </HyperText>
  );
}

//  function HeroSection() {
//   return (
//     <section className="w-full  bg-amber-400 pt-7 flex flex-col lg:flex-row items-center">

//       {/* LEFT IMAGE */}
//       <div className="w-[80%] lg:w-1/2 h-[300px] sm:h-[400px] lg:h-screen overflow-hidden">
//         <img
//           src="https://dummyimage.com/720x600"
//           alt="Hero"
//           className="w-full h-full object-cover md:rounded-4xl sm:rounded-4xl rounded-4xl lg:rounded-r-[120px]"
//         />
//       </div>

//       {/* RIGHT CONTENT */}
//       <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-10 flex flex-col justify-center">

//         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
//           Build Powerful Campaigns That Drive Real Growth
//         </h1>

//         <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-xl">
//           At Vision9, we combine strategic thinking, impactful design, and
//           performance-driven marketing to help brands grow faster and reach
//           the right audience.
//         </p>

//         <div className="flex flex-wrap gap-4">
//           <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
//             Get Started
//           </button>

//           <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
//             Learn More
//           </button>
//         </div>

//       </div>

//     </section>
//   );
// }
 function HeroSection() {
  return (
    <section className="w-full bg-amber-400 pt-7 flex flex-col lg:flex-row items-center overflow-hidden">

      {/* LEFT IMAGE */}
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="w-[80%] lg:w-1/2 h-[300px] sm:h-[400px] lg:h-screen overflow-hidden"
      >
        <img
          src="https://dummyimage.com/720x600"
          alt="Branding"
          className="w-full h-full object-cover rounded-4xl lg:rounded-r-[120px]"
        />
      </motion.div>

      {/* RIGHT CONTENT */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-10 flex flex-col justify-center"
      >

        {/* TITLE */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          Building Brands That Stand Out
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-gray-700 text-base sm:text-lg mb-8 max-w-xl"
        >
          From brand identity and visual language to digital and offline
          creatives, we deliver end-to-end branding solutions — including
          design, printing, and on-ground execution of banners, brochures,
          pamphlets, standees, and more, ensuring consistent brand visibility
          and impact across every touchpoint.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Explore Branding & Designing →
          </motion.button>
        </motion.div>

      </motion.div>

    </section>
  );
}