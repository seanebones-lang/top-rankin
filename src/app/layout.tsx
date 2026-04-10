import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Alegreya, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { BackToTopButton } from "@/components/BackToTopButton";
import { ChatWidget } from "@/components/ChatWidget";
import { DesktopStickyCta } from "@/components/DesktopStickyCta";
import { MobileStickyCta } from "@/components/MobileStickyCta";

const bodyFont = Alegreya({
  variable: "--font-sans",
  subsets: ["latin"],
});

const headingFont = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://toprankinherb.com",
  ),
  title: "Top Rankin' Herb",
  description:
    "Top-shelf CBD with island soul. Small-batch blends, clean ingredients, and vibes you can feel.",
  openGraph: {
    title: "Top Rankin' Herb",
    description:
      "Top-shelf CBD with island soul. Small-batch blends, clean ingredients, and vibes you can feel.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Rankin' Herb",
    description:
      "Top-shelf CBD with island soul. Small-batch blends, clean ingredients, and vibes you can feel.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <DesktopStickyCta />
        <MobileStickyCta />
        <BackToTopButton />
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
