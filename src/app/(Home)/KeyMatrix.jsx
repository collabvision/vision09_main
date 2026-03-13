"use client";

/* ═══════════════════════════════════════════════════
   THEME — change here to retheme this entire file
═══════════════════════════════════════════════════ */
const T = {
  accent:      "#a6a216",          // main brand color
  accentLight: "#ebe60c",          // highlight / hover
  accentMid:   "#d2ce12",          // mid accent
  accentDark:  "#737017",          // darker accent

  bg:          "#fffee9",          // main background
  bgAlt:       "#f5f2c8",          // soft alt background

  card:        "#ffffff",          // cards

  text:        "#231f1f",          // main text
  textSec:     "#58564d",          // secondary text
  muted:       "#a19f8a",          // muted text

  border:      "rgba(115,112,23,0.20)",
};

import { useEffect, useRef, useState } from "react";
import MagicBento from "../../components/MagicBento";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

const CSS = `
${FONTS}
.km-section{
  background:${T.bg};
  padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);
  position:relative;overflow:hidden;font-family:'DM Sans',sans-serif;
}
.km-noise{
  position:absolute;inset:0;opacity:.018;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px 200px;pointer-events:none;
}
.km-eyebrow{
  font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.3em;
  text-transform:uppercase;color:${T.accent};margin-bottom:.9rem;
  display:flex;align-items:center;gap:.7rem;
}
.km-eyebrow::before{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(270deg,${T.accent},transparent)}
.km-eyebrow::after{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(90deg,${T.accent},transparent)}
.km-h{
  font-family:'Playfair Display',serif;font-weight:600;
  font-size:clamp(1.8rem,4vw,3.2rem);line-height:1.15;color:${T.text};
  margin-bottom:.6rem;
}
.km-h em{color:${T.accent};font-style:italic}
.km-sub{
  font-size:clamp(.85rem,1.3vw,.98rem);line-height:1.8;
  color:${T.textSec};max-width:520px;margin-bottom:clamp(3rem,6vh,4.5rem);
}
/* ── bento override to match light theme ── */
.km-bento-wrap .magic-bento-card,
.km-bento-wrap [class*="bento"]{
  background:${T.card} !important;
  border-color:${T.border} !important;
  color:${T.text} !important;
}
/* fallback grid if MagicBento isn't theming */
.km-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:1px;background:${T.border};
  border:1px solid ${T.border};
}
.km-card{
  background:${T.card};padding:clamp(1.8rem,3.5vw,3rem) clamp(1.5rem,3vw,2.5rem);
  position:relative;overflow:hidden;transition:background .35s,transform .35s;
  cursor:default;
}
.km-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,${T.accentDark},${T.accent},${T.accentMid});
  transform:scaleX(0);transform-origin:left;transition:transform .55s;
}
.km-card:hover::before{transform:scaleX(1)}
.km-card:hover{background:${T.bgAlt};transform:translateY(-3px)}
.km-card::after{
  content:'';position:absolute;bottom:10px;right:10px;
  width:14px;height:14px;
  border-bottom:1px solid ${T.border};border-right:1px solid ${T.border};
}
.km-num{
  font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2.2rem,4.5vw,3.8rem);line-height:1;color:${T.accent};
  display:block;margin-bottom:.5rem;
}
.km-lbl{
  font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.2em;
  text-transform:uppercase;color:${T.muted};margin-bottom:.4rem;display:block;
}
.km-desc{font-size:clamp(.78rem,1.1vw,.88rem);color:${T.textSec};line-height:1.7}
/* reveal */
.km-rv{opacity:0;transform:translateY(32px);transition:opacity .75s ease,transform .75s cubic-bezier(.16,1,.3,1)}
.km-rv.on{opacity:1;transform:translateY(0)}
.km-d1{transition-delay:.05s}.km-d2{transition-delay:.12s}.km-d3{transition-delay:.19s}.km-d4{transition-delay:.26s}
.km-d5{transition-delay:.33s}.km-d6{transition-delay:.40s}.km-d7{transition-delay:.47s}.km-d8{transition-delay:.54s}
@media(max-width:900px){.km-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.km-grid{grid-template-columns:1fr}}
`;

const METRICS = [
  { num:"500M+",  lbl:"Views Generated",  desc:"Across digital platforms" },
  { num:"28+",    lbl:"Brands Partnered", desc:"Across multiple industries" },
  { num:"20,000+",lbl:"Pages Reach",      desc:"Managed across social media" },
  { num:"1,000+", lbl:"Influencers",      desc:"Pan-India creator community" },
  { num:"350+",   lbl:"Campaigns",        desc:"Successfully planned & executed" },
  { num:"5,000+", lbl:"Publications",     desc:"International & national media" },
  { num:"30+",    lbl:"Active Clients",   desc:"Ongoing growth partnerships" },
  { num:"94%",    lbl:"Success Rate",     desc:"Across campaigns & engagements" },
];

function countUp(el) {
  const raw = el.dataset.target;
  const hasPlus = raw.includes("+");
  const hasPct  = raw.includes("%");
  const hasM    = raw.includes("M");
  const num = parseFloat(raw.replace(/[^0-9.]/g,""));
  const dur = 1800, t0 = performance.now();
  const suffix = hasM ? "M+" : hasPlus ? "+" : hasPct ? "%" : "";
  (function tick(now) {
    const p = Math.min((now-t0)/dur,1);
    const e = 1-Math.pow(1-p,4);
    const val = Math.floor(e*num);
    el.textContent = (val >= 1000 ? val.toLocaleString() : val) + suffix;
    if (p<1) requestAnimationFrame(tick);
  })(t0);
}

export default function KeyMatrix() {
  const sectionRef = useRef(null);
  const [counted, setCounted] = useState(false);

  useEffect(()=>{
    const obs = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          if (!counted && e.target === sectionRef.current) {
            setCounted(true);
            sectionRef.current?.querySelectorAll("[data-target]").forEach(countUp);
          }
          obs.unobserve(e.target);
        }
      });
    },{ threshold:.15 });
    document.querySelectorAll(".km-rv").forEach(el=>obs.observe(el));
    if(sectionRef.current) obs.observe(sectionRef.current);
    return ()=>obs.disconnect();
  },[]);

  return (
    <section className="km-section " ref={sectionRef}>
      <style>{CSS}</style>
      <div className="km-noise"/>

      <div className="km-rv">
        <div className="km-eyebrow">Impact &amp; Scale</div>
        <h2 className="km-h">Numbers that prove <em>real results</em></h2>
        <p className="km-sub">
          Measurable outcomes across every campaign, client, and platform —
          this is what performance-driven marketing looks like.
        </p>
      </div>

      {/* ── CUSTOM THEMED GRID ── */}
      <div className="km-grid">
        {METRICS.map((m,i)=>(
          <div key={i} className={`km-card km-rv km-d${i+1}`}>
            <span className="km-num" data-target={m.num}>0</span>
            <span className="km-lbl">{m.lbl}</span>
            <p className="km-desc">{m.desc}</p>
          </div>
        ))}
      </div>

      {/*
        NOTE: MagicBento is kept below as an optional overlay — uncomment if you want
        the Magic UI bento in addition to / instead of the custom grid above.
        Its glowColor is tuned to the gold accent (168,131,42).
      */}
      {/* <div className="km-bento-wrap" style={{marginTop:"3rem"}}>
        <MagicBento
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="168,131,42"
          disableAnimations={false}
        />
      </div> */}
    </section>
  );
}