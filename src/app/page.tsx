import { About } from "@/components/organisms/About";
import { Contact } from "@/components/organisms/Contact";
import { Hero } from "@/components/organisms/Hero";
import { Projects } from "@/components/organisms/Projects";
import { Skills } from "@/components/organisms/Skills";


export default function Home() {
  return (
    
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
