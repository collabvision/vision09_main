"use client";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/custom/Header";

/* ═══════════════════════════════════════════════════════════════
   THEME — edit here to retheme the entire page
   Every color in this file flows from these tokens only.
═══════════════════════════════════════════════════════════════ */
const THEME = {
  accent: "#A8832A",
  accentLight: "#D4B86A",
  accentMid: "#C4A24E",
  accentDark: "#6B5010",
  pageBg: "#FAF8F2",
  pageBgAlt: "#F2EDE0",
  cardBg: "#FFFFFF",
  navBg: "rgba(250,248,242,0.93)",
  textPrimary: "#1C1A14",
  textSecondary: "#56503E",
  textMuted: "#9A8E72",
  border: "rgba(168,131,42,0.20)",
  borderFaint: "rgba(168,131,42,0.10)",
  cursorFill: "#A8832A",
  cursorRing: "rgba(168,131,42,0.28)",
  btnSolidBg: "#A8832A",
  btnSolidText: "#FAF8F2",
  btnSolidHover: "#C4A24E",
  btnOutlineBorder: "rgba(168,131,42,0.38)",
  btnOutlineText: "#1C1A14",
  btnOutlineHover: "#A8832A",
  scanLineColor: "rgba(168,131,42,0.20)",
  successBorder: "#A8832A",
  successBg: "rgba(168,131,42,0.04)",
  successText: "#A8832A",
  waGreen: "#25D366",
  fieldBorder: "rgba(168,131,42,0.22)",
  fieldFocusBorder: "#A8832A",
  tagBorder: "rgba(168,131,42,0.30)",
  tagText: "#A8832A",
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
    `--cur:${t.cursorFill}`,
    `--cur-ring:${t.cursorRing}`,
    `--btn-bg:${t.btnSolidBg}`,
    `--btn-txt:${t.btnSolidText}`,
    `--btn-hover:${t.btnSolidHover}`,
    `--btn-ob:${t.btnOutlineBorder}`,
    `--btn-ot:${t.btnOutlineText}`,
    `--btn-ohover:${t.btnOutlineHover}`,
    `--scan:${t.scanLineColor}`,
    `--success-border:${t.successBorder}`,
    `--success-bg:${t.successBg}`,
    `--success-txt:${t.successText}`,
    `--wa:${t.waGreen}`,
    `--field-b:${t.fieldBorder}`,
    `--field-fb:${t.fieldFocusBorder}`,
    `--tag-b:${t.tagBorder}`,
    `--tag-t:${t.tagText}`,
  ].join(";");

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

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

/* HERO */
.hero{min-height:62vh;display:flex;flex-direction:column;justify-content:center;
  padding:clamp(8rem,16vh,12rem) clamp(1.5rem,5vw,4rem) clamp(3rem,6vh,5rem);
  position:relative;overflow:hidden;background:var(--bg)}
.hero-noise{position:absolute;inset:0;opacity:.015;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px 200px;pointer-events:none}
.hero-glow{position:absolute;bottom:-30%;right:-5%;width:600px;height:600px;
  background:radial-gradient(ellipse,var(--accent-l) 0%,transparent 65%);opacity:.1;pointer-events:none}
.scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--scan),transparent);
  animation:scanDown 8s linear infinite;pointer-events:none}
@keyframes scanDown{0%{top:-2%}100%{top:102%}}
.hero-k{font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--accent);margin-bottom:1.6rem;opacity:0;animation:fadeUp .7s .3s forwards;
  display:flex;align-items:center;gap:.8rem}
.hero-k span{width:20px;height:1px;background:var(--accent);display:inline-block}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(3rem,9vw,9.5rem);
  line-height:.87;letter-spacing:-.02em;overflow:hidden;font-weight:900;color:var(--text)}
.ht{display:block;clip-path:inset(0 0 100% 0);animation:clipR .9s cubic-bezier(.16,1,.3,1) forwards}
.ht1{animation-delay:.45s}.ht2{animation-delay:.6s;color:var(--accent);font-style:italic}.ht3{animation-delay:.75s}
@keyframes clipR{to{clip-path:inset(0 0 0% 0)}}
.hero-sub{max-width:520px;margin-top:2rem;font-size:clamp(.88rem,1.4vw,1rem);line-height:1.85;
  color:var(--text-sec);opacity:0;animation:fadeUp .8s 1s forwards}

/* CONTACT GRID */
.cgrid{padding:clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem);display:grid;
  grid-template-columns:1fr 1fr;gap:clamp(3rem,6vw,7rem);align-items:start;background:var(--bg)}
.ch{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3.2vw,2.8rem);
  font-weight:600;line-height:1.15;margin-bottom:clamp(2rem,4vh,3rem);color:var(--text)}
.ch em{color:var(--accent);font-style:italic}

/* FIELDS */
.fw{position:relative;margin-bottom:2rem}
.fi{width:100%;background:transparent;border:none;border-bottom:1px solid var(--field-b);
  padding:.9rem 0;font-family:'DM Sans',sans-serif;font-size:clamp(.88rem,1.4vw,.98rem);
  font-weight:300;color:var(--text);outline:none;transition:border-color .3s;appearance:none}
.fi::placeholder{color:var(--muted)}
.fi:focus{border-bottom-color:var(--field-fb)}
.fi option{background:var(--card);color:var(--text)}
.fl{position:absolute;top:.9rem;left:0;font-family:'Tenor Sans',sans-serif;font-size:.56rem;
  letter-spacing:.22em;text-transform:uppercase;color:var(--muted);pointer-events:none;
  transition:top .25s,font-size .25s,color .25s}
.fi:focus~.fl,.fi:not(:placeholder-shown)~.fl{top:-.88rem;font-size:.5rem;color:var(--accent)}
.fb{position:absolute;bottom:0;left:0;height:1px;width:0;
  background:linear-gradient(90deg,var(--accent-d),var(--accent),var(--accent-m));transition:width .45s ease}
.fi:focus~.fb{width:100%}

/* BUTTONS */
.btn-sub{background:var(--btn-bg);color:var(--btn-txt);font-family:'Playfair Display',serif;
  font-size:.9rem;font-weight:700;letter-spacing:.18em;padding:1.1rem 3rem;border:none;
  cursor:pointer;display:block;width:100%;margin-top:.5rem;text-transform:uppercase;
  position:relative;overflow:hidden;transition:background .3s,transform .3s}
.btn-sub::after{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
  transform:translateX(-100%);transition:transform .4s}
.btn-sub:hover::after{transform:translateX(100%)}
.btn-sub:hover{background:var(--btn-hover);transform:translateY(-2px)}
.btn-sub:disabled{opacity:.6;cursor:not-allowed;transform:none}
.btn-wa{display:inline-flex;align-items:center;gap:.8rem;background:transparent;
  color:var(--text);font-family:'Playfair Display',serif;font-size:.9rem;font-weight:600;
  letter-spacing:.15em;padding:1.1rem 2.5rem;border:1px solid var(--btn-ob);
  cursor:pointer;text-decoration:none;width:100%;justify-content:center;margin-top:1rem;
  text-transform:uppercase;transition:border-color .3s,color .3s,transform .3s}
.btn-wa:hover{border-color:var(--wa);color:var(--wa);transform:translateY(-2px)}
.wa-dot{width:8px;height:8px;background:var(--wa);border-radius:50%;flex-shrink:0}
.success-box{border:1px solid var(--success-border);padding:3.5rem 2.5rem;text-align:center;
  background:var(--success-bg);position:relative}
.success-box::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--accent),var(--accent-m),var(--accent),transparent)}
.s-title{font-family:'Playfair Display',serif;font-size:2.8rem;
  color:var(--success-txt);margin-bottom:.6rem;font-weight:700}
.s-sub{color:var(--text-sec);font-size:.95rem;line-height:1.8}

/* DETAILS */
.drow{display:flex;align-items:center;gap:1.5rem;padding:1.2rem 0;
  border-bottom:1px solid var(--border-f);transition:.3s;cursor:default}
.drow:hover .dl{color:var(--accent)}
.dicon{width:40px;height:40px;border:1px solid var(--border);display:flex;align-items:center;
  justify-content:center;font-size:.9rem;flex-shrink:0;background:var(--card);
  transition:border-color .3s,background .3s}
.drow:hover .dicon{border-color:var(--accent);background:var(--bg-alt)}
.dl{font-family:'Tenor Sans',sans-serif;font-size:.56rem;letter-spacing:.2em;text-transform:uppercase;
  color:var(--muted);margin-bottom:.2rem;transition:color .3s;display:block}
.dv{font-size:clamp(.88rem,1.4vw,1rem);color:var(--text)}
.avail{margin-top:2rem;border:1px solid var(--border);padding:clamp(1.5rem,3vw,2.5rem);
  position:relative;background:var(--card)}
.avail::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--accent),transparent)}
.avail-tags{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1.2rem}
.atag{font-family:'Tenor Sans',sans-serif;font-size:.54rem;letter-spacing:.18em;text-transform:uppercase;
  border:1px solid var(--tag-b);color:var(--tag-t);padding:.4rem .9rem}
.map-box{margin-top:1.5rem;border:1px solid var(--border);aspect-ratio:16/7;
  position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;
  background:var(--card)}
.map-grid-bg{position:absolute;inset:0;
  background-image:linear-gradient(var(--border-f) 1px,transparent 1px),linear-gradient(90deg,var(--border-f) 1px,transparent 1px);
  background-size:28px 28px}

/* WHY CARDS */
.why{padding:clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem);background:var(--bg-alt)}
.wgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(1rem,2vw,1.5rem);margin-top:clamp(2rem,4vh,3rem)}
.wcard{border:1px solid var(--border);padding:clamp(1.5rem,3vw,2.5rem);position:relative;
  overflow:hidden;background:var(--card);box-shadow:0 2px 16px var(--border-f);
  transition:border-color .4s,background .4s,box-shadow .4s}
.wcard::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,var(--accent-d),var(--accent),var(--accent-m));
  transform:scaleX(0);transform-origin:left;transition:transform .55s}
.wcard:hover::before{transform:scaleX(1)}
.wcard:hover{border-color:var(--accent-m);background:var(--bg-alt);box-shadow:0 12px 40px var(--border)}
.wcard::after{content:'';position:absolute;bottom:10px;right:10px;width:16px;height:16px;
  border-bottom:1px solid var(--border);border-right:1px solid var(--border)}
.wnum{font-family:'Playfair Display',serif;font-size:4rem;color:transparent;
  -webkit-text-stroke:1px var(--border);line-height:1;margin-bottom:.5rem;font-weight:900}
.wtitle{font-family:'Playfair Display',serif;font-size:clamp(1.1rem,1.9vw,1.5rem);
  letter-spacing:.03em;margin-bottom:.8rem;font-weight:600;color:var(--text)}
.wtext{font-size:clamp(.78rem,1.15vw,.9rem);line-height:1.82;color:var(--text-sec)}

/* CTA */
.cta{padding:clamp(6rem,14vh,10rem) clamp(1.5rem,5vw,4rem);display:flex;flex-direction:column;
  align-items:center;text-align:center;position:relative;overflow:hidden;background:var(--bg)}
.cta-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  font-family:'Playfair Display',serif;font-size:clamp(5rem,18vw,18rem);color:transparent;
  -webkit-text-stroke:1px var(--border);white-space:nowrap;pointer-events:none;
  animation:gPulse 8s ease-in-out infinite;font-weight:900}
.cta-orn{font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--accent);margin-bottom:1.4rem;display:flex;align-items:center;gap:.8rem;justify-content:center;position:relative}
.cta-orn span{width:30px;height:1px;background:var(--accent);display:inline-block}
.cta-h{font-family:'Playfair Display',serif;font-size:clamp(2rem,5.2vw,4.8rem);
  font-weight:600;line-height:1.08;max-width:740px;position:relative;color:var(--text)}
.cta-h em{color:var(--accent);font-style:italic}
.cta-sub{margin-top:1.5rem;font-size:clamp(.85rem,1.4vw,1rem);color:var(--text-sec);
  max-width:500px;line-height:1.8;position:relative}
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
  border:1px solid var(--btn-ob);cursor:none;text-decoration:none;display:inline-flex;
  align-items:center;gap:.7rem;text-transform:uppercase;transition:border-color .3s,color .3s,transform .3s}
.btn-outline:hover{border-color:var(--btn-ohover);color:var(--btn-ohover);transform:translateY(-2px)}

/* REVEAL */
.rv{opacity:0;transform:translateY(38px);transition:opacity .85s ease,transform .85s cubic-bezier(.16,1,.3,1)}
.rv.on{opacity:1;transform:translateY(0)}
.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}

@keyframes fadeUp{to{opacity:1;transform:translateY(0)}}
@keyframes gPulse{0%,100%{opacity:.4;letter-spacing:.02em}50%{opacity:.9;letter-spacing:.1em}}
@media(max-width:768px){.cgrid{grid-template-columns:1fr}.wgrid{grid-template-columns:1fr}}
@media(max-width:480px){.cta-btns{flex-direction:column;align-items:stretch}.btn-solid,.btn-outline{text-align:center;justify-content:center}}
`;

const SVCS = [
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
  const curRef = useRef(null),
    ringRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false),
    [sending, setSending] = useState(false);

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
    document.querySelectorAll("a,button,.wcard,.drow").forEach((el) => {
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
    return () => {
      document.removeEventListener("mousemove", mv);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  const change = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1300));
    setSending(false);
    setSent(true);
  };

  return (
    <>
      <style>{CSS}</style>
      <div id="cur" ref={curRef} />
      <div id="cur-ring" ref={ringRef} />
      {/* <nav><a href="#" className="logo">VISION<span className="g">9</span></a><span className="nav-t">Contact Us</span></nav> */}
      <Header />
      {/* HERO */}
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-glow" />
        <div className="scan" />
        <p className="hero-k">
          <span />
          Get In Touch
          <span />
        </p>
        <h1 className="hero-title">
          <span className="ht ht1">LET'S BUILD</span>
          <span className="ht ht2">GROWTH THAT</span>
          <span className="ht ht3">PERFORMS</span>
        </h1>
        <p className="hero-sub">
          Whether you're looking to generate leads, build a strong brand, or
          scale your digital presence — Vision9 is here to help. Tell us about
          your business and goals.
        </p>
      </section>

      <div className="sec-rule" />

      {/* FORM + DETAILS */}
      <section className="cgrid">
        <div>
          <div className="rv">
            <div className="sec-orn">01 — Start The Conversation</div>
            <h2 className="ch">
              Fill out the form and our team will <em>reach back shortly</em>
            </h2>
          </div>
          {sent ? (
            <div className="success-box rv on">
              <div className="s-title">✦ Message Sent ✦</div>
              <p className="s-sub">
                Thank you for reaching out. Our team will connect with you
                within 24 hours. Looking forward to building with you.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="rv d1">
              {[
                { n: "name", l: "Full Name", t: "text", r: true },
                {
                  n: "company",
                  l: "Company / Brand Name",
                  t: "text",
                  r: false,
                },
                { n: "email", l: "Email Address", t: "email", r: true },
                {
                  n: "phone",
                  l: "Phone / WhatsApp Number",
                  t: "tel",
                  r: false,
                },
              ].map((f) => (
                <div key={f.n} className="fw">
                  <input
                    className="fi"
                    type={f.t}
                    name={f.n}
                    placeholder=" "
                    required={f.r}
                    value={form[f.n]}
                    onChange={change}
                  />
                  <label className="fl">
                    {f.l}
                    {f.r ? " *" : ""}
                  </label>
                  <div className="fb" />
                </div>
              ))}
              <div className="fw">
                <select
                  className="fi"
                  name="service"
                  required
                  value={form.service}
                  onChange={change}
                >
                  {SVCS.map((s, i) => (
                    <option key={i} value={i === 0 ? "" : s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="fb" />
              </div>
              <div className="fw">
                <textarea
                  className="fi"
                  name="message"
                  placeholder=" "
                  rows={4}
                  value={form.message}
                  onChange={change}
                  style={{ resize: "vertical", minHeight: 100 }}
                />
                <label className="fl">Brief Requirement / Message</label>
                <div className="fb" />
              </div>
              <button type="submit" className="btn-sub" disabled={sending}>
                {sending ? "Sending…" : "Book a Strategy Call →"}
              </button>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                <span className="wa-dot" />
                Connect on WhatsApp
              </a>
            </form>
          )}
        </div>

        <div>
          <div className="rv">
            <div className="sec-orn">02 — Contact Details</div>
            <h2 className="ch">
              Reach us <em>directly</em>
            </h2>
          </div>
          <div
            className="rv d1"
            style={{ borderTop: "1px solid var(--border-f)" }}
          >
            {[
              { icon: "✉", l: "Email", v: "info@vision9.in" },
              { icon: "📱", l: "Phone / WhatsApp", v: "+91 XXXXX XXXXX" },
              {
                icon: "📍",
                l: "Location",
                v: "Belagavi, India — Serving clients globally",
              },
            ].map((d, i) => (
              <div key={i} className="drow">
                <div className="dicon">{d.icon}</div>
                <div>
                  <span className="dl">{d.l}</span>
                  <div className="dv">{d.v}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="avail rv d2">
            <div className="sec-orn" style={{ justifyContent: "flex-start" }}>
              Global Availability
            </div>
            <p
              style={{
                fontSize: "clamp(.85rem,1.3vw,.95rem)",
                lineHeight: 1.82,
                color: "var(--text-sec)",
              }}
            >
              We work with brands across India and international markets,
              offering flexible communication through calls, video meetings, and
              WhatsApp.
            </p>
            <div className="avail-tags">
              {["India", "Dubai", "Global Markets", "Remote-First"].map(
                (t, i) => (
                  <span key={i} className="atag">
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="map-box rv d3">
            <div className="map-grid-bg" />
            <div
              style={{ textAlign: "center", position: "relative", zIndex: 1 }}
            >
              <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>📍</div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1rem",
                  letterSpacing: ".1em",
                  color: "var(--accent)",
                  fontWeight: 600,
                }}
              >
                BELAGAVI, INDIA
              </div>
              <div
                style={{
                  fontFamily: "'Tenor Sans',sans-serif",
                  fontSize: ".56rem",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginTop: ".3rem",
                }}
              >
                Replace with Google Maps embed
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-rule" />

      {/* WHY VISION9 */}
      <section className="why">
        <div className="rv">
          <div className="sec-orn">03 — Why Contact Vision9</div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.6rem,3.2vw,2.8rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              maxWidth: 560,
              color: "var(--text)",
            }}
          >
            No generic pitches — only{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              relevant solutions
            </em>
          </h2>
        </div>
        <div className="wgrid">
          {[
            {
              n: "01",
              t: "Strategy-First Consultation",
              d2: "Every consultation starts with understanding your business goals — not a pre-packaged pitch.",
              d: "d1",
            },
            {
              n: "02",
              t: "Clear Understanding",
              d2: "We take time to fully understand where your brand is and where you want it to go.",
              d: "d2",
            },
            {
              n: "03",
              t: "Practical Recommendations",
              d2: "Actionable, result-oriented recommendations built around your actual situation and budget.",
              d: "d3",
            },
            {
              n: "04",
              t: "Tailored Only",
              d2: "No two businesses are alike. Our recommendations are built from scratch for your context.",
              d: "d4",
            },
          ].map((c, i) => (
            <div key={i} className={`wcard rv ${c.d}`}>
              <div className="wnum">{c.n}</div>
              <div className="wtitle">{c.t}</div>
              <p className="wtext">{c.d2}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-ghost">VISION9</div>
        <div className="cta-orn rv">
          <span />
          Ready to take the next step?
          <span />
        </div>
        <h2 className="cta-h rv d1">
          Let's discuss how Vision9 can help your brand grow with{" "}
          <em>clarity &amp; consistency</em>
        </h2>
        <p className="cta-sub rv d2">
          Partner with Vision9 to move from ideas to execution — and from
          execution to measurable growth.
        </p>
        <div className="cta-btns rv d3">
          <a href="#" className="btn-solid">
            Book a Strategy Call
          </a>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <span
              style={{
                width: 7,
                height: 7,
                background: "var(--wa)",
                borderRadius: "50%",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            Contact on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
