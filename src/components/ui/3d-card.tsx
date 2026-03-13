"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

/* ═══════════════════════════════════════
   THEME
═══════════════════════════════════════ */

const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentDark: "#737017",

  card: "#2a2622",
  border: "rgba(166,162,22,0.18)",
  glow: "rgba(166,162,22,0.25)",

  text: "#fffee9",
};

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

/* ═══════════════════════════════════════
   CARD CONTAINER
═══════════════════════════════════════ */

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;

    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;

    setIsMouseEntered(false);

    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-16 flex items-center justify-center",
          containerClassName
        )}
        style={{ perspective: "1200px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative transition-transform duration-300 ease-out",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

/* ═══════════════════════════════════════
   CARD BODY
═══════════════════════════════════════ */

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isMouseEntered] = useMouseEnter();

  return (
    <div
      className={cn("h-[420px] w-[360px] relative", className)}
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        transformStyle: "preserve-3d",
        transition: "all .35s ease",
        boxShadow: isMouseEntered
          ? `0 30px 80px ${T.glow}`
          : "0 10px 30px rgba(0,0,0,0.35)",
      }}
    >
      {/* Hover accent overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(120deg, transparent, ${T.glow}, transparent)`,
          opacity: isMouseEntered ? 0.25 : 0,
          transition: "opacity .35s ease",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   CARD ITEM
═══════════════════════════════════════ */

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;

    if (isMouseEntered) {
      ref.current.style.transform = `
        translateX(${translateX}px)
        translateY(${translateY}px)
        translateZ(${translateZ}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
      `;
    } else {
      ref.current.style.transform = `
        translateX(0px)
        translateY(0px)
        translateZ(0px)
        rotateX(0deg)
        rotateY(0deg)
        rotateZ(0deg)
      `;
    }
  }, [isMouseEntered]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-transform duration-300 ease-out",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* ═══════════════════════════════════════
   CONTEXT HOOK
═══════════════════════════════════════ */

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);

  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }

  return context;
};