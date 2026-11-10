// Author: @officialashutoshsrivastav - Full Stack Developer

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import {
  formatTimeParts,
  formatDateParts,
  getDynamicGreeting,
  getTimeZoneDetails,
  PRESET_TIMEZONES,
} from '../utils/timeUtils';
import {
  AMBIENT_THEMES,
  ThemeId,
  getNextThemeId,
} from './ThemeController';
import { soundManager } from './SoundManager';
import { AmbientBackground } from './AmbientBackground';
import { GlassCard } from './GlassCard';
import { ClockDisplay } from './ClockDisplay';
import { DateDisplay, CalendarFooter } from './DateDisplay';
import { ClockControls } from './ClockControls';

export const DigitalClock: React.FC = () => {
  const [now, setNow] = useState<Date>(() => new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [themeId, setThemeId] = useState<ThemeId>('obsidian');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(() => {
    try {
      const sysTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (!sysTz || sysTz === 'UTC' || sysTz === 'Etc/UTC') {
        return 'ist';
      }
      return 'local';
    } catch {
      return 'ist';
    }
  });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const lastSecondRef = useRef<string>('');

  const theme = AMBIENT_THEMES[themeId];

  const rawMouseX = useMotionValue(0.5);
  const rawMouseY = useMotionValue(0.5);

  const smoothMouseX = useSpring(rawMouseX, {
    stiffness: 95,
    damping: 24,
    mass: 0.55,
  });
  const smoothMouseY = useSpring(rawMouseY, {
    stiffness: 95,
    damping: 24,
    mass: 0.55,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const nx = Math.min(1, Math.max(0, (e.gamma + 30) / 60));
        const ny = Math.min(1, Math.max(0, (e.beta - 15) / 60));
        rawMouseX.set(nx);
        rawMouseY.set(ny);
      }
    };
    window.addEventListener('deviceorientation', handleOrientation, {
      passive: true,
    });
    return () =>
      window.removeEventListener('deviceorientation', handleOrientation);
  }, [rawMouseX, rawMouseY, reducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    document.body.style.backgroundColor = theme.bgHex;
  }, [theme.isDark, theme.bgHex]);

  const activePreset =
    PRESET_TIMEZONES.find((p) => p.id === selectedPresetId) ||
    PRESET_TIMEZONES[0];

  const timeParts = formatTimeParts(now, is24Hour, activePreset.iana);
  const dateParts = formatDateParts(now, activePreset.iana);
  const greeting = getDynamicGreeting(timeParts.hour24);
  const timeZoneInfo = getTimeZoneDetails(now, activePreset.iana);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isMounted = true;

    const tick = () => {
      if (!isMounted) return;
      const current = new Date();
      setNow(current);

      const sec = String(current.getSeconds()).padStart(2, '0');
      if (sec !== lastSecondRef.current) {
        lastSecondRef.current = sec;
        soundManager.playTick(sec === '00');
      }

      const delay = 1000 - (Date.now() % 1000);
      timeoutId = setTimeout(tick, Math.max(50, delay));
    };

    const initialDelay = 1000 - (Date.now() % 1000);
    timeoutId = setTimeout(tick, initialDelay);

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion) return;
      const { clientX, clientY } = e;
      const nx = Math.min(1, Math.max(0, clientX / window.innerWidth));
      const ny = Math.min(1, Math.max(0, clientY / window.innerHeight));
      rawMouseX.set(nx);
      rawMouseY.set(ny);
    },
    [rawMouseX, rawMouseY, reducedMotion]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (reducedMotion || e.touches.length === 0) return;
      const touch = e.touches[0];
      const nx = Math.min(1, Math.max(0, touch.clientX / window.innerWidth));
      const ny = Math.min(1, Math.max(0, touch.clientY / window.innerHeight));
      rawMouseX.set(nx);
      rawMouseY.set(ny);
    },
    [rawMouseX, rawMouseY, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    rawMouseX.set(0.5);
    rawMouseY.set(0.5);
  }, [rawMouseX, rawMouseY]);

  const handleToggle24Hour = useCallback(() => {
    soundManager.playButtonClick('toggle');
    setIs24Hour((prev) => !prev);
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundManager.setEnabled(next);
      if (next) {
        soundManager.playEnableConfirm();
      }
      return next;
    });
  }, []);

  const handleCycleTheme = useCallback(() => {
    soundManager.playButtonClick('theme');
    setThemeId((prev) => getNextThemeId(prev));
  }, []);

  const handleCycleTimeZone = useCallback(() => {
    soundManager.playButtonClick('toggle');
    setSelectedPresetId((prev) => {
      const idx = PRESET_TIMEZONES.findIndex((p) => p.id === prev);
      const nextIdx = (idx + 1) % PRESET_TIMEZONES.length;
      return PRESET_TIMEZONES[nextIdx].id;
    });
  }, []);

  const handleSelectPreset = useCallback((id: string) => {
    soundManager.playButtonClick('toggle');
    setSelectedPresetId(id);
  }, []);

  const handleToggleFullscreen = useCallback(async () => {
    soundManager.playButtonClick('fullscreen');
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        } else {
          setIsFullscreen((prev) => !prev);
        }
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === 'h') {
        handleToggle24Hour();
      } else if (key === 'm') {
        handleToggleSound();
      } else if (key === 't') {
        handleCycleTheme();
      } else if (key === 'f') {
        handleToggleFullscreen();
      } else if (key === 'z') {
        handleCycleTimeZone();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleToggle24Hour,
    handleToggleSound,
    handleCycleTheme,
    handleToggleFullscreen,
    handleCycleTimeZone,
  ]);

  return (
    <main
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      data-theme={theme.id}
      data-format={is24Hour ? '24h' : '12h'}
      className={`relative min-h-screen w-full flex flex-col items-center justify-between py-4 sm:py-8 px-2 sm:px-4 overflow-x-hidden select-none transition-colors duration-700 ${
        theme.isDark ? 'dark' : ''
      }`}
    >
      <AmbientBackground
        theme={theme}
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        reducedMotion={reducedMotion}
      />

      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto py-2">
        <GlassCard
          theme={theme}
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          reducedMotion={reducedMotion}
        >
          <DateDisplay
            dateParts={dateParts}
            greeting={greeting}
            timeZoneInfo={timeZoneInfo}
            selectedPresetId={selectedPresetId}
            onCycleTimeZone={handleCycleTimeZone}
            theme={theme}
          />

          <ClockDisplay
            time={timeParts}
            is24Hour={is24Hour}
            onToggle24Hour={handleToggle24Hour}
            theme={theme}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            reducedMotion={reducedMotion}
          />

          <CalendarFooter
            dateParts={dateParts}
            timeZoneInfo={timeZoneInfo}
            selectedPresetId={selectedPresetId}
            onSelectPreset={handleSelectPreset}
            theme={theme}
          />
        </GlassCard>

        <ClockControls
          is24Hour={is24Hour}
          onToggle24Hour={handleToggle24Hour}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          theme={theme}
          onCycleTheme={handleCycleTheme}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        data-testid="copyright-footer"
        className="relative z-10 w-full flex items-center justify-center pt-3 pb-1 px-2 text-center"
      >
        <p className={`text-[11px] sm:text-sm font-medium tracking-wide whitespace-nowrap ${theme.textSecondary}`}>
          <span>© {new Date().getFullYear()} </span>
          <span style={{ color: theme.accentHex }} className="font-semibold">
            @officialashutoshsrivastav
          </span>
          <span> - Full Stack Developer</span>
        </p>
      </motion.footer>
    </main>
  );
};
