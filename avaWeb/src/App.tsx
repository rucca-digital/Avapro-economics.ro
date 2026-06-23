import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import { Credibility } from "@/components/site/credibility";
import { Capabilities } from "@/components/site/capabilities";
import { Services } from "@/components/site/services";
import { Projects } from "@/components/site/projects";
import { StackShowcase } from "@/components/site/stack-showcase";
import { Process } from "@/components/site/process";
import { ClosingCTA } from "@/components/site/closing-cta";
import { Footer } from "@/components/site/footer";

export function App() {
  return (
    <div className="relative min-h-svh bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <Hero />
        <Credibility />
        <Capabilities />
        <Services />
        <Projects />
        <StackShowcase />
        <Process />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
