import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Classic Poly Threads | Azo-Free Sewing Thread Manufacturer Bangalore | Shiva Shakthi Marketing",
  description:
    "Premium Azo-free sewing thread manufacturer in Bangalore since 1997. 700+ standardized shades, 35 tons/month dyeing capacity, ISO 9002 certified. B2B supplier to Mufti, Pantaloons, Zudio, Myntra & more. Request bulk quote or thread samples.",
  keywords: [
    "Azo-free thread manufacturers Bangalore",
    "bulk industrial sewing thread supplier Karnataka",
    "polyester sewing thread manufacturer India",
    "core spun polyester thread",
    "thread manufacturer Doddaballapura",
    "Classic Poly Threads",
    "Shiva Shakthi Marketing",
    "B2B thread supplier",
    "garment thread Bangalore",
    "industrial thread manufacturer Karnataka",
  ],
  authors: [{ name: "Shiva Shakthi Marketing" }],
  creator: "Classic Poly Threads",
  openGraph: {
    title: "Classic Poly Threads | Premier B2B Thread Manufacturer Since 1997",
    description:
      "35 tons/month dyeing capacity. 700 standardized shades. ISO 9002 certified. Azo-free. Supplying 100+ garment hubs across India.",
    type: "website",
    locale: "en_IN",
    siteName: "Classic Poly Threads — Shiva Shakthi Marketing",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ManufacturingBusiness",
  name: "Shiva Shakthi Marketing",
  alternateName: "Classic Poly Threads",
  url: "https://classicpolythreads.com",
  logo: "/logo.png",
  foundingDate: "1997",
  description:
    "Premier Azo-free sewing thread manufacturer based in Bengaluru, operational since 1997. Specializing in market-standard sewing threads engineered via advanced technology under the registered brand Classic Poly Threads.",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "#30, Govinda Nilaya, 1st Floor, 1st Cross Road, RRMR Extension, Sudhama Nagar",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560027",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Shed No. 19, Doddaballapura Integrated Textile Park, Arehalli Guddadahalli",
      addressRegion: "Karnataka",
      postalCode: "561205",
      addressCountry: "IN",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9880720646",
      contactType: "Proprietor",
      name: "Mr. Chandrashekar T Anchan",
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-9844031435",
      contactType: "Factory Manager",
      name: "Mr. Kishore Kumar",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sewing Thread Products",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Core Spun Polyester Thread" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Spun Polyester Thread" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "CF Poly (Continuous Filament) Thread" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Recycled Material Thread" } },
    ],
  },
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50 },
  brand: { "@type": "Brand", name: "Classic Poly Threads" },
  certifications: ["ISO 9002"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#1A1A1A" />
      </head>
      <body>{children}</body>
    </html>
  );
}
