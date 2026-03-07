"use client";

/* ═══════════════════════════════════════════════════
   THEME — change here to retheme this entire file
═══════════════════════════════════════════════════ */
const T = {
  accent: "#A8832A",
  accentLight: "#D4B86A",
  accentMid: "#C4A24E",
  accentDark: "#6B5010",
  bg: "#FAF8F2",
  bgAlt: "#F2EDE0",
  text: "#1C1A14",
  textSec: "#56503E",
  muted: "#9A8E72",
  border: "rgba(168,131,42,0.20)",
  navBg: "rgba(250,248,242,0.93)",
  waGreen: "#25D366",
  btnSolidBg: "#A8832A",
  btnSolidTxt: "#FAF8F2",
};

import { useEffect, useRef } from "react";
import { HeroParallax } from "../../components/ui/hero-parallax";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

const CSS = `
${FONTS}
.v9-hero-wrap{font-family:'DM Sans',sans-serif;position:relative;overflow:hidden;background:${T.bg}}
/* Override HeroParallax default dark bg */
.v9-hero-wrap [class*="dark"]{background-color:${T.bg} !important}
.v9-hero-wrap .bg-black{background:${T.bg} !important}
.v9-hero-wrap .dark\\:bg-black{background:${T.bg} !important}
/* Header overlay that sits above the parallax */
.v9-hero-overlay{
  position:absolute;top:0;left:0;right:0;
  padding:clamp(7rem,14vh,10rem) clamp(1.5rem,6vw,5rem) 0;
  pointer-events:none;
}
.v9-hero-kicker{
  font-family:'Tenor Sans',sans-serif;font-size:.78rem;letter-spacing:.28em;
  text-transform:uppercase;color:${T.accent};margin-bottom:1.4rem;
  display:flex;align-items:center;gap:.8rem;
  opacity:0;animation:v9FadeUp .7s .2s forwards;
  line-height:2;
}
.v9-hero-kicker span{width:20px;height:1px;background:${T.accent};display:inline-block}
.v9-hero-title{
  font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(3.2rem,8vw,8.5rem);line-height:.88;
  letter-spacing:-.02em;color:${T.text};overflow:hidden;
}
.v9-hero-title .ln{
  display:block;clip-path:inset(0 0 100% 0);
  animation:v9ClipUp .95s cubic-bezier(.16,1,.3,1) forwards;
}
.v9-hero-title .ln1{animation-delay:.35s}
.v9-hero-title .ln2{animation-delay:.52s;color:${T.accent};font-style:italic}
.v9-hero-title .ln3{animation-delay:.68s}
.v9-hero-sub{
  max-width:540px;margin-top:2rem;
  font-size:clamp(.88rem,1.4vw,1.05rem);line-height:1.85;
  color:${T.textSec};opacity:0;animation:v9FadeUp .8s 1s forwards;
}
.v9-hero-btns{
  margin-top:2.2rem;display:flex;gap:1rem;flex-wrap:wrap;
  opacity:0;animation:v9FadeUp .8s 1.2s forwards;
  pointer-events:all;
}
.v9-btn-solid{
  background:${T.btnSolidBg};color:${T.btnSolidTxt};
  font-family:'Playfair Display',serif;font-size:.85rem;font-weight:700;
  letter-spacing:.16em;padding:.9rem 2.4rem;border:none;cursor:pointer;
  text-transform:uppercase;text-decoration:none;display:inline-flex;
  align-items:center;gap:.6rem;position:relative;overflow:hidden;
  transition:background .3s,transform .3s;
}
.v9-btn-solid::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
  transform:translateX(-100%);transition:transform .4s;
}
.v9-btn-solid:hover::after{transform:translateX(100%)}
.v9-btn-solid:hover{background:${T.accentMid};transform:translateY(-2px)}
.v9-btn-wa{
  background:transparent;color:${T.text};
  font-family:'Playfair Display',serif;font-size:.85rem;font-weight:600;
  letter-spacing:.16em;padding:.9rem 2.4rem;
  border:1px solid rgba(168,131,42,.38);cursor:pointer;
  text-transform:uppercase;text-decoration:none;display:inline-flex;
  align-items:center;gap:.6rem;transition:border-color .3s,color .3s,transform .3s;
}
.v9-btn-wa:hover{border-color:${T.waGreen};color:${T.waGreen};transform:translateY(-2px)}
.v9-wa-dot{width:8px;height:8px;background:${T.waGreen};border-radius:50%;flex-shrink:0}
/* tint the parallax thumbnails slightly for our light bg */
.v9-hero-wrap [class*="group"] img{filter:brightness(.92) saturate(.9)}
@keyframes v9FadeUp{to{opacity:1;transform:translateY(0)}}
@keyframes v9ClipUp{to{clip-path:inset(0 0 0% 0)}}
`;

export const products = [
  {
    title: "Moonbeam",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Editorially",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind MK",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Inv",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

const Hero = () => {
  return (
    <div className="v9-hero-wrap" style={{ position: "relative" }}>
      <style>{CSS}</style>

      {/* ── TEXT OVERLAY ── */}
      <div className="v9-hero-overlay">
        <p className="v9-hero-kicker">
          Vision9
          <br /> Performance Marketing Agency
        </p>
        <h1 className="v9-hero-title">
          <span className="ln ln1">EVERYONE IS</span>
          <span className="ln ln2">MAKING CONTENT.</span>
          <span className="ln ln3">WE MAKE IT VIRAL.</span>
        </h1>
        <p className="v9-hero-sub">
          At Vision9, we drive measurable sales and leads through performance
          marketing, strategic branding, and high-impact UGC content.
        </p>
        <div className="v9-hero-btns">
          <a href="#contact" className="v9-btn-solid">
            Book a Strategy Call
          </a>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="v9-btn-wa"
          >
            <span className="v9-wa-dot" />
            Connect on WhatsApp
          </a>
        </div>
      </div>

      {/* ── PARALLAX GALLERY (Aceternity) ── */}
      <HeroParallax products={products} />
    </div>
  );
};

export default Hero;
