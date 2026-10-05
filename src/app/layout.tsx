import type { Metadata, Viewport } from "next";
import { display, body } from "./fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { cn } from "@/lib/utils";
import ScrollProgress from "@/components/ScrollProgress";
import NadscaAI from "@/components/ai/NadscaAI";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFDFE" },
    { media: "(prefers-color-scheme: dark)", color: "#07090E" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nadsca.dev"),
  title: "NADSCA — We Engineer Software for What's Next",
  description:
    "Founded in 2026, NADSCA is a software engineering company focused on building intelligent, scalable, and practical software solutions for modern businesses.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "NADSCA — We Engineer Software for What's Next",
    description:
      "Intelligent, scalable, and practical software solutions for modern businesses. Custom software, enterprise systems, and AI-driven automation.",
    url: "https://nadsca.dev",
    siteName: "NADSCA",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NADSCA — We Engineer Software for What's Next",
    description:
      "Intelligent, scalable, and practical software solutions for modern businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('nadsca_theme') || localStorage.getItem('natle_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  if (sessionStorage.getItem('nadsca_preloader_seen') || sessionStorage.getItem('natle_preloader_seen')) {
                    document.documentElement.classList.add('preloader-seen');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical Anti-FOUC Styles */
              html.dark { background-color: #07090E; color: #F8FAFC; color-scheme: dark; }
              html:not(.dark) { background-color: #FCFDFE; color: #0A0A0A; color-scheme: light; }
              html.preloader-seen #preloader-wrapper { display: none !important; }
              .sr-only { position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border-width: 0 !important; }
              #preloader-wrapper { position: fixed; inset: 0; z-index: 99999; }
            `,
          }}
        />
      </head>
      <body className="font-body bg-paper text-ink selection:bg-primary/20 selection:text-primary flex flex-col min-h-screen antialiased overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100000] focus:px-4 focus:py-2 focus:bg-azure focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>
        <NoiseOverlay />
        <Preloader />
        <ScrollProgress />

        <SmoothScroll>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col outline-none">
            {children}
          </main>
          <Footer />
        </SmoothScroll>

        <NadscaAI />
      </body>
    </html>
  );
}
