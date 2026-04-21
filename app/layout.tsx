import "@/app/styles/globals.css";
import Header from "./components/header/Header";
import { UIProvider } from "./context/UIContext";
import Script from "next/script";
import { Press_Start_2P } from "next/font/google";
import type { ReactNode } from "react";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-retro",
});

const SITE_URL = "https://luigisimiani.com";
const SITE_NAME = "Luigi Simiani";
const SITE_DESCRIPTION =
  "Portfolio of Luigi Simiani, a professional photographer based in Amsterdam specializing in fashion, editorial, and commercial photography.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luigi Simiani",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Luigi Simiani",
    "photographer Amsterdam",
    "fashion photography",
    "editorial photography",
    "commercial photography",
    "portrait photography",
    "Amsterdam photographer",
    "professional photography",
    "photography portfolio",
  ],
  authors: [{ name: "Luigi Simiani", url: SITE_URL }],
  creator: "Luigi Simiani",
  publisher: "Luigi Simiani",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Luigi Simiani",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luigi Simiani Photography Portfolio",
      },
    ],
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  verification: {
    google: "N8PEBDygSlA7Cu6s0FGBYKH5vbLXKQyw3j9GBT_zJZQ",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "black",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luigi Simiani",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  jobTitle: "Professional Photographer",
  worksFor: {
    "@type": "Organization",
    name: SITE_NAME,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amsterdam",
    addressCountry: "NL",
  },
  sameAs: [
    // Add social media profiles when available
    "https://instagram.com/goombasteppa",
  ],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={pressStart2P.variable}>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <UIProvider>
          <Header />
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
