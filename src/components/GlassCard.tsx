// Author: @officialashutoshsrivastav - Full Stack Developer

import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { AmbientTheme } from './ThemeController';

interface GlassCardProps {
  theme: AmbientTheme;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reducedMotion: boolean;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  theme,
  mouseX,
  mouseY,
  reducedMotion,
  children,
}) => {
  const rotateX = useTransform(mouseY, [0, 1], [7.5, -3.5]);
  const rotateY = useTransform(mouseX, [0, 1], [-6.5, 6.5]);
  const cardShiftX = useTransform(mouseX, [0, 1], [-4, 4]);
  const cardShiftY = useTransform(mouseY, [0, 1], [-3, 3]);

  const innerParallaxX = useTransform(mouseX, [0, 1], [-3.5, 3.5]);
  const innerParallaxY = useTransform(mouseY, [0, 1], [-2.5, 2.5]);

  const glareBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) => {
      const posX = Math.round((1 - x) * 100);
      const posY = Math.round((1 - y) * 100);
      const spotX = Math.round(x * 100);
      const spotY = Math.round(y * 100);
      const highlightAlpha = theme.isDark ? 0.085 : 0.45;
      return `radial-gradient(560px circle at ${spotX}% ${spotY}%, rgba(255, 255, 255, ${highlightAlpha}), transparent 58%), radial-gradient(420px circle at ${posX}% ${posY}%, ${theme.accentHex}16, transparent 65%)`;
    }
  );

  const diagonalSheenTransform = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `translate3d(${(x - 0.5) * 160}px, ${(y - 0.5) * 90}px, 0) rotate(-24deg)`
  );

  const edgeHighlightGradient = useTransform(
    [mouseX, mouseY],
    ([x]: number[]) => {
      const pct = Math.round(x * 100);
      return `linear-gradient(90deg, transparent ${Math.max(0, pct - 35)}%, ${theme.accentHex}99 ${pct}%, transparent ${Math.min(100, pct + 35)}%)`;
    }
  );

  return (
    <div className="perspective-stage w-full max-w-[52rem] mx-auto px-2 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24, rotateX: 9 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 0.95,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={
          reducedMotion
            ? {
                transform: 'rotateX(3deg)',
                transformStyle: 'preserve-3d',
              }
            : {
                rotateX,
                rotateY,
                x: cardShiftX,
                y: cardShiftY,
                transformStyle: 'preserve-3d',
              }
        }
        className="relative w-full flex flex-col items-center"
      >
        <div
          className="pointer-events-none relative z-20 w-28 sm:w-40 h-2.5 sm:h-3 rounded-t-xl -mb-[1px]"
          style={{
            background: theme.standSurface,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderLeft: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            transform: 'translateZ(-4px)',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.35)',
          }}
          aria-hidden="true"
        >
          <div
            className="w-12 sm:w-16 h-[2px] mx-auto mt-1 rounded-full opacity-75"
            style={{
              backgroundColor: theme.accentHex,
              boxShadow: `0 0 8px ${theme.accentHex}`,
            }}
          />
        </div>

        <div
          className="relative w-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.85rem] sm:rounded-[2.6rem]"
            style={{
              background: theme.standSurface,
              border: `1px solid ${theme.cardBorder}`,
              transform: 'translateZ(-18px) translateY(10px) scale(0.992)',
              boxShadow: '0 28px 60px rgba(0, 0, 0, 0.85)',
            }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-0 rounded-[1.8rem] sm:rounded-[2.55rem]"
            style={{
              background: theme.standSurface,
              border: `1px solid ${theme.cardBorder}`,
              transform: 'translateZ(-9px) translateY(5px) scale(0.996)',
            }}
            aria-hidden="true"
          />

          <div
            className="relative w-full rounded-[1.75rem] sm:rounded-[2.5rem] p-3.5 sm:p-7 md:p-9 backdrop-blur-2xl transition-colors duration-500 overflow-hidden"
            style={{
              background: theme.cardSurface,
              border: `1.5px solid ${theme.cardBorder}`,
              boxShadow: `${theme.cardOuterShadow}, ${theme.cardInnerHighlight}`,
            }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[1.75rem] sm:rounded-[2.5rem] transition-opacity duration-300"
              style={{
                background: glareBackground,
              }}
              aria-hidden="true"
            />

            <motion.div
              style={{ transform: diagonalSheenTransform }}
              className="pointer-events-none absolute -inset-x-24 -inset-y-32 opacity-60"
              aria-hidden="true"
            >
              <div
                className="w-full h-full"
                style={{
                  background: theme.isDark
                    ? 'linear-gradient(90deg, transparent 35%, rgba(255,255,255,0.03) 47%, rgba(56,189,248,0.045) 50%, rgba(255,255,255,0.025) 53%, transparent 65%)'
                    : 'linear-gradient(90deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)',
                }}
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute top-0 left-6 right-6 h-[1.5px]"
              style={{
                background: edgeHighlightGradient,
              }}
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute inset-2 sm:inset-3 rounded-[1.35rem] sm:rounded-[2rem] border opacity-35"
              style={{ borderColor: theme.dividerColor }}
              aria-hidden="true"
            />

            <motion.div
              className="relative z-10 flex flex-col gap-3.5 sm:gap-5"
              style={
                reducedMotion
                  ? { transform: 'translateZ(20px)' }
                  : {
                      x: innerParallaxX,
                      y: innerParallaxY,
                      transform: 'translateZ(22px)',
                      transformStyle: 'preserve-3d',
                    }
              }
            >
              {children}
            </motion.div>
          </div>
        </div>

        <div
          className="relative z-0 flex flex-col items-center w-full pointer-events-none mt-1"
          style={{ transformStyle: 'preserve-3d' }}
          aria-hidden="true"
        >
          <div className="flex items-center justify-between w-[56%] sm:w-[48%] max-w-[20rem] h-3.5 sm:h-5 px-4">
            <div
              className="w-7 sm:w-10 h-full rounded-b-lg shadow-lg"
              style={{
                background: theme.standSurface,
                borderLeft: `1px solid ${theme.cardBorder}`,
                borderRight: `1px solid ${theme.cardBorder}`,
              }}
            />
            <div
              className="w-7 sm:w-10 h-full rounded-b-lg shadow-lg"
              style={{
                background: theme.standSurface,
                borderLeft: `1px solid ${theme.cardBorder}`,
                borderRight: `1px solid ${theme.cardBorder}`,
              }}
            />
          </div>

          <div
            className="w-[78%] sm:w-[66%] max-w-[30rem] h-4 sm:h-5 rounded-t-xl rounded-b-2xl transition-all duration-500"
            style={{
              background: theme.standSurface,
              border: `1px solid ${theme.cardBorder}`,
              boxShadow: theme.standShadow,
              transform: 'rotateX(35deg)',
            }}
          >
            <div
              className="w-2/3 mx-auto h-[2px] mt-1.5 rounded-full opacity-75"
              style={{
                backgroundColor: theme.accentHex,
                boxShadow: `0 0 10px ${theme.accentHex}`,
              }}
            />
          </div>

          <div
            className="w-[88%] sm:w-[76%] max-w-[36rem] h-6 sm:h-8 -mt-2 rounded-full blur-xl opacity-90"
            style={{
              background: theme.isDark
                ? 'radial-gradient(ellipse at center, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.6) 45%, transparent 78%)'
                : 'radial-gradient(ellipse at center, rgba(100,116,139,0.65) 0%, transparent 78%)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
