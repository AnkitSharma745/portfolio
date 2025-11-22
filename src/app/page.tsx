import HomePage from "@/views/HomePage/HomePage";
import ExperiencePortfolio from "@/components/layout/Experience/Experience";
import AboutMe from "@/views/AboutMe/AboutMe";
import SkillsPage from "@/views/SkillsPage/Skills";
import ContactDetails from "@/views/ContactPage/ContactDetails";
import ContactMe from "@/views/ContactPage/ContactMe";
import Projects from "@/views/ProjectPage/ProjectPage";
import GitHubJourney from "@/components/github/Github";

export default function Home() {
  return (
    <main className="bg-white text-black min-h-screen transition-all duration-200 dark:bg-black dark:text-white">
      <HomePage />
      <ExperiencePortfolio />
      <AboutMe />
      <SkillsPage />
      <ContactDetails />
      <ContactMe />
      <Projects />
      <GitHubJourney />
    </main>
  );
}
