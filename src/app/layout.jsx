"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import localFont from 'next/font/local';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import FooterAlt from "../components/custom/FooterAlt";
// ── FONT CONFIGURATION ──
const causten = localFont({
  src: [
    {
      path: '../../public/fonts/Causten-Round/Causten-Bold.otf',
      style: 'normal',
    },
  ],
  variable: '--font-causten',
});

// ── LOADER COMPONENT ──
function Loader() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 1,
      ease: [0.45, 0, 0.55, 1],
    });

    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 80);
    }, 750);

    return () => {
      controls.stop();
      clearInterval(glitchInterval);
    };
  }, [count]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 1, ease: [0.1, 0, 0.2, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808] overflow-hidden"
    >
      {/* ... (Logo and Glitch layers stay the same) ... */}

      <div className="w-64 md:w-80 flex flex-col items-center">
        <div className="flex justify-between w-full mb-3">
          <span className="font-['Geist_Mono'] text-[9px] tracking-[0.4em] text-[#5a5a5a] uppercase">
            System_Loading
          </span>
          
          {/* FIX APPLIED HERE */}
          <div className="flex font-['Geist_Mono'] text-[77px] text-[#ffffff] font-bold">
            <motion.span>{rounded}</motion.span>
            <span>%</span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/10 relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: [0.45, 0, 0.55, 1] }}
            className="absolute inset-y-0 left-0 bg-[#ffffff] shadow-[0_0_10px_#c4f135]"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN LAYOUT ──
export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 3s + 200ms buffer for exit animation timing

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className={`${causten.variable} antialiased bg-[#080808]`}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loader key="v9-loader" />
          ) : (
            <motion.main
              key="v9-content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.main>
          )}
        </AnimatePresence>
         <a
        href="https://wa.me/918147637913"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        <FaWhatsapp size={28} />
        </a>
        <FooterAlt/>
      </body>
    </html>
  );
}