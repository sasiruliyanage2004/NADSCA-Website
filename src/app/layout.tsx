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
  title: {
    default: "NADSCA — We Engineer Software for What's Next",
    template: "%s | NADSCA",
  },
  description:
    "Founded in 2026, NADSCA is a software engineering company focused on building intelligent, scalable, and practical software solutions for modern businesses. Custom enterprise systems, cloud platforms, and AI automation.",
  keywords: [
    "NADSCA",
    "software engineering",
    "enterprise software",
    "AI systems",
    "cloud architecture",
    "Sri Lanka tech company",
    "HRMS platform",
    "predictive retail POS",
    "computer vision security",
    "digital transformation",
    "full-stack engineering",
  ],
  authors: [{ name: "NADSCA Engineering Team", url: "https://nadsca.dev" }],
  creator: "NADSCA",
  publisher: "NADSCA",
  alternates: {
    canonical: "/",
  },
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NADSCA — We Engineer Software for What's Next",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NADSCA — We Engineer Software for What's Next",
    description:
      "Intelligent, scalable, and practical software solutions for modern businesses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nadsca.dev/#organization",
      "name": "NADSCA",
      "url": "https://nadsca.dev",
      "logo": "https://nadsca.dev/logo-stacked-dark.png",
      "description":
        "NADSCA is a software engineering company focused on building intelligent, scalable, and practical software solutions for modern businesses.",
      "foundingDate": "2026",
      "sameAs": [
        "https://www.linkedin.com/company/nadsca",
        "https://github.com/nadsca"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "#16/17, “White Whales”, Malalage Mawatha, Dharmarama Road, Malamulla West",
        "addressLocality": "Panadura",
        "addressCountry": "LK"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+94 76 538 3500",
        "contactType": "customer service",
        "email": "info@nadsca.com",
        "availableLanguage": ["English", "Sinhala"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://nadsca.dev/#website",
      "url": "https://nadsca.dev",
      "name": "NADSCA",
      "publisher": { "@id": "https://nadsca.dev/#organization" },
      "inLanguage": "en-US"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Googlebot Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('dark');
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
