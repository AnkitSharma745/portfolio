"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return <span className="opacity-0">00:00:00 AM</span>;
  }

  return (
    <span className="font-mono text-sm font-bold tracking-wider text-primary transition-colors duration-300 group-hover/status:text-cyan-400">
      {time} (IST)
    </span>
  );
}
