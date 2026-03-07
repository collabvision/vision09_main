"use client";
import StaggeredMenu from "../StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Clients", ariaLabel: "View our clients", link: "/client" },
  { label: "Services", ariaLabel: "View our services", link: "/services" },

  {
    label: "Case Studies",
    ariaLabel: "View our case studies",
    link: "/case_studies",
  },
  { label: "Blogs", ariaLabel: "Read our blogs", link: "/blogs" },
  { label: "Contacts", ariaLabel: "Get in touch with us", link: "/contact" }
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

const Header = () => {
  return (
    <div
      style={{
        height: "4rem",
        background: "transparent",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
            background: "var(--sm-bg, rgba(255, 255, 255, 0.8))",

          height: "100%",
          pointerEvents: "auto",
        }}
      >
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="transparent"
          openMenuButtonColor="#080808"
          changeMenuColorOnOpen={true}
          colors={["#A8832A", "#A8832A"]}
          logoUrl="/vision9-logo.svg"
          accentColor="#A8832A"
          onMenuOpen={() => console.log("Menu opened")}
          onMenuClose={() => console.log("Menu closed")}
          // Custom styling for menu items
          menuItemStyle={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(0.5rem, 4vw, 2.5rem)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#080808",
          }}
          // Custom styling for social items
          socialItemStyle={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#5A5A5A",
          }}
          // Custom styling for the menu panel
          menuPanelStyle={{
            background: "#FAF8F2",
            borderLeft: "1px solid rgba(168,131,42,0.20)",
            backdropFilter: "blur(10px)",
          }}
        />
      </div>
    </div>
  );
};

export default Header;
