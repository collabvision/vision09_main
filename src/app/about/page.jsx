"use client";
import { useEffect, useRef } from "react";
import Header from "@/components/custom/Header";
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

const CSS = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:   #a6a216;
  --gold-l: #ebe60c;
  --gold-m: #d2ce12;
  --gold-d: #737017;

  --gold-glow:  rgba(166,162,22,0.25);
  --gold-border:rgba(166,162,22,0.35);

  --black: #231f1f;
  --rich:  #3f3c15;

  --off:   #fffee9;

  --white: #ffffff;
  --cream: #f5f2c8;
  --warm:  #58564d;
}
html{scroll-behavior:smooth}
body{background:var(--black);color:var(--white);font-family:'DM Sans',sans-serif;font-weight:300;overflow-x:hidden;cursor:none}

/* ── CURSOR ── */
#cur{width:8px;height:8px;background:var(--gold);position:fixed;pointer-events:none;z-index:9999;
  transform:translate(-50%,-50%);transition:width .35s,height .35s,background .35s,border-radius .35s,opacity .35s}
#cur.big{width:44px;height:44px;background:transparent;border:1px solid var(--gold);border-radius:0}
#cur-ring{width:32px;height:32px;border:1px solid rgba(200,169,81,.3);position:fixed;pointer-events:none;z-index:9998;
  transform:translate(-50%,-50%);border-radius:0;transition:width .5s,height .5s,opacity .5s}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;
  padding:1.2rem clamp(1.5rem,5vw,4rem);z-index:200;
  border-bottom:1px solid var(--gold-border);background:rgba(8,8,6,.92);backdrop-filter:blur(16px)}
.nav-logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;
  letter-spacing:.06em;color:var(--white);text-decoration:none;display:flex;align-items:center;gap:.5rem}
.nav-logo .accent{color:var(--gold)}
.nav-tag{font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--warm)}

/* ── SECTION FURNITURE ── */
.sec-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;
  color:var(--gold);margin-bottom:.9rem;display:flex;align-items:center;gap:.7rem}
.sec-eyebrow::before,.sec-eyebrow::after{content:'';flex:1;max-width:40px;height:1px;
  background:linear-gradient(90deg,var(--gold),transparent)}
.sec-eyebrow::before{background:linear-gradient(270deg,var(--gold),transparent)}
.sec-rule{width:100%;height:1px;background:linear-gradient(90deg,transparent 0%,var(--gold) 30%,var(--gold-m) 50%,var(--gold) 70%,transparent 100%);opacity:.25;margin:0}

/* ── HERO ── */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;
  padding:clamp(5rem,12vh,9rem) clamp(1.5rem,5vw,4rem) 0;position:relative;overflow:hidden}
.hero-noise{position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");pointer-events:none}
.hero-glow{position:absolute;top:-20%;right:-10%;width:600px;height:600px;
  background:radial-gradient(ellipse,rgba(200,169,81,.06) 0%,transparent 70%);pointer-events:none}
.hero-eyebrow{font-family:'Tenor Sans',sans-serif;font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--gold);margin-bottom:1.6rem;opacity:0;animation:fadeUp .8s .3s forwards;display:flex;align-items:center;gap:.8rem}
.hero-eyebrow span{width:24px;height:1px;background:var(--gold);display:inline-block}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(4rem,13vw,13rem);
  line-height:.87;letter-spacing:-.02em;overflow:hidden;font-weight:900}
.hero-title .ln{display:block;opacity:0;transform:translateY(105%);animation:slideUp .95s cubic-bezier(.16,1,.3,1) forwards}
.ln1{animation-delay:.5s}.ln2{animation-delay:.65s;color:var(--gold);font-style:italic}.ln3{animation-delay:.8s}
.hero-sub{max-width:480px;margin-top:2.5rem;font-size:clamp(.88rem,1.4vw,1rem);line-height:1.85;
  color:rgba(245,240,232,.5);opacity:0;animation:fadeUp .8s 1.05s forwards}
.hero-badge{position:absolute;right:clamp(1.5rem,6vw,6rem);bottom:clamp(4rem,9vh,7rem);
  text-align:right;opacity:0;animation:fadeUp .8s 1.3s forwards}
.hero-badge .yr{font-family:'Playfair Display',serif;font-size:clamp(3rem,6vw,5.5rem);
  color:transparent;-webkit-text-stroke:1px rgba(200,169,81,.22);line-height:1;font-weight:900}
.hero-badge .est{font-family:'Tenor Sans',sans-serif;font-size:.55rem;letter-spacing:.24em;text-transform:uppercase;color:var(--warm)}
/* ticker */
.ticker-wrap{position:relative;bottom:0;left:0;right:0;height:52px;background:var(--gold);overflow:hidden;
  display:flex;align-items:center;margin-top:clamp(3rem,6vh,5rem)}
.ticker-track{display:flex;white-space:nowrap;animation:tkr 20s linear infinite}
.t-item{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:600;letter-spacing:.18em;
  color:var(--black);padding:0 2.2rem;display:flex;align-items:center;gap:1.4rem;text-transform:uppercase}
.t-diamond{width:5px;height:5px;background:var(--black);transform:rotate(45deg);opacity:.4;flex-shrink:0}

/* ── STORY ── */
.story{padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);display:grid;
  grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,6rem);align-items:start;min-height:auto}
.story-left{position:sticky;top:clamp(5rem,10vh,8rem)}
.story-ghost{font-family:'Playfair Display',serif;font-size:clamp(5rem,12vw,11rem);
  color:transparent;-webkit-text-stroke:1px rgba(200,169,81,.13);line-height:1;margin-bottom:-.8rem;font-weight:900}
.story-h{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.6vw,3.2rem);line-height:1.15;font-weight:600}
.story-h em{color:var(--gold);font-style:italic}
.body-txt{font-size:clamp(.88rem,1.4vw,1rem);line-height:1.9;color:rgba(245,240,232,.55);margin-bottom:2rem}

/* ── VM ── */
.vm-section{padding:clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem);min-height:auto}
.vm-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(1rem,2vw,1.5rem);margin-top:clamp(2rem,4vh,3rem)}
.vm-card{border:1px solid var(--gold-border);padding:clamp(1.8rem,4vw,3rem);position:relative;
  overflow:hidden;transition:border-color .4s,background .4s;background:rgba(200,169,81,.02)}
.vm-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--gold-d),var(--gold),var(--gold-m),var(--gold),var(--gold-d));
  transform:scaleX(0);transform-origin:left;transition:transform .6s ease}
.vm-card:hover::before{transform:scaleX(1)}
.vm-card:hover{border-color:rgba(200,169,81,.35);background:rgba(200,169,81,.04)}
/* corner brackets */
.vm-card::after{content:'';position:absolute;bottom:12px;right:12px;width:20px;height:20px;
  border-bottom:1px solid rgba(200,169,81,.2);border-right:1px solid rgba(200,169,81,.2)}
.vm-tag{font-family:'Tenor Sans',sans-serif;font-size:.54rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--gold);margin-bottom:1rem;display:block}
.vm-title{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3vw,2.6rem);
  letter-spacing:.02em;margin-bottom:1rem;line-height:1;font-weight:700}
.vm-text{font-size:clamp(.82rem,1.3vw,.95rem);line-height:1.82;color:rgba(245,240,232,.5)}

/* ── FOUNDERS ── */
.founders{padding:clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem);min-height:auto}
.intro-txt{max-width:640px;font-size:clamp(.88rem,1.4vw,1rem);line-height:1.9;
  color:rgba(245,240,232,.5);margin:1.5rem 0 clamp(3rem,6vh,5rem)}
.f-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(1rem,2vw,1.5rem)}
.f-card{background:rgba(200,169,81,.025);border:1px solid var(--gold-border);
  padding:clamp(1.5rem,3vw,2.5rem);position:relative;overflow:hidden;transition:background .4s,transform .4s,border-color .4s}
.f-card:hover{background:rgba(200,169,81,.07);transform:translateY(-5px);border-color:rgba(200,169,81,.35)}
/* top bar on hover */
.f-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--gold-d),var(--gold));transform:scaleX(0);transform-origin:left;transition:transform .5s}
.f-card:hover::before{transform:scaleX(1)}
.f-num{font-family:'Playfair Display',serif;font-size:4.5rem;color:transparent;
  -webkit-text-stroke:1px rgba(200,169,81,.12);line-height:1;position:absolute;top:.5rem;right:1rem;font-weight:900}
.f-name{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,2.2vw,1.9rem);
  letter-spacing:.03em;color:var(--white);margin-bottom:.3rem;line-height:1;font-weight:700}
.f-role{font-family:'Tenor Sans',sans-serif;font-size:.56rem;letter-spacing:.2em;text-transform:uppercase;
  color:var(--gold);margin-bottom:1rem;display:block}
.f-rule{width:24px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);margin-bottom:1rem}
.f-bio{font-size:clamp(.78rem,1.15vw,.86rem);line-height:1.82;color:rgba(245,240,232,.48)}
.f-quote{margin-top:1.2rem;font-size:.76rem;font-family:'Playfair Display',serif;
  font-style:italic;color:rgba(200,169,81,.65);line-height:1.5}

/* ── DIFF ── */
.diff{padding:clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem);min-height:auto}
.diff-list{margin-top:clamp(2.5rem,5vh,4rem);border-top:1px solid var(--gold-border)}
.diff-row{display:flex;align-items:flex-start;gap:clamp(1rem,3vw,3rem);
  padding:clamp(1.2rem,2.5vh,2rem) 0;border-bottom:1px solid var(--gold-border);cursor:default;transition:.3s}
.diff-row:hover .di{color:var(--gold)}.diff-row:hover .dt{color:var(--white)}.diff-row:hover .da{opacity:1;transform:translateX(0)}
.di{font-family:'Playfair Display',serif;font-size:1rem;color:var(--warm);min-width:2.5rem;padding-top:.1rem;transition:color .3s;font-weight:400}
.dt{font-family:'Playfair Display',serif;font-size:clamp(1rem,2.2vw,1.5rem);font-weight:400;
  color:rgba(245,240,232,.6);line-height:1.4;transition:color .3s}
.da{margin-left:auto;font-size:1rem;color:var(--gold);opacity:0;transform:translateX(-10px);transition:opacity .3s,transform .3s;padding-top:.12rem}

/* ── CTA ── */
.cta{padding:clamp(6rem,14vh,10rem) clamp(1.5rem,5vw,4rem);display:flex;flex-direction:column;
  align-items:center;text-align:center;position:relative;overflow:hidden}
.cta-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  font-family:'Playfair Display',serif;font-size:clamp(5rem,19vw,19rem);color:transparent;
  -webkit-text-stroke:1px rgba(200,169,81,.045);white-space:nowrap;pointer-events:none;
  animation:gPulse 8s ease-in-out infinite;font-weight:900}
.cta-orn{font-family:'Tenor Sans',sans-serif;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--gold);margin-bottom:1.4rem;position:relative;display:flex;align-items:center;gap:.8rem;justify-content:center}
.cta-orn span{width:30px;height:1px;background:var(--gold);display:inline-block}
.cta-h{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,6vw,5.5rem);
  line-height:1.08;max-width:820px;font-weight:600;position:relative}
.cta-h em{color:var(--gold);font-style:italic}
.cta-sub{margin-top:1.6rem;font-size:clamp(.85rem,1.4vw,1rem);color:rgba(245,240,232,.45);
  max-width:500px;line-height:1.8;position:relative}
.cta-btns{margin-top:clamp(2rem,4vh,3rem);display:flex;gap:1.2rem;flex-wrap:wrap;justify-content:center;position:relative}
.btn-gold{background:var(--gold);color:var(--black);font-family:'Playfair Display',serif;font-size:.9rem;
  font-weight:700;letter-spacing:.15em;padding:1rem 2.8rem;border:none;cursor:none;text-decoration:none;
  display:inline-block;transition:background .3s,transform .3s;text-transform:uppercase;position:relative;overflow:hidden}
.btn-gold::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
  transform:translateX(-100%);transition:transform .4s}
.btn-gold:hover::after{transform:translateX(100%)}
.btn-gold:hover{background:var(--gold-l);transform:translateY(-2px)}
.btn-out{background:transparent;color:var(--white);font-family:'Playfair Display',serif;font-size:.9rem;
  font-weight:600;letter-spacing:.15em;padding:1rem 2.8rem;border:1px solid rgba(200,169,81,.35);
  cursor:none;text-decoration:none;transition:border-color .3s,color .3s,transform .3s;
  display:inline-block;text-transform:uppercase}
.btn-out:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-2px)}

/* ── REVEAL ── */
.rv{opacity:0;transform:translateY(38px);transition:opacity .85s ease,transform .85s cubic-bezier(.16,1,.3,1)}
.rv.on{opacity:1;transform:translateY(0)}
.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}

@keyframes slideUp{to{opacity:1;transform:translateY(0)}}
@keyframes fadeUp{to{opacity:1;transform:translateY(0)}}
@keyframes tkr{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes gPulse{0%,100%{opacity:.5;letter-spacing:.02em}50%{opacity:1;letter-spacing:.1em}}

@media(max-width:768px){
  .story{grid-template-columns:1fr}.story-left{position:static}
  .vm-grid{grid-template-columns:1fr}.f-grid{grid-template-columns:1fr}.dt{font-size:1rem}
}
@media(max-width:480px){.hero-title{font-size:clamp(3rem,18vw,6rem)}.cta-btns{flex-direction:column;align-items:center}}
`;

export default function AboutPage() {
  const curRef = useRef(null),
    ringRef = useRef(null);
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
    (function lerp() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      rx += (mx - rx) * 0.08;
      ry += (my - ry) * 0.08;
      cur.style.left = cx + "px";
      cur.style.top = cy + "px";
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(lerp);
    })();
    document
      .querySelectorAll("a,button,.f-card,.vm-card,.diff-row")
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
    return () => {
      document.removeEventListener("mousemove", mv);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  const tickers = [
    "Strategy",
    "Branding",
    "Performance Marketing",
    "Content Systems",
    "Growth",
    "Social Media",
    "Influencer Marketing",
    "Website Design",
  ];

  return (
    <>
      <style>{CSS}</style>
      <div id="cur" ref={curRef} />
      <div id="cur-ring" ref={ringRef} />
      {/* <nav>
      <a href="#" className="nav-logo">VISION<span className="accent">9</span></a>
      <span className="nav-tag">About Us</span>
    </nav> */}
      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-glow" />
        <p className="hero-eyebrow">
          <span />
          Strategic Marketing &amp; Brand Communication
          <span />
        </p>
        <h1 className="hero-title">
          <span className="ln ln1">WHO</span>
          <span className="ln ln2">WE</span>
          <span className="ln ln3">ARE</span>
        </h1>
        <p className="hero-sub">
          In a space where everyone is creating content, we focus on building
          systems that convert—combining strategy, creativity, performance
          marketing, and execution to deliver real business impact.
        </p>
        <div className="hero-badge">
          <div className="yr">2024</div>
          <div className="est">Est. · Pune, India</div>
        </div>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...tickers, ...tickers].map((t, i) => (
              <div key={i} className="t-item">
                {t}
                <span className="t-diamond" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sec-rule" />

      {/* STORY */}
      <section className="story">
        <div className="story-left rv">
          <div className="sec-eyebrow">01 — Our Story</div>
          <div className="story-ghost">01</div>
          <h2 className="story-h">
            Marketing should drive <em>results,</em> not just visibility.
          </h2>
        </div>
        <div>
          {[
            "Founded in early 2024 by Om Shetti, Sanyam Kalmani, and Murad Madarsha, Vision9 was created with a simple belief — marketing should drive results, not just visibility.",
            "What began as a focused creative collaboration quickly evolved into a structured agency built on original thinking, trend awareness, and performance-driven execution. By combining creative strength with strategic clarity, the founders set out to bridge the gap between ideas and measurable outcomes.",
            "Vision9 works as an extended marketing partner, aligning every campaign and creative decision with clearly defined growth objectives. We don't just produce content — we engineer systems that compound over time.",
          ].map((p, i) => (
            <p key={i} className={`body-txt rv d${i + 1}`}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <div className="sec-rule" />

      {/* VISION & MISSION */}
      <section className="vm-section">
        <div className="rv">
          <div className="sec-eyebrow">02 — Direction</div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.8rem,4vw,3.2rem)",
              fontWeight: 600,
              lineHeight: 1.2,
              maxWidth: 500,
            }}
          >
            Where we're headed &amp;{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
              why it matters
            </em>
          </h2>
        </div>
        <div className="vm-grid">
          {[
            {
              tag: "Vision",
              title: "BUILD TO SCALE",
              text: "To build brands that scale sustainably through strategic thinking, strong brand systems, and performance-driven execution.",
            },
            {
              tag: "Mission",
              title: "MEASURE EVERYTHING",
              text: "To help businesses generate measurable growth by combining strategy, creativity, performance marketing, and consistent execution across digital and offline channels.",
            },
          ].map((c, i) => (
            <div key={i} className={`vm-card rv d${i + 1}`}>
              <span className="vm-tag">{c.tag}</span>
              <div className="vm-title">{c.title}</div>
              <p className="vm-text">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="sec-rule" />

      {/* FOUNDERS */}
      <section className="founders">
        <div className="rv">
          <div className="sec-eyebrow">03 — The People</div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.8rem,4vw,3.2rem)",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Driven by a young,{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
              dynamic team
            </em>
          </h2>
        </div>
        <p className="intro-txt rv d1">
          Strategists, creatives, marketers, editors, designers, and campaign
          managers who work together with a shared focus on quality and results.
          Creative thinking meets data-backed execution.
        </p>
        <div className="f-grid">
          {[
            {
              n: "01",
              name: "OM SHETTI",
              role: "Co-Founder · Performance",
              bio: "Leads ads and performance division, ensuring clients receive quality leads through Meta, Google, and other platforms with every campaign tied to measurable results.",
              focus:
                "\"Marketing isn't about posting. It's about building systems that convert.\"",
              d: "d1",
            },
            {
              n: "02",
              name: "SANYAM KALMANI",
              role: "Co-Founder · R&D",
              bio: "Studies how content systems behave over time — what compounds, what breaks, what scales — and turns those findings into faceless growth frameworks for brands.",
              focus: '"Engineer growth built to last."',
              d: "d2",
            },
            {
              n: "03",
              name: "MURAD MADARSHA",
              role: "Co-Founder · Creative",
              bio: "Leads creative direction for faceless content and organic strategies that help brands scale their digital presence. Every piece of content is a growth asset.",
              focus: '"Every post has one job: make the brand remembered."',
              d: "d3",
            },
          ].map((f, i) => (
            <div key={i} className={`f-card rv ${f.d}`}>
              <div className="f-num">{f.n}</div>
              <div className="f-name">{f.name}</div>
              <span className="f-role">{f.role}</span>
              <div className="f-rule" />
              <p className="f-bio">{f.bio}</p>
              <p className="f-quote">{f.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="sec-rule" />

      {/* DIFFERENTIATORS */}
      <section className="diff">
        <div className="rv">
          <div className="sec-eyebrow">04 — What Sets Us Apart</div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.8rem,4vw,3.2rem)",
              fontWeight: 600,
              lineHeight: 1.2,
              maxWidth: 480,
            }}
          >
            Five reasons brands{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
              choose Vision9
            </em>
          </h2>
        </div>
        <div className="diff-list">
          {[
            {
              n: "01",
              t: "Strategy-first mindset with business outcomes at the core",
              d: "d1",
            },
            {
              n: "02",
              t: "Integrated digital, content, and offline branding execution",
              d: "d2",
            },
            {
              n: "03",
              t: "Industry-specific experience across high-impact sectors",
              d: "d3",
            },
            {
              n: "04",
              t: "International-quality standards and transparent reporting",
              d: "d4",
            },
            {
              n: "05",
              t: "Long-term partnerships over short-term campaigns",
              d: "",
            },
          ].map((item, i) => (
            <div key={i} className={`diff-row rv ${item.d}`}>
              <span className="di">{item.n}</span>
              <span className="dt">{item.t}</span>
              <span className="da">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-ghost">VISION9</div>
        <div className="cta-orn rv">
          <span />
          Ready to grow?
          <span />
        </div>
        <h2 className="cta-h rv d1">
          Let's Build Brands That <em>Perform</em>
        </h2>
        <p className="cta-sub rv d2">
          Partner with Vision9 to move from ideas to execution — and from
          execution to measurable growth.
        </p>
        <div className="cta-btns rv d3">
          <a href="#" className="btn-gold">
            Book a Strategy Call
          </a>
          <a href="#" className="btn-out">
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
