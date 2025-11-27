"use client";
import { useState, useEffect, useRef } from "react";
import {
  FaRocket,
  FaMedal,
  FaGem,
  FaTrophy,
  FaFire,
  FaStar,
} from "react-icons/fa";

const ExperiencePortfolio = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const projects = [
    {
      id: "admin-portal",
      title: "Enterprise Admin Portal",
      subtitle: "Full-Stack Dashboard Revolution",
      duration: "4 months",
      impact: "300% efficiency boost",
      description:
        "Built a comprehensive admin portal from scratch with advanced category management, product listings, order processing, and kiosk management systems.",
      techStack: ["React", "TypeScript", "MUI", "Redux", "MongoDB", "Node.js"],
      features: [
        "Multi-level Category Management System",
        "Bulk CSV Upload/Download with Progress Tracking",
        "Real-time Analytics Dashboard",
        "Advanced Search & Filter Systems",
        "Audit History Tracking",
        "Role-based Access Control",
      ],
      metrics: {
        linesOfCode: "25,000+",
        components: "150+",
        apis: "80+",
        performance: "40% faster",
      },
      color: "from-purple-600 to-blue-600",
    },
    {
      id: "vending-app",
      title: "Smart Vending Machine UI",
      subtitle: "Next-Gen Kiosk Experience",
      duration: "2 months",
      impact: "95% user satisfaction",
      description:
        "Revolutionary touch-based vending machine interface built with React + Electron, optimized for 41-inch kiosk screens with custom animations.",
      techStack: ["React", "Electron", "TypeScript", "Redux", "i18n", "PM2"],
      features: [
        'Touch-optimized 41" Kiosk Interface',
        "Multi-language Support (i18n)",
        "Local File System Integration",
        "Custom Logging System",
        "Payment Gateway Integration",
        "Real-time Product Dispensing",
      ],
      metrics: {
        screenSize: "41-inch",
        languages: "5+",
        uptime: "99.9%",
        transactions: "1000+/day",
      },
      color: "from-green-500 to-teal-600",
    },
    {
      id: "architecture",
      title: "System Architecture",
      subtitle: "Scalable Tech Foundation",
      duration: "Ongoing",
      impact: "Zero downtime",
      description:
        "Designed and implemented robust system architecture with custom configurations, type-safe development, and performance optimizations.",
      techStack: [
        "TypeScript",
        "Axios",
        "MUI Theme",
        "Redux Toolkit",
        "ESLint",
        "Git",
      ],
      features: [
        "Custom Axios Wrapper with Interceptors",
        "Global MUI Theme Configuration",
        "99.9% TypeScript Coverage",
        "Advanced ESLint Rules",
        "Clean Git Workflow",
        "Performance Monitoring",
      ],
      metrics: {
        typescript: "99.9%",
        performance: "90+ Lighthouse",
        bundleSize: "< 500KB",
        buildTime: "< 30s",
      },
      color: "from-orange-500 to-red-600",
    },
  ];

  const achievements = [
    {
      icon: <FaRocket />,
      title: "40% Performance Boost",
      desc: "Optimized app performance",
    },
    {
      icon: <FaTrophy />,
      title: "3 Enterprise Dashboards",
      desc: "Launched successfully",
    },
    {
      icon: <FaGem />,
      title: "99.9% TypeScript",
      desc: "Type-safe development",
    },
    {
      icon: <FaFire />,
      title: "50K+ Lines of Code",
      desc: "Clean, maintainable code",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            transform: "translate(-50%, -50%)",
            transition: "all 0.3s ease",
          }}
        />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-screen flex items-center justify-center px-6"
      >
        <div
          className={`text-center transform transition-all duration-2000 translate-y-0 opacity-100`}
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30 mb-6">
              <FaMedal className="text-yellow-400" />
              <span className="text-sm font-medium">
                Full-Stack Technical Consultant
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent mb-6">
              Ankit Sharma
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Architect of{" "}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                enterprise-grade applications
              </span>{" "}
              and
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {" "}
                revolutionary user experiences
              </span>
              . Transforming complex business requirements into scalable,
              high-performance solutions.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`bg-white/50 dark:bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-white/10 transform transition-all duration-700 hover:scale-105 hover:bg-white/80 dark:hover:bg-white/10 translate-y-0 opacity-100`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-3xl mb-3 text-purple-600 dark:text-purple-400">
                  {achievement.icon}
                </div>
                <div className="text-lg font-bold mb-1">
                  {achievement.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{achievement.desc}</div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Projects Showcase */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Project Showcase
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Revolutionary solutions that transformed business operations
            </p>
          </div>

          {/* Project Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {projects.map((project, idx) => (
              <button
                key={idx}
                onClick={() => setActiveProject(idx)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeProject === idx
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                {project.title}
              </button>
            ))}
          </div>

          {/* Active Project Details */}
          <div className="bg-white/50 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 dark:border-white/10">
            <div
              className={`bg-gradient-to-r ${projects[activeProject].color} p-1 rounded-2xl mb-8`}
            >
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {projects[activeProject].title}
                      </h3>
                      <span className="px-3 py-1 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-sm">
                        {projects[activeProject].impact}
                      </span>
                    </div>
                    <p className="text-xl text-purple-600 dark:text-purple-300 mb-4">
                      {projects[activeProject].subtitle}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                      {projects[activeProject].description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-purple-600 dark:text-purple-300">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[activeProject].techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-purple-500/20 text-purple-600 dark:text-purple-300 rounded-full text-sm border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-300">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {projects[activeProject].features.map(
                          (feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                            >
                              <FaStar className="text-yellow-400 text-sm" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="lg:w-80">
                    <h4 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-300">
                      Project Metrics
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(projects[activeProject].metrics).map(
                        ([key, value], idx) => (
                          <div key={idx} className="bg-white/50 dark:bg-white/5 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
                            <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {value}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-12 border border-purple-500/30 backdrop-blur-lg">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Let&apos;s discuss how I can bring the same level of excellence and
              innovation to your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                Let&apos;s Connect
              </button>
              <button className="px-8 py-4 border-2 border-purple-500 rounded-full font-semibold text-lg text-purple-600 dark:text-white hover:bg-purple-500/10 transform hover:scale-105 transition-all duration-300">
                View All Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencePortfolio;
