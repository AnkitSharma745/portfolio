"use client";

import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { useTheme } from "next-themes";

interface Props {
  id?: string;
}

const ParticlesBackground = ({ id = "tsparticles" }: Props) => {
  const { theme } = useTheme();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (isMobile) return null;

  const isDark = theme === "dark";
  const color = isDark ? "#ffffff" : "#6366f1"; // White in dark, Primary in light

  return (
    <Particles
      id={id}
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        detectRetina: true,
        fpsLimit: 60,
        interactivity: {
          events: { onHover: { enable: true, mode: "grab" } },
          modes: { grab: { distance: 200, links: { opacity: 0.4 } } },
        },
        particles: {
          number: { value: 30, density: { enable: true, area: 800 } },
          color: { value: color },
          size: { value: { min: 1, max: 3 } },
          links: {
            enable: true,
            distance: 150,
            color: color,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            outModes: "out",
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: { enable: true, speed: 1 },
          },
        },
      }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default ParticlesBackground;
