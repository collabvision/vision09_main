"use client";

const T = {
  accent:"#A8832A",accentLight:"#D4B86A",accentMid:"#C4A24E",accentDark:"#6B5010",
  bg:"#FAF8F2",bgAlt:"#F2EDE0",card:"#FFFFFF",dark:"#1C1A14",
  text:"#1C1A14",textSec:"#56503E",muted:"#9A8E72",border:"rgba(168,131,42,0.20)",
};

import { useEffect } from "react";

const FONTS=`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

const CSS=`
${FONTS}
.op-section{background:${T.dark};padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);font-family:'DM Sans',sans-serif;position:relative;overflow:hidden}
.op-glow{position:absolute;top:-20%;left:50%;transform:translateX(-50%);width:700px;height:700px;background:radial-gradient(ellipse,rgba(168,131,42,.08) 0%,transparent 65%);pointer-events:none}
.op-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;color:${T.accent};margin-bottom:.9rem;display:flex;align-items:center;gap:.7rem}
.op-eyebrow::before{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(270deg,${T.accent},transparent)}
.op-eyebrow::after{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(90deg,${T.accent},transparent)}
.op-h{font-family:'Playfair Display',serif;font-weight:600;font-size:clamp(1.8rem,4vw,3.5rem);line-height:1.15;color:#F5F0E8;margin-bottom:clamp(3rem,6vh,5rem)}
.op-h em{color:${T.accent};font-style:italic}
.op-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(168,131,42,.12);border:1px solid rgba(168,131,42,.12)}
.op-step{background:#0E0D09;padding:clamp(2rem,4vw,3rem) clamp(1.5rem,3vw,2.5rem);position:relative;overflow:hidden;transition:background .4s}
.op-step:hover{background:#161410}
.op-step::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,${T.accentDark},${T.accent},${T.accentMid});transform:scaleX(0);transform-origin:left;transition:transform .55s}
.op-step:hover::before{transform:scaleX(1)}
.op-step-n{font-family:'Playfair Display',serif;font-size:clamp(3rem,6vw,5rem);color:transparent;-webkit-text-stroke:1px rgba(168,131,42,.15);line-height:1;font-weight:900;display:block;margin-bottom:.8rem}
.op-step-tag{font-family:'Tenor Sans',sans-serif;font-size:.52rem;letter-spacing:.2em;text-transform:uppercase;color:${T.accent};display:block;margin-bottom:.8rem}
.op-step-h{font-family:'Playfair Display',serif;font-size:clamp(1.1rem,2vw,1.5rem);font-weight:600;color:#F5F0E8;margin-bottom:.7rem;letter-spacing:.02em}
.op-step-p{font-size:clamp(.78rem,1.15vw,.9rem);line-height:1.82;color:rgba(210,200,180,.55)}
/* connector arrow */
.op-step:not(:last-child)::after{content:'→';position:absolute;right:-1px;top:50%;transform:translateY(-50%);font-size:1.2rem;color:${T.accent};opacity:.3;z-index:1}
/* reveal */
.op-rv{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
.op-rv.on{opacity:1;transform:translateY(0)}
.op-d1{transition-delay:.08s}.op-d2{transition-delay:.18s}.op-d3{transition-delay:.28s}.op-d4{transition-delay:.38s}
@media(max-width:900px){.op-steps{grid-template-columns:repeat(2,1fr)}.op-step::after{display:none}}
@media(max-width:520px){.op-steps{grid-template-columns:1fr}}
`;

const STEPS=[
  {n:"01",tag:"Discovery",h:"Discovery",p:"Understanding your business, market position, target audience, and growth objectives in depth."},
  {n:"02",tag:"Strategy",h:"Strategy",p:"Developing a tailored roadmap and campaign architecture aligned precisely with your goals."},
  {n:"03",tag:"Execution",h:"Execution",p:"Implementing campaigns, creatives, and systems with precision and structured accountability."},
  {n:"04",tag:"Optimise",h:"Optimization & Scale",p:"Continuous performance analysis, iteration, and scaling to maximise ROI and sustainable growth."},
];

export default function OurProcess() {
  useEffect(()=>{
    const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");obs.unobserve(e.target)}})},{threshold:.12});
    document.querySelectorAll(".op-rv").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
  return(
    <section className="op-section">
      <style>{CSS}</style>
      <div className="op-glow"/>
      <div className="op-rv"><div className="op-eyebrow">Our Process</div>
        <h2 className="op-h">How we <em>work with you</em></h2>
      </div>
      <div className="op-steps">
        {STEPS.map((s,i)=>(
          <div key={i} className={`op-step op-rv op-d${i+1}`}>
            <span className="op-step-n">{s.n}</span>
            <span className="op-step-tag">{s.tag}</span>
            <div className="op-step-h">{s.h}</div>
            <p className="op-step-p">{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}