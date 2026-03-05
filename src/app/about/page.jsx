"use client"
import { useEffect } from "react";
import "./Vision9About.css"
import Header from "../../components/custom/Header";
export default function Vision9About() {

  useEffect(() => {

    // CURSOR
    const cursor = document.getElementById("cursor");

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", moveCursor);

    const hoverElements = document.querySelectorAll(
      "a, button, .diff-item, .founder-card, .vm-card"
    );

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("big"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
    });

    // SCROLL REVEAL
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };

  }, []);

  return (
    <>
      <div id="cursor"></div>

      {/* NAV */}
      {/* <nav>
        <a href="#" className="nav-logo">
          VISION<span>9</span>
        </a>
        <span className="nav-tag">About Us</span>
      </nav> */}
          <Header/>

      {/* HERO */}
      <section className="hero">

        <p className="hero-eyebrow">
          Strategic Marketing & Brand Communication
        </p>

        <h1 className="hero-title">
          <span className="line">WHO</span>
          <span className="line">WE</span>
          <span className="line">ARE</span>
        </h1>

        <p className="hero-sub">
          In a space where everyone is creating content, we focus on building
          systems that convert—combining strategy, creativity, performance
          marketing, and execution to deliver real business impact.
        </p>

        <div className="hero-badge">
          <div className="year">2024</div>
          <div className="founded">Est. · Pune, India</div>
        </div>

        {/* ticker */}
        <div className="ticker-wrap">
          <div className="ticker-track">

            <div className="ticker-item">
              STRATEGY <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              BRANDING <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              PERFORMANCE MARKETING <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              CONTENT SYSTEMS <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              GROWTH <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              SOCIAL MEDIA <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              INFLUENCER MARKETING <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              WEBSITE DESIGN <span className="ticker-dot"></span>
            </div>

            {/* duplicate */}
            <div className="ticker-item">
              STRATEGY <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              BRANDING <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              PERFORMANCE MARKETING <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              CONTENT SYSTEMS <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              GROWTH <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              SOCIAL MEDIA <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              INFLUENCER MARKETING <span className="ticker-dot"></span>
            </div>

            <div className="ticker-item">
              WEBSITE DESIGN <span className="ticker-dot"></span>
            </div>

          </div>
        </div>

      </section>

      {/* STORY */}

      <section className="story">

        <div className="story-left reveal">
          <p className="section-label">01 — Our Story</p>
          <div className="story-number">01</div>

          <h2 className="story-heading">
            Marketing should drive <em>results,</em> not just visibility.
          </h2>
        </div>

        <div className="story-right">

          <p className="story-body reveal reveal-delay-1">
            Founded in early 2024 by Om Shetti, Sanyam Kalmani, and Murad
            Madarsha, Vision9 was created with a simple belief — marketing
            should drive results, not just visibility.
          </p>

          <p className="story-body reveal reveal-delay-2">
            What began as a focused creative collaboration quickly evolved into
            a structured agency built on original thinking, trend awareness,
            and performance-driven execution.
          </p>

          <p className="story-body reveal reveal-delay-3">
            Vision9 works as an extended marketing partner, aligning every
            campaign and creative decision with clearly defined growth
            objectives.
          </p>

        </div>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <div className="cta-bg-text">VISION9</div>

        <p className="cta-eyebrow reveal">Ready to grow?</p>

        <h2 className="cta-headline reveal reveal-delay-1">
          Let's Build Brands That <em>Perform</em>
        </h2>

        <p className="cta-sub reveal reveal-delay-2">
          Partner with Vision9 to move from ideas to execution — and from
          execution to measurable growth.
        </p>

        <div className="cta-buttons reveal reveal-delay-3">

          <a href="#" className="btn-primary">
            BOOK A STRATEGY CALL
          </a>

          <a href="#" className="btn-secondary">
            CONTACT US
          </a>

        </div>

      </section>
    </>
  );
}