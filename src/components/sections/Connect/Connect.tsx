"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import SectionDivider from "@/components/SectionDivider";
import GradientText from "@/components/GradientText";

export default function Connect() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const contacts = [
    {
      icon: <FaGithub />,
      title: "GitHub",
      link: "https://github.com/ankitsharma745",
      description: "Check out my code",
      color: "group-hover:text-white",
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/ankit-sharma745",
      description: "Let's connect professionally",
      color: "group-hover:text-blue-500",
    },
    {
      icon: <FaTwitter />,
      title: "Twitter",
      link: "https://twitter.com",
      description: "Follow my updates",
      color: "group-hover:text-sky-400",
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      link: "tel:+917351474546",
      description: "+91 73514 74546",
      color: "group-hover:text-green-500",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      link: "mailto:ankitaksharma9763@gmail.com",
      description: "ankitaksharma9763@gmail.com",
      color: "group-hover:text-red-500",
    },
  ];

  return (
    <section
      id="connect"
      className="py-20 px-6 md:px-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Let&apos;s <GradientText>Connect</GradientText>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`
                group relative flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-300
                ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50"
                    : "bg-white border-black/5 hover:border-primary/50 shadow-lg"
                }
              `}
            >
              <div
                className={`text-5xl mb-4 text-foreground/80 transition-colors duration-300 ${contact.color}`}
              >
                {contact.icon}
              </div>

              <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
              <p className="text-sm text-foreground/60 mb-4">
                {contact.description}
              </p>

              <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">
                <FaArrowRight />
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
