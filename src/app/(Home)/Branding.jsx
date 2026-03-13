"use client";

/* ═══════════════════════════════════════════════════
   THEME — change here to retheme this entire file
═══════════════════════════════════════════════════ */
const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentMid: "#d2ce12",
  accentDark: "#737017",

  bg: "#fffee9",
  bgAlt: "#f5f2c8",
  card: "#ffffff",

  text: "#231f1f",
  textSec: "#58564d",
  muted: "#a19f8a",

  border: "rgba(115,112,23,0.20)",

  dark: "#231f1f",
  darkText: "#fffee9",
};

import { motion } from "framer-motion";
import { HyperText } from "../../components/ui/hyper-text";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

const CSS = `
${FONTS}
.br-section{
  background:${T.bg};padding:clamp(5rem,10vh,8rem) 0;
  font-family:'DM Sans',sans-serif;overflow:hidden;position:relative;
}
.br-rule{width:100%;height:1px;background:linear-gradient(90deg,transparent,${T.accentMid},transparent);opacity:.3;margin-bottom:0}
.br-inner{
  display:flex;flex-direction:row;align-items:stretch;
  min-height:clamp(420px,65vh,700px);
}
/* LEFT — image */
.br-img-col{
  width:48%;flex-shrink:0;overflow:hidden;position:relative;
}
.br-img-col img{
  width:100%;height:100%;object-fit:cover;
  border-radius:0 clamp(3rem,8vw,7rem) clamp(3rem,8vw,7rem) 0;
  display:block;
}
.br-img-col::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,${T.bg} 0%,transparent 18%);
  border-radius:0 clamp(3rem,8vw,7rem) clamp(3rem,8vw,7rem) 0;
}
/* RIGHT — content */
.br-content{
  flex:1;padding:clamp(3rem,6vw,6rem) clamp(2rem,5vw,5rem);
  display:flex;flex-direction:column;justify-content:center;
  background:${T.bg};
}
.br-eyebrow{
  font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.3em;
  text-transform:uppercase;color:${T.accent};margin-bottom:1rem;
  display:flex;align-items:center;gap:.7rem;
}
.br-eyebrow::before{content:'';width:24px;height:1px;background:${T.accent};display:inline-block}
.br-h{
  font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2rem,4.5vw,4rem);line-height:1.05;color:${T.text};
  letter-spacing:-.015em;margin-bottom:1.5rem;
}
.br-h em{color:${T.accent};font-style:italic}
/* HyperText desc override */
.br-desc{
  font-size:clamp(.88rem,1.4vw,1rem);line-height:1.9;
  color:${T.textSec};max-width:520px;margin-bottom:2rem;
}
.br-tags{
  display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:2.5rem;
}
.br-tag{
  font-family:'Tenor Sans',sans-serif;font-size:.52rem;letter-spacing:.16em;
  text-transform:uppercase;border:1px solid ${T.border};color:${T.accent};
  padding:.35rem .85rem;transition:background .3s,color .3s;cursor:default;
}
.br-tag:hover{background:${T.accent};color:${T.darkText}}
.br-cta{
  display:inline-flex;align-items:center;gap:.7rem;
  font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700;
  letter-spacing:.15em;text-transform:uppercase;text-decoration:none;
  background:${T.dark};color:${T.darkText};
  padding:1rem 2.5rem;position:relative;overflow:hidden;
  transition:background .3s,transform .3s;border:none;cursor:pointer;
}
.br-cta::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(168,131,42,.25),transparent);
  transform:translateX(-100%);transition:transform .45s;
}
.br-cta:hover::after{transform:translateX(100%)}
.br-cta:hover{background:${T.accentDark};transform:translateY(-2px)}
.br-cta-arrow{
  display:inline-block;transition:transform .3s;
}
.br-cta:hover .br-cta-arrow{transform:translateX(4px)}
/* accent bar running right side of left column */
.br-img-accent{
  position:absolute;top:10%;right:0;bottom:10%;width:2px;
  background:linear-gradient(to bottom,transparent,${T.accent},${T.accentMid},transparent);
  opacity:.4;z-index:2;
}
@media(max-width:900px){
  .br-inner{flex-direction:column}
  .br-img-col{width:85%;border-radius:0 0 3rem 3rem;max-height:340px;margin:0 auto}
  .br-img-col img{border-radius:0 3rem 3rem 0}
  .br-img-col::after{display:none}
  .br-content{padding:3rem clamp(1.5rem,5vw,3rem)}
}
`;

const TAGS = [
  "Brand Identity",
  "Visual Language",
  "Digital Creatives",
  "Offline Print",
  "Banners & Standees",
  "Brochures",
  "Packaging",
  "On-Ground Execution",
];

export default function Branding() {
  return (
    <section className="br-section">
      <style>{CSS}</style>
      <div className="br-rule" />

      <div className="br-inner">
        {/* ── LEFT IMAGE ── */}
        <motion.div
          className="br-img-col"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://dummyimage.com/720x900/F2EDE0/A8832A&text=Branding"
            alt="Vision9 Branding"
          />
          <div className="br-img-accent" />
        </motion.div>

        {/* ── RIGHT CONTENT ── */}
        <motion.div
          className="br-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
        >
          <motion.div
            className="br-eyebrow"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <span />
            Branding &amp; Designing
          </motion.div>

          <motion.h2
            className="br-h"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
          >
            Building Brands <em>That Stand Out</em>
          </motion.h2>

          {/* HyperText animated description */}
          <motion.div
            className="br-desc"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <HyperText
              style={{
                fontFamily: "'DM Sans',sans-serif",
                color: T.textSec,
                fontSize: "inherit",
                lineHeight: 1.9,
                display: "block",
              }}
            >
              From brand identity and visual language to digital and offline
              creatives, we deliver end-to-end branding solutions — including
              design, printing, and on-ground execution of banners, brochures,
              pamphlets, standees, and more — ensuring consistent brand
              visibility across every touchpoint.
            </HyperText>
          </motion.div>

          {/* tag pills */}
          <motion.div
            className="br-tags"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            {TAGS.map((t, i) => (
              <span key={i} className="br-tag">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <a href="/branding" className="br-cta">
              Explore Branding &amp; Designing
              <span className="br-cta-arrow">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="br-rule" />
    </section>
  );
}
