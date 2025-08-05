import { About } from "@/Components/About";
import { Contact } from "@/Components/Contact";
import { Hero } from "@/Components/Hero";
import { Projects } from "@/Components/Projects";
import { Skills } from "@/Components/Skills";


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
