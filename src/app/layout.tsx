import type { Metadata } from "next";
import "@/index.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "RealBet VIP Hub — Season 1",
  description:
    "RealBet VIP Hub - Season 1 competition. Earn REAL Points, climb the leaderboard, collect badges.",
  openGraph: {
    type: "website",
    title: "RealBet VIP Hub — Season 1",
    description:
      "RealBet VIP Hub - Season 1 competition. Earn REAL Points, climb the leaderboard, collect badges.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RealBet VIP Hub — Season 1",
    description:
      "RealBet VIP Hub - Season 1 competition. Earn REAL Points, climb the leaderboard, collect badges.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
