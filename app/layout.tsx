import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AI PC Build Recommender Agent",
  description: "AI-powered PC build recommendation system — intelligent reasoning, decision-making, and goal-oriented planning for your perfect PC build.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-surface-950 text-zinc-300 antialiased`}>
        {children}
      </body>
    </html>
  );
}
