import { About } from "@/components/organisms/About";
import { Contact } from "@/components/organisms/Contact";
import { Hero } from "@/components/organisms/Hero";
import { Projects } from "@/components/organisms/Projects";
import { Skills } from "@/components/organisms/Skills";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Carlos Damota",
    "jobTitle": "Desarrollador Full-Stack",
    "url": "https://carlosdamota.com",
    "sameAs": [
      "https://github.com/CarlosDamota",
      "https://www.linkedin.com/in/carlos-damota/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Oviedo",
      "addressRegion": "Asturias",
      "addressCountry": "ES"
    },
    "knowsAbout": [
      "Desarrollo Web",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Supabase",
      "Firebase",
      "Tailwind CSS",
      "Stripe",
      "Resend"
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
