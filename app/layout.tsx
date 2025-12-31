import type { Metadata } from "next";
import { JetBrains_Mono, Rubik_Glitch } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const rubikGlitch = Rubik_Glitch({
  variable: "--font-glitch",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Street Code Chronicles",
  description: "100 Days. 100 Commits. No Cap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrains.variable} ${rubikGlitch.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
