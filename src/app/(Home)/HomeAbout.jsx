"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  IconTargetArrow,
  IconPalette,
  IconRocket,
  IconUsers,
  IconHierarchy3,
  IconTrendingUp,
  IconNews,
  IconChartBar,
} from "@tabler/icons-react";
import SplitText from "../../components/SplitText";

const HomeAbout = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
<div className="flex flex-col mt-10 items-center justify-center py-10">
      <SplitText
        text="About Us"
        className="text-7xl px-4 ml-7  font-semibold text-center"
        delay={50}
        duration={1.25}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
        showCallback
      />{" "}
      <FeaturesSectionDemo />
    </div>
  );
};

export default HomeAbout;

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Strategic Marketing",
      description:
        "We develop data-driven marketing strategies that align with your brand goals and drive measurable growth.",
      icon: <IconTargetArrow />,
    },
    {
      title: "Creative Brand Design",
      description:
        "Our team creates impactful visuals, branding, and digital experiences that capture attention and build strong brand identity.",
      icon: <IconPalette />,
    },
    {
      title: "Performance Campaigns",
      description:
        "Every campaign is designed with performance in mind—focused on generating leads, engagement, and real business results.",
      icon: <IconRocket />,
    },
    {
      title: "Influencer & Creator Network",
      description:
        "Access our pan-India network of influencers and creators to amplify your brand’s reach and credibility.",
      icon: <IconUsers />,
    },
    {
      title: "Integrated Marketing Solutions",
      description:
        "From digital campaigns to PR and social media management, we deliver complete marketing solutions under one roof.",
      icon: <IconHierarchy3 />,
    },
    {
      title: "Growth-Focused Partnerships",
      description:
        "We work as your extended marketing team, supporting your brand with strategic insights and continuous optimization.",
      icon: <IconTrendingUp />,
    },
    {
      title: "Media & PR Reach",
      description:
        "Get featured across national and international media platforms with strategic PR and publication campaigns.",
      icon: <IconNews />,
    },
    {
      title: "Data & Performance Insights",
      description:
        "We track performance across campaigns and channels to deliver clear insights and maximize ROI.",
      icon: <IconChartBar />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
