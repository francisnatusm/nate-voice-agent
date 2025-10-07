'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function HudBackground() {
  const [particles, setParticles] = useState<
    Array<{
      left: number;
      top: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    // Generate random particle data only on client side
    const particleData = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(particleData);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Dark blurred background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 backdrop-blur-sm" />

      {/* Animated HUD Elements */}
      <div className="absolute inset-0">
        {/* Central Reticle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="relative h-32 w-32">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Middle ring */}
            <motion.div
              className="absolute inset-2 rounded-full border border-cyan-300"
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Inner ring */}
            <motion.div
              className="absolute inset-4 rounded-full border border-cyan-500"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Crosshairs */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 transform bg-cyan-400" />
              <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 transform bg-cyan-400" />
            </div>
            {/* Center cursor */}
            <motion.div
              className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform bg-cyan-300"
              animate={{
                x: [0, 8, 0],
                y: [0, -8, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Top-Left Quadrant */}
        <div className="absolute top-8 left-8">
          {/* Globe Icon */}
          <motion.div
            className="relative mb-4 h-12 w-12 rounded-full border border-cyan-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-2 rounded-full border border-cyan-300" />
            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 transform bg-cyan-400" />
            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 transform bg-cyan-400" />
          </motion.div>

          {/* Data Bars */}
          <div className="space-y-1">
            {[8, 12, 6, 10, 4].map((width, i) => (
              <motion.div
                key={i}
                className="h-1 bg-cyan-400"
                style={{ width: `${width * 4}px` }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>

        {/* Top-Right Quadrant */}
        <div className="absolute top-8 right-8">
          {/* Plus Sign */}
          <motion.div
            className="relative mb-4 h-8 w-8"
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 transform bg-cyan-400" />
            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 transform bg-cyan-400" />
          </motion.div>

          {/* Circular Progress */}
          <motion.div
            className="relative mb-4 h-12 w-12 rounded-full border-2 border-cyan-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="absolute inset-1 rounded-full border border-cyan-300"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Scattered Grid */}
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-2 w-2 bg-cyan-400"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom-Left Quadrant */}
        <div className="absolute bottom-8 left-8">
          {/* Hexagonal Molecule */}
          <motion.div
            className="relative mb-4 h-16 w-16"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0">
              {/* Hexagon */}
              <svg className="h-full w-full" viewBox="0 0 64 64">
                <polygon
                  points="32,8 48,20 48,44 32,56 16,44 16,20"
                  fill="none"
                  stroke="rgb(34, 211, 238)"
                  strokeWidth="1"
                />
                <circle cx="32" cy="20" r="2" fill="rgb(34, 211, 238)" />
                <circle cx="48" cy="32" r="2" fill="rgb(34, 211, 238)" />
                <circle cx="48" cy="44" r="2" fill="rgb(34, 211, 238)" />
                <circle cx="32" cy="56" r="2" fill="rgb(34, 211, 238)" />
                <circle cx="16" cy="44" r="2" fill="rgb(34, 211, 238)" />
                <circle cx="16" cy="32" r="2" fill="rgb(34, 211, 238)" />
              </svg>
            </div>
          </motion.div>

          {/* Honeycomb Structure */}
          <div className="mb-4 grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-3 w-3 border border-cyan-400"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>

          {/* Line Graph */}
          <motion.div
            className="relative h-8 w-20"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg className="h-full w-full" viewBox="0 0 80 32">
              <motion.path
                d="M0,24 Q20,8 40,16 T80,12"
                fill="none"
                stroke="rgb(34, 211, 238)"
                strokeWidth="1"
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Bottom-Right Quadrant */}
        <div className="absolute right-8 bottom-8">
          {/* Bar Chart */}
          <div className="mb-4 flex items-end space-x-1">
            {[4, 8, 12].map((height, i) => (
              <motion.div
                key={i}
                className="w-2 bg-cyan-400"
                style={{ height: `${height * 2}px` }}
                animate={{
                  height: [`${height * 2}px`, `${height * 3}px`, `${height * 2}px`],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Network/Circuit Diagram */}
          <motion.div
            className="relative h-12 w-16"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg className="h-full w-full" viewBox="0 0 64 48">
              <motion.circle
                cx="8"
                cy="8"
                r="2"
                fill="rgb(34, 211, 238)"
                animate={{ r: [2, 3, 2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="32"
                cy="16"
                r="2"
                fill="rgb(34, 211, 238)"
                animate={{ r: [2, 3, 2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.circle
                cx="56"
                cy="8"
                r="2"
                fill="rgb(34, 211, 238)"
                animate={{ r: [2, 3, 2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <motion.circle
                cx="16"
                cy="32"
                r="2"
                fill="rgb(34, 211, 238)"
                animate={{ r: [2, 3, 2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />
              <motion.circle
                cx="48"
                cy="40"
                r="2"
                fill="rgb(34, 211, 238)"
                animate={{ r: [2, 3, 2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
              />
              <motion.line
                x1="8"
                y1="8"
                x2="32"
                y2="16"
                stroke="rgb(34, 211, 238)"
                strokeWidth="1"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.line
                x1="32"
                y1="16"
                x2="56"
                y2="8"
                stroke="rgb(34, 211, 238)"
                strokeWidth="1"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.line
                x1="16"
                y1="32"
                x2="48"
                y2="40"
                stroke="rgb(34, 211, 238)"
                strokeWidth="1"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </svg>
          </motion.div>

          {/* Small Circle */}
          <motion.div
            className="relative mt-2 h-4 w-4 rounded-full border border-cyan-400"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-cyan-300"
              animate={{ scale: [1, 2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Additional floating particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-400"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
