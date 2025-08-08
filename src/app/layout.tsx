import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/Components/Navbar";
import { Footer } from "@/Components/Footer";
import { Analytics } from "@vercel/analytics/next"

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
  title: "Carlos Damota | Desarrollador Full‑Stack Junior",
  description:
    "Portfolio de Carlos Damota, desarrollador full‑stack especializado en el stack MERN. Apasionado por la tecnología, la mejora continua y la creación de soluciones eficientes con React, Node.js y MongoDB.",
    verification: {
    google: "5KpsD4cTnwJmjEOALTyxIoK-uz7YNLzs5MWU32FjA2g",
  },
  keywords: [
    "desarrollador web",
    "full-stack",
    "MERN",
    "React",
    "Node.js",
    "MongoDB",
    "portfolio",
    "Carlos Damota",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Carlos Damota | Full‑Stack Developer",
    description:
      "Explora mis proyectos, experiencia y contacto como desarrollador web full‑stack especializado en MERN.",
    url: "https://carlosdamota.com",
    siteName: "Carlos Damota",
    images: [
      {
        url: "https://carlosdamota.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Portfolio de Carlos Damota",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Damota | Full‑Stack Developer",
    description:
      "Explora mis proyectos y perfil profesional en desarrollo web full‑stack.",
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
    <html lang="es" className="scroll-smooth">
      <body
        className={ `bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between min-h-screen ` }
      >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
