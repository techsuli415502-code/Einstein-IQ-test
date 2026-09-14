import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeaderboardAd } from "@/components/adsterra-ad";
import { AnchorAd } from "@/components/anchor-ad";
import { GoogleAnalyticsHead } from "@/components/google-analytics";
import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Free Online Einstein IQ Test and Reasoning Quiz`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Einstein IQ Test",
    "IQ Test",
    "Free IQ Test",
    "Online IQ Test",
    "IQ Quiz",
    "Intelligence Test",
    "Logical Reasoning Test",
    "Pattern Recognition Test",
    "Problem Solving Test",
    "Cognitive Skills",
    "Analytical Thinking",
    "Online Intelligence Quiz",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Free Online Einstein IQ Test | Logical Reasoning Quiz",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} free online IQ quiz`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Einstein IQ Test | Logical Reasoning Quiz",
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        rel: "icon",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        rel: "icon",
      },
      // Microsoft tile icon for Windows Start menu pin.
      {
        url: "/mstile-144x144.png",
        sizes: "144x144",
        type: "image/png",
        rel: "msapplication-TileImage",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "Education",
};

export const viewport: Viewport = {
  themeColor: "#0F766E",
  width: "device-width",
  initialScale: 1,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Organization schema with logo. Google uses this to display a logo
// next to the URL in search results and in the knowledge panel.
// See: https://developers.google.com/search/docs/appearance/structured-data/logo
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: siteConfig.logo,
  image: siteConfig.logo,
  description: siteConfig.description,
  email: siteConfig.contactEmail,
  sameAs: [],
};

// WebPage schema for the homepage with publisher reference.
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Online Einstein IQ Test | Logical Reasoning Quiz",
  url: siteConfig.url,
  description: siteConfig.description,
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: siteConfig.logo,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 snippet in <head> for Search Console verification. */}
        <GoogleAnalyticsHead />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <SiteHeader />
        {/* Top leaderboard ad (desktop only). Sits between header and main content. */}
        <div className="border-b border-border/60 bg-secondary/30 py-3">
          <LeaderboardAd />
        </div>
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {/* Sticky bottom anchor ad. Fixed to viewport, dismissible per session. */}
        <AnchorAd />
        <Toaster />
        {/* Structured data for Google search: WebSite + Organization + WebPage.
            The Organization schema with a logo field is what tells Google
            which image to show as the site's logo in search results. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      </body>
    </html>
  );
}
