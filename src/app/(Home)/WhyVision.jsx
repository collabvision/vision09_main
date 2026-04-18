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
  borderFaint: "rgba(115,112,23,0.10)",
};

import { forwardRef, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "../../components/ui/animated-beam";
import {
  Target,
  Briefcase,
  ShieldCheck,
  Settings,
  TrendingUp,
  Eye,
  Rocket,
} from "lucide-react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

const CSS = `
${FONTS}
.wv-section{
  background:${T.bg};padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);
  font-family:'DM Sans',sans-serif;position:relative;overflow:hidden;
}
.wv-noise{
  position:absolute;inset:0;opacity:.018;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px 200px;pointer-events:none;
}
.wv-inner{
  display:grid;grid-template-columns:1fr 1fr;gap:clamp(3rem,7vw,8rem);
  align-items:center;max-width:1280px;margin:0 auto;
}
/* LEFT — reasons list */
.wv-eyebrow{
  font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.3em;
  text-transform:uppercase;color:${T.accent};margin-bottom:1rem;
  display:flex;align-items:center;gap:.7rem;
}
.wv-eyebrow::before{content:'';width:24px;height:1px;background:${T.accent};display:inline-block}
.wv-h{
  font-family:'Playfair Display',serif;font-weight:600;
  font-size:clamp(1.8rem,3.8vw,3.2rem);line-height:1.15;color:${T.text};
  margin-bottom:.8rem;
}
.wv-h em{color:${T.accent};font-style:italic}
.wv-sub{
  font-size:clamp(.88rem,1.35vw,1rem);line-height:1.85;
  color:${T.textSec};margin-bottom:clamp(2rem,4vh,3rem);max-width:480px;
}
.wv-list{border-top:1px solid ${T.border}}
.wv-item{
  display:flex;align-items:flex-start;gap:1.2rem;
  padding:clamp(1rem,2.2vh,1.6rem) 0;
  border-bottom:1px solid ${T.border};
  cursor:default;transition:background .25s,padding .25s;
}
.wv-item:hover{background:${T.bgAlt};padding-left:.6rem;padding-right:.4rem}
.wv-item:hover .wv-num{color:${T.accent}}
.wv-item:hover .wv-txt{color:${T.text}}
.wv-item:hover .wv-arrow{opacity:1;transform:translateX(0)}
.wv-num{
  font-family:'Playfair Display',serif;font-size:.95rem;color:${T.muted};
  min-width:2rem;padding-top:.1rem;font-weight:400;transition:color .3s;flex-shrink:0;
}
.wv-txt{
  font-family:'Playfair Display',serif;font-size:clamp(.9rem,1.8vw,1.2rem);
  font-weight:400;color:${T.textSec};line-height:1.45;transition:color .3s;flex:1;
}
.wv-arrow{
  margin-left:auto;font-size:1rem;color:${T.accent};
  opacity:0;transform:translateX(-8px);
  transition:opacity .3s,transform .3s;flex-shrink:0;padding-top:.1rem;
}
/* RIGHT — AnimatedBeam diagram */
.wv-beam-wrap{
  position:relative;height:clamp(380px,55vh,540px);
  display:flex;align-items:center;justify-content:center;
}
/* themed beam squares */
.wv-square{
  z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:.5rem;padding:1rem;text-align:center;
  background:${T.card} !important;
  border:1.5px solid ${T.border} !important;
  border-radius:12px !important;
  box-shadow:0 4px 24px rgba(168,131,42,.1) !important;
  transition:transform .3s,box-shadow .3s,border-color .3s;
  width:6.5rem;height:6.5rem;
}
.wv-square:hover{
  transform:scale(1.06);
  box-shadow:0 8px 36px rgba(168,131,42,.18) !important;
  border-color:${T.accentMid} !important;
}
.wv-square-center{
  width:7.5rem !important;height:7.5rem !important;
  background:${T.accentDark} !important;
  border-color:${T.accent} !important;
}
.wv-square-center svg,.wv-square-center span{color:${T.accentLight} !important}
.wv-square svg{color:${T.accent};stroke:${T.accent}}
.wv-square span{
  font-family:'Tenor Sans',sans-serif;font-size:.54rem;letter-spacing:.12em;
  text-transform:uppercase;color:${T.muted};
}
.wv-square-center span{color:${T.accentLight} !important;font-size:.6rem !important;font-weight:700}
/* reveal */
.wv-rv{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
.wv-rv.on{opacity:1;transform:translateY(0)}
.wv-d1{transition-delay:.1s}.wv-d2{transition-delay:.2s}.wv-d3{transition-delay:.3s}
@media(max-width:900px){.wv-inner{grid-template-columns:1fr}.wv-beam-wrap{height:380px}}
`;

const WHY_REASONS = [
  "Strategy first approach backed by high impact creative execution",
  "Industry specific expertise across healthcare, education, real estate, FMCG, and service brands",
  "International standard quality, processes, and performance reporting",
  "End to end execution across digital, offline, and on-ground branding",
  "Performance driven mindset focused on leads, sales, and ROI",
  "Dedicated account ownership with transparent communication",
  "Long-term partnerships built for sustainable and scalable growth",
];

const Square = forwardRef(({ className, children, isCenter }, ref) => (
  <div
    ref={ref}
    className={cn("wv-square", isCenter && "wv-square-center", className)}
  >
    {children}
  </div>
));
Square.displayName = "Square";

function BeamDiagram() {
  const containerRef = useRef(null);
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [r1, r2, r3, r4, r5, r6, r7] = refs;

  return (
    <div className="wv-beam-wrap" ref={containerRef}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "stretch",
          height: "100%",
          maxHeight: 340,
          width: "100%",
          maxWidth: 460,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Square ref={r1}>
            <Target size={28} />
            <span>Strategy</span>
          </Square>
          <Square ref={r5}>
            <Briefcase size={28} />
            <span>Expertise</span>
          </Square>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Square ref={r2}>
            <ShieldCheck size={28} />
            <span>Standards</span>
          </Square>
          <Square ref={r4} isCenter>
            <Settings size={34} />
            <span>Execution</span>
          </Square>
          <Square ref={r6}>
            <TrendingUp size={28} />
            <span>Performance</span>
          </Square>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Square ref={r3}>
            <Eye size={28} />
            <span>Transparency</span>
          </Square>
          <Square ref={r7}>
            <Rocket size={28} />
            <span>Growth</span>
          </Square>
        </div>
      </div>

      {[
        [r1, r4, -75, -10, false],
        [r2, r4, 0, 0, false],
        [r3, r4, 75, 10, false],
        [r5, r4, -75, -10, true],
        [r6, r4, 0, 0, true],
        [r7, r4, 75, 10, true],
      ].map(([from, to, curv, yOff, rev], i) => (
        <AnimatedBeam
          key={i}
          containerRef={containerRef}
          fromRef={from}
          toRef={to}
          curvature={curv}
          endYOffset={yOff}
          reverse={rev}
          pathColor={T.border}
          gradientStartColor={T.accentMid}
          gradientStopColor={T.accent}
        />
      ))}
    </div>
  );
}

export default function WhyVision() {
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
      { threshold: 0.1 },
    );
    document.querySelectorAll(".wv-rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="wv-section">
      <style>{CSS}</style>
      <div className="wv-noise" />

      <div className="wv-inner">
        {/* LEFT */}
        <div>
          <div className="wv-rv">
            <div className="wv-eyebrow">
              <span />
              Why Vision9
            </div>
            <h2 className="wv-h">
              Seven reasons brands <em>choose us</em>
            </h2>
            <p className="wv-sub">
              We're not just a marketing agency we're a strategic growth
              partner. Every decision, every creative, every campaign is built
              with your business outcomes at the core.
            </p>
          </div>

          <div className="wv-list wv-rv wv-d1">
            {WHY_REASONS.map((r, i) => (
              <div key={i} className="wv-item">
                <span className="wv-num">0{i + 1}</span>
                <span className="wv-txt">{r}</span>
                <span className="wv-arrow">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — beam diagram */}
        <div className="wv-rv wv-d2">
          <BeamDiagram />
        </div>
      </div>
    </section>
  );
}
