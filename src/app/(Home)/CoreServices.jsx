"use client";

/* ═══════════════════════════════════════════════════
   THEME — change here to retheme this entire file
═══════════════════════════════════════════════════ */
const T = {
  accent:      "#A8832A",
  accentLight: "#D4B86A",
  accentMid:   "#C4A24E",
  accentDark:  "#6B5010",
  bg:          "#FAF8F2",
  bgAlt:       "#F2EDE0",
  card:        "#FFFFFF",
  dark:        "#1C1A14",
  darkCard:    "#2A2618",
  text:        "#1C1A14",
  textSec:     "#56503E",
  muted:       "#9A8E72",
  border:      "rgba(168,131,42,0.20)",
};

import { useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

const CSS = `
${FONTS}
.cs-section{
  background:${T.bgAlt};padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);
  font-family:'DM Sans',sans-serif;position:relative;
}
.cs-rule{width:100%;height:1px;background:linear-gradient(90deg,transparent,${T.accentMid},transparent);opacity:.3}
.cs-head{margin-bottom:clamp(3rem,6vh,5rem)}
.cs-eyebrow{
  font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.3em;
  text-transform:uppercase;color:${T.accent};margin-bottom:.9rem;
  display:flex;align-items:center;gap:.7rem;
}
.cs-eyebrow::before{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(270deg,${T.accent},transparent)}
.cs-eyebrow::after{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(90deg,${T.accent},transparent)}
.cs-h{
  font-family:'Playfair Display',serif;font-weight:600;
  font-size:clamp(1.8rem,4vw,3.5rem);line-height:1.15;color:${T.text};
  max-width:580px;
}
.cs-h em{color:${T.accent};font-style:italic}
.cs-grid{
  display:grid;grid-template-columns:repeat(3,1fr);
  gap:1px;background:${T.border};border:1px solid ${T.border};
}
.cs-card{
  background:${T.card};padding:clamp(2rem,4vw,3.5rem) clamp(1.8rem,3.5vw,3rem);
  position:relative;overflow:hidden;cursor:default;
  transition:background .4s,transform .35s;
}
.cs-card:nth-child(2){background:${T.dark}}
.cs-card:nth-child(2) .cs-num{-webkit-text-stroke-color:rgba(168,131,42,.18)}
.cs-card:nth-child(2) .cs-card-h{color:${T.accentLight}}
.cs-card:nth-child(2) .cs-card-p{color:rgba(210,200,180,.65)}
.cs-card:nth-child(2) .cs-tag{border-color:rgba(168,131,42,.28);color:${T.accentMid}}
.cs-card:nth-child(2)::before{background:linear-gradient(90deg,${T.accent},${T.accentMid})}
.cs-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,${T.accentDark},${T.accent},${T.accentMid});
  transform:scaleX(0);transform-origin:left;transition:transform .55s;
}
.cs-card:hover::before{transform:scaleX(1)}
.cs-card:hover:not(:nth-child(2)){background:${T.bgAlt}}
.cs-card::after{
  content:'';position:absolute;bottom:10px;right:10px;
  width:16px;height:16px;border-bottom:1px solid ${T.border};border-right:1px solid ${T.border};
}
.cs-num{
  font-family:'Playfair Display',serif;font-size:5rem;color:transparent;
  -webkit-text-stroke:1px ${T.border};line-height:1;
  margin-bottom:.5rem;font-weight:900;display:block;
}
.cs-tag{
  font-family:'Tenor Sans',sans-serif;font-size:.52rem;letter-spacing:.2em;
  text-transform:uppercase;color:${T.accent};border:1px solid ${T.border};
  padding:.3rem .8rem;display:inline-block;margin-bottom:1.2rem;
}
.cs-card-h{
  font-family:'Playfair Display',serif;font-size:clamp(1.2rem,2.2vw,1.7rem);
  font-weight:600;color:${T.text};line-height:1.2;margin-bottom:1rem;letter-spacing:.02em;
}
.cs-card-p{font-size:clamp(.82rem,1.25vw,.95rem);line-height:1.85;color:${T.textSec}}
.cs-card-link{
  display:inline-flex;align-items:center;gap:.5rem;margin-top:1.8rem;
  font-family:'Tenor Sans',sans-serif;font-size:.6rem;letter-spacing:.22em;
  text-transform:uppercase;color:${T.accent};text-decoration:none;
  transition:gap .3s;
}
.cs-card-link:hover{gap:.9rem}
.cs-card:nth-child(2) .cs-card-link{color:${T.accentMid}}
/* reveal */
.cs-rv{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
.cs-rv.on{opacity:1;transform:translateY(0)}
.cs-d1{transition-delay:.1s}.cs-d2{transition-delay:.22s}.cs-d3{transition-delay:.34s}
@media(max-width:768px){.cs-grid{grid-template-columns:1fr}}
`;

const SERVICES = [
  {
    n:"01",tag:"Performance",
    h:"Lead Generation & Performance Marketing",
    p:"Data-driven campaigns designed to deliver consistent, high-quality leads across Meta and Google platforms. Every rupee tracked, every outcome measured.",
    link:"/services/performance",
  },
  {
    n:"02",tag:"Branding",
    h:"Branding & Social Media Marketing",
    p:"End-to-end brand building through strategic positioning, content creation, and social media management. Building brands that audiences recognise and trust.",
    link:"/services/branding",
  },
  {
    n:"03",tag:"Content",
    h:"Video, Reels & UGC Content Creation",
    p:"Authentic, high-performing content built to increase engagement, trust, and advertising efficiency. From scripting to final edit — we own the process.",
    link:"/services/content",
  },
];

export default function CoreServices() {
  useEffect(()=>{
    const obs = new IntersectionObserver(es=>{
      es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");obs.unobserve(e.target)}});
    },{ threshold:.12 });
    document.querySelectorAll(".cs-rv").forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  },[]);

  return (
    <section className="cs-section">
      <style>{CSS}</style>

      <div className="cs-head cs-rv">
        <div className="cs-eyebrow">Our Core Services</div>
        <h2 className="cs-h">What we do <em>exceptionally well</em></h2>
      </div>

      <div className="cs-grid">
        {SERVICES.map((s,i)=>(
          <div key={i} className={`cs-card cs-rv cs-d${i+1}`}>
            <span className="cs-num">{s.n}</span>
            <span className="cs-tag">{s.tag}</span>
            <h3 className="cs-card-h">{s.h}</h3>
            <p className="cs-card-p">{s.p}</p>
            <a href={s.link} className="cs-card-link">Learn More →</a>
          </div>
        ))}
      </div>
    </section>
  );
}