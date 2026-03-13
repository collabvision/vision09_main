"use client";

/* ═══════════════════════════════════════════════════
   THEME — change here to retheme this entire file
═══════════════════════════════════════════════════ */
const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentMid: "#d2ce12",
  accentDark: "#737017",

  bg: "#f5f2c8",
  bgAlt: "#fffee9",
  card: "#ffffff",

  text: "#231f1f",
  textSec: "#58564d",
  muted: "#a19f8a",

  border: "rgba(115,112,23,0.20)",
};

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  IconTargetArrow,
  IconPalette,
  IconRocket,
  IconUsers,
  IconHierarchy3,
  IconTrendingUp,
  IconNews,
  IconChartBar,
} from "@tabler/icons-react";
import SplitText from "../../components/SplitText";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

const CSS = `
${FONTS}
.ha-section{
  background:${T.bgAlt};padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);
  font-family:'DM Sans',sans-serif;position:relative;overflow:hidden;
}
.ha-eyebrow{
  font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.3em;
  text-transform:uppercase;color:${T.accent};margin-bottom:.9rem;
  display:flex;align-items:center;gap:.7rem;
}
.ha-eyebrow::before{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(270deg,${T.accent},transparent)}
.ha-eyebrow::after{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(90deg,${T.accent},transparent)}
/* SplitText title – override to match our font */
.ha-title-wrap [class*="split"],
.ha-title-wrap span{
  font-family:'Playfair Display',serif !important;
  font-weight:900 !important;
  color:${T.text} !important;
}
.ha-intro{
  max-width:680px;margin:0 auto;text-align:center;
  font-size:clamp(.9rem,1.5vw,1.05rem);line-height:1.9;
  color:${T.textSec};margin-top:1.5rem;margin-bottom:clamp(3rem,6vh,5rem);
}
.ha-intro em{color:${T.accent};font-style:italic}
/* ── FEATURE GRID ── */
.ha-grid{
  display:grid;grid-template-columns:repeat(4,1fr);
  position:relative;z-index:10;max-width:1280px;margin:0 auto;
}
.ha-cell{
  flex-direction:column;padding:clamp(1.5rem,3vw,2.5rem) clamp(1.2rem,2.5vw,2rem);
  position:relative;cursor:default;border-right:1px solid ${T.border};
  transition:background .3s;
}
.ha-cell:nth-child(4n){border-right:none}
.ha-cell:nth-child(-n+4){border-bottom:1px solid ${T.border}}
.ha-cell:nth-child(1),.ha-cell:nth-child(5){border-left:1px solid ${T.border}}
.ha-hover-overlay{
  position:absolute;inset:0;opacity:0;pointer-events:none;transition:opacity .25s;
  background:linear-gradient(to bottom,${T.bgAlt},transparent);
}
.ha-cell:nth-child(n+5) .ha-hover-overlay{background:linear-gradient(to top,${T.bgAlt},transparent)}
.ha-cell:hover .ha-hover-overlay{opacity:1}
.ha-icon{
  margin-bottom:1rem;position:relative;z-index:1;
  color:${T.muted};font-size:1.4rem;transition:color .3s;
}
.ha-cell:hover .ha-icon{color:${T.accent}}
.ha-indicator{
  position:absolute;left:0;top:50%;transform:translateY(-50%);
  width:2px;height:1.5rem;border-radius:2px;
  background:${T.border};transition:height .2s,background .2s;
}
.ha-cell:hover .ha-indicator{height:2.5rem;background:${T.accent}}
.ha-feat-title{
  font-family:'Playfair Display',serif;font-size:clamp(.95rem,1.6vw,1.15rem);
  font-weight:600;color:${T.text};margin-bottom:.5rem;position:relative;z-index:1;
  padding-left:1rem;transition:transform .2s;
}
.ha-cell:hover .ha-feat-title{transform:translateX(4px)}
.ha-feat-desc{
  font-size:clamp(.75rem,1.1vw,.86rem);line-height:1.8;
  color:${T.textSec};position:relative;z-index:1;padding-left:1rem;
}
/* reveal */
.ha-rv{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
.ha-rv.on{opacity:1;transform:translateY(0)}
.ha-d1{transition-delay:.05s}.ha-d2{transition-delay:.1s}.ha-d3{transition-delay:.15s}.ha-d4{transition-delay:.2s}
.ha-d5{transition-delay:.25s}.ha-d6{transition-delay:.3s}.ha-d7{transition-delay:.35s}.ha-d8{transition-delay:.4s}
@media(max-width:900px){.ha-grid{grid-template-columns:repeat(2,1fr)}.ha-cell{border-right:1px solid ${T.border} !important}}
@media(max-width:520px){.ha-grid{grid-template-columns:1fr}.ha-cell{border-right:none !important}}
`;

const FEATURES = [
  {
    title: "Strategic Marketing",
    icon: <IconTargetArrow size={26} />,
    desc: "Data-driven strategies aligned with your brand goals that drive measurable, sustainable growth.",
  },
  {
    title: "Creative Brand Design",
    icon: <IconPalette size={26} />,
    desc: "Impactful visuals, branding, and digital experiences that build strong, memorable brand identity.",
  },
  {
    title: "Performance Campaigns",
    icon: <IconRocket size={26} />,
    desc: "Every campaign focused on generating leads, engagement, and real business results.",
  },
  {
    title: "Influencer & Creator Network",
    icon: <IconUsers size={26} />,
    desc: "Access our pan-India network of 1,000+ influencers to amplify reach and credibility.",
  },
  {
    title: "Integrated Marketing",
    icon: <IconHierarchy3 size={26} />,
    desc: "From digital campaigns to PR and social media — complete marketing under one roof.",
  },
  {
    title: "Growth-Focused Partnerships",
    icon: <IconTrendingUp size={26} />,
    desc: "Your extended marketing team, delivering strategic insights and continuous optimization.",
  },
  {
    title: "Media & PR Reach",
    icon: <IconNews size={26} />,
    desc: "Feature across 5,000+ national and international media platforms through strategic PR.",
  },
  {
    title: "Data & Performance Insights",
    icon: <IconChartBar size={26} />,
    desc: "Clear tracking across campaigns and channels to maximize ROI and measure what matters.",
  },
];

export default function HomeAbout() {
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
    document.querySelectorAll(".ha-rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="ha-section">
      <style>{CSS}</style>

      {/* eyebrow + SplitText heading */}
      <div style={{ textAlign: "center" }}>
        <div className="ha-eyebrow ha-rv" style={{ justifyContent: "center" }}>
          About Vision9
        </div>

        <div className="ha-title-wrap">
          <SplitText
            text="At Vision9, We Build"
            className="ha-rv"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem,6vw,5.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-.02em",
              color: T.text,
              textAlign: "center",
              display: "block",
            }}
            delay={40}
            duration={0.9}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="center"
          />
          <SplitText
            text="Brands That Perform"
            className="ha-rv ha-d1"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(2.4rem,6vw,5.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-.02em",
              color: T.accent,
              textAlign: "center",
              display: "block",
              marginTop: ".1em",
            }}
            delay={40}
            duration={0.9}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="center"
          />
        </div>

        <p className="ha-intro ha-rv ha-d2">
          At Vision9, we help brands drive growth through strategic thinking,
          impactful design, and result-oriented communication. We work as an{" "}
          <em>extended marketing partner</em> — from strategy to execution —
          ensuring every campaign, creative, and decision is built to generate
          measurable business outcomes.
        </p>
      </div>

      {/* Feature grid */}
      <div className="ha-grid">
        {FEATURES.map((f, i) => (
          <div key={i} className={`ha-cell ha-rv ha-d${i + 1}`}>
            <div className="ha-hover-overlay" />
            <div className="ha-indicator" />
            <div className="ha-icon">{f.icon}</div>
            <div className="ha-feat-title">{f.title}</div>
            <p className="ha-feat-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
