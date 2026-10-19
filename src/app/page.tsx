import { About } from "@/components/organisms/About";
import { Contact } from "@/components/organisms/Contact";
import { Experience } from "@/components/organisms/Experience";
import { Hero } from "@/components/organisms/Hero";
import { Projects } from "@/components/organisms/Projects";
import { Skills } from "@/components/organisms/Skills";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Carlos Damota",
    "jobTitle": "Full Stack Developer | AI-Driven Product Development",
    "url": "https://carlosdamota.com",
    "sameAs": [
      "https://github.com/CarlosDamota",
      "https://www.linkedin.com/in/carlos-damota/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tarragona",
      "addressRegion": "Cataluña",
      "addressCountry": "ES"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "CEOP Tarragona",
        "description": "Certificado Profesional Nivel 3 en Desarrollo Web (IFCD0210)"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Nuclio Digital School",
        "description": "Máster en Desarrollo Web Full-Stack"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Google",
        "description": "Certificado Profesional de Ciberseguridad"
      },
      {
        "@type": "EducationalOrganization",
        "name": "IBM SkillsBuild",
        "description": "Desarrollo Python Full Stack"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Escola del Treball de Barcelona",
        "description": "Técnico en Electrónica"
      }
    ],
    "knowsAbout": [
      "Desarrollo Web Full-Stack",
      "Inteligencia Artificial",
      "AI Agéntica & LLMs",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Google Cloud Run",
      "Firebase",
      "Supabase",
      "WebSockets",
      "Stripe",
      "Resend",
      "Tailwind CSS",
      "Docker",
      "Ciberseguridad",
      "E-commerce & Operaciones Retail"
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
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
