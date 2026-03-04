"use client";
import Hero from "./(Home)/Hero";
import Header from "../components/custom/Header";
import CurvedLoop from "../components/CurvedLoop";

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
       
      </div>
    </>
  );
}
