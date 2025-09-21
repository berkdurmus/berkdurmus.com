import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OceanWaves } from "@/components/ocean-waves";
import { TopBar } from "@/components/top-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChatButton } from "@/components/chat/chat-button";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Berk Durmuş",
  description:
    "Builder, Product Engineer, and Protector of Earth from LLM Invasion",
  openGraph: {
    title: "Berk Durmuş",
    description:
      "Builder, Product Engineer, and Protector of Earth from LLM Invasion",
    url: "https://berkdurmus.com",
    siteName: "Berk Durmuş",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berk Durmuş",
    description:
      "Builder, Product Engineer, and Protector of Earth from LLM Invasion",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen bg-white dark:bg-black relative">
        {/* Top social bar with scroll-aware visibility */}
        <TopBar />
        <ThemeToggle />
        <ChatButton />
        <OceanWaves />
        <div className="fixed inset-0 -z-20 h-full w-full bg-white dark:bg-black">
          {/* <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div> */}
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
