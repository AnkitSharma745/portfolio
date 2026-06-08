"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaEnvelope, FaUser, FaPaperPlane, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import GradientText from "@/components/GradientText";
import ParticlesBackground from "@/components/ParticlesBackground";
import ScrollToTop from "@/components/ScrollToTop";
import Toast from "@/components/Toast";
import { useToast } from "@/hooks/useToast";

export default function ContactPage() {
    const { toast, showToast, hideToast } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            showToast("Please fix the errors in the form", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call - Replace with actual implementation
            await new Promise(resolve => setTimeout(resolve, 2000));

            showToast("Message sent successfully! I'll get back to you soon.", "success");

            // Reset form
            setFormData({ name: "", email: "", subject: "", message: "" });
            setErrors({});
        } catch (error) {
            console.error("Contact form error:", error);
            showToast("Failed to send message. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const inputClass = (fieldName: string) => `
        w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300
        ${errors[fieldName]
            ? "border-red-500 focus:border-red-500"
            : "bg-white dark:bg-white/5 border-black/5 dark:border-white/10 focus:border-primary/50 focus:bg-white/10 focus:dark:bg-white/10 shadow-sm"
        }
    `;

    return (
        <PageTransition>
            <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-24 pb-10">
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <ParticlesBackground />
                </div>

                <div className="relative z-10 container mx-auto px-6 max-w-4xl">
                    <Breadcrumbs />
                    {/* Back Navigation */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold mb-6"
                        >
                            Get In <GradientText>Touch</GradientText>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-foreground/70 leading-relaxed"
                        >
                            Have a project in mind or just want to say hi? I&apos;d love to hear from you!
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="md:col-span-2"
                        >
                            <div
                                className="p-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 shadow-lg dark:shadow-none"
                            >
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`${inputClass("name")} pl-12`}
                                                placeholder="Your name"
                                            />
                                        </div>
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`${inputClass("email")} pl-12`}
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">
                                            Subject <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={inputClass("subject")}
                                            placeholder="What's this about?"
                                        />
                                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={6}
                                            className={inputClass("message")}
                                            placeholder="Your message..."
                                        />
                                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        className={`
                                        w-full px-8 py-4 rounded-full font-medium shadow-lg transition-all flex items-center justify-center gap-2
                                        ${isSubmitting
                                                ? "bg-primary/50 cursor-not-allowed"
                                                : "bg-primary text-primary-foreground hover:shadow-primary/25"
                                            }
                                    `}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="animate-spin">⏳</span>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-6"
                        >
                            {/* Email */}
                            <div
                                className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 shadow-lg dark:shadow-none"
                            >
                                <h3 className="font-bold text-lg mb-2">Email</h3>
                                <a href="mailto:ankit@example.com" className="text-primary hover:underline">
                                    ankit@example.com
                                </a>
                            </div>

                            {/* Social Links */}
                            <div
                                className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 shadow-lg dark:shadow-none"
                            >
                                <h3 className="font-bold text-lg mb-4">Connect</h3>
                                <div className="space-y-3">
                                    <a
                                        href="https://github.com/ankitsharma745"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors"
                                    >
                                        <FaGithub size={20} />
                                        GitHub
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/ankitsharma745"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors"
                                    >
                                        <FaLinkedin size={20} />
                                        LinkedIn
                                    </a>
                                    <a
                                        href="https://twitter.com/ankitsharma745"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors"
                                    >
                                        <FaTwitter size={20} />
                                        Twitter
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <Toast
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.isVisible}
                    onClose={hideToast}
                />

                <ScrollToTop />
            </main>
        </PageTransition>
    );
}
