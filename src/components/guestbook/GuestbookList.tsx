"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { FaQuoteLeft } from "react-icons/fa";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  date: string;
}

const initialEntries: GuestbookEntry[] = [
  {
    id: "1",
    name: "Ankit Sharma",
    message:
      "Welcome to my portfolio! Feel free to look around and leave a message.",
    date: "November 29, 2025",
  },
];

const isGuestbookEntry = (entry: unknown): entry is GuestbookEntry => {
  if (!entry || typeof entry !== "object") {
    return false;
  }

  const candidate = entry as Partial<Record<keyof GuestbookEntry, unknown>>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.message === "string" &&
    typeof candidate.date === "string"
  );
};

const readGuestbookEntries = (): GuestbookEntry[] => {
  const saved = localStorage.getItem("guestbook-entries");

  if (!saved) {
    localStorage.setItem("guestbook-entries", JSON.stringify(initialEntries));
    return initialEntries;
  }

  try {
    const parsed: unknown = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.every(isGuestbookEntry)) {
      return parsed;
    }
  } catch {
    // Fall back to the known-good initial entry below.
  }

  localStorage.setItem("guestbook-entries", JSON.stringify(initialEntries));
  return initialEntries;
};

export default function GuestbookList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadEntries = () => {
      if (isMounted) {
        setEntries(readGuestbookEntries());
      }
    };

    const handleUpdate = () => loadEntries();
    queueMicrotask(loadEntries);
    window.addEventListener("guestbook-updated", handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener("guestbook-updated", handleUpdate);
    };
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">
        Recent Messages ({entries.length})
      </h3>

      <AnimatePresence mode="popLayout">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
            className={`
                            p-6 rounded-xl border relative group transition-all
                            ${
                              isDark
                                ? "bg-white/5 border-white/10 hover:bg-white/10"
                                : "bg-white border-black/5 hover:shadow-md"
                            }
                        `}
          >
            <FaQuoteLeft className="absolute top-6 right-6 text-primary/10 text-4xl group-hover:text-primary/20 transition-colors" />

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`
                                w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                                ${isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"}
                            `}
              >
                {entry.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold">{entry.name}</h4>
                <span className="text-xs text-foreground/50">{entry.date}</span>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed relative z-10">
              {entry.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>

      {entries.length === 0 && (
        <div className="text-center py-12 text-foreground/50">
          No messages yet. Be the first to sign!
        </div>
      )}
    </div>
  );
}
