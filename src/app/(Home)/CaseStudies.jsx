"use client";

const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentMid: "#d2ce12",
  accentDark: "#737017",

  bg: "#fffee9",
  bgAlt: "#f4f1c5",
  card: "#ffffff",

  text: "#231f1f",
  textSec: "#58564d",
  muted: "#a19f8a",

  border: "rgba(115,112,23,0.20)",
};

import { useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

const CSS = `
${FONTS}
.case-section{background:${T.bgAlt};padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);font-family:'DM Sans',sans-serif;position:relative}
.case-inner{display:grid;grid-template-columns:1fr 1fr;gap:clamp(3rem,6vw,7rem);align-items:center;max-width:1280px;margin:0 auto}
.case-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;color:${T.accent};margin-bottom:.9rem;display:flex;align-items:center;gap:.7rem}
.case-eyebrow::before{content:'';width:24px;height:1px;background:${T.accent};display:inline-block}
.case-h{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(2rem,4.5vw,4rem);line-height:1.05;color:${T.text};margin-bottom:.8rem;letter-spacing:-.015em}
.case-h em{color:${T.accent};font-style:italic}
.case-p{font-size:clamp(.88rem,1.4vw,1rem);line-height:1.9;color:${T.textSec};margin-bottom:2rem;max-width:460px}
.case-cta{display:inline-flex;align-items:center;gap:.7rem;font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;background:${T.text};color:#FAF8F2;padding:1rem 2.5rem;position:relative;overflow:hidden;transition:background .3s,transform .3s}
.case-cta::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(168,131,42,.2),transparent);transform:translateX(-100%);transition:transform .45s}
.case-cta:hover::after{transform:translateX(100%)}
.case-cta:hover{background:${T.accentDark};transform:translateY(-2px)}
.case-arrow{transition:transform .3s}.case-cta:hover .case-arrow{transform:translateX(4px)}
/* mock case study cards */
.case-cards{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.case-card{background:${T.card};border:1px solid ${T.border};padding:1.8rem 1.5rem;position:relative;overflow:hidden;transition:transform .35s,border-color .35s,box-shadow .35s;box-shadow:0 2px 16px rgba(168,131,42,.04)}
.case-card:hover{transform:translateY(-5px);border-color:${T.accentMid};box-shadow:0 12px 40px ${T.border}}
.case-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,${T.accentDark},${T.accent},${T.accentMid});transform:scaleX(0);transform-origin:left;transition:transform .5s}
.case-card:hover::before{transform:scaleX(1)}
.case-card-tag{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:${T.accent};display:block;margin-bottom:.8rem}
.case-card-h{font-family:'Playfair Display',serif;font-size:clamp(.95rem,1.6vw,1.2rem);font-weight:600;color:${T.text};margin-bottom:.5rem;line-height:1.3}
.case-card-stat{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3vw,2.4rem);color:${T.accent};font-weight:700;line-height:1}
.case-card-stat-lbl{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.16em;text-transform:uppercase;color:${T.muted};display:block;margin-top:.2rem}
.case-rv{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
.case-rv.on{opacity:1;transform:translateY(0)}
.case-d1{transition-delay:.1s}.case-d2{transition-delay:.2s}.case-d3{transition-delay:.3s}.case-d4{transition-delay:.4s}
@media(max-width:900px){.case-inner{grid-template-columns:1fr}}
@media(max-width:480px){.case-cards{grid-template-columns:1fr}}
`;

const MOCK_CASES = [
  {
    tag: "Healthcare",
    h: "Shree Ortho & Trauma Centre",
    stat: "4×",
    lbl: "Lead growth in 90 days",
  },
  {
    tag: "Education",
    h: "Cornerstone Academia",
    stat: "60%",
    lbl: "Rise in parent enquiries",
  },
  {
    tag: "Real Estate · Dubai",
    h: "Leads Finder Group",
    stat: "3×",
    lbl: "International investor reach",
  },
  {
    tag: "Spiritual",
    h: "Shivoham Spiritual Hub",
    stat: "500M+",
    lbl: "Total platform views",
  },
];

export default function CaseStudies() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".case-rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section className="case-section">
      <style>{CSS}</style>
      <div className="case-inner">
        <div>
          <div className="case-rv">
            <div className="case-eyebrow">
              <span />
              Case Studies
            </div>
            <h2 className="case-h">
              Proven strategies. <em>Real outcomes.</em>
            </h2>
            <p className="case-p">
              Explore how Vision9 has helped brands strengthen their presence,
              improve reach, and generate measurable growth across industries.
            </p>
            <a href="/case-studies" className="case-cta">
              View Case Studies <span className="case-arrow">→</span>
            </a>
          </div>
        </div>
        <div className="case-cards">
          {MOCK_CASES.map((c, i) => (
            <div key={i} className={`case-card case-rv case-d${i + 1}`}>
              <span className="case-card-tag">{c.tag}</span>
              <div className="case-card-h">{c.h}</div>
              <div style={{ marginTop: "1.2rem" }}>
                <div className="case-card-stat">{c.stat}</div>
                <span className="case-card-stat-lbl">{c.lbl}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
