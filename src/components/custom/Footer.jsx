// "use client";

// const T = {
//   accent: "#a6a216",
//   accentLight: "#ebe60c",
//   accentDark: "#737017",

//   bg: "#1f1b1b",
//   card: "#2a2622",

//   text: "#fffee9",
//   textSec: "#cfcaa5",
//   muted: "#a19f8a",

//   border: "rgba(166,162,22,0.18)",
// };

// export default function Footer() {
//   return (
//     <footer
//       style={{
//         background: T.bg,
//         color: T.text,
//         padding: "80px 6vw 40px",
//         fontFamily: "'DM Sans', sans-serif",
//       }}
//     >
//       {/* TOP GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
//           gap: "40px",
//           marginBottom: "60px",
//         }}
//       >
//         {/* BRAND */}
//         <div>
//           <h2
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: "1.6rem",
//               marginBottom: "12px",
//               color: T.text,
//             }}
//           >
//             Vision9
//           </h2>

//           <p
//             style={{
//               fontSize: ".9rem",
//               lineHeight: 1.8,
//               color: T.textSec,
//             }}
//           >
//             We build brands, design experiences, and create high-impact digital
//             strategies that drive growth and engagement.
//           </p>
//         </div>

//         {/* NAVIGATION */}
//         <div>
//           <h4
//             style={{
//               fontFamily: "'Tenor Sans', sans-serif",
//               letterSpacing: ".25em",
//               fontSize: ".7rem",
//               textTransform: "uppercase",
//               color: T.accent,
//               marginBottom: "16px",
//             }}
//           >
//             Navigation
//           </h4>

//           {["Home", "About", "Services", "Case Studies", "Blogs", "Contact"].map(
//             (item, i) => (
//               <p
//                 key={i}
//                 style={{
//                   fontSize: ".9rem",
//                   marginBottom: "10px",
//                   color: T.textSec,
//                   cursor: "pointer",
//                   transition: "color .2s",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.color = T.accent)}
//                 onMouseLeave={(e) => (e.target.style.color = T.textSec)}
//               >
//                 {item}
//               </p>
//             )
//           )}
//         </div>

//         {/* SERVICES */}
//         <div>
//           <h4
//             style={{
//               fontFamily: "'Tenor Sans', sans-serif",
//               letterSpacing: ".25em",
//               fontSize: ".7rem",
//               textTransform: "uppercase",
//               color: T.accent,
//               marginBottom: "16px",
//             }}
//           >
//             Services
//           </h4>

//           {[
//             "Branding",
//             "Digital Marketing",
//             "Performance Ads",
//             "Content Strategy",
//             "Creative Design",
//           ].map((item, i) => (
//             <p
//               key={i}
//               style={{
//                 fontSize: ".9rem",
//                 marginBottom: "10px",
//                 color: T.textSec,
//               }}
//             >
//               {item}
//             </p>
//           ))}
//         </div>

//         {/* SOCIAL */}
//         <div>
//           <h4
//             style={{
//               fontFamily: "'Tenor Sans', sans-serif",
//               letterSpacing: ".25em",
//               fontSize: ".7rem",
//               textTransform: "uppercase",
//               color: T.accent,
//               marginBottom: "16px",
//             }}
//           >
//             Social
//           </h4>

//           {["Instagram", "LinkedIn", "Twitter", "YouTube"].map((item, i) => (
//             <p
//               key={i}
//               style={{
//                 fontSize: ".9rem",
//                 marginBottom: "10px",
//                 color: T.textSec,
//                 cursor: "pointer",
//                 transition: "color .2s",
//               }}
//               onMouseEnter={(e) => (e.target.style.color = T.accent)}
//               onMouseLeave={(e) => (e.target.style.color = T.textSec)}
//             >
//               {item}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* DIVIDER */}
//       <div
//         style={{
//           height: "1px",
//           background: T.border,
//           marginBottom: "30px",
//         }}
//       />

//       {/* BOTTOM BAR */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: "10px",
//           fontSize: ".8rem",
//           color: T.muted,
//         }}
//       >
//         <span>© {new Date().getFullYear()} Vision9. All rights reserved.</span>

//         <span>Designed & Developed by Vision9</span>
//       </div>
//     </footer>
//   );
// }

"use client";
import { Instagram, Facebook, Linkedin, MessageCircle, Mail } from "lucide-react";

const T = {
  accent: "#a6a216",
  accentLight: "#ebe60c",
  accentDark: "#737017",
  bg: "#1f1b1b",
  card: "#2a2622",
  text: "#fffee9",
  textSec: "#cfcaa5",
  muted: "#a19f8a",
  border: "rgba(166,162,22,0.18)",
};

// Map names to icons
const iconMap = {
  Instagram: <Instagram size={18} />,
  Facebook: <Facebook size={18} />,
  LinkedIn: <Linkedin size={18} />,
  WhatsApp: <MessageCircle size={18} />,
  "business@vision9.com": <Mail size={18} />,
};

const footerColumns = [
  {
    title: "Navigation",
    links: [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
      { name: "Clients", url: "/clients" },
      { name: "Services", url: "/services" },
      { name: "Case Studies", url: "/case_studies" },
      { name: "Blogs", url: "/blogs" },
      { name: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Case Studies",
    links: [
      { name: "kle", url: "/case_studies/Kle" },
      { name: "Leadsfinder", url: "/case_studies/Leadsfinder" },
    ],
  },
  {
    title: "Social",
    isSocial: true, // Flag to identify social column
    links: [
      { name: "Instagram", url: "https://www.instagram.com/thevision9.co" },
      { name: "Facebook", url: "https://www.facebook.com/people/Vision9/61576259486894/" },
      { name: "LinkedIn", url: "https://www.linkedin.com/company/the-vision9/" },
      { name: "WhatsApp", url: "https://wa.me/918147637913" },
      { name: "business@vision9.com", url: "mailto:business@vision9.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: T.bg,
        color: T.text,
        padding: "80px 6vw 40px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "40px",
          marginBottom: "60px",
        }}
      >
        {/* BRAND COLUMN */}
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              marginBottom: "12px",
              color: T.text,
              fontWeight: 700,
            }}
          >
            Vision<span style={{ color: T.accent }}>9</span>
          </h2>
          <p
            style={{
              fontSize: ".9rem",
              lineHeight: 1.8,
              color: T.textSec,
              maxWidth: "300px",
            }}
          >
            We build brands, design experiences, and create high impact digital
            strategies that drive growth and engagement.
          </p>
        </div>

        {/* DYNAMIC COLUMNS */}
        {footerColumns.map((col, index) => (
          <div key={index}>
            <h4
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                letterSpacing: ".25em",
                fontSize: ".7rem",
                textTransform: "uppercase",
                color: T.accent,
                marginBottom: "24px",
              }}
            >
              {col.title}
            </h4>
            
            <div style={{ display: col.isSocial ? "flex" : "block", gap: "12px", flexWrap: "wrap" }}>
              {col.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : "_self"}
                  rel={link.url.startsWith("http") ? "noopener noreferrer" : ""}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: ".9rem",
                    marginBottom: col.isSocial ? "0" : "12px",
                    color: T.textSec,
                    textDecoration: "none",
                    transition: "all .3s ease",
                    // Social specific styling
                    width: col.isSocial ? "40px" : "auto",
                    height: col.isSocial ? "40px" : "auto",
                    justifyContent: col.isSocial ? "center" : "flex-start",
                    borderRadius: col.isSocial ? "50%" : "0",
                    border: col.isSocial ? `1px solid ${T.border}` : "none",
                    background: col.isSocial ? "transparent" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = T.accent;
                    if (col.isSocial) {
                      e.currentTarget.style.borderColor = T.accent;
                      e.currentTarget.style.background = "rgba(166,162,22,0.05)";
                    } else {
                      e.currentTarget.style.transform = "translateX(5px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = T.textSec;
                    if (col.isSocial) {
                      e.currentTarget.style.borderColor = T.border;
                      e.currentTarget.style.background = "transparent";
                    } else {
                      e.currentTarget.style.transform = "translateX(0px)";
                    }
                  }}
                  title={link.name}
                >
                  {col.isSocial ? iconMap[link.name] : link.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: "1px", background: T.border, marginBottom: "30px" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          fontSize: ".8rem",
          color: T.muted,
        }}
      >
        <span>© {new Date().getFullYear()} Vision9. All rights reserved.</span>
        <span>Designed & Developed by Vision9</span>
      </div>
    </footer>
  );
}