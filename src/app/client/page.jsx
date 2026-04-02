"use client";
import { useEffect, useRef } from "react";
import Header from "../../components/custom/Header";
import Footer from "../../components/custom/Footer";

/* ═══════════════════════════════════════════════════════════════
   THEME edit here to retheme the entire page
   Every color in this file flows from these tokens only.
═══════════════════════════════════════════════════════════════ */
// const THEME = {
//   accent: "#A8832A",
//   accentLight: "#D4B86A",
//   accentMid: "#C4A24E",
//   accentDark: "#6B5010",
//   pageBg: "#FAF8F2",
//   pageBgAlt: "#F2EDE0",
//   cardBg: "#FFFFFF",
//   navBg: "rgba(250,248,242,0.93)",
//   textPrimary: "#1C1A14",
//   textSecondary: "#56503E",
//   textMuted: "#9A8E72",
//   border: "rgba(168,131,42,0.20)",
//   borderFaint: "rgba(168,131,42,0.10)",
//   tickerBg: "#A8832A",
//   tickerText: "#FAF8F2",
//   cursorFill: "#A8832A",
//   cursorRing: "rgba(168,131,42,0.28)",
//   btnSolidBg: "#A8832A",
//   btnSolidText: "#FAF8F2",
//   btnSolidHover: "#C4A24E",
//   btnOutlineBorder: "rgba(168,131,42,0.38)",
//   btnOutlineText: "#1C1A14",
//   btnOutlineHover: "#A8832A",
//   pillHoverBg: "#A8832A",
//   pillHoverText: "#FAF8F2",
//   logoCellHoverBg: "#A8832A",
//   logoCellHoverText: "#FAF8F2",
// };

const THEME = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentMid: "#d2ce12",
  accentDark: "#737017",

  pageBg: "#fffee9",
  pageBgAlt: "#f5f2c8",
  cardBg: "#ffffff",

  navBg: "rgba(255,252,214,0.93)",

  textPrimary: "#231f1f",
  textSecondary: "#58564d",
  textMuted: "#a19f8a",

  border: "rgba(115,112,23,0.20)",
  borderFaint: "rgba(115,112,23,0.10)",

  tickerBg: "#a6a216",
  tickerText: "#fffee9",

  cursorFill: "#a6a216",
  cursorRing: "rgba(166,162,22,0.28)",

  btnSolidBg: "#a6a216",
  btnSolidText: "#fffee9",
  btnSolidHover: "#d2ce12",

  btnOutlineBorder: "rgba(115,112,23,0.38)",
  btnOutlineText: "#231f1f",
  btnOutlineHover: "#a6a216",

  pillHoverBg: "#a6a216",
  pillHoverText: "#fffee9",

  logoCellHoverBg: "#a6a216",
  logoCellHoverText: "#fffee9",
};
const v = (t) =>
  [
    `--accent:${t.accent}`,
    `--accent-l:${t.accentLight}`,
    `--accent-m:${t.accentMid}`,
    `--accent-d:${t.accentDark}`,
    `--bg:${t.pageBg}`,
    `--bg-alt:${t.pageBgAlt}`,
    `--card:${t.cardBg}`,
    `--nav-bg:${t.navBg}`,
    `--text:${t.textPrimary}`,
    `--text-sec:${t.textSecondary}`,
    `--muted:${t.textMuted}`,
    `--border:${t.border}`,
    `--border-f:${t.borderFaint}`,
    `--tick-bg:${t.tickerBg}`,
    `--tick-txt:${t.tickerText}`,
    `--cur:${t.cursorFill}`,
    `--cur-ring:${t.cursorRing}`,
    `--btn-bg:${t.btnSolidBg}`,
    `--btn-txt:${t.btnSolidText}`,
    `--btn-hover:${t.btnSolidHover}`,
    `--btn-ob:${t.btnOutlineBorder}`,
    `--btn-ot:${t.btnOutlineText}`,
    `--btn-ohover:${t.btnOutlineHover}`,
    `--pill-hbg:${t.pillHoverBg}`,
    `--pill-htxt:${t.pillHoverText}`,
    `--logo-hbg:${t.logoCellHoverBg}`,
    `--logo-htxt:${t.logoCellHoverText}`,
  ].join(";");

// const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;
const FONTS = `@import url('../../public/fonts.css');`;
const CSS = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{${v(THEME)}}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;font-weight:300;overflow-x:hidden;cursor:none}

/* CURSOR */
#cur{width:8px;height:8px;background:var(--cur);position:fixed;pointer-events:none;z-index:9999;
  transform:translate(-50%,-50%);transition:width .35s,height .35s,border-radius .35s}
#cur.big{width:44px;height:44px;background:transparent;border:1px solid var(--cur);border-radius:0}
#cur-ring{width:32px;height:32px;border:1px solid var(--cur-ring);position:fixed;pointer-events:none;
  z-index:9998;transform:translate(-50%,-50%);transition:width .5s,height .5s}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;
  padding:1.2rem clamp(1.5rem,5vw,4rem);z-index:200;border-bottom:1px solid var(--border);
  background:var(--nav-bg);backdrop-filter:blur(16px)}
.logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;
  letter-spacing:.06em;color:var(--text);text-decoration:none}
.logo .g{color:var(--accent)}
.nav-t{font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--muted)}

/* FURNITURE */
.sec-orn{font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;
  color:var(--accent);margin-bottom:.9rem;display:flex;align-items:center;gap:.7rem}
.sec-orn::before{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(270deg,var(--accent),transparent)}
.sec-orn::after{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(90deg,var(--accent),transparent)}
.sec-rule{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--accent-m),transparent);opacity:.3}
.sec-h{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,3.5rem);font-weight:600;
  line-height:1.15;max-width:600px;margin-bottom:3rem;color:var(--text)}
.sec-h em{color:var(--accent);font-style:italic}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;
  padding:clamp(6rem,14vh,10rem) clamp(1.5rem,5vw,4rem) 0;position:relative;overflow:hidden;background:var(--bg)}
.hero-noise{position:absolute;inset:0;opacity:.015;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px 200px;pointer-events:none}
.hero-glow{position:absolute;top:-20%;left:-10%;width:700px;height:700px;
  background:radial-gradient(ellipse,var(--accent-l) 0%,transparent 70%);opacity:.1;pointer-events:none}
.hero-kicker{font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--accent);margin-bottom:1.6rem;opacity:0;animation:fadeUp .7s .3s forwards;
  display:flex;align-items:center;gap:.8rem}
.hero-kicker span{width:20px;height:1px;background:var(--accent);display:inline-block}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(4rem,12vw,12rem);
  line-height:.87;letter-spacing:-.02em;overflow:hidden;font-weight:900;color:var(--text)}
.tl{display:block;clip-path:inset(0 0 100% 0);animation:clipR .95s cubic-bezier(.16,1,.3,1) forwards}
.tl1{animation-delay:.45s}.tl2{animation-delay:.6s;color:var(--accent);font-style:italic}.tl3{animation-delay:.75s}
@keyframes clipR{to{clip-path:inset(0 0 0% 0)}}
.hero-sub{max-width:500px;margin-top:2rem;font-size:clamp(.88rem,1.4vw,1rem);line-height:1.85;
  color:var(--text-sec);opacity:0;animation:fadeUp .8s 1s forwards}

/* STATS */
.stats{display:flex;border-top:1px solid var(--border);margin-top:clamp(3rem,6vh,5rem);
  opacity:0;animation:fadeUp .7s 1.2s forwards;background:var(--bg)}
.stat{flex:1;padding:1.4rem clamp(1rem,3vw,2.5rem);border-right:1px solid var(--border);
  transition:background .3s}
.stat:hover{background:var(--bg-alt)}.stat:last-child{border-right:none}
.sn{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3.5vw,3rem);
  line-height:1;color:var(--accent);display:block;font-weight:700}
.sl{font-family:'Tenor Sans',sans-serif;font-size:clamp(.52rem,.85vw,.66rem);
  letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-top:.3rem;display:block}

/* TICKER */
.ticker-wrap{height:52px;background:var(--tick-bg);overflow:hidden;display:flex;align-items:center}
.tkr{display:flex;white-space:nowrap;animation:tkrAnim 22s linear infinite}
.ti{font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700;letter-spacing:.2em;
  color:var(--tick-txt);padding:0 2.2rem;display:flex;align-items:center;gap:1.4rem;text-transform:uppercase}
.td{width:5px;height:5px;background:var(--tick-txt);transform:rotate(45deg);opacity:.4;flex-shrink:0}
@keyframes tkrAnim{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* INDUSTRIES */
.ind{padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);background:var(--bg-alt)}
.ind-wrap{overflow:hidden;margin-bottom:.8rem}
.ind-row{display:flex;white-space:nowrap;gap:1rem}
.rr{animation:sL 26s linear infinite}.rl{animation:sR 32s linear infinite}.rr2{animation:sL 21s linear infinite}
@keyframes sL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes sR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
.pill{display:inline-flex;align-items:center;gap:.6rem;border:1px solid var(--border);
  padding:.65rem 1.3rem;font-family:'Playfair Display',serif;font-size:clamp(.85rem,1.7vw,1.15rem);
  font-weight:400;letter-spacing:.06em;color:var(--text);white-space:nowrap;flex-shrink:0;
  background:var(--card);transition:background .3s,border-color .3s,color .3s;cursor:none}
.pill:hover{background:var(--pill-hbg);border-color:var(--pill-hbg);color:var(--pill-htxt)}
.pill .dot{width:5px;height:5px;background:var(--accent);transform:rotate(45deg);
  flex-shrink:0;transition:background .3s}
.pill:hover .dot{background:var(--pill-htxt)}

/* EXPERIENCE */
.exp{padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);display:grid;
  grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,6rem);align-items:start;background:var(--bg)}
.exp-l{position:sticky;top:clamp(5rem,10vh,7rem)}
.exp-body{font-size:clamp(.88rem,1.4vw,1rem);line-height:1.9;color:var(--text-sec);margin-bottom:1.8rem}
.exp-areas{margin-top:2rem;border-top:1px solid var(--border)}
.ea{display:flex;align-items:flex-start;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border);
  opacity:0;transform:translateX(-18px);transition:opacity .6s,transform .6s}
.ea.on{opacity:1;transform:translateX(0)}
.ea-n{font-family:'Playfair Display',serif;font-size:.88rem;color:var(--accent);min-width:2rem;padding-top:.1rem}
.ea-t{font-size:clamp(.8rem,1.25vw,.92rem);line-height:1.7;color:var(--text-sec)}
.cnt-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;
  background:var(--border);border:1px solid var(--border);margin-top:3rem}
.cnt{background:var(--card);padding:clamp(1.4rem,3vw,2.5rem);position:relative;
  overflow:hidden;transition:background .4s}
.cnt:hover{background:var(--bg-alt)}
.cnt::before{content:'◆';position:absolute;bottom:.6rem;right:.8rem;font-size:.4rem;color:var(--border)}
.cnt::after{content:'';position:absolute;top:0;left:0;width:100%;height:1px;
  background:linear-gradient(90deg,var(--accent-d),var(--accent),var(--accent-m));
  transform:scaleX(0);transform-origin:left;transition:transform .5s}
.cnt:hover::after{transform:scaleX(1)}
.cv{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,4.5vw,4rem);
  color:var(--accent);line-height:1;display:block;font-weight:700}
.cl{font-family:'Tenor Sans',sans-serif;font-size:clamp(.6rem,.95vw,.72rem);
  letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-top:.4rem;display:block}

/* TESTIMONIALS */
.testi{padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);overflow:hidden;background:var(--bg-alt)}
.testi-track{display:flex;gap:clamp(1rem,2vw,1.5rem);overflow-x:auto;scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:.5rem;cursor:grab;user-select:none}
.testi-track::-webkit-scrollbar{display:none}
.testi-track.drag{cursor:grabbing}
.tc{flex-shrink:0;width:clamp(280px,38vw,420px);background:var(--card);border:1px solid var(--border);
  padding:clamp(1.5rem,3vw,2.5rem);scroll-snap-align:start;position:relative;overflow:hidden;
  box-shadow:0 2px 16px var(--border-f);transition:border-color .4s,transform .4s,box-shadow .4s}
.tc:hover{border-color:var(--accent-m);transform:translateY(-5px);box-shadow:0 16px 48px var(--border)}
.tc::before{font-family:'Playfair Display',serif;font-size:6rem;line-height:.7;
  color:var(--border);position:absolute;top:.8rem;right:1.2rem;pointer-events:none;font-weight:400}
.tc::after{content:'';position:absolute;bottom:12px;right:12px;width:16px;height:16px;
  border-bottom:1px solid var(--border);border-right:1px solid var(--border)}
.tq{font-family:'Playfair Display',serif;font-size:clamp(.82rem,1.25vw,.93rem);line-height:1.88;
  color:var(--text-sec);margin-bottom:1.5rem;font-style:italic;font-weight:400}
.t-div{width:24px;height:1px;background:linear-gradient(90deg,var(--accent),transparent);margin-bottom:1.2rem}
.tn{font-family:'Playfair Display',serif;font-size:clamp(.95rem,1.7vw,1.2rem);
  letter-spacing:.04em;color:var(--text);font-weight:600}
.tr{font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;
  color:var(--accent);margin-top:.25rem;display:block}
.drag-h{display:flex;align-items:center;gap:.8rem;margin-top:1.2rem;
  font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
.drag-line{width:32px;height:1px;background:linear-gradient(90deg,var(--accent),transparent)}
.prog-bar{height:1px;background:var(--border);margin-top:1.5rem;position:relative;overflow:hidden}
.prog-fill{position:absolute;top:0;left:0;bottom:0;
  background:linear-gradient(90deg,var(--accent-d),var(--accent),var(--accent-m));width:0%;transition:width .1s}

/* LOGOS */
.logos{padding:clamp(4rem,8vh,6rem) clamp(1.5rem,5vw,4rem);border-top:1px solid var(--border);background:var(--bg)}
.lg-grid{display:flex;flex-wrap:wrap;border:1px solid var(--border);margin-top:clamp(2rem,4vh,3rem)}
.lg-cell{flex:1 0 calc(25% - 0px);min-width:160px;;
  border-right:1px solid var(--border);border-bottom:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;
  font-size:clamp(.8rem,1.6vw,1.1rem);font-weight:400;letter-spacing:.08em;
  color:var(--muted);text-align:center;position:relative;overflow:hidden;cursor:none;
  background:var(--card);transition:color .4s}
.lg-cell::after{content:'';position:absolute;inset:0;background:var(--logo-hbg);
  transform:translateY(102%);transition:transform .4s cubic-bezier(.16,1,.3,1);z-index:0}
// .lg-cell:hover::after{transform:translateY(0)}
// .lg-cell:hover{color:var(--logo-htxt)}
.lg-cell span{position:relative;z-index:1;white-space:pre-line;text-align:center;font-weight:600}

/* CTA */
.cta{padding:clamp(6rem,14vh,10rem) clamp(1.5rem,5vw,4rem);text-align:center;
  position:relative;overflow:hidden;display:flex;flex-direction:column;
  align-items:center;background:var(--bg-alt)}
.cta-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  font-family:'Playfair Display',serif;font-size:clamp(5rem,18vw,18rem);color:transparent;
  -webkit-text-stroke:1px var(--border);white-space:nowrap;pointer-events:none;
  animation:gPulse 8s ease-in-out infinite;font-weight:900}
.cta-orn{font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--accent);margin-bottom:1.4rem;position:relative;display:flex;align-items:center;
  gap:.8rem;justify-content:center}
.cta-orn span{width:30px;height:1px;background:var(--accent);display:inline-block}
.cta-h{font-family:'Playfair Display',serif;font-size:clamp(2rem,5.5vw,5rem);
  font-weight:600;line-height:1.08;max-width:740px;position:relative;color:var(--text)}
.cta-h em{color:var(--accent);font-style:italic}
.cta-sub{margin-top:1.5rem;font-size:clamp(.85rem,1.4vw,1rem);color:var(--text-sec);
  max-width:480px;line-height:1.8;position:relative}
.cta-btns{margin-top:2.5rem;display:flex;gap:1.2rem;flex-wrap:wrap;justify-content:center;position:relative}
.btn-solid{background:var(--btn-bg);color:var(--btn-txt);font-family:'Playfair Display',serif;
  font-size:.88rem;font-weight:700;letter-spacing:.15em;padding:1rem 2.8rem;border:none;
  cursor:none;text-decoration:none;display:inline-block;text-transform:uppercase;
  position:relative;overflow:hidden;transition:background .3s,transform .3s}
.btn-solid::after{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
  transform:translateX(-100%);transition:transform .4s}
.btn-solid:hover::after{transform:translateX(100%)}
.btn-solid:hover{background:var(--btn-hover);transform:translateY(-2px)}
.btn-outline{background:transparent;color:var(--btn-ot);font-family:'Playfair Display',serif;
  font-size:.88rem;font-weight:600;letter-spacing:.15em;padding:1rem 2.8rem;
  border:1px solid var(--btn-ob);cursor:none;text-decoration:none;display:inline-block;
  text-transform:uppercase;transition:border-color .3s,color .3s,transform .3s}
.btn-outline:hover{border-color:var(--btn-ohover);color:var(--btn-ohover);transform:translateY(-2px)}

/* REVEAL */
.rv{opacity:0;transform:translateY(38px);transition:opacity .85s ease,transform .85s cubic-bezier(.16,1,.3,1)}
.rv.on{opacity:1;transform:translateY(0)}
.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}.d5{transition-delay:.5s}

@keyframes fadeUp{to{opacity:1;transform:translateY(0)}}
@keyframes gPulse{0%,100%{opacity:.4;letter-spacing:.02em}50%{opacity:.9;letter-spacing:.1em}}
@media(max-width:768px){.exp{grid-template-columns:1fr}.exp-l{position:static}.stats{display:none}.lg-cell{flex:1 0 20%}}
@media(max-width:480px){.lg-cell{flex:1 0 20%}.cta-btns{flex-direction:column;align-items:stretch}}

/* Add this inside your CSS string */
.t-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.t-img {
  width: 48px;
  height: 48px;
  border-radius: 50%; /* Circular */
  object-fit: cover;
  border: 1px solid var(--border);
  background: var(--bg-alt);
}
  /* Update these in your CSS constant */

.lg-cell {
  flex: 1 0 calc(12% - 0px);
  aspect-ratio: 1 / 1; /* Forces a perfect square */
  min-width: 160px;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: var(--card);
  cursor: none;
}

.lg-img {
  width: 70%; /* Adjust based on how much padding you want */
  height: 70%;
  object-fit: contain; /* Keeps logo proportions, fits in box */
  transition: transform .4s ease, opacity .4s ease;
  opacity: 0.8;
}

// .lg-cell:hover .lg-img {
//   transform: scale(0.8);
//   opacity: 0.1; /* Fade out logo to show text */
//   filter: grayscale(0%);
// }

.lg-cell span {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 1rem;
  text-align: center;
  font-family: 'Playfair Display', serif;
  font-size: clamp(.8rem, 1.6vw, 1.1rem);
  font-weight: 600;
  color: var(--logo-htxt);
  background: var(--logo-hbg);
  opacity: 0; /* Hidden by default */
  transform: translateY(10%);
  transition: opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1);
  pointer-events: none;
  white-space: pre-line;
}

// .lg-cell:hover span {
//   opacity: 1;
//   transform: translateY(0);
// }
`;

export default function ClientsPage() {
  const curRef = useRef(null),
    ringRef = useRef(null);
  const trackRef = useRef(null),
    fillRef = useRef(null);
  const drag = useRef({ down: false, sx: 0, sl: 0 });

  function countUp(el) {
    const tgt = parseInt(el.dataset.target),
      dur = 1900,
      t0 = performance.now();
    (function go(now) {
      const p = Math.min((now - t0) / dur, 1),
        e = 1 - Math.pow(1 - p, 4);
      el.textContent =
        Math.floor(e * tgt).toLocaleString() + (p >= 1 ? "+" : "");
      if (p < 1) requestAnimationFrame(go);
    })(t0);
  }

  useEffect(() => {
    const cur = curRef.current,
      ring = ringRef.current;
    if (!cur || !ring) return;
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      rx = 0,
      ry = 0;
    const mv = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener("mousemove", mv);
    let raf;
    (function l() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      rx += (mx - rx) * 0.07;
      ry += (my - ry) * 0.07;
      cur.style.left = cx + "px";
      cur.style.top = cy + "px";
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(l);
    })();
    document
      .querySelectorAll("a,button,.tc,.cnt,.lg-cell,.pill,.stat")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => cur.classList.add("big"));
        el.addEventListener("mouseleave", () => cur.classList.remove("big"));
      });
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    const aObs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target
              .querySelectorAll(".ea")
              .forEach((a, i) =>
                setTimeout(() => a.classList.add("on"), i * 130),
              );
            aObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    const ea = document.querySelector(".exp-areas");
    if (ea) aObs.observe(ea.parentElement);
    const cObs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[data-target]").forEach(countUp);
            cObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    document
      .querySelectorAll(".stats,.cnt-grid")
      .forEach((el) => cObs.observe(el));
    const tr = trackRef.current,
      fi = fillRef.current,
      d = drag.current;
    if (tr && fi) {
      const dn = (e) => {
        d.down = true;
        tr.classList.add("drag");
        d.sx = e.pageX - tr.offsetLeft;
        d.sl = tr.scrollLeft;
      };
      const up = () => {
        d.down = false;
        tr.classList.remove("drag");
      };
      const mm = (e) => {
        if (!d.down) return;
        e.preventDefault();
        tr.scrollLeft = d.sl - (e.pageX - tr.offsetLeft - d.sx) * 1.4;
      };
      const sc = () => {
        fi.style.width =
          (tr.scrollLeft / (tr.scrollWidth - tr.clientWidth)) * 100 + "%";
      };
      tr.addEventListener("mousedown", dn);
      tr.addEventListener("mouseleave", up);
      tr.addEventListener("mouseup", up);
      tr.addEventListener("mousemove", mm);
      tr.addEventListener("scroll", sc);
    }
    return () => {
      document.removeEventListener("mousemove", mv);
      cancelAnimationFrame(raf);
      obs.disconnect();
      aObs.disconnect();
      cObs.disconnect();
    };
  }, []);

  const tickers = [
    "Healthcare",
    "Real Estate",
    "Education",
    "Hospitality",
    "FMCG",
    "Community",
    "Astrology",
    "Meme Pages",
  ];
  const i1 = [
    "Healthcare & Hospitals",
    "Real Estate & Infrastructure",
    "Education Institutions",
    "FMCG & Consumer Brands",
    "Hospitality & Services",
  ];
  const i2 = [
    "Community Pages",
    "Astrology",
    "Meme Pages",
    "Spiritual Brands",
    "Career Consultancy",
    "Fashion & Design",
  ];
  const i3 = [
    "Coaching Classes",
    "International Recruitment",
    "Luxury Experiences",
    "Dubai Real Estate",
    "Orthopaedic Clinics",
    "Plastic & Hardware Retail",
  ];
  const testimonials = [
    {
      q: "Vision9 captured the essence of our spiritual work without ever losing its authenticity. Their faceless content brought in meaningful engagement and followers who resonate with our values.",
      n: "Dr Sphoorthi Mastiholi",
      r: "CEO · Shivoham Spiritual Hub",
      img: "/asset/clients/testimonials/DRSPHOORTHIMASTIHOLI.png", // Path to your image
    },
    {
      q: "We wanted to take our household plastic mall online, and Vision9 made it happen in style. Their video content and creative reels brought local visibility and foot traffic to the store.",
      n: "Sheetal Bogar",
      r: "Bogar Enterprises",
      img: "/asset/clients/testimonials/SHEETALBOGAR.png", // Path to your image
    },
    {
      q: "Working with Vision9 gave our coaching classes the push we needed online. Their team understood how to speak to parents and students through impactful content.",
      n: "Richa Rashmi",
      r: "CEO · Cornerstone Academia",
      img: "/asset/clients/testimonials/RICHARASHMI.png", // Path to your image
    },

    {
      q: "Vision9 has transformed our page into a visually appealing platform through their expert editing skills and well-planned content strategies.",
      n: "Prof. Mahantesh C.",
      r: "Principal · KLE's Institute of Fashion Technology",
      img: "/asset/clients/testimonials/PROF.MAHANTESHC.png", // Path to your image
    },
    {
      q: "Working with Vision9 has been a game-changer for CubicCode. Their team brought unmatched creativity and consistency to our community page.",
      n: "Sarvesh K",
      r: "Co-Founder · CubicCode",
      img: "/asset/clients/testimonials/SARVESHK.png", // Path to your image
    },
    {
      q: "Reshaped our branding through identity design, banners, and OPD improvements while promoting government healthcare schemes.",
      n: "Dr. Devagoudah I",
      r: "Shree Ortho and Trauma Centre",
      img: "/asset/clients/testimonials/DR.DEVAGOUDHI.png", // Path to your image
    },
    {
      q: "Strengthened our branding with impactful hoardings and graphic design, helping us communicate care and professionalism.",
      n: "Dr. Ishrrat Tigadi",
      r: "Ashirwad Hospital",
      img: "/asset/clients/testimonials/DR.ISHRRATTIGADI.png", // Path to your image
    },

    {
      q: "Their team demonstrated strong expertise, strategic planning, and consistent performance in managing our campaigns.",
      n: "Vineethkumar M B",
      r: "CEO · Admifit Career Consultancy LLP",
      img: "/asset/clients/testimonials/VINEETHKUMARM B.png", // Path to your image
    },
    {
      q: "We were in real estate and recruiting business in Dubai Vision9 changed everything, bringing us global investors and strong hires from multiple countries.",
      n: "Atiq Naikwadi",
      r: "Leads Finder Group · Dubai",
      img: "/asset/clients/testimonials/ATIQNAIKWADI.png", // Path to your image
    },
  ];
  const logos = [
    {
      name: "admi\nfit",
      img: "/asset/clients/workedWith/admifit.png",
    },
    {
      name: "barely",
      img: "/asset/clients/workedWith/barely.png",
    },
    {
      name: "bo",
      img: "/asset/clients/workedWith/bo.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/cornerstone.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/cubecode.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/eurokids.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/groundstories.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/headline.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/hospigrow.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/ipopicker.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/leadsfinder.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/lingayat.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/newvalley.png",
    },
    {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/realestate.png",
    },
     {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/safina.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/shivoham.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/shree.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/shreeinstitute.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/siddharth.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/smallmiracles.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/smartsutra.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/uk1.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/uk2.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/uk3.png",
    },
      {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/uk4.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/vidya.png",
    }, {
      name: "SHIVOHAM\nSPIRITUAL HUB",
      img: "/asset/clients/workedWith/wavekota.png",
    }
  ];

  return (
    <>
      <style>{CSS}</style>
      <div id="cur" ref={curRef} />
      <div id="cur-ring" ref={ringRef} />
      {/* <nav><a href="#" className="logo">VISION<span className="g">9</span></a><span className="nav-t">Clients &amp; Work</span></nav> */}
      <Header />
      {/* HERO */}
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-glow" />
        <p className="hero-kicker">
          <span />
          Trusted by brands across industries
          <span />
        </p>
        <h1 className="hero-title">
          <span className="tl tl1">CLIENTS</span>
          <span className="tl tl2">WE'VE</span>
          <span className="tl tl3">WORKED WITH</span>
        </h1>
        <p className="hero-sub">
          Strategic marketing, branding, performance campaigns, and content
          execution—aligned with business goals. We work as an extended partner.
        </p>
        <div className="stats">
          {[
            { t: "500", l: "Million+ Views" },
            { t: "350", l: "Campaigns Executed" },
            { t: "1000", l: "Influencer Network" },
            { t: "28", l: "Brands Served" },
            { t: "30", l: "Active Clients" },
          ].map((s, i) => (
            <div key={i} className="stat">
              <span className="sn" data-target={s.t}>
                0
              </span>
              <span className="sl">{s.l}</span>
            </div>
          ))}
        </div>
        <div className="ticker-wrap">
          <div className="tkr">
            {[...tickers, ...tickers].map((t, i) => (
              <div key={i} className="ti">
                {t}
                <span className="td" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sec-rule" />

      {/* INDUSTRIES */}
      <section className="ind">
        <div className="sec-orn rv">01 Industries</div>
        <h2 className="sec-h rv d1">
          We speak every <em>industry's</em> language
        </h2>
        {[
          [i1, "rr"],
          [i2, "rl"],
          [i3, "rr2"],
        ].map(([items, cls], ri) => (
          <div key={ri} className={`ind-wrap rv d${ri + 2}`}>
            <div className={`ind-row ${cls}`}>
              {[...items, ...items].map((n, i) => (
                <span key={i} className="pill">
                  <span className="dot" />
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="sec-rule" />

      {/* EXPERIENCE */}
      <section className="exp">
        <div className="exp-l">
          <div className="sec-orn rv">02 Founders' Experience</div>
          <h2 className="sec-h rv d1" style={{ marginBottom: "1.5rem" }}>
            Experience that goes <em>beyond</em> one agency
          </h2>
          <p className="exp-body rv d2">
            The founders bring extensive hands-on experience from managing and
            contributing to multiple brand pages, campaigns, and digital
            properties across industries.
          </p>
          <div className="exp-areas">
            {[
              "Managing and scaling brand pages across platforms",
              "Executing performance marketing campaigns",
              "Developing content and UGC strategies",
              "Supporting branding, communication, and digital presence",
            ].map((t, i) => (
              <div key={i} className="ea">
                <span className="ea-n">0{i + 1}</span>
                <span className="ea-t">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="sec-orn rv">Experience Snapshot</div>
          <div className="cnt-grid rv d1">
            {[
              { t: "500", l: "Million+ Views Generated" },
              { t: "350", l: "Campaigns Executed" },
              { t: "1000", l: "Influencers · Pan-India" },
              { t: "20000", l: "Social Pages Reach" },
              { t: "28", l: "Brands Served" },
              { t: "30", l: "Active Clients" },
            ].map((c, i) => (
              <div key={i} className="cnt">
                <span className="cv" data-target={c.t}>
                  0
                </span>
                <span className="cl">{c.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sec-rule" />

      {/* TESTIMONIALS */}
      <section className="testi">
        <div className="sec-orn rv">03 Testimonials</div>
        <h2 className="sec-h rv d1">
          Straight from the <em>brands</em> we've built
        </h2>
        <div className="drag-h rv d2">
          <span className="drag-line" />
          Drag to explore
        </div>
        <div
          style={{ position: "relative", marginTop: "clamp(2rem,4vh,3.5rem)" }}
        >
          <div className="testi-track" ref={trackRef}>
            {testimonials.map((t, i) => (
              <div key={i} className="tc">
                <p className="tq">{t.q}</p>
                <div className="t-div" />
                <div className="t-user">
                  {t.img && (
                    <img
                      src={t.img}
                      alt={t.n}
                      className="t-img"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <div className="t-info">
                    <div className="tn">{t.n}</div>
                    <span className="tr">{t.r}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="prog-bar">
            <div className="prog-fill" ref={fillRef} />
          </div>
        </div>
      </section>

      <div className="sec-rule" />

      {/* LOGOS */}
      <section className="logos">
        <div className="sec-orn rv">04 Our Clients</div>
        <h2 className="sec-h rv d1">
          Brands that <em>trust</em> Vision9
        </h2>
        <div className="lg-grid rv d2">
          {logos.map((logo, i) => (
            <div key={i} className="lg-cell">
              {/* Logo Image */}
              <img src={logo.img} alt={logo.name} className="lg-img" />

              {/* Hover Brand Name */}
              <span>{logo.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-ghost">VISION9</div>
        <div className="cta-orn rv">
          <span />
          Ready to join them?
          <span />
        </div>
        <h2 className="cta-h rv d1">
          Let's Build Brands That <em>Perform</em>
        </h2>
        <p className="cta-sub rv d2">
          Partner with Vision9 to move from ideas to execution and from
          execution to measurable growth.
        </p>
        <div className="cta-btns rv d3">
          <a href="/contact" className="btn-solid">
            Book a Strategy Call
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
