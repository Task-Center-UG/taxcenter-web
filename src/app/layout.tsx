import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import TanStackProvider from "@/providers/tanstack-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tax Center Gunadarma | Edukasi dan Pelayanan Perpajakan",
    template: "%s | Tax Center Gunadarma",
  },
  description:
    "Tax Center Gunadarma merupakan pusat edukasi, pelatihan, riset, dan pelayanan perpajakan untuk sivitas akademika dan masyarakat.",
  applicationName: "Tax Center Gunadarma",
  authors: [{ name: "Tax Center Gunadarma", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "Tax Center Gunadarma",
    "Edukasi Pajak",
    "Pelayanan Pajak",
    "Relawan Pajak",
    "Program Perpajakan",
    "Riset Perpajakan",
  ],
  creator: "Tax Center Gunadarma",
  publisher: "Tax Center Gunadarma",
  category: "education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/assets/images/favicon.ico", type: "image/x-icon" }],
    shortcut: "/assets/images/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    title: "Tax Center Gunadarma | Edukasi dan Pelayanan Perpajakan",
    description:
      "Pusat edukasi, pelatihan, riset, dan layanan perpajakan dari Tax Center Gunadarma.",
    siteName: "Tax Center Gunadarma",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Tax Center Gunadarma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax Center Gunadarma | Edukasi dan Pelayanan Perpajakan",
    description:
      "Pusat edukasi, pelatihan, riset, dan layanan perpajakan dari Tax Center Gunadarma.",
    images: [DEFAULT_OG_IMAGE],
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
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <TanStackProvider>
          {children}
          <Toaster position="top-center" />
        </TanStackProvider>
      </body>
    </html>
  );
}
