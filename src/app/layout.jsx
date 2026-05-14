import "./globals.css";
import localFont from 'next/font/local';
import ClientWrapper from "./ClientWrapper"; // Adjust path as needed

const causten = localFont({
  src: [{ path: '../../public/fonts/Causten-Round/Causten-Bold.otf', style: 'normal' }],
  variable: '--font-causten',
});

// ✅ Metadata works here now!
export const metadata = {
  metadataBase: new URL("https://thevision9.com"),

  title: {
    default: "Vision9 | Performance Marketing & Branding Agency",
    template: "%s | Vision9",
  },

  description:
    "Vision9 is a performance-driven marketing and branding agency helping startups and businesses grow through creative branding, social media marketing, performance campaigns, website development, and digital strategy.",

  keywords: [
    "Vision9",
    "Vision9 agency",
    "Vision9 marketing",
    "performance marketing agency",
    "branding agency",
    "digital marketing agency",
    "creative agency",
    "social media marketing",
    "website development",
    "SEO services",
    "paid ads agency",
    "startup branding",
    "marketing company",
  ],

  applicationName: "Vision9",

  authors: [
    {
      name: "Vision9",
      url: "https://thevision9.com",
    },
  ],

  creator: "Vision9",
  publisher: "Vision9",

  alternates: {
    canonical: "https://thevision9.com",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thevision9.com",
    siteName: "Vision9",

    title: "Vision9 | Performance Marketing & Branding Agency",

    description:
      "Scale your business with Vision9 — branding, marketing, websites, SEO, social media, and growth strategies.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vision9 Marketing Agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Vision9 | Performance Marketing & Branding Agency",

    description:
      "Performance-driven branding and marketing solutions for modern businesses.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],

    shortcut: ["/icon.png"],

    apple: [
      {
        url: "/icon.png",
      },
    ],
  },

  verification: {
    google: "jZD1BnYZEPCR6I7CVGHxNzRJ2pJssiv_ZjkleiOaz9c"
  },

  category: "marketing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${causten.variable} antialiased bg-[#080808]`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}