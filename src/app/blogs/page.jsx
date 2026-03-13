"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "../../components/custom/Header";
import Footer from "../../components/custom/Footer";

/* THEME */

const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentDark: "#737017",

  bg: "#231f1f",
  card: "#2a2622",

  text: "#fffee9",
  textSec: "#cfcaa5",

  border: "rgba(166,162,22,0.18)",
};

const blogs = [
  {
    slug: "fashion-marketing",
    title: "How Fashion Institutes Can Attract More Admissions",
    desc: "A guide on digital strategies that help fashion institutes attract high-intent students.",
    img: "https://dummyimage.com/720x450/2a2622/a6a216&text=Fashion+Marketing",
  },
  {
    slug: "digital-admissions",
    title: "Why Digital Funnels Are Replacing Traditional Admissions",
    desc: "Traditional ads are losing effectiveness — here's why targeted funnels win.",
    img: "https://dummyimage.com/720x450/2a2622/a6a216&text=Digital+Funnels",
  },
  {
    slug: "meta-lead-ads",
    title: "Meta Lead Ads for Education: What Actually Works",
    desc: "Learn how targeted Meta campaigns can generate qualified admission leads.",
    img: "https://dummyimage.com/720x450/2a2622/a6a216&text=Meta+Ads",
  },
];

export default function Blogs() {
  const router = useRouter();

  return (
    <>
      <Header />
        <section
      style={{
        background: T.bg,
        padding: "120px 6vw",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* TITLE */}

      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.4rem,4vw,3.5rem)",
          marginBottom: "60px",
          color: T.text,
        }}
      >
        Latest <span style={{ color: T.accent }}>Insights</span>
      </h2>

      {/* GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "50px",
        }}
      >
        {blogs.map((blog, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div
              onClick={() => router.push(`/blogs/${blog.slug}`)}
              style={{
                cursor: "pointer",
                background: T.card,
                border: `1px solid ${T.border}`,
                overflow: "hidden",
                transition: "all .35s ease",
              }}
              className="blog-card"
            >
              {/* IMAGE */}

              <div
                style={{
                  overflow: "hidden",
                  height: "200px",
                }}
              >
                <img
                  src={blog.img}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform .5s ease",
                  }}
                  className="blog-img"
                />
              </div>

              {/* CONTENT */}

              <div style={{ padding: "28px" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: T.text,
                    fontSize: "1.35rem",
                    marginBottom: "10px",
                    lineHeight: 1.3,
                  }}
                >
                  {blog.title}
                </h3>

                <p
                  style={{
                    color: T.textSec,
                    fontSize: ".9rem",
                    lineHeight: 1.7,
                  }}
                >
                  {blog.desc}
                </p>

                {/* READ MORE */}

                <div
                  style={{
                    marginTop: "18px",
                    fontSize: ".75rem",
                    letterSpacing: ".18em",
                    color: T.accent,
                    textTransform: "uppercase",
                    fontFamily: "'Tenor Sans', sans-serif",
                  }}
                >
                  Read Article →
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .blog-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(166, 162, 22, 0.2);
        }

        .blog-card:hover .blog-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
      <Footer/>
    </>
  );
}