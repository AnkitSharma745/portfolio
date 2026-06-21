"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaUser, FaComment } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/Toast";
import {
  GUESTBOOK_UPDATED_EVENT,
  readGuestbookEntries,
  writeGuestbookEntries,
  type GuestbookEntry,
} from "@/lib/guestbook";

export default function GuestbookForm() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { toast, showToast, hideToast } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Save to local storage (mock backend)
    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name,
      message,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const existingEntries = readGuestbookEntries();
    writeGuestbookEntries([newEntry, ...existingEntries]);

    // Dispatch custom event to update list
    window.dispatchEvent(new Event(GUESTBOOK_UPDATED_EVENT));

    showToast("Message signed successfully!", "success");
    setName("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
                    rounded-2xl border p-5 backdrop-blur-sm sm:p-8
                    ${isDark
            ? "bg-white/5 border-white/10"
            : "bg-white border-black/5 shadow-lg"
          }
                `}
      >
        <h3 className="mb-5 flex items-center gap-2 text-xl font-bold sm:mb-6 sm:text-2xl">
          <span className="text-primary">✍️</span> Leave a Message
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <FaUser size={12} /> Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className={`
                                min-h-12 w-full rounded-xl border px-4 py-3 outline-none transition-all
                                ${isDark
                  ? "bg-black/20 border-white/10 focus:border-primary/50 focus:bg-black/40"
                  : "bg-gray-50 border-black/5 focus:border-primary/50"
                }
                            `}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <FaComment size={12} /> Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts..."
              required
              rows={4}
              className={`
                                min-h-32 w-full resize-none rounded-xl border px-4 py-3 outline-none transition-all
                                ${isDark
                  ? "bg-black/20 border-white/10 focus:border-primary/50 focus:bg-black/40"
                  : "bg-gray-50 border-black/5 focus:border-primary/50"
                }
                            `}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={`
                            flex min-h-12 w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition-all sm:py-4
                            ${isSubmitting
                ? "bg-primary/50 cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
              }
                        `}
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FaPaperPlane /> Sign Guestbook
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      <Toast {...toast} onClose={hideToast} />
    </div>
  );
}
