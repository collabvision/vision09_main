import "./globals.css";
import localFont from 'next/font/local';
import ClientWrapper from "./ClientWrapper"; // Adjust path as needed

const causten = localFont({
  src: [{ path: '../../public/fonts/Causten-Round/Causten-Bold.otf', style: 'normal' }],
  variable: '--font-causten',
});

// ✅ Metadata works here now!
export const metadata = {
  title: "Vision9",
  icons: {
    icon: "/icon.png"
  },
  description: "Vision9 is a performance driven marketing and branding agency.",
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