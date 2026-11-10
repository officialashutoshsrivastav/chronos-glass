// Author: @officialashutoshsrivastav - Full Stack Developer

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Sun, Sunset, Moon, Sunrise } from 'lucide-react';
import {
  DateParts,
  TimeZoneDetails,
  PRESET_TIMEZONES,
} from '../utils/timeUtils';
import { AmbientTheme } from './ThemeController';

interface DateDisplayProps {
  dateParts: DateParts;
  greeting: 'Good Morning' | 'Good Afternoon' | 'Good Evening' | 'Good Night';
  timeZoneInfo: TimeZoneDetails;
  selectedPresetId: string;
  onCycleTimeZone: () => void;
  theme: AmbientTheme;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({
  greeting,
  timeZoneInfo,
  selectedPresetId,
  onCycleTimeZone,
  theme,
}) => {
  const renderGreetingIcon = () => {
    const iconProps = {
      size: 16,
      style: { color: theme.accentHex },
      'aria-hidden': true as const,
    };
    switch (greeting) {
      case 'Good Morning':
        return <Sunrise {...iconProps} />;
      case 'Good Afternoon':
        return <Sun {...iconProps} />;
      case 'Good Evening':
        return <Sunset {...iconProps} />;
      case 'Good Night':
        return <Moon {...iconProps} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 pb-3 sm:pb-4 border-b"
        style={{ borderColor: theme.dividerColor }}
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, 6, -4, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center justify-center"
          >
            {renderGreetingIcon()}
          </motion.span>
          <AnimatePresence mode="wait">
            <motion.span
              key={greeting}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              data-testid="dynamic-greeting"
              className={`text-sm sm:text-base font-medium tracking-normal [word-spacing:0.12em] ${theme.textPrimary}`}
            >
              {greeting}
            </motion.span>
          </AnimatePresence>
          <span className={`text-xs ${theme.textMuted}`} aria-hidden="true">
            ·
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={theme.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className={`text-xs font-telemetry ${theme.textMuted}`}
            >
              {theme.name}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          onClick={onCycleTimeZone}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          aria-label={`Current time zone ${timeZoneInfo.formatted}. Click to switch reference time zone.`}
          data-testid="timezone-cycle-button"
          className="group flex items-center gap-2 text-xs sm:text-sm transition-opacity duration-200 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg px-2 py-0.5 -mx-2 cursor-pointer"
        >
          <Globe
            size={14}
            className="transition-transform duration-300 group-hover:rotate-45 shrink-0"
            style={{ color: theme.accentHex }}
            aria-hidden="true"
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={timeZoneInfo.formatted + selectedPresetId}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.22 }}
              data-testid="timezone-display"
              className={`font-telemetry font-medium ${theme.textSecondary} whitespace-nowrap`}
            >
              {timeZoneInfo.formatted}
            </motion.span>
          </AnimatePresence>
          <span
            className={`text-xs font-telemetry ${theme.textMuted} hidden md:inline`}
            aria-hidden="true"
          >
            ·
          </span>
          <span
            className={`text-[11px] font-telemetry ${theme.textMuted} hidden md:inline whitespace-nowrap`}
          >
            {timeZoneInfo.offsetLabel}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

interface CalendarFooterProps {
  dateParts: DateParts;
  timeZoneInfo: TimeZoneDetails;
  selectedPresetId: string;
  onSelectPreset: (id: string) => void;
  theme: AmbientTheme;
}

export const CalendarFooter: React.FC<CalendarFooterProps> = ({
  dateParts,
  timeZoneInfo,
  selectedPresetId,
  onSelectPreset,
  theme,
}) => {
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3 sm:gap-4 pt-0.5"
    >
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={dateParts.formattedDate}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            data-testid="date-display"
            className={`text-base sm:text-xl md:text-2xl font-medium tracking-normal [word-spacing:0.14em] ${theme.textPrimary}`}
          >
            <span style={{ color: theme.accentHex }} className="font-semibold">
              {dateParts.weekday},
            </span>{' '}
            <span>{`${dateParts.month} ${dateParts.day}, ${dateParts.year}`}</span>
          </motion.p>
        </AnimatePresence>
        <p className={`mt-1 text-[11px] sm:text-xs font-telemetry ${theme.textMuted}`}>
          <span>{timeZoneInfo.formatted}</span>
          <span aria-hidden="true"> · </span>
          <span>{timeZoneInfo.offsetLabel}</span>
        </p>
      </div>

      <div
        role="group"
        aria-label="Reference Time Zone Selector"
        onMouseLeave={() => setHoveredZoneId(null)}
        className="relative flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
      >
        {PRESET_TIMEZONES.map((zone) => {
          const active = selectedPresetId === zone.id;
          const isHovered = hoveredZoneId === zone.id;
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSelectPreset(zone.id)}
              onMouseEnter={() => setHoveredZoneId(zone.id)}
              aria-pressed={active}
              className={`relative px-2.5 py-1 text-[11px] font-telemetry rounded-md transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                active
                  ? `${theme.textPrimary} font-semibold`
                  : `${theme.textMuted} hover:opacity-95`
              }`}
            >
              {isHovered && !active && (
                <motion.span
                  layoutId="hover-timezone-trail"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 32,
                  }}
                  className="pointer-events-none absolute inset-0 rounded-md"
                  style={{
                    backgroundColor: theme.isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(15, 23, 42, 0.05)',
                  }}
                />
              )}
              {active && (
                <motion.span
                  layoutId="active-timezone-tab"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 28,
                  }}
                  className="pointer-events-none absolute inset-0 rounded-md"
                  style={{
                    background: theme.accentSoftBg,
                    border: `1px solid ${theme.accentBorder}`,
                    boxShadow: `0 0 12px ${theme.accentSoftBg}`,
                  }}
                />
              )}
              <span className="relative z-10">
                {zone.id === 'local'
                  ? 'Local'
                  : zone.codeHint || zone.id.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
