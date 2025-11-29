"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { sendEmails } from "@/utils/emailUtils";
import ParticlesBackground from "@/components/ParticlesBackground";
import SectionDivider from "@/components/SectionDivider";


export default function ContactMe() {


  useEffect(() => {
    AOS.init({ duration: 50 });
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setStatusMessage("✅ Please agree to the terms before submitting.");
      return;
    }

    const result = await sendEmails(formData);
    if (result.success) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    }
    setStatusMessage(result.message);
    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  };



  return (
    <section
      id="contact-me"
      className="relative min-h-screen pt-24 pb-0 px-6 overflow-hidden transition-all duration-500 bg-background text-foreground"
    >
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <ParticlesBackground id="contact-page" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-accent bg-clip-text text-transparent">
            Contact Me
          </span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="border border-primary/30 rounded-2xl p-[2px]"
          data-aos="fade-up"
        >
          <div
            className="bg-gradient-to-br from-background via-secondary/50 to-background rounded-2xl p-8 space-y-6"
          >
            {["firstName", "lastName", "email", "phone"].map((field, idx) => {
              const label =
                field === "firstName"
                  ? "First Name"
                  : field === "lastName"
                    ? "Last Name"
                    : field.charAt(0).toUpperCase() + field.slice(1);
              const type =
                field === "email"
                  ? "email"
                  : field === "phone"
                    ? "tel"
                    : "text";

              return (
                <div key={field} data-aos="fade-up" data-aos-delay={idx * 10}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium mb-1"
                  >
                    {label}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={type}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              );
            })}

            {/* Message */}
            <div data-aos="fade-up" data-aos-delay={100}>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Agreement */}
            <div className="flex items-center gap-x-4">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={`${agreed ? "bg-primary" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
              >
                <span
                  className={`${agreed ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
              <label className="text-sm">
                I agree to the{" "}
                <a href="#" className="font-semibold text-primary">
                  terms and conditions
                </a>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreed}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${agreed
                ? "bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 text-black"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Send Message
            </button>

            {statusMessage && (
              <p
                className="mt-4 text-center text-sm text-primary"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {statusMessage}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Section Divider */}
      <SectionDivider />
    </section>
  );
}
