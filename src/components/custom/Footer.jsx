"use client";

const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentDark: "#737017",

  bg: "#1f1b1b",
  card: "#2a2622",

  text: "#fffee9",
  textSec: "#cfcaa5",
  muted: "#a19f8a",

  border: "rgba(166,162,22,0.18)",
};

export default function Footer() {
  return (
    <footer
      style={{
        background: T.bg,
        color: T.text,
        padding: "80px 6vw 40px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* TOP GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "40px",
          marginBottom: "60px",
        }}
      >
        {/* BRAND */}
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              marginBottom: "12px",
              color: T.text,
            }}
          >
            Vision9
          </h2>

          <p
            style={{
              fontSize: ".9rem",
              lineHeight: 1.8,
              color: T.textSec,
            }}
          >
            We build brands, design experiences, and create high-impact digital
            strategies that drive growth and engagement.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              letterSpacing: ".25em",
              fontSize: ".7rem",
              textTransform: "uppercase",
              color: T.accent,
              marginBottom: "16px",
            }}
          >
            Navigation
          </h4>

          {["Home", "About", "Services", "Case Studies", "Blogs", "Contact"].map(
            (item, i) => (
              <p
                key={i}
                style={{
                  fontSize: ".9rem",
                  marginBottom: "10px",
                  color: T.textSec,
                  cursor: "pointer",
                  transition: "color .2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = T.accent)}
                onMouseLeave={(e) => (e.target.style.color = T.textSec)}
              >
                {item}
              </p>
            )
          )}
        </div>

        {/* SERVICES */}
        <div>
          <h4
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              letterSpacing: ".25em",
              fontSize: ".7rem",
              textTransform: "uppercase",
              color: T.accent,
              marginBottom: "16px",
            }}
          >
            Services
          </h4>

          {[
            "Branding",
            "Digital Marketing",
            "Performance Ads",
            "Content Strategy",
            "Creative Design",
          ].map((item, i) => (
            <p
              key={i}
              style={{
                fontSize: ".9rem",
                marginBottom: "10px",
                color: T.textSec,
              }}
            >
              {item}
            </p>
          ))}
        </div>

        {/* SOCIAL */}
        <div>
          <h4
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              letterSpacing: ".25em",
              fontSize: ".7rem",
              textTransform: "uppercase",
              color: T.accent,
              marginBottom: "16px",
            }}
          >
            Social
          </h4>

          {["Instagram", "LinkedIn", "Twitter", "YouTube"].map((item, i) => (
            <p
              key={i}
              style={{
                fontSize: ".9rem",
                marginBottom: "10px",
                color: T.textSec,
                cursor: "pointer",
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = T.accent)}
              onMouseLeave={(e) => (e.target.style.color = T.textSec)}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div
        style={{
          height: "1px",
          background: T.border,
          marginBottom: "30px",
        }}
      />

      {/* BOTTOM BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          fontSize: ".8rem",
          color: T.muted,
        }}
      >
        <span>© {new Date().getFullYear()} Vision9. All rights reserved.</span>

        <span>Designed & Developed by Vision9</span>
      </div>
    </footer>
  );
}