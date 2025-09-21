import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { OceanWaves } from "@/components/ocean-waves";
import { TopBar } from "@/components/top-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChatButton } from "@/components/chat/chat-button";
import "./globals.css";
import Script from "next/script";

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
  const themeCookie = cookies().get("theme")?.value;
  const themeClass = themeCookie === "dark" ? "dark" : "";
  return (
    <html
      lang="en"
      className={`${inter.variable} ${themeClass}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen bg-white dark:bg-black relative">
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function(){
            try {
              var saved = localStorage.getItem('theme');
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var theme = saved || (prefersDark ? 'dark' : 'light');
              if (theme === 'dark') document.documentElement.classList.add('dark');
            } catch(_) {}
          })();
        `}</Script>
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
