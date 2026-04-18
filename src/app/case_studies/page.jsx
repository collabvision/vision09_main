"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Header from "@/components/custom/Header";
import Footer from "../../components/custom/Footer";
/* ═══════════════════════════════════════════════════
   DARK THEME
═══════════════════════════════════════════════════ */

const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentMid: "#d2ce12",
  accentDark: "#737017",

  bg: "#231f1f",
  bgAlt: "#2a2622",
  card: "#2a2622",

  text: "#fffee9",
  textSec: "#cfcaa5",
  muted: "#a19f8a",

  border: "rgba(166,162,22,0.18)",

  dark: "#231f1f",
  darkText: "#fffee9",
};

const caseStudies = [
  {
    slug: "Kle",
    title: "Closing Admissions in 30 Days",
    desc: "Vision9 helped KLE Institute fill all 40 seats within one month through a focused digital admission funnel and WhatsApp lead strategy.",
    img: "asset/caseStudy/CS1/main.png",
  },
    {
    slug: "Leadsfinder",
    title: "Closing Admissions in 30 Days",
    desc: "Vision9 helped KLE Institute fill all 40 seats within one month through a focused digital admission funnel and WhatsApp lead strategy.",
    img: "asset/caseStudy/CS1/main.png",
  }
];

export default function CaseStudies() {
  const router = useRouter();

  return (
    <>
      <Header />
       <section
      style={{
        background: T.bg,
        minHeight: "100vh",
        padding: "120px 6vw",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* TITLE */}
      <motion.h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.5rem,5vw,4rem)",
          color: T.text,
          marginBottom: "4rem",
          letterSpacing: "-.01em",
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our <em style={{ color: T.accent }}>Case Studies</em>
      </motion.h1>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
          gap: "60px",
        }}
      >
        {caseStudies.map((item, i) => (
          <CardContainer key={i}>
            <CardBody
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                padding: "0",
                overflow: "hidden",
              }}
            >
              {/* IMAGE */}
              <CardItem translateZ="60">
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                  }}
                />
              </CardItem>

              <div style={{ padding: "30px" }}>
                {/* TITLE */}
                <CardItem translateZ="50">
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.4rem",
                      color: T.text,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                </CardItem>

                {/* DESCRIPTION */}
                <CardItem translateZ="60">
                  <p
                    style={{
                      color: T.textSec,
                      marginTop: "12px",
                      fontSize: ".9rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </CardItem>

                {/* BUTTON */}
                <CardItem translateZ="80">
                  <button
                    onClick={() =>
                      router.push(`/case_studies/${item.slug}`)
                    }
                    style={{
                      marginTop: "22px",
                      background: T.accent,
                      color: T.darkText,
                      border: "none",
                      padding: "11px 20px",
                      fontSize: ".75rem",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = T.accentDark)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = T.accent)
                    }
                  >
                    View Case Study
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
      </section>
      <Footer />
    </>
  );
}