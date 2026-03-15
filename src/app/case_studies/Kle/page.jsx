"use client";

/* ═══════════════════════════════════════════════
   VISION9 · KLE Case Study
   Ultra-cinematic GSAP storytelling experience
   Apple-style scroll-driven narrative in gold/cream
═══════════════════════════════════════════════ */

const T = {
  accent:      "#a6a216",
  accentLight: "#ebe60c",
  accentMid:   "#d2ce12",
  accentDark:  "#737017",

  bg:          "#fffee9",
  bgAlt:       "#f5f2c8",

  bgDark:      "#231f1f",
  bgDarkCard:  "#2a2622",
  bgDarkAlt:   "#3f3c15",

  card:        "#ffffff",

  text:        "#231f1f",
  textSec:     "#58564d",
  muted:       "#a19f8a",

  border:      "rgba(115,112,23,0.20)",

  cream:       "#fffee9",
};

import { useEffect, useRef, useState } from "react";
import Header from "../../../components/custom/Header";
import Footer from "../../../components/custom/Footer";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700;1,900&family=Tenor+Sans&family=DM+Sans:wght@200;300;400;500&display=swap');
`;

const CSS = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:auto}
body{background:${T.bgDark};color:${T.cream};font-family:'DM Sans',sans-serif;font-weight:300;overflow-x:hidden;cursor:none}

/* ── CURSOR ── */
#vx-cur{width:8px;height:8px;background:${T.accent};position:fixed;pointer-events:none;z-index:9999;
  transform:translate(-50%,-50%);transition:width .3s,height .3s,border-radius .3s,background .3s;border-radius:0}
#vx-cur.big{width:48px;height:48px;background:transparent;border:1px solid ${T.accent}}
#vx-ring{width:34px;height:34px;border:1px solid rgba(168,131,42,.3);position:fixed;pointer-events:none;
  z-index:9998;transform:translate(-50%,-50%);transition:width .45s,height .45s}

/* ── LOADING SCREEN ── */
#loader{position:fixed;inset:0;background:${T.bgDark};z-index:10000;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:2rem}
#loader.out{animation:loaderOut .8s ease forwards}
@keyframes loaderOut{to{opacity:0;transform:translateY(-100%);pointer-events:none}}
.ld-logo{font-family:'Playfair Display',serif;font-size:clamp(2rem,6vw,5rem);font-weight:900;
  color:transparent;-webkit-text-stroke:1px ${T.accent};letter-spacing:.1em}
.ld-bar-wrap{width:220px;height:1px;background:rgba(168,131,42,.15);overflow:hidden}
.ld-bar{height:100%;background:${T.accent};width:0;transition:width .05s linear}
.ld-pct{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.28em;text-transform:uppercase;
  color:${T.accent}}

/* ── PROGRESS BAR ── */
#pg-bar{position:fixed;top:0;left:0;height:2px;
  background:linear-gradient(90deg,${T.accentDark},${T.accent},${T.accentLight});
  z-index:5000;transform-origin:left;transform:scaleX(0);width:100%}

/* ── NOISE OVERLAY ── */
.noise-layer{position:absolute;inset:0;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px;opacity:.025}

/* ── NAV ── */
#vx-nav{position:fixed;top:0;left:0;right:0;z-index:4000;
  display:flex;justify-content:space-between;align-items:center;
  padding:.9rem clamp(1.5rem,5vw,4rem);
  border-bottom:1px solid rgba(168,131,42,.08);
  background:rgba(14,12,8,.85);backdrop-filter:blur(20px);
  transform:translateY(-100%);opacity:0}
.nav-logo{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;
  letter-spacing:.08em;color:${T.cream};text-decoration:none}
.nav-logo span{color:${T.accent}}
.nav-chapters{display:flex;gap:2rem}
.nav-ch{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.22em;
  text-transform:uppercase;color:rgba(250,248,242,.35);cursor:pointer;
  transition:color .3s;border:none;background:none;padding:0}
.nav-ch:hover,.nav-ch.active{color:${T.accent}}
.nav-right{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.2em;
  text-transform:uppercase;color:rgba(250,248,242,.3)}

/* ── CHAPTER LABEL (floating) ── */
#ch-label{position:fixed;right:clamp(1rem,3vw,2.5rem);top:50%;transform:translateY(-50%);
  z-index:3000;display:flex;flex-direction:column;align-items:flex-end;gap:.6rem}
.ch-dot{width:4px;height:4px;background:rgba(168,131,42,.3);cursor:pointer;
  transition:background .3s,transform .3s}
.ch-dot.active{background:${T.accent};transform:scale(1.8)}

/* ══════════════════════════════
   SECTION 0 — CINEMATIC HERO
══════════════════════════════ */
#s0{height:100vh;position:relative;overflow:hidden;display:flex;align-items:flex-end;
  background:${T.bgDark}}
.hero-video-bg{position:absolute;inset:0;
  background:radial-gradient(ellipse at 60% 40%,rgba(168,131,42,.08) 0%,transparent 55%),
             radial-gradient(ellipse at 20% 80%,rgba(168,131,42,.05) 0%,transparent 45%);
  overflow:hidden}
.hero-grid-lines{position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(168,131,42,.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(168,131,42,.04) 1px,transparent 1px);
  background-size:80px 80px}
.hero-scan-line{position:absolute;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent 0%,rgba(168,131,42,.3) 50%,transparent 100%);
  animation:scanAnim 6s linear infinite;top:-2px}
@keyframes scanAnim{0%{top:-1%}100%{top:102%}}
.hero-content{position:relative;z-index:10;padding:0 clamp(1.5rem,6vw,6rem) clamp(3rem,7vh,6rem);width:100%}
.hero-eyebrow-row{display:flex;align-items:center;gap:1.2rem;margin-bottom:2rem;opacity:0}
.hero-tag{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.24em;
  text-transform:uppercase;color:${T.accent};padding:.3rem .8rem;
  border:1px solid rgba(168,131,42,.3)}
.hero-tag-line{width:1px;height:14px;background:rgba(168,131,42,.25)}
.hero-h1-wrap{overflow:hidden}
.hero-h1{font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(3.5rem,11vw,12rem);line-height:.85;letter-spacing:-.03em;color:${T.cream};
  clip-path:inset(0 0 100% 0)}
.hero-h1.accent{color:${T.accent};font-style:italic}
.hero-h1.stroke{color:transparent;-webkit-text-stroke:1px rgba(250,248,242,.15)}
.hero-sub-row{display:flex;align-items:flex-start;gap:clamp(2rem,6vw,6rem);margin-top:2.5rem;opacity:0}
.hero-sub-text{max-width:480px;font-size:clamp(.88rem,1.4vw,1rem);line-height:1.88;
  color:rgba(250,248,242,.5)}
.hero-stats{display:flex;gap:2.5rem;flex-shrink:0}
.hs-item .hs-num{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,3rem);
  color:${T.accent};font-weight:700;line-height:1;display:block}
.hs-item .hs-lbl{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.18em;
  text-transform:uppercase;color:rgba(250,248,242,.35);margin-top:.2rem;display:block}
.hs-divider{width:1px;height:40px;background:rgba(168,131,42,.2);align-self:center}
.hero-scroll{position:absolute;right:clamp(1.5rem,4vw,3rem);bottom:clamp(2rem,5vh,4rem);
  display:flex;flex-direction:column;align-items:center;gap:.5rem;opacity:0}
.scroll-line-anim{width:1px;height:50px;background:linear-gradient(to bottom,${T.accent},transparent);
  animation:scrollPulse 2s ease-in-out infinite}
@keyframes scrollPulse{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(.4);opacity:.4}}
.scroll-txt{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.18em;
  text-transform:uppercase;color:${T.accent};writing-mode:vertical-rl}
/* big BG word */
.hero-bg-word{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(8rem,28vw,28rem);color:transparent;
  -webkit-text-stroke:1px rgba(168,131,42,.05);white-space:nowrap;pointer-events:none;
  letter-spacing:.05em;line-height:1}

/* ══════════════════════════════
   TICKER
══════════════════════════════ */
.ticker-strip{height:50px;background:${T.accent};overflow:hidden;display:flex;align-items:center;
  flex-shrink:0}
.ticker-track{display:flex;white-space:nowrap;animation:tkr 25s linear infinite}
.t-item{font-family:'Playfair Display',serif;font-size:.85rem;font-weight:700;
  letter-spacing:.2em;color:${T.cream};padding:0 2rem;display:flex;align-items:center;gap:1.2rem;
  text-transform:uppercase}
.t-dia{width:5px;height:5px;background:${T.cream};transform:rotate(45deg);opacity:.5;flex-shrink:0}
@keyframes tkr{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ══════════════════════════════
   SECTION 1 — PROBLEM (dark)
══════════════════════════════ */
#s1{background:${T.bgDark};padding:clamp(6rem,14vh,12rem) clamp(1.5rem,6vw,6rem);
  position:relative;overflow:hidden}
.s1-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(3rem,8vw,10rem);align-items:start}
.sec-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.52rem;letter-spacing:.28em;
  text-transform:uppercase;color:${T.accent};display:flex;align-items:center;gap:.7rem;
  margin-bottom:1.2rem}
.sec-eyebrow::after{content:'';flex:1;height:1px;
  background:linear-gradient(90deg,${T.accent},transparent);max-width:50px}
.sec-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2rem,4.5vw,4.5rem);line-height:1.05;letter-spacing:-.02em}
.sec-h em{color:${T.accent};font-style:italic}
.sec-p{font-size:clamp(.88rem,1.4vw,1rem);line-height:1.92;color:rgba(250,248,242,.5);margin-bottom:1.2rem}

/* spend cards */
.spend-card{border:1px solid rgba(168,131,42,.18);padding:1.8rem 2rem;
  background:${T.bgDarkCard};position:relative;overflow:hidden;margin-bottom:1rem;
  transition:border-color .4s}
.spend-card:hover{border-color:rgba(168,131,42,.45)}
.spend-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,${T.accent},transparent)}
.spend-amt{font-family:'Playfair Display',serif;font-size:clamp(1.5rem,3vw,2.5rem);
  color:${T.accent};font-weight:700;line-height:1;display:block}
.spend-lbl{font-family:'Tenor Sans',sans-serif;font-size:.52rem;letter-spacing:.18em;
  text-transform:uppercase;color:rgba(250,248,242,.4);margin:.35rem 0 .8rem;display:block}
.spend-result{display:flex;align-items:center;gap:.6rem}
.zero-pill{background:rgba(168,131,42,.1);border:1px solid rgba(168,131,42,.25);
  color:${T.accent};font-family:'Tenor Sans',sans-serif;font-size:.46rem;
  letter-spacing:.16em;text-transform:uppercase;padding:.22rem .65rem}
.spend-res-txt{font-size:.85rem;color:rgba(250,248,242,.35)}

/* problem box */
.problem-box{border:1px solid rgba(168,131,42,.2);padding:2.5rem;
  background:rgba(168,131,42,.04);position:relative;margin-top:1.5rem}
.problem-box::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;
  background:linear-gradient(90deg,transparent,${T.accent},transparent)}
.problem-quote{font-family:'Playfair Display',serif;font-size:clamp(1.1rem,2vw,1.55rem);
  font-style:italic;color:${T.cream};line-height:1.55}
.problem-quote em{color:${T.accent}}
.problem-attr{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.2em;
  text-transform:uppercase;color:${T.accent};margin-top:1.2rem;display:block}

/* issues list */
.issue-row{display:flex;align-items:flex-start;gap:.9rem;padding:.7rem 0;
  border-bottom:1px solid rgba(168,131,42,.1);font-size:.9rem;
  color:rgba(250,248,242,.45);line-height:1.6;opacity:0;transform:translateX(30px)}
.issue-row.visible{opacity:1;transform:translateX(0);transition:opacity .6s,transform .6s}
.issue-x{color:${T.accent};flex-shrink:0;margin-top:.05rem}

/* ══════════════════════════════
   SECTION 2 — TRANSFORMATION (split scroll)
══════════════════════════════ */
#s2{position:relative;background:${T.bgDark};padding:clamp(6rem,14vh,12rem) clamp(1.5rem,6vw,6rem)}
.transform-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2rem,5vw,5rem);line-height:1;letter-spacing:-.025em;text-align:center;
  margin-bottom:clamp(3rem,7vh,6rem)}
.transform-h em{color:${T.accent};font-style:italic}
/* comparison strip */
.ba-strip{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.ba-col{border:1px solid rgba(168,131,42,.15);overflow:hidden}
.ba-col-head{padding:1.2rem 1.8rem;border-bottom:1px solid rgba(168,131,42,.12);
  display:flex;align-items:center;justify-content:space-between}
.ba-col-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:${T.cream}}
.ba-badge{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.18em;
  text-transform:uppercase;padding:.25rem .7rem;border:1px solid}
.ba-badge.before{border-color:rgba(168,131,42,.25);color:rgba(250,248,242,.4)}
.ba-badge.after{border-color:${T.accent};color:${T.accent};background:rgba(168,131,42,.07)}
.ba-col-body{padding:1.8rem}
/* mock instagram grid */
.ig-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px}
.ig-cell{aspect-ratio:1;background:${T.bgDarkAlt};position:relative;overflow:hidden;
  cursor:pointer;transition:transform .3s}
.ig-cell:hover{transform:scale(1.05)}
.ig-cell .ig-overlay{position:absolute;inset:0;background:rgba(168,131,42,.7);
  display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s}
.ig-cell:hover .ig-overlay{opacity:1}
.ig-overlay-txt{font-family:'Tenor Sans',sans-serif;font-size:.42rem;letter-spacing:.14em;
  text-transform:uppercase;color:${T.cream};text-align:center;padding:.3rem}
.ig-cell .shimmer{position:absolute;inset:0;
  background:linear-gradient(135deg,${T.bgDarkAlt} 25%,rgba(168,131,42,.08) 50%,${T.bgDarkAlt} 75%);
  background-size:200% 200%;animation:shimmer 2.5s ease infinite}
.ig-cell.active .shimmer{background:linear-gradient(135deg,rgba(168,131,42,.15) 0%,rgba(168,131,42,.08) 50%,rgba(168,131,42,.2) 100%)}
@keyframes shimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.ba-points{list-style:none;margin-top:1.5rem}
.ba-points li{display:flex;align-items:flex-start;gap:.8rem;padding:.6rem 0;
  border-bottom:1px solid rgba(168,131,42,.08);font-size:.88rem;
  color:rgba(250,248,242,.45);line-height:1.65}
.ba-points li::before{content:'→';color:${T.accent};flex-shrink:0}
.ba-points.good li{color:rgba(250,248,242,.65)}

/* ══════════════════════════════
   SECTION 3 — STRATEGY (light)
══════════════════════════════ */
#s3{background:${T.bg};padding:clamp(6rem,14vh,12rem) clamp(1.5rem,6vw,6rem);position:relative}
.s3-inner{display:grid;grid-template-columns:1fr 1.5fr;gap:clamp(3rem,8vw,10rem);align-items:start}
.strategy-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2rem,4.5vw,4rem);line-height:1.05;color:${T.text};
  letter-spacing:-.02em;margin-bottom:1.5rem}
.strategy-h em{color:${T.accent};font-style:italic}
.strategy-p{font-size:clamp(.88rem,1.4vw,1rem);line-height:1.9;color:${T.textSec};margin-bottom:1rem}
.pillar-list{border-top:1px solid rgba(168,131,42,.15);margin-top:1.5rem}
.pillar-row{display:flex;align-items:flex-start;gap:1.2rem;padding:1.3rem 0;
  border-bottom:1px solid rgba(168,131,42,.1);cursor:default;transition:padding .25s,background .25s}
.pillar-row:hover{background:${T.bgAlt};padding-left:.5rem}
.pillar-row:hover .p-num{color:${T.accent}}
.pillar-row:hover .p-txt{color:${T.text}}
.p-num{font-family:'Playfair Display',serif;font-size:.9rem;color:${T.muted};
  min-width:2rem;font-weight:400;transition:color .3s;flex-shrink:0;padding-top:.05rem}
.p-txt{font-family:'Playfair Display',serif;font-size:clamp(1rem,2vw,1.4rem);
  font-weight:400;color:${T.textSec};line-height:1.4;transition:color .3s}
/* exec cards */
.exec-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(168,131,42,.12);
  border:1px solid rgba(168,131,42,.12)}
.exec-card{background:${T.card};padding:clamp(1.5rem,3vw,2.5rem);position:relative;
  overflow:hidden;transition:background .35s}
.exec-card:hover{background:${T.bgAlt}}
.exec-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;
  background:linear-gradient(90deg,${T.accentDark},${T.accent},${T.accentMid});
  transform:scaleX(0);transform-origin:left;transition:transform .5s}
.exec-card:hover::before{transform:scaleX(1)}
.exec-n{font-family:'Playfair Display',serif;font-size:clamp(3rem,6vw,5rem);
  color:transparent;-webkit-text-stroke:1px rgba(168,131,42,.18);line-height:1;font-weight:900}
.exec-tag{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.2em;
  text-transform:uppercase;color:${T.accent};display:block;margin-bottom:.6rem}
.exec-title{font-family:'Playfair Display',serif;font-size:clamp(1rem,1.8vw,1.35rem);
  font-weight:600;color:${T.text};margin-bottom:.4rem;line-height:1.2}
.exec-desc{font-size:clamp(.78rem,1.1vw,.88rem);line-height:1.82;color:${T.textSec}}

/* ══════════════════════════════
   SECTION 4 — NUMBERS (cinematic dark)
══════════════════════════════ */
#s4{background:${T.bgDark};position:relative;overflow:hidden;
  padding:clamp(6rem,14vh,12rem) clamp(1.5rem,6vw,6rem)}
.s4-glow{position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:800px;height:400px;
  background:radial-gradient(ellipse,rgba(168,131,42,.08) 0%,transparent 70%);
  pointer-events:none}
.results-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2rem,5vw,5rem);line-height:1;letter-spacing:-.025em;color:${T.cream};
  margin-bottom:clamp(3rem,8vh,7rem);max-width:600px}
.results-h em{color:${T.accent};font-style:italic}
/* massive number grid */
.r-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
  background:rgba(168,131,42,.1);border:1px solid rgba(168,131,42,.1)}
.r-card{background:${T.bgDarkCard};padding:clamp(2rem,4vw,3.5rem) clamp(1.5rem,3vw,2.5rem);
  position:relative;overflow:hidden;cursor:default;transition:background .4s}
.r-card:hover{background:${T.bgDarkAlt}}
.r-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;
  background:linear-gradient(90deg,${T.accentDark},${T.accent},${T.accentMid});
  transform:scaleX(0);transform-origin:left;transition:transform .55s}
.r-card:hover::before{transform:scaleX(1)}
.r-lbl{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.18em;
  text-transform:uppercase;color:rgba(250,248,242,.4);display:block;margin-bottom:.5rem}
.r-num{font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,4rem);
  color:${T.accent};line-height:1;display:block;font-weight:700;margin-bottom:.4rem}
.r-desc{font-size:clamp(.76rem,1.1vw,.86rem);line-height:1.72;color:rgba(250,248,242,.3)}

/* ad detail row */
.ad-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2rem}
.ad-card{border:1px solid rgba(168,131,42,.18);padding:clamp(1.5rem,3vw,2.5rem);
  background:${T.bgDarkCard};position:relative;overflow:hidden;transition:border-color .3s}
.ad-card:hover{border-color:rgba(168,131,42,.4)}
.ad-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,${T.accent},transparent)}
.ad-big{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,3.2rem);
  color:${T.accent};font-weight:700;line-height:1;display:block}
.ad-sub{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.16em;
  text-transform:uppercase;color:rgba(250,248,242,.35);margin:.3rem 0 .7rem;display:block}
.ad-p{font-size:clamp(.78rem,1.1vw,.88rem);color:rgba(250,248,242,.4);line-height:1.72}

/* ══════════════════════════════
   SECTION 5 — OUTCOME (light dramatic)
══════════════════════════════ */
#s5{background:${T.bgAlt};padding:clamp(6rem,14vh,12rem) clamp(1.5rem,6vw,6rem);
  position:relative;overflow:hidden}
.outcome-bg-word{position:absolute;bottom:-5%;right:-2%;
  font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(8rem,25vw,22rem);color:transparent;
  -webkit-text-stroke:1px rgba(168,131,42,.06);pointer-events:none;line-height:1}
.outcome-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2rem,5vw,5rem);line-height:1;letter-spacing:-.025em;color:${T.text};
  margin-bottom:clamp(3rem,8vh,7rem)}
.outcome-h em{color:${T.accent};font-style:italic}
.oc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.oc-card{border:1px solid rgba(168,131,42,.2);padding:clamp(2rem,4vw,3rem);
  position:relative;overflow:hidden;background:${T.card};
  box-shadow:0 2px 24px rgba(168,131,42,.05);transition:transform .35s,border-color .35s,box-shadow .35s}
.oc-card:hover{transform:translateY(-7px);border-color:${T.accentMid};
  box-shadow:0 20px 56px rgba(168,131,42,.12)}
.oc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,${T.accentDark},${T.accent},${T.accentMid});
  transform:scaleX(0);transform-origin:left;transition:transform .55s}
.oc-card:hover::before{transform:scaleX(1)}
.oc-card::after{content:'';position:absolute;bottom:10px;right:10px;
  width:16px;height:16px;border-bottom:1px solid rgba(168,131,42,.2);
  border-right:1px solid rgba(168,131,42,.2)}
.oc-ghost{position:absolute;top:.3rem;right:.8rem;font-family:'Playfair Display',serif;
  font-size:5rem;color:transparent;-webkit-text-stroke:1px rgba(168,131,42,.08);
  line-height:1;font-weight:900;pointer-events:none}
.oc-num{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,5rem);
  color:${T.accent};font-weight:700;line-height:1;display:block;margin-bottom:.3rem}
.oc-lbl{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.18em;
  text-transform:uppercase;color:${T.muted};display:block;margin-bottom:.8rem}
.oc-desc{font-size:clamp(.82rem,1.2vw,.93rem);line-height:1.82;color:${T.textSec}}

/* bottom quote + mini stats */
.outcome-bottom{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,6rem);
  align-items:center;margin-top:clamp(3rem,7vh,5rem);padding-top:clamp(2rem,4vh,3rem);
  border-top:1px solid rgba(168,131,42,.15)}
.outcome-quote{font-family:'Playfair Display',serif;font-size:clamp(1.1rem,2.2vw,1.9rem);
  font-weight:400;font-style:italic;line-height:1.55;color:${T.text}}
.outcome-quote em{color:${T.accent}}
.mini-stats{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.mini-stat{border:1px solid rgba(168,131,42,.18);padding:1.2rem 1.5rem;
  background:${T.card};position:relative}
.mini-stat::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,${T.accentDark},${T.accent},${T.accentMid})}
.mini-v{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,2.2vw,1.9rem);
  color:${T.accent};font-weight:700;line-height:1;display:block}
.mini-l{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.16em;
  text-transform:uppercase;color:${T.muted};margin-top:.25rem;display:block}

/* ══════════════════════════════
   SECTION 6 — TESTIMONIAL
══════════════════════════════ */
#s6{background:${T.bgDark};padding:clamp(7rem,16vh,14rem) clamp(1.5rem,6vw,6rem);
  position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:70vh}
.testi-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:600px;height:600px;
  background:radial-gradient(ellipse,rgba(168,131,42,.07) 0%,transparent 65%);
  pointer-events:none}
.testi-inner{max-width:900px;text-align:center;position:relative;z-index:2}
.testi-mark{font-family:'Playfair Display',serif;font-size:7rem;line-height:.4;
  color:rgba(168,131,42,.2);display:block;margin-bottom:2rem}
.testi-q{font-family:'Playfair Display',serif;font-size:clamp(1.3rem,3vw,2.5rem);
  font-style:italic;font-weight:400;color:${T.cream};line-height:1.55;margin-bottom:3rem}
.testi-divider{width:48px;height:1px;
  background:linear-gradient(90deg,transparent,${T.accent},transparent);
  margin:0 auto 1.8rem}
.testi-name{font-family:'Playfair Display',serif;font-size:clamp(1rem,1.8vw,1.4rem);
  font-weight:600;color:${T.cream};letter-spacing:.04em}
.testi-role{font-family:'Tenor Sans',sans-serif;font-size:.52rem;letter-spacing:.2em;
  text-transform:uppercase;color:${T.accent};display:block;margin-top:.4rem}

/* ══════════════════════════════
   SECTION 7 — CTA (finale)
══════════════════════════════ */
#s7{background:${T.bgDark};padding:clamp(7rem,18vh,14rem) clamp(1.5rem,6vw,6rem);
  position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;
  min-height:80vh;border-top:1px solid rgba(168,131,42,.1)}
.cta-bg-word{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(6rem,22vw,22rem);color:transparent;
  -webkit-text-stroke:1px rgba(168,131,42,.04);white-space:nowrap;pointer-events:none;
  animation:bgPulse 10s ease-in-out infinite}
@keyframes bgPulse{0%,100%{letter-spacing:.02em;opacity:.7}50%{letter-spacing:.12em;opacity:1}}
.cta-inner{text-align:center;position:relative;z-index:2;max-width:860px}
.cta-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.52rem;letter-spacing:.28em;
  text-transform:uppercase;color:${T.accent};display:flex;align-items:center;gap:.8rem;
  justify-content:center;margin-bottom:1.5rem}
.cta-eyebrow span{width:28px;height:1px;background:${T.accent};display:inline-block}
.cta-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2.2rem,6vw,6rem);line-height:1.05;color:${T.cream};
  letter-spacing:-.02em;margin-bottom:1.5rem}
.cta-h em{color:${T.accent};font-style:italic}
.cta-p{font-size:clamp(.9rem,1.5vw,1.05rem);line-height:1.88;
  color:rgba(250,248,242,.45);max-width:560px;margin:0 auto 3rem}
.cta-btns{display:flex;gap:1.2rem;justify-content:center;flex-wrap:wrap}
.btn-solid{background:${T.accent};color:${T.cream};font-family:'Playfair Display',serif;
  font-size:.88rem;font-weight:700;letter-spacing:.18em;padding:1rem 2.8rem;border:none;
  cursor:pointer;text-transform:uppercase;text-decoration:none;display:inline-flex;
  align-items:center;gap:.6rem;position:relative;overflow:hidden;transition:background .3s,transform .3s}
.btn-solid::after{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
  transform:translateX(-100%);transition:transform .4s}
.btn-solid:hover::after{transform:translateX(100%)}
.btn-solid:hover{background:${T.accentMid};transform:translateY(-2px)}
.btn-outline{background:transparent;color:${T.cream};font-family:'Playfair Display',serif;
  font-size:.88rem;font-weight:600;letter-spacing:.18em;padding:1rem 2.8rem;
  border:1px solid rgba(168,131,42,.38);cursor:pointer;text-transform:uppercase;
  text-decoration:none;display:inline-flex;align-items:center;gap:.6rem;
  transition:border-color .3s,color .3s,transform .3s}
.btn-outline:hover{border-color:${T.accent};color:${T.accent};transform:translateY(-2px)}

/* ── GSAP INITIAL STATES ── */
.gsap-fade{opacity:0}
.gsap-up{opacity:0;transform:translateY(60px)}
.gsap-left{opacity:0;transform:translateX(-60px)}
.gsap-right{opacity:0;transform:translateX(60px)}
.gsap-scale{opacity:0;transform:scale(.92)}

/* ── HORIZONTAL SCROLL STRIP ── */
.hscroll-wrap{overflow:hidden;position:relative;width:100%;background:${T.bgDarkAlt};
  border-top:1px solid rgba(168,131,42,.12);border-bottom:1px solid rgba(168,131,42,.12)}
.hscroll-track{display:flex;gap:1.5rem;padding:2rem 0;width:max-content}
.hscroll-card{flex-shrink:0;width:280px;border:1px solid rgba(168,131,42,.18);
  padding:1.8rem 2rem;background:${T.bgDarkCard};position:relative;overflow:hidden}
.hscroll-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,${T.accent},transparent)}
.hscroll-num{font-family:'Playfair Display',serif;font-size:2.5rem;color:${T.accent};
  font-weight:700;display:block;line-height:1}
.hscroll-lbl{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.18em;
  text-transform:uppercase;color:rgba(250,248,242,.4);margin:.3rem 0 .6rem;display:block}
.hscroll-desc{font-size:.85rem;line-height:1.72;color:rgba(250,248,242,.4)}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  .s1-grid,.s3-inner,.ba-strip,.outcome-bottom{grid-template-columns:1fr}
  .r-grid{grid-template-columns:repeat(2,1fr)}
  .ad-row,.oc-grid,.mini-stats{grid-template-columns:1fr}
  .exec-grid{grid-template-columns:1fr}
  #ch-label{display:none}
  .hero-stats{display:none}
}
@media(max-width:520px){
  .r-grid{grid-template-columns:1fr}
  .cta-btns{flex-direction:column;align-items:center}
  .oc-grid{grid-template-columns:1fr}
}
`;

/* ────── COUNTER HOOK ────── */
function useCountUp(target, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const raw = String(target).replace(/[^0-9.]/g, "");
    const num = parseFloat(raw) || 0;
    const dur = 2200, t0 = performance.now();
    let raf;
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(ease * num));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(num);
    })(t0);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return val;
}

function CountNum({ raw, suffix, active }) {
  const num = useCountUp(raw, active);
  return <>{num.toLocaleString()}{suffix}</>;
}

/* ────── MAIN ────── */
export default function page() {
  const curRef = useRef(null), ringRef = useRef(null);
  const loaderRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [countersOn, setCountersOn] = useState(false);
  const [ocCountersOn, setOcCountersOn] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(0);

  const CHAPTERS = ["Hero", "Problem", "Transform", "Strategy", "Results", "Outcome", "Testimonial", "CTA"];

  /* ── LOADER ── */
  useEffect(() => {
    const bar = document.querySelector(".ld-bar");
    const pct = document.querySelector(".ld-pct");
    if (!bar || !pct) return;
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) { p = 100; clearInterval(iv); }
      bar.style.width = p + "%";
      pct.textContent = Math.floor(p) + "%";
      if (p >= 100) setTimeout(() => {
        if (loaderRef.current) loaderRef.current.classList.add("out");
        setTimeout(() => { setLoaded(true); }, 800);
      }, 300);
    }, 80);
  }, []);

  /* ── GSAP ── */
  useEffect(() => {
    if (!loaded) return;
    // Load GSAP dynamically
    const loadGSAP = async () => {
      if (window.gsap) { initGSAP(); return; }
      const s1 = document.createElement("script");
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      document.head.appendChild(s1);
      s1.onload = () => {
        const s2 = document.createElement("script");
        s2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
        document.head.appendChild(s2);
        s2.onload = () => {
          const s3 = document.createElement("script");
          s3.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js";
          document.head.appendChild(s3);
          s3.onload = initGSAP;
          s3.onerror = initGSAP; // SplitText is Club plugin, graceful fallback
        };
      };
    };

    const initGSAP = () => {
      const { gsap } = window;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);

      // ── NAV entrance ──
      gsap.to("#vx-nav", { y: 0, opacity: 1, duration: .8, delay: .3, ease: "power3.out" });

      // ── Hero h1 lines ──
      gsap.to(".hero-h1", {
        clipPath: "inset(0 0 0% 0)", duration: 1.1, stagger: .15, delay: .5,
        ease: "power4.out"
      });
      gsap.to(".hero-eyebrow-row", { opacity: 1, y: 0, duration: .8, delay: .4, ease: "power3.out" });
      gsap.to(".hero-sub-row", { opacity: 1, y: 0, duration: .8, delay: 1.1, ease: "power3.out" });
      gsap.to(".hero-scroll", { opacity: 1, duration: .7, delay: 1.6, ease: "power2.out" });

      // Hero bg word parallax
      gsap.to(".hero-bg-word", {
        y: -150, ease: "none",
        scrollTrigger: { trigger: "#s0", start: "top top", end: "bottom top", scrub: 1 }
      });

      // ── Progress bar ──
      gsap.to("#pg-bar", {
        scaleX: 1, ease: "none",
        scrollTrigger: {
          trigger: "body", start: "top top", end: "bottom bottom", scrub: true
        }
      });

      // ── Chapter detection ──
      ["#s0","#s1","#s2","#s3","#s4","#s5","#s6","#s7"].forEach((id, i) => {
        ScrollTrigger.create({
          trigger: id, start: "top 60%",
          onEnter: () => setChapterIndex(i),
          onEnterBack: () => setChapterIndex(i),
        });
      });

      // ── S1 Problem ──
      gsap.from(".s1-eyebrow", {
        opacity: 0, y: 30, duration: .8,
        scrollTrigger: { trigger: "#s1", start: "top 75%" }
      });
      gsap.from(".s1-h", {
        opacity: 0, y: 60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: "#s1", start: "top 70%" }
      });
      gsap.from(".s1-p", {
        opacity: 0, y: 40, stagger: .15, duration: .8,
        scrollTrigger: { trigger: ".s1-p", start: "top 80%" }
      });
      gsap.from(".spend-card", {
        opacity: 0, x: -50, stagger: .2, duration: .9, ease: "power3.out",
        scrollTrigger: { trigger: ".spend-card", start: "top 80%" }
      });
      gsap.from(".problem-box", {
        opacity: 0, x: 60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".problem-box", start: "top 80%" }
      });
      // Stagger issue rows
      document.querySelectorAll(".issue-row").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, x: 30, duration: .6, delay: i * .1,
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });

      // ── S2 Transform ──
      gsap.from(".transform-h", {
        opacity: 0, y: 60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: "#s2", start: "top 72%" }
      });
      gsap.from(".ba-col", {
        opacity: 0, y: 80, stagger: .2, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".ba-strip", start: "top 78%" }
      });

      // ── S3 Strategy ──
      gsap.from(".strategy-h", {
        opacity: 0, y: 60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: "#s3", start: "top 72%" }
      });
      gsap.from(".pillar-row", {
        opacity: 0, x: -40, stagger: .18, duration: .8, ease: "power3.out",
        scrollTrigger: { trigger: ".pillar-list", start: "top 80%" }
      });
      gsap.from(".exec-card", {
        opacity: 0, y: 50, stagger: .15, duration: .85, ease: "power3.out",
        scrollTrigger: { trigger: ".exec-grid", start: "top 80%" }
      });

      // ── S4 Results - trigger counters ──
      ScrollTrigger.create({
        trigger: "#s4", start: "top 70%",
        onEnter: () => setCountersOn(true)
      });
      gsap.from(".results-h", {
        opacity: 0, y: 60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: "#s4", start: "top 72%" }
      });
      gsap.from(".r-card", {
        opacity: 0, y: 80, stagger: .12, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".r-grid", start: "top 80%" }
      });
      gsap.from(".ad-card", {
        opacity: 0, y: 50, stagger: .15, duration: .85,
        scrollTrigger: { trigger: ".ad-row", start: "top 82%" }
      });

      // horizontal scroll strip
      const htrack = document.querySelector(".hscroll-track");
      if (htrack) {
        const totalW = htrack.scrollWidth - htrack.parentElement.offsetWidth;
        gsap.to(htrack, {
          x: -totalW, ease: "none",
          scrollTrigger: {
            trigger: ".hscroll-wrap", start: "top 80%", end: "+=600", scrub: 1
          }
        });
      }

      // ── S5 Outcome ──
      ScrollTrigger.create({
        trigger: "#s5", start: "top 70%",
        onEnter: () => setOcCountersOn(true)
      });
      gsap.from(".outcome-h", {
        opacity: 0, y: 60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: "#s5", start: "top 72%" }
      });
      gsap.from(".oc-card", {
        opacity: 0, y: 80, stagger: .15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".oc-grid", start: "top 80%" }
      });
      gsap.from(".outcome-quote", {
        opacity: 0, y: 40, duration: .9, ease: "power3.out",
        scrollTrigger: { trigger: ".outcome-bottom", start: "top 82%" }
      });
      gsap.from(".mini-stat", {
        opacity: 0, scale: .88, stagger: .12, duration: .75, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".mini-stats", start: "top 82%" }
      });

      // ── S6 Testimonial ──
      gsap.from(".testi-mark", {
        opacity: 0, y: 40, duration: .8,
        scrollTrigger: { trigger: "#s6", start: "top 72%" }
      });
      gsap.from(".testi-q", {
        opacity: 0, y: 50, duration: 1.1, delay: .2, ease: "power3.out",
        scrollTrigger: { trigger: "#s6", start: "top 70%" }
      });
      gsap.from([".testi-divider",".testi-name",".testi-role"], {
        opacity: 0, y: 30, stagger: .15, duration: .8, delay: .5,
        scrollTrigger: { trigger: ".testi-q", start: "top 80%" }
      });

      // ── S7 CTA ──
      gsap.from(".cta-eyebrow", {
        opacity: 0, y: 30, duration: .7,
        scrollTrigger: { trigger: "#s7", start: "top 72%" }
      });
      gsap.from(".cta-h", {
        opacity: 0, y: 80, duration: 1.1, ease: "power3.out", delay: .15,
        scrollTrigger: { trigger: "#s7", start: "top 70%" }
      });
      gsap.from(".cta-p", {
        opacity: 0, y: 40, duration: .85, delay: .3,
        scrollTrigger: { trigger: ".cta-h", start: "top 80%" }
      });
      gsap.from(".cta-btns > *", {
        opacity: 0, y: 30, scale: .95, stagger: .15, duration: .75, ease: "back.out(1.3)", delay: .5,
        scrollTrigger: { trigger: ".cta-p", start: "top 82%" }
      });

      // ── Floating bg word parallax (s7) ──
      gsap.to(".cta-bg-word", {
        y: -80, ease: "none",
        scrollTrigger: { trigger: "#s7", start: "top bottom", end: "bottom top", scrub: 1 }
      });

      ScrollTrigger.refresh();
    };

    loadGSAP();
  }, [loaded]);

  /* ── CURSOR ── */
  useEffect(() => {
    const cur = curRef.current, ring = ringRef.current;
    if (!cur || !ring) return;
    let mx = 0, my = 0, cx = 0, cy = 0, rx = 0, ry = 0;
    const mv = e => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", mv);
    let raf; (function lerp() {
      cx += (mx - cx) * .18; cy += (my - cy) * .18;
      rx += (mx - rx) * .08; ry += (my - ry) * .08;
      cur.style.left = cx + "px"; cur.style.top = cy + "px";
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      raf = requestAnimationFrame(lerp);
    })();
    const bigs = document.querySelectorAll("a,button,.spend-card,.r-card,.oc-card,.ad-card,.exec-card,.ba-col,.ig-cell,.hscroll-card");
    bigs.forEach(el => {
      el.addEventListener("mouseenter", () => cur.classList.add("big"));
      el.addEventListener("mouseleave", () => cur.classList.remove("big"));
    });
    return () => { document.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, [loaded]);

  const TICKERS = ["K.L.E Institute of Fashion Technology","Admissions Closed in 30 Days","230+ Leads Generated","40/40 Seats Filled","₹20.29 Cost Per Lead","97,460 Reach","219 WhatsApp Leads","Strategy Always Outperforms Spend"];

  const IG_POSTS = [
    "Reel — Campus Life","Static — Admission Open","Carousel — Courses",
    "Reel — Career Scope","Static — Placement","Reel — Student Work"
  ];

  return (<>
    <style>{CSS}</style>

    {/* LOADER */}
    <div id="loader" ref={loaderRef}>
      <div className="noise-layer" />
      <div className="ld-logo">VISION9</div>
      <div className="ld-bar-wrap"><div className="ld-bar" /></div>
      <div className="ld-pct">0%</div>
    </div>

    {/* CURSOR */}
    <div id="vx-cur" ref={curRef} />
    <div id="vx-ring" ref={ringRef} />

    {/* PROGRESS BAR */}
    <div id="pg-bar" />

    {/* NAV */}
    {/* <nav id="vx-nav">
      <a href="#" className="nav-logo">VISION<span>9</span></a>
      <div className="nav-chapters">
        {CHAPTERS.map((c, i) => (
          <button key={i} className={`nav-ch${chapterIndex === i ? " active" : ""}`}
            onClick={() => {
              const ids = ["#s0","#s1","#s2","#s3","#s4","#s5","#s6","#s7"];
              document.querySelector(ids[i])?.scrollIntoView({ behavior: "smooth" });
            }}>{c}</button>
        ))}
      </div>
      <div className="nav-right">Case Study · KLE</div>
    </nav> */}
    <Header/>

    {/* CHAPTER DOTS */}
    <div id="ch-label">
      {CHAPTERS.map((_, i) => (
        <div key={i} className={`ch-dot${chapterIndex === i ? " active" : ""}`}
          onClick={() => {
            const ids = ["#s0","#s1","#s2","#s3","#s4","#s5","#s6","#s7"];
            document.querySelector(ids[i])?.scrollIntoView({ behavior: "smooth" });
          }} />
      ))}
    </div>

    {/* ════ S0 — HERO ════ */}
    <section id="s0">
      <div className="hero-video-bg">
        <div className="hero-grid-lines" />
        <div className="hero-scan-line" />
      </div>
      <div className="noise-layer" style={{ opacity: .03 }} />
      <div className="hero-bg-word">VISION9</div>

      <div className="hero-content">
        <div className="hero-eyebrow-row">
          <span className="hero-tag">Education</span>
          <div className="hero-tag-line" />
          <span className="hero-tag">Lead Generation</span>
          <div className="hero-tag-line" />
          <span className="hero-tag">North Karnataka</span>
        </div>

        <div className="hero-h1-wrap">
          <div className="hero-h1" style={{ display:"block" }}>CLOSING</div>
        </div>
        <div className="hero-h1-wrap">
          <div className="hero-h1 accent" style={{ display:"block" }}>ADMISSIONS</div>
        </div>
        <div className="hero-h1-wrap">
          <div className="hero-h1 stroke" style={{ display:"block" }}>IN 30 DAYS.</div>
        </div>

        <div className="hero-sub-row">
          <p className="hero-sub-text">
            How Vision9 filled 40/40 seats for K.L.E Institute of Fashion Technology
            when ₹55,000+ in traditional marketing generated zero leads.
          </p>
          <div className="hero-stats">
            {[
              { n:"40/40", l:"Seats Filled" },
              { n:"230+",  l:"Qualified Leads" },
              { n:"₹20",   l:"Cost Per Lead" },
              { n:"97K+",  l:"Users Reached" },
            ].map((s, i) => (<>
              {i > 0 && <div key={`d${i}`} className="hs-divider" />}
              <div key={i} className="hs-item">
                <span className="hs-num">{s.n}</span>
                <span className="hs-lbl">{s.l}</span>
              </div>
            </>))}
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line-anim" />
        <span className="scroll-txt">Scroll</span>
      </div>
    </section>

    {/* TICKER */}
    <div className="ticker-strip">
      <div className="ticker-track">
        {[...TICKERS, ...TICKERS].map((t, i) => (
          <div key={i} className="t-item">{t}<span className="t-dia" /></div>
        ))}
      </div>
    </div>

    {/* ════ S1 — PROBLEM ════ */}
    <section id="s1">
      <div className="noise-layer" />
      <div className="s1-grid">
        <div>
          <div className="sec-eyebrow s1-eyebrow">01 — The Challenge</div>
          <h2 className="sec-h s1-h" style={{ color: T.cream, marginBottom:"1.5rem" }}>
            When Traditional<br /><em>Marketing Failed</em>
          </h2>
          <p className="sec-p s1-p">K.L.E Institute of Fashion Technology & Apparel Design is one of the most reputed fashion institutes in North Karnataka. During admission season, a critical challenge emerged.</p>
          <p className="sec-p s1-p">Out of 40 allotted seats, <strong style={{ color:T.cream, fontWeight:600 }}>17–18 admissions were still vacant</strong> with the deadline fast approaching. The institute had already spent heavily on conventional channels — with zero return.</p>
          <div style={{ marginTop:"2rem" }}>
            {[
              { a:"₹30,000 – ₹35,000", l:"Newspaper Advertisements", r:"Zero admission inquiries" },
              { a:"₹25,000 – ₹30,000", l:"Instagram Page Collaborations", r:"Zero admission inquiries" },
            ].map((s, i) => (
              <div key={i} className="spend-card">
                <span className="spend-amt">{s.a}</span>
                <span className="spend-lbl">{s.l}</span>
                <div className="spend-result">
                  <span className="zero-pill">Result</span>
                  <span className="spend-res-txt">{s.r}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="problem-box">
            <p className="problem-quote">
              "The problem wasn't awareness — it was <em>reach without intent.</em> Visibility without targeting is just noise."
            </p>
            <span className="problem-attr">Vision9 Assessment</span>
          </div>
          <div style={{ marginTop:"2rem" }}>
            <p style={{ fontFamily:"'Tenor Sans',sans-serif", fontSize:".5rem", letterSpacing:".2em", textTransform:"uppercase", color:T.muted, marginBottom:"1rem" }}>Core Issues Identified</p>
            {[
              "Irregular posting, no visual consistency",
              "Content not aligned with admission objectives",
              "Mass marketing instead of intent-based targeting",
              "No direct lead capture or WhatsApp funnel",
            ].map((r, i) => (
              <div key={i} className="issue-row">
                <span className="issue-x">✕</span>{r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ════ S2 — BEFORE / AFTER ════ */}
    <section id="s2" style={{ background:T.bgDarkAlt, padding:"clamp(6rem,14vh,12rem) clamp(1.5rem,6vw,6rem)" }}>
      <div className="noise-layer" />
      <h2 className="transform-h" style={{ color: T.cream }}>
        The <em>transformation</em> in 30 days
      </h2>
      <div className="ba-strip">
        {[
          {
            title:"Before Vision9", badge:"before",
            points:["Irregular, inconsistent posting schedule","No visual coherence or brand language","Content not aligned with admission goals","High spend, zero qualified leads"],
            good: false
          },
          {
            title:"After Vision9", badge:"after",
            points:["Strategic content planning & cohesive aesthetic","25 high-quality posts — reels, statics, carousels","Intent-driven audience targeting across 3 states","230+ qualified leads · All 40 seats filled"],
            good: true
          }
        ].map((col, ci) => (
          <div key={ci} className="ba-col">
            <div className="ba-col-head">
              <span className="ba-col-title">{col.title}</span>
              <span className={`ba-badge ${col.badge}`}>{col.badge === "before" ? "Before" : "After"}</span>
            </div>
            <div style={{ padding:"1.8rem" }}>
              <p style={{ fontFamily:"'Tenor Sans',sans-serif", fontSize:".48rem", letterSpacing:".18em", textTransform:"uppercase", color:T.muted, marginBottom:".8rem" }}>
                {ci === 0 ? "Page state before engagement" : "Transformed — 30-day execution"}
              </p>
              <div className="ig-grid">
                {IG_POSTS.map((p, i) => (
                  <div key={i} className={`ig-cell${ci === 1 ? " active" : ""}`}>
                    <div className="shimmer" />
                    <div className="ig-overlay"><div className="ig-overlay-txt">{p}</div></div>
                  </div>
                ))}
              </div>
              <ul className={`ba-points${col.good ? " good" : ""}`} style={{ marginTop:"1.5rem" }}>
                {col.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ════ S3 — STRATEGY ════ */}
    <section id="s3">
      <div className="s3-inner">
        <div>
          <div className="sec-eyebrow" style={{ color:T.accent }}>03 — Strategy</div>
          <h2 className="strategy-h">Rethinking <em>the approach</em></h2>
          <p className="strategy-p">Instead of mass marketing, Vision9 proposed a focused digital admission funnel built around three pillars.</p>
          <div className="pillar-list">
            {[
              "Strong content that speaks directly to prospective students",
              "Precise audience targeting across Karnataka, Goa & Maharashtra borders",
              "Direct WhatsApp lead flow for instant conversion",
            ].map((r, i) => (
              <div key={i} className="pillar-row">
                <span className="p-num">0{i+1}</span>
                <span className="p-txt">{r}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily:"'Tenor Sans',sans-serif", fontSize:".5rem", letterSpacing:".2em", textTransform:"uppercase", color:T.muted, marginBottom:"1.2rem" }}>Content Execution</p>
          <div className="exec-grid">
            {[
              { n:"25", tag:"Total Content Pieces", title:"High-Quality Creatives", desc:"A full content suite designed around one goal: driving admission inquiries." },
              { n:"10", tag:"Video Content",        title:"Reels & Video Posts",    desc:"Campus life, courses, career scope — storytelling that built trust and intent." },
              { n:"15", tag:"Static & Carousel",    title:"Posters & Info Cards",   desc:"Admission-open posters plus value-driven content to warm audiences." },
              { n:"03", tag:"Target Regions",       title:"Geo-Targeted Campaigns", desc:"Karnataka (Belagavi & nearby) · Goa · Maharashtra border regions." },
            ].map((c, i) => (
              <div key={i} className="exec-card">
                <div className="exec-n">{c.n}</div>
                <span className="exec-tag">{c.tag}</span>
                <div className="exec-title">{c.title}</div>
                <p className="exec-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ════ HSCROLL STRIP ════ */}
    <div className="hscroll-wrap">
      <div className="hscroll-track">
        {[
          { n:"97,460",   l:"Unique Users Reached",   d:"Across Karnataka, Goa & Maharashtra" },
          { n:"186,541",  l:"Total Impressions",       d:"Combined across all campaigns" },
          { n:"219+",     l:"WhatsApp Leads",          d:"High-intent direct conversations" },
          { n:"₹20.29",   l:"Cost Per Lead",           d:"Achieved with strategic allocation" },
          { n:"₹2.66",    l:"Cost Per Click",          d:"Efficient traffic across all ads" },
          { n:"40/40",    l:"Seats Filled",            d:"Every allotted seat, zero remaining" },
          { n:"30",       l:"Days to Close",           d:"Complete admission cycle in one month" },
          { n:"94%",      l:"Campaign Success Rate",   d:"Across all ads run in the campaign" },
        ].map((c, i) => (
          <div key={i} className="hscroll-card">
            <span className="hscroll-num">{c.n}</span>
            <span className="hscroll-lbl">{c.l}</span>
            <p className="hscroll-desc">{c.d}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ════ S4 — RESULTS ════ */}
    <section id="s4">
      <div className="s4-glow" />
      <div className="noise-layer" style={{ opacity:.025 }} />
      <div className="sec-eyebrow" style={{ color:T.accent, marginBottom:"1.2rem" }}>04 — Campaign Results</div>
      <h2 className="results-h">The <em>numbers</em><br />speak.</h2>
      <div className="r-grid">
        {[
          { raw:"219",     suffix:"+",  lbl:"WhatsApp Leads",    desc:"High-intent messaging leads generated through focused targeting and creatives." },
          { raw:"97460",   suffix:"",   lbl:"Users Reached",     desc:"Unique people reached across Karnataka, Goa, and Maharashtra border regions." },
          { raw:"186541",  suffix:"",   lbl:"Total Impressions", desc:"Combined impressions across all campaigns during the 30-day window." },
          { raw:"20",      suffix:".29 CPL", lbl:"₹ Cost Per Lead", desc:"Achieved efficient CPL with strategic budget allocation and optimised creatives." },
        ].map((c, i) => (
          <div key={i} className="r-card">
            <span className="r-lbl">{c.lbl}</span>
            <span className="r-num">
              {c.lbl === "₹ Cost Per Lead" ? "₹" : ""}
              <CountNum raw={c.raw} suffix={c.suffix} active={countersOn} />
            </span>
            <p className="r-desc">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="ad-row" style={{ marginTop:"2rem" }}>
        {[
          { big:"₹2.66", lbl:"Cost Per Click", p:"Drove consistent, high-quality traffic at exceptional efficiency with strong creative resonance." },
          { big:"186K+",  lbl:"Total Impressions", p:"Massive impression volume across the 30-day campaign window, building awareness and recall." },
          { big:"94%",    lbl:"Campaign Success Rate", p:"Across all ads run — precise targeting, strong creatives, and optimised bidding." },
        ].map((a, i) => (
          <div key={i} className="ad-card">
            <span className="ad-big">{a.big}</span>
            <span className="ad-sub">{a.lbl}</span>
            <p className="ad-p">{a.p}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ════ S5 — OUTCOME ════ */}
    <section id="s5">
      <div className="noise-layer" />
      <div className="outcome-bg-word">CLOSED</div>
      <div className="sec-eyebrow" style={{ color:T.accent, marginBottom:"1.2rem" }}>05 — The Outcome</div>
      <h2 className="outcome-h">What <em>actually happened</em></h2>
      <div className="oc-grid">
        {[
          { raw:"230",  suffix:"+",   lbl:"Qualified Leads",   desc:"Total qualified admission leads generated within the 30-day campaign window.", ghost:"01" },
          { raw:"40",   suffix:"/40", lbl:"Seats Filled",      desc:"Every single seat was filled. Additional interested candidates couldn't be accommodated.", ghost:"02" },
          { raw:"0",    suffix:"",    lbl:"Seats Remaining",   desc:"What ₹55,000+ in traditional spend failed to achieve, a digital strategy delivered in 30 days.", ghost:"03" },
        ].map((c, i) => (
          <div key={i} className="oc-card">
            <div className="oc-ghost">{c.ghost}</div>
            <span className="oc-num">
              <CountNum raw={c.raw} suffix={c.suffix} active={ocCountersOn} />
            </span>
            <span className="oc-lbl">{c.lbl}</span>
            <p className="oc-desc">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="outcome-bottom">
        <p className="outcome-quote">
          "What traditional advertising failed to achieve with heavy spending, a strategic, performance-led digital approach delivered in just <em>one month.</em>"
        </p>
        <div className="mini-stats">
          {[
            { v:"₹20.29", l:"Cost Per Lead" },
            { v:"₹2.66",  l:"Cost Per Click" },
            { v:"97,460", l:"Users Reached" },
            { v:"30 Days",l:"Time to Close" },
          ].map((s, i) => (
            <div key={i} className="mini-stat">
              <span className="mini-v">{s.v}</span>
              <span className="mini-l">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ════ S6 — TESTIMONIAL ════ */}
    <section id="s6">
      <div className="noise-layer" style={{ opacity:.03 }} />
      <div className="testi-glow" />
      <div className="testi-inner">
        <span className="testi-mark">❝</span>
        <p className="testi-q">
          "Vision9 has transformed our page into a visually appealing platform through their expert editing skills and well-planned content strategies. Their services enabled us to connect with a wide audience of fashion enthusiasts and significantly increased our digital presence."
        </p>
        <div className="testi-divider" />
        <div className="testi-name">Prof. Mahantesh C.</div>
        <span className="testi-role">Principal · KLE's Institute of Fashion Technology &amp; Apparel Design</span>
      </div>
    </section>

    {/* ════ S7 — CTA ════ */}
    <section id="s7">
      <div className="noise-layer" style={{ opacity:.03 }} />
      <div className="cta-bg-word">VISION9</div>
      <div className="cta-inner">
        <div className="cta-eyebrow"><span />Ready to grow?<span /></div>
        <h2 className="cta-h">Let's Build Brands<br />That <em>Perform</em></h2>
        <p className="cta-p">Partner with Vision9 to move from ideas to execution — and from execution to measurable growth that compounds over time.</p>
        <div className="cta-btns">
          <a href="/contact" className="btn-solid">Book a Strategy Call</a>
          <a href="/case_studies" className="btn-outline">View More Case Studies</a>
        </div>
      </div>
    </section>
    <Footer/>
  </>);
}