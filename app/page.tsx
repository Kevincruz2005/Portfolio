import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-green-400 selection:bg-green-500/30 selection:text-green-200">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />

      <footer className="py-8 text-center font-mono text-xs text-gray-600 border-t border-white/5 bg-[#0c0c0c]">
        <p>&copy; 2026 Kevin Cruz. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
