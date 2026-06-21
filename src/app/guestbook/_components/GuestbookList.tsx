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
    <div className="space-y-4 sm:space-y-6">
      <h3 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl">
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
                            group relative rounded-xl border p-4 transition-all sm:p-6
                            ${isDark
                ? "bg-white/5 border-white/10 hover:bg-white/10"
                : "bg-white border-black/5 hover:shadow-md"
              }
                        `}
          >
            <FaQuoteLeft className="absolute right-4 top-4 text-3xl text-primary/10 transition-colors group-hover:text-primary/20 sm:right-6 sm:top-6 sm:text-4xl" />

            <div className="mb-4 flex items-center gap-3">
              <div
                className={`
                                flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold
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

            <p className="relative z-10 text-sm leading-7 text-foreground/80 sm:text-base">
              {entry.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>

      {entries.length === 0 && (
        <div className="py-10 text-center text-sm text-foreground/50 sm:py-12 sm:text-base">
          No messages yet. Be the first to sign!
        </div>
      )}
    </div>
  );
}
