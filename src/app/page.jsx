"use client";
import Hero from "./(Home)/Hero";
import Header from "../components/custom/Header";
import CurvedLoop from "../components/CurvedLoop";
import KeyMatrix from "./(Home)/KeyMatrix";
import ScrollVelocity from "../components/ScrollVelocity";
import HomeAbout from "./(Home)/HomeAbout";
import Branding from "./(Home)/Branding";
import WhyVision from "./(Home)/WhyVision";

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Hero />

        <div className="">
          <CurvedLoop
            marqueeText="We Make It Viral ✦"
            speed={0.9}
            curveAmount={250}
            direction="left"
            interactive
            className="custom-text-style text-black"
          />
        </div>

        <KeyMatrix />

        <ScrollVelocity
          texts={["Healthcare • Education • Real Estate • FMCG","• Hospitality • Service Brands • Astrology • ETC "]}
          velocity={100}
          className="custom-scroll-text"
        />
        <HomeAbout />
        <Branding />

        <WhyVision />
      </div>
    </>
  );
}
