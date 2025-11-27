import HomePage from "@/views/HomePage/HomePage";
import dynamic from "next/dynamic";
import ParticlesBackground from "@/components/ParticlesBackground";

// Lazy load below-the-fold components for better performance
const ExperiencePortfolio = dynamic(
  () => import("@/components/layout/Experience/Experience"),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    ),
  }
);

const AboutMe = dynamic(() => import("@/views/AboutMe/AboutMe"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  ),
});

const SkillsPage = dynamic(() => import("@/views/SkillsPage/Skills"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  ),
});

const ContactDetails = dynamic(
  () => import("@/views/ContactPage/ContactDetails")
);
const ContactMe = dynamic(() => import("@/views/ContactPage/ContactMe"));
const Projects = dynamic(() => import("@/views/ProjectPage/ProjectPage"));
const GitHubJourney = dynamic(() => import("@/components/github/Github"));

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>
      
      <div className="relative z-10">
        <HomePage />
        <ExperiencePortfolio />
        <AboutMe />
        <SkillsPage />
        <ContactDetails />
        <ContactMe />
        <Projects />
        <GitHubJourney />
      </div>
    </main>
  );
}
