import { useState, useEffect, useRef } from "react";
import { ACHIEVEMENTS } from "@/utils/constants";
import { FaMedal } from "react-icons/fa";

const AboutMe = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const achievements = ACHIEVEMENTS;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl"
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
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/30 mb-6">
              <FaMedal className="text-yellow-400" />
              <span className="text-sm font-medium">
                Full-Stack Technical Consultant
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6">
              Ankit Sharma
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Architect of{" "}
              <span className="text-primary font-semibold">
                enterprise-grade applications
              </span>{" "}
              and
              <span className="text-accent font-semibold">
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
                <div className="text-3xl mb-3 text-primary">
                  <achievement.icon />
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
    </div>
  );
};

export default AboutMe;
