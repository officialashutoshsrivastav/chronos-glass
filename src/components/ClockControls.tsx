// Author: @officialashutoshsrivastav - Full Stack Developer

import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'motion/react';
import {
  Clock,
  Volume2,
  VolumeX,
  Palette,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { AmbientTheme } from './ThemeController';

interface ClockControlsProps {
  is24Hour: boolean;
  onToggle24Hour: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  theme: AmbientTheme;
  onCycleTheme: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

interface CircularControlButtonProps {
  id: string;
  label: string;
  tooltip: string;
  subLabel: string;
  isActive?: boolean;
  onClick: () => void;
  theme: AmbientTheme;
  children: React.ReactNode;
}

const CircularControlButton: React.FC<CircularControlButtonProps> = ({
  id,
  label,
  tooltip,
  subLabel,
  isActive = false,
  onClick,
  theme,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const springX = useSpring(magX, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(magY, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    magX.set((e.clientX - cx) * 0.22);
    magY.set((e.clientY - cy) * 0.22);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    magX.set(0);
    magY.set(0);
  };

  const handleClick = () => {
    setRippleKey((k) => k + 1);
    onClick();
  };

  const currentShadow = isPressed
    ? theme.buttonShadowActive
    : isHovered
      ? theme.buttonShadowHover
      : theme.buttonShadowDefault;

  return (
    <div className="relative flex flex-col items-center gap-1.5">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            role="tooltip"
            className={`pointer-events-none absolute -top-11 z-30 px-3 py-1 rounded-full text-[11px] font-telemetry whitespace-nowrap backdrop-blur-xl ${theme.textPrimary}`}
            style={{
              background: theme.cardSurface,
              border: `1px solid ${theme.accentBorder}`,
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
            }}
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={btnRef}
        type="button"
        data-testid={id}
        aria-label={label}
        aria-pressed={isActive}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setIsHovered(true)}
        onBlur={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          x: springX,
          y: springY,
          background: theme.buttonSurface,
          border: `1px solid ${isActive ? theme.accentBorder : theme.buttonBorder}`,
          boxShadow: currentShadow,
          color: isActive ? theme.accentHex : undefined,
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 transition-shadow duration-200"
      >
        {isActive && (
          <span
            className="pointer-events-none absolute inset-1 rounded-full opacity-55"
            style={{
              border: `1px solid ${theme.accentHex}`,
              boxShadow: `inset 0 0 10px ${theme.accentSoftBg}`,
            }}
            aria-hidden="true"
          />
        )}

        <AnimatePresence>
          {rippleKey > 0 && (
            <motion.span
              key={`ripple-${rippleKey}`}
              initial={{ scale: 0.75, opacity: 0.75 }}
              animate={{ scale: 1.55, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                border: `1.5px solid ${theme.accentHex}`,
                boxShadow: `0 0 14px ${theme.accentHex}`,
              }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <span
          className={`relative z-10 flex items-center justify-center transition-colors duration-200 ${
            isActive ? '' : theme.textSecondary
          }`}
        >
          {children}
        </span>
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.span
          key={subLabel}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.18 }}
          className={`text-[10px] sm:text-[11px] font-telemetry tracking-wider ${
            isActive ? theme.accentColor : theme.textMuted
          } whitespace-nowrap select-none`}
        >
          {subLabel}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const ClockControls: React.FC<ClockControlsProps> = ({
  is24Hour,
  onToggle24Hour,
  soundEnabled,
  onToggleSound,
  theme,
  onCycleTheme,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
      className="mt-2 sm:mt-3 px-5 sm:px-8 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl backdrop-blur-xl transition-colors duration-500"
      style={{
        background: theme.standSurface,
        border: `1px solid ${theme.cardBorder}`,
        boxShadow: theme.standShadow,
        transform: 'perspective(600px) rotateX(12deg)',
      }}
    >
      <nav
        aria-label="Clock Controls"
        className="flex items-center justify-center gap-5 sm:gap-8"
      >
        <CircularControlButton
          id="control-format-toggle"
          label={`Switch time format. Currently ${is24Hour ? '24-hour' : '12-hour'} mode`}
          tooltip={is24Hour ? 'Switch to 12-Hour Format (H)' : 'Switch to 24-Hour Format (H)'}
          subLabel={is24Hour ? '24H' : '12H'}
          isActive={is24Hour}
          onClick={onToggle24Hour}
          theme={theme}
        >
          <div className="flex flex-col items-center justify-center">
            <motion.span
              animate={{ rotate: is24Hour ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Clock size={16} strokeWidth={2} />
            </motion.span>
            <AnimatePresence mode="wait">
              <motion.span
                key={is24Hour ? '24' : '12'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
                className="text-[8px] font-horology font-bold mt-0.5 leading-none"
              >
                {is24Hour ? '24' : '12'}
              </motion.span>
            </AnimatePresence>
          </div>
        </CircularControlButton>

        <CircularControlButton
          id="control-sound-toggle"
          label={soundEnabled ? 'Mute clock tick and UI sounds' : 'Enable clock tick and UI sounds'}
          tooltip={soundEnabled ? 'Sound ON · Click to Mute (M)' : 'Sound OFF · Click to Enable (M)'}
          subLabel={soundEnabled ? 'Sound On' : 'Muted'}
          isActive={soundEnabled}
          onClick={onToggleSound}
          theme={theme}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={soundEnabled ? 'on' : 'off'}
              initial={{ scale: 0.7, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 12 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              {soundEnabled ? (
                <Volume2 size={18} strokeWidth={2} />
              ) : (
                <VolumeX size={18} strokeWidth={2} />
              )}
            </motion.span>
          </AnimatePresence>
        </CircularControlButton>

        <CircularControlButton
          id="control-theme-toggle"
          label={`Cycle ambient theme. Current theme: ${theme.name}`}
          tooltip={`Theme: ${theme.name} (T)`}
          subLabel={theme.name.split(' ')[0]}
          isActive={theme.id !== 'obsidian'}
          onClick={onCycleTheme}
          theme={theme}
        >
          <motion.span
            key={theme.id}
            initial={{ rotate: -45, scale: 0.85 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="flex items-center justify-center"
          >
            <Palette size={18} strokeWidth={2} />
          </motion.span>
        </CircularControlButton>

        <CircularControlButton
          id="control-fullscreen-toggle"
          label={isFullscreen ? 'Exit fullscreen view' : 'Enter fullscreen view'}
          tooltip={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
          subLabel={isFullscreen ? 'Windowed' : 'Fullscreen'}
          isActive={isFullscreen}
          onClick={onToggleFullscreen}
          theme={theme}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isFullscreen ? 'min' : 'max'}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              {isFullscreen ? (
                <Minimize2 size={18} strokeWidth={2} />
              ) : (
                <Maximize2 size={18} strokeWidth={2} />
              )}
            </motion.span>
          </AnimatePresence>
        </CircularControlButton>
      </nav>
    </motion.div>
  );
};
