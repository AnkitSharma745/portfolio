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
import {
  contactChannels,
  type ContactChannelIcon,
} from "@/content/contact/contactChannels";

const contactIcons: Record<ContactChannelIcon, React.ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  phone: <FaPhone />,
  email: <FaEnvelope />,
};

function ContactDetails() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const cardStyle = `group w-full sm:w-64 h-56 flex flex-col items-center justify-center rounded-2xl 
    shadow-xl border border-primary/20 backdrop-blur-md bg-white/5 transition-all duration-300 
    cursor-pointer transform hover:scale-[1.07] hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 text-center px-4 py-6 space-y-4`;

  return (
    <section
      id="contact"
      className={`relative py-24 px-6 md:px-20 transition-all duration-500 bg-background text-foreground`}
    >
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <ParticlesBackground id="contact-details" />
      </div>

      <h2
        className={`text-4xl md:text-5xl font-extrabold text-center mb-14 tracking-tight relative 
          after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:w-24 after:h-[3px] 
          after:rounded-full after:bg-gradient-to-r after:from-primary after:to-accent`}
        data-aos="fade-up"
      >
        Let’s{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-accent">
          Connect
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {contactChannels.map((item, index) => (
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
            <div className="text-4xl text-primary group-hover:text-accent group-hover:scale-125 transition-all duration-300">
              {contactIcons[item.icon]}
            </div>
            <div className="text-xl font-semibold tracking-wide">
              {item.title}
            </div>
            <div className="text-sm opacity-90 font-light">
              {item.detailText ? item.detailText : `Visit my ${item.title}`}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default ContactDetails;
