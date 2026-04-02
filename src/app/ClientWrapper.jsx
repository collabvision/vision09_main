"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from 'react-icons/fa';

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#a6a216] text-white"
      >
        <FaWhatsapp size={30} />
      </a>
    </>
  );
}

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
      <div className="mt-6 h-[1px] w-48 bg-white/10 relative overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1, ease: "linear" }}
          className="absolute inset-0 bg-[#FAF8F2]"
        />
      </div>
      <motion.p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#5a5a5a]">
        Growth
      </motion.p>
    </motion.div>
  );
}