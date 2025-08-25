"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function OceanWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Wave parameters - adjust for dark/light mode
    const waves = isDarkMode
      ? [
          // Dark mode - more vibrant and visible
          {
            amplitude: 50,
            frequency: 0.005,
            speed: 0.015,
            offset: 0,
            opacity: 0.25,
            color: { r: 150, g: 200, b: 255 },
          },
          {
            amplitude: 40,
            frequency: 0.008,
            speed: 0.02,
            offset: Math.PI / 3,
            opacity: 0.2,
            color: { r: 180, g: 150, b: 255 },
          },
          {
            amplitude: 35,
            frequency: 0.01,
            speed: 0.025,
            offset: Math.PI / 2,
            opacity: 0.18,
            color: { r: 220, g: 180, b: 255 },
          },
          {
            amplitude: 30,
            frequency: 0.003,
            speed: 0.01,
            offset: Math.PI,
            opacity: 0.15,
            color: { r: 200, g: 220, b: 255 },
          },
          {
            amplitude: 25,
            frequency: 0.006,
            speed: 0.018,
            offset: Math.PI * 1.5,
            opacity: 0.12,
            color: { r: 180, g: 240, b: 255 },
          },
        ]
      : [
          // Light mode - subtle and elegant
          {
            amplitude: 50,
            frequency: 0.005,
            speed: 0.015,
            offset: 0,
            opacity: 0.08,
            color: { r: 100, g: 150, b: 255 },
          },
          {
            amplitude: 40,
            frequency: 0.008,
            speed: 0.02,
            offset: Math.PI / 3,
            opacity: 0.06,
            color: { r: 120, g: 100, b: 255 },
          },
          {
            amplitude: 35,
            frequency: 0.01,
            speed: 0.025,
            offset: Math.PI / 2,
            opacity: 0.05,
            color: { r: 180, g: 120, b: 255 },
          },
          {
            amplitude: 30,
            frequency: 0.003,
            speed: 0.01,
            offset: Math.PI,
            opacity: 0.04,
            color: { r: 150, g: 180, b: 255 },
          },
          {
            amplitude: 25,
            frequency: 0.006,
            speed: 0.018,
            offset: Math.PI * 1.5,
            opacity: 0.03,
            color: { r: 100, g: 200, b: 255 },
          },
        ];

    let animationFrame: number;
    let time = 0;

    const drawWave = (wave: (typeof waves)[0], index: number) => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerY = height / 2;

      ctx.beginPath();
      ctx.moveTo(0, centerY);

      // Draw wave using sine function
      for (let x = 0; x <= width; x++) {
        const y =
          centerY +
          Math.sin(x * wave.frequency + time * wave.speed + wave.offset) *
            wave.amplitude *
            Math.sin((x / width) * Math.PI); // Fade at edges

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Create gradient fill
      const gradient = ctx.createLinearGradient(
        0,
        centerY - wave.amplitude,
        0,
        centerY + wave.amplitude
      );
      gradient.addColorStop(
        0,
        `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0)`
      );
      gradient.addColorStop(
        0.5,
        `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.opacity})`
      );
      gradient.addColorStop(
        1,
        `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0)`
      );

      // Fill the area below the wave
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add subtle glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = `rgba(${wave.color.r}, ${wave.color.g}, ${
        wave.color.b
      }, ${wave.opacity * 0.5})`;
      ctx.strokeStyle = `rgba(${wave.color.r}, ${wave.color.g}, ${
        wave.color.b
      }, ${wave.opacity * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw waves
      waves.forEach((wave, index) => {
        drawWave(wave, index);
      });

      time += 1;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isDarkMode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute left-0 right-0 top-[-180px] md:top-[-130px] lg:top-[-100px] w-full h-screen pointer-events-none -z-10"
    >
      {/* Canvas for waves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isDarkMode ? 0.6 : 0.4 }}
      />

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 dark:to-black/20" />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDarkMode
            ? [
                "radial-gradient(circle at 20% 50%, rgba(150, 200, 255, 0.15) 0%, transparent 70%)",
                "radial-gradient(circle at 50% 50%, rgba(180, 150, 255, 0.15) 0%, transparent 70%)",
                "radial-gradient(circle at 80% 50%, rgba(150, 220, 255, 0.15) 0%, transparent 70%)",
                "radial-gradient(circle at 50% 50%, rgba(180, 150, 255, 0.15) 0%, transparent 70%)",
                "radial-gradient(circle at 20% 50%, rgba(150, 200, 255, 0.15) 0%, transparent 70%)",
              ]
            : [
                "radial-gradient(circle at 20% 50%, rgba(120, 150, 255, 0.05) 0%, transparent 70%)",
                "radial-gradient(circle at 50% 50%, rgba(150, 120, 255, 0.05) 0%, transparent 70%)",
                "radial-gradient(circle at 80% 50%, rgba(120, 180, 255, 0.05) 0%, transparent 70%)",
                "radial-gradient(circle at 50% 50%, rgba(150, 120, 255, 0.05) 0%, transparent 70%)",
                "radial-gradient(circle at 20% 50%, rgba(120, 150, 255, 0.05) 0%, transparent 70%)",
              ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle light rays */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <motion.div
          className="absolute -top-1/2 left-1/4 w-px h-[200%] bg-gradient-to-b from-transparent via-blue-400/10 to-transparent"
          animate={{
            x: [0, 100, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "rotate(12deg)" }}
        />
        <motion.div
          className="absolute -top-1/2 left-1/2 w-px h-[200%] bg-gradient-to-b from-transparent via-purple-400/10 to-transparent"
          animate={{
            x: [0, -80, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          style={{ transform: "rotate(-8deg)" }}
        />
        <motion.div
          className="absolute -top-1/2 right-1/3 w-px h-[200%] bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
          animate={{
            x: [0, 60, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          style={{ transform: "rotate(5deg)" }}
        />
      </motion.div>
    </motion.div>
  );
}
