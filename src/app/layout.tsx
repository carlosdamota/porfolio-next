import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/Components/Navbar";
import { Footer } from "@/Components/Footer";
import { Analytics } from "@vercel/analytics/next";

// app/layout.tsx

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carlos Damota | Desarrollador Front-End React & Next.js",
  description:
    "Desarrollador Front-End especializado en React, Next.js y JavaScript. Disponible para empleo a tiempo completo y proyectos freelance. Portfolio con proyectos web responsivos y modernas.",
  verification: {
    google: "5KpsD4cTnwJmjEOALTyxIoK-uz7YNLzs5MWU32FjA2g",
  },
  keywords: [
    "desarrollador front-end",
    "desarrollador React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "freelancer web",
    "portfolio desarrollador",
    "Carlos Damota",
    "desarrollo web",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://carlosdamota.com",
  },
  openGraph: {
    title: "Carlos Damota | Desarrollador Front-End React & Next.js",
    description:
      "Especialista en Front-End con React, Next.js y tecnologías web modernas. Disponible para empleo a tiempo completo y freelance.",
    url: "https://carlosdamota.com",
    siteName: "Carlos Damota",
    images: [
      {
        url: "https://carlosdamota.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Portfolio de Carlos Damota - Desarrollador Front-End",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Damota | Full‑Stack Developer",
    description: "Explora mis proyectos y perfil profesional en desarrollo web full‑stack.",
    images: ["https://carlosdamota.com/og-image.webp"],
  },
  icons: {
    icon: "/favicon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='es'
      className='scroll-smooth'
    >
      <body
        className={`bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between min-h-screen `}
      >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
