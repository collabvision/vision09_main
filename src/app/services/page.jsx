"use client";

/* ════════════════════════════════════════════════════════
   VISION9 · Services Page
   Click sidebar item → rail snaps to show that card → 
   5 sec pause → animation resumes automatically.
════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState, useCallback } from "react";
import Header from "../../components/custom/Header";
import Footer from "../../components/custom/Footer";

/* ─── THEME ─── */
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

  /* card palette */
  svc1Bg: "#1c1a14",
  svc1Text: "#fffee9",
  svc2Bg: "#fffee9",
  svc2Text: "#231f1f",
  svc3Bg: "#d2ce12",
  svc3Text: "#231f1f",
  svc4Bg: "#f5f2c8",
  svc4Text: "#231f1f",
  svc5Bg: "#3f3c15",
  svc5Text: "#fffee9",
  svc6Bg: "#a6a216",
  svc6Text: "#fffee9",
};

/* ─── SERVICE DATA ─── */
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
    description:
      "Strategic social media designed for growth, engagement, and authority.",
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
    description:
      "We help brands create loyal, engaged communities that support long term growth.",
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
    description:
      "High impact content built for virality, storytelling, and performance.",
    points: [
      "Reels & short-form video production",
      "Brand films & story videos",
      "Performance focused ad creatives",
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
    description:
      "We support internal growth systems that strengthen teams and culture.",
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
    description:
      "Authentic content that builds trust, drives attention, and influences decisions.",
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
    title: "WEB, SEO & DIGITAL PRESENCE",
    description: "We build and optimize digital assets that convert and rank.",
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
    description:
      "Complete in-house design, printing, and on-ground branding execution.",
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
    description:
      "End-to-end strategies built to drive sales, retention, and scalable growth.",
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
    description:
      "Vision9 is proud to be associated with 5000+ publication offers across international and national media.",
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

/* label → SERVICE_DATA key */
const LABEL_TO_KEY = {
  BRANDING: "BRANDING",
  SOCIAL: "SOCIAL MEDIA",
  COMMUNITY: "COMMUNITY",
  PERFORMANCE: "PERFORMANCE",
  VIDEO: "VIDEO",
  PODCAST: "PODCAST",
  INFLUENCER: "INFLUENCER",
  WEBSITE: "WEBSITE",
  LOGO: null,
  PACKAGING: null,
  BRAND: "BRANDING",
  DESIGNING: "DESIGNING",
  COPYWRITING: "COPYWRITING",
  "E-COMMERCE": "E-COMMERCE",
  PR: "PR",
  HR: "HR",
};
function resolveKey(label) {
  if (!label) return null;
  const first = label.split(/[\n ]/)[0];
  return LABEL_TO_KEY[first] ?? null;
}

const GAP = 4;
const PAUSE_MS = 5000;

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

function vCss(t) {
  return [
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
  ].join(";");
}

/* ─── CARD DATA (two columns) ─── */
function buildCards(t) {
  return [
    [
      {
        id: "branding",
        label: "BRANDING",
        bg: t.svc1Bg,
        color: t.svc1Text,
        tall: true,
      },
      {
        id: "social",
        label: "SOCIAL MEDIA",
        bg: t.svc2Bg,
        color: t.svc2Text,
        tall: true,
      },
      {
        id: "performance",
        label: "PERFORMANCE\nMARKETING",
        bg: t.svc3Bg,
        color: t.svc3Text,
        tall: true,
      },
      {
        id: "influencer",
        label: "INFLUENCER\nMARKETING",
        bg: t.svc4Bg,
        color: t.svc4Text,
        tall: false,
      },
      {
        id: "video",
        label: "VIDEO\nPRODUCTION",
        bg: t.svc5Bg,
        color: t.svc5Text,
        tall: true,
      },
      {
        id: "community",
        label: "COMMUNITY",
        bg: t.svc6Bg,
        color: t.svc6Text,
        tall: false,
      },
      {
        id: "podcast",
        label: "PODCAST",
        bg: t.svc1Bg,
        color: t.svc1Text,
        tall: true,
      },
    ],
    [
      {
        id: "website",
        label: "WEBSITE\nDESIGN",
        bg: t.svc4Bg,
        color: t.svc4Text,
        tall: true,
      },
      {
        id: "copywriting",
        label: "COPYWRITING",
        bg: t.svc2Bg,
        color: t.svc2Text,
        tall: false,
      },
      {
        id: "designing",
        label: "DESIGNING",
        bg: t.svc1Bg,
        color: t.svc1Text,
        tall: true,
      },
      {
        id: "ecommerce",
        label: "E-COMMERCE",
        bg: t.svc3Bg,
        color: t.svc3Text,
        tall: false,
      },
      { id: "pr", label: "PR", bg: t.svc5Bg, color: t.svc5Text, tall: true },
      { id: "hr", label: "HR", bg: t.svc6Bg, color: t.svc6Text, tall: false },
      {
        id: "brand",
        label: "BRAND\nIDENTITY",
        bg: t.svc2Bg,
        color: t.svc2Text,
        tall: true,
      },
    ],
  ];
}

/* ─── SIDEBAR ITEM LIST (ordered) ─── */
const SIDEBAR_ITEMS = [
  { label: "BRANDING", key: "BRANDING" },
  { label: "SOCIAL MEDIA", key: "SOCIAL MEDIA" },
  { label: "PERFORMANCE MARKETING", key: "PERFORMANCE" },
  { label: "INFLUENCER MARKETING", key: "INFLUENCER" },
  { label: "VIDEO PRODUCTION", key: "VIDEO" },
  { label: "COMMUNITY", key: "COMMUNITY" },
  { label: "PODCAST", key: "PODCAST" },
  { label: "WEBSITE DESIGN", key: "WEBSITE" },
  { label: "COPYWRITING", key: "COPYWRITING" },
  { label: "DESIGNING", key: "DESIGNING" },
  { label: "E-COMMERCE", key: "E-COMMERCE" },
  { label: "PR", key: "PR" },
  { label: "HR", key: "HR" },
];

/* ═══════════════════════════════════════════════
   SERVICE POPUP
═══════════════════════════════════════════════ */
function ServicePopup({ serviceKey, onClose }) {
  const data = serviceKey ? SERVICE_DATA[serviceKey] : null;
  const [vis, setVis] = useState(false);

  useEffect(() => {
    if (data) requestAnimationFrame(() => setVis(true));
    else setVis(false);
  }, [data]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!data) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 400,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        opacity: vis ? 1 : 0,
        transition: "opacity .28s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: THEME.pageBg,
          width: "min(820px,92vw)",
          maxHeight: "88vh",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          transform: vis
            ? "translateY(0) scale(1)"
            : "translateY(18px) scale(.96)",
          opacity: vis ? 1 : 0,
          transition:
            "transform .32s cubic-bezier(.16,1,.3,1),opacity .28s ease",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 20,
            background: "rgba(0,0,0,.72)",
            border: "none",
            color: "#fff",
            width: 28,
            height: 28,
            cursor: "pointer",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>

        {/* image */}
        <div
          style={{
            width: "42%",
            flexShrink: 0,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={data.image}
            alt={data.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right,transparent 60%,rgba(255,252,233,.18) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.6rem 1.8rem 1.6rem 1.4rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            scrollbarWidth: "none",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1rem,2.2vw,1.4rem)",
              fontWeight: 700,
              lineHeight: 1.18,
              color: THEME.textPrimary,
              paddingRight: "1.8rem",
            }}
          >
            {data.title}
          </h2>
          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg,${THEME.accent},transparent)`,
            }}
          />
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(.78rem,1.1vw,.88rem)",
              lineHeight: 1.72,
              color: THEME.textSecondary,
              fontWeight: 300,
              borderLeft: `2px solid ${THEME.accent}`,
              paddingLeft: ".75rem",
              margin: 0,
            }}
          >
            {data.description}
          </p>
          <div
            style={{
              fontFamily: "'Tenor Sans',sans-serif",
              fontSize: ".48rem",
              letterSpacing: ".25em",
              textTransform: "uppercase",
              color: THEME.accent,
              display: "flex",
              alignItems: "center",
              gap: ".45rem",
            }}
          >
            <span
              style={{
                width: 14,
                height: 1,
                background: THEME.accent,
                display: "inline-block",
              }}
            />
            Includes
            <span
              style={{
                width: 14,
                height: 1,
                background: THEME.accent,
                display: "inline-block",
              }}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}
          >
            {data.points.map((pt, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: ".5rem",
                  padding: ".45rem .72rem",
                  background: "#fff",
                  border: "1px solid rgba(115,112,23,0.11)",
                }}
              >
                <span
                  style={{
                    color: THEME.accent,
                    fontSize: ".45rem",
                    marginTop: ".28rem",
                    flexShrink: 0,
                    fontWeight: 700,
                  }}
                >
                  ◆
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "clamp(.72rem,.95vw,.82rem)",
                    color: THEME.textPrimary,
                    lineHeight: 1.48,
                    fontWeight: 300,
                  }}
                >
                  {pt}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "auto",
              paddingTop: ".6rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <a
              href="/contact"
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: ".75rem",
                fontWeight: 700,
                letterSpacing: ".13em",
                textTransform: "uppercase",
                color: "#fffee9",
                background: THEME.accent,
                padding: ".65rem 1.6rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "background .25s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = THEME.accentMid)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = THEME.accent)
              }
            >
              Get Started →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SINGLE CARD
═══════════════════════════════════════════════ */
function RailCard({
  s,
  isActive,
  isHighlighted,
  svcData,
  onHover,
  onOpenPopup,
}) {
  const [hovered, setHovered] = useState(false);
  const hot = hovered || isActive;

  if (!s.label) {
    return (
      <div
        data-label=""
        style={{
          background: s.bg,
          aspectRatio: s.tall ? "3/4" : "4/3",
          flexShrink: 0,
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      />
    );
  }

  return (
    <div
      data-cardlabel={s.label}
      onMouseEnter={() => {
        onHover?.(s.label);
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: s.bg,
        aspectRatio: s.tall ? "3/4" : "4/3",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform .3s, box-shadow .3s, outline .2s",
        transform: isHighlighted
          ? "scale(1.04)"
          : hot
            ? "scale(1.02)"
            : "scale(1)",
        boxShadow: isHighlighted
          ? `0 0 0 2px ${THEME.accent}, 0 16px 40px rgba(0,0,0,.35)`
          : hot
            ? "0 12px 28px rgba(0,0,0,.28)"
            : "none",
        zIndex: isHighlighted ? 20 : hot ? 10 : 1,
        borderTop: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => onOpenPopup?.(s.label)}
    >
      {/* image */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          minHeight: 0,
        }}
      >
        {svcData ? (
          <img
            src={svcData.image}
            alt={s.label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              transition: "transform .45s ease",
              transform: hot ? "scale(1.06)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: s.bg }} />
        )}
        {/* highlight overlay */}
        {isHighlighted && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(166,162,22,.1)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* text strip */}
      <div
        style={{
          background: s.bg,
          padding: "clamp(.45rem,1.2vw,.85rem) clamp(.5rem,1.3vw,.9rem)",
          display: "flex",
          flexDirection: "column",
          gap: ".32rem",
          flexShrink: 0,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
        }}
      >
        {/* active gold bar */}
        {isHighlighted && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: THEME.accent,
            }}
          />
        )}
        <span
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 700,
            fontSize: "clamp(0.58rem,2.4vw,1.15rem)",
            letterSpacing: ".02em",
            lineHeight: 1.1,
            whiteSpace: "pre-line",
            color: s.color,
            userSelect: "none",
            textTransform: "uppercase",
            wordBreak: "break-word",
            display: "block",
          }}
        >
          {s.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPopup?.(s.label);
          }}
          style={{
            alignSelf: "flex-start",
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: "clamp(.38rem,.85vw,.52rem)",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#231f1f",
            background: THEME.accentLight,
            border: "none",
            cursor: "pointer",
            padding: ".28rem .62rem",
            display: "flex",
            alignItems: "center",
            gap: ".28rem",
            fontWeight: 600,
            transition: "background .22s",
            whiteSpace: "nowrap",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = THEME.accentMid)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = THEME.accentLight)
          }
        >
          View Details{" "}
          <span style={{ fontSize: ".65em", lineHeight: 1 }}>→</span>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VERTICAL RAIL
   
   Key prop: `snapTo` — when set, instantly moves
   position so the matching card is centred in view,
   then after PAUSE_MS the parent clears it and
   normal animation resumes.
═══════════════════════════════════════════════ */
function VerticalRail({
  cards,
  direction,
  offset = 0,
  speed = 0.5,
  onHover,
  onOpenPopup,
  activeLabel,
  snapTo,
  containerRef,
}) {
  const ref = useRef(null);
  const pos = useRef(offset);
  const loopH = useRef(0);
  const rafRef = useRef(null);
  const pausedByHover = useRef(false);
  const pausedBySnap = useRef(false);

  /* measure total single-set height */
  const measureLoop = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    let h = 0;
    for (let i = 0; i < cards.length; i++) {
      h += el.children[i]?.getBoundingClientRect().height ?? 0;
    }
    h += GAP * (cards.length - 1);
    if (h > 0) loopH.current = h;
  }, [cards.length]);

  /* ── SNAP: find card index in rendered children, compute target Y ── */
  useEffect(() => {
    if (!snapTo) {
      pausedBySnap.current = false;
      return;
    }

    pausedBySnap.current = true;
    const el = ref.current;
    const container = containerRef?.current;
    if (!el || !container) return;

    // small delay so DOM is painted
    const tid = setTimeout(() => {
      measureLoop();
      const containerH = container.getBoundingClientRect().height;
      const totalCards = el.children.length; // 3× duplicated
      const singleCount = cards.length;

      // find first matching child in the MIDDLE set (index singleCount to 2*singleCount)
      let targetTop = null;
      let targetHeight = null;
      for (let i = singleCount; i < singleCount * 2; i++) {
        const child = el.children[i];
        if (!child) continue;
        const lbl = child.getAttribute("data-cardlabel") ?? "";
        const childKey = resolveKey(lbl);
        if (
          lbl.split(/[\n ]/)[0] === snapTo.split(/[\n ]/)[0] ||
          (childKey && childKey === resolveKey(snapTo))
        ) {
          const cr = child.getBoundingClientRect();
          const er = el.getBoundingClientRect();
          targetTop = cr.top - er.top;
          targetHeight = cr.height;
          break;
        }
      }
      if (targetTop === null) return;

      // We want the card centred in container.
      // pos.current is translateY applied to el.
      // current rendered top of child = pos.current + targetTop.
      // we want: pos.current + targetTop + targetHeight/2 == containerH/2
      const desired = containerH / 2 - targetTop - targetHeight / 2;
      pos.current = desired;
      if (el) el.style.transform = `translateY(${pos.current}px)`;
    }, 30);

    return () => clearTimeout(tid);
  }, [snapTo, cards.length, containerRef, measureLoop]);

  /* ── RAF LOOP ── */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    measureLoop();
    // re-measure on next frame after paint
    requestAnimationFrame(measureLoop);

    const tick = () => {
      if (
        !pausedByHover.current &&
        !pausedBySnap.current &&
        loopH.current > 0
      ) {
        direction === "up" ? (pos.current -= speed) : (pos.current += speed);

        if (direction === "up" && pos.current <= -loopH.current)
          pos.current += loopH.current;
        if (direction === "down" && pos.current >= 0)
          pos.current -= loopH.current;

        if (el) el.style.transform = `translateY(${pos.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed, measureLoop]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => (pausedByHover.current = true)}
      onMouseLeave={() => (pausedByHover.current = false)}
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
          s.label.split(/[\n ]/)[0] === activeLabel.split(/[\n ]/)[0];
        const isHighlighted =
          !!s.label &&
          !!snapTo &&
          s.label.split(/[\n ]/)[0] === snapTo.split(/[\n ]/)[0];
        return (
          <RailCard
            key={`${s.id}-${i}`}
            s={s}
            isActive={isActive}
            isHighlighted={isHighlighted}
            svcData={svcData}
            onHover={onHover}
            onOpenPopup={onOpenPopup}
          />
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */
export default function ServicesPage() {
  const [active, setActive] = useState("BRANDING");
  const [activeId, setActiveId] = useState(null);
  const [snapTo, setSnapTo] = useState(null); // card label currently snapped to
  const [popupKey, setPopupKey] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const snapTimerRef = useRef(null);
  const titleRef = useRef(null);

  const [COL1, COL2] = buildCards(THEME);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* auto-resize title font */
  useEffect(() => {
    if (!titleRef.current) return;
    const ro = new ResizeObserver(() => {
      const container = titleRef.current?.parentElement;
      if (!container) return;
      const w = container.clientWidth;
      const len = active.length;
      const base = w * 0.12;
      const factor = Math.max(0.5, 1 - len * 0.02);
      const fs = Math.min(
        Math.max(base * factor, isMobile ? 24 : 32),
        isMobile ? 48 : 80,
      );
      if (titleRef.current) titleRef.current.style.fontSize = `${fs}px`;
    });
    if (titleRef.current?.parentElement)
      ro.observe(titleRef.current.parentElement);
    return () => ro.disconnect();
  }, [active, isMobile]);

  /* ── CLICK HANDLER: snap rail to card, resume after 5s ── */
  const handleSidebarClick = useCallback((item) => {
    setActive(item.label);
    setActiveId(item.label);

    // Find which column has this card
    // snap BOTH columns but only the one with the card will actually move visibly
    const cardLabel = item.label;

    // clear any running timer
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);

    setSnapTo(cardLabel);

    // after PAUSE_MS, release snap → animation resumes
    snapTimerRef.current = setTimeout(() => {
      setSnapTo(null);
    }, PAUSE_MS);
  }, []);

  const handleCardHover = useCallback((label) => {
    const key = resolveKey(label);
    if (key && SERVICE_DATA[key])
      setActive(
        SERVICE_DATA[key].title.split(" ")[0] === "BRANDING"
          ? "BRANDING"
          : label.split(/[\n ]/)[0],
      );
    setActiveId(label);
  }, []);

  const handleOpenPopup = useCallback((label) => {
    const key = resolveKey(label);
    if (key) setPopupKey(key);
  }, []);

  // cleanup on unmount
  useEffect(
    () => () => {
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    },
    [],
  );

  /* which column holds a given label? */
  function whichCol(label) {
    const first = label.split(/[\n ]/)[0];
    const inCol1 = COL1.some((c) => c.label?.split(/[\n ]/)[0] === first);
    return inCol1 ? "col1" : "col2";
  }

  /* snapTo per column: only pass snapTo to the column that actually has the card */
  const col1Snap = snapTo && whichCol(snapTo) === "col1" ? snapTo : null;
  const col2Snap = snapTo && whichCol(snapTo) === "col2" ? snapTo : null;

  /* countdown display */
  const [countdown, setCountdown] = useState(null);
  useEffect(() => {
    if (!snapTo) {
      setCountdown(null);
      return;
    }
    setCountdown(5);
    const iv = setInterval(() => {
      setCountdown((p) => {
        if (p <= 1) {
          clearInterval(iv);
          return null;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [snapTo]);

  return (
    <>
      <style>{`
        ${FONTS}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{${vCss(THEME)}}
        html,body{width:100%;min-height:100%;overflow-x:hidden;overflow-y:auto;background:var(--bg)}
        @keyframes fadeTitle{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes snapPulse{0%,100%{opacity:.5}50%{opacity:1}}
        *{-webkit-tap-highlight-color:transparent}
        div::-webkit-scrollbar{display:none}
        .svc-pill-row{display:flex;flex-direction:row;flex-wrap:nowrap;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none}
        .svc-pill-row::-webkit-scrollbar{display:none}
      `}</style>

      {popupKey && (
        <ServicePopup serviceKey={popupKey} onClose={() => setPopupKey(null)} />
      )}
      <Header />

      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "var(--bg)",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* ══ LEFT PANEL ══ */}
        <div
          style={{
            width: isMobile ? "100%" : "clamp(0px,38%,420px)",
            height: isMobile ? "auto" : "100%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: isMobile ? "2rem 5vw 1rem" : "0 5vw",
            background: "var(--bg)",
            zIndex: 20,
            borderRight: isMobile ? "none" : `1px solid var(--border)`,
            borderBottom: isMobile ? `1px solid var(--border)` : "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* corner accents */}
          {!isMobile &&
            [
              { top: 24, left: 24 },
              { top: 24, right: 0 },
              { bottom: 24, left: 24 },
              { bottom: 24, right: 0 },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...pos,
                  width: 28,
                  height: 28,
                  opacity: 0.4,
                  borderTop:
                    pos.top !== undefined ? `1px solid var(--accent)` : "none",
                  borderBottom:
                    pos.bottom !== undefined
                      ? `1px solid var(--accent)`
                      : "none",
                  borderLeft:
                    pos.left !== undefined ? `1px solid var(--accent)` : "none",
                  borderRight:
                    pos.right !== undefined
                      ? `1px solid var(--accent)`
                      : "none",
                }}
              />
            ))}

          <p
            style={{
              fontFamily: "'Tenor Sans',sans-serif",
              fontSize: "clamp(.5rem,.9vw,.65rem)",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: isMobile ? ".5rem" : "1rem",
              marginTop: isMobile ? "30px" : "0px",
            }}
          >
            ✦ What We Do ✦
          </p>

          {/* animated title */}
          <div style={{ width: "100%" }}>
            <h1
              ref={titleRef}
              key={active}
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-.01em",
                color: "var(--text)",
                animation: "fadeTitle .35s ease",
                wordBreak: "break-word",
                width: "100%",
                display: "block",
                transition: "font-size .2s ease",
              }}
            >
              {active.replace(/\n/g, " ")}
            </h1>
          </div>

          <div
            style={{
              marginTop: isMobile ? ".8rem" : "1.4rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: `linear-gradient(90deg,var(--accent),transparent)`,
              }}
            />
            <span style={{ color: "var(--accent)", fontSize: 10 }}>◆</span>
          </div>

          {/* snap status indicator */}
          <div
            style={{
              marginTop: ".6rem",
              height: "1.4rem",
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              opacity: countdown ? 1 : 0,
              transition: "opacity .3s",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                background: THEME.accent,
                borderRadius: "50%",
                flexShrink: 0,
                animation: countdown
                  ? "snapPulse 1s ease-in-out infinite"
                  : "none",
              }}
            />
            <span
              style={{
                fontFamily: "'Tenor Sans',sans-serif",
                fontSize: ".46rem",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: THEME.accentDark,
              }}
            >
              {countdown ? `Resuming in ${countdown}s` : ""}
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Playfair Display',serif",
              fontStyle: "italic",
              fontSize: "clamp(.72rem,1.1vw,.88rem)",
              color: "var(--muted)",
              marginTop: ".4rem",
              lineHeight: 1.65,
            }}
          >
            {isMobile
              ? "Tap a card to explore"
              : "Click a service to highlight · hover to browse"}
          </p>

          {/* service list */}
          <div
            className={isMobile ? "svc-pill-row" : ""}
            style={{
              marginTop: isMobile ? "1rem" : "1.4rem",
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              gap: isMobile ? ".75rem" : 0,
              /* mobile: scroll horizontally, never wrap */
              overflowX: isMobile ? "auto" : "visible",
              overflowY: "hidden",
              flexWrap: "nowrap",
              /* pull out to edge so pills reach screen edge */
              marginLeft: isMobile ? "-5vw" : "0",
              paddingLeft: isMobile ? "5vw" : "0",
              paddingRight: isMobile ? "5vw" : "0",
              paddingBottom: isMobile ? ".6rem" : 0,
              /* momentum scroll on iOS */
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              maxHeight: isMobile ? "none" : "42vh",
            }}
          >
            {SIDEBAR_ITEMS.map((item, i) => {
              const isSnapped =
                snapTo &&
                item.label.split(/[\n ]/)[0] === snapTo.split(/[\n ]/)[0];
              const isActive =
                active.split(/[\n ]/)[0] === item.label.split(/[\n ]/)[0];
              return (
                <div
                  key={i}
                  onClick={() => handleSidebarClick(item)}
                  style={{
                    fontFamily: "'Tenor Sans',sans-serif",
                    fontSize: "clamp(.52rem,.78vw,.66rem)",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: isSnapped
                      ? THEME.accent
                      : isActive
                        ? THEME.accentDark
                        : "var(--muted)",
                    borderLeft: !isMobile
                      ? isSnapped
                        ? `2px solid ${THEME.accent}`
                        : isActive
                          ? `2px solid ${THEME.accentDark}`
                          : "2px solid transparent"
                      : "none",
                    borderBottom:
                      isMobile && (isSnapped || isActive)
                        ? `2px solid ${THEME.accent}`
                        : isMobile
                          ? "2px solid transparent"
                          : "none",
                    paddingLeft: !isMobile ? "8px" : 0,
                    paddingBottom: isMobile ? "4px" : ".55rem",
                    paddingTop: !isMobile ? ".55rem" : 0,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    fontWeight: isSnapped ? 700 : isActive ? 600 : 400,
                    transition: "all .25s",
                    display: "flex",
                    alignItems: "center",
                    gap: ".4rem",
                    flexShrink: 0,
                  }}
                >
                  {isSnapped && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 4,
                        height: 4,
                        background: THEME.accent,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ RAILS ══ */}
        {mounted && (
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: GAP,
              padding: `0 ${GAP}px`,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* top/bottom fade masks */}
            {["top", "bottom"].map((pos) => (
              <div
                key={pos}
                style={{
                  position: "absolute",
                  [pos]: 0,
                  left: 0,
                  right: 0,
                  height: "clamp(60px,12vh,110px)",
                  background: `linear-gradient(to ${pos === "top" ? "bottom" : "top"},var(--bg) 25%,transparent)`,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* COL 1 — scrolls UP */}
            <div
              ref={col1Ref}
              style={{ overflow: "hidden", position: "relative" }}
            >
              <VerticalRail
                cards={COL1}
                direction="up"
                speed={0.5}
                onHover={handleCardHover}
                onOpenPopup={handleOpenPopup}
                activeLabel={activeId}
                snapTo={col1Snap}
                containerRef={col1Ref}
              />
            </div>

            {/* COL 2 — scrolls DOWN */}
            <div
              ref={col2Ref}
              style={{ overflow: "hidden", position: "relative" }}
            >
              <VerticalRail
                cards={COL2}
                direction="down"
                offset={-380}
                speed={0.5}
                onHover={handleCardHover}
                onOpenPopup={handleOpenPopup}
                activeLabel={activeId}
                snapTo={col2Snap}
                containerRef={col2Ref}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
