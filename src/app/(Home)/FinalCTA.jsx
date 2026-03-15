"use client";
const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentMid: "#d2ce12",
  accentDark: "#737017",

  bg: "#fffee9",
  bgAlt: "#f5f2c8",

  text: "#231f1f",
  textSec: "#58564d",
  muted: "#a19f8a",

  border: "rgba(115,112,23,0.20)",

  waGreen: "#25D366",
};
import { useEffect } from "react";
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;
const CSS = `
${FONTS}
.fc-section{background:${T.bgAlt};padding:clamp(7rem,16vh,12rem) clamp(1.5rem,5vw,4rem);font-family:'DM Sans',sans-serif;position:relative;overflow:hidden;text-align:center}
.fc-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Playfair Display',serif;font-size:clamp(5rem,18vw,18rem);color:transparent;-webkit-text-stroke:1px ${T.border};white-space:nowrap;pointer-events:none;font-weight:900;animation:fcPulse 8s ease-in-out infinite}
@keyframes fcPulse{0%,100%{opacity:.4;letter-spacing:.02em}50%{opacity:.9;letter-spacing:.1em}}
.fc-orn{font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:${T.accent};margin-bottom:1.4rem;display:flex;align-items:center;gap:.8rem;justify-content:center;position:relative}
.fc-orn span{width:30px;height:1px;background:${T.accent};display:inline-block}
.fc-h{font-family:'Playfair Display',serif;font-weight:600;font-size:clamp(2.2rem,5.5vw,5rem);line-height:1.08;max-width:780px;margin:0 auto .8rem;position:relative;color:${T.text}}
.fc-h em{color:${T.accent};font-style:italic}
.fc-sub{font-size:clamp(.88rem,1.4vw,1rem);color:${T.textSec};max-width:520px;margin:0 auto 2.5rem;line-height:1.82;position:relative}
.fc-btns{display:flex;gap:1.2rem;flex-wrap:wrap;justify-content:center;position:relative}
.fc-btn-solid{background:${T.accent};color:#FAF8F2;font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700;letter-spacing:.15em;padding:1rem 2.8rem;border:none;cursor:pointer;text-decoration:none;display:inline-block;text-transform:uppercase;position:relative;overflow:hidden;transition:background .3s,transform .3s}
.fc-btn-solid::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transform:translateX(-100%);transition:transform .4s}
.fc-btn-solid:hover::after{transform:translateX(100%)}
.fc-btn-solid:hover{background:${T.accentMid};transform:translateY(-2px)}
.fc-btn-out{background:transparent;color:${T.text};font-family:'Playfair Display',serif;font-size:.9rem;font-weight:600;letter-spacing:.15em;padding:1rem 2.8rem;border:1px solid rgba(168,131,42,.38);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:.6rem;text-transform:uppercase;transition:border-color .3s,color .3s,transform .3s}
.fc-btn-out:hover{border-color:${T.waGreen};color:${T.waGreen};transform:translateY(-2px)}
.fc-wa-dot{width:8px;height:8px;background:${T.waGreen};border-radius:50%;flex-shrink:0}
.fc-rv{opacity:0;transform:translateY(28px);transition:opacity .85s ease,transform .85s cubic-bezier(.16,1,.3,1)}
.fc-rv.on{opacity:1;transform:translateY(0)}
.fc-d1{transition-delay:.1s}.fc-d2{transition-delay:.2s}.fc-d3{transition-delay:.3s}
@media(max-width:480px){.fc-btns{flex-direction:column;align-items:center}}
`;
export default function FinalCTA() {
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
      { threshold: 0.15 },
    );
    document.querySelectorAll(".fc-rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section className="fc-section">
      <style>{CSS}</style>
      <div className="fc-ghost">VISION9</div>
      <div className="fc-orn fc-rv">
        <span />
        Ready to grow?
        <span />
      </div>
      <h2 className="fc-h fc-rv fc-d1">
        Ready to Grow with a <em>Strategic Marketing Partner?</em>
      </h2>
      <p className="fc-sub fc-rv fc-d2">
        Let's discuss how Vision9 can help your brand achieve clarity,
        consistency, and scalable growth.
      </p>
      <div className="fc-btns fc-rv fc-d3">
        <a href="/contact" className="fc-btn-solid">
          Book a Strategy Call
        </a>
        <a
          href="https://wa.me/918147637913"
          target="_blank"
          rel="noopener noreferrer"
          className="fc-btn-out"
        >
          <span className="fc-wa-dot" />
          Connect on WhatsApp
        </a>
      </div>
    </section>
  );
}
