import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dammy Cuts | Book your cut",
  description:
    "Barber shop visits and home service in Owerri. Pick a time, pay a small deposit, and your chair is locked in.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>
        <noscript>
          <style>{`[data-hero],[data-scene],.lp-rv,.lp-card{opacity:1!important;transform:none!important}.lp-wi{transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
