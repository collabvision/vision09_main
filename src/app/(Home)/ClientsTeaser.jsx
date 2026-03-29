"use client";
const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentMid: "#d2ce12",
  accentDark: "#737017",

  bg: "#fffee9",
  bgAlt: "#f6f3c9",
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
.ct-section{background:${T.bg};padding:clamp(4rem,8vh,6rem) clamp(1.5rem,5vw,4rem);font-family:'DM Sans',sans-serif;border-top:1px solid ${T.border}}
.ct-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;color:${T.accent};margin-bottom:.9rem;display:flex;align-items:center;gap:.7rem}
.ct-eyebrow::before{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(270deg,${T.accent},transparent)}
.ct-eyebrow::after{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(90deg,${T.accent},transparent)}
.ct-inner{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,6rem);align-items:center}
.ct-h{font-family:'Playfair Display',serif;font-weight:600;font-size:clamp(1.5rem,3.2vw,2.8rem);line-height:1.2;color:${T.text};margin-bottom:1rem}
.ct-h em{color:${T.accent};font-style:italic}
.ct-p{font-size:clamp(.88rem,1.4vw,1rem);line-height:1.88;color:${T.textSec};margin-bottom:2rem}
.ct-link{display:inline-flex;align-items:center;gap:.6rem;font-family:'Tenor Sans',sans-serif;font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:${T.accent};text-decoration:none;transition:gap .3s}
.ct-link:hover{gap:1rem}
.ct-logos{display:flex;flex-wrap:wrap;gap:0;border:1px solid ${T.border}}
.ct-logo{flex:1 0 33.33%;padding:1.4rem 1rem;border-right:1px solid ${T.border};border-bottom:1px solid ${T.border};font-family:'Playfair Display',serif;font-size:clamp(.72rem,1.3vw,.9rem);color:${T.muted};text-align:center;display:flex;align-items:center;justify-content:center;transition:background .3s,color .3s;cursor:default;font-weight:600;letter-spacing:.05em}
.ct-logo:hover{background:${T.bgAlt};color:${T.accent}}
.ct-rv{opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
.ct-rv.on{opacity:1;transform:translateY(0)}
.ct-d1{transition-delay:.1s}.ct-d2{transition-delay:.2s}
@media(max-width:768px){.ct-inner{grid-template-columns:1fr}}
`;
const LOGOS = [
  "Shivoham",
  "Bogar Enterprises",
  "Cornerstone",
  "KLE Fashion",
  "CubicCode",
  "Ashirwad Hosp.",
  "Shree Ortho",
  "Admifit",
  "Leads Finder · Dubai",
  "Small Miracles",
  "Real Estate Stories",
  "+ More Brands",
];
export default function ClientsTeaser() {
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
    document.querySelectorAll(".ct-rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section className="ct-section">
      <style>{CSS}</style>
      <div className="ct-eyebrow ct-rv">Clients &amp; Experience</div>
      <div className="ct-inner">
        <div className="ct-rv ct-d1">
          <h2 className="ct-h">
            Trusted by brands <em>across India</em> and beyond
          </h2>
          <p className="ct-p">
            Delivering consistent results for brands across healthcare,
            education, real estate, FMCG, and service industries through
            structured marketing systems and long-term partnerships.
          </p>
          <a href="/clients" className="ct-link">
            Explore Our Clients →
          </a>
        </div>
        <div className="ct-logos ct-rv ct-d2">
          {LOGOS.map((l, i) => (
            <div key={i} className="ct-logo">
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
