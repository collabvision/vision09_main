"use client";

/**
 * Vision9 — Home Page
 * ─────────────────────────────────────────────────────────────────────────
 * All section components are themed to the Vision9 light gold/cream palette.
 * The THEME token lives in each component file — change it once there to
 * retheme the full page.
 *
 * SECTION ORDER:
 *  1. Header (existing)
 *  2. Hero           — HeroParallax (Aceternity) + overlay headline
 *  3. CurvedLoop     — "We Make It Viral ✦" marquee (existing, re-styled)
 *  4. KeyMatrix      — 8-counter impact grid (custom themed + MagicBento hook)
 *  5. ScrollVelocity — Industry trust strip (existing, re-styled)
 *  6. HomeAbout      — SplitText heading + 8-feature Aceternity grid
 *  7. CoreServices   — 3-card services section (NEW)
 *  8. Branding       — Motion entrance + HyperText (existing, re-styled)
 *  9. WhyVision      — Reasons list + AnimatedBeam diagram (existing, re-styled)
 * 10. OurProcess     — 4-step dark process section (NEW)
 * 11. CaseStudies    — Results preview + mock cards (NEW)
 * 12. ClientsTeaser  — Client logos teaser (NEW)
 * 13. FinalCTA       — Ghost text CTA section (NEW)
 * ─────────────────────────────────────────────────────────────────────────
 */

import Hero from "./(Home)/Hero";
import Header from "../components/custom/Header";
import CurvedLoop from "../components/CurvedLoop";
import KeyMatrix from "./(Home)/KeyMatrix";
import ScrollVelocity from "../components/ScrollVelocity";
import HomeAbout from "./(Home)/HomeAbout";
import CoreServices from "./(Home)/CoreServices";
import Branding from "./(Home)/Branding";
import WhyVision from "./(Home)/WhyVision";
import OurProcess from "./(Home)/Ourprocess";
import CaseStudies from "./(Home)/CaseStudies";
import ClientsTeaser from "./(Home)/ClientsTeaser";
import FinalCTA from "./(Home)/FinalCTA";
import Footer from "../components/custom/Footer";
import Companies from "./(Home)/Companies";

/* ─── Shared inline overrides for third-party wrappers ─── */
const GLOBAL_OVERRIDES = `
 @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');

/* ───────── THEME VARIABLES ───────── */
:root {
  --accent: #a6a216;
  --accent-light: #ebe60c;
  --accent-mid: #d2ce12;
  --accent-dark: #737017;

  --bg: #f5f2c8;
  --bg-alt: #f5f2c8;

  --text: #231f1f;
  --text-sec: #58564d;
  --muted: #a19f8a;

  --border: rgba(115,112,23,0.25);
  --border-light: rgba(115,112,23,0.18);

  --nav-bg: rgba(255,252,214,0.93);
}

/* ───────── CurvedLoop ───────── */
[class*="CurvedLoop"] text,
[class*="curved-loop"] text,
.curved-loop text {
  fill: var(--accent) !important;
  font-family: 'Playfair Display', serif !important;
  font-weight: 700 !important;
  letter-spacing: .08em !important;
}

[class*="CurvedLoop"] svg,
[class*="curved-loop"] svg {
  opacity: .9;
}

/* ───────── ScrollVelocity ───────── */
[class*="ScrollVelocity"] span,
[class*="scroll-velocity"] span,
.scroll-velocity span,
.custom-scroll-text {
  font-family: 'Tenor Sans', sans-serif !important;
  font-size: clamp(1.62rem, 1.1vw, .82rem) !important;
  letter-spacing: .28em !important;
  text-transform: uppercase !important;
  color: var(--accent) !important;
}

[class*="ScrollVelocity"],
[class*="scroll-velocity"] {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: var(--bg-alt) !important;
  padding: .9rem 0 !important;
}

/* ───────── Header ───────── */
header,
[class*="Header"],
[class*="header"] {
  // background: var(--nav-bg) !important;
  // backdrop-filter: blur(16px) !important;
  border-bottom: 1px solid var(--border-light) !important;
}

/* ───────── Page Background ───────── */
body {
  background: var(--bg) !important;
  color: var(--text);
}
`;

export default function Home() {
  return (
    <>
      <style>{GLOBAL_OVERRIDES}</style>

      {/* ── 1. NAV ── */}
      <Header />

      {/* ── FULL-WIDTH WRAPPER ── */}
      <div
        style={{ width: "100%", position: "relative", background: "var(--bg)" }}
      >
        {/* ── 2. HERO ── */}
        <Hero />

        {/* ── 3. CURVED MARQUEE ── */}
        <div
          style={{
            background: "transparent ",
            paddingBottom: "1.5rem",
            marginTop: "3rem",
            overflow: "hidden",
          }}
        >
          <CurvedLoop
            marqueeText="We Just Make It Viral ✦"
            speed={0.9}
            curveAmount={250}
            direction="left"
            interactive
            className="custom-text-style bg-[]"
          />
        </div>

        {/* ── 4. KEY METRICS ── */}
        <KeyMatrix />

        {/* ── 5. INDUSTRY STRIP ── */}
        <ScrollVelocity
          texts={[
            "Healthcare • Education • Real Estate • FMCG • Hospitality",
            "Service Brands • Astrology • Spiritual • Fashion • Recruitment • ETC",
          ]}
          velocity={80}
          className="custom-scroll-text"
        />

        {/* ── 6. ABOUT ── */}
        <HomeAbout />

        <Companies />

        {/* ── 7. CORE SERVICES (NEW) ── */}
        <CoreServices />

        {/* ── 8. BRANDING FEATURE ── */}
        <Branding />

        {/* ── 9. WHY VISION9 ── */}
        <WhyVision />

        {/* ── 10. OUR PROCESS (NEW) ── */}
        <OurProcess />

        {/* ── 11. CASE STUDIES (NEW) ── */}
        <CaseStudies />

        {/* ── 12. CLIENTS TEASER (NEW) ── */}
        <ClientsTeaser />

        {/* ── 13. FINAL CTA (NEW) ── */}
        <FinalCTA />
      </div>
      <Footer />
    </>
  );
}
