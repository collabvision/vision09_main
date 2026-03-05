"use client"

import { useEffect, useRef } from "react"
import Header from "../../components/custom/Header"

export default function ClientsPage() {
  const cursorRef  = useRef(null)
  const trackRef   = useRef(null)
  const fillRef    = useRef(null)
  const dragRef    = useRef({ isDown: false, startX: 0, scrollL: 0 })

  /* ── COUNT UP ── */
  function countUp(el) {
    const target   = parseInt(el.dataset.target)
    const duration = 1800
    const start    = performance.now()
    const suffix   = "+"
    ;(function update(now) {
      const p    = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)
      const val  = Math.floor(ease * target)
      el.textContent = val.toLocaleString() + (p >= 1 ? suffix : "")
      if (p < 1) requestAnimationFrame(update)
    })(start)
  }

  useEffect(() => {
    /* CURSOR */
    const cursor = cursorRef.current
    if (!cursor) return
    let mx=0, my=0, cx=0, cy=0
    const onMove = e => { mx = e.clientX; my = e.clientY }
    document.addEventListener("mousemove", onMove)
    ;(function lerp() {
      cx += (mx - cx) * .15; cy += (my - cy) * .15
      cursor.style.left = cx + "px"; cursor.style.top = cy + "px"
      requestAnimationFrame(lerp)
    })()
    document.querySelectorAll("a,button,.testi-card,.count-cell,.logo-cell,.ind-pill,.stat").forEach(el => {
      el.addEventListener("mouseenter", () => cursor.classList.add("big"))
      el.addEventListener("mouseleave", () => cursor.classList.remove("big"))
    })

    /* SCROLL REVEAL */
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target) } })
    }, { threshold: .1 })
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el))

    /* EXP AREA REVEAL */
    const areaObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".exp-area").forEach((a, i) => setTimeout(() => a.classList.add("visible"), i * 120))
          areaObs.unobserve(e.target)
        }
      })
    }, { threshold: .2 })
    const expSection = document.querySelector(".exp-areas")
    if (expSection) areaObs.observe(expSection.parentElement)

    /* COUNT UP */
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.querySelectorAll("[data-target]").forEach(countUp); countObs.unobserve(e.target) }
      })
    }, { threshold: .3 })
    document.querySelectorAll(".stats-strip,.count-grid").forEach(el => countObs.observe(el))

    /* DRAG SCROLL */
    const track = trackRef.current
    const fill  = fillRef.current
    if (track && fill) {
      const d = dragRef.current
      const onDown  = e => { d.isDown=true; track.classList.add("dragging"); d.startX=e.pageX-track.offsetLeft; d.scrollL=track.scrollLeft }
      const onLeave = () => { d.isDown=false; track.classList.remove("dragging") }
      const onUp    = () => { d.isDown=false; track.classList.remove("dragging") }
      const onMoveT = e => { if(!d.isDown) return; e.preventDefault(); track.scrollLeft = d.scrollL - (e.pageX - track.offsetLeft - d.startX) * 1.4 }
      const onScroll= () => { fill.style.width = (track.scrollLeft / (track.scrollWidth - track.clientWidth) * 100) + "%" }
      track.addEventListener("mousedown",  onDown)
      track.addEventListener("mouseleave", onLeave)
      track.addEventListener("mouseup",    onUp)
      track.addEventListener("mousemove",  onMoveT)
      track.addEventListener("scroll",     onScroll)
    }

    return () => { document.removeEventListener("mousemove", onMove); obs.disconnect(); areaObs.disconnect(); countObs.disconnect() }
  }, [])

  const industries1 = ["Healthcare & Hospitals","Real Estate & Infrastructure","Education Institutions","FMCG & Consumer Brands","Hospitality & Services"]
  const industries2 = ["Community Pages","Astrology","Meme Pages","Spiritual Brands","Career Consultancy","Fashion & Design"]
  const industries3 = ["Coaching Classes","International Recruitment","Luxury Experiences","Dubai Real Estate","Orthopaedic Clinics","Plastic & Hardware Retail"]

  const testimonials = [
    {quote:"Vision9 captured the essence of our spiritual work without ever losing its authenticity. Their faceless content brought in meaningful engagement and followers who resonate with our values. They truly understand how to create calm, powerful content in a noisy digital world.",name:"Dr Sphoorthi Mastiholi",role:"CEO · Shivoham Spiritual Hub"},
    {quote:"We wanted to take our household plastic mall online, and Vision9 made it happen in style. Their video content and creative reels brought local visibility and foot traffic to the store. We now see more customers who first saw us on social media.",name:"Sheetal Bogar",role:"Bogar Enterprises"},
    {quote:"Working with Vision9 gave our coaching classes the push we needed online. Their team understood how to speak to parents and students through impactful content. Thanks to their consistent efforts, our reach and admission inquiries have grown significantly.",name:"Richa Rashmi",role:"CEO · Cornerstone Academia"},
    {quote:"Vision9 has transformed our page into a visually appealing platform through their expert editing skills and well-planned content strategies. Their services enabled us to connect with a wide audience of fashion enthusiasts and significantly increased our digital presence.",name:"Prof. Mahantesh C.",role:"Principal · KLE's Institute of Fashion Technology"},
    {quote:"Working with Vision9 has been a game-changer for CubicCode. Their team brought unmatched creativity and consistency to our community page, helping us scale engagement and reach. Their faceless content strategy stands out, and the results speak for themselves.",name:"Sarvesh K",role:"Co-Founder · CubicCode"},
    {quote:"Reshaped our branding through identity design, banners, and OPD improvements while promoting government healthcare schemes. Their organic content and ads increased visibility, credibility, and patient trust in our experienced orthopedic team greatly.",name:"Dr. Devagoudah I",role:"Shree Ortho and Trauma Centre"},
    {quote:"Strengthened our branding with impactful hoardings and graphic design, helping us communicate care and professionalism. Their work increased trust, recognition, and visibility while keeping our hospital's values authentic and approachable to patients.",name:"Dr. Ishrrat Tigadi",role:"Ashirwad Hospital"},
    {quote:"Their team demonstrated strong expertise, strategic planning, and consistent performance in managing our campaigns. We observed improved reach, better engagement, and a clear understanding of our business goals. Vision9 maintained timely communication and delivered results with professionalism.",name:"Vineethkumar M B",role:"CEO · Admifit Career Consultancy LLP"},
    {quote:"We were in real estate and recruiting business in Dubai, but without a proper in-house team, Vision9 changed everything—bringing us global investors, strong hires from multiple countries, and much happier clients with consistent growth.",name:"Atiq Naikwadi",role:"Leads Finder Group · Dubai"},
  ]

  const logoClients = [
    "SHIVOHAM\nSPIRITUAL HUB","BOGAR\nENTERPRISES","CORNERSTONE\nACADEMIA","KLE INSTITUTE\nOF FASHION",
    "CUBICCODE","SHREE ORTHO &\nTRAUMA CENTRE","ASHIRWAD\nHOSPITAL","ADMIFIT CAREER\nCONSULTANCY",
    "LEADS FINDER\nGROUP · DUBAI","SMALL\nMIRACLES","REAL ESTATE\nSTORIES","ROYAL MAJESTIC\nYACHTS",
    "ASTRO\nHAPPINESS","MISTERCHEF","HEADLINE\nJUNCTION","+ MORE\nBRANDS",
  ]

  const tickerItems = ["HEALTHCARE","REAL ESTATE","EDUCATION","HOSPITALITY","FMCG","COMMUNITY","ASTROLOGY","MEME PAGES"]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--lime:#c4f135;--black:#080808;--white:#f8f8f4;--gray:#5a5a5a;--border:rgba(255,255,255,0.07);--card-bg:rgba(255,255,255,0.025)}
        html{scroll-behavior:smooth}
        body{background:var(--black);color:var(--white);font-family:'DM Sans',sans-serif;font-weight:300;overflow-x:hidden;cursor:none}

        #cl-cursor{width:10px;height:10px;background:var(--lime);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;left:0;top:0;transform:translate(-50%,-50%);transition:width .3s,height .3s,background .3s,border .3s}
        #cl-cursor.big{width:52px;height:52px;background:transparent;border:1.5px solid var(--lime);mix-blend-mode:difference}

        nav{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:1.4rem clamp(1.5rem,5vw,4rem);z-index:200}
        .logo{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:.12em;color:var(--white);text-decoration:none}
        .logo span{color:var(--lime)}
        .nav-tag{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gray)}

        /* HERO */
        .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:clamp(6rem,14vh,10rem) clamp(1.5rem,5vw,4rem) clamp(4rem,8vh,6rem);position:relative;overflow:hidden}
        .grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(196,241,53,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,241,53,.04) 1px,transparent 1px);background-size:80px 80px;animation:gridMove 20s linear infinite;pointer-events:none}
        @keyframes gridMove{0%{background-position:0 0}100%{background-position:80px 80px}}
        .hero-kicker{font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;color:var(--lime);margin-bottom:1.5rem;opacity:0;animation:fadeUp .7s .3s forwards}
        .hero-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,12rem);line-height:.88;letter-spacing:-.01em;overflow:hidden}
        .hero-title .tl{display:block;clip-path:inset(0 0 100% 0);animation:clipReveal .9s cubic-bezier(.16,1,.3,1) forwards}
        .tl:nth-child(1){animation-delay:.45s}
        .tl:nth-child(2){animation-delay:.6s;color:var(--lime)}
        .tl:nth-child(3){animation-delay:.75s}
        @keyframes clipReveal{to{clip-path:inset(0 0 0% 0)}}
        .hero-sub{max-width:500px;margin-top:2rem;font-size:clamp(.88rem,1.4vw,1rem);line-height:1.8;color:rgba(248,248,244,.55);opacity:0;animation:fadeUp .8s 1s forwards}
        .stats-strip{position:absolute;bottom:52px;left:0;right:0;display:flex;border-top:1px solid var(--border);opacity:0;animation:fadeUp .7s 1.2s forwards}
        .stat{flex:1;padding:1.4rem clamp(1rem,3vw,2.5rem);border-right:1px solid var(--border);transition:background .3s}
        .stat:hover{background:rgba(196,241,53,.04)}
        .stat:last-child{border-right:none}
        .stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(1.6rem,3.5vw,3rem);line-height:1;color:var(--lime);display:block}
        .stat-lbl{font-size:clamp(.58rem,.9vw,.72rem);letter-spacing:.15em;text-transform:uppercase;color:var(--gray);margin-top:.3rem;display:block}
        .ticker-bar{position:absolute;bottom:0;left:0;right:0;height:52px;background:var(--lime);overflow:hidden;display:flex;align-items:center}
        .ticker-track{display:flex;white-space:nowrap;animation:tick 22s linear infinite}
        .tick-item{font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.12em;color:var(--black);padding:0 2rem;display:flex;align-items:center;gap:1.5rem}
        .tick-dot{width:4px;height:4px;background:var(--black);border-radius:50%;opacity:.4}
        @keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

        /* INDUSTRIES */
        .industries{padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);position:relative}
        .sec-label{font-size:.6rem;letter-spacing:.25em;text-transform:uppercase;color:var(--lime);margin-bottom:1.2rem;display:block}
        .sec-title{font-family:'DM Serif Display',serif;font-size:clamp(1.8rem,4vw,3.5rem);font-weight:400;line-height:1.15;max-width:600px;margin-bottom:3rem}
        .sec-title em{color:var(--lime);font-style:italic}
        .ind-marquee-wrap{overflow:hidden;margin-bottom:.6rem}
        .ind-row{display:flex;white-space:nowrap;gap:1rem}
        .ind-row.row-r{animation:scrollL 25s linear infinite}
        .ind-row.row-l{animation:scrollR 30s linear infinite}
        .ind-row.row-r2{animation:scrollL 20s linear infinite}
        @keyframes scrollL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes scrollR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
        .ind-pill{display:inline-flex;align-items:center;gap:.6rem;border:1px solid var(--border);padding:.7rem 1.4rem;font-family:'Bebas Neue',sans-serif;font-size:clamp(.9rem,1.8vw,1.3rem);letter-spacing:.08em;color:var(--white);white-space:nowrap;flex-shrink:0;transition:background .3s,border-color .3s,color .3s}
        .ind-pill:hover{background:var(--lime);border-color:var(--lime);color:var(--black);cursor:none}
        .ind-pill .dot{width:5px;height:5px;background:var(--lime);border-radius:50%;flex-shrink:0;transition:background .3s}
        .ind-pill:hover .dot{background:var(--black)}

        /* EXPERIENCE */
        .exp-section{padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,6rem);align-items:start}
        .exp-left{position:sticky;top:clamp(5rem,10vh,7rem)}
        .exp-body{font-size:clamp(.88rem,1.4vw,1rem);line-height:1.85;color:rgba(248,248,244,.6);margin-bottom:1.8rem}
        .exp-areas{margin-top:2rem;border-top:1px solid var(--border)}
        .exp-area{display:flex;align-items:flex-start;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border);opacity:0;transform:translateX(-20px);transition:opacity .6s,transform .6s}
        .exp-area.visible{opacity:1;transform:translateX(0)}
        .ea-num{font-family:'Bebas Neue',sans-serif;font-size:.8rem;letter-spacing:.1em;color:var(--lime);min-width:2rem;padding-top:.15rem}
        .ea-txt{font-size:clamp(.82rem,1.3vw,.95rem);line-height:1.65;color:rgba(248,248,244,.6)}

        /* COUNTS */
        .count-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-top:3rem}
        .count-cell{background:var(--black);padding:clamp(1.5rem,3vw,2.5rem);position:relative;overflow:hidden;transition:background .4s}
        .count-cell:hover{background:rgba(196,241,53,.04)}
        .count-cell::after{content:'';position:absolute;top:0;left:0;width:100%;height:2px;background:var(--lime);transform:scaleX(0);transform-origin:left;transition:transform .5s ease}
        .count-cell:hover::after{transform:scaleX(1)}
        .count-val{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,5vw,4.5rem);color:var(--lime);line-height:1;display:block}
        .count-lbl{font-size:clamp(.65rem,1vw,.78rem);letter-spacing:.15em;text-transform:uppercase;color:var(--gray);margin-top:.4rem;display:block}

        /* TESTIMONIALS */
        .testi-section{padding:clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem);overflow:hidden}
        .testi-outer{position:relative;margin-top:clamp(2rem,4vh,3.5rem)}
        .testi-track{display:flex;gap:clamp(1rem,2vw,1.5rem);overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:.5rem;cursor:grab;user-select:none}
        .testi-track::-webkit-scrollbar{display:none}
        .testi-track.dragging{cursor:grabbing}
        .testi-card{flex-shrink:0;width:clamp(280px,38vw,420px);background:var(--card-bg);border:1px solid var(--border);padding:clamp(1.5rem,3vw,2.5rem);scroll-snap-align:start;position:relative;overflow:hidden;transition:border-color .4s,transform .4s,background .4s}
        .testi-card:hover{border-color:rgba(196,241,53,.25);transform:translateY(-5px);background:rgba(196,241,53,.03)}
        .testi-card::before{content:'201C';font-family:'DM Serif Display',serif;font-size:6rem;line-height:.7;color:rgba(196,241,53,.12);position:absolute;top:1rem;right:1.5rem;pointer-events:none}
        .testi-quote{font-size:clamp(.82rem,1.3vw,.94rem);line-height:1.82;color:rgba(248,248,244,.65);margin-bottom:1.5rem;font-style:italic}
        .testi-divider{width:28px;height:1px;background:rgba(196,241,53,.3);margin-bottom:1.2rem}
        .testi-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(1rem,1.8vw,1.3rem);letter-spacing:.06em;color:var(--white)}
        .testi-role{font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;color:var(--lime);margin-top:.25rem;display:block}
        .drag-hint{display:flex;align-items:center;gap:.8rem;margin-top:1.2rem;font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;color:var(--gray)}
        .drag-line{width:32px;height:1px;background:var(--gray)}
        .testi-progress{height:2px;background:var(--border);margin-top:1.5rem;position:relative;overflow:hidden}
        .testi-fill{position:absolute;top:0;left:0;bottom:0;background:var(--lime);width:0%;transition:width .1s}

        /* LOGOS */
        .logos-section{padding:clamp(4rem,8vh,6rem) clamp(1.5rem,5vw,4rem);border-top:1px solid var(--border)}
        .logos-grid{display:flex;flex-wrap:wrap;gap:0;margin-top:clamp(2rem,4vh,3rem);border:1px solid var(--border)}
        .logo-cell{flex:1 0 calc(25% - 0px);min-width:160px;padding:clamp(1.2rem,2.5vw,2rem) clamp(1rem,2vw,1.8rem);border-right:1px solid var(--border);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:clamp(.9rem,1.8vw,1.3rem);letter-spacing:.1em;color:rgba(248,248,244,.35);transition:color .4s,background .4s;text-align:center;position:relative;overflow:hidden}
        .logo-cell::after{content:'';position:absolute;inset:0;background:var(--lime);transform:translateY(101%);transition:transform .4s cubic-bezier(.16,1,.3,1);z-index:0}
        .logo-cell:hover::after{transform:translateY(0)}
        .logo-cell:hover{color:var(--black)}
        .logo-cell span{position:relative;z-index:1;white-space:pre-line}

        /* CTA */
        .cta-section{padding:clamp(6rem,14vh,10rem) clamp(1.5rem,5vw,4rem);text-align:center;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center}
        .cta-bg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,18vw,18rem);color:transparent;-webkit-text-stroke:1px rgba(196,241,53,.05);white-space:nowrap;pointer-events:none;animation:rotateSlow 30s linear infinite}
        @keyframes rotateSlow{0%{letter-spacing:.02em}50%{letter-spacing:.15em}100%{letter-spacing:.02em}}
        .cta-eyebrow{font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;color:var(--lime);margin-bottom:1.5rem;position:relative}
        .cta-h{font-family:'DM Serif Display',serif;font-size:clamp(2rem,5.5vw,5rem);font-weight:400;line-height:1.1;max-width:740px;position:relative}
        .cta-h em{color:var(--lime);font-style:italic}
        .cta-sub{margin-top:1.5rem;font-size:clamp(.85rem,1.4vw,1rem);color:rgba(248,248,244,.5);max-width:480px;line-height:1.75;position:relative}
        .cta-btns{margin-top:2.5rem;display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;position:relative}
        .btn-p{background:var(--lime);color:var(--black);font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.12em;padding:1rem 2.5rem;border:none;cursor:none;text-decoration:none;display:inline-block;transition:background .3s,transform .3s}
        .btn-p:hover{background:#d4ff3e;transform:translateY(-2px)}
        .btn-s{background:transparent;color:var(--white);font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.12em;padding:1rem 2.5rem;border:1px solid rgba(248,248,244,.2);cursor:none;text-decoration:none;display:inline-block;transition:border-color .3s,color .3s,transform .3s}
        .btn-s:hover{border-color:var(--lime);color:var(--lime);transform:translateY(-2px)}

        /* REVEAL */
        .reveal{opacity:0;transform:translateY(36px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .rd1{transition-delay:.1s}.rd2{transition-delay:.2s}.rd3{transition-delay:.3s}.rd4{transition-delay:.4s}.rd5{transition-delay:.5s}

        @keyframes fadeUp{to{opacity:1;transform:translateY(0)}}

        @media(max-width:768px){
          .exp-section{grid-template-columns:1fr}
          .exp-left{position:static}
          .count-grid{grid-template-columns:1fr 1fr}
          .stats-strip{display:none}
          .logo-cell{flex:1 0 calc(50% - 0px)}
        }
        @media(max-width:480px){
          .count-grid{grid-template-columns:1fr 1fr}
          .logo-cell{flex:1 0 50%}
          .cta-btns{flex-direction:column;align-items:stretch}
          .btn-p,.btn-s{text-align:center}
        }
      `}</style>
          

      <div id="cl-cursor" ref={cursorRef} />

      {/* NAV */}
      {/* <nav>
        <a href="#" className="logo">VISION<span>9</span></a>
        <span className="nav-tag">Clients &amp; Work</span>
      </nav> */}
          <Header/>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="grid-bg" />
        <p className="hero-kicker">Trusted by brands across industries</p>
       <div> <h1 className="hero-title">
          <span className="tl">CLIENTS</span>
          <span className="tl">WE'VE</span>
          <span className="tl">WORKED WITH</span>
        </h1>
        <p className="hero-sub">Strategic marketing, branding, performance campaigns, and content execution—aligned with business goals. We work as an extended partner.</p>
</div>
        <div className="stats-strip">
          {[{t:"500",l:"Million+ Views"},{t:"350",l:"Campaigns Executed"},{t:"1000",l:"Influencer Network"},{t:"28",l:"Brands Served"},{t:"30",l:"Active Clients"}].map((s,i)=>(
            <div key={i} className="stat">
              <span className="stat-num" data-target={s.t}>0</span>
              <span className="stat-lbl">{s.l}</span>
            </div>
          ))}
        </div>

        <div className="ticker-bar">
          <div className="ticker-track">
            {[...tickerItems,...tickerItems].map((t,i)=>(
              <span key={i} className="tick-item">{t}<span className="tick-dot"/></span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES ══ */}
      <section className="industries">
        <span className="sec-label reveal">01 — Industries</span>
        <h2 className="sec-title reveal rd1">We speak every <em>industry's</em> language</h2>

        <div className="ind-marquee-wrap reveal rd2">
          <div className="ind-row row-r">
            {[...industries1,...industries1].map((n,i)=>(
              <span key={i} className="ind-pill"><span className="dot"/>{n}</span>
            ))}
          </div>
        </div>

        <div className="ind-marquee-wrap reveal rd3">
          <div className="ind-row row-l">
            {[...industries2,...industries2].map((n,i)=>(
              <span key={i} className="ind-pill"><span className="dot"/>{n}</span>
            ))}
          </div>
        </div>

        <div className="ind-marquee-wrap reveal rd4">
          <div className="ind-row row-r2">
            {[...industries3,...industries3].map((n,i)=>(
              <span key={i} className="ind-pill"><span className="dot"/>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section className="exp-section">
        <div className="exp-left">
          <span className="sec-label reveal">02 — Founders' Experience</span>
          <h2 className="sec-title reveal rd1" style={{marginBottom:"1.5rem"}}>Experience that goes <em>beyond</em> one agency</h2>
          <p className="exp-body reveal rd2">The founders bring extensive hands-on experience from managing and contributing to multiple brand pages, campaigns, and digital properties across industries — through freelance, consulting, and collaborative roles.</p>
          <div className="exp-areas">
            <div className="exp-area"><span className="ea-num">01</span><span className="ea-txt">Managing and scaling brand pages across platforms</span></div>
            <div className="exp-area"><span className="ea-num">02</span><span className="ea-txt">Executing performance marketing campaigns</span></div>
            <div className="exp-area"><span className="ea-num">03</span><span className="ea-txt">Developing content and UGC strategies</span></div>
            <div className="exp-area"><span className="ea-num">04</span><span className="ea-txt">Supporting branding, communication, and digital presence</span></div>
          </div>
        </div>

        <div>
          <span className="sec-label reveal">Experience Snapshot</span>
          <div className="count-grid reveal rd1">
            {[{t:"500",l:"Million+ Views Generated"},{t:"350",l:"Campaigns Executed"},{t:"1000",l:"Influencers · Pan-India"},{t:"20000",l:"Social Pages Reach"},{t:"28",l:"Brands Served"},{t:"30",l:"Active Clients"}].map((c,i)=>(
              <div key={i} className="count-cell">
                <span className="count-val" data-target={c.t}>0</span>
                <span className="count-lbl">{c.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="testi-section">
        <span className="sec-label reveal">03 — Testimonials</span>
        <h2 className="sec-title reveal rd1">Straight from the <em>brands</em> we've built</h2>
        <div className="drag-hint reveal rd2">
          <span className="drag-line"/><span>Drag to explore</span>
        </div>
        <div className="testi-outer">
          <div className="testi-track" ref={trackRef}>
            {testimonials.map((t,i)=>(
              <div key={i} className="testi-card">
                <p className="testi-quote">{t.quote}</p>
                <div className="testi-divider"/>
                <div className="testi-name">{t.name}</div>
                <span className="testi-role">{t.role}</span>
              </div>
            ))}
          </div>
          <div className="testi-progress"><div className="testi-fill" ref={fillRef}/></div>
        </div>
      </section>

      {/* ══ CLIENT LOGOS ══ */}
      <section className="logos-section">
        <span className="sec-label reveal">04 — Our Clients</span>
        <h2 className="sec-title reveal rd1">Brands that <em>trust</em> Vision9</h2>
        <div className="logos-grid reveal rd2">
          {logoClients.map((name,i)=>(
            <div key={i} className="logo-cell"><span>{name}</span></div>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section">
        <div className="cta-bg">VISION9</div>
        <p className="cta-eyebrow reveal">Ready to join them?</p>
        <h2 className="cta-h reveal rd1">Let's Build Brands That <em>Perform</em></h2>
        <p className="cta-sub reveal rd2">Partner with Vision9 to move from ideas to execution — and from execution to measurable growth.</p>
        <div className="cta-btns reveal rd3">
          <a href="#" className="btn-p">BOOK A STRATEGY CALL</a>
          <a href="#" className="btn-s">CONTACT US</a>
        </div>
      </section>
    </>
  )
}