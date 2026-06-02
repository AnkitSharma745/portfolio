"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, User, Bot, Command } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useRouter } from "next/navigation";
import {
  openGithub,
  openLinkedin,
  openTwitter,
  downloadResume,
  navigateTo
} from "@/utils/actions";
import { PROJECTS, ACHIEVEMENTS, JOURNEY_PHASES } from "@/utils/constants";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const QUICK_PROMPTS = [
  "Tell me about your skills 🛠️",
  "View Resume 📄",
  "Contact Info 📧",
  "Open Command Palette ⌘",
];

export default function ChatWidget() {
  const { isChatOpen, toggleChat, openCommandPalette } = useUI();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm Ankit's AI Assistant. How can I help you today? 👋",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isChatOpen]);

  const calculateExperience = () => {
    const startYear = parseInt(JOURNEY_PHASES[0].year);
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  };

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Process command
    const lowerText = text.toLowerCase();
    let actionTaken = false;
    let botResponse = "";

    // Direct Actions
    if (lowerText.includes("github") && (lowerText.includes("open") || lowerText.includes("give") || lowerText.includes("link"))) {
      openGithub();
      botResponse = "Opening GitHub profile for you! 🐙";
      actionTaken = true;
    } else if (lowerText.includes("linkedin") && (lowerText.includes("open") || lowerText.includes("give") || lowerText.includes("link"))) {
      openLinkedin();
      botResponse = "Opening LinkedIn profile! 💼";
      actionTaken = true;
    } else if (lowerText.includes("twitter") && (lowerText.includes("open") || lowerText.includes("give") || lowerText.includes("link"))) {
      openTwitter();
      botResponse = "Opening Twitter profile! 🐦";
      actionTaken = true;
    } else if (lowerText.includes("resume") || lowerText.includes("cv")) {
      downloadResume();
      botResponse = "Downloading resume... 📄";
      actionTaken = true;
    } else if (lowerText.includes("blog") && (lowerText.includes("open") || lowerText.includes("go to"))) {
      navigateTo(router, "/blog");
      botResponse = "Navigating to the blog section! 📝";
      actionTaken = true;
    } else if (lowerText.includes("contact") && (lowerText.includes("open") || lowerText.includes("go to"))) {
      navigateTo(router, "/contact");
      botResponse = "Taking you to the contact page! 📧";
      actionTaken = true;
    } else if (lowerText.includes("command palette") || lowerText.includes("cmd+k")) {
      openCommandPalette();
      botResponse = "Opening Command Palette... ⌨️";
      actionTaken = true;
    }

    // Knowledge Base Queries
    if (!actionTaken) {
      if (lowerText.includes("experience") || lowerText.includes("how long")) {
        const years = calculateExperience();
        botResponse = `Ankit has over ${years} years of experience in software development, starting his journey in 2022. He has progressed from basic web development to building enterprise-level applications.`;
      } else if (lowerText.includes("skills") || lowerText.includes("stack") || lowerText.includes("technologies")) {
        botResponse = "Ankit is a Full-Stack expert! 🛠️ Core stack: React, Next.js, Node.js, TypeScript. He also works with AWS, MongoDB, Redux, and modern UI libraries like Tailwind CSS and Framer Motion.";
      } else if (lowerText.includes("project") || lowerText.includes("work")) {
        const projectNames = PROJECTS.map(p => p.title).join(", ");
        botResponse = `Ankit has built some impressive projects, including: ${projectNames}. You can check out the Projects section for more details!`;
      } else if (lowerText.includes("achievement") || lowerText.includes("award")) {
        const achievements = ACHIEVEMENTS.map(a => a.title).join(", ");
        botResponse = `Some key highlights: ${achievements}. Ankit is always pushing for excellence! 🏆`;
      } else if (lowerText.includes("contact") || lowerText.includes("email") || lowerText.includes("reach")) {
        botResponse = "You can reach Ankit at ankitaksharma9763@gmail.com. He's always open to interesting conversations and opportunities! 📧";
      } else if (lowerText.includes("available") || lowerText.includes("hire")) {
        botResponse = "Yes! Ankit is currently open to new opportunities and freelance projects. Let's build something amazing together. 🤝";
      } else if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
        botResponse = "Hello! 👋 I'm Ankit's AI Assistant. Feel free to ask me about his skills, projects, or experience!";
      } else {
        botResponse = "That's an interesting question! While I'm just a simulated AI, I'm still learning. Try asking about Ankit's projects, skills, or experience, or ask me to open his GitHub!";
      }
    }

    // Simulate AI delay
    setTimeout(() => {
      const botMsg: Message = {
        id: crypto.randomUUID(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[22%] right-6 z-50 w-[350px] md:w-[400px] h-[500px] flex flex-col rounded-2xl overflow-hidden glass-card border border-white/20 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary/90 to-purple-600/90 backdrop-blur-md text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Ankit&apos;s AI Assistant</h3>
                  <p className="text-xs opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={openCommandPalette}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                title="Open Command Palette"
              >
                <Command size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-purple-600 text-white"
                      }`}
                  >
                    {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-secondary text-foreground rounded-tl-none border border-border"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="bg-secondary p-3 rounded-2xl rounded-tl-none border border-border flex gap-1">
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2 bg-background/80 border-t border-border overflow-x-auto flex gap-2 no-scrollbar">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary border border-border text-xs font-medium transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-background border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.elements.namedItem("message") as HTMLInputElement;
                  if (input.value.trim()) {
                    handleSendMessage(input.value);
                    input.value = "";
                  }
                }}
                className="flex gap-2"
              >
                <input
                  name="message"
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 bg-secondary text-foreground rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border placeholder:text-foreground/40"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
