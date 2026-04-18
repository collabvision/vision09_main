// "use client";

// /* ═══════════════════════════════════════════════
//    VISION9 · Leadsfinder Group Case Study
   
//    DESIGN PHILOSOPHY: "Editorial Luxury Documentary"
//    — Think: Wallpaper* magazine meets Bloomberg Businessweek
//    — No GSAP async loading. All animations via CSS keyframes
//      + IntersectionObserver (zero external deps).
//    — Sections use radically different layouts so every scroll
//      feels like turning a page.
// ═══════════════════════════════════════════════ */

// const T = {
//   accent:     "#d2ce12",
//   accentDim:  "#a6a216",
//   accentDark: "#737017",
//   accentGlow: "rgba(210,206,18,0.15)",

//   dark:       "#0c0b08",
//   dark2:      "#161410",
//   dark3:      "#1e1b14",
//   dark4:      "#252218",

//   cream:      "#fffee9",
//   creamDim:   "rgba(255,254,233,0.55)",
//   creamFaint: "rgba(255,254,233,0.18)",

//   light:      "#fffee9",
//   lightAlt:   "#f5f2c8",

//   text:       "#231f1f",
//   textSec:    "#58564d",
//   muted:      "#a19f8a",

//   gold:       "rgba(210,206,18,0.2)",
//   goldFaint:  "rgba(210,206,18,0.08)",
// };

// import { useEffect, useRef, useState } from "react";
// import Header from "../../../components/custom/Header";
// import Footer from "../../../components/custom/Footer";

// const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700;1,900&family=Tenor+Sans&family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;1,300&display=swap');`;

// /* ─────────────────────────────────────────────
//    ALL STYLES — zero external CSS deps
// ───────────────────────────────────────────── */
// const CSS = `
// ${FONTS}

// *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
// html{scroll-behavior:smooth}
// body{background:${T.dark};color:${T.cream};font-family:'DM Sans',sans-serif;
//   font-weight:300;overflow-x:hidden;cursor:none}

// /* ═══ CURSOR ═══ */
// #vxc{width:10px;height:10px;background:${T.accent};position:fixed;z-index:9999;
//   pointer-events:none;transform:translate(-50%,-50%);
//   transition:width .25s,height .25s,background .25s,border-radius .25s}
// #vxc.xl{width:52px;height:52px;background:transparent;border:1px solid ${T.accent};border-radius:0}
// #vxr{width:36px;height:36px;border:1px solid rgba(210,206,18,.25);position:fixed;z-index:9998;
//   pointer-events:none;transform:translate(-50%,-50%)}

// /* ═══ PROGRESS ═══ */
// #vxp{position:fixed;top:0;left:0;height:1.5px;width:0%;z-index:8000;
//   background:linear-gradient(90deg,${T.accentDark},${T.accent},#fff98a)}

// /* ═══ NOISE TEXTURE ═══ */
// .nx{position:absolute;inset:0;pointer-events:none;z-index:1;
//   background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E");
//   background-size:180px;opacity:.022}

// /* ═══ SHARED ═══ */
// .lbl{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.28em;
//   text-transform:uppercase;color:${T.accentDim}}
// .lbl-light{color:${T.muted}}
// .serif{font-family:'Playfair Display',serif}

// /* ═══ CSS REVEAL (IntersectionObserver sets .vis) ═══ */
// .rv{opacity:0;transform:translateY(48px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
// .rv.vis{opacity:1;transform:translateY(0)}
// .rv-l{opacity:0;transform:translateX(-60px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
// .rv-l.vis{opacity:1;transform:translateX(0)}
// .rv-r{opacity:0;transform:translateX(60px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
// .rv-r.vis{opacity:1;transform:translateX(0)}
// .rv-s{opacity:0;transform:scale(.94);transition:opacity .85s ease,transform .85s cubic-bezier(.16,1,.3,1)}
// .rv-s.vis{opacity:1;transform:scale(1)}
// .d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}
// .d4{transition-delay:.32s}.d5{transition-delay:.40s}.d6{transition-delay:.48s}

// /* ═══════════════════════════════════════════
//    SECTION 0 — HERO
//    Full-viewport. Giant headline. Cinematic dark.
// ════════════════════════════════════════════ */
// #s0{min-height:100vh;background:${T.dark};position:relative;overflow:hidden;
//   display:flex;flex-direction:column;justify-content:flex-end}

// /* animated grid bg */
// .hero-grid{position:absolute;inset:0;z-index:0;
//   background-image:
//     linear-gradient(rgba(210,206,18,.035) 1px,transparent 1px),
//     linear-gradient(90deg,rgba(210,206,18,.035) 1px,transparent 1px);
//   background-size:72px 72px;
//   animation:gridDrift 20s ease-in-out infinite alternate}
// @keyframes gridDrift{0%{background-position:0 0}100%{background-position:36px 36px}}

// /* glowing orbs */
// .orb1{position:absolute;width:700px;height:700px;border-radius:50%;
//   background:radial-gradient(circle,rgba(210,206,18,.09) 0%,transparent 65%);
//   top:-15%;right:-10%;animation:orbFloat 12s ease-in-out infinite}
// .orb2{position:absolute;width:500px;height:500px;border-radius:50%;
//   background:radial-gradient(circle,rgba(210,206,18,.06) 0%,transparent 65%);
//   bottom:-10%;left:-5%;animation:orbFloat 15s ease-in-out infinite reverse}
// @keyframes orbFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(24px,-32px)}}

// /* scan line */
// .scan-line{position:absolute;left:0;right:0;height:1px;z-index:2;
//   background:linear-gradient(90deg,transparent,rgba(210,206,18,.35),transparent);
//   animation:scanDown 8s linear infinite}
// @keyframes scanDown{0%{top:-1%}100%{top:102%}}

// .hero-inner{position:relative;z-index:10;padding:0 clamp(1.5rem,7vw,7rem) clamp(4rem,8vh,7rem)}

// /* GIANT stacked headline — slides up from clip */
// .hero-tag-row{display:flex;align-items:center;gap:1rem;margin-bottom:2.5rem;
//   flex-wrap:wrap;opacity:0;animation:fadeUp .7s .1s ease forwards}
// .hero-tag{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.26em;
//   text-transform:uppercase;color:${T.accent};padding:.3rem .9rem;
//   border:1px solid rgba(210,206,18,.3)}
// .hero-sep{width:1px;height:12px;background:rgba(210,206,18,.2)}

// .h1-clip{overflow:hidden;line-height:.88}
// .h1-line{font-family:'Playfair Display',serif;font-weight:900;
//   font-size:clamp(4rem,13vw,14rem);letter-spacing:-.03em;
//   display:block;color:${T.cream};
//   transform:translateY(110%);animation:slideUp 1s cubic-bezier(.16,1,.3,1) forwards}
// .h1-line.acc{color:${T.accent};font-style:italic}
// .h1-line.ghost{color:transparent;-webkit-text-stroke:1px rgba(255,254,233,.1)}
// .h1-line.d1{animation-delay:.3s}
// .h1-line.d2{animation-delay:.48s}
// .h1-line.d3{animation-delay:.64s}
// @keyframes slideUp{to{transform:translateY(0)}}
// @keyframes fadeUp{to{opacity:1;transform:translateY(0)}}

// /* kicker sub text */
// .hero-meta{display:flex;gap:clamp(2rem,5vw,5rem);margin-top:3rem;flex-wrap:wrap;
//   opacity:0;animation:fadeUp .8s 1s ease forwards}
// .hero-stat{display:flex;flex-direction:column}
// .hs-n{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,3.2rem);
//   color:${T.accent};font-weight:700;line-height:1}
// .hs-l{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.18em;
//   text-transform:uppercase;color:rgba(255,254,233,.3);margin-top:.3rem}
// .hero-divider{width:1px;height:48px;background:rgba(210,206,18,.18);align-self:center}
// .hero-sub{max-width:420px;font-size:clamp(.85rem,1.3vw,.95rem);line-height:1.88;
//   color:rgba(255,254,233,.42);align-self:flex-end}

// /* scroll cue */
// .hero-scroll{position:absolute;right:clamp(1.5rem,4vw,4rem);bottom:clamp(2rem,5vh,4rem);
//   display:flex;flex-direction:column;align-items:center;gap:.5rem;z-index:10;
//   opacity:0;animation:fadeUp .6s 1.5s forwards}
// .scroll-bar{width:1px;height:56px;background:linear-gradient(${T.accent},transparent);
//   animation:scrollPulse 2.2s ease-in-out infinite}
// @keyframes scrollPulse{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(.35);opacity:.35}}
// .scroll-lbl{font-family:'Tenor Sans',sans-serif;font-size:.42rem;letter-spacing:.2em;
//   text-transform:uppercase;color:${T.accentDim};writing-mode:vertical-rl}

// /* side chapter dots */
// #ch-nav{position:fixed;right:clamp(.8rem,2vw,2rem);top:50%;transform:translateY(-50%);
//   z-index:5000;display:flex;flex-direction:column;gap:.8rem;align-items:flex-end}
// .ch-pip{width:5px;height:5px;background:rgba(210,206,18,.25);cursor:pointer;
//   transition:background .3s,width .3s,height .3s}
// .ch-pip.on{background:${T.accent};width:18px;height:3px}

// /* ═══════════════════════════════════════════
//    TICKER
// ════════════════════════════════════════════ */
// .ticker-wrap{height:48px;background:${T.accent};overflow:hidden;display:flex;align-items:center;
//   position:relative;z-index:5}
// .ticker-track{display:flex;white-space:nowrap;animation:ticker 30s linear infinite}
// .tk{font-family:'Playfair Display',serif;font-weight:700;font-size:.82rem;
//   letter-spacing:.22em;text-transform:uppercase;color:${T.dark};
//   padding:0 2.5rem;display:flex;align-items:center;gap:1.5rem}
// .tk-dot{width:4px;height:4px;background:${T.dark};transform:rotate(45deg);opacity:.4}
// @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

// /* ═══════════════════════════════════════════
//    SECTION 1 — OVERVIEW
//    Layout: Large number column left + text right
//    Background: dark with geometric lines
// ════════════════════════════════════════════ */
// #s1{background:${T.dark2};padding:clamp(6rem,14vh,12rem) clamp(1.5rem,7vw,7rem);
//   position:relative;overflow:hidden}

// /* decorative diagonal */
// .s1-diag{position:absolute;top:0;right:0;width:45%;height:100%;
//   background:linear-gradient(135deg,transparent 0%,rgba(210,206,18,.025) 100%);
//   pointer-events:none;z-index:0}

// .s1-layout{display:grid;grid-template-columns:auto 1fr;gap:clamp(3rem,8vw,10rem);
//   align-items:start;position:relative;z-index:2}

// /* mega number sidebar */
// .s1-mega{writing-mode:vertical-rl;font-family:'Playfair Display',serif;font-weight:900;
//   font-size:clamp(5rem,15vw,14rem);color:transparent;
//   -webkit-text-stroke:1px rgba(210,206,18,.12);line-height:1;
//   letter-spacing:-.04em;user-select:none;transform:rotate(180deg)}

// .s1-content .eyebrow-row{display:flex;align-items:center;gap:.8rem;margin-bottom:1.5rem}
// .eyebrow-line{width:32px;height:1px;background:${T.accent};display:inline-block}

// .s1-h{font-family:'Playfair Display',serif;font-weight:700;
//   font-size:clamp(2rem,4.5vw,4.5rem);line-height:1.05;letter-spacing:-.02em;
//   color:${T.cream};margin-bottom:1.5rem}
// .s1-h em{color:${T.accent};font-style:italic}

// .s1-p{font-size:clamp(.88rem,1.35vw,.98rem);line-height:1.95;
//   color:rgba(255,254,233,.45);margin-bottom:1.2rem}

// /* verticals — horizontal pill row */
// .vert-pills{display:flex;flex-wrap:wrap;gap:.6rem;margin:2rem 0}
// .vert-pill{display:flex;align-items:center;gap:.7rem;
//   border:1px solid rgba(210,206,18,.2);padding:.6rem 1.2rem;
//   transition:border-color .3s,background .3s;cursor:default}
// .vert-pill:hover{border-color:${T.accent};background:rgba(210,206,18,.04)}
// .vert-pill-n{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.16em;
//   color:${T.accentDim};text-transform:uppercase}
// .vert-pill-name{font-family:'Playfair Display',serif;font-size:clamp(.9rem,1.5vw,1.1rem);
//   font-weight:600;color:${T.cream}}
// .vert-pill-tag{font-family:'Tenor Sans',sans-serif;font-size:.42rem;letter-spacing:.14em;
//   text-transform:uppercase;color:rgba(210,206,18,.5);margin-left:.4rem}

// /* challenge callout — bordered inset */
// .challenge-inset{border-left:2px solid ${T.accent};padding:1.5rem 2rem;
//   background:rgba(210,206,18,.04);margin-top:2rem;position:relative}
// .challenge-inset::before{content:'';position:absolute;top:0;left:-2px;height:30%;
//   width:2px;background:${T.accent}}
// .ci-quote{font-family:'Playfair Display',serif;font-size:clamp(1rem,1.8vw,1.4rem);
//   font-style:italic;color:${T.cream};line-height:1.55}
// .ci-quote em{color:${T.accent}}
// .ci-attr{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.2em;
//   text-transform:uppercase;color:${T.accentDim};margin-top:.8rem;display:block}

// /* issues — numbered list */
// .issues-list{margin-top:2rem}
// .issue-item{display:flex;align-items:flex-start;gap:1rem;padding:.75rem 0;
//   border-bottom:1px solid rgba(210,206,18,.07)}
// .issue-item:last-child{border-bottom:none}
// .issue-n{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.14em;
//   color:${T.accent};min-width:1.8rem;flex-shrink:0;padding-top:.1rem}
// .issue-txt{font-size:clamp(.82rem,1.2vw,.92rem);line-height:1.75;
//   color:rgba(255,254,233,.4)}

// /* ═══════════════════════════════════════════
//    SECTION 2 — STRATEGY
//    Layout: Full-width magazine spread
//    Light background with dark type
// ════════════════════════════════════════════ */
// #s2{background:${T.light};padding:clamp(6rem,14vh,12rem) clamp(1.5rem,7vw,7rem);
//   position:relative;overflow:hidden}

// /* big BG word */
// .s2-bg-word{position:absolute;bottom:-4%;right:-2%;
//   font-family:'Playfair Display',serif;font-weight:900;
//   font-size:clamp(7rem,22vw,22rem);color:transparent;
//   -webkit-text-stroke:1px rgba(115,112,23,.07);pointer-events:none;
//   line-height:1;user-select:none}

// .s2-top{display:grid;grid-template-columns:1fr 1fr;gap:clamp(3rem,8vw,8rem);
//   margin-bottom:clamp(4rem,8vh,7rem);position:relative;z-index:2}
// .s2-h{font-family:'Playfair Display',serif;font-weight:700;
//   font-size:clamp(2.2rem,5vw,5rem);line-height:1.0;letter-spacing:-.025em;
//   color:${T.text}}
// .s2-h em{color:${T.accentDim};font-style:italic}
// .s2-p{font-size:clamp(.88rem,1.35vw,.98rem);line-height:1.95;color:${T.textSec}}

// /* pillar list */
// .s2-pillars{border-top:1px solid rgba(115,112,23,.15);position:relative;z-index:2}
// .pillar-item{display:flex;align-items:center;gap:1.5rem;padding:1.4rem 0;
//   border-bottom:1px solid rgba(115,112,23,.1);cursor:default;
//   transition:padding .3s,background .3s}
// .pillar-item:hover{padding-left:.6rem;background:rgba(115,112,23,.03)}
// .pillar-item:hover .pi-n{color:${T.accentDim}}
// .pillar-item:hover .pi-txt{color:${T.text}}
// .pi-n{font-family:'Playfair Display',serif;font-size:.9rem;color:${T.muted};
//   min-width:2.5rem;flex-shrink:0;transition:color .3s}
// .pi-txt{font-family:'Playfair Display',serif;font-size:clamp(1rem,2vw,1.5rem);
//   font-weight:500;color:${T.textSec};line-height:1.35;flex:1;transition:color .3s}
// .pi-arrow{color:${T.accentDim};opacity:0;transform:translateX(-8px);
//   transition:opacity .3s,transform .3s;font-size:1.1rem}
// .pillar-item:hover .pi-arrow{opacity:1;transform:translateX(0)}

// /* strategy cards — 2×2 grid */
// .s2-card-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
//   background:rgba(115,112,23,.15);border:1px solid rgba(115,112,23,.15);
//   margin-top:clamp(3rem,7vh,6rem);position:relative;z-index:2}
// .s2-card{background:${T.light};padding:clamp(1.5rem,3vw,2.5rem);position:relative;
//   overflow:hidden;cursor:default;transition:background .35s}
// .s2-card:hover{background:${T.lightAlt}}
// .s2-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;
//   background:linear-gradient(90deg,${T.accentDark},${T.accentDim},${T.accent});
//   transform:scaleX(0);transform-origin:left;transition:transform .55s}
// .s2-card:hover::after{transform:scaleX(1)}
// .sc-ghost{font-family:'Playfair Display',serif;font-size:4.5rem;color:transparent;
//   -webkit-text-stroke:1px rgba(115,112,23,.12);line-height:1;font-weight:900;display:block}
// .sc-tag{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.2em;
//   text-transform:uppercase;color:${T.accentDim};display:block;margin-bottom:.6rem}
// .sc-title{font-family:'Playfair Display',serif;font-size:clamp(.9rem,1.6vw,1.2rem);
//   font-weight:600;color:${T.text};margin-bottom:.4rem;line-height:1.25}
// .sc-desc{font-size:clamp(.76rem,1.1vw,.85rem);line-height:1.82;color:${T.textSec}}

// /* ═══════════════════════════════════════════
//    SECTION 3 — VERTICALS DEEP DIVE
//    Layout: Full-bleed dark, 3 accordion-style blocks
// ════════════════════════════════════════════ */
// #s3{background:${T.dark};position:relative;overflow:hidden;
//   padding:clamp(6rem,14vh,12rem) clamp(1.5rem,7vw,7rem)}
// .s3-header{display:flex;align-items:flex-end;justify-content:space-between;
//   margin-bottom:clamp(3rem,8vh,7rem);flex-wrap:wrap;gap:2rem}
// .s3-h{font-family:'Playfair Display',serif;font-weight:700;
//   font-size:clamp(2.2rem,5vw,5rem);line-height:1;letter-spacing:-.025em;color:${T.cream}}
// .s3-h em{color:${T.accent};font-style:italic}
// .s3-count{font-family:'Playfair Display',serif;font-size:clamp(3rem,8vw,8rem);
//   font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(210,206,18,.2);line-height:1}

// /* vertical block — full width horizontal strips */
// .vert-block{border-top:1px solid rgba(210,206,18,.12);padding:clamp(2.5rem,6vh,5rem) 0;
//   position:relative}
// .vert-block:last-child{border-bottom:1px solid rgba(210,206,18,.12)}

// /* block header — clickable label */
// .vb-header{display:flex;align-items:center;gap:2rem;margin-bottom:2rem;cursor:default}
// .vb-num{font-family:'Playfair Display',serif;font-size:clamp(3rem,6vw,5rem);
//   font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(210,206,18,.25);
//   line-height:1;min-width:5rem}
// .vb-title-wrap{flex:1}
// .vb-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.24em;
//   text-transform:uppercase;color:${T.accentDim};margin-bottom:.4rem}
// .vb-title{font-family:'Playfair Display',serif;font-weight:700;
//   font-size:clamp(1.5rem,3.5vw,3rem);color:${T.cream};line-height:1.05;letter-spacing:-.015em}
// .vb-title em{color:${T.accent};font-style:italic}
// .vb-total{text-align:right;flex-shrink:0}
// .vbt-n{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3.5rem);
//   color:${T.accent};font-weight:700;display:block;line-height:1}
// .vbt-l{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.18em;
//   text-transform:uppercase;color:rgba(210,206,18,.4);display:block;margin-top:.2rem}

// /* block body — 3 col */
// .vb-body{display:grid;grid-template-columns:1fr 1fr 1fr;gap:clamp(1.5rem,4vw,4rem)}
// .vb-desc p{font-size:clamp(.86rem,1.3vw,.95rem);line-height:1.9;
//   color:rgba(255,254,233,.42);margin-bottom:.9rem}

// /* market tags */
// .mkt-row{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.8rem}
// .mkt-tag{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.16em;
//   text-transform:uppercase;color:${T.accentDim};border:1px solid rgba(210,206,18,.25);
//   padding:.25rem .65rem;transition:background .3s,color .3s}
// .mkt-tag:hover{background:${T.accent};color:${T.dark}}

// /* exec steps */
// .exec-steps{display:flex;flex-direction:column;gap:0}
// .exec-step{display:flex;align-items:flex-start;gap:.9rem;padding:.8rem 0;
//   border-bottom:1px solid rgba(210,206,18,.07);transition:background .3s}
// .exec-step:last-child{border-bottom:none}
// .exec-step:hover{background:rgba(210,206,18,.03);padding-left:.3rem}
// .es-n{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.14em;
//   color:${T.accentDim};flex-shrink:0;padding-top:.1rem}
// .es-t{font-size:clamp(.8rem,1.15vw,.88rem);line-height:1.72;color:rgba(255,254,233,.42)}

// /* lead result cards — horizontal bar style */
// .lead-bars{display:flex;flex-direction:column;gap:.6rem}
// .lead-bar{display:flex;align-items:center;gap:1rem;padding:.8rem 1.2rem;
//   background:rgba(210,206,18,.04);border:1px solid rgba(210,206,18,.1);
//   position:relative;overflow:hidden;transition:background .3s}
// .lead-bar:hover{background:rgba(210,206,18,.08)}
// .lead-bar::before{content:'';position:absolute;top:0;left:0;height:100%;
//   background:rgba(210,206,18,.06);transition:width .8s ease}
// .lb-country{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.14em;
//   text-transform:uppercase;color:rgba(255,254,233,.4);min-width:5rem;flex-shrink:0}
// .lb-n{font-family:'Playfair Display',serif;font-size:clamp(1.3rem,2.5vw,2rem);
//   color:${T.accent};font-weight:700;line-height:1;flex-shrink:0;min-width:3rem}
// .lb-lbl{font-family:'Tenor Sans',sans-serif;font-size:.42rem;letter-spacing:.12em;
//   text-transform:uppercase;color:rgba(255,254,233,.25)}

// /* ═══════════════════════════════════════════
//    HSCROLL STRIP
// ════════════════════════════════════════════ */
// .hscroll-outer{overflow:hidden;background:${T.dark4};
//   border-top:1px solid rgba(210,206,18,.1);border-bottom:1px solid rgba(210,206,18,.1)}
// .hscroll-inner{display:flex;gap:1.5rem;padding:2rem 2rem;width:max-content}
// .hs-card{flex-shrink:0;width:240px;border:1px solid rgba(210,206,18,.15);
//   padding:1.6rem 1.8rem;background:${T.dark3};position:relative;overflow:hidden;
//   transition:border-color .3s,background .3s;cursor:default}
// .hs-card:hover{border-color:rgba(210,206,18,.35);background:${T.dark4}}
// .hs-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
//   background:linear-gradient(90deg,transparent,${T.accent},transparent)}
// .hs-n{font-family:'Playfair Display',serif;font-size:2.2rem;color:${T.accent};
//   font-weight:700;line-height:1;display:block}
// .hs-l{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.16em;
//   text-transform:uppercase;color:rgba(255,254,233,.35);margin:.3rem 0 .5rem;display:block}
// .hs-d{font-size:.82rem;line-height:1.7;color:rgba(255,254,233,.35)}

// /* ═══════════════════════════════════════════
//    SECTION 4 — RESULTS
//    Layout: HUGE full-bleed numbers, cinematic dark
//    Unique: numbers count up on scroll
// ════════════════════════════════════════════ */
// #s4{background:${T.dark2};position:relative;overflow:hidden;
//   padding:clamp(6rem,14vh,12rem) clamp(1.5rem,7vw,7rem)}
// .s4-glow{position:absolute;top:-20%;left:50%;transform:translateX(-50%);
//   width:900px;height:600px;
//   background:radial-gradient(ellipse,rgba(210,206,18,.07) 0%,transparent 65%);pointer-events:none}

// .s4-head{display:grid;grid-template-columns:1fr 1fr;gap:4rem;margin-bottom:clamp(4rem,10vh,8rem);
//   align-items:end;position:relative;z-index:2}
// .s4-h{font-family:'Playfair Display',serif;font-weight:700;
//   font-size:clamp(2.5rem,6vw,6rem);line-height:.95;letter-spacing:-.03em;color:${T.cream}}
// .s4-h em{color:${T.accent};font-style:italic}
// .s4-sub{font-size:clamp(.88rem,1.35vw,.98rem);line-height:1.88;
//   color:rgba(255,254,233,.38);align-self:flex-end}

// /* BIG 4-across number grid */
// .r-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
//   background:rgba(210,206,18,.08);border:1px solid rgba(210,206,18,.08);
//   position:relative;z-index:2}
// .r-card{background:${T.dark3};padding:clamp(2rem,4vw,3.5rem) clamp(1.5rem,3vw,2.5rem);
//   position:relative;overflow:hidden;cursor:default;transition:background .4s}
// .r-card:hover{background:${T.dark4}}
// .r-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;
//   background:linear-gradient(90deg,${T.accentDark},${T.accent},#fff98a);
//   transform:scaleX(0);transform-origin:left;transition:transform .6s}
// .r-card:hover::after{transform:scaleX(1)}
// .r-lbl{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.18em;
//   text-transform:uppercase;color:rgba(255,254,233,.35);display:block;margin-bottom:.6rem}
// .r-num{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,6vw,5.5rem);
//   color:${T.accent};line-height:1;display:block;font-weight:700;margin-bottom:.4rem}
// .r-desc{font-size:clamp(.74rem,1.05vw,.84rem);line-height:1.75;color:rgba(255,254,233,.28)}

// /* breakdown table — styled like a Bloomberg data table */
// .breakdown{margin-top:clamp(3rem,7vh,6rem);position:relative;z-index:2}
// .bd-title{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.24em;
//   text-transform:uppercase;color:${T.accentDim};margin-bottom:1.5rem;
//   display:flex;align-items:center;gap:.8rem}
// .bd-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(210,206,18,.3),transparent)}
// .bd-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
// .bd-col{border:1px solid rgba(210,206,18,.12);overflow:hidden}
// .bd-col-head{background:rgba(210,206,18,.07);padding:1rem 1.5rem;
//   border-bottom:1px solid rgba(210,206,18,.1);
//   display:flex;align-items:center;justify-content:space-between}
// .bch-name{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:${T.cream}}
// .bch-icon{font-size:.9rem;opacity:.5}
// .bd-rows{padding:.4rem 0}
// .bd-row{display:flex;align-items:center;justify-content:space-between;
//   padding:.65rem 1.5rem;border-bottom:1px solid rgba(210,206,18,.05);
//   transition:background .25s}
// .bd-row:last-child{border-bottom:none}
// .bd-row:hover{background:rgba(210,206,18,.04)}
// .bd-country{font-size:.82rem;color:rgba(255,254,233,.45);line-height:1.4}
// .bd-leads{font-family:'Playfair Display',serif;font-size:1rem;
//   color:${T.accent};font-weight:700;white-space:nowrap}
// .bd-foot{display:flex;align-items:center;justify-content:space-between;
//   padding:.9rem 1.5rem;background:rgba(210,206,18,.05);
//   border-top:1px solid rgba(210,206,18,.12)}
// .bdf-lbl{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.16em;
//   text-transform:uppercase;color:rgba(255,254,233,.35)}
// .bdf-n{font-family:'Playfair Display',serif;font-size:1.5rem;
//   color:${T.accentLight};font-weight:700}

// /* ═══════════════════════════════════════════
//    SECTION 5 — INSIGHT
//    Layout: Full-width editorial, light bg
//    Unique: Large pull-quote + 2×2 takeaway cards
// ════════════════════════════════════════════ */
// #s5{background:${T.lightAlt};position:relative;overflow:hidden;
//   padding:clamp(6rem,14vh,12rem) clamp(1.5rem,7vw,7rem)}
// .s5-bg{position:absolute;bottom:-5%;right:-3%;
//   font-family:'Playfair Display',serif;font-weight:900;
//   font-size:clamp(7rem,22vw,20rem);color:transparent;
//   -webkit-text-stroke:1px rgba(115,112,23,.06);pointer-events:none;line-height:1}

// /* pull-quote hero */
// .s5-pullquote{position:relative;padding:clamp(3rem,7vw,6rem) 0;margin-bottom:clamp(3rem,8vh,6rem);
//   border-top:1px solid rgba(115,112,23,.15);border-bottom:1px solid rgba(115,112,23,.15);
//   position:relative;z-index:2}
// .pq-mark{font-family:'Playfair Display',serif;font-size:5rem;line-height:.3;
//   color:rgba(115,112,23,.15);display:block;margin-bottom:1.8rem}
// .pq-text{font-family:'Playfair Display',serif;font-weight:700;
//   font-size:clamp(1.6rem,4vw,4rem);line-height:1.12;letter-spacing:-.02em;color:${T.text};
//   max-width:900px}
// .pq-text em{color:${T.accentDim};font-style:italic}
// .pq-attr{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.22em;
//   text-transform:uppercase;color:${T.accentDim};margin-top:2rem;display:block}

// /* 2×2 insight grid */
// .s5-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;position:relative;z-index:2}
// .s5-card{border:1px solid rgba(115,112,23,.18);padding:clamp(2rem,4vw,3rem);
//   background:#fff;position:relative;overflow:hidden;
//   transition:transform .35s,border-color .35s,box-shadow .35s}
// .s5-card:hover{transform:translateY(-6px);border-color:${T.accentDim};
//   box-shadow:0 20px 60px rgba(115,112,23,.1)}
// .s5-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
//   background:linear-gradient(90deg,${T.accentDark},${T.accentDim},${T.accent});
//   transform:scaleX(0);transform-origin:left;transition:transform .55s}
// .s5-card:hover::before{transform:scaleX(1)}
// .s5-card::after{content:'';position:absolute;bottom:10px;right:10px;
//   width:18px;height:18px;border-bottom:1px solid rgba(115,112,23,.18);
//   border-right:1px solid rgba(115,112,23,.18)}
// .s5c-n{font-family:'Playfair Display',serif;font-size:4.5rem;color:transparent;
//   -webkit-text-stroke:1px rgba(115,112,23,.12);line-height:1;font-weight:900;display:block}
// .s5c-title{font-family:'Playfair Display',serif;font-size:clamp(1rem,1.9vw,1.4rem);
//   font-weight:600;color:${T.text};margin-bottom:.5rem;line-height:1.2}
// .s5c-desc{font-size:clamp(.78rem,1.15vw,.88rem);line-height:1.85;color:${T.textSec}}

// /* ═══════════════════════════════════════════
//    SECTION 6 — TESTIMONIAL
//    Layout: Full-screen centered, dark, cinematic
// ════════════════════════════════════════════ */
// #s6{background:${T.dark};display:flex;align-items:center;justify-content:center;
//   min-height:70vh;padding:clamp(7rem,18vh,14rem) clamp(1.5rem,7vw,7rem);
//   position:relative;overflow:hidden}
// .s6-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
//   width:700px;height:700px;
//   background:radial-gradient(ellipse,rgba(210,206,18,.07) 0%,transparent 65%);pointer-events:none}
// .testi-inner{max-width:860px;text-align:center;position:relative;z-index:2}
// .testi-mark{font-family:'Playfair Display',serif;font-size:6rem;line-height:.35;
//   color:rgba(210,206,18,.18);display:block;margin-bottom:2.5rem}
// .testi-q{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,2.8vw,2.3rem);
//   font-style:italic;font-weight:400;color:${T.cream};line-height:1.58;margin-bottom:3rem}
// .testi-rule{width:56px;height:1px;
//   background:linear-gradient(90deg,transparent,${T.accent},transparent);margin:0 auto 2rem}
// .testi-name{font-family:'Playfair Display',serif;font-size:clamp(1rem,1.8vw,1.4rem);
//   font-weight:600;color:${T.cream}}
// .testi-role{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.2em;
//   text-transform:uppercase;color:${T.accentDim};display:block;margin-top:.4rem}

// /* ═══════════════════════════════════════════
//    SECTION 7 — CTA
//    Layout: Bold centered with ghost type, dark
// ════════════════════════════════════════════ */
// #s7{background:${T.dark2};display:flex;align-items:center;justify-content:center;
//   min-height:80vh;padding:clamp(7rem,18vh,14rem) clamp(1.5rem,7vw,7rem);
//   position:relative;overflow:hidden;border-top:1px solid rgba(210,206,18,.08)}
// .cta-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
//   font-family:'Playfair Display',serif;font-weight:900;
//   font-size:clamp(6rem,22vw,22rem);color:transparent;
//   -webkit-text-stroke:1px rgba(210,206,18,.04);white-space:nowrap;pointer-events:none;
//   animation:ghostPulse 10s ease-in-out infinite}
// @keyframes ghostPulse{0%,100%{letter-spacing:.02em;opacity:.7}50%{letter-spacing:.1em;opacity:1}}
// .cta-inner{text-align:center;position:relative;z-index:2;max-width:820px}
// .cta-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.28em;
//   text-transform:uppercase;color:${T.accentDim};margin-bottom:1.6rem;
//   display:flex;align-items:center;gap:.8rem;justify-content:center}
// .cta-eyebrow span{width:28px;height:1px;background:${T.accentDim};display:inline-block}
// .cta-h{font-family:'Playfair Display',serif;font-weight:700;
//   font-size:clamp(2.5rem,7vw,7rem);line-height:.95;letter-spacing:-.03em;
//   color:${T.cream};margin-bottom:1.5rem}
// .cta-h em{color:${T.accent};font-style:italic}
// .cta-p{font-size:clamp(.9rem,1.4vw,1rem);line-height:1.9;
//   color:rgba(255,254,233,.38);max-width:520px;margin:0 auto 3rem}
// .cta-btns{display:flex;gap:1.2rem;justify-content:center;flex-wrap:wrap}
// .btn-fill{background:${T.accent};color:${T.dark};font-family:'Playfair Display',serif;
//   font-size:.88rem;font-weight:700;letter-spacing:.18em;padding:1.1rem 3rem;border:none;
//   cursor:pointer;text-transform:uppercase;text-decoration:none;display:inline-flex;
//   align-items:center;gap:.6rem;position:relative;overflow:hidden;
//   transition:background .3s,transform .3s}
// .btn-fill::after{content:'';position:absolute;inset:0;
//   background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
//   transform:translateX(-100%);transition:transform .4s}
// .btn-fill:hover::after{transform:translateX(100%)}
// .btn-fill:hover{background:${T.accentDim};transform:translateY(-2px);color:${T.cream}}
// .btn-stroke{background:transparent;color:${T.cream};font-family:'Playfair Display',serif;
//   font-size:.88rem;font-weight:600;letter-spacing:.18em;padding:1.1rem 3rem;
//   border:1px solid rgba(210,206,18,.35);cursor:pointer;text-transform:uppercase;
//   text-decoration:none;display:inline-flex;align-items:center;gap:.6rem;
//   transition:border-color .3s,color .3s,transform .3s}
// .btn-stroke:hover{border-color:${T.accent};color:${T.accent};transform:translateY(-2px)}

// /* ═══ RESPONSIVE ═══ */
// @media(max-width:1024px){
//   .s2-card-grid{grid-template-columns:1fr 1fr}
//   .vb-body{grid-template-columns:1fr 1fr}
//   .r-grid{grid-template-columns:repeat(2,1fr)}
//   .bd-grid{grid-template-columns:1fr}
//   .s2-top{grid-template-columns:1fr}
//   .s4-head{grid-template-columns:1fr}
//   #ch-nav{display:none}
// }
// @media(max-width:768px){
//   .s1-layout{grid-template-columns:1fr}
//   .s1-mega{writing-mode:horizontal-tb;transform:none;font-size:6rem;
//     -webkit-text-stroke:1px rgba(210,206,18,.08)}
//   .vb-header{flex-wrap:wrap}
//   .vb-body{grid-template-columns:1fr}
//   .s5-grid{grid-template-columns:1fr}
//   .cta-btns{flex-direction:column;align-items:center}
// }
// @media(max-width:520px){
//   .r-grid{grid-template-columns:1fr}
//   .vert-pills{flex-direction:column}
// }
// `;

// /* ─── COUNT UP ─── */
// function useCountUp(target, active) {
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     if (!active) return;
//     const n = parseFloat(String(target).replace(/[^0-9.]/g, "")) || 0;
//     const dur = 2400, t0 = performance.now();
//     let raf;
//     (function run(now) {
//       const p = Math.min((now - t0) / dur, 1);
//       const e = 1 - Math.pow(1 - p, 4);
//       setVal(Math.floor(e * n));
//       if (p < 1) raf = requestAnimationFrame(run); else setVal(n);
//     })(t0);
//     return () => cancelAnimationFrame(raf);
//   }, [active, target]);
//   return val;
// }
// function Cnum({ raw, suf, on }) {
//   const v = useCountUp(raw, on);
//   return <>{v >= 1000 ? v.toLocaleString() : v}{suf}</>;
// }

// /* ─── MAIN ─── */
// export default function LeadsfinderCaseStudy() {
//   const curRef = useRef(null), ringRef = useRef(null);
//   const [ch, setCh] = useState(0);
//   const [countsOn, setCountsOn] = useState(false);

//   const SIDS = ["#s0","#s1","#s2","#s3","#s4","#s5","#s6","#s7"];
//   const TICKERS = ["Leadsfinder Group · Dubai, UAE","Real Estate · Recruitment · Company Formation","369+ International Leads","5 Countries","4 Verticals Scaled Simultaneously","Vision9 Performance Marketing","Strategy Always Outperforms Spend"];

//   /* ── CURSOR ── */
//   useEffect(() => {
//     const cur = curRef.current, ring = ringRef.current;
//     if (!cur || !ring) return;
//     let mx=0,my=0,cx=0,cy=0,rx=0,ry=0, raf;
//     const mv = e => { mx=e.clientX; my=e.clientY; };
//     document.addEventListener("mousemove", mv);
//     (function l(){
//       cx+=(mx-cx)*.18; cy+=(my-cy)*.18;
//       rx+=(mx-rx)*.08; ry+=(my-ry)*.08;
//       cur.style.left=cx+"px"; cur.style.top=cy+"px";
//       ring.style.left=rx+"px"; ring.style.top=ry+"px";
//       raf=requestAnimationFrame(l);
//     })();
//     document.querySelectorAll("a,button,.r-card,.s5-card,.hs-card,.lead-bar,.vb-header,.bd-row").forEach(el=>{
//       el.addEventListener("mouseenter",()=>cur.classList.add("xl"));
//       el.addEventListener("mouseleave",()=>cur.classList.remove("xl"));
//     });
//     return ()=>{ document.removeEventListener("mousemove",mv); cancelAnimationFrame(raf); };
//   }, []);

//   /* ── PROGRESS BAR ── */
//   useEffect(() => {
//     const bar = document.getElementById("vxp");
//     const onScroll = () => {
//       const total = document.body.scrollHeight - window.innerHeight;
//       bar.style.width = (window.scrollY / total * 100) + "%";
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* ── INTERSECTION OBSERVER (reveals + chapter + counters) ── */
//   useEffect(() => {
//     // Reveals
//     const revObs = new IntersectionObserver(entries => {
//       entries.forEach(e => {
//         if (e.isIntersecting) { e.target.classList.add("vis"); revObs.unobserve(e.target); }
//       });
//     }, { threshold: 0.1 });
//     document.querySelectorAll(".rv,.rv-l,.rv-r,.rv-s").forEach(el => revObs.observe(el));

//     // Chapter
//     const chObs = new IntersectionObserver(entries => {
//       entries.forEach(e => {
//         if (e.isIntersecting) {
//           const i = SIDS.indexOf("#"+e.target.id);
//           if (i >= 0) setCh(i);
//         }
//       });
//     }, { threshold: 0.35 });
//     SIDS.forEach(id => { const el = document.querySelector(id); if(el) chObs.observe(el); });

//     // Counters
//     const cObs = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting) { setCountsOn(true); cObs.disconnect(); }
//     }, { threshold: 0.2 });
//     const s4 = document.querySelector("#s4");
//     if (s4) cObs.observe(s4);

//     // Hscroll GSAP-like with pure JS
//     const ht = document.querySelector(".hscroll-inner");
//     if (ht) {
//       const outer = ht.parentElement;
//       let scrollStart = -1;
//       const hsObs = new IntersectionObserver(entries => {
//         entries.forEach(e => {
//           if (e.isIntersecting) scrollStart = window.scrollY;
//           else scrollStart = -1;
//         });
//       }, { threshold: 0 });
//       hsObs.observe(outer);
//       const onS = () => {
//         if (scrollStart < 0) return;
//         const progress = Math.min((window.scrollY - scrollStart) / 600, 1);
//         const maxX = ht.scrollWidth - outer.offsetWidth;
//         ht.style.transform = `translateX(-${progress * maxX}px)`;
//       };
//       window.addEventListener("scroll", onS, { passive: true });
//       return () => {
//         revObs.disconnect(); chObs.disconnect(); cObs.disconnect(); hsObs.disconnect();
//         window.removeEventListener("scroll", onS);
//       };
//     }

//     return () => { revObs.disconnect(); chObs.disconnect(); cObs.disconnect(); };
//   }, []);

//   /* ── DATA ── */
//   const RE_LEADS = [
//     { c:"India",           n:"46",  l:"Investor Leads", w:46 },
//     { c:"Morocco",         n:"83",  l:"Investor Leads", w:83 },
//     { c:"Lebanon",         n:"5",   l:"Investor Leads", w:5 },
//     { c:"Dubai/Abu Dhabi", n:"—",   l:"Brand Awareness",w:0 },
//   ];
//   const REC_LEADS = [
//     { c:"Myanmar",         n:"29",  l:"Hiring Leads",   w:29 },
//     { c:"India",           n:"142", l:"Hiring Leads",   w:100 },
//     { c:"Arab Nat. #1",    n:"41",  l:"Hiring Leads",   w:41 },
//     { c:"Arab Nat. #2",    n:"23",  l:"Hiring Leads",   w:23 },
//   ];
//   const CF_LEADS = [
//     { c:"UAE Entrepreneurs",n:"86", l:"Inbound Leads",  w:86 },
//   ];

//   return (<>
//     <style>{CSS}</style>
//     <div id="vxc" ref={curRef}/>
//     <div id="vxr" ref={ringRef}/>
//     <div id="vxp"/>

//     {/* Chapter nav dots */}
//     <nav id="ch-nav">
//       {["Hero","Overview","Strategy","Execution","Results","Insight","Quote","CTA"].map((_,i)=>(
//         <div key={i} className={`ch-pip${ch===i?" on":""}`}
//           onClick={()=>document.querySelector(SIDS[i])?.scrollIntoView({behavior:"smooth"})}/>
//       ))}
//     </nav>

//     <Header/>

//     {/* ══════ S0 HERO ══════ */}
//     <section id="s0">
//       <div className="hero-grid"/><div className="orb1"/><div className="orb2"/>
//       <div className="scan-line"/><div className="nx" style={{opacity:.03}}/>

//       <div className="hero-inner">
//         <div className="hero-tag-row">
//           {["Real Estate","Recruitment","Company Formation","Dubai, UAE"].map((t,i)=>(
//             <><span key={t} className="hero-tag">{t}</span>{i<3&&<div className="hero-sep"/>}</>
//           ))}
//         </div>

//         <div className="h1-clip"><div className="h1-line d1">BUILDING</div></div>
//         <div className="h1-clip"><div className="h1-line acc d2">INTERNATIONAL</div></div>
//         <div className="h1-clip"><div className="h1-line ghost d3">FUNNELS.</div></div>

//         <div className="hero-meta">
//           {[{n:"369+",l:"Total Leads"},{n:"5",l:"Countries"},{n:"4",l:"Verticals"},{n:"Multi-Phase",l:"Partnership"}]
//             .map((s,i)=>(<>
//               {i>0&&<div key={`d${i}`} className="hero-divider"/>}
//               <div key={i} className="hero-stat">
//                 <span className="hs-n">{s.n}</span>
//                 <span className="hs-l">{s.l}</span>
//               </div>
//             </>))}
//           <p className="hero-sub" style={{marginLeft:"auto"}}>
//             How Vision9 built independent investor, recruitment & business growth funnels
//             for Leadsfinder Group across 5 international markets — simultaneously.
//           </p>
//         </div>
//       </div>

//       <div className="hero-scroll">
//         <div className="scroll-bar"/>
//         <span className="scroll-lbl">Scroll</span>
//       </div>
//     </section>

//     {/* TICKER */}
//     <div className="ticker-wrap">
//       <div className="ticker-track">
//         {[...TICKERS,...TICKERS].map((t,i)=>(
//           <div key={i} className="tk">{t}<span className="tk-dot"/></div>
//         ))}
//       </div>
//     </div>

//     {/* ══════ S1 OVERVIEW ══════ */}
//     <section id="s1">
//       <div className="nx"/><div className="s1-diag"/>
//       <div className="s1-layout">
//         <div className="s1-mega rv-l">DUBAI</div>
//         <div className="s1-content">
//           <div className="eyebrow-row rv">
//             <span className="eyebrow-line"/>
//             <span className="lbl">01 — The Client</span>
//           </div>
//           <h2 className="s1-h rv d1">A premium <em>multi-vertical</em><br/>Dubai group</h2>
//           <p className="s1-p rv d2">Leadsfinder Group is a premium, multi-vertical group of companies headquartered in Dubai, UAE. Operating across real estate, recruitment, HR services, marketing, and company formation — catering to both local and international markets.</p>
//           <p className="s1-p rv d2">With ambitious expansion goals and multiple service lines, Leadsfinder Group partnered with Vision9 to design performance-led growth systems to attract investors, clients, job seekers, and entrepreneurs across different geographies.</p>

//           <div className="vert-pills rv d3">
//             {[
//               {n:"01",name:"Real Estate",tag:"Investor Funnels"},
//               {n:"02",name:"Recruitment & HR",tag:"Hiring Campaigns"},
//               {n:"03",name:"Company Formation",tag:"B2B Lead Gen"},
//               {n:"04",name:"Brand Awareness",tag:"Market Credibility"},
//             ].map((v,i)=>(
//               <div key={i} className="vert-pill">
//                 <span className="vert-pill-n">{v.n}</span>
//                 <span className="vert-pill-name">{v.name}</span>
//                 <span className="vert-pill-tag">{v.tag}</span>
//               </div>
//             ))}
//           </div>

//           <div className="challenge-inset rv d4">
//             <p className="ci-quote">"Each vertical had distinct audiences, languages, and markets. One-size-fits-all marketing would fail — the solution demanded <em>segmentation, precision, and execution discipline.</em>"</p>
//             <span className="ci-attr">Vision9 — Strategic Assessment</span>
//           </div>

//           <div className="issues-list rv d5">
//             {[
//               "International investor funnels needed country-specific psychology & creatives",
//               "Recruitment required nationality-specific targeting filters and messaging",
//               "Company formation demanded trust-first inbound lead flows, not mass ads",
//               "All four verticals needed to scale simultaneously without cannibalism",
//             ].map((r,i)=>(
//               <div key={i} className="issue-item">
//                 <span className="issue-n">0{i+1}</span>
//                 <span className="issue-txt">{r}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>

//     {/* ══════ S2 STRATEGY ══════ */}
//     <section id="s2">
//       <div className="s2-bg-word">STRATEGY</div>

//       <div className="s2-top">
//         <div>
//           <div className="rv" style={{display:"flex",alignItems:"center",gap:".8rem",marginBottom:"1.4rem"}}>
//             <span className="eyebrow-line" style={{background:T.accentDim}}/>
//             <span className="lbl lbl-light">02 — Strategic Direction</span>
//           </div>
//           <h2 className="s2-h rv d1">Independent funnels<br/>for <em>every vertical</em></h2>
//         </div>
//         <div style={{paddingTop:"clamp(2rem,5vh,4rem)"}}>
//           <p className="s2-p rv d2">Instead of a unified campaign, Vision9 built completely separate growth systems for each service line — each with its own messaging, creatives, targeting logic, and lead capture flow. The common thread was performance discipline.</p>
//           <p className="s2-p rv d3" style={{marginTop:".8rem"}}>Every dirham tracked. Every creative tested. Every audience refined continuously.</p>
//         </div>
//       </div>

//       <div className="s2-pillars rv d2">
//         {[
//           "Market-specific psychology — distinct messages for India, Morocco, Lebanon, Myanmar, Arab Nations",
//           "Performance-driven creatives built around investor intent, hiring needs, and business formation goals",
//           "WhatsApp-first and form-based lead capture matched to each vertical's conversion behaviour",
//           "Continuous cross-market optimisation — learnings from one region applied to others",
//         ].map((r,i)=>(
//           <div key={i} className="pillar-item">
//             <span className="pi-n">0{i+1}</span>
//             <span className="pi-txt">{r}</span>
//             <span className="pi-arrow">→</span>
//           </div>
//         ))}
//       </div>

//       <div className="s2-card-grid">
//         {[
//           {n:"04",tag:"Active Verticals",    title:"Real Estate, Recruitment, Company Formation, Brand",  desc:"Each vertical ran as a fully independent performance funnel with dedicated budgets and creatives."},
//           {n:"05",tag:"Target Countries",    title:"India, Morocco, Lebanon, Myanmar, Arab Nations + UAE", desc:"Country-wise Meta Ads segmentation with region-specific psychological messaging."},
//           {n:"03",tag:"Lead Channels",       title:"WhatsApp, Lead Forms & Brand Awareness Campaigns",    desc:"Multi-channel approach precisely matched to each vertical's conversion behaviour."},
//           {n:"01",tag:"Unifying Principle",  title:"Strategy First. Execution Second. Results Always.",    desc:"Performance marketing works best when strategic architecture leads, not ad spend."},
//         ].map((c,i)=>(
//           <div key={i} className={`s2-card rv d${i+1}`}>
//             <div className="sc-ghost">{c.n}</div>
//             <span className="sc-tag">{c.tag}</span>
//             <div className="sc-title">{c.title}</div>
//             <p className="sc-desc">{c.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>

//     {/* ══════ S3 VERTICALS ══════ */}
//     <section id="s3">
//       <div className="nx" style={{opacity:.03}}/>
//       <div className="s3-header rv">
//         <div>
//           <div style={{display:"flex",alignItems:"center",gap:".8rem",marginBottom:"1rem"}}>
//             <span className="eyebrow-line"/>
//             <span className="lbl">03 — Vertical Execution</span>
//           </div>
//           <h2 className="s3-h">Three verticals.<br/><em>One architecture.</em></h2>
//         </div>
//         <div className="s3-count">03</div>
//       </div>

//       {/* 3A — Real Estate */}
//       <div className="vert-block rv">
//         <div className="vb-header">
//           <div className="vb-num">01</div>
//           <div className="vb-title-wrap">
//             <div className="vb-eyebrow">Real Estate</div>
//             <h3 className="vb-title">International <em>Investor Funnels</em></h3>
//           </div>
//           <div className="vb-total">
//             <span className="vbt-n">134</span>
//             <span className="vbt-l">Investor Leads</span>
//           </div>
//         </div>
//         <div className="vb-body">
//           <div className="vb-desc">
//             <p>Generating high-intent international investors for Azizi Milan and DAMAC Dubai required precision targeting far beyond standard property ads.</p>
//             <p>Vision9 developed region-specific creatives highlighting investment value, then ran Meta Ads with country-wise segmentation optimised for investor psychology per market.</p>
//             <div className="mkt-row">
//               {["India","Morocco","Lebanon","Dubai","Abu Dhabi"].map((m,i)=>(
//                 <span key={i} className="mkt-tag">{m}</span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Execution</p>
//             <div className="exec-steps">
//               {["Developed region-specific creatives highlighting investment ROI","Ran Meta Ads with country-wise audience segmentation","Optimised messaging based on investor psychology per market","Used WhatsApp funnels for faster investor conversions"]
//                 .map((s,i)=>(
//                   <div key={i} className="exec-step">
//                     <span className="es-n">0{i+1}</span>
//                     <span className="es-t">{s}</span>
//                   </div>
//                 ))}
//             </div>
//           </div>
//           <div>
//             <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Results — Azizi Milan</p>
//             <div className="lead-bars">
//               {RE_LEADS.map((l,i)=>(
//                 <div key={i} className="lead-bar" style={{["--bar-w"]: l.w+"%"}}>
//                   <span className="lb-country">{l.c}</span>
//                   <span className="lb-n">{l.n}</span>
//                   <span className="lb-lbl">{l.l}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 3B — Recruitment */}
//       <div className="vert-block rv d2">
//         <div className="vb-header">
//           <div className="vb-num">02</div>
//           <div className="vb-title-wrap">
//             <div className="vb-eyebrow">Recruitment & HR</div>
//             <h3 className="vb-title">Targeted <em>Hiring Campaigns</em></h3>
//           </div>
//           <div className="vb-total">
//             <span className="vbt-n">235</span>
//             <span className="vbt-l">Hiring Leads</span>
//           </div>
//         </div>
//         <div className="vb-body">
//           <div className="vb-desc">
//             <p>Supporting Dubai-based companies with targeted international recruitment required nationality-specific targeting filters and hiring-focused messaging — very different from consumer marketing.</p>
//             <p>Vision9 applied nationality-based audience targeting and ran campaigns optimised for response quality over volume.</p>
//             <div className="mkt-row">
//               {["Myanmar","India","Arab Nationals"].map((m,i)=>(
//                 <span key={i} className="mkt-tag">{m}</span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Execution</p>
//             <div className="exec-steps">
//               {["Created hiring-focused static creatives and copy per nationality","Applied nationality-based audience targeting filters on Meta","Optimised for response quality, not just click volume","Managed separate campaigns per nationality to prevent bleed"]
//                 .map((s,i)=>(
//                   <div key={i} className="exec-step">
//                     <span className="es-n">0{i+1}</span>
//                     <span className="es-t">{s}</span>
//                   </div>
//                 ))}
//             </div>
//           </div>
//           <div>
//             <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Results — Recruitment</p>
//             <div className="lead-bars">
//               {REC_LEADS.map((l,i)=>(
//                 <div key={i} className="lead-bar">
//                   <span className="lb-country">{l.c}</span>
//                   <span className="lb-n">{l.n}</span>
//                   <span className="lb-lbl">{l.l}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 3C — Company Formation */}
//       <div className="vert-block rv d3">
//         <div className="vb-header">
//           <div className="vb-num">03</div>
//           <div className="vb-title-wrap">
//             <div className="vb-eyebrow">Company Formation</div>
//             <h3 className="vb-title">Trust-First <em>Business Funnels</em></h3>
//           </div>
//           <div className="vb-total">
//             <span className="vbt-n">86</span>
//             <span className="vbt-l">Business Leads</span>
//           </div>
//         </div>
//         <div className="vb-body">
//           <div className="vb-desc">
//             <p>Company formation is a high-consideration decision. Entrepreneurs need trust before they act. Vision9 built trust-driven messaging with UGC-style content to simplify complex concepts.</p>
//             <p>WhatsApp-first lead funnels enabled immediate, high-intent conversations with prospective business owners.</p>
//           </div>
//           <div>
//             <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Execution</p>
//             <div className="exec-steps">
//               {["Developed UGC-style content simplifying company formation process","Built trust-first messaging for entrepreneurs and business owners","Used WhatsApp-first lead funnels for direct, high-intent conversations","Supported with brand awareness campaigns across UAE markets"]
//                 .map((s,i)=>(
//                   <div key={i} className="exec-step">
//                     <span className="es-n">0{i+1}</span>
//                     <span className="es-t">{s}</span>
//                   </div>
//                 ))}
//             </div>
//           </div>
//           <div>
//             <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Results</p>
//             <div className="lead-bars">
//               {CF_LEADS.map((l,i)=>(
//                 <div key={i} className="lead-bar">
//                   <span className="lb-country">{l.c}</span>
//                   <span className="lb-n">{l.n}</span>
//                   <span className="lb-lbl">{l.l}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//     {/* ══════ HSCROLL ══════ */}
//     <div className="hscroll-outer">
//       <div className="hscroll-inner" style={{transition:"transform .1s linear"}}>
//         {[
//           {n:"369+",  l:"Total Leads",              d:"All verticals combined"},
//           {n:"134",   l:"RE Investor Leads",         d:"India, Morocco & Lebanon"},
//           {n:"235",   l:"Recruitment Leads",         d:"Myanmar, India & Arab Nationals"},
//           {n:"86",    l:"Company Formation",         d:"WhatsApp-first inbound"},
//           {n:"5",     l:"Countries Targeted",        d:"UAE, India, Morocco, Lebanon, Myanmar"},
//           {n:"4",     l:"Verticals Scaled",          d:"Simultaneously"},
//           {n:"Multi", l:"Phase Partnership",         d:"Evolving engagement"},
//           {n:"#1",    l:"Priority: Intent",          d:"Qualified leads, not just volume"},
//         ].map((c,i)=>(
//           <div key={i} className="hs-card">
//             <span className="hs-n">{c.n}</span>
//             <span className="hs-l">{c.l}</span>
//             <p className="hs-d">{c.d}</p>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* ══════ S4 RESULTS ══════ */}
//     <section id="s4">
//       <div className="s4-glow"/><div className="nx" style={{opacity:.025}}/>
//       <div className="s4-head">
//         <div>
//           <div className="rv" style={{display:"flex",alignItems:"center",gap:".8rem",marginBottom:"1.2rem"}}>
//             <span className="eyebrow-line"/>
//             <span className="lbl">04 — Campaign Results</span>
//           </div>
//           <h2 className="s4-h rv d1">Numbers across<br/><em>five nations.</em></h2>
//         </div>
//         <p className="s4-sub rv d2">
//           Across every vertical and every market, Vision9 maintained one standard: every lead had to be qualified for the specific service being promoted — not just counted.
//         </p>
//       </div>

//       <div className="r-grid">
//         {[
//           {raw:"369",  suf:"+",  lbl:"Total Leads",       desc:"Combined across all verticals and markets"},
//           {raw:"134",  suf:"",   lbl:"RE Investor Leads", desc:"International investor leads for Azizi Milan"},
//           {raw:"235",  suf:"",   lbl:"Recruitment Leads", desc:"Hiring leads across 3 nationality segments"},
//           {raw:"86",   suf:"",   lbl:"Company Formation", desc:"Inbound WhatsApp-first business leads"},
//         ].map((c,i)=>(
//           <div key={i} className={`r-card rv d${i+1}`}>
//             <span className="r-lbl">{c.lbl}</span>
//             <span className="r-num"><Cnum raw={c.raw} suf={c.suf} on={countsOn}/></span>
//             <p className="r-desc">{c.desc}</p>
//           </div>
//         ))}
//       </div>

//       {/* Breakdown table */}
//       <div className="breakdown rv d3">
//         <p className="bd-title">Lead Breakdown by Vertical & Market</p>
//         <div className="bd-grid">
//           <div className="bd-col">
//             <div className="bd-col-head"><span className="bch-name">Real Estate</span><span className="bch-icon">🏙</span></div>
//             <div className="bd-rows">
//               {[["Azizi Milan — India","46"],["Azizi Milan — Morocco","83"],["Azizi Milan — Lebanon","5"],["Dubai / Abu Dhabi","Awareness"]].map(([c,n],i)=>(
//                 <div key={i} className="bd-row"><span className="bd-country">{c}</span><span className="bd-leads">{n}</span></div>
//               ))}
//             </div>
//             <div className="bd-foot"><span className="bdf-lbl">Subtotal</span><span className="bdf-n">134</span></div>
//           </div>
//           <div className="bd-col">
//             <div className="bd-col-head"><span className="bch-name">Recruitment</span><span className="bch-icon">🌐</span></div>
//             <div className="bd-rows">
//               {[["Myanmar Hiring","29"],["Indian Campaign","142"],["Arab Nationals #1","41"],["Arab Nationals #2","23"]].map(([c,n],i)=>(
//                 <div key={i} className="bd-row"><span className="bd-country">{c}</span><span className="bd-leads">{n}</span></div>
//               ))}
//             </div>
//             <div className="bd-foot"><span className="bdf-lbl">Subtotal</span><span className="bdf-n">235</span></div>
//           </div>
//           <div className="bd-col">
//             <div className="bd-col-head"><span className="bch-name">Company Formation</span><span className="bch-icon">🏢</span></div>
//             <div className="bd-rows">
//               {[["UAE Business Owners","86"],["Brand Awareness Campaigns","—"],["Multi-market presence","—"]].map(([c,n],i)=>(
//                 <div key={i} className="bd-row"><span className="bd-country">{c}</span><span className="bd-leads">{n}</span></div>
//               ))}
//             </div>
//             <div className="bd-foot"><span className="bdf-lbl">Subtotal</span><span className="bdf-n">86</span></div>
//           </div>
//         </div>
//       </div>
//     </section>

//     {/* ══════ S5 INSIGHT ══════ */}
//     <section id="s5">
//       <div className="s5-bg">SCALE</div>

//       <div className="rv">
//         <div style={{display:"flex",alignItems:"center",gap:".8rem",marginBottom:"1.2rem"}}>
//           <span className="eyebrow-line" style={{background:T.accentDim}}/>
//           <span className="lbl lbl-light">05 — Key Insight</span>
//         </div>
//       </div>

//       <div className="s5-pullquote rv d1">
//         <span className="pq-mark">❝</span>
//         <p className="pq-text">Scaling across services, countries, and audiences requires more than ads — it requires <em>segmentation, clarity, and execution discipline.</em> Strategy always outperforms spend.</p>
//         <span className="pq-attr">Vision9 — Strategic Takeaway · Leadsfinder Engagement</span>
//       </div>

//       <div className="s5-grid">
//         {[
//           {n:"01", title:"Segment Before You Spend",   desc:"Each vertical, market, and nationality required entirely distinct messaging, creatives, and targeting. Not an adaptation — a completely independent system."},
//           {n:"02", title:"Intent Over Volume",          desc:"The goal was never reach — it was relevance. Every lead across every market was qualified for the specific service being promoted, not just counted."},
//           {n:"03", title:"Systems Enable Complexity",   desc:"Managing four verticals across five countries simultaneously was only possible because each funnel was built as an independent system, not a variation on a master campaign."},
//           {n:"04", title:"Strategy Leads, Ads Follow",  desc:"Without a clear strategic architecture established upfront, performance marketing at this scale would have produced fragmented noise rather than compounding results."},
//         ].map((c,i)=>(
//           <div key={i} className={`s5-card rv d${i+1}`}>
//             <span className="s5c-n">{c.n}</span>
//             <div className="s5c-title">{c.title}</div>
//             <p className="s5c-desc">{c.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>

//     {/* ══════ S6 TESTIMONIAL ══════ */}
//     <section id="s6">
//       <div className="nx" style={{opacity:.03}}/>
//       <div className="s6-glow"/>
//       <div className="testi-inner rv">
//         <span className="testi-mark">❝</span>
//         <p className="testi-q">"Vision9 understood the complexity of our business from day one. They didn't try to simplify it into one campaign — they built separate, focused systems for each of our verticals and delivered results across markets we hadn't even expected to penetrate so quickly."</p>
//         <div className="testi-rule"/>
//         <div className="testi-name">Leadsfinder Group</div>
//         <span className="testi-role">Management Team · Dubai, UAE</span>
//       </div>
//     </section>

//     {/* ══════ S7 CTA ══════ */}
//     <section id="s7">
//       <div className="nx" style={{opacity:.03}}/>
//       <div className="cta-ghost">VISION9</div>
//       <div className="cta-inner">
//         <div className="cta-eyebrow rv"><span/>Ready to scale internationally?<span/></div>
//         <h2 className="cta-h rv d1">Let's Build<br/>Systems That <em>Scale</em></h2>
//         <p className="cta-p rv d2">Whether one service or four, one market or five — Vision9 builds the growth architecture your brand needs to perform at scale, with precision.</p>
//         <div className="cta-btns rv d3">
//           <a href="/contact" className="btn-fill">Book a Strategy Call</a>
//           <a href="/case_studies" className="btn-stroke">View More Case Studies</a>
//         </div>
//       </div>
//     </section>

//     <Footer/>
//   </>);
// }

"use client";

/* ═══════════════════════════════════════════════
   VISION9 · Leadsfinder Group Case Study
   
   DESIGN PHILOSOPHY: "Editorial Luxury Documentary"
   — Think: Wallpaper* magazine meets Bloomberg Businessweek
   — No GSAP async loading. All animations via CSS keyframes 
     + IntersectionObserver (zero external deps).
   — Sections use radically different layouts so every scroll
     feels like turning a page.
═══════════════════════════════════════════════ */

let T = {
  accent:     "#a6a216",
  accentDim:  "#a6a216",
  accentDark: "#737017",
  accentGlow: "rgba(210,206,18,0.15)",

  dark:       "#0c0b08",
  dark2:      "#161410",
  dark3:      "#1e1b14",
  dark4:      "#252218",

  cream:      "#fffee9",
  creamDim:   "rgba(255,254,233,0.55)",
  creamFaint: "rgba(255,254,233,0.18)",

  light:      "#fffee9",
  lightAlt:   "#f5f2c8",

  text:       "#231f1f",
  textSec:    "#58564d",
  muted:      "#a19f8a",

  gold:       "rgba(210,206,18,0.2)",
  goldFaint:  "rgba(210,206,18,0.08)",
};

//  T = {
//   accent:      "#a6a216",
//   accentLight: "#ebe60c",
//   accentMid:   "#d2ce12",
//   accentDark:  "#737017",

//   bg:          "#fffee9",
//   bgAlt:       "#f5f2c8",

//   bgDark:      "#231f1f",
//   bgDarkCard:  "#2a2622",
//   bgDarkAlt:   "#3f3c15",

//   card:        "#ffffff",

//   text:        "#231f1f",
//   textSec:     "#58564d",
//   muted:       "#a19f8a",

//   border:      "rgba(115,112,23,0.20)",

//   cream:       "#fffee9",
// };

import { useEffect, useRef, useState } from "react";
import Header from "../../../components/custom/Header";
import Footer from "../../../components/custom/Footer";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700;1,900&family=Tenor+Sans&family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;1,300&display=swap');`;

/* ─────────────────────────────────────────────
   ALL STYLES — zero external CSS deps
───────────────────────────────────────────── */
const CSS = `
${FONTS}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${T.dark};color:${T.cream};font-family:'DM Sans',sans-serif;
  font-weight:300;overflow-x:hidden;cursor:none}

/* ═══ CURSOR ═══ */
#vxc{width:10px;height:10px;background:${T.accent};position:fixed;z-index:9999;
  pointer-events:none;transform:translate(-50%,-50%);
  transition:width .25s,height .25s,background .25s,border-radius .25s}
#vxc.xl{width:52px;height:52px;background:transparent;border:1px solid ${T.accent};border-radius:0}
#vxr{width:36px;height:36px;border:1px solid rgba(210,206,18,.25);position:fixed;z-index:9998;
  pointer-events:none;transform:translate(-50%,-50%)}

/* ═══ PROGRESS ═══ */
#vxp{position:fixed;top:0;left:0;height:1.5px;width:0%;z-index:8000;
  background:linear-gradient(90deg,${T.accentDark},${T.accent},#fff98a)}

/* ═══ NOISE TEXTURE ═══ */
.nx{position:absolute;inset:0;pointer-events:none;z-index:1;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E");
  background-size:180px;opacity:.022}

/* ═══ SHARED ═══ */
.lbl{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.28em;
  text-transform:uppercase;color:${T.accentDim}}
.lbl-light{color:${T.muted}}
.serif{font-family:'Playfair Display',serif}

/* ═══ CSS REVEAL (IntersectionObserver sets .vis) ═══ */
.rv{opacity:0;transform:translateY(48px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
.rv.vis{opacity:1;transform:translateY(0)}
.rv-l{opacity:0;transform:translateX(-60px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
.rv-l.vis{opacity:1;transform:translateX(0)}
.rv-r{opacity:0;transform:translateX(60px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
.rv-r.vis{opacity:1;transform:translateX(0)}
.rv-s{opacity:0;transform:scale(.94);transition:opacity .85s ease,transform .85s cubic-bezier(.16,1,.3,1)}
.rv-s.vis{opacity:1;transform:scale(1)}
.d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}
.d4{transition-delay:.32s}.d5{transition-delay:.40s}.d6{transition-delay:.48s}

/* ═══════════════════════════════════════════
   SECTION 0 — HERO
   Full-viewport. Giant headline. Cinematic dark.
════════════════════════════════════════════ */
#s0{min-height:100vh;background:${T.dark};position:relative;overflow:hidden;
  display:flex;flex-direction:column;justify-content:flex-end}

/* animated grid bg */
.hero-grid{position:absolute;inset:0;z-index:0;
  background-image:
    linear-gradient(rgba(210,206,18,.035) 1px,transparent 1px),
    linear-gradient(90deg,rgba(210,206,18,.035) 1px,transparent 1px);
  background-size:72px 72px;
  animation:gridDrift 20s ease-in-out infinite alternate}
@keyframes gridDrift{0%{background-position:0 0}100%{background-position:36px 36px}}

/* glowing orbs */
.orb1{position:absolute;width:700px;height:700px;border-radius:50%;
  background:radial-gradient(circle,rgba(210,206,18,.09) 0%,transparent 65%);
  top:-15%;right:-10%;animation:orbFloat 12s ease-in-out infinite}
.orb2{position:absolute;width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(210,206,18,.06) 0%,transparent 65%);
  bottom:-10%;left:-5%;animation:orbFloat 15s ease-in-out infinite reverse}
@keyframes orbFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(24px,-32px)}}

/* scan line */
.scan-line{position:absolute;left:0;right:0;height:1px;z-index:2;
  background:linear-gradient(90deg,transparent,rgba(210,206,18,.35),transparent);
  animation:scanDown 8s linear infinite}
@keyframes scanDown{0%{top:-1%}100%{top:102%}}

.hero-inner{position:relative;z-index:10;padding:0 clamp(1.5rem,7vw,7rem) clamp(4rem,8vh,7rem)}

/* GIANT stacked headline — slides up from clip */
.hero-tag-row{display:flex;align-items:center;gap:1rem;margin-bottom:2.5rem;
  flex-wrap:wrap;opacity:0;animation:fadeUp .7s .1s ease forwards}
.hero-tag{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.26em;
  text-transform:uppercase;color:${T.accent};padding:.3rem .9rem;
  border:1px solid rgba(210,206,18,.3)}
.hero-sep{width:1px;height:12px;background:rgba(210,206,18,.2)}

.h1-clip{overflow:hidden;line-height:.88}
.h1-line{font-family:'Playfair Display',serif;font-weight:900;
  font-size: clamp(2.5rem, 8vw, 8rem);letter-spacing:-.03em;
  display:block;color:${T.cream};
  transform:translateY(110%);animation:slideUp 1s cubic-bezier(.16,1,.3,1) forwards}
.h1-line.acc{color:${T.accent};font-style:italic}
.h1-line.ghost{color:transparent;-webkit-text-stroke:1px rgba(255,254,233,.1)}
.h1-line.d1{animation-delay:.3s}
.h1-line.d2{animation-delay:.48s}
.h1-line.d3{animation-delay:.64s}
@keyframes slideUp{to{transform:translateY(0)}}
@keyframes fadeUp{to{opacity:1;transform:translateY(0)}}

/* kicker sub text */
.hero-meta{display:flex;gap:clamp(2rem,5vw,5rem);margin-top:3rem;flex-wrap:wrap;
  opacity:0;animation:fadeUp .8s 1s ease forwards}
.hero-stat{display:flex;flex-direction:column}
.hs-n{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,3.2rem);
  color:${T.accent};font-weight:700;line-height:1}
.hs-l{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.18em;
  text-transform:uppercase;color:rgba(255,254,233,.3);margin-top:.3rem}
.hero-divider{width:1px;height:48px;background:rgba(210,206,18,.18);align-self:center}
.hero-sub{max-width:420px;font-size:clamp(.85rem,1.3vw,.95rem);line-height:1.88;
  color:rgba(255,254,233,.42);align-self:flex-end}

/* scroll cue */
.hero-scroll{position:absolute;right:clamp(1.5rem,4vw,4rem);bottom:clamp(2rem,5vh,4rem);
  display:flex;flex-direction:column;align-items:center;gap:.5rem;z-index:10;
  opacity:0;animation:fadeUp .6s 1.5s forwards}
.scroll-bar{width:1px;height:56px;background:linear-gradient(${T.accent},transparent);
  animation:scrollPulse 2.2s ease-in-out infinite}
@keyframes scrollPulse{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(.35);opacity:.35}}
.scroll-lbl{font-family:'Tenor Sans',sans-serif;font-size:.42rem;letter-spacing:.2em;
  text-transform:uppercase;color:${T.accentDim};writing-mode:vertical-rl}

/* side chapter dots */
#ch-nav{position:fixed;right:clamp(.8rem,2vw,2rem);top:50%;transform:translateY(-50%);
  z-index:5000;display:flex;flex-direction:column;gap:.8rem;align-items:flex-end}
.ch-pip{width:5px;height:5px;background:rgba(210,206,18,.25);cursor:pointer;
  transition:background .3s,width .3s,height .3s}
.ch-pip.on{background:${T.accent};width:18px;height:3px}

/* ═══════════════════════════════════════════
   TICKER
════════════════════════════════════════════ */
.ticker-wrap{height:48px;background:${T.accent};overflow:hidden;display:flex;align-items:center;
  position:relative;z-index:5}
.ticker-track{display:flex;white-space:nowrap;animation:ticker 30s linear infinite}
.tk{font-family:'Playfair Display',serif;font-weight:700;font-size:.82rem;
  letter-spacing:.22em;text-transform:uppercase;color:${T.dark};
  padding:0 2.5rem;display:flex;align-items:center;gap:1.5rem}
.tk-dot{width:4px;height:4px;background:${T.dark};transform:rotate(45deg);opacity:.4}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ═══════════════════════════════════════════
   SECTION 1 — OVERVIEW
   Layout: Large number column left + text right
   Background: dark with geometric lines
════════════════════════════════════════════ */
#s1{background:${T.dark2};padding:clamp(6rem,14vh,12rem) clamp(1.5rem,7vw,7rem);
  position:relative;overflow:hidden}

/* decorative diagonal */
.s1-diag{position:absolute;top:0;right:0;width:45%;height:100%;
  background:linear-gradient(135deg,transparent 0%,rgba(210,206,18,.025) 100%);
  pointer-events:none;z-index:0}

.s1-layout{display:grid;grid-template-columns:auto 1fr;gap:clamp(3rem,8vw,10rem);
  align-items:start;position:relative;z-index:2}

/* mega number sidebar */
.s1-mega{writing-mode:vertical-rl;font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(5rem,15vw,14rem);color:transparent;
  -webkit-text-stroke:1px rgba(210,206,18,.12);line-height:1;
  letter-spacing:-.04em;user-select:none;transform:rotate(180deg)}

.s1-content .eyebrow-row{display:flex;align-items:center;gap:.8rem;margin-bottom:1.5rem}
.eyebrow-line{width:32px;height:1px;background:${T.accent};display:inline-block}

.s1-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2rem,4.5vw,4.5rem);line-height:1.05;letter-spacing:-.02em;
  color:${T.cream};margin-bottom:1.5rem}
.s1-h em{color:${T.accent};font-style:italic}

.s1-p{font-size:clamp(.88rem,1.35vw,.98rem);line-height:1.95;
  color:rgba(255,254,233,.45);margin-bottom:1.2rem}

/* verticals — horizontal pill row */
.vert-pills{display:flex;flex-wrap:wrap;gap:.6rem;margin:2rem 0}
.vert-pill{display:flex;align-items:center;gap:.7rem;
  border:1px solid rgba(210,206,18,.2);padding:.6rem 1.2rem;
  transition:border-color .3s,background .3s;cursor:default}
.vert-pill:hover{border-color:${T.accent};background:rgba(210,206,18,.04)}
.vert-pill-n{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.16em;
  color:${T.accentDim};text-transform:uppercase}
.vert-pill-name{font-family:'Playfair Display',serif;font-size:clamp(.9rem,1.5vw,1.1rem);
  font-weight:600;color:${T.cream}}
.vert-pill-tag{font-family:'Tenor Sans',sans-serif;font-size:.42rem;letter-spacing:.14em;
  text-transform:uppercase;color:rgba(210,206,18,.5);margin-left:.4rem}

/* challenge callout — bordered inset */
.challenge-inset{border-left:2px solid ${T.accent};padding:1.5rem 2rem;
  background:rgba(210,206,18,.04);margin-top:2rem;position:relative}
.challenge-inset::before{content:'';position:absolute;top:0;left:-2px;height:30%;
  width:2px;background:${T.accent}}
.ci-quote{font-family:'Playfair Display',serif;font-size:clamp(1rem,1.8vw,1.4rem);
  font-style:italic;color:${T.cream};line-height:1.55}
.ci-quote em{color:${T.accent}}
.ci-attr{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.2em;
  text-transform:uppercase;color:${T.accentDim};margin-top:.8rem;display:block}

/* issues — numbered list */
.issues-list{margin-top:2rem}
.issue-item{display:flex;align-items:flex-start;gap:1rem;padding:.75rem 0;
  border-bottom:1px solid rgba(210,206,18,.07)}
.issue-item:last-child{border-bottom:none}
.issue-n{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.14em;
  color:${T.accent};min-width:1.8rem;flex-shrink:0;padding-top:.1rem}
.issue-txt{font-size:clamp(.82rem,1.2vw,.92rem);line-height:1.75;
  color:rgba(255,254,233,.4)}

/* ═══════════════════════════════════════════
   SECTION 2 — STRATEGY
   Layout: Full-width magazine spread
   Light background with dark type
════════════════════════════════════════════ */
#s2{background:${T.light};padding:clamp(6rem,14vh,12rem) clamp(1.5rem,7vw,7rem);
  position:relative;overflow:hidden}

/* big BG word */
.s2-bg-word{position:absolute;bottom:-4%;right:-2%;
  font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(7rem,22vw,22rem);color:transparent;
  -webkit-text-stroke:1px rgba(115,112,23,.07);pointer-events:none;
  line-height:1;user-select:none}

.s2-top{display:grid;grid-template-columns:1fr 1fr;gap:clamp(3rem,8vw,8rem);
  margin-bottom:clamp(4rem,8vh,7rem);position:relative;z-index:2}
.s2-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2.2rem,5vw,5rem);line-height:1.0;letter-spacing:-.025em;
  color:${T.text}}
.s2-h em{color:${T.accentDim};font-style:italic}
.s2-p{font-size:clamp(.88rem,1.35vw,.98rem);line-height:1.95;color:${T.textSec}}

/* pillar list */
.s2-pillars{border-top:1px solid rgba(115,112,23,.15);position:relative;z-index:2}
.pillar-item{display:flex;align-items:center;gap:1.5rem;padding:1.4rem 0;
  border-bottom:1px solid rgba(115,112,23,.1);cursor:default;
  transition:padding .3s,background .3s}
.pillar-item:hover{padding-left:.6rem;background:rgba(115,112,23,.03)}
.pillar-item:hover .pi-n{color:${T.accentDim}}
.pillar-item:hover .pi-txt{color:${T.text}}
.pi-n{font-family:'Playfair Display',serif;font-size:.9rem;color:${T.muted};
  min-width:2.5rem;flex-shrink:0;transition:color .3s}
.pi-txt{font-family:'Playfair Display',serif;font-size:clamp(1rem,2vw,1.5rem);
  font-weight:500;color:${T.textSec};line-height:1.35;flex:1;transition:color .3s}
.pi-arrow{color:${T.accentDim};opacity:0;transform:translateX(-8px);
  transition:opacity .3s,transform .3s;font-size:1.1rem}
.pillar-item:hover .pi-arrow{opacity:1;transform:translateX(0)}

/* strategy cards — 2×2 grid */
.s2-card-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
  background:rgba(115,112,23,.15);border:1px solid rgba(115,112,23,.15);
  margin-top:clamp(3rem,7vh,6rem);position:relative;z-index:2}
.s2-card{background:${T.light};padding:clamp(1.5rem,3vw,2.5rem);position:relative;
  overflow:hidden;cursor:default;transition:background .35s}
.s2-card:hover{background:${T.lightAlt}}
.s2-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;
  background:linear-gradient(90deg,${T.accentDark},${T.accentDim},${T.accent});
  transform:scaleX(0);transform-origin:left;transition:transform .55s}
.s2-card:hover::after{transform:scaleX(1)}
.sc-ghost{font-family:'Playfair Display',serif;font-size:4.5rem;color:transparent;
  -webkit-text-stroke:1px rgba(115,112,23,.12);line-height:1;font-weight:900;display:block}
.sc-tag{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.2em;
  text-transform:uppercase;color:${T.accentDim};display:block;margin-bottom:.6rem}
.sc-title{font-family:'Playfair Display',serif;font-size:clamp(.9rem,1.6vw,1.2rem);
  font-weight:600;color:${T.text};margin-bottom:.4rem;line-height:1.25}
.sc-desc{font-size:clamp(.76rem,1.1vw,.85rem);line-height:1.82;color:${T.textSec}}

/* ═══════════════════════════════════════════
   SECTION 3 — VERTICALS DEEP DIVE
   Layout: Full-bleed dark, 3 accordion-style blocks
════════════════════════════════════════════ */
#s3{background:${T.dark};position:relative;overflow:hidden;
  padding:clamp(6rem,14vh,12rem) clamp(1.5rem,7vw,7rem)}
.s3-header{display:flex;align-items:flex-end;justify-content:space-between;
  margin-bottom:clamp(3rem,8vh,7rem);flex-wrap:wrap;gap:2rem}
.s3-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2.2rem,5vw,5rem);line-height:1;letter-spacing:-.025em;color:${T.cream}}
.s3-h em{color:${T.accent};font-style:italic}
.s3-count{font-family:'Playfair Display',serif;font-size:clamp(3rem,8vw,8rem);
  font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(210,206,18,.2);line-height:1}

/* vertical block — full width horizontal strips */
.vert-block{border-top:1px solid rgba(210,206,18,.12);padding:clamp(2.5rem,6vh,5rem) 0;
  position:relative}
.vert-block:last-child{border-bottom:1px solid rgba(210,206,18,.12)}

/* block header — clickable label */
.vb-header{display:flex;align-items:center;gap:2rem;margin-bottom:2rem;cursor:default}
.vb-num{font-family:'Playfair Display',serif;font-size:clamp(3rem,6vw,5rem);
  font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(210,206,18,.25);
  line-height:1;min-width:5rem}
.vb-title-wrap{flex:1}
.vb-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.24em;
  text-transform:uppercase;color:${T.accentDim};margin-bottom:.4rem}
.vb-title{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(1.5rem,3.5vw,3rem);color:${T.cream};line-height:1.05;letter-spacing:-.015em}
.vb-title em{color:${T.accent};font-style:italic}
.vb-total{text-align:right;flex-shrink:0}
.vbt-n{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3.5rem);
  color:${T.accent};font-weight:700;display:block;line-height:1}
.vbt-l{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.18em;
  text-transform:uppercase;color:rgba(210,206,18,.4);display:block;margin-top:.2rem}

/* block body — 3 col */
.vb-body{display:grid;grid-template-columns:1fr 1fr 1fr;gap:clamp(1.5rem,4vw,4rem)}
.vb-desc p{font-size:clamp(.86rem,1.3vw,.95rem);line-height:1.9;
  color:rgba(255,254,233,.42);margin-bottom:.9rem}

/* market tags */
.mkt-row{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.8rem}
.mkt-tag{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.16em;
  text-transform:uppercase;color:${T.accentDim};border:1px solid rgba(210,206,18,.25);
  padding:.25rem .65rem;transition:background .3s,color .3s}
.mkt-tag:hover{background:${T.accent};color:${T.dark}}

/* exec steps */
.exec-steps{display:flex;flex-direction:column;gap:0}
.exec-step{display:flex;align-items:flex-start;gap:.9rem;padding:.8rem 0;
  border-bottom:1px solid rgba(210,206,18,.07);transition:background .3s}
.exec-step:last-child{border-bottom:none}
.exec-step:hover{background:rgba(210,206,18,.03);padding-left:.3rem}
.es-n{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.14em;
  color:${T.accentDim};flex-shrink:0;padding-top:.1rem}
.es-t{font-size:clamp(.8rem,1.15vw,.88rem);line-height:1.72;color:rgba(255,254,233,.42)}

/* lead result cards — horizontal bar style */
.lead-bars{display:flex;flex-direction:column;gap:.6rem}
.lead-bar{display:flex;align-items:center;gap:1rem;padding:.8rem 1.2rem;
  background:rgba(210,206,18,.04);border:1px solid rgba(210,206,18,.1);
  position:relative;overflow:hidden;transition:background .3s}
.lead-bar:hover{background:rgba(210,206,18,.08)}
.lead-bar::before{content:'';position:absolute;top:0;left:0;height:100%;
  background:rgba(210,206,18,.06);transition:width .8s ease}
.lb-country{font-family:'Tenor Sans',sans-serif;font-size:.46rem;letter-spacing:.14em;
  text-transform:uppercase;color:rgba(255,254,233,.4);min-width:5rem;flex-shrink:0}
.lb-n{font-family:'Playfair Display',serif;font-size:clamp(1.3rem,2.5vw,2rem);
  color:${T.accent};font-weight:700;line-height:1;flex-shrink:0;min-width:3rem}
.lb-lbl{font-family:'Tenor Sans',sans-serif;font-size:.42rem;letter-spacing:.12em;
  text-transform:uppercase;color:rgba(255,254,233,.25)}

/* ═══════════════════════════════════════════
   HSCROLL STRIP
════════════════════════════════════════════ */
.hscroll-outer{overflow:hidden;background:${T.dark4};
  border-top:1px solid rgba(210,206,18,.1);border-bottom:1px solid rgba(210,206,18,.1)}
.hscroll-inner{display:flex;gap:1.5rem;padding:2rem 2rem;width:max-content}
.hs-card{flex-shrink:0;width:240px;border:1px solid rgba(210,206,18,.15);
  padding:1.6rem 1.8rem;background:${T.dark3};position:relative;overflow:hidden;
  transition:border-color .3s,background .3s;cursor:default}
.hs-card:hover{border-color:rgba(210,206,18,.35);background:${T.dark4}}
.hs-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,${T.accent},transparent)}
.hs-n{font-family:'Playfair Display',serif;font-size:2.2rem;color:${T.accent};
  font-weight:700;line-height:1;display:block}
.hs-l{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.16em;
  text-transform:uppercase;color:rgba(255,254,233,.35);margin:.3rem 0 .5rem;display:block}
.hs-d{font-size:.82rem;line-height:1.7;color:rgba(255,254,233,.35)}

/* ═══════════════════════════════════════════
   SECTION 4 — RESULTS
   Layout: HUGE full-bleed numbers, cinematic dark
   Unique: numbers count up on scroll
════════════════════════════════════════════ */
#s4{background:${T.dark2};position:relative;overflow:hidden;
  padding:clamp(6rem,14vh,12rem) clamp(1.5rem,7vw,7rem)}
.s4-glow{position:absolute;top:-20%;left:50%;transform:translateX(-50%);
  width:900px;height:600px;
  background:radial-gradient(ellipse,rgba(210,206,18,.07) 0%,transparent 65%);pointer-events:none}

.s4-head{display:grid;grid-template-columns:1fr 1fr;gap:4rem;margin-bottom:clamp(4rem,10vh,8rem);
  align-items:end;position:relative;z-index:2}
.s4-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2.5rem,6vw,6rem);line-height:.95;letter-spacing:-.03em;color:${T.cream}}
.s4-h em{color:${T.accent};font-style:italic}
.s4-sub{font-size:clamp(.88rem,1.35vw,.98rem);line-height:1.88;
  color:rgba(255,254,233,.38);align-self:flex-end}

/* BIG 4-across number grid */
.r-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
  background:rgba(210,206,18,.08);border:1px solid rgba(210,206,18,.08);
  position:relative;z-index:2}
.r-card{background:${T.dark3};padding:clamp(2rem,4vw,3.5rem) clamp(1.5rem,3vw,2.5rem);
  position:relative;overflow:hidden;cursor:default;transition:background .4s}
.r-card:hover{background:${T.dark4}}
.r-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;
  background:linear-gradient(90deg,${T.accentDark},${T.accent},#fff98a);
  transform:scaleX(0);transform-origin:left;transition:transform .6s}
.r-card:hover::after{transform:scaleX(1)}
.r-lbl{font-family:'Tenor Sans',sans-serif;font-size:.48rem;letter-spacing:.18em;
  text-transform:uppercase;color:rgba(255,254,233,.35);display:block;margin-bottom:.6rem}
.r-num{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,6vw,5.5rem);
  color:${T.accent};line-height:1;display:block;font-weight:700;margin-bottom:.4rem}
.r-desc{font-size:clamp(.74rem,1.05vw,.84rem);line-height:1.75;color:rgba(255,254,233,.28)}

/* breakdown table — styled like a Bloomberg data table */
.breakdown{margin-top:clamp(3rem,7vh,6rem);position:relative;z-index:2}
.bd-title{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.24em;
  text-transform:uppercase;color:${T.accentDim};margin-bottom:1.5rem;
  display:flex;align-items:center;gap:.8rem}
.bd-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(210,206,18,.3),transparent)}
.bd-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.bd-col{border:1px solid rgba(210,206,18,.12);overflow:hidden}
.bd-col-head{background:rgba(210,206,18,.07);padding:1rem 1.5rem;
  border-bottom:1px solid rgba(210,206,18,.1);
  display:flex;align-items:center;justify-content:space-between}
.bch-name{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:${T.cream}}
.bch-icon{font-size:.9rem;opacity:.5}
.bd-rows{padding:.4rem 0}
.bd-row{display:flex;align-items:center;justify-content:space-between;
  padding:.65rem 1.5rem;border-bottom:1px solid rgba(210,206,18,.05);
  transition:background .25s}
.bd-row:last-child{border-bottom:none}
.bd-row:hover{background:rgba(210,206,18,.04)}
.bd-country{font-size:.82rem;color:rgba(255,254,233,.45);line-height:1.4}
.bd-leads{font-family:'Playfair Display',serif;font-size:1rem;
  color:${T.accent};font-weight:700;white-space:nowrap}
.bd-foot{display:flex;align-items:center;justify-content:space-between;
  padding:.9rem 1.5rem;background:rgba(210,206,18,.05);
  border-top:1px solid rgba(210,206,18,.12)}
.bdf-lbl{font-family:'Tenor Sans',sans-serif;font-size:.44rem;letter-spacing:.16em;
  text-transform:uppercase;color:rgba(255,254,233,.35)}
.bdf-n{font-family:'Playfair Display',serif;font-size:1.5rem;
  color:${T.accentLight};font-weight:700}

/* ═══════════════════════════════════════════
   SECTION 5 — INSIGHT
   Layout: Full-width editorial, light bg
   Unique: Large pull-quote + 2×2 takeaway cards
════════════════════════════════════════════ */
#s5{background:${T.lightAlt};position:relative;overflow:hidden;
  padding:clamp(6rem,14vh,12rem) clamp(1.5rem,7vw,7rem)}
.s5-bg{position:absolute;bottom:-5%;right:-3%;
  font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(7rem,22vw,20rem);color:transparent;
  -webkit-text-stroke:1px rgba(115,112,23,.06);pointer-events:none;line-height:1}

/* pull-quote hero */
.s5-pullquote{position:relative;padding:clamp(3rem,7vw,6rem) 0;margin-bottom:clamp(3rem,8vh,6rem);
  border-top:1px solid rgba(115,112,23,.15);border-bottom:1px solid rgba(115,112,23,.15);
  position:relative;z-index:2}
.pq-mark{font-family:'Playfair Display',serif;font-size:5rem;line-height:.3;
  color:rgba(115,112,23,.15);display:block;margin-bottom:1.8rem}
.pq-text{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(1.6rem,4vw,4rem);line-height:1.12;letter-spacing:-.02em;color:${T.text};
  max-width:900px}
.pq-text em{color:${T.accentDim};font-style:italic}
.pq-attr{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.22em;
  text-transform:uppercase;color:${T.accentDim};margin-top:2rem;display:block}

/* 2×2 insight grid */
.s5-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;position:relative;z-index:2}
.s5-card{border:1px solid rgba(115,112,23,.18);padding:clamp(2rem,4vw,3rem);
  background:#fff;position:relative;overflow:hidden;
  transition:transform .35s,border-color .35s,box-shadow .35s}
.s5-card:hover{transform:translateY(-6px);border-color:${T.accentDim};
  box-shadow:0 20px 60px rgba(115,112,23,.1)}
.s5-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,${T.accentDark},${T.accentDim},${T.accent});
  transform:scaleX(0);transform-origin:left;transition:transform .55s}
.s5-card:hover::before{transform:scaleX(1)}
.s5-card::after{content:'';position:absolute;bottom:10px;right:10px;
  width:18px;height:18px;border-bottom:1px solid rgba(115,112,23,.18);
  border-right:1px solid rgba(115,112,23,.18)}
.s5c-n{font-family:'Playfair Display',serif;font-size:4.5rem;color:transparent;
  -webkit-text-stroke:1px rgba(115,112,23,.12);line-height:1;font-weight:900;display:block}
.s5c-title{font-family:'Playfair Display',serif;font-size:clamp(1rem,1.9vw,1.4rem);
  font-weight:600;color:${T.text};margin-bottom:.5rem;line-height:1.2}
.s5c-desc{font-size:clamp(.78rem,1.15vw,.88rem);line-height:1.85;color:${T.textSec}}

/* ═══════════════════════════════════════════
   SECTION 6 — TESTIMONIAL
   Layout: Full-screen centered, dark, cinematic
════════════════════════════════════════════ */
#s6{background:${T.dark};display:flex;align-items:center;justify-content:center;
  min-height:70vh;padding:clamp(7rem,18vh,14rem) clamp(1.5rem,7vw,7rem);
  position:relative;overflow:hidden}
.s6-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:700px;height:700px;
  background:radial-gradient(ellipse,rgba(210,206,18,.07) 0%,transparent 65%);pointer-events:none}
.testi-inner{max-width:860px;text-align:center;position:relative;z-index:2}
.testi-mark{font-family:'Playfair Display',serif;font-size:6rem;line-height:.35;
  color:rgba(210,206,18,.18);display:block;margin-bottom:2.5rem}
.testi-q{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,2.8vw,2.3rem);
  font-style:italic;font-weight:400;color:${T.cream};line-height:1.58;margin-bottom:3rem}
.testi-rule{width:56px;height:1px;
  background:linear-gradient(90deg,transparent,${T.accent},transparent);margin:0 auto 2rem}
.testi-name{font-family:'Playfair Display',serif;font-size:clamp(1rem,1.8vw,1.4rem);
  font-weight:600;color:${T.cream}}
.testi-role{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.2em;
  text-transform:uppercase;color:${T.accentDim};display:block;margin-top:.4rem}

/* ═══════════════════════════════════════════
   SECTION 7 — CTA
   Layout: Bold centered with ghost type, dark
════════════════════════════════════════════ */
#s7{background:${T.dark2};display:flex;align-items:center;justify-content:center;
  min-height:80vh;padding:clamp(7rem,18vh,14rem) clamp(1.5rem,7vw,7rem);
  position:relative;overflow:hidden;border-top:1px solid rgba(210,206,18,.08)}
.cta-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(6rem,22vw,22rem);color:transparent;
  -webkit-text-stroke:1px rgba(210,206,18,.04);white-space:nowrap;pointer-events:none;
  animation:ghostPulse 10s ease-in-out infinite}
@keyframes ghostPulse{0%,100%{letter-spacing:.02em;opacity:.7}50%{letter-spacing:.1em;opacity:1}}
.cta-inner{text-align:center;position:relative;z-index:2;max-width:820px}
.cta-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.5rem;letter-spacing:.28em;
  text-transform:uppercase;color:${T.accentDim};margin-bottom:1.6rem;
  display:flex;align-items:center;gap:.8rem;justify-content:center}
.cta-eyebrow span{width:28px;height:1px;background:${T.accentDim};display:inline-block}
.cta-h{font-family:'Playfair Display',serif;font-weight:700;
  font-size:clamp(2.5rem,7vw,7rem);line-height:.95;letter-spacing:-.03em;
  color:${T.cream};margin-bottom:1.5rem}
.cta-h em{color:${T.accent};font-style:italic}
.cta-p{font-size:clamp(.9rem,1.4vw,1rem);line-height:1.9;
  color:rgba(255,254,233,.38);max-width:520px;margin:0 auto 3rem}
.cta-btns{display:flex;gap:1.2rem;justify-content:center;flex-wrap:wrap}
.btn-fill{background:${T.accent};color:${T.dark};font-family:'Playfair Display',serif;
  font-size:.88rem;font-weight:700;letter-spacing:.18em;padding:1.1rem 3rem;border:none;
  cursor:pointer;text-transform:uppercase;text-decoration:none;display:inline-flex;
  align-items:center;gap:.6rem;position:relative;overflow:hidden;
  transition:background .3s,transform .3s}
.btn-fill::after{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
  transform:translateX(-100%);transition:transform .4s}
.btn-fill:hover::after{transform:translateX(100%)}
.btn-fill:hover{background:${T.accentDim};transform:translateY(-2px);color:${T.cream}}
.btn-stroke{background:transparent;color:${T.cream};font-family:'Playfair Display',serif;
  font-size:.88rem;font-weight:600;letter-spacing:.18em;padding:1.1rem 3rem;
  border:1px solid rgba(210,206,18,.35);cursor:pointer;text-transform:uppercase;
  text-decoration:none;display:inline-flex;align-items:center;gap:.6rem;
  transition:border-color .3s,color .3s,transform .3s}
.btn-stroke:hover{border-color:${T.accent};color:${T.accent};transform:translateY(-2px)}

/* ═══ RESPONSIVE ═══ */
@media(max-width:1024px){
  .s2-card-grid{grid-template-columns:1fr 1fr}
  .vb-body{grid-template-columns:1fr 1fr}
  .r-grid{grid-template-columns:repeat(2,1fr)}
  .bd-grid{grid-template-columns:1fr}
  .s2-top{grid-template-columns:1fr}
  .s4-head{grid-template-columns:1fr}
  #ch-nav{display:none}
}
@media(max-width:768px){
  .s1-layout{grid-template-columns:1fr}
  .s1-mega{writing-mode:horizontal-tb;transform:none;font-size:6rem;
    -webkit-text-stroke:1px rgba(210,206,18,.08)}
  .vb-header{flex-wrap:wrap}
  .vb-body{grid-template-columns:1fr}
  .s5-grid{grid-template-columns:1fr}
  .cta-btns{flex-direction:column;align-items:center}
}
@media(max-width:520px){
  .r-grid{grid-template-columns:1fr}
  .vert-pills{flex-direction:column}
}
  
@media (min-width: 1024px) {
  .hero-inner {
    margin-top: 100px;
  }
}
`;

/* ─── COUNT UP ─── */
function useCountUp(target, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const n = parseFloat(String(target).replace(/[^0-9.]/g, "")) || 0;
    const dur = 2400, t0 = performance.now();
    let raf;
    (function run(now) {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(e * n));
      if (p < 1) raf = requestAnimationFrame(run); else setVal(n);
    })(t0);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return val;
}
function Cnum({ raw, suf, on }) {
  const v = useCountUp(raw, on);
  return <>{v >= 1000 ? v.toLocaleString() : v}{suf}</>;
}

/* ─── MAIN ─── */
export default function Page() {
  const curRef = useRef(null), ringRef = useRef(null);
  const [ch, setCh] = useState(0);
  const [countsOn, setCountsOn] = useState(false);

  const SIDS = ["#s0","#s1","#s2","#s3","#s4","#s5","#s6","#s7"];
  const TICKERS = ["Leadsfinder Group · Dubai, UAE","Real Estate · Recruitment · Company Formation","369+ International Leads","5 Countries","4 Verticals Scaled Simultaneously","Vision9 Performance Marketing","Strategy Always Outperforms Spend"];

  /* ── CURSOR ── */
  useEffect(() => {
    const cur = curRef.current, ring = ringRef.current;
    if (!cur || !ring) return;
    let mx=0,my=0,cx=0,cy=0,rx=0,ry=0, raf;
    const mv = e => { mx=e.clientX; my=e.clientY; };
    document.addEventListener("mousemove", mv);
    (function l(){
      cx+=(mx-cx)*.18; cy+=(my-cy)*.18;
      rx+=(mx-rx)*.08; ry+=(my-ry)*.08;
      cur.style.left=cx+"px"; cur.style.top=cy+"px";
      ring.style.left=rx+"px"; ring.style.top=ry+"px";
      raf=requestAnimationFrame(l);
    })();
    document.querySelectorAll("a,button,.r-card,.s5-card,.hs-card,.lead-bar,.vb-header,.bd-row").forEach(el=>{
      el.addEventListener("mouseenter",()=>cur.classList.add("xl"));
      el.addEventListener("mouseleave",()=>cur.classList.remove("xl"));
    });
    return ()=>{ document.removeEventListener("mousemove",mv); cancelAnimationFrame(raf); };
  }, []);

  /* ── PROGRESS BAR ── */
  useEffect(() => {
    const bar = document.getElementById("vxp");
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / total * 100) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── INTERSECTION OBSERVER (reveals + chapter + counters) ── */
  useEffect(() => {
    // Reveals
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("vis"); revObs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".rv,.rv-l,.rv-r,.rv-s").forEach(el => revObs.observe(el));

    // Chapter
    const chObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = SIDS.indexOf("#"+e.target.id);
          if (i >= 0) setCh(i);
        }
      });
    }, { threshold: 0.35 });
    SIDS.forEach(id => { const el = document.querySelector(id); if(el) chObs.observe(el); });

    // Counters
    const cObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setCountsOn(true); cObs.disconnect(); }
    }, { threshold: 0.2 });
    const s4 = document.querySelector("#s4");
    if (s4) cObs.observe(s4);

    // Hscroll GSAP-like with pure JS
    const ht = document.querySelector(".hscroll-inner");
    if (ht) {
      const outer = ht.parentElement;
      let scrollStart = -1;
      const hsObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) scrollStart = window.scrollY;
          else scrollStart = -1;
        });
      }, { threshold: 0 });
      hsObs.observe(outer);
      const onS = () => {
        if (scrollStart < 0) return;
        const progress = Math.min((window.scrollY - scrollStart) / 600, 1);
        const maxX = ht.scrollWidth - outer.offsetWidth;
        ht.style.transform = `translateX(-${progress * maxX}px)`;
      };
      window.addEventListener("scroll", onS, { passive: true });
      return () => {
        revObs.disconnect(); chObs.disconnect(); cObs.disconnect(); hsObs.disconnect();
        window.removeEventListener("scroll", onS);
      };
    }

    return () => { revObs.disconnect(); chObs.disconnect(); cObs.disconnect(); };
  }, []);

  /* ── DATA ── */
  const RE_LEADS = [
    { c:"India",           n:"46",  l:"Investor Leads", w:46 },
    { c:"Morocco",         n:"83",  l:"Investor Leads", w:83 },
    { c:"Lebanon",         n:"5",   l:"Investor Leads", w:5 },
    { c:"Dubai/Abu Dhabi", n:"—",   l:"Brand Awareness",w:0 },
  ];
  const REC_LEADS = [
    { c:"Myanmar",         n:"29",  l:"Hiring Leads",   w:29 },
    { c:"India",           n:"142", l:"Hiring Leads",   w:100 },
    { c:"Arab Nat. #1",    n:"41",  l:"Hiring Leads",   w:41 },
    { c:"Arab Nat. #2",    n:"23",  l:"Hiring Leads",   w:23 },
  ];
  const CF_LEADS = [
    { c:"UAE Entrepreneurs",n:"86", l:"Inbound Leads",  w:86 },
  ];

  return (<>
    <style>{CSS}</style>
    <div id="vxc" ref={curRef}/>
    <div id="vxr" ref={ringRef}/>
    <div id="vxp"/>

    {/* Chapter nav dots */}
    <nav id="ch-nav">
      {["Hero","Overview","Strategy","Execution","Results","Insight","Quote","CTA"].map((_,i)=>(
        <div key={i} className={`ch-pip${ch===i?" on":""}`}
          onClick={()=>document.querySelector(SIDS[i])?.scrollIntoView({behavior:"smooth"})}/>
      ))}
    </nav>

    <Header/>

    {/* ══════ S0 HERO ══════ */}
    <section id="s0">
      <div className="hero-grid"/><div className="orb1"/><div className="orb2"/>
      <div className="scan-line"/><div className="nx" style={{opacity:.03}}/>

      <div className="hero-inner">
        <div className="hero-tag-row">
          {["Real Estate","Recruitment","Company Formation","Dubai, UAE"].map((t,i)=>(
            <><span key={t} className="hero-tag">{t}</span>{i<3&&<div className="hero-sep"/>}</>
          ))}
        </div>

        <div className="h1-clip"><div className="h1-line d1">BUILDING</div></div>
        <div className="h1-clip"><div className="h1-line acc d2">INTERNATIONAL</div></div>
        <div className="h1-clip"><div className="h1-line ghost d3">FUNNELS.</div></div>

        <div className="hero-meta">
          {[{n:"369+",l:"Total Leads"},{n:"5",l:"Countries"},{n:"4",l:"Verticals"},{n:"Multi-Phase",l:"Partnership"}]
            .map((s,i)=>(<>
              {i>0&&<div key={`d${i}`} className="hero-divider"/>}
              <div key={i} className="hero-stat">
                <span className="hs-n">{s.n}</span>
                <span className="hs-l">{s.l}</span>
              </div>
            </>))}
          <p className="hero-sub" style={{marginLeft:"auto"}}>
            How Vision9 built independent investor, recruitment & business growth funnels
            for Leadsfinder Group across 5 international markets — simultaneously.
          </p>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-bar"/>
        <span className="scroll-lbl">Scroll</span>
      </div>
    </section>

    {/* TICKER */}
    <div className="ticker-wrap">
      <div className="ticker-track">
        {[...TICKERS,...TICKERS].map((t,i)=>(
          <div key={i} className="tk">{t}<span className="tk-dot"/></div>
        ))}
      </div>
    </div>

    {/* ══════ S1 OVERVIEW ══════ */}
    <section id="s1">
      <div className="nx"/><div className="s1-diag"/>
      <div className="s1-layout">
        <div className="s1-mega rv-l">DUBAI</div>
        <div className="s1-content">
          <div className="eyebrow-row rv">
            <span className="eyebrow-line"/>
            <span className="lbl">01 — The Client</span>
          </div>
          <h2 className="s1-h rv d1">A premium <em>multi-vertical</em><br/>Dubai group</h2>
          <p className="s1-p rv d2">Leadsfinder Group is a premium, multi-vertical group of companies headquartered in Dubai, UAE. Operating across real estate, recruitment, HR services, marketing, and company formation — catering to both local and international markets.</p>
          <p className="s1-p rv d2">With ambitious expansion goals and multiple service lines, Leadsfinder Group partnered with Vision9 to design performance-led growth systems to attract investors, clients, job seekers, and entrepreneurs across different geographies.</p>

          <div className="vert-pills rv d3">
            {[
              {n:"01",name:"Real Estate",tag:"Investor Funnels"},
              {n:"02",name:"Recruitment & HR",tag:"Hiring Campaigns"},
              {n:"03",name:"Company Formation",tag:"B2B Lead Gen"},
              {n:"04",name:"Brand Awareness",tag:"Market Credibility"},
            ].map((v,i)=>(
              <div key={i} className="vert-pill">
                <span className="vert-pill-n">{v.n}</span>
                <span className="vert-pill-name">{v.name}</span>
                <span className="vert-pill-tag">{v.tag}</span>
              </div>
            ))}
          </div>

          <div className="challenge-inset rv d4">
            <p className="ci-quote">"Each vertical had distinct audiences, languages, and markets. One-size-fits-all marketing would fail — the solution demanded <em>segmentation, precision, and execution discipline.</em>"</p>
            <span className="ci-attr">Vision9 — Strategic Assessment</span>
          </div>

          <div className="issues-list rv d5">
            {[
              "International investor funnels needed country-specific psychology & creatives",
              "Recruitment required nationality-specific targeting filters and messaging",
              "Company formation demanded trust-first inbound lead flows, not mass ads",
              "All four verticals needed to scale simultaneously without cannibalism",
            ].map((r,i)=>(
              <div key={i} className="issue-item">
                <span className="issue-n">0{i+1}</span>
                <span className="issue-txt">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ══════ S2 STRATEGY ══════ */}
    <section id="s2">
      <div className="s2-bg-word">STRATEGY</div>

      <div className="s2-top">
        <div>
          <div className="rv" style={{display:"flex",alignItems:"center",gap:".8rem",marginBottom:"1.4rem"}}>
            <span className="eyebrow-line" style={{background:T.accentDim}}/>
            <span className="lbl lbl-light">02 — Strategic Direction</span>
          </div>
          <h2 className="s2-h rv d1">Independent funnels<br/>for <em>every vertical</em></h2>
        </div>
        <div style={{paddingTop:"clamp(2rem,5vh,4rem)"}}>
          <p className="s2-p rv d2">Instead of a unified campaign, Vision9 built completely separate growth systems for each service line — each with its own messaging, creatives, targeting logic, and lead capture flow. The common thread was performance discipline.</p>
          <p className="s2-p rv d3" style={{marginTop:".8rem"}}>Every dirham tracked. Every creative tested. Every audience refined continuously.</p>
        </div>
      </div>

      <div className="s2-pillars rv d2">
        {[
          "Market-specific psychology — distinct messages for India, Morocco, Lebanon, Myanmar, Arab Nations",
          "Performance-driven creatives built around investor intent, hiring needs, and business formation goals",
          "WhatsApp-first and form-based lead capture matched to each vertical's conversion behaviour",
          "Continuous cross-market optimisation — learnings from one region applied to others",
        ].map((r,i)=>(
          <div key={i} className="pillar-item">
            <span className="pi-n">0{i+1}</span>
            <span className="pi-txt">{r}</span>
            <span className="pi-arrow">→</span>
          </div>
        ))}
      </div>

      <div className="s2-card-grid">
        {[
          {n:"04",tag:"Active Verticals",    title:"Real Estate, Recruitment, Company Formation, Brand",  desc:"Each vertical ran as a fully independent performance funnel with dedicated budgets and creatives."},
          {n:"05",tag:"Target Countries",    title:"India, Morocco, Lebanon, Myanmar, Arab Nations + UAE", desc:"Country-wise Meta Ads segmentation with region-specific psychological messaging."},
          {n:"03",tag:"Lead Channels",       title:"WhatsApp, Lead Forms & Brand Awareness Campaigns",    desc:"Multi-channel approach precisely matched to each vertical's conversion behaviour."},
          {n:"01",tag:"Unifying Principle",  title:"Strategy First. Execution Second. Results Always.",    desc:"Performance marketing works best when strategic architecture leads, not ad spend."},
        ].map((c,i)=>(
          <div key={i} className={`s2-card rv d${i+1}`}>
            {/* <div className="sc-ghost">{c.n}</div> */}
            <span className="sc-tag">{c.tag}</span>
            <div className="sc-title">{c.title}</div>
            <p className="sc-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ══════ S3 VERTICALS ══════ */}
    <section id="s3">
      <div className="nx" style={{opacity:.03}}/>
      <div className="s3-header rv">
        <div>
          <div style={{display:"flex",alignItems:"center",gap:".8rem",marginBottom:"1rem"}}>
            <span className="eyebrow-line"/>
            <span className="lbl">03 — Vertical Execution</span>
          </div>
          <h2 className="s3-h">Three verticals.<br/><em>One architecture.</em></h2>
        </div>
        <div className="s3-count">03</div>
      </div>

      {/* 3A — Real Estate */}
      <div className="vert-block rv">
        <div className="vb-header">
          <div className="vb-num">01</div>
          <div className="vb-title-wrap">
            <div className="vb-eyebrow">Real Estate</div>
            <h3 className="vb-title">International <em>Investor Funnels</em></h3>
          </div>
          <div className="vb-total">
            <span className="vbt-n">134</span>
            <span className="vbt-l">Investor Leads</span>
          </div>
        </div>
        <div className="vb-body">
          <div className="vb-desc">
            <p>Generating high intent international investors for Azizi Milan and DAMAC Dubai required precision targeting far beyond standard property ads.</p>
            <p>Vision9 developed region-specific creatives highlighting investment value, then ran Meta Ads with country-wise segmentation optimised for investor psychology per market.</p>
            <div className="mkt-row">
              {["India","Morocco","Lebanon","Dubai","Abu Dhabi"].map((m,i)=>(
                <span key={i} className="mkt-tag">{m}</span>
              ))}
            </div>
          </div>
          <div>
            <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Execution</p>
            <div className="exec-steps">
              {["Developed region-specific creatives highlighting investment ROI","Ran Meta Ads with country-wise audience segmentation","Optimised messaging based on investor psychology per market","Used WhatsApp funnels for faster investor conversions"]
                .map((s,i)=>(
                  <div key={i} className="exec-step">
                    <span className="es-n">0{i+1}</span>
                    <span className="es-t">{s}</span>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Results — Azizi Milan</p>
            <div className="lead-bars">
              {RE_LEADS.map((l,i)=>(
                <div key={i} className="lead-bar" style={{["--bar-w"]: l.w+"%"}}>
                  <span className="lb-country">{l.c}</span>
                  <span className="lb-n">{l.n}</span>
                  <span className="lb-lbl">{l.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3B — Recruitment */}
      <div className="vert-block rv d2">
        <div className="vb-header">
          <div className="vb-num">02</div>
          <div className="vb-title-wrap">
            <div className="vb-eyebrow">Recruitment & HR</div>
            <h3 className="vb-title">Targeted <em>Hiring Campaigns</em></h3>
          </div>
          <div className="vb-total">
            <span className="vbt-n">235</span>
            <span className="vbt-l">Hiring Leads</span>
          </div>
        </div>
        <div className="vb-body">
          <div className="vb-desc">
            <p>Supporting Dubai-based companies with targeted international recruitment required nationality-specific targeting filters and hiring-focused messaging — very different from consumer marketing.</p>
            <p>Vision9 applied nationality-based audience targeting and ran campaigns optimised for response quality over volume.</p>
            <div className="mkt-row">
              {["Myanmar","India","Arab Nationals"].map((m,i)=>(
                <span key={i} className="mkt-tag">{m}</span>
              ))}
            </div>
          </div>
          <div>
            <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Execution</p>
            <div className="exec-steps">
              {["Created hiring-focused static creatives and copy per nationality","Applied nationality-based audience targeting filters on Meta","Optimised for response quality, not just click volume","Managed separate campaigns per nationality to prevent bleed"]
                .map((s,i)=>(
                  <div key={i} className="exec-step">
                    <span className="es-n">0{i+1}</span>
                    <span className="es-t">{s}</span>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Results — Recruitment</p>
            <div className="lead-bars">
              {REC_LEADS.map((l,i)=>(
                <div key={i} className="lead-bar">
                  <span className="lb-country">{l.c}</span>
                  <span className="lb-n">{l.n}</span>
                  <span className="lb-lbl">{l.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3C — Company Formation */}
      <div className="vert-block rv d3">
        <div className="vb-header">
          <div className="vb-num">03</div>
          <div className="vb-title-wrap">
            <div className="vb-eyebrow">Company Formation</div>
            <h3 className="vb-title">Trust-First <em>Business Funnels</em></h3>
          </div>
          <div className="vb-total">
            <span className="vbt-n">86</span>
            <span className="vbt-l">Business Leads</span>
          </div>
        </div>
        <div className="vb-body">
          <div className="vb-desc">
            <p>Company formation is a high consideration decision. Entrepreneurs need trust before they act. Vision9 built trust-driven messaging with UGC-style content to simplify complex concepts.</p>
            <p>WhatsApp-first lead funnels enabled immediate, high intent conversations with prospective business owners.</p>
          </div>
          <div>
            <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Execution</p>
            <div className="exec-steps">
              {["Developed UGC-style content simplifying company formation process","Built trust-first messaging for entrepreneurs and business owners","Used WhatsApp-first lead funnels for direct, high intent conversations","Supported with brand awareness campaigns across UAE markets"]
                .map((s,i)=>(
                  <div key={i} className="exec-step">
                    <span className="es-n">0{i+1}</span>
                    <span className="es-t">{s}</span>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:".46rem",letterSpacing:".18em",textTransform:"uppercase",color:T.muted,marginBottom:".8rem"}}>Results</p>
            <div className="lead-bars">
              {CF_LEADS.map((l,i)=>(
                <div key={i} className="lead-bar">
                  <span className="lb-country">{l.c}</span>
                  <span className="lb-n">{l.n}</span>
                  <span className="lb-lbl">{l.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══════ HSCROLL ══════ */}
    <div className="hscroll-outer">
      <div className="hscroll-inner" style={{transition:"transform .1s linear"}}>
        {[
          {n:"369+",  l:"Total Leads",              d:"All verticals combined"},
          {n:"134",   l:"RE Investor Leads",         d:"India, Morocco & Lebanon"},
          {n:"235",   l:"Recruitment Leads",         d:"Myanmar, India & Arab Nationals"},
          {n:"86",    l:"Company Formation",         d:"WhatsApp-first inbound"},
          {n:"5",     l:"Countries Targeted",        d:"UAE, India, Morocco, Lebanon, Myanmar"},
          {n:"4",     l:"Verticals Scaled",          d:"Simultaneously"},
          {n:"Multi", l:"Phase Partnership",         d:"Evolving engagement"},
          {n:"#1",    l:"Priority: Intent",          d:"Qualified leads, not just volume"},
        ].map((c,i)=>(
          <div key={i} className="hs-card">
            <span className="hs-n">{c.n}</span>
            <span className="hs-l">{c.l}</span>
            <p className="hs-d">{c.d}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ══════ S4 RESULTS ══════ */}
    <section id="s4">
      <div className="s4-glow"/><div className="nx" style={{opacity:.025}}/>
      <div className="s4-head">
        <div>
          <div className="rv" style={{display:"flex",alignItems:"center",gap:".8rem",marginBottom:"1.2rem"}}>
            <span className="eyebrow-line"/>
            <span className="lbl">04 — Campaign Results</span>
          </div>
          <h2 className="s4-h rv d1">Numbers across<br/><em>five nations.</em></h2>
        </div>
        <p className="s4-sub rv d2">
          Across every vertical and every market, Vision9 maintained one standard: every lead had to be qualified for the specific service being promoted — not just counted.
        </p>
      </div>

      <div className="r-grid">
        {[
          {raw:"369",  suf:"+",  lbl:"Total Leads",       desc:"Combined across all verticals and markets"},
          {raw:"134",  suf:"",   lbl:"RE Investor Leads", desc:"International investor leads for Azizi Milan"},
          {raw:"235",  suf:"",   lbl:"Recruitment Leads", desc:"Hiring leads across 3 nationality segments"},
          {raw:"86",   suf:"",   lbl:"Company Formation", desc:"Inbound WhatsApp-first business leads"},
        ].map((c,i)=>(
          <div key={i} className={`r-card rv d${i+1}`}>
            <span className="r-lbl">{c.lbl}</span>
            <span className="r-num"><Cnum raw={c.raw} suf={c.suf} on={countsOn}/></span>
            <p className="r-desc">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Breakdown table */}
      <div className="breakdown rv d3">
        <p className="bd-title">Lead Breakdown by Vertical & Market</p>
        <div className="bd-grid">
          <div className="bd-col">
            <div className="bd-col-head"><span className="bch-name">Real Estate</span><span className="bch-icon">🏙</span></div>
            <div className="bd-rows">
              {[["Azizi Milan — India","46"],["Azizi Milan — Morocco","83"],["Azizi Milan — Lebanon","5"],["Dubai / Abu Dhabi","Awareness"]].map(([c,n],i)=>(
                <div key={i} className="bd-row"><span className="bd-country">{c}</span><span className="bd-leads">{n}</span></div>
              ))}
            </div>
            <div className="bd-foot"><span className="bdf-lbl">Subtotal</span><span className="bdf-n">134</span></div>
          </div>
          <div className="bd-col">
            <div className="bd-col-head"><span className="bch-name">Recruitment</span><span className="bch-icon">🌐</span></div>
            <div className="bd-rows">
              {[["Myanmar Hiring","29"],["Indian Campaign","142"],["Arab Nationals #1","41"],["Arab Nationals #2","23"]].map(([c,n],i)=>(
                <div key={i} className="bd-row"><span className="bd-country">{c}</span><span className="bd-leads">{n}</span></div>
              ))}
            </div>
            <div className="bd-foot"><span className="bdf-lbl">Subtotal</span><span className="bdf-n">235</span></div>
          </div>
          <div className="bd-col">
            <div className="bd-col-head"><span className="bch-name">Company Formation</span><span className="bch-icon">🏢</span></div>
            <div className="bd-rows">
              {[["UAE Business Owners","86"],["Brand Awareness Campaigns","—"],["Multi-market presence","—"]].map(([c,n],i)=>(
                <div key={i} className="bd-row"><span className="bd-country">{c}</span><span className="bd-leads">{n}</span></div>
              ))}
            </div>
            <div className="bd-foot"><span className="bdf-lbl">Subtotal</span><span className="bdf-n">86</span></div>
          </div>
        </div>
      </div>
    </section>

    {/* ══════ S5 INSIGHT ══════ */}
    <section id="s5">
      <div className="s5-bg">SCALE</div>

      <div className="rv">
        <div style={{display:"flex",alignItems:"center",gap:".8rem",marginBottom:"1.2rem"}}>
          <span className="eyebrow-line" style={{background:T.accentDim}}/>
          <span className="lbl lbl-light">05 — Key Insight</span>
        </div>
      </div>

      <div className="s5-pullquote rv d1">
        <span className="pq-mark">❝</span>
        <p className="pq-text">Scaling across services, countries, and audiences requires more than ads — it requires <em>segmentation, clarity, and execution discipline.</em> Strategy always outperforms spend.</p>
        <span className="pq-attr">Vision9 — Strategic Takeaway · Leadsfinder Engagement</span>
      </div>

      <div className="s5-grid">
        {[
          {n:"01", title:"Segment Before You Spend",   desc:"Each vertical, market, and nationality required entirely distinct messaging, creatives, and targeting. Not an adaptation — a completely independent system."},
          {n:"02", title:"Intent Over Volume",          desc:"The goal was never reach — it was relevance. Every lead across every market was qualified for the specific service being promoted, not just counted."},
          {n:"03", title:"Systems Enable Complexity",   desc:"Managing four verticals across five countries simultaneously was only possible because each funnel was built as an independent system, not a variation on a master campaign."},
          {n:"04", title:"Strategy Leads, Ads Follow",  desc:"Without a clear strategic architecture established upfront, performance marketing at this scale would have produced fragmented noise rather than compounding results."},
        ].map((c,i)=>(
          <div key={i} className={`s5-card rv d${i+1}`}>
            <span className="s5c-n">{c.n}</span>
            <div className="s5c-title">{c.title}</div>
            <p className="s5c-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ══════ S6 TESTIMONIAL ══════ */}
    <section id="s6">
      <div className="nx" style={{opacity:.03}}/>
      <div className="s6-glow"/>
      <div className="testi-inner rv">
        <span className="testi-mark">❝</span>
        <p className="testi-q">"Vision9 understood the complexity of our business from day one. They didn't try to simplify it into one campaign — they built separate, focused systems for each of our verticals and delivered results across markets we hadn't even expected to penetrate so quickly."</p>
        <div className="testi-rule"/>
        <div className="testi-name">Leadsfinder Group</div>
        <span className="testi-role">Management Team · Dubai, UAE</span>
      </div>
    </section>

    {/* ══════ S7 CTA ══════ */}
    <section id="s7">
      <div className="nx" style={{opacity:.03}}/>
      <div className="cta-ghost">VISION9</div>
      <div className="cta-inner">
        <div className="cta-eyebrow rv"><span/>Ready to scale internationally?<span/></div>
        <h2 className="cta-h rv d1">Let's Build<br/>Systems That <em>Scale</em></h2>
        <p className="cta-p rv d2">Whether one service or four, one market or five — Vision9 builds the growth architecture your brand needs to perform at scale, with precision.</p>
        <div className="cta-btns rv d3">
          <a href="/contact" className="btn-fill">Book a Strategy Call</a>
          <a href="/case_studies" className="btn-stroke">View More Case Studies</a>
        </div>
      </div>
    </section>

    <Footer/>
  </>);
}