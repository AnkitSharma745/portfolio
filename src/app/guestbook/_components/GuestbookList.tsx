"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { FaQuoteLeft } from "react-icons/fa";
import {
  GUESTBOOK_UPDATED_EVENT,
  readGuestbookEntries,
  type GuestbookEntry,
} from "@/lib/guestbook";

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
    window.addEventListener(GUESTBOOK_UPDATED_EVENT, handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener(GUESTBOOK_UPDATED_EVENT, handleUpdate);
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
                            ${isDark
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
