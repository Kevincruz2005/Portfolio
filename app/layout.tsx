import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Kevin Cruz | Systems Engineer",
  description: "Terminal-styled portfolio of Kevin Cruz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased bg-[#0c0c0c] text-green-400 font-mono selection:bg-green-500/30 selection:text-green-100`}
      >
        <div className="scanlines opacity-10"></div>
        {children}
      </body>
    </html>
  );
}
