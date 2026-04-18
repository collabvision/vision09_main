"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

/* THEME */
const T = {
  accent: "#a6a216",
  bg: "#231f1f",
  card: "#2a2622",
  text: "#fffee9",
  muted: "#a19f8a",
  border: "rgba(166,162,22,0.18)",
};

/* CLIENTS */

const companies = Array.from({ length: 39 }, (_, i) => i + 4)
  .filter((num) => num !== 15)
  .map((num) => ({
    name: "Shivoham",
    img: `/asset/brands/imgSet/${num}.png`,
  }));

const firstRow = companies.slice(0, companies.length / 2);
const secondRow = companies.slice(companies.length / 2);

/* CARD */

const CompanyCard = ({ img, name }) => {
  return (
    <figure
      className={cn(
        "relative w-80 h-80 cursor-pointer overflow-hidden border transition-all duration-300"
      )}
      style={{
        background: T.card,
        borderColor: T.border,
      }}
    >
      {/* IMAGE */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={img}
          // alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* TITLE */}
      {/* <figcaption
        style={{
          fontFamily: "'Playfair Display', serif",
          color: T.text,
          fontSize: "1.1rem",
          padding: "16px",
          textAlign: "center",
        }}
      >
        {name}
      </figcaption> */}
    </figure>
  );
};

/* COMPONENT */

export default function Companies() {
  return (
    <section
      style={{
        background: T.bg,
        padding: "120px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">

        <Marquee pauseOnHover className="mb-4 [--duration:20s]">
          {firstRow.map((company) => (
            <CompanyCard key={company.name} {...company} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((company) => (
            <CompanyCard key={company.name} {...company} />
          ))}
        </Marquee>

        {/* GRADIENT EDGES */}

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4"
          style={{
            background:
              "linear-gradient(to right, #231f1f, transparent)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/4"
          style={{
            background:
              "linear-gradient(to left, #231f1f, transparent)",
          }}
        />
      </div>
    </section>
  );
}