"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import GitHubCalendar from "react-github-calendar";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "next-themes";

export default function GitHubJourney() {
  const { resolvedTheme } = useTheme();

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2022 + 1 },
    (_, i) => currentYear - i,
  );
  const [year, setYear] = useState<number | undefined>(undefined);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const isDark = resolvedTheme === "dark";

  const gradient = isDark
    ? "from-slate-900 to-slate-950"
    : "from-gray-50 to-blue-50";

  return (
    <section
      id="github-journey"
      className={`pt-20 pb-20 px-4 sm:px-10 md:px-20 bg-gradient-to-br transition-colors duration-700 ${gradient}`}
    >
      <h2
        className={`text-4xl sm:text-5xl font-extrabold text-center mb-12 tracking-tight ${
          isDark ? "text-white" : "text-gray-900"
        }`}
        data-aos="fade-up"
      >
        My{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          GitHub
        </span>{" "}
        Journey
      </h2>

      <div className="flex flex-col items-center gap-14 max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full justify-items-center"
          data-aos="fade-up"
        >
          <Image
            src={`https://streak-stats.demolab.com?user=ankitsharma745&theme=${
              isDark ? "dark" : "default"
            }&hide_border=true&date_format=j%20M%5B%20Y%5D`}
            alt="GitHub Streak"
            width={495}
            height={195}
            className="rounded-xl shadow-xl w-full max-w-md"
            unoptimized
          />
          <Image
            src={`https://github-readme-stats.vercel.app/api?username=ankitsharma745&show_icons=true&hide_border=true&theme=${
              isDark ? "tokyonight" : "default"
            }`}
            alt="GitHub Stats"
            width={495}
            height={195}
            className="rounded-xl shadow-xl w-full max-w-md"
            unoptimized
          />
        </div>

        <div className="text-center w-full" data-aos="fade-up">
          <h3
            className={`text-2xl font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Contribution Calendar {year && ` - ${year}`}
          </h3>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-3 py-1 rounded-full font-medium transition duration-300 ${
                  year === y
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-purple-500/20 hover:text-zinc-50"
                }`}
              >
                {y}
              </button>
            ))}
            <button
              onClick={() => setYear(undefined)}
              className="text-1xl underline text-cyan-500 ml-2 hover:cursor-pointer"
            >
              Clear
            </button>
          </div>

          <div
            className="w-full  scrollbar-thumb-[#6C63FF] scrollbar-track-transparent"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div
              className={`p-4 rounded-lg shadow-xl text-blue-50 bg-white dark:bg-[#1d3335]`}
            >
              <GitHubCalendar
                username="ankitsharma745"
                year={year}
                blockSize={14}
                blockMargin={5}
                colorScheme={isDark ? "dark" : "light"}
                theme={{
                  light: ["#eee", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                  dark: ["#1f2937", "#6C63FF", "#7E6BFF", "#9F8BFF", "#C9BBCF"],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
