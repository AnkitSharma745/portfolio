"use client";

import { useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useTheme } from "next-themes";

function ContactDetails() {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const isDark = theme === "dark";

  const contacts = [
    {
      icon: <FaGithub />,
      title: "GitHub",
      link: "https://github.com/ankitsharma745",
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/ankit-sharma745",
    },
    {
      icon: <FaTwitter />,
      title: "Twitter",
      link: "https://twitter.com",
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      link: "tel:+917351474546",
      text: "+91 73514 74546",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      link: "mailto:ankitaksharma9763@gmail.com",
      text: "ankitaksharma9763@gmail.com",
    },
  ];

  const cardStyle = `group w-full sm:w-64 h-56 flex flex-col items-center justify-center rounded-2xl 
    shadow-xl border-[1.5px] backdrop-blur-md bg-opacity-40 transition-transform duration-300 
    cursor-pointer transform hover:scale-[1.07] hover:shadow-2xl text-center px-4 py-6 space-y-4 
    ${
      isDark
        ? "bg-slate-800/60 text-white border-purple-500"
        : "bg-white/80 text-gray-900 border-blue-500"
    }`;

  return (
    <section
      id="contact"
      className={`relative py-24 px-6 md:px-20 transition-all duration-500 
        ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100"
        }`}
    >
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <ParticlesBackground id="contact-details" />
      </div>

      <h2
        className={`text-4xl md:text-5xl font-extrabold text-center mb-14 tracking-tight relative 
          after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:w-24 after:h-[3px] 
          after:rounded-full after:bg-gradient-to-r after:from-[#06b6d4] after:to-[#3b82f6] 
          ${isDark ? "text-white" : "text-gray-900"}`}
        data-aos="fade-up"
      >
        Let’s{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          Connect
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {contacts.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            data-aos="zoom-in"
            className={cardStyle}
            onMouseEnter={() => {
              try {
                new Audio("/click-sound.mp3").play();
              } catch (e) {
                console.error("Audio play failed", e);
              }
            }}
          >
            <div className="text-4xl text-purple-500 group-hover:scale-125 transition-transform">
              {item.icon}
            </div>
            <div className="text-xl font-semibold tracking-wide">
              {item.title}
            </div>
            <div className="text-sm opacity-90 font-light">
              {item.text ? item.text : `Visit my ${item.title}`}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default ContactDetails;
