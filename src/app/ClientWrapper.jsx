"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true); // 👈 trigger loader on route change

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" path={pathname} />
        ) : (
          <motion.main
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.main>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918147637913"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#a6a216] text-white shadow-lg hover:scale-110 transition"
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  );
}

/* ───────────────────────────────────────────── */
/* LOADER COMPONENT */
/* ───────────────────────────────────────────── */

function Loader({ path }) {
  const formatPath = (p) => {
    if (p === "/") return "HOME";
    return p.replace("/", "").replace(/-/g, " ").toUpperCase();
  };

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#080808]"
    >
      {/* Logo */}
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

      {/* 🔥 Dynamic Page Name */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-2 text-[10px] uppercase tracking-[0.4em] text-[#a6a216]"
      >
        {formatPath(path)}
      </motion.p>

      {/* Loading Bar */}
      <div className="mt-6 h-[1px] w-48 bg-white/10 relative overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1, ease: "linear" }}
          className="absolute inset-0 bg-[#FAF8F2]"
        />
      </div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#5a5a5a]"
      >
        Growth
      </motion.p>
    </motion.div>
  );
}