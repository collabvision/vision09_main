"use client"; // Add this at the top to handle state

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from 'react-icons/fa';
const causten = localFont({
  src: [
    {
      path: '../../public/fonts/Causten-Round/Causten-Bold.otf',
      style: 'normal',
    },
  ],
  variable: '--font-causten',
});

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 3 Seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className={`${causten.variable} antialiased bg-[#080808]`}>
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" />
          ) : (
            <motion.main
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
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
          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#A8832A] text-white"
        >
          <FaWhatsapp size={30} />
          {/* <span className="absolute inset-0 rounded-full bg-[#FAF8F2] opacity-20 animate-ping -z-10" /> */}
        </a>
      </body>
    </html>
  );
}

// ── LOADER COMPONENT ──
function Loader() {
  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#080808]"
    >
      <div className="relative overflow-hidden">
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="font-['Bebas_Neue'] text-6xl tracking-widest text-[#f8f8f4]"
        >
          VISION<span className="text-[#FAF8F2]">9</span>
        </motion.h1>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 h-[1px] w-48 bg-white/10 relative overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1, ease: "linear" }}
          className="absolute inset-0 bg-[#FAF8F2]"
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#5a5a5a]"
      >
        Engineering Growth
      </motion.p>
    </motion.div>
  );
}