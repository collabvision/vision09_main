"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../../components/custom/Header";

const LIME = "#c4f135";
const BLACK = "#080808";
const WHITE = "#f8f8f4";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Serif+Display:ital@0;1&display=swap');`;

const globalCSS = `
  ${fonts}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:${BLACK};color:${WHITE};font-family:'DM Sans',sans-serif;font-weight:300;overflow-x:hidden;cursor:none}
  #c9-cursor{width:10px;height:10px;background:${LIME};border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .3s,height .3s,background .3s,border .3s}
  #c9-cursor.big{width:52px;height:52px;background:transparent;border:1.5px solid ${LIME};mix-blend-mode:difference}
  .c9-reveal{opacity:0;transform:translateY(36px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
  .c9-reveal.visible{opacity:1;transform:translateY(0)}
  .c9-rd1{transition-delay:.1s}.c9-rd2{transition-delay:.2s}.c9-rd3{transition-delay:.3s}.c9-rd4{transition-delay:.4s}
  @keyframes c9ClipLine{to{clip-path:inset(0 0 0% 0)}}
  @keyframes c9FadeUp{to{opacity:1;transform:translateY(0)}}
  @keyframes c9GridMove{0%{background-position:0 0}100%{background-position:80px 80px}}
  @keyframes c9Scan{0%{top:-100%}100%{top:100%}}
  @keyframes c9Pulse{0%,100%{opacity:.5}50%{opacity:1}}
  @keyframes c9SlideIn{from{transform:translateX(-100%)}to{transform:translateX(200%)}}

  /* form field */
  .c9-field{
    width:100%;background:transparent;border:none;border-bottom:1px solid rgba(248,248,244,.15);
    padding:.9rem 0;font-family:'DM Sans',sans-serif;font-size:clamp(.9rem,1.5vw,1rem);
    font-weight:300;color:${WHITE};outline:none;transition:border-color .3s;
    appearance:none;-webkit-appearance:none;
  }
  .c9-field::placeholder{color:rgba(248,248,244,.3)}
  .c9-field:focus{border-bottom-color:${LIME}}
  .c9-field option{background:${BLACK};color:${WHITE}}
  .c9-field-wrap{position:relative;margin-bottom:2rem}
  .c9-field-label{
    position:absolute;top:.9rem;left:0;
    font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;
    color:rgba(248,248,244,.3);pointer-events:none;
    transition:top .25s,font-size .25s,color .25s;
  }
  .c9-field:focus~.c9-field-label,
  .c9-field:not(:placeholder-shown)~.c9-field-label{
    top:-.8rem;font-size:.55rem;color:${LIME}
  }
  .c9-field-bar{
    position:absolute;bottom:0;left:0;height:1px;width:0;
    background:${LIME};transition:width .4s ease;
  }
  .c9-field:focus~.c9-field-bar{width:100%}

  /* submit btn */
  .c9-submit{
    background:${LIME};color:${BLACK};
    font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.12em;
    padding:1.1rem 3rem;border:none;cursor:pointer;
    transition:background .3s,transform .3s;display:inline-block;width:100%;
    margin-top:.5rem;
  }
  .c9-submit:hover{background:#d4ff3e;transform:translateY(-2px)}

  /* why card */
  .c9-why-card{
    border:1px solid rgba(255,255,255,.07);padding:clamp(1.5rem,3vw,2.5rem);
    position:relative;overflow:hidden;transition:border-color .4s,background .4s;
  }
  .c9-why-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:${LIME};transform:scaleX(0);transform-origin:left;transition:transform .5s}
  .c9-why-card:hover::before{transform:scaleX(1)}
  .c9-why-card:hover{border-color:rgba(196,241,53,.2);background:rgba(196,241,53,.03)}

  /* contact detail row */
  .c9-detail-row{
    display:flex;align-items:center;gap:1.5rem;
    padding:1.2rem 0;border-bottom:1px solid rgba(255,255,255,.07);
    transition:background .3s;cursor:default;
  }
  .c9-detail-row:hover .c9-detail-label{color:${LIME}}
  .c9-detail-icon{
    width:38px;height:38px;border:1px solid rgba(255,255,255,.1);
    display:flex;align-items:center;justify-content:center;
    font-size:.9rem;flex-shrink:0;transition:border-color .3s,background .3s;
  }
  .c9-detail-row:hover .c9-detail-icon{border-color:${LIME};background:rgba(196,241,53,.08)}
  .c9-detail-label{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(248,248,244,.4);margin-bottom:.2rem;transition:color .3s}
  .c9-detail-val{font-size:clamp(.88rem,1.4vw,1rem);color:${WHITE}}

  /* wa btn */
  .c9-wa{
    display:inline-flex;align-items:center;gap:.8rem;
    background:transparent;color:${WHITE};
    font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.12em;
    padding:1.1rem 2.5rem;border:1px solid rgba(248,248,244,.2);
    cursor:pointer;text-decoration:none;
    transition:border-color .3s,color .3s,transform .3s;
  }
  .c9-wa:hover{border-color:#25d366;color:#25d366;transform:translateY(-2px)}
  .c9-wa-dot{width:8px;height:8px;background:#25d366;border-radius:50%;flex-shrink:0}

  @media(max-width:768px){
    .c9-layout{grid-template-columns:1fr!important}
    .c9-why-grid{grid-template-columns:1fr!important}
    .c9-avail-grid{grid-template-columns:1fr!important}
  }
`;

function useCursor() {
  useEffect(() => {
    const cur = document.getElementById("c9-cursor");
    if (!cur) return;
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener("mousemove", onMove);
    let raf;
    const lerp = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cur.style.left = cx + "px";
      cur.style.top = cy + "px";
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);
    document
      .querySelectorAll("a,button,.c9-why-card,.c9-detail-row")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => cur.classList.add("big"));
        el.addEventListener("mouseleave", () => cur.classList.remove("big"));
      });
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".c9-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const sectionLabel = {
  fontSize: ".6rem",
  letterSpacing: ".25em",
  textTransform: "uppercase",
  color: LIME,
  marginBottom: "1.2rem",
  display: "block",
};

const SERVICES = [
  "Select a service...",
  "Performance Marketing (Meta / Google Ads)",
  "Social Media Management",
  "Content Creation & Strategy",
  "Brand Identity & Logo Design",
  "Website Design & Development",
  "Influencer Marketing",
  "Pitch Decks",
  "Packaging Design",
  "Full-Service Marketing Partner",
  "Other / Not Sure Yet",
];

export default function ContactPage() {
  useCursor();
  useReveal();

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{globalCSS}</style>

      <div id="c9-cursor" />

      {/* NAV */}
      {/* <nav style={{position:"fixed",top:0,left:0,right:0,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.4rem clamp(1.5rem,5vw,4rem)",zIndex:200}}>
        <a href="#" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.5rem",letterSpacing:".12em",color:WHITE,textDecoration:"none"}}>
          VISION<span style={{color:LIME}}>9</span>
        </a>
        <span style={{fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",color:"#5a5a5a"}}>Contact Us</span>
      </nav> */}
      <Header />

      {/* ══ HERO ══ */}
      <section
        style={{
          minHeight: "65vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding:
            "clamp(8rem,16vh,12rem) clamp(1.5rem,5vw,4rem) clamp(3rem,6vh,5rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* animated grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(196,241,53,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,241,53,.04) 1px,transparent 1px)`,
            backgroundSize: "80px 80px",
            animation: "c9GridMove 20s linear infinite",
            pointerEvents: "none",
          }}
        />
        {/* scan line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg,transparent,rgba(196,241,53,.4),transparent)",
            animation: "c9Scan 6s linear infinite",
            pointerEvents: "none",
          }}
        />

        <p
          style={{
            fontSize: ".62rem",
            letterSpacing: ".25em",
            textTransform: "uppercase",
            color: LIME,
            marginBottom: "1.5rem",
            opacity: 0,
            animation: "c9FadeUp .7s .3s forwards",
          }}
        >
          Get In Touch
        </p>
        <h1
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(3.5rem,10vw,10rem)",
            lineHeight: 0.88,
            letterSpacing: "-.01em",
            overflow: "hidden",
            maxWidth: "900px",
          }}
        >
          {["LET'S BUILD", "GROWTH THAT", "PERFORMS"].map((l, i) => (
            <span
              key={i}
              style={{
                display: "block",
                clipPath: "inset(0 0 100% 0)",
                animation: `c9ClipLine .9s cubic-bezier(.16,1,.3,1) ${0.45 + i * 0.15}s forwards`,
                color: i === 2 ? LIME : WHITE,
              }}
            >
              {l}
            </span>
          ))}
        </h1>
        <p
          style={{
            maxWidth: 520,
            marginTop: "2rem",
            fontSize: "clamp(.88rem,1.4vw,1rem)",
            lineHeight: 1.8,
            color: "rgba(248,248,244,.55)",
            opacity: 0,
            animation: "c9FadeUp .8s 1s forwards",
          }}
        >
          Whether you're looking to generate leads, build a strong brand, or
          scale your digital presence — Vision9 is here to help. Tell us about
          your business and goals.
        </p>
      </section>

      {/* ══ FORM + DETAILS ══ */}
      <section
        style={{ padding: "clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem)" }}
      >
        <div
          className="c9-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem,6vw,7rem)",
            alignItems: "start",
          }}
        >
          {/* FORM */}
          <div>
            <div className="c9-reveal">
              <span style={sectionLabel}>01 — Start The Conversation</span>
              <h2
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontSize: "clamp(1.6rem,3.5vw,3rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  marginBottom: "clamp(2rem,4vh,3rem)",
                }}
              >
                Fill out the form and our team will{" "}
                <em style={{ color: LIME, fontStyle: "italic" }}>
                  reach back shortly
                </em>
              </h2>
            </div>

            {submitted ? (
              <div
                className="c9-reveal visible"
                style={{
                  border: `1px solid ${LIME}`,
                  padding: "3rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "3rem",
                    color: LIME,
                    marginBottom: ".5rem",
                  }}
                >
                  MESSAGE SENT
                </div>
                <p
                  style={{
                    color: "rgba(248,248,244,.6)",
                    fontSize: ".95rem",
                    lineHeight: 1.7,
                  }}
                >
                  Thanks! Our team will connect with you within 24 hours.
                  Looking forward to building with you.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="c9-reveal c9-rd1"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* Full Name */}
                <div className="c9-field-wrap">
                  <input
                    className="c9-field"
                    type="text"
                    name="name"
                    placeholder=" "
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                  <label className="c9-field-label">Full Name *</label>
                  <div className="c9-field-bar" />
                </div>
                {/* Company */}
                <div className="c9-field-wrap">
                  <input
                    className="c9-field"
                    type="text"
                    name="company"
                    placeholder=" "
                    value={form.company}
                    onChange={handleChange}
                  />
                  <label className="c9-field-label">Company / Brand Name</label>
                  <div className="c9-field-bar" />
                </div>
                {/* Email */}
                <div className="c9-field-wrap">
                  <input
                    className="c9-field"
                    type="email"
                    name="email"
                    placeholder=" "
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                  <label className="c9-field-label">Email Address *</label>
                  <div className="c9-field-bar" />
                </div>
                {/* Phone */}
                <div className="c9-field-wrap">
                  <input
                    className="c9-field"
                    type="tel"
                    name="phone"
                    placeholder=" "
                    value={form.phone}
                    onChange={handleChange}
                  />
                  <label className="c9-field-label">
                    Phone / WhatsApp Number
                  </label>
                  <div className="c9-field-bar" />
                </div>
                {/* Service dropdown */}
                <div className="c9-field-wrap">
                  <select
                    className="c9-field"
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    style={{ paddingTop: ".9rem", paddingBottom: ".9rem" }}
                  >
                    {SERVICES.map((s, i) => (
                      <option key={i} value={i === 0 ? "" : s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="c9-field-bar" />
                </div>
                {/* Message */}
                <div className="c9-field-wrap">
                  <textarea
                    className="c9-field"
                    name="message"
                    placeholder=" "
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    style={{ resize: "vertical", minHeight: 100 }}
                  />
                  <label className="c9-field-label">
                    Brief Requirement / Message
                  </label>
                  <div className="c9-field-bar" />
                </div>

                <button type="submit" className="c9-submit" disabled={sending}>
                  {sending ? "SENDING..." : "BOOK A STRATEGY CALL →"}
                </button>

                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="c9-wa"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  <span className="c9-wa-dot" />
                  CONNECT ON WHATSAPP
                </a>
              </form>
            )}
          </div>

          {/* DETAILS */}
          <div>
            <div className="c9-reveal">
              <span style={sectionLabel}>02 — Contact Details</span>
              <h2
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontSize: "clamp(1.6rem,3.5vw,3rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  marginBottom: "clamp(2rem,4vh,3rem)",
                }}
              >
                Reach us{" "}
                <em style={{ color: LIME, fontStyle: "italic" }}>directly</em>
              </h2>
            </div>

            <div
              className="c9-reveal c9-rd1"
              style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}
            >
              {[
                { icon: "✉", label: "Email", val: "info@vision9.in" },
                {
                  icon: "📱",
                  label: "Phone / WhatsApp",
                  val: "+91 XXXXX XXXXX",
                },
                {
                  icon: "📍",
                  label: "Location",
                  val: "Belagavi, India — Serving clients globally",
                },
              ].map((d, i) => (
                <div key={i} className="c9-detail-row">
                  <div className="c9-detail-icon">{d.icon}</div>
                  <div>
                    <div className="c9-detail-label">{d.label}</div>
                    <div className="c9-detail-val">{d.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Global availability */}
            <div
              className="c9-reveal c9-rd2"
              style={{
                marginTop: "2.5rem",
                border: "1px solid rgba(255,255,255,.07)",
                padding: "clamp(1.5rem,3vw,2.5rem)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg,${LIME},transparent)`,
                }}
              />
              <span style={sectionLabel}>Global Availability</span>
              <p
                style={{
                  fontSize: "clamp(.85rem,1.3vw,.95rem)",
                  lineHeight: 1.8,
                  color: "rgba(248,248,244,.6)",
                }}
              >
                We work with brands across India and international markets,
                offering flexible communication through calls, video meetings,
                and WhatsApp for seamless collaboration.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: ".6rem",
                  marginTop: "1.5rem",
                }}
              >
                {["India", "Dubai", "Global Markets", "Remote-First"].map(
                  (tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: ".6rem",
                        letterSpacing: ".15em",
                        textTransform: "uppercase",
                        border: `1px solid ${LIME}`,
                        color: LIME,
                        padding: ".4rem .8rem",
                      }}
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="c9-reveal c9-rd3"
              style={{
                marginTop: "1.5rem",
                border: "1px solid rgba(255,255,255,.07)",
                aspectRatio: "16/7",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(rgba(196,241,53,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(196,241,53,.03) 1px,transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              />
              <div
                style={{ textAlign: "center", position: "relative", zIndex: 1 }}
              >
                <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>
                  📍
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "1rem",
                    letterSpacing: ".1em",
                    color: LIME,
                  }}
                >
                  BELAGAVI, INDIA
                </div>
                <div
                  style={{
                    fontSize: ".65rem",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "rgba(248,248,244,.35)",
                    marginTop: ".3rem",
                  }}
                >
                  Replace with Google Maps embed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY VISION9 ══ */}
      <section
        style={{ padding: "clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem)" }}
      >
        <div className="c9-reveal">
          <span style={sectionLabel}>03 — Why Contact Vision9</span>
          <h2
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: "clamp(1.6rem,3.5vw,3rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "clamp(2rem,4vh,3rem)",
              maxWidth: 560,
            }}
          >
            No generic pitches — only{" "}
            <em style={{ color: LIME, fontStyle: "italic" }}>
              relevant solutions
            </em>
          </h2>
        </div>
        <div
          className="c9-why-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "clamp(1rem,2vw,1.5rem)",
          }}
        >
          {[
            {
              num: "01",
              title: "STRATEGY-FIRST",
              text: "Every consultation starts with understanding your business goals — not a pre-packaged pitch.",
            },
            {
              num: "02",
              title: "CLEAR OBJECTIVES",
              text: "We take time to fully understand where your brand is and where you want it to go.",
            },
            {
              num: "03",
              title: "PRACTICAL RECS",
              text: "Actionable, result-oriented recommendations built around your actual situation and budget.",
            },
            {
              num: "04",
              title: "TAILORED ONLY",
              text: "No two businesses are alike. Our recommendations are built from scratch for your context.",
            },
          ].map((c, i) => (
            <div key={i} className={`c9-why-card c9-reveal c9-rd${i + 1}`}>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "4rem",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(196,241,53,.12)",
                  lineHeight: 1,
                  marginBottom: ".5rem",
                }}
              >
                {c.num}
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(1.2rem,2vw,1.6rem)",
                  letterSpacing: ".06em",
                  marginBottom: ".8rem",
                }}
              >
                {c.title}
              </div>
              <p
                style={{
                  fontSize: "clamp(.8rem,1.2vw,.9rem)",
                  lineHeight: 1.8,
                  color: "rgba(248,248,244,.5)",
                }}
              >
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section
        style={{
          padding: "clamp(6rem,14vh,10rem) clamp(1.5rem,5vw,4rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(5rem,18vw,18rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(196,241,53,.05)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            animation: "c9Pulse 6s ease-in-out infinite",
          }}
        >
          VISION9
        </div>
        <p
          className="c9-reveal"
          style={{
            fontSize: ".62rem",
            letterSpacing: ".25em",
            textTransform: "uppercase",
            color: LIME,
            marginBottom: "1.5rem",
            position: "relative",
          }}
        >
          Ready to take the next step?
        </p>
        <h2
          className="c9-reveal c9-rd1"
          style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: "clamp(2rem,5.5vw,5rem)",
            lineHeight: 1.1,
            maxWidth: 740,
            fontWeight: 400,
            position: "relative",
          }}
        >
          Let's discuss how Vision9 can help your brand grow with{" "}
          <em style={{ color: LIME, fontStyle: "italic" }}>
            clarity &amp; consistency
          </em>
        </h2>
        <div
          className="c9-reveal c9-rd2"
          style={{
            marginTop: "clamp(2rem,4vh,3rem)",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <a
            href="#"
            style={{
              background: LIME,
              color: BLACK,
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "1rem",
              letterSpacing: ".12em",
              padding: "1rem 2.5rem",
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
              transition: "background .3s,transform .3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#d4ff3e")}
            onMouseOut={(e) => (e.currentTarget.style.background = LIME)}
          >
            BOOK A STRATEGY CALL
          </a>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="c9-wa"
          >
            <span className="c9-wa-dot" />
            CONTACT ON WHATSAPP
          </a>
        </div>
      </section>
    </>
  );
}
