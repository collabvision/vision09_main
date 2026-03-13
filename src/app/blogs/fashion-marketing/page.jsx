"use client";

import { motion } from "framer-motion";
import Header from "../../../components/custom/Header";
import Footer from "../../../components/custom/Footer";

const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentDark: "#737017",

  bg: "#fffee9",
  card: "#ffffff",

  text: "#231f1f",
  textSec: "#58564d",

  border: "rgba(115,112,23,0.20)",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <article
        style={{
          background: T.bg,
          padding: "120px 20px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* MAIN CONTAINER */}
        <div
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* HERO IMAGE */}

          <motion.img
            src="https://dummyimage.com/1400x700/231f1f/a6a216&text=Fashion+Marketing"
            alt="Fashion Marketing"
            style={{
              width: "100%",
              height: "auto",
              marginBottom: "50px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* CATEGORY */}

          <div
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              letterSpacing: ".25em",
              fontSize: ".75rem",
              textTransform: "uppercase",
              color: T.accent,
              marginBottom: "16px",
            }}
          >
            Education Marketing
          </div>

          {/* TITLE */}

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem,4vw,3.5rem)",
              lineHeight: "1.15",
              marginBottom: "30px",
              color: T.text,
            }}
          >
            How Fashion Institutes Can Attract{" "}
            <span style={{ color: T.accent }}>More Admissions</span>
          </h1>

          {/* META */}

          <p
            style={{
              color: T.textSec,
              fontSize: ".9rem",
              marginBottom: "50px",
            }}
          >
            By Vision9 · 8 min read
          </p>

          {/* INTRO */}

          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.9",
              color: T.textSec,
              marginBottom: "40px",
            }}
          >
            The education sector has changed dramatically over the past decade.
            Fashion institutes, in particular, face intense competition when it
            comes to attracting students. While many institutes still rely on
            newspaper ads and traditional promotions, these approaches rarely
            connect with modern students who spend most of their time online.
          </p>

          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.9",
              color: T.textSec,
              marginBottom: "60px",
            }}
          >
            Digital platforms have become the primary way students discover
            courses, explore campuses, and evaluate institutions. This shift
            requires a different marketing approach—one that focuses on targeted
            communication, engaging content, and clear digital funnels.
          </p>

          {/* IMAGE */}

          <img
            src="https://dummyimage.com/1200x600/f5f2c8/231f1f&text=Campus+Life"
            style={{
              width: "100%",
              margin: "60px 0",
            }}
          />

          {/* SECTION */}

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              marginBottom: "20px",
              color: T.text,
            }}
          >
            The Limitations of Traditional Advertising
          </h2>

          <p
            style={{
              lineHeight: "1.9",
              color: T.textSec,
              marginBottom: "30px",
            }}
          >
            Traditional advertising methods—such as newspaper ads or generic
            social promotions—focus primarily on visibility. However, visibility
            alone does not translate into admissions. Students today expect
            meaningful content, detailed information about courses, and real
            insight into career outcomes.
          </p>

          <p
            style={{
              lineHeight: "1.9",
              color: T.textSec,
              marginBottom: "50px",
            }}
          >
            Without targeted messaging, institutes often end up spending large
            budgets reaching audiences who have little interest in fashion
            education.
          </p>

          {/* QUOTE */}

          <div
            style={{
              borderLeft: `3px solid ${T.accent}`,
              paddingLeft: "20px",
              margin: "60px 0",
              fontStyle: "italic",
              color: T.textSec,
              fontSize: "1.1rem",
            }}
          >
            Admissions don’t close with visibility alone — they close with
            strategy, targeting, and meaningful engagement.
          </div>

          {/* IMAGE */}

          <img
            src="https://dummyimage.com/1200x600/231f1f/a6a216&text=Digital+Marketing"
            style={{
              width: "100%",
              margin: "60px 0",
            }}
          />

          {/* SECTION */}

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              marginBottom: "20px",
              color: T.text,
            }}
          >
            Building an Effective Admission Funnel
          </h2>

          <p
            style={{
              lineHeight: "1.9",
              color: T.textSec,
              marginBottom: "30px",
            }}
          >
            Successful institutes increasingly rely on digital admission funnels
            that guide prospective students through a structured journey—from
            discovery to inquiry.
          </p>

          {/* LIST */}

          <ul
            style={{
              lineHeight: "2",
              color: T.textSec,
              marginBottom: "50px",
            }}
          >
            <li>High-quality campus visuals and reels</li>
            <li>Course highlights and placement outcomes</li>
            <li>Targeted digital advertising campaigns</li>
            <li>WhatsApp-first lead generation systems</li>
            <li>Consistent social media storytelling</li>
          </ul>

          {/* FEATURE CARD */}

          <div
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              padding: "40px",
              margin: "80px 0",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                color: T.accent,
                marginBottom: "15px",
              }}
            >
              Strategic Insight
            </h3>

            <p style={{ lineHeight: "1.9", color: T.textSec }}>
              Institutes that combine engaging content with targeted advertising
              consistently outperform those relying only on broad promotions.
              When messaging reaches the right students at the right time,
              admissions naturally follow.
            </p>
          </div>

          {/* FINAL SECTION */}

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              marginBottom: "20px",
              color: T.text,
            }}
          >
            The Future of Fashion Education Marketing
          </h2>

          <p
            style={{
              lineHeight: "1.9",
              color: T.textSec,
            }}
          >
            As digital platforms continue to evolve, institutes that embrace
            modern marketing strategies will stand out in an increasingly
            competitive environment. The future of admissions lies in
            storytelling, data-driven targeting, and digital engagement.
          </p>
        </div>
      </article>
      <Footer />
    </>
  );
}
