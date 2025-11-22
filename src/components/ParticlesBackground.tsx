"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { useTheme } from "next-themes";

interface Props {
  id?: string; // Optional custom ID
}

const ParticlesBackground = ({ id = "tsparticles" }: Props) => {
  const { theme } = useTheme();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const isDark = theme === "dark";

  return (
    <Particles
      id={id} // unique ID
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        detectRetina: true,
        fpsLimit: 100,
        interactivity: {
          events: { onHover: { enable: true, mode: "grab" } },
          modes: { grab: { distance: 300, links: { opacity: 0.4 } } },
        },
        particles: {
          number: { value: 60, density: { enable: true, area: 800 } },
          color: { value: isDark ? "#ffffff" : "#111111" },
          size: { value: { min: 1, max: 3 } },
          links: {
            enable: true,
            distance: 100,
            color: isDark ? "#ffffff" : "#333333",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "top-right",
            outModes: "out",
          },
          opacity: {
            value: { min: 0.3, max: 0.7 },
            animation: { enable: true, speed: 1 },
          },
        },
      }}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticlesBackground;
