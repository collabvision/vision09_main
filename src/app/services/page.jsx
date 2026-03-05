"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../../components/custom/Header";

const col1 = [
  { label: "BRANDING", bg: "#aaee22", color: "#000", tall: true },
  { label: "PITCH\nDECKS", bg: "#0a0a0a", color: "#fff", tall: true },
  { label: "BRANDING", bg: "#aaee22", color: "#000", tall: false },
  { label: "INFLUENCER\nMARKETING", bg: "#0a0a0a", color: "#fff", tall: true },
  { label: "LOGO\nDESIGN", bg: "#aaee22", color: "#000", tall: false },
  { label: "PACKAGING\nDESIGN", bg: "#0a0a0a", color: "#fff", tall: true },
];

const col2 = [
  { label: "BRANDING", bg: "#aaee22", color: "#000", tall: true },
  { label: "PITCH\nDECKS", bg: "#0a0a0a", color: "#fff", tall: true },
  { label: "BRANDING", bg: "#aaee22", color: "#000", tall: false },
  { label: "INFLUENCER\nMARKETING", bg: "#0a0a0a", color: "#fff", tall: true },
  { label: "LOGO\nDESIGN", bg: "#aaee22", color: "#000", tall: false },
  { label: "PACKAGING\nDESIGN", bg: "#0a0a0a", color: "#fff", tall: true },
];

const GAP = 8;

function Rail({ cards, direction, initialOffset = 0, onHover }) {
  const innerRef = useRef(null);
  const posRef = useRef(initialOffset);
  const loopRef = useRef(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => {
      let h = 0;
      for (let i = 0; i < cards.length; i++) {
        h += el.children[i]?.getBoundingClientRect().height ?? 0;
      }
      h += GAP * (cards.length - 1);
      loopRef.current = h;
    };

    // two frames to let layout settle
    let raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        measure();
        const SPEED = 0.55;

        const tick = () => {
          if (direction === "up") {
            posRef.current -= SPEED;
            if (posRef.current <= -loopRef.current)
              posRef.current += loopRef.current;
          } else {
            posRef.current += SPEED;
            if (posRef.current >= 0) posRef.current -= loopRef.current;
          }
          if (el) el.style.transform = `translateY(${posRef.current}px)`;
          raf = requestAnimationFrame(tick);
        };
        tick();
      }),
    );

    return () => cancelAnimationFrame(raf);
  }, [cards, direction]);

  const all = [...cards, ...cards, ...cards];

  return (
    <div
      ref={innerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        gap: GAP,
        willChange: "transform",
        transform: `translateY(${initialOffset}px)`,
      }}
    >
      {all.map((svc, i) => (
        <div
          key={i}
          onMouseEnter={() => svc.label && onHover?.(svc.label)}
          style={{
            background: svc.bg,
            aspectRatio: svc.tall ? "4/5" : "5/3",
            display: "flex",
            alignItems: "flex-end",
            padding: "clamp(0.7rem, 2.5vw, 1.4rem)",
            cursor: "pointer",
            flexShrink: 0,
            transition: "filter 0.2s, transform 0.2s",
          }}
        >
          {svc.label && (
            <span
              style={{
                //   fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(0.95rem, 3.2vw, 2rem)",
                letterSpacing: "0.04em",
                lineHeight: 1.05,
                whiteSpace: "pre-line",
                color: svc.color,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {svc.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ServicesAnimation() {
  const [active, setActive] = useState("BRANDING");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; overflow: hidden; background: #fff; }
      `}</style>
      <Header />
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Label — hidden on mobile via media query workaround */}
        <div
          style={{
            width: "clamp(0px, 32%, 340px)",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 5vw",
            background: "#fff",
            zIndex: 20,
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#aaa",
              marginBottom: "0.4rem",
            }}
          >
            What we do
          </p>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
              lineHeight: 0.92,
              color: "#0a0a0a",
            }}
          >
            {active.replace(/\n/g, " ")}
          </h1>
        </div>

        {/* Rails */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            padding: "0 8px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* top/bottom fades */}
          {["top", "bottom"].map((pos) => (
            <div
              key={pos}
              style={{
                position: "absolute",
                [pos]: 0,
                left: 0,
                right: 0,
                height: "clamp(50px, 10vh, 100px)",
                background: `linear-gradient(to ${pos === "top" ? "bottom" : "top"}, #fff 20%, transparent)`,
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Rail 1 — UP */}
          <div style={{ overflow: "hidden", position: "relative" }}>
            <Rail
              cards={col1}
              direction="up"
              initialOffset={0}
              onHover={setActive}
            />
          </div>

          {/* Rail 2 — DOWN */}
          <div style={{ overflow: "hidden", position: "relative" }}>
            <Rail
              cards={col2}
              direction="down"
              initialOffset={-999}
              onHover={setActive}
            />
          </div>
        </div>
      </div>
    </>
  );
}
