"use client";

import { motion } from "framer-motion";
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
import {
  contactChannels,
  type ContactChannelIcon,
} from "@/content/contact/contactChannels";
import { connectSectionContent } from "@/content/contact/connectSection";

const contactIcons: Record<ContactChannelIcon, React.ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  phone: <FaPhone />,
  email: <FaEnvelope />,
};

export default function Connect() {
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
            {connectSectionContent.title.beforeHighlight}{" "}
            <GradientText>{connectSectionContent.title.highlighted}</GradientText>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {connectSectionContent.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactChannels.map((contact, index) => (
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
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-white/10 hover:dark:bg-white/10 hover:border-primary/50 shadow-lg dark:shadow-none transition-all duration-300"
            >
              <div
                className={`text-5xl mb-4 text-foreground/80 transition-colors duration-300 ${contact.hoverColor}`}
              >
                {contactIcons[contact.icon]}
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
