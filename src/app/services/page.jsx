"use client";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";

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
  svc1Bg: "#231f1f", svc1Text: "#ebe60c",
  svc2Bg: "#a6a216", svc2Text: "#fffee9",
  svc3Bg: "#fffee9", svc3Text: "#231f1f",
  svc4Bg: "#737017", svc4Text: "#fffee9",
  svc5Bg: "#d2ce12", svc5Text: "#231f1f",
  svc6Bg: "#3f3c15", svc6Text: "#ebe60c",
};

// const SERVICE_DATA = {
//   BRANDING: {
//     title: "Branding & Brand Strategy",
//     description: "We build strong, consistent, and scalable brand identities.",
//     points: ["Visual branding & brand aesthetics","Brand messaging & positioning","Brand identity design","Visual language & brand systems","Packaging design"],
//     image: "/asset/services/serv_branding.png",
//   },
//   "SOCIAL MEDIA": {
//     title: "Social Media Marketing",
//     description: "Strategic social media designed for growth, engagement, and authority.",
//     points: ["Content creation across platforms","Content strategy & storytelling","Profile optimization","Content planning & scheduling","Engagement-driven campaigns"],
//     image: "/asset/services/serv_socialMedia.png",
//   },
//   COMMUNITY: {
//     title: "Community Building",
//     description: "We help brands create loyal, engaged communities that support long-term growth.",
//     points: ["Community engagement strategies","Moderation & interaction management","Influencer & creator collaborations","Brand-led engagement initiatives","Community growth & retention"],
//     image: "/asset/services/serv_community.png",
//   },
//   PERFORMANCE: {
//     title: "Performance Marketing",
//     description: "ROI-focused paid marketing campaigns built to scale.",
//     points: ["Meta Ads management","Google Ads management","Ad creative strategy","Marketing analytics & reporting","A/B testing & budget optimization"],
//     image: "/asset/services/serv_performance.png",
//   },
//   VIDEO: {
//     title: "Video & Content Production",
//     description: "High-impact content built for virality, storytelling, and performance.",
//     points: ["Reels & short-form video production","Brand films & story videos","Performance-focused ad creatives","Editing & post-production","UGC content creation"],
//     image: "/asset/services/serv_video.png",
//   },
//   PODCAST: {
//     title: "Podcast Production",
//     description: "Authority-building content for brands and leaders.",
//     points: ["Podcast concept & format strategy","Recording & production support","Audio editing & post-production","Distribution guidance","Content repurposing for social media"],
//     image: "/asset/services/serv_podcast.png",
//   },
//   INFLUENCER: {
//     title: "Influencer & UGC Content",
//     description: "Authentic content that builds trust, drives attention, and influences decisions.",
//     points: ["Influencer campaign strategy & execution","UGC sourcing & creator collaborations","Brand-aligned short-form video content","Product and service storytelling","Performance tracking & optimization"],
//     image: "/asset/services/serv_influencer.png",
//   },
//   WEBSITE: {
//     title: "Web, SEO & Digital Presence Optimization",
//     description: "Capability to handle large-scale development workloads of up to 13,000 hours. We build and optimize digital assets that convert and rank.",
//     points: ["Website & landing page design","SEO fundamentals & on-page optimization","Blog & content SEO structuring","Google Business & profile optimization","Analytics, tracking & performance setup"],
//     image: "/asset/services/serv_webSeo.png",
//   },
//   LOGO: {
//     title: "Logo Design",
//     description: "Timeless marks that communicate brand essence at a glance.",
//     points: ["Primary & secondary logo systems","Icon & symbol design","Typography & colour system","Usage guidelines & brand manual","File formats for all media"],
//     image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
//   },
//   PACKAGING: {
//     title: "Packaging Design",
//     description: "Shelf-stopping packaging that sells before a word is read.",
//     points: ["Structural & surface design","Material & print consultation","Brand-consistent aesthetics","Dielines & production-ready files","Retail & e-commerce variants"],
//     image: "/asset/services/serv_.png",
//   },
//   "BRAND IDENTITY": {
//     title: "Brand Identity Systems",
//     description: "Cohesive identity systems that scale across every touchpoint.",
//     points: ["Complete visual identity creation","Typography & colour systems","Brand guidelines & standards","Stationery & collateral design","Digital & print asset libraries"],
//     image: "/asset/services/serv_branding.png",
//   },
//   DESIGNING: {
//     title: "Designing & Offline Creatives",
//     description: "Complete in-house design, printing, and on-ground branding execution.",
//     points: ["Banners & posters","Auto & bus branding creatives","Standees & display materials","OPD materials, prescription pads & IDs","Pamphlets & brochures","Flyers & promotional creatives"],
//     image: "/asset/services/serv_designing.png",
//   },
//   COPYWRITING: {
//     title: "Copywriting & Content Writing",
//     description: "Strategic writing that informs, engages, and converts.",
//     points: ["Ad & promotional copywriting","Website copywriting","Blog writing & SEO content","Scriptwriting","Press releases"],
//     image: "/asset/services/serv_copywriting.png",
//   },
//   "E-COMMERCE": {
//     title: "E-Commerce",
//     description: "End-to-end strategies built to drive sales, retention, and scalable growth.",
//     points: ["Product listing optimization","Performance ads for marketplaces & D2C","Retention & remarketing strategies","Analytics, tracking & revenue optimization"],
//     image: "/asset/services/serv_ecom.png",
//   },
//   PR: {
//     title: "Public Relations (PR)",
//     description: "Vision9 is proud to be associated with 5000+ publication offers across international and national media platforms.",
//     points: ["Brand storytelling & narrative building","On-air live interviews & magazine features","Newspaper and digital news website coverage","Reputation management","Strategic brand positioning and thought-leadership visibility"],
//     image: "/asset/services/serv_pr.png",
//   },
//   HR: {
//     title: "HR Operations & Business Consultations",
//     description: "We support internal growth systems that strengthen teams and culture.",
//     points: ["HR marketing & hiring creatives","Internal communication design","Training & onboarding creatives","Operational branding support"],
//     image: "/asset/services/serv_hrOperation.png",
//   },
// };
const SERVICE_DATA = {
  BRANDING: {
    title: "BRANDING & BRAND STRATEGY",
    description: "We build strong, consistent, and scalable brand identities.",
    points: [
      "Visual branding & brand aesthetics",
      "Brand messaging & positioning",
      "Brand identity design",
      "Visual language & brand systems",
      "Packaging design",
    ],
    image: "/asset/services/serv_branding.png",
  },

  "SOCIAL MEDIA": {
    title: "SOCIAL MEDIA MARKETING",
    description: "Strategic social media designed for growth, engagement, and authority.",
    points: [
      "Content creation across platforms",
      "Content strategy & storytelling",
      "Profile optimization",
      "Content planning & scheduling",
      "Engagement-driven campaigns",
    ],
    image: "/asset/services/serv_social.png",
  },

  COMMUNITY: {
    title: "COMMUNITY BUILDING",
    description: "We help brands create loyal, engaged communities that support long-term growth.",
    points: [
      "Community engagement strategies",
      "Moderation & interaction management",
      "Influencer & creator collaborations",
      "Brand-led engagement initiatives",
      "Community growth & retention",
    ],
    image: "/asset/services/serv_community.png",
  },

  PERFORMANCE: {
    title: "PERFORMANCE MARKETING",
    description: "ROI-focused paid marketing campaigns built to scale.",
    points: [
      "Meta Ads management",
      "Google Ads management",
      "Ad creative strategy",
      "Marketing analytics & reporting",
      "A/B testing & budget optimization",
    ],
    image: "/asset/services/serv_performance.png",
  },

  VIDEO: {
    title: "VIDEO & CONTENT PRODUCTION",
    description: "High impact content built for virality, storytelling, and performance.",
    points: [
      "Reels & short-form video production",
      "Brand films & story videos",
      "Performance-focused ad creatives",
      "Editing & post-production",
      "UGC content creation",
    ],
    image: "/asset/services/serv_videoContent.png",
  },

  PODCAST: {
    title: "PODCAST PRODUCTION",
    description: "Authority-building content for brands and leaders.",
    points: [
      "Podcast concept & format strategy",
      "Recording & production support",
      "Audio editing & post-production",
      "Distribution guidance",
      "Content repurposing for social media",
    ],
    image: "/asset/services/serv_podcast.png",
  },

  HR: {
    title: "HR OPERATIONS & BUSINESS CONSULTATIONS",
    description: "We support internal growth systems that strengthen teams and culture.",
    points: [
      "HR marketing & hiring creatives",
      "Internal communication design",
      "Training & onboarding creatives",
      "Operational branding support",
    ],
    image: "/asset/services/serv_hrOperation.png",
  },

  COPYWRITING: {
    title: "COPYWRITING & CONTENT WRITING",
    description: "Strategic writing that informs, engages, and converts.",
    points: [
      "Ad & promotional copywriting",
      "Website copywriting",
      "Blog writing & SEO content",
      "Scriptwriting",
      "Press releases",
    ],
    image: "/asset/services/serv_copywriting.png",
  },

  INFLUENCER: {
    title: "INFLUENCER & UGC CONTENT",
    description: "Authentic content that builds trust, drives attention, and influences decisions.",
    points: [
      "Influencer campaign strategy & execution",
      "UGC sourcing & creator collaborations",
      "Brand-aligned short-form video content",
      "Product and service storytelling",
      "Performance tracking & optimization",
    ],
    image: "/asset/services/serv_influencer.png",
  },

  WEBSITE: {
    title: "WEB, SEO & DIGITAL PRESENCE OPTIMIZATION",
    description: "Capability to handle large-scale development workloads of up to 13,000 hours. We build and optimize digital assets that convert and rank.",
    points: [
      "Website & landing page design",
      "SEO fundamentals & on-page optimization",
      "Blog & content SEO structuring",
      "Google Business & profile optimization",
      "Analytics, tracking & performance setup",
    ],
    image: "/asset/services/serv_webSeo.png",
  },

  DESIGNING: {
    title: "DESIGNING & OFFLINE CREATIVES",
    description: "Complete in-house design, printing, and on-ground branding execution.",
    points: [
      "Banners & posters",
      "Auto & bus branding creatives",
      "Standees & display materials",
      "OPD materials, prescription pads & IDs",
      "Pamphlets & brochures",
      "Flyers & promotional creatives",
    ],
    image: "/asset/services/serv_designing.png",
  },

  "E-COMMERCE": {
    title: "E-COMMERCE",
    description: "End-to-end strategies built to drive sales, retention, and scalable growth.",
    points: [
      "Product listing optimization",
      "Performance ads for marketplaces & D2C",
      "Retention & remarketing strategies",
      "Analytics, tracking & revenue optimization",
    ],
    image: "/asset/services/serv_ecom.png",
  },

  PR: {
    title: "PUBLIC RELATIONS (PR)",
    description: "Vision9 is proud to be associated with 5000+ publication offers across international and national media platforms.",
    points: [
      "Brand storytelling & narrative building",
      "On-air live interviews & magazine features",
      "Newspaper and digital news website coverage",
      "Reputation management",
      "Strategic brand positioning and thought-leadership visibility",
    ],
    image: "/asset/services/serv_pr.png",
  },
};
const LABEL_MAP = {
  BRANDING: "BRANDING", SOCIAL: "SOCIAL MEDIA", COMMUNITY: "COMMUNITY",
  PERFORMANCE: "PERFORMANCE", VIDEO: "VIDEO", PODCAST: "PODCAST",
  INFLUENCER: "INFLUENCER", WEBSITE: "WEBSITE", LOGO: "LOGO",
  PACKAGING: "PACKAGING", BRAND: "BRAND IDENTITY", DESIGNING: "DESIGNING",
  COPYWRITING: "COPYWRITING", "E-COMMERCE": "E-COMMERCE", PR: "PR", HR: "HR", PITCH: null,
};

function resolveKey(label) {
  if (!label) return null;
  const first = label.split("\n")[0].split(" ")[0];
  return LABEL_MAP[first] ?? null;
}

const vCss = (t) => [
  `--accent:${t.accent}`,`--accent-l:${t.accentLight}`,`--accent-m:${t.accentMid}`,`--accent-d:${t.accentDark}`,
  `--bg:${t.pageBg}`,`--bg-alt:${t.pageBgAlt}`,`--card:${t.cardBg}`,`--nav-bg:${t.navBg}`,
  `--text:${t.textPrimary}`,`--text-sec:${t.textSecondary}`,`--muted:${t.textMuted}`,
  `--border:${t.border}`,`--border-f:${t.borderFaint}`,
].join(";");

const buildCards = (t) => [
  [
    {
      id: "branding",
      label: "BRANDING",
      bg: t.svc1Bg,
      color: t.svc1Text,
      tall: true,
      service: SERVICE_DATA["BRANDING"],
    },
    {
      id: "social-media",
      label: "SOCIAL MEDIA",
      bg: t.svc2Bg,
      color: t.svc2Text,
      tall: true,
      service: SERVICE_DATA["SOCIAL MEDIA"],
    },
    {
      id: "logo-design",
      label: "LOGO\nDESIGN",
      bg: t.svc6Bg,
      color: t.svc6Text,
      tall: false,
      service: SERVICE_DATA["LOGO"],
    },
    {
      id: "influencer",
      label: "INFLUENCER\nMARKETING",
      bg: t.svc4Bg,
      color: t.svc4Text,
      tall: true,
      service: SERVICE_DATA["INFLUENCER"],
    },
    {
      id: "packaging",
      label: "PACKAGING\nDESIGN",
      bg: t.svc5Bg,
      color: t.svc5Text,
      tall: false,
      service: SERVICE_DATA["PACKAGING"],
    },
    {
      id: "performance",
      label: "PERFORMANCE\nMARKETING",
      bg: t.svc1Bg,
      color: t.svc1Text,
      tall: true,
      service: SERVICE_DATA["PERFORMANCE"],
    },
  ],

  [
    {
      id: "brand-identity",
      label: "BRAND\nIDENTITY",
      bg: t.svc4Bg,
      color: t.svc4Text,
      tall: true,
      service: SERVICE_DATA["BRAND IDENTITY"],
    },
    {
      id: "video",
      label: "VIDEO\nPRODUCTION",
      bg: t.svc3Bg,
      color: t.svc3Text,
      tall: false,
      service: SERVICE_DATA["VIDEO"],
    },
    {
      id: "community",
      label: "COMMUNITY",
      bg: t.svc1Bg,
      color: t.svc1Text,
      tall: true,
      service: SERVICE_DATA["COMMUNITY"],
    },
    {
      id: "podcast",
      label: "PODCAST",
      bg: t.svc2Bg,
      color: t.svc2Text,
      tall: false,
      service: SERVICE_DATA["PODCAST"],
    },
    {
      id: "website",
      label: "WEBSITE\nDESIGN",
      bg: t.svc6Bg,
      color: t.svc6Text,
      tall: true,
      service: SERVICE_DATA["WEBSITE"],
    },
    {
      id: "copywriting",
      label: "COPYWRITING",
      bg: t.svc4Bg,
      color: t.svc4Text,
      tall: false,
      service: SERVICE_DATA["COPYWRITING"],
    },
  ],

  [
    {
      id: "designing",
      label: "DESIGNING",
      bg: t.svc2Bg,
      color: t.svc2Text,
      tall: true,
      service: SERVICE_DATA["DESIGNING"],
    },
    {
      id: "ecommerce",
      label: "E-COMMERCE",
      bg: t.svc5Bg,
      color: t.svc5Text,
      tall: false,
      service: SERVICE_DATA["E-COMMERCE"],
    },
    {
      id: "pr",
      label: "PR",
      bg: t.svc1Bg,
      color: t.svc1Text,
      tall: true,
      service: SERVICE_DATA["PR"],
    },
    {
      id: "hr",
      label: "HR",
      bg: t.svc3Bg,
      color: t.svc3Text,
      tall: false,
      service: SERVICE_DATA["HR"],
    },
  ],
];

const GAP = 4;
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

// ── POPUP — image left, content right (stacks vertically on mobile) ──
function ServicePopup({ serviceKey, onClose }) {
  const data = serviceKey ? SERVICE_DATA[serviceKey] : null;
  const [vis, setVis] = useState(false);
  const [isMobilePopup, setIsMobilePopup] = useState(false);

  useEffect(() => {
    const check = () => setIsMobilePopup(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (data) requestAnimationFrame(() => setVis(true));
    else setVis(false);
  }, [data]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!data) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:400,
        background:"rgba(0,0,0,0.58)",
        backdropFilter:"blur(10px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"1rem",
        opacity: vis ? 1 : 0,
        transition:"opacity 0.28s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background:"#fffee9",
          /* wide on desktop so image+text sit side by side */
          width: isMobilePopup ? "min(95vw,440px)" : "min(820px,92vw)",
          maxHeight:"88vh",
          position:"relative",
          display:"flex",
          flexDirection: isMobilePopup ? "column" : "row",
          overflow:"hidden",
          transform: vis ? "translateY(0) scale(1)" : "translateY(18px) scale(0.96)",
          opacity: vis ? 1 : 0,
          transition:"transform 0.32s cubic-bezier(.16,1,.3,1), opacity 0.28s ease",
        }}
      >
        {/* ✕ Close */}
        <button onClick={onClose} style={{
          position:"absolute", top:10, right:10, zIndex:20,
          background:"rgba(0,0,0,0.72)", border:"none", color:"#fff",
          width:28, height:28, cursor:"pointer", fontSize:15,
          display:"flex", alignItems:"center", justifyContent:"center",
          flexShrink:0,
        }}>×</button>

        {/* ── LEFT: square-ish image ── */}
        <div style={{
          width: isMobilePopup ? "100%" : "42%",
          height: isMobilePopup ? 200 : "auto",
          flexShrink:0,
          position:"relative",
          overflow:"hidden",
        }}>
          <img
            src={data.image} alt={data.title}
            style={{
              width:"100%", height:"100%",
              objectFit:"contain",
              display:"block",
            }}
          />
          {/* subtle dark vignette on right edge (desktop) / bottom edge (mobile) */}
          <div style={{
            position:"absolute", inset:0,
            background: isMobilePopup
              ? "linear-gradient(to top, rgba(35,31,31,0.55) 0%, transparent 60%)"
              : "linear-gradient(to right, transparent 60%, rgba(255,252,233,0.18) 100%)",
            pointerEvents:"none",
          }}/>
        </div>

        {/* ── RIGHT: title + description + points ── */}
        <div style={{
          flex:1,
          overflowY:"auto",
          padding: isMobilePopup ? "1.2rem 1.2rem 1.4rem" : "1.6rem 1.8rem 1.6rem 1.4rem",
          display:"flex", flexDirection:"column", gap:"1rem",
          scrollbarWidth:"none",
        }}>
          <style>{`div::-webkit-scrollbar{display:none}`}</style>

          {/* Title */}
          <h2 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(1.05rem,2.4vw,1.45rem)",
            fontWeight:700, lineHeight:1.18,
            color:"#231f1f", letterSpacing:"-0.01em",
            paddingRight:"1.8rem", /* avoid overlap with × */
          }}>{data.title}</h2>

          {/* Gold rule */}
          <div style={{height:1, background:`linear-gradient(90deg,${THEME.accent},transparent)`, flexShrink:0}}/>

          {/* Description */}
          <p style={{
            fontFamily:"'DM Sans',sans-serif",
            fontSize:"clamp(.78rem,1.1vw,.88rem)",
            lineHeight:1.72, color:"#58564d", fontWeight:300,
            borderLeft:`2px solid ${THEME.accent}`,
            paddingLeft:".75rem",
            margin:0,
          }}>{data.description}</p>

          {/* Includes label */}
          <div style={{
            fontFamily:"'Tenor Sans',sans-serif",
            fontSize:".48rem", letterSpacing:".25em",
            textTransform:"uppercase", color:THEME.accent,
            display:"flex", alignItems:"center", gap:".45rem",
          }}>
            <span style={{width:14,height:1,background:THEME.accent,display:"inline-block"}}/>
            Includes
            <span style={{width:14,height:1,background:THEME.accent,display:"inline-block"}}/>
          </div>

          {/* Points */}
          <div style={{display:"flex", flexDirection:"column", gap:".35rem"}}>
            {data.points.map((pt, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"flex-start", gap:".5rem",
                padding:".45rem .72rem",
                background:"#fff",
                border:"1px solid rgba(115,112,23,0.11)",
              }}>
                <span style={{color:THEME.accent,fontSize:".45rem",marginTop:".28rem",flexShrink:0,fontWeight:700}}>◆</span>
                <span style={{
                  fontFamily:"'DM Sans',sans-serif",
                  fontSize:"clamp(.72rem,.95vw,.82rem)",
                  color:"#3f3c15", lineHeight:1.48, fontWeight:300,
                }}>{pt}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{marginTop:"auto", paddingTop:".6rem", display:"flex", justifyContent:"flex-end"}}>
            <a href="/contact" style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:".75rem", fontWeight:700,
              letterSpacing:".13em", textTransform:"uppercase",
              color:"#fffee9", background:THEME.accent,
              padding:".65rem 1.6rem",
              textDecoration:"none", display:"inline-block",
              transition:"background .25s",
            }}
            onMouseOver={e=>e.currentTarget.style.background=THEME.accentMid}
            onMouseOut={e=>e.currentTarget.style.background=THEME.accent}
            >Get Started →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SINGLE CARD — image fills top, title + button sit below in a solid strip ──
function RailCard({ s, isActive, svcData, direction, onHover, onCardClick, onOpenPopup }) {
  const [hovered, setHovered] = useState(false);
  const isHoriz = direction === "left" || direction === "right";
const isPaused = useRef(false);
  // For empty cards keep the simple coloured block
  if (!s.label) {
    return (
      <div
        data-label=""
        style={{
          background: s.bg,
          ...(isHoriz
            ? { aspectRatio: s.tall ? "3/4" : "4/3", height:"100%" }
            : { aspectRatio: s.tall ? "4/5" : "5/3" }),
          flexShrink:0,
          borderTop: !isHoriz ? "1px solid rgba(0,0,0,0.06)" : "none",
          borderLeft: isHoriz ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      />
    );
  }

  return (
    <div
      data-label={s.label}
     onMouseEnter={() => { onHover?.(s.label); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: s.bg,
        ...(isHoriz
          ? { aspectRatio: s.tall ? "3/4" : "4/3", height:"100%" }
          : { aspectRatio: s.tall ? "4/5" : "5/3" }),
        flexShrink:0,
        position:"relative",
        overflow:"hidden",
        cursor:"pointer",
        transition:"transform 0.3s, box-shadow 0.3s",
        transform: isActive ? "scale(1.02)" : "scale(1)",
        boxShadow: isActive ? "0 12px 28px rgba(0,0,0,0.28)" : "none",
        zIndex: isActive ? 10 : 1,
        borderTop: !isHoriz ? "1px solid rgba(0,0,0,0.06)" : "none",
        borderLeft: isHoriz ? "1px solid rgba(0,0,0,0.06)" : "none",
        display:"flex",
        flexDirection:"column",
      }}
      onClick={() => onCardClick?.(s.label)}
    >
      {/* ── IMAGE fills the upper portion — no filter, no overlay ── */}
      <div style={{ flex:1, overflow:"hidden", position:"relative", minHeight:0 }}>
        {svcData ? (
          <img
            src={svcData.image}
            alt={s.label}
            style={{
              width:"100%", height:"100%",
              objectFit:"contain",
              display:"block",
              transition:"transform 0.45s ease",
              transform: hovered || isActive ? "scale(1.06)" : "scale(1)",
            }}
          />
        ) : (
          /* No image: show coloured fill */
          <div style={{width:"100%",height:"100%",background:s.bg}}/>
        )}
      </div>

      {/* ── TEXT STRIP below the image — solid card background colour ── */}
      <div style={{
        background: s.bg,
        padding:"clamp(.45rem,1.2vw,.85rem) clamp(.5rem,1.3vw,.9rem)",
        display:"flex",
        flexDirection:"column",
        gap:".32rem",
        flexShrink:0,
        borderTop:`1px solid rgba(255,255,255,0.08)`,
      }}>
        {/* Title */}
        <span style={{
          fontFamily:"'Playfair Display',serif",
          fontWeight:700,
          fontSize:"clamp(0.58rem,2.4vw,1.15rem)",
          letterSpacing:".02em",
          lineHeight:1.1,
          whiteSpace:"pre-line",
          color:s.color,
          userSelect:"none",
          textTransform:"uppercase",
          wordBreak:"break-word",
          display:"block",
        }}>{s.label}</span>

        {/* View Details button */}
        <button
          onClick={(e) => { e.stopPropagation(); onOpenPopup?.(s.label); }}
          style={{
            alignSelf:"flex-start",
            fontFamily:"'Tenor Sans',sans-serif",
            fontSize:"clamp(.38rem,.85vw,.52rem)",
            letterSpacing:".16em",
            textTransform:"uppercase",
            color:"#231f1f",
            background: THEME.accentLight,
            border:"none",
            cursor:"pointer",
            padding:".28rem .62rem",
            display:"flex",
            alignItems:"center",
            gap:".28rem",
            fontWeight:600,
            transition:"background 0.22s",
            whiteSpace:"nowrap",
          }}
          onMouseOver={e=>e.currentTarget.style.background=THEME.accentMid}
          onMouseOut={e=>e.currentTarget.style.background=THEME.accentLight}
        >
          View Details <span style={{fontSize:".65em",lineHeight:1}}>→</span>
        </button>
      </div>
    </div>
  );
}

// ── VERTICAL RAIL ──
function VerticalRail({
  cards,
  direction,
  offset = 0,
  speed = 0.5,
  onHover,
  onCardClick,
  onOpenPopup,
  activeLabel,
  pauseUntil,
  isMobile,
}) {
  const ref = useRef(null);
  const pos = useRef(offset);
  const loop = useRef(0);
  const rafRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // calculate height
    let h = 0;
    for (let i = 0; i < cards.length; i++) {
      h += el.children[i]?.getBoundingClientRect().height ?? 0;
    }
    h += GAP * (cards.length - 1);
    loop.current = h;

    const tick = () => {
      const now = Date.now();

      if (!isPaused.current && now > pauseUntil && !isMobile) {
        direction === "up"
          ? (pos.current -= speed)
          : (pos.current += speed);

        if (direction === "up" && pos.current <= -loop.current) {
          pos.current += loop.current;
        }
        if (direction === "down" && pos.current >= 0) {
          pos.current -= loop.current;
        }

        if (ref.current) {
          ref.current.style.transform = `translateY(${pos.current}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    // start animation only if desktop
    if (!isMobile) {
      rafRef.current = requestAnimationFrame(tick);
    }

    // ✅ CLEANUP (VERY IMPORTANT)
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed, pauseUntil, isMobile]); // ✅ correct deps

  return (
    <div
      ref={ref}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        gap: GAP,
        willChange: "transform",
        transform: `translateY(${pos.current}px)`,
      }}
    >
      {[...cards, ...cards, ...cards].map((s, i) => {
        const key = resolveKey(s.label);
        const svcData = key ? SERVICE_DATA[key] : null;

        const isActive =
          !!s.label &&
          !!activeLabel &&
          s.label.split(" ")[0] === activeLabel.split(" ")[0];

        return (
          <RailCard
            key={`${s.id}-${i}`}
            s={s}
            isActive={isActive}
            svcData={svcData}
            direction={direction}
            onHover={onHover}
            onCardClick={onCardClick}
            onOpenPopup={onOpenPopup}
          />
        );
      })}
    </div>
  );
}

// ── HORIZONTAL RAIL ──
function HorizontalRail({
  cards,
  direction,
  offset = 0,
  speed = 0.5,
  onHover,
  onCardClick,
  onOpenPopup,
  activeLabel,
  pauseUntil,
  isMobile,
}) {
  const ref = useRef(null);
  const pos = useRef(offset);
  const loop = useRef(0);
  const rafRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // calculate total width
    let w = 0;
    for (let i = 0; i < cards.length; i++) {
      w += el.children[i]?.getBoundingClientRect().width ?? 0;
    }
    w += GAP * (cards.length - 1);
    loop.current = w;

    const tick = () => {
      const now = Date.now();

      if (!isPaused.current && now > pauseUntil && !isMobile) {
        direction === "left"
          ? (pos.current -= speed)
          : (pos.current += speed);

        if (direction === "left" && pos.current <= -loop.current) {
          pos.current += loop.current;
        }
        if (direction === "right" && pos.current >= 0) {
          pos.current -= loop.current;
        }

        if (ref.current) {
          ref.current.style.transform = `translateX(${pos.current}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    // start animation only if not mobile
    if (!isMobile) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed, pauseUntil, isMobile]); // ✅ IMPORTANT

  return (
    <div
      ref={ref}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        gap: GAP,
        willChange: "transform",
        transform: `translateX(${pos.current}px)`,
      }}
    >
      {[...cards, ...cards, ...cards].map((s, i) => {
        const key = resolveKey(s.label);
        const svcData = key ? SERVICE_DATA[key] : null;

        const isActive =
          !!s.label &&
          !!activeLabel &&
          s.label.split(" ")[0] === activeLabel.split(" ")[0];

        return (
          <RailCard
            key={`${s.id}-${i}`}
            s={s}
            isActive={isActive}
            svcData={svcData}
            direction={direction}
            onHover={onHover}
            onCardClick={onCardClick}
            onOpenPopup={onOpenPopup}
          />
        );
      })}
    </div>
  );
}

// ── PAGE ──
export default function ServicesPage() {
  const [active, setActive] = useState("BRANDING");
  const [pauseUntil, setPauseUntil] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [popupKey, setPopupKey] = useState(null);
  const titleRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    const ro = new ResizeObserver(() => {
      const container = titleRef.current?.parentElement;
      if (!container) return;
      const w = container.clientWidth;
      const len = active.length;
      const base = w * 0.12;
      const factor = Math.max(0.5, 1 - len * 0.02);
      const fs = Math.min(Math.max(base * factor, isMobile ? 24 : 32), isMobile ? 48 : 80);
      titleRef.current.style.fontSize = `${fs}px`;
    });
    if (titleRef.current?.parentElement) ro.observe(titleRef.current.parentElement);
    if (titleRef.current) ro.observe(titleRef.current);
    return () => ro.disconnect();
  }, [active, isMobile]);

  const [COL1, COL2] = buildCards(THEME);

  const handleCardClick = (label) => {
    setActive(label);
    setActiveId(label);
  };

  const handleOpenPopup = (label) => {
    const key = resolveKey(label);
    if (key) setPopupKey(key);
  };

  const allServices = [...new Set([...COL1,...COL2].filter(c=>c.label).map(c=>c.label.replace(/\n/g," ")))];

  return (
    <>
      <style>{`
        ${FONTS}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{${vCss(THEME)}}
        html,body{width:100%;min-height:100%;overflow-x:hidden;overflow-y:auto;background:var(--bg)}
        @keyframes fadeTitle{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {popupKey && <ServicePopup serviceKey={popupKey} onClose={() => setPopupKey(null)} />}

      <Header />

      <div style={{display:"flex",width:"100vw",height:"100vh",overflow:"auto",background:"var(--bg)",flexDirection:isMobile?"column":"row"}}>

        {/* ── LEFT PANEL ── */}
        <div style={{
          width:isMobile?"100%":"clamp(0px,38%,420px)",
          height:isMobile?"auto":"100%",
          flexShrink:0, display:"flex", flexDirection:"column", justifyContent:"center",
          padding:isMobile?"2rem 5vw 1rem":"0 5vw",
          background:"var(--bg)", zIndex:20,
          borderRight:isMobile?"none":`1px solid var(--border)`,
          borderBottom:isMobile?`1px solid var(--border)`:"none",
          position:"relative",
        }}>
          {!isMobile && [{t:24,l:24,bTop:true,bLeft:true},{t:24,r:0,bTop:true,bRight:true},{b:24,l:24,bBottom:true,bLeft:true},{b:24,r:0,bBottom:true,bRight:true}].map((c,i)=>(
            <div key={i} style={{position:"absolute",top:c.t,bottom:c.b,left:c.l,right:c.r,width:28,height:28,opacity:0.45,
              borderTop:c.bTop?`1px solid var(--accent)`:"none",borderBottom:c.bBottom?`1px solid var(--accent)`:"none",
              borderLeft:c.bLeft?`1px solid var(--accent)`:"none",borderRight:c.bRight?`1px solid var(--accent)`:"none"}}/>
          ))}

          <p style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:"clamp(.5rem,.9vw,.65rem)",letterSpacing:".3em",textTransform:"uppercase",color:"var(--muted)",marginBottom:isMobile?"0.5rem":"1rem"}}>✦ What We Do ✦</p>

          <div style={{width:"100%"}}>
            <h1 ref={titleRef} style={{fontFamily:"'Playfair Display',serif",fontWeight:900,lineHeight:0.9,letterSpacing:"-.01em",color:"var(--text)",animation:"fadeTitle .4s ease",wordBreak:"break-word",width:"100%",display:"block",transition:"font-size 0.2s ease"}}>
              {active.replace(/\n/g," ")}
            </h1>
          </div>

          <div style={{marginTop:isMobile?"0.8rem":"1.4rem",display:"flex",alignItems:"center",gap:8}}>
            <div style={{flex:1,height:1,background:`linear-gradient(90deg,var(--accent),transparent)`}}/>
            <span style={{color:"var(--accent)",fontSize:10}}>◆</span>
          </div>

          <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"clamp(.72rem,1.1vw,.88rem)",color:"var(--muted)",marginTop:".8rem",lineHeight:1.65}}>
            {isMobile?"Tap a card to explore services":"Hover a card · click View Details"}
          </p>

          <div style={{marginTop:isMobile?"1rem":"1.8rem",display:"flex",flexDirection:isMobile?"row":"column",gap:isMobile?"0.75rem":".25rem",overflowX:isMobile?"auto":"visible",paddingBottom:isMobile?"0.5rem":0,WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none"}}>
            {allServices.map((s,i)=>{
              const isActive=s.split(" ")[0]===active.split(" ")[0];
              return (
                <div key={i} onClick={() => {
  setActive(s);
  setActiveId(s);

  const now = Date.now();
  setPauseUntil(now + 7000); // pause 7 sec
}} style={{fontFamily:"'Tenor Sans',sans-serif",fontSize:"clamp(.52rem,.78vw,.66rem)",letterSpacing:".1em",textTransform:"uppercase",color:isActive?"var(--accent)":"var(--muted)",borderLeft:!isMobile&&isActive?`2px solid var(--accent)`:"none",borderBottom:isMobile&&isActive?`2px solid var(--accent)`:"none",paddingLeft:!isMobile?"8px":0,paddingBottom:isMobile?"4px":0,whiteSpace:"nowrap",transition:"all .3s",cursor:"pointer",fontWeight:isActive?700:400}}>
                  {s}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RAILS ── */}
        {isMobile ? (
          <div style={{flex:1,display:"flex",flexDirection:"row",gap:GAP,padding:`0 ${GAP}px`,overflow:"hidden",position:"relative",height:"100%"}}>
            {["left","right"].map(p=>(
              <div key={p} style={{position:"absolute",[p]:0,top:0,bottom:0,width:"clamp(30px,8vw,60px)",background:`linear-gradient(to ${p==="left"?"right":"left"},var(--bg) 25%,transparent)`,zIndex:10,pointerEvents:"none"}}/>
            ))}
            <div style={{position:"absolute",bottom:10,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6,zIndex:20,background:"rgba(0,0,0,0.2)",padding:"4px 12px",borderRadius:20,backdropFilter:"blur(4px)"}}>
              <span style={{color:"var(--accent)",fontSize:10}}>◀</span>
              <span style={{color:"var(--bg)",fontSize:9,letterSpacing:1}}>SWIPE</span>
              <span style={{color:"var(--accent)",fontSize:10}}>▶</span>
            </div>
            <div style={{overflow:"hidden",position:"relative",width:"100%",height:"100%"}}>
              {mounted && <HorizontalRail   pauseUntil={pauseUntil} isMobile={isMobile} cards={COL1} direction="left" offset={0} speed={0.3} onHover={setActive} onCardClick={handleCardClick} onOpenPopup={handleOpenPopup} activeLabel={activeId}/>}
            </div>
          </div>
        ) : (
          <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:GAP,padding:`0 ${GAP}px`,overflow:"hidden",position:"relative"}}>
            {["top","bottom"].map(p=>(
              <div key={p} style={{position:"absolute",[p]:0,left:0,right:0,height:"clamp(60px,12vh,110px)",background:`linear-gradient(to ${p==="top"?"bottom":"top"},var(--bg) 25%,transparent)`,zIndex:10,pointerEvents:"none"}}/>
            ))}
            <div style={{overflow:"hidden",position:"relative"}}>
              {mounted && <VerticalRail   pauseUntil={pauseUntil}  isMobile={isMobile} cards={COL1} direction="up" onHover={setActive} onCardClick={handleCardClick} onOpenPopup={handleOpenPopup} activeLabel={activeId}/>}
            </div>
            <div style={{overflow:"hidden",position:"relative"}}>
              {mounted && <VerticalRail pauseUntil={pauseUntil} isMobile={isMobile} cards={COL2} direction="down" offset={-380} onHover={setActive} onCardClick={handleCardClick} onOpenPopup={handleOpenPopup} activeLabel={activeId}/>}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}