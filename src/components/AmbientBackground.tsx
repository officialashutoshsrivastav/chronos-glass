// Author: @officialashutoshsrivastav - Full Stack Developer

import React, { useEffect, useRef } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { AmbientTheme } from './ThemeController';

interface AmbientBackgroundProps {
  theme: AmbientTheme;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reducedMotion: boolean;
}

interface Particle {
  baseX: number;
  baseY: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  depth: number;
  phase: number;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  theme,
  mouseX,
  mouseY,
  reducedMotion,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const unsubX = mouseX.on('change', (v) => {
      mouseRef.current.x = v;
    });
    const unsubY = mouseY.on('change', (v) => {
      mouseRef.current.y = v;
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY]);

  const spotlightTransform = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `translate3d(${(x - 0.5) * 420}px, ${(y - 0.5) * 320}px, 0)`
  );

  const secondaryOrbParallax = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `translate3d(${(0.5 - x) * 75}px, ${(0.5 - y) * 60}px, 0)`
  );

  const gridParallax = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `rotateX(56deg) translate3d(${(0.5 - x) * 28}px, ${(0.5 - y) * 16}px, 0)`
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const count = Math.min(28, Math.max(14, Math.floor(width / 62)));
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      baseX: ((i * 137.5) % 100) * 0.01 * width,
      baseY: ((i * 293.7) % 100) * 0.01 * height * 0.78,
      radius: (i % 3) * 0.65 + 0.75,
      vx: (((i % 5) - 2) * 0.05 || 0.035) * (i % 2 === 0 ? 1 : -1),
      vy: -((i % 4) * 0.045 + 0.03),
      alpha: ((i % 5) + 2) * 0.05,
      depth: (i % 3) + 1,
      phase: i * 0.9,
    }));

    let tickCount = 0;

    const renderParticles = () => {
      tickCount += 0.03;
      ctx.clearRect(0, 0, width, height);

      const mx = (mouseRef.current.x - 0.5) * 36;
      const my = (mouseRef.current.y - 0.5) * 26;

      for (const p of particles) {
        if (!reducedMotion) {
          p.baseX += p.vx * p.depth * 0.5;
          p.baseY += p.vy * p.depth * 0.5;

          if (p.baseX < -20) p.baseX = width + 20;
          if (p.baseX > width + 20) p.baseX = -20;
          if (p.baseY < -20) p.baseY = height * 0.78;
          if (p.baseY > height * 0.78) p.baseY = -20;
        }

        const parallaxX = p.baseX - mx * p.depth * 0.55;
        const parallaxY = p.baseY - my * p.depth * 0.55;
        const twinkle = reducedMotion
          ? p.alpha
          : p.alpha * (0.75 + 0.25 * Math.sin(tickCount + p.phase));

        ctx.beginPath();
        ctx.arc(parallaxX, parallaxY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${theme.particleRgb}, ${twinkle.toFixed(3)})`;
        ctx.fill();
      }
    };

    renderParticles();

    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (!reducedMotion) {
      intervalId = setInterval(() => {
        animationFrameId = requestAnimationFrame(renderParticles);
      }, 36);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (intervalId) clearInterval(intervalId);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [theme.particleRgb, reducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
      className="fixed inset-0 pointer-events-none overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: theme.bgHex }}
      aria-hidden="true"
    >
      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                x: [0, 42, -28, 0],
                y: [0, -34, 24, 0],
                scale: [1, 1.07, 0.95, 1],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-36 left-1/4 w-[28rem] sm:w-[36rem] h-[28rem] sm:h-[36rem] rounded-full blur-[135px]"
        style={{ background: theme.orbPrimary }}
      />

      <motion.div
        style={{ transform: secondaryOrbParallax }}
        className="absolute bottom-1/4 right-1/4 w-[28rem] sm:w-[36rem] h-[28rem] sm:h-[36rem] rounded-full blur-[140px]"
      >
        <div
          className="w-full h-full rounded-full transition-colors duration-700"
          style={{ background: theme.orbSecondary }}
        />
      </motion.div>

      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                scale: [1, 1.05, 1],
                opacity: [0.85, 1, 0.85],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] sm:w-[46rem] h-[22rem] sm:h-[26rem] rounded-full blur-[150px] transition-colors duration-700"
        style={{ background: theme.orbTertiary }}
      />

      <motion.div
        style={{ transform: spotlightTransform }}
        className="absolute top-1/2 left-1/2 -ml-[24rem] -mt-[24rem] w-[48rem] h-[48rem] rounded-full blur-[105px] transition-colors duration-500"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.cursorSpotlight} 0%, transparent 68%)`,
          }}
        />
      </motion.div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-85"
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[44vh] sm:h-[42vh] flex flex-col justify-end overflow-hidden"
        style={{ perspective: '900px' }}
      >
        <motion.div
          style={{
            transform: reducedMotion ? 'rotateX(56deg)' : gridParallax,
            background: theme.deskSurfaceGradient,
            borderTop: `2px solid ${theme.deskEdgeLine}`,
            boxShadow: theme.isDark
              ? '0 -28px 70px rgba(0, 0, 0, 0.92), inset 0 4px 36px rgba(255, 255, 255, 0.04)'
              : '0 -20px 50px rgba(148, 163, 184, 0.45), inset 0 4px 30px rgba(255, 255, 255, 0.85)',
          }}
          className="relative w-[136%] -left-[18%] h-full origin-bottom transition-colors duration-700"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.dividerColor} 1px, transparent 1px), linear-gradient(to bottom, ${theme.dividerColor} 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[65%] max-w-[46rem] h-40 blur-3xl opacity-65 transition-colors duration-700"
            style={{
              background: `radial-gradient(ellipse at center, ${theme.accentHex}44 0%, transparent 72%)`,
            }}
          />

          <div
            className="absolute inset-x-[18%] top-6 bottom-12 rounded-[2.5rem] border opacity-30"
            style={{
              borderColor: theme.cardBorder,
              background: theme.isDark
                ? 'rgba(0, 0, 0, 0.28)'
                : 'rgba(255, 255, 255, 0.35)',
            }}
          />
        </motion.div>

        <div
          className="relative z-10 w-full h-3 sm:h-4 shrink-0"
          style={{
            background: theme.standSurface,
            borderTop: `1px solid ${theme.cardBorder}`,
            boxShadow: '0 -4px 16px rgba(0,0,0,0.6)',
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: theme.isDark
            ? 'radial-gradient(circle at 50% 42%, transparent 38%, rgba(2, 4, 9, 0.7) 100%)'
            : 'radial-gradient(circle at 50% 42%, transparent 42%, rgba(185, 198, 214, 0.4) 100%)',
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.028] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="horology-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#horology-noise)" />
      </svg>
    </motion.div>
  );
};
