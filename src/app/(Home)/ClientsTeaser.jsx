"use client";
import { useEffect } from "react";

const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentMid: "#d2ce12",
  accentDark: "#737017",

  bg: "#fffee9",
  bgAlt: "#f6f3c9",
  card: "#ffffff",

  text: "#231f1f",
  textSec: "#58564d",
  muted: "#a19f8a",

  border: "rgba(115,112,23,0.20)",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Tenor+Sans&family=DM+Sans:wght@200;300;400&display=swap');`;

const CSS = `
${FONTS}
/* 1. FONTS & BASE SECTION */
${FONTS}

.ct-section {
  background: ${T.bg};
  padding: clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem);
  font-family: 'DM Sans', sans-serif;
  border-top: 1px solid ${T.border};
}

/* 2. TYPOGRAPHY & HEADERS */
.ct-eyebrow {
  font-family: 'Tenor Sans', sans-serif;
  font-size: .55rem;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: ${T.accent};
  margin-bottom: .9rem;
  display: flex;
  align-items: center;
  gap: .7rem;
}

.ct-eyebrow::before, .ct-eyebrow::after {
  content: '';
  flex: 1;
  max-width: 40px;
  height: 1px;
}

.ct-eyebrow::before { background: linear-gradient(270deg, ${T.accent}, transparent); }
.ct-eyebrow::after { background: linear-gradient(90deg, ${T.accent}, transparent); }

.ct-inner {
  display: flex;
  flex-direction: column; /* Stacks text block above logo grid */
  gap: 3rem;
  align-items: flex-start;
}

.ct-h {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: clamp(1.5rem, 3.2vw, 2.8rem);
  line-height: 1.2;
  color: ${T.text};
  margin-bottom: 1rem;
}

.ct-h em {
  color: ${T.accent};
  font-style: italic;
}

.ct-p {
  font-size: clamp(.88rem, 1.4vw, 1rem);
  line-height: 1.88;
  color: ${T.textSec};
  margin-bottom: 2rem;
  max-width: 800px;
}

.ct-link {
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  font-family: 'Tenor Sans', sans-serif;
  font-size: .6rem;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: ${T.accent};
  text-decoration: none;
  transition: gap .3s;
}

.ct-link:hover { gap: 1rem; }

/* 3. LOGO GRID (FULL WIDTH) */
.ct-logos {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-left: 1px solid ${T.border};
  border-top: 1px solid ${T.border};
  margin: 0;
}

.ct-logo {
  flex: 1 0 16.66%; /* Default 6 columns */
  aspect-ratio: 1 / 1;
  border-right: 1px solid ${T.border};
  border-bottom: 1px solid ${T.border};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .3s;
  cursor: default;
  padding: 12px; /* Minimal padding to prevent crowding while maximizing logo size */
}

.ct-logo:hover {
  background: ${T.bgAlt};
}

.ct-img {
  width: 75%; /* Large enough to be clear, small enough for breathing room */
  height: 75%;
  object-fit: contain;
  filter: none; /* Keeps original brand colors */
  opacity: 1;
  transition: transform .3s cubic-bezier(.16,1,.3,1);
}

.ct-logo:hover .ct-img {
  transform: scale(1.1);
}

/* 4. ANIMATIONS */
.ct-rv {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1);
}

.ct-rv.on {
  opacity: 1;
  transform: translateY(0);
}

.ct-d1 { transition-delay: .1s; }
.ct-d2 { transition-delay: .2s; }

/* 5. RESPONSIVE BREAKPOINTS */
/* Desktop / Default (10 Columns) */
.ct-logo {
  flex: 1 0 10%; 
  aspect-ratio: 1 / 1;
  border-right: 1px solid ${T.border};
  border-bottom: 1px solid ${T.border};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .3s;
  padding: 8px; /* Slightly tighter padding for high density */
}

.ct-img {
  width: 85%; /* Larger percentage since the containers are smaller */
  height: 85%;
  object-fit: contain;
}

/* 8 Columns (Laptops/Large Tablets) */
@media(max-width: 1400px) {
  .ct-logo { flex: 1 0 12.5%; } 
}

/* 5 Columns (Tablets) */
@media(max-width: 1024px) {
  .ct-logo { flex: 1 0 20%; } 
}

/* 3 Columns (Mobile) */
@media(max-width: 600px) {
  .ct-logo { flex: 1 0 33.33%; }
  .ct-img { width: 75%; height: 75%; }
}
`;

// 1. UPDATE DATA STRUCTURE WITH IMAGE PATHS
const LOGOS = [
  { name: "Shivoham", src: "/asset/brands/camp_airtel.png" },
  { name: "Shivoham", src: "/asset/brands/camp_Amazon.png" },
  { name: "Shivoham", src: "/asset/brands/camp_ather.jpg" },
  { name: "Shivoham", src: "/asset/brands/camp_bisleri.png" },
  { name: "Shivoham", src: "/asset/brands/camp_bjp.webp" },
  { name: "Shivoham", src: "/asset/brands/camp_bmw.webp" },
  { name: "Shivoham", src: "/asset/brands/camp_boldfit.avif" },
  { name: "Shivoham", src: "/asset/brands/camp_canva.jpg" },
  { name: "Shivoham", src: "/asset/brands/camp_Cars24.png" },
  { name: "Shivoham", src: "/asset/brands/camp_DityaBirla.png" },
  { name: "Shivoham", src: "/asset/brands/camp_fevicol.jpg" },
  { name: "Shivoham", src: "/asset/brands/camp_flipkart.png" },
  { name: "Shivoham", src: "/asset/brands/camp_images.png" },
  { name: "Shivoham", src: "/asset/brands/camp_jio.png" },
  { name: "Shivoham", src: "/asset/brands/camp_lenskart.png" },
  { name: "Shivoham", src: "/asset/brands/camp_maggie.png" },
  { name: "Shivoham", src: "/asset/brands/camp_mcdonalds.png" },
  { name: "Shivoham", src: "/asset/brands/camp_myntra.png" },
  { name: "Shivoham", src: "/asset/brands/camp_nykaa.webp" },
  { name: "Shivoham", src: "/asset/brands/camp_oyo.avif" },
  { name: "Shivoham", src: "/asset/brands/camp_puma.png" },
  { name: "Shivoham", src: "/asset/brands/camp_rapido.webp" },
  { name: "Shivoham", src: "/asset/brands/camp_sofy.jpg" },
  { name: "Shivoham", src: "/asset/brands/camp_tata.webp" },
  { name: "Shivoham", src: "/asset/brands/camp_vantara.jpg" },
  { name: "Shivoham", src: "/asset/brands/camp_whisper.png" },
  { name: "Shivoham", src: "/asset/brands/camp_openai.png" },
];

export default function ClientsTeaser() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".ct-rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="ct-section">
      <style>{CSS}</style>
      <div className="ct-eyebrow ct-rv">Clients &amp; Experience</div>

      <div className="ct-inner">
        {/* TEXT CONTENT (Top Block) */}
        <div className="ct-rv ct-d1" style={{ maxWidth: "800px" }}>
          <h2 className="ct-h">
           Big Brands Bigger Campaigns <em>across India</em>
          </h2>
          <p className="ct-p">
            We’ve executed campaigns for some of the biggest brands in the
            country.
          </p>
          <a
            href="/clients"
            className="ct-link"
            style={{ marginBottom: "2rem" }}
          >
            Explore Our Clients →
          </a>
        </div>

        {/* LOGO GRID (Bottom Block - Now Full Width) */}
        <div className="ct-logos ct-rv ct-d2">
          {LOGOS.map((l, i) => (
            <div key={i} className="ct-logo" title={l.name}>
              {l.src ? (
                <img src={l.src} alt={l.name} className="ct-img" />
              ) : (
                <span
                  style={{
                    fontFamily: "'Tenor Sans', sans-serif",
                    fontSize: ".5rem",
                    color: T.muted,
                    textAlign: "center",
                  }}
                >
                  {l.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
