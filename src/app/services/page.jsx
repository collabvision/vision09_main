"use client";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/custom/Header";
import Footer from "../../components/custom/Footer";

/* ═══════════════════════════════════════════════════════════════
   THEME — edit here to retheme the entire page
   Every color in this file flows from these tokens only.
═══════════════════════════════════════════════════════════════ */
// const THEME = {
//   accent:          "#A8832A",
//   accentLight:     "#D4B86A",
//   accentMid:       "#C4A24E",
//   accentDark:      "#6B5010",
//   pageBg:          "#FAF8F2",
//   pageBgAlt:       "#F2EDE0",
//   cardBg:          "#FFFFFF",
//   navBg:           "rgba(250,248,242,0.93)",
//   textPrimary:     "#1C1A14",
//   textSecondary:   "#56503E",
//   textMuted:       "#9A8E72",
//   border:          "rgba(168,131,42,0.20)",
//   borderFaint:     "rgba(168,131,42,0.10)",
//   cursorFill:      "#A8832A",
//   cursorRing:      "rgba(168,131,42,0.28)",
//   btnSolidBg:      "#A8832A",
//   btnSolidText:    "#FAF8F2",
//   btnSolidHover:   "#C4A24E",
//   btnOutlineBorder:"rgba(168,131,42,0.38)",
//   btnOutlineText:  "#1C1A14",
//   btnOutlineHover: "#A8832A",
//   // ── Service card palette (6 card styles, used alternately) ──
//   svc1Bg: "#1C1A14", svc1Text: "#A8832A",   // dark / gold text
//   svc2Bg: "#A8832A", svc2Text: "#FAF8F2",   // gold / cream text
//   svc3Bg: "#F2EDE0", svc3Text: "#1C1A14",   // light / dark text
//   svc4Bg: "#6B5010", svc4Text: "#FAF8F2",   // deep gold / cream
//   svc5Bg: "#C4A24E", svc5Text: "#1C1A14",   // mid gold / dark
//   svc6Bg: "#2A2618", svc6Text: "#D4B86A",   // off-black / gold-l
// }

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

  cursorFill: "#a6a216",
  cursorRing: "rgba(166,162,22,0.28)",

  btnSolidBg: "#a6a216",
  btnSolidText: "#fffee9",
  btnSolidHover: "#d2ce12",

  btnOutlineBorder: "rgba(115,112,23,0.38)",
  btnOutlineText: "#231f1f",
  btnOutlineHover: "#a6a216",

  // ── Service card palette (6 card styles, used alternately) ──
  svc1Bg: "#231f1f",
  svc1Text: "#ebe60c", // dark / bright accent
  svc2Bg: "#a6a216",
  svc2Text: "#fffee9", // accent / cream
  svc3Bg: "#fffee9",
  svc3Text: "#231f1f", // light / dark
  svc4Bg: "#737017",
  svc4Text: "#fffee9", // dark olive / cream
  svc5Bg: "#d2ce12",
  svc5Text: "#231f1f", // mid accent / dark
  svc6Bg: "#3f3c15",
  svc6Text: "#ebe60c", // deep olive / bright
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
  ].join(";");

/* ── Service data — backgrounds reference THEME directly ── */
const buildCards = (t) => [
  [
    {
      id: "branding",
      label: "BRANDING",
      bg: t.svc1Bg,
      color: t.svc1Text,
      tall: true,
    },
    {
      id: "pitch-decks",
      label: "PITCH\nDECKS",
      bg: t.svc2Bg,
      color: t.svc2Text,
      tall: true,
    },
    {
      id: "logo-design",
      label: "LOGO\nDESIGN",
      bg: t.svc6Bg,
      color: t.svc6Text,
      tall: false,
    },
    {
      id: "influencer-marketing",
      label: "INFLUENCER\nMARKETING",
      bg: t.svc4Bg,
      color: t.svc4Text,
      tall: true,
    },
    {
      id: "packaging-design",
      label: "PACKAGING\nDESIGN",
      bg: t.svc5Bg,
      color: t.svc5Text,
      tall: false,
    },
    {
      id: "performance-marketing",
      label: "PERFORMANCE\nMARKETING",
      bg: t.svc1Bg,
      color: t.svc1Text,
      tall: true,
    },
  ],
  [
    {
      id: "brand-identity",
      label: "BRAND\nIDENTITY",
      bg: t.svc4Bg,
      color: t.svc4Text,
      tall: true,
    },
    { id: "empty1", label: "", bg: t.svc3Bg, color: t.svc1Text, tall: false },
    {
      id: "social-media",
      label: "SOCIAL MEDIA\nMGMT",
      bg: t.svc1Bg,
      color: t.svc1Text,
      tall: true,
    },
    { id: "empty2", label: "", bg: t.svc2Bg, color: t.svc2Text, tall: false },
    {
      id: "website-design",
      label: "WEBSITE\nDESIGN",
      bg: t.svc6Bg,
      color: t.svc6Text,
      tall: true,
    },
    { id: "empty3", label: "", bg: t.svc4Bg, color: t.svc4Text, tall: false },
  ],
];

const GAP = 4;
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

function VerticalRail({
  cards,
  direction,
  offset = 0,
  speed = 0.5,
  onHover,
  onClick,
  activeId,
  railIndex,
}) {
  const ref = useRef(null);
  const pos = useRef(offset);
  const loop = useRef(0);
  const rafRef = useRef(null);
  const isAnimatingSnap = useRef(false);

  // Function to find position of active card
  const findCardPosition = () => {
    if (!ref.current || !activeId) return null;

    const cards_elements = ref.current.children;
    for (let i = 0; i < cards_elements.length; i++) {
      const card = cards_elements[i];
      const label = card.getAttribute("data-label");
      if (
        label &&
        label.replace(/\n/g, " ").split(" ")[0] === activeId.split(" ")[0]
      ) {
        return {
          index: i % cards.length,
          element: card,
        };
      }
    }
    return null;
  };

  // Snap to active card when clicked from text
  useEffect(() => {
    if (!ref.current || !activeId || !onClick) return;

    const cardPos = findCardPosition();
    if (!cardPos) return;

    const containerHeight = ref.current.parentElement.clientHeight;
    const cardHeight = cardPos.element.offsetHeight + GAP;
    const targetOffset = -(
      cardPos.index * cardHeight +
      cardHeight / 2 -
      containerHeight / 2
    );

    // Smooth snap animation
    const startPos = pos.current;
    const diff = targetOffset - startPos;
    const duration = 1000;
    const startTime = performance.now();

    isAnimatingSnap.current = true;

    const animateSnap = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth stop
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      pos.current = startPos + diff * easeProgress;

      if (ref.current) {
        ref.current.style.transform = `translateY(${pos.current}px)`;
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animateSnap);
      } else {
        // Snap animation complete, resume auto-scroll
        isAnimatingSnap.current = false;
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animateSnap);

    return () => cancelAnimationFrame(rafRef.current);
  }, [activeId, onClick]);

  // Original infinite scroll animation (always running)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let h = 0;
    for (let i = 0; i < cards.length; i++)
      h += el.children[i]?.getBoundingClientRect().height ?? 0;
    h += GAP * (cards.length - 1);
    loop.current = h;

    const tick = () => {
      // Always update position, even during snap animation
      // This ensures auto-scroll continues but we don't override the snap
      if (!isAnimatingSnap.current) {
        direction === "up" ? (pos.current -= speed) : (pos.current += speed);
        if (direction === "up" && pos.current <= -loop.current)
          pos.current += loop.current;
        if (direction === "down" && pos.current >= 0)
          pos.current -= loop.current;
      }

      if (ref.current) {
        ref.current.style.transform = `translateY(${pos.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  return (
    <div
      ref={ref}
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
      {[...cards, ...cards, ...cards].map((s, i) => (
        <div
          key={`${s.id}-${i}`}
          data-label={s.label}
          onMouseEnter={() => s.label && onHover?.(s.label)}
          onClick={() =>
            s.label && onClick?.(s.label, railIndex, i % cards.length)
          }
          style={{
            background: s.bg,
            aspectRatio: s.tall ? "4/5" : "5/3",
            display: "flex",
            alignItems: "flex-end",
            padding: "clamp(.7rem,2vw,1.4rem)",
            flexShrink: 0,
            transition: "filter .3s, transform 0.3s, box-shadow 0.3s",
            borderTop: `1px solid rgba(0,0,0,0.06)`,
            cursor: "pointer",
            transform:
              s.label &&
              activeId &&
              s.label.split(" ")[0] === activeId.split(" ")[0]
                ? "scale(1.02)"
                : "scale(1)",
            boxShadow:
              s.label &&
              activeId &&
              s.label.split(" ")[0] === activeId.split(" ")[0]
                ? "0 10px 20px rgba(0,0,0,0.2)"
                : "none",
            zIndex:
              s.label &&
              activeId &&
              s.label.split(" ")[0] === activeId.split(" ")[0]
                ? 10
                : 1,
          }}
          onMouseOver={(e) => {
            if (
              !(
                s.label &&
                activeId &&
                s.label.split(" ")[0] === activeId.split(" ")[0]
              )
            ) {
              e.currentTarget.style.filter = "brightness(1.1)";
            }
          }}
          onMouseOut={(e) => {
            if (
              !(
                s.label &&
                activeId &&
                s.label.split(" ")[0] === activeId.split(" ")[0]
              )
            ) {
              e.currentTarget.style.filter = "brightness(1)";
            }
          }}
        >
          {s.label && (
            <span
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 700,
                fontSize: "clamp(0.7rem, 3.5vw, 1.8rem)",
                letterSpacing: ".02em",
                lineHeight: 1.1,
                whiteSpace: "pre-line",
                color: s.color,
                userSelect: "none",
                textTransform: "uppercase",
                wordBreak: "break-word",
                width: "100%",
                display: "block",
              }}
            >
              {s.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function HorizontalRail({
  cards,
  direction,
  offset = 0,
  speed = 0.5,
  onHover,
  onClick,
  activeId,
  railIndex,
}) {
  const ref = useRef(null);
  const pos = useRef(offset);
  const loop = useRef(0);
  const rafRef = useRef(null);
  const isAnimatingSnap = useRef(false);

  // Function to find position of active card
  const findCardPosition = () => {
    if (!ref.current || !activeId) return null;

    const cards_elements = ref.current.children;
    for (let i = 0; i < cards_elements.length; i++) {
      const card = cards_elements[i];
      const label = card.getAttribute("data-label");
      if (
        label &&
        label.replace(/\n/g, " ").split(" ")[0] === activeId.split(" ")[0]
      ) {
        return {
          index: i % cards.length,
          element: card,
        };
      }
    }
    return null;
  };

  // Snap to active card when clicked from text
  useEffect(() => {
    if (!ref.current || !activeId || !onClick) return;

    const cardPos = findCardPosition();
    if (!cardPos) return;

    const containerWidth = ref.current.parentElement.clientWidth;
    const cardWidth = cardPos.element.offsetWidth + GAP;
    const targetOffset = -(
      cardPos.index * cardWidth +
      cardWidth / 2 -
      containerWidth / 2
    );

    // Smooth snap animation
    const startPos = pos.current;
    const diff = targetOffset - startPos;
    const duration = 1000;
    const startTime = performance.now();

    isAnimatingSnap.current = true;

    const animateSnap = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth stop
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      pos.current = startPos + diff * easeProgress;

      if (ref.current) {
        ref.current.style.transform = `translateX(${pos.current}px)`;
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animateSnap);
      } else {
        // Snap animation complete, resume auto-scroll
        isAnimatingSnap.current = false;
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animateSnap);

    return () => cancelAnimationFrame(rafRef.current);
  }, [activeId, onClick]);

  // Original infinite scroll animation (always running)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let w = 0;
    for (let i = 0; i < cards.length; i++)
      w += el.children[i]?.getBoundingClientRect().width ?? 0;
    w += GAP * (cards.length - 1);
    loop.current = w;

    const tick = () => {
      // Always update position, even during snap animation
      // This ensures auto-scroll continues but we don't override the snap
      if (!isAnimatingSnap.current) {
        direction === "left" ? (pos.current -= speed) : (pos.current += speed);
        if (direction === "left" && pos.current <= -loop.current)
          pos.current += loop.current;
        if (direction === "right" && pos.current >= 0)
          pos.current -= loop.current;
      }

      if (ref.current) {
        ref.current.style.transform = `translateX(${pos.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  return (
    <div
      ref={ref}
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
      {[...cards, ...cards, ...cards].map((s, i) => (
        <div
          key={`${s.id}-${i}`}
          data-label={s.label}
          onMouseEnter={() => s.label && onHover?.(s.label)}
          onClick={() =>
            s.label && onClick?.(s.label, railIndex, i % cards.length)
          }
          style={{
            background: s.bg,
            aspectRatio: s.tall ? "3/4" : "4/3",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            padding: "clamp(.7rem,2vw,1.4rem)",
            flexShrink: 0,
            transition: "filter .3s, transform 0.3s, box-shadow 0.3s",
            borderLeft: `1px solid rgba(0,0,0,0.06)`,
            cursor: "pointer",
            transform:
              s.label &&
              activeId &&
              s.label.split(" ")[0] === activeId.split(" ")[0]
                ? "scale(1.02)"
                : "scale(1)",
            boxShadow:
              s.label &&
              activeId &&
              s.label.split(" ")[0] === activeId.split(" ")[0]
                ? "0 10px 20px rgba(0,0,0,0.2)"
                : "none",
            zIndex:
              s.label &&
              activeId &&
              s.label.split(" ")[0] === activeId.split(" ")[0]
                ? 10
                : 1,
          }}
          onMouseOver={(e) => {
            if (
              !(
                s.label &&
                activeId &&
                s.label.split(" ")[0] === activeId.split(" ")[0]
              )
            ) {
              e.currentTarget.style.filter = "brightness(1.1)";
            }
          }}
          onMouseOut={(e) => {
            if (
              !(
                s.label &&
                activeId &&
                s.label.split(" ")[0] === activeId.split(" ")[0]
              )
            ) {
              e.currentTarget.style.filter = "brightness(1)";
            }
          }}
        >
          {s.label && (
            <span
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 700,
                fontSize: "clamp(0.7rem, 4vw, 1.6rem)",
                letterSpacing: ".02em",
                lineHeight: 1.1,
                whiteSpace: "pre-line",
                color: s.color,
                userSelect: "none",
                textTransform: "uppercase",
                wordBreak: "break-word",
                width: "100%",
                display: "block",
              }}
            >
              {s.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const [active, setActive] = useState("BRANDING");
  const [activeId, setActiveId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-size title based on container width and text length
  useEffect(() => {
    if (!titleRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const container = titleRef.current.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const textLength = active.length;

      // Calculate font size based on container width and text length
      const baseSize = containerWidth * 0.12;

      // Adjust for text length (longer text = smaller font)
      const lengthFactor = Math.max(0.5, 1 - textLength * 0.02);

      // Calculate final size, but keep within reasonable bounds
      let fontSize = baseSize * lengthFactor;

      // Min/max constraints
      const minSize = isMobile ? 24 : 32;
      const maxSize = isMobile ? 48 : 80;

      fontSize = Math.min(Math.max(fontSize, minSize), maxSize);

      titleRef.current.style.fontSize = `${fontSize}px`;
    });

    resizeObserver.observe(titleRef.current.parentElement);
    resizeObserver.observe(titleRef.current);

    return () => resizeObserver.disconnect();
  }, [active, isMobile]);

  const [COL1, COL2] = buildCards(THEME);

  // Handle text click - bring card to left side (first column)
  const handleTextClick = (serviceName) => {
    setActive(serviceName);
    setActiveId(serviceName);
  };

  // Handle card click
  const handleCardClick = (label, railIndex, cardIndex) => {
    setActive(label);
    setActiveId(label);
    console.log(
      `Card clicked: ${label} in rail ${railIndex} at position ${cardIndex}`,
    );
  };

  return (
    <>
     <style>{`
  ${FONTS}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{${v(THEME)}}
  
  /* CHANGE THIS: allow vertical scroll, only hide horizontal */
  html, body {
    width: 100%;
    min-height: 100%;
    overflow-x: hidden; 
    overflow-y: auto;
    background: var(--bg);
  }

  @keyframes fadeTitle{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
`}</style>
      <Header></Header>
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          overflow: "auto",
          background: "var(--bg)",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* ── LEFT LABEL PANEL (Top on mobile) ── */}
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
          }}
        >
          {/* corner ornaments - hidden on mobile */}
          {!isMobile &&
            [
              { t: 24, l: 24, bTop: true, bLeft: true },
              { t: 24, r: 0, bTop: true, bRight: true },
              { b: 24, l: 24, bBottom: true, bLeft: true },
              { b: 24, r: 0, bBottom: true, bRight: true },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: c.t,
                  bottom: c.b,
                  left: c.l,
                  right: c.r,
                  width: 28,
                  height: 28,
                  opacity: 0.45,
                  borderTop: c.bTop ? `1px solid var(--accent)` : "none",
                  borderBottom: c.bBottom ? `1px solid var(--accent)` : "none",
                  borderLeft: c.bLeft ? `1px solid var(--accent)` : "none",
                  borderRight: c.bRight ? `1px solid var(--accent)` : "none",
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
              marginBottom: isMobile ? "0.5rem" : "1rem",
            }}
          >
            ✦ What We Do ✦
          </p>

          <div style={{ width: "100%" }}>
            <h1
              ref={titleRef}
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-.01em",
                color: "var(--text)",
                animation: "fadeTitle .4s ease",
                wordBreak: "break-word",
                width: "100%",
                display: "block",
                transition: "font-size 0.2s ease",
              }}
            >
              {active}
            </h1>
          </div>

          <div
            style={{
              marginTop: isMobile ? "0.8rem" : "1.4rem",
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

          <p
            style={{
              fontFamily: "'Playfair Display',serif",
              fontStyle: "italic",
              fontSize: "clamp(.72rem,1.1vw,.88rem)",
              color: "var(--muted)",
              marginTop: ".8rem",
              lineHeight: 1.65,
            }}
          >
            {isMobile
              ? "Tap a service to explore"
              : "Click a service to see it in first column"}
          </p>

          {/* mini list - horizontal scroll on mobile */}
          <div
            style={{
              marginTop: isMobile ? "1rem" : "1.8rem",
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              gap: isMobile ? "0.75rem" : ".25rem",
              overflowX: isMobile ? "auto" : "visible",
              paddingBottom: isMobile ? "0.5rem" : 0,
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

            {[
              ...new Set(
                [...COL1, ...COL2]
                  .filter((c) => c.label)
                  .map((c) => c.label.replace(/\n/g, " ")),
              ),
            ].map((s, i) => {
              const isActive = s.split(" ")[0] === active.split(" ")[0];
              return (
                <div
                  key={i}
                  onClick={() => handleTextClick(s)}
                  style={{
                    fontFamily: "'Tenor Sans',sans-serif",
                    fontSize: "clamp(.52rem,.78vw,.66rem)",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--accent)" : "var(--muted)",
                    borderLeft:
                      !isMobile && isActive
                        ? `2px solid var(--accent)`
                        : "none",
                    borderBottom:
                      isMobile && isActive ? `2px solid var(--accent)` : "none",
                    paddingLeft: !isMobile ? "8px" : 0,
                    paddingBottom: isMobile ? "4px" : 0,
                    whiteSpace: "nowrap",
                    transition: "all .3s",
                    cursor: "pointer",
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {s}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RAILS (Vertical on desktop, Horizontal on mobile) ── */}
        {isMobile ? (
          // Mobile: Horizontal scrolling
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              gap: GAP,
              padding: `0 ${GAP}px`,
              overflow: "hidden",
              position: "relative",
              height: "100%",
            }}
          >
            {/* Left/Right gradients */}
            {["left", "right"].map((p) => (
              <div
                key={p}
                style={{
                  position: "absolute",
                  [p]: 0,
                  top: 0,
                  bottom: 0,
                  width: "clamp(30px,8vw,60px)",
                  background: `linear-gradient(to ${p === "left" ? "right" : "left"},var(--bg) 25%,transparent)`,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Swipe indicator */}
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 6,
                zIndex: 20,
                background: "rgba(0,0,0,0.2)",
                padding: "4px 12px",
                borderRadius: 20,
                backdropFilter: "blur(4px)",
              }}
            >
              <span style={{ color: "var(--accent)", fontSize: 10 }}>◀</span>
              <span
                style={{ color: "var(--bg)", fontSize: 9, letterSpacing: 1 }}
              >
                SWIPE
              </span>
              <span style={{ color: "var(--accent)", fontSize: 10 }}>▶</span>
            </div>

            <div
              style={{
                overflow: "hidden",
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              {mounted && (
                <HorizontalRail
                  cards={COL1}
                  direction="left"
                  offset={0}
                  speed={0.3}
                  onHover={setActive}
                  onClick={handleCardClick}
                  activeId={activeId}
                  railIndex={0}
                />
              )}
            </div>
          </div>
        ) : (
          // Desktop: Vertical scrolling
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
            {/* Top/Bottom gradients */}
            {["top", "bottom"].map((p) => (
              <div
                key={p}
                style={{
                  position: "absolute",
                  [p]: 0,
                  left: 0,
                  right: 0,
                  height: "clamp(60px,12vh,110px)",
                  background: `linear-gradient(to ${p === "top" ? "bottom" : "top"},var(--bg) 25%,transparent)`,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
            ))}

            <div style={{ overflow: "hidden", position: "relative" }}>
              {mounted && (
                <VerticalRail
                  cards={COL1}
                  direction="up"
                  onHover={setActive}
                  onClick={handleCardClick}
                  activeId={activeId}
                  railIndex={0}
                />
              )}
            </div>
            <div style={{ overflow: "hidden", position: "relative" }}>
              {mounted && (
                <VerticalRail
                  cards={COL2}
                  direction="down"
                  offset={-380}
                  onHover={setActive}
                  onClick={handleCardClick}
                  activeId={activeId}
                  railIndex={1}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}
