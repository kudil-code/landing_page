import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TenderInformation ID - 200+ Informasi Tender Setiap Hari",
  description: "Platform terlengkap untuk informasi tender konstruksi, pengadaan barang, dan elektrikal di Indonesia. Dapatkan 200+ tender baru setiap hari dari pemerintah, BUMN, dan swasta.",
  keywords: "informasi tender, tender konstruksi, pengadaan pemerintah, tender BUMN, peluang tender, tender Indonesia, pengadaan barang, tender elektrikal",
  authors: [{ name: "TenderInformation ID" }],
  creator: "TenderInformation ID",
  publisher: "TenderInformation ID",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://tenderinformation.id",
    siteName: "TenderInformation ID",
    title: "TenderInformation ID - 200+ Informasi Tender Setiap Hari",
    description: "Platform terlengkap untuk informasi tender konstruksi, pengadaan barang, dan elektrikal di Indonesia.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TenderInformation ID - Platform Informasi Tender Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TenderInformation ID - 200+ Informasi Tender Setiap Hari",
    description: "Platform terlengkap untuk informasi tender konstruksi, pengadaan barang, dan elektrikal di Indonesia.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://tenderinformation.id",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TenderInformation ID",
              "description": "Platform terlengkap untuk informasi tender konstruksi, pengadaan barang, dan elektrikal di Indonesia",
              "url": "https://tenderinformation.id",
              "logo": "https://tenderinformation.id/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+62-xxx-xxx-xxxx",
                "contactType": "customer service",
                "availableLanguage": "Indonesian"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ID",
                "addressRegion": "Indonesia"
              },
              "sameAs": [
                "https://www.instagram.com/tenderinformation.id",
                "https://www.linkedin.com/company/tenderinformation-id",
                "https://www.facebook.com/tenderinformation.id"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
