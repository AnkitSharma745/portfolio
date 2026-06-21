"use client";

import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPaperPlane, 
  FaUser, 
  FaPhoneAlt, 
  FaCommentAlt, 
  FaEnvelope, 
  FaGithub, 
  FaLinkedin, 
  FaCopy, 
  FaCheck 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { sendEmails } from "@/lib/utils/email";
import ParticlesBackground from "@/components/ParticlesBackground";
import { contactChannels } from "@/content/contact/contactChannels";
import LiveClock from "./_components/LiveClock";

export default function ContactMe() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Extract contact channel data safely with fallbacks
  const githubChannel = contactChannels.find((c) => c.id === "github") ?? {
    title: "GitHub",
    link: "https://github.com/ankitsharma745",
    description: "Check out my code",
  };
  const linkedinChannel = contactChannels.find((c) => c.id === "linkedin") ?? {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/ankitsharma745",
    description: "Connect professionally",
  };
  const twitterChannel = contactChannels.find((c) => c.id === "twitter") ?? {
    title: "X (Twitter)",
    link: "https://x.com/ankitsharma745",
    description: "Follow my updates",
  };
  const emailChannel = contactChannels.find((c) => c.id === "email") ?? {
    title: "Email",
    link: "mailto:ankitaksharma9763@gmail.com",
    description: "ankitaksharma9763@gmail.com",
  };
  const phoneChannel = contactChannels.find((c) => c.id === "phone") ?? {
    title: "Phone",
    link: "tel:+916395794139",
    description: "+91 63957 94139",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("ankitaksharma9763@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("+916395794139");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setStatusMessage("✅ Please agree to the terms before submitting.");
      return;
    }

    setIsSubmitting(true);
    const result = await sendEmails(formData);
    setIsSubmitting(false);

    if (result.success) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setAgreed(false);
    }
    setStatusMessage(result.message);
    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  };

  return (
    <section
      id="contact-me"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16 text-foreground transition-all duration-500 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticlesBackground id="contact-page" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-accent bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-foreground/60 md:text-base">
            Have a project in mind? Fill out the form below or reach out directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Form Side (Spans 7 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex lg:col-span-7 xl:col-span-7"
          >
            <div className="group/form relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-border/80 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:rounded-[2rem] sm:p-6 lg:p-7">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/form:opacity-100" />
              
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-grow flex-col justify-between space-y-5">
                <div className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    {/* First Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="firstName" className="text-xs font-semibold flex items-center gap-1.5 text-foreground/80">
                        <FaUser className="text-primary/70 text-[11px]" /> First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Ankit"
                        className="w-full rounded-xl border border-border/50 bg-white/5 px-3.5 py-3 text-sm shadow-sm transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-black/20 sm:py-2.5 sm:text-[13px]"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="lastName" className="text-xs font-semibold flex items-center gap-1.5 text-foreground/80">
                        <FaUser className="text-primary/70 text-[11px]" /> Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Sharma"
                        className="w-full rounded-xl border border-border/50 bg-white/5 px-3.5 py-3 text-sm shadow-sm transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-black/20 sm:py-2.5 sm:text-[13px]"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold flex items-center gap-1.5 text-foreground/80">
                        <FaEnvelope className="text-primary/70 text-[11px]" /> Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="ankit@example.com"
                        className="w-full rounded-xl border border-border/50 bg-white/5 px-3.5 py-3 text-sm shadow-sm transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-black/20 sm:py-2.5 sm:text-[13px]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold flex items-center gap-1.5 text-foreground/80">
                        <FaPhoneAlt className="text-primary/70 text-[11px]" /> Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 9876543210"
                        className="w-full rounded-xl border border-border/50 bg-white/5 px-3.5 py-3 text-sm shadow-sm transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-black/20 sm:py-2.5 sm:text-[13px]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 flex-grow flex flex-col">
                    <label htmlFor="message" className="text-xs font-semibold flex items-center gap-1.5 text-foreground/80">
                      <FaCommentAlt className="text-primary/70 text-[11px]" /> Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project..."
                      className="min-h-[132px] w-full flex-grow resize-none rounded-xl border border-border/50 bg-white/5 px-3.5 py-3 text-sm shadow-sm transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-black/20 sm:min-h-[120px] sm:py-2.5 sm:text-[13px]"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-3">
                  {/* Agreement */}
                  <div className="flex items-center gap-x-3">
                    <Switch
                      id="contact-terms-switch"
                      checked={agreed}
                      onChange={setAgreed}
                      aria-label="Agree to contact form terms"
                      className={`${
                        agreed ? "bg-primary" : "bg-border"
                      } relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background`}
                    >
                      <span
                        className={`${
                          agreed ? "translate-x-4" : "translate-x-1"
                        } inline-block h-3.5 w-3.5 transform bg-white rounded-full transition duration-300 shadow-sm`}
                      />
                    </Switch>
                    <label className="text-xs text-foreground/70">
                      I agree to the{" "}
                      <button 
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="font-semibold text-primary hover:underline focus:outline-none"
                      >
                        terms and conditions
                      </button>
                      .
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!agreed || isSubmitting}
                    className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all duration-300 ${
                      agreed
                        ? "bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 text-white dark:text-black"
                        : "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <FaPaperPlane className={isSubmitting ? "animate-pulse" : ""} />
                  </button>

                  {statusMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-xs font-medium text-primary mt-2"
                    >
                      {statusMessage}
                    </motion.p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Bento Info Side (Spans 5 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between gap-4 lg:col-span-5 xl:col-span-5"
          >
            {/* Status & Clock Widget */}
            <div className="group/status relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-border/80 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:rounded-[2rem] sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/status:opacity-100" />
              
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center h-12 w-12 shrink-0 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:border-emerald-500/10 dark:bg-emerald-500/5 shadow-inner">
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-emerald-400/25 opacity-75"></span>
                    <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-emerald-400/10 opacity-40 delay-300"></span>
                    <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
                      Current Status
                    </span>
                    <h3 className="text-xs font-bold text-foreground/85 mt-0.5">Available for Projects</h3>
                    <p className="text-[10px] text-foreground/50">Based in India</p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Local Time</span>
                  <LiveClock />
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 sm:gap-4">
              {/* GitHub Card */}
              <motion.a
                href={githubChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 shadow-md backdrop-blur-md transition-all duration-500 hover:border-border/80 hover:shadow-lg dark:border-white/10 dark:bg-white/5 sm:rounded-[2rem] sm:p-5"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-gradient-to-b from-background to-background/50 text-xl text-foreground/70 shadow-sm transition-all duration-300 group-hover/card:scale-110 group-hover/card:border-primary/30 group-hover/card:text-primary dark:border-white/10 dark:from-white/10 dark:to-white/5">
                    <FaGithub />
                  </div>
                </div>
                <div className="relative z-10 mt-6">
                  <h3 className="text-sm font-bold tracking-wide text-foreground/80 group-hover/card:text-foreground transition-colors duration-300">
                    {githubChannel.title}
                  </h3>
                  <p className="text-[11px] text-foreground/50 mt-1 line-clamp-1">
                    {githubChannel.description}
                  </p>
                </div>
              </motion.a>

              {/* LinkedIn Card */}
              <motion.a
                href={linkedinChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 shadow-md backdrop-blur-md transition-all duration-500 hover:border-border/80 hover:shadow-lg dark:border-white/10 dark:bg-white/5 sm:rounded-[2rem] sm:p-5"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-gradient-to-b from-background to-background/50 text-xl text-foreground/70 shadow-sm transition-all duration-300 group-hover/card:scale-110 group-hover/card:border-blue-500/30 group-hover/card:text-blue-500 dark:border-white/10 dark:from-white/10 dark:to-white/5">
                    <FaLinkedin />
                  </div>
                </div>
                <div className="relative z-10 mt-6">
                  <h3 className="text-sm font-bold tracking-wide text-foreground/80 group-hover/card:text-foreground transition-colors duration-300">
                    {linkedinChannel.title}
                  </h3>
                  <p className="text-[11px] text-foreground/50 mt-1 line-clamp-1">
                    {linkedinChannel.description}
                  </p>
                </div>
              </motion.a>

              {/* Twitter Card */}
              <motion.a
                href={twitterChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 shadow-md backdrop-blur-md transition-all duration-500 hover:border-border/80 hover:shadow-lg dark:border-white/10 dark:bg-white/5 sm:rounded-[2rem] sm:p-5"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-gradient-to-b from-background to-background/50 text-lg text-foreground/70 shadow-sm transition-all duration-300 group-hover/card:scale-110 group-hover/card:border-foreground/30 group-hover/card:text-foreground dark:border-white/10 dark:from-white/10 dark:to-white/5">
                    <FaXTwitter />
                  </div>
                </div>
                <div className="relative z-10 mt-6">
                  <h3 className="text-sm font-bold tracking-wide text-foreground/80 group-hover/card:text-foreground transition-colors duration-300">
                    {twitterChannel.title}
                  </h3>
                  <p className="text-[11px] text-foreground/50 mt-1 line-clamp-1">
                    {twitterChannel.description}
                  </p>
                </div>
              </motion.a>

              {/* Email Card (Interactive Copy) */}
              <motion.button
                onClick={handleCopyEmail}
                className="group/card relative flex min-h-[132px] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 text-left shadow-md backdrop-blur-md transition-all duration-500 hover:border-border/80 hover:shadow-lg dark:border-white/10 dark:bg-white/5 sm:rounded-[2rem] sm:p-5"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-gradient-to-b from-background to-background/50 text-xl text-foreground/70 shadow-sm transition-all duration-300 group-hover/card:scale-110 group-hover/card:border-primary/30 group-hover/card:text-primary dark:border-white/10 dark:from-white/10 dark:to-white/5">
                    <FaEnvelope />
                  </div>
                  <div className="text-[9px] font-bold tracking-wider uppercase text-foreground/45 flex items-center gap-1 bg-white/5 dark:bg-black/25 px-2 py-0.5 rounded-full border border-border/20">
                    {copiedEmail ? (
                      <>
                        <FaCheck className="text-emerald-500 text-[10px]" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <FaCopy className="text-[10px]" />
                        <span>Copy</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="relative z-10 mt-6">
                  <h3 className="text-sm font-bold tracking-wide text-foreground/80 group-hover/card:text-foreground transition-colors duration-300">
                    {emailChannel.title}
                  </h3>
                  <p className="text-[11px] text-foreground/50 mt-1 line-clamp-1">
                    {emailChannel.description}
                  </p>
                </div>
              </motion.button>
            </div>

            {/* Phone Card */}
            <motion.div
              className="group/phone relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-border/80 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:flex-row sm:rounded-[2rem] sm:p-5"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/phone:opacity-100" />
              
              <div className="relative z-10 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-gradient-to-b from-background to-background/50 text-base text-foreground/70 shadow-sm transition-all duration-300 group-hover/phone:scale-110 group-hover/phone:text-primary dark:border-white/10 dark:from-white/10 dark:to-white/5">
                  <FaPhoneAlt />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">Phone</span>
                  <span className="text-xs font-bold text-foreground/75 group-hover/phone:text-foreground transition-colors">{phoneChannel.description}</span>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                <button
                  onClick={handleCopyPhone}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white/5 dark:bg-black/20 px-3 py-2 text-xs font-bold text-foreground/80 hover:bg-background/80 hover:border-border/80 transition-all cursor-pointer"
                >
                  {copiedPhone ? (
                    <>
                      <FaCheck className="text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <FaCopy />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <a
                  href={phoneChannel.link}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:shadow-md hover:shadow-primary/10 transition-all"
                >
                  Call Direct
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTerms(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md rounded-[2rem] bg-background/95 backdrop-blur-xl border border-border/50 p-6 sm:p-7 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Terms & Conditions</h3>
              <div className="space-y-3 text-foreground/70 text-xs sm:text-sm max-h-[50vh] overflow-y-auto pr-2">
                <p><strong>1. Professional Use:</strong> This contact form is strictly for professional inquiries, project discussions, and networking.</p>
                <p><strong>2. Privacy:</strong> Your email and contact details will remain strictly confidential and will never be shared with third parties.</p>
                <p><strong>3. Response Time:</strong> While I strive to respond within 24 hours, response times may vary depending on my current workload.</p>
                <p><strong>4. No Spam:</strong> Any unsolicited marketing, spam, or inappropriate messages will be automatically filtered and ignored.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="mt-6 w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                I Understand
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
