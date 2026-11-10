// Author: @officialashutoshsrivastav - Full Stack Developer

import React, { useRef } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { TimeParts, getSevenSegmentBars } from '../utils/timeUtils';
import { AmbientTheme } from './ThemeController';

interface ClockDisplayProps {
  time: TimeParts;
  is24Hour: boolean;
  onToggle24Hour?: () => void;
  theme: AmbientTheme;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reducedMotion: boolean;
}

interface FlipDigitCellProps {
  digit: string;
  index: number;
  theme: AmbientTheme;
  reducedMotion: boolean;
  isSeconds?: boolean;
}

const SevenSegmentBackdrop: React.FC<{
  digit: string;
  ghostColor: string;
  activeColor: string;
}> = React.memo(({ digit, ghostColor, activeColor }) => {
  const [top, topRight, bottomRight, bottom, bottomLeft, topLeft, middle] =
    getSevenSegmentBars(digit);

  return (
    <svg
      viewBox="0 0 60 100"
      className="pointer-events-none absolute inset-0 w-full h-full p-2 sm:p-3.5 opacity-30"
      aria-hidden="true"
    >
      <polygon
        points="12,8 48,8 43,14 17,14"
        fill={top ? activeColor : ghostColor}
      />
      <polygon
        points="10,10 16,16 16,46 10,49"
        fill={topLeft ? activeColor : ghostColor}
      />
      <polygon
        points="50,10 50,49 44,46 44,16"
        fill={topRight ? activeColor : ghostColor}
      />
      <polygon
        points="12,50 17,47 43,47 48,50 43,53 17,53"
        fill={middle ? activeColor : ghostColor}
      />
      <polygon
        points="10,51 16,54 16,84 10,90"
        fill={bottomLeft ? activeColor : ghostColor}
      />
      <polygon
        points="50,51 50,90 44,84 44,54"
        fill={bottomRight ? activeColor : ghostColor}
      />
      <polygon
        points="17,86 43,86 48,92 12,92"
        fill={bottom ? activeColor : ghostColor}
      />
    </svg>
  );
});

const DigitHalfContent: React.FC<{
  value: string;
  theme: AmbientTheme;
  isSeconds: boolean;
  half: 'top' | 'bottom';
}> = React.memo(({ value, theme, isSeconds, half }) => {
  return (
    <div
      className={`relative w-full h-[200%] flex items-center justify-center select-none ${
        half === 'top' ? 'top-0' : '-top-full'
      }`}
    >
      <SevenSegmentBackdrop
        digit={value}
        ghostColor={theme.ghostSegmentColor}
        activeColor={`${theme.accentHex}15`}
      />
      <span
        className="relative z-10 font-horology font-bold tracking-tight text-[clamp(1.75rem,8.4vw,4.75rem)] leading-none"
        style={{
          color: isSeconds ? theme.accentHex : theme.digitTextColor,
          textShadow: theme.digitGlow,
        }}
      >
        {value}
      </span>
    </div>
  );
});

const FlipDigitCell: React.FC<FlipDigitCellProps> = ({
  digit,
  index,
  theme,
  reducedMotion,
  isSeconds = false,
}) => {
  const stateRef = useRef<{
    current: string;
    previous: string;
    flipId: number;
  }>({
    current: digit,
    previous: digit,
    flipId: 0,
  });

  if (digit !== stateRef.current.current) {
    stateRef.current = {
      current: digit,
      previous: stateRef.current.current,
      flipId: stateRef.current.flipId + 1,
    };
  }

  const { current, previous, flipId } = stateRef.current;
  const shouldFlip = flipId > 0 && previous !== current && !reducedMotion;

  const topAnimClass = isSeconds
    ? 'animate-flip-top-sec'
    : 'animate-flip-top-slow';
  const bottomAnimClass = isSeconds
    ? 'animate-flip-bottom-sec'
    : 'animate-flip-bottom-slow';
  const topShadowClass = isSeconds
    ? 'animate-shadow-top-sec'
    : 'animate-shadow-top-slow';
  const bottomShadowClass = isSeconds
    ? 'animate-shadow-bottom-sec'
    : 'animate-shadow-bottom-slow';
  const underShadowClass = isSeconds
    ? 'animate-under-shadow-sec'
    : 'animate-under-shadow-slow';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.55,
        delay: 0.1 + index * 0.055,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={reducedMotion ? undefined : { y: -2, scale: 1.015 }}
      className="flip-card-perspective relative rounded-xl sm:rounded-2xl w-[clamp(2.1rem,10.5vw,5.25rem)] h-[clamp(3.15rem,15.2vw,7.4rem)] select-none shrink-0"
      style={{
        boxShadow: theme.digitCellShadow,
      }}
    >
      <div
        className="
          absolute inset-x-0 top-0 h-1/2 overflow-hidden
          rounded-t-xl sm:rounded-t-2xl z-10
        "
        style={{
          background: theme.digitCellBg,
          borderTop: `1px solid ${theme.digitCellBorder}`,
          borderLeft: `1px solid ${theme.digitCellBorder}`,
          borderRight: `1px solid ${theme.digitCellBorder}`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-30"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, transparent 85%)',
          }}
          aria-hidden="true"
        />
        <DigitHalfContent
          value={current}
          theme={theme}
          isSeconds={isSeconds}
          half="top"
        />
      </div>

      <div
        className="
          absolute inset-x-0 bottom-0 h-1/2 overflow-hidden
          rounded-b-xl sm:rounded-b-2xl z-10
        "
        style={{
          background: theme.digitCellBg,
          borderBottom: `1px solid ${theme.digitCellBorder}`,
          borderLeft: `1px solid ${theme.digitCellBorder}`,
          borderRight: `1px solid ${theme.digitCellBorder}`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-35"
          style={{
            background: theme.isDark
              ? 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(0,0,0,0.45) 100%)'
              : 'linear-gradient(180deg, rgba(148,163,184,0.18) 0%, transparent 40%, rgba(148,163,184,0.22) 100%)',
          }}
          aria-hidden="true"
        />
        <DigitHalfContent
          value={shouldFlip ? previous : current}
          theme={theme}
          isSeconds={isSeconds}
          half="bottom"
        />
        {shouldFlip && (
          <div
            key={`under-shadow-${flipId}`}
            className={`pointer-events-none absolute inset-0 z-30 bg-black ${underShadowClass}`}
          />
        )}
      </div>

      {shouldFlip && (
        <div
          key={`flap-top-${flipId}`}
          className={`
            pointer-events-none absolute inset-x-0 top-0 h-1/2
            overflow-hidden rounded-t-xl sm:rounded-t-2xl z-30
            ${topAnimClass}
          `}
          style={{
            background: theme.digitCellBg,
            borderTop: `1px solid ${theme.digitCellBorder}`,
            borderLeft: `1px solid ${theme.digitCellBorder}`,
            borderRight: `1px solid ${theme.digitCellBorder}`,
          }}
          aria-hidden="true"
        >
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-30"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, transparent 85%)',
            }}
          />
          <DigitHalfContent
            value={previous}
            theme={theme}
            isSeconds={isSeconds}
            half="top"
          />
          <div
            className={`pointer-events-none absolute inset-0 z-30 bg-black ${topShadowClass}`}
          />
        </div>
      )}

      {shouldFlip && (
        <div
          key={`flap-bottom-${flipId}`}
          className={`
            pointer-events-none absolute inset-x-0 bottom-0 h-1/2
            overflow-hidden rounded-b-xl sm:rounded-b-2xl z-40
            ${bottomAnimClass}
          `}
          style={{
            background: theme.digitCellBg,
            borderBottom: `1px solid ${theme.digitCellBorder}`,
            borderLeft: `1px solid ${theme.digitCellBorder}`,
            borderRight: `1px solid ${theme.digitCellBorder}`,
          }}
          aria-hidden="true"
        >
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-35"
            style={{
              background: theme.isDark
                ? 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(0,0,0,0.45) 100%)'
                : 'linear-gradient(180deg, rgba(148,163,184,0.18) 0%, transparent 40%, rgba(148,163,184,0.22) 100%)',
            }}
          />
          <DigitHalfContent
            value={current}
            theme={theme}
            isSeconds={isSeconds}
            half="bottom"
          />
          <div
            className={`pointer-events-none absolute inset-0 z-30 bg-black ${bottomShadowClass}`}
          />
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] z-50"
        style={{
          backgroundColor: theme.isDark
            ? 'rgba(0, 0, 0, 0.78)'
            : 'rgba(100, 116, 139, 0.32)',
          boxShadow: theme.isDark
            ? '0 1px 0 rgba(255,255,255,0.07)'
            : '0 1px 0 rgba(255,255,255,0.8)',
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

const ColonSeparator: React.FC<{
  theme: AmbientTheme;
  reducedMotion: boolean;
  secondsValue: string;
}> = ({ theme, reducedMotion, secondsValue }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 sm:gap-3.5 px-0.5 sm:px-1.5 select-none shrink-0"
      aria-hidden="true"
    >
      {[0, 1].map((idx) => (
        <div key={idx} className="relative flex items-center justify-center">
          <motion.span
            key={`pulse-${secondsValue}-${idx}`}
            initial={{ scale: 0.85, opacity: 0.5 }}
            animate={
              reducedMotion
                ? { scale: 1, opacity: 0.3 }
                : { scale: [0.9, 1.7, 1.1], opacity: [0.48, 0, 0] }
            }
            transition={{
              duration: 0.85,
              delay: idx * 0.08,
              ease: 'easeOut',
            }}
            className="pointer-events-none absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full"
            style={{ backgroundColor: theme.accentHex }}
          />
          <motion.span
            key={`dot-${secondsValue}-${idx}`}
            initial={{ scale: 0.92, opacity: 0.65 }}
            animate={
              reducedMotion
                ? { opacity: 0.85, scale: 1 }
                : {
                    opacity: [0.65, 1, 0.58],
                    scale: [0.92, 1.12, 0.92],
                  }
            }
            transition={{
              duration: 0.95,
              delay: idx * 0.08,
              ease: 'easeInOut',
            }}
            className="relative w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full"
            style={{
              backgroundColor: theme.accentHex,
              boxShadow: `0 0 12px ${theme.accentHex}`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export const ClockDisplay: React.FC<ClockDisplayProps> = ({
  time,
  is24Hour,
  onToggle24Hour,
  theme,
  mouseX,
  mouseY,
  reducedMotion,
}) => {
  const [h1, h2] = time.hours.split('');
  const [m1, m2] = time.minutes.split('');
  const [s1, s2] = time.seconds.split('');

  const digitsShiftX = useTransform(mouseX, [0, 1], [-5, 5]);
  const digitsShiftY = useTransform(mouseY, [0, 1], [-3.5, 3.5]);
  const labelsShiftX = useTransform(mouseX, [0, 1], [-2, 2]);

  return (
    <section
      aria-label="Current Digital Time"
      className="relative rounded-[1.35rem] sm:rounded-[2rem] px-2 py-3 sm:p-6 md:p-7 transition-colors duration-500"
      style={{
        background: theme.wellSurface,
        boxShadow: theme.wellInsetShadow,
        border: `1px solid ${theme.wellBorder}`,
      }}
    >
      <span className="sr-only" data-testid="clock-full-readout">
        {`${time.hours} : ${time.minutes} : ${time.seconds} ${is24Hour ? '24H' : time.period}`}
      </span>

      <motion.div
        style={
          reducedMotion
            ? undefined
            : {
                x: digitsShiftX,
                y: digitsShiftY,
              }
        }
        className="flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-5"
      >
        <div
          className="flex items-center justify-center gap-1 sm:gap-2.5 max-w-full"
          data-testid="digital-time-display"
        >
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1 sm:gap-2">
              <FlipDigitCell
                digit={h1}
                index={0}
                theme={theme}
                reducedMotion={reducedMotion}
              />
              <FlipDigitCell
                digit={h2}
                index={1}
                theme={theme}
                reducedMotion={reducedMotion}
              />
            </div>
            <motion.span
              key={`lbl-h-${time.hours}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [1, 0.75] }}
              transition={{ duration: 0.6 }}
              style={reducedMotion ? undefined : { x: labelsShiftX }}
              className={`text-[9px] sm:text-[11px] font-telemetry tracking-[0.18em] ${theme.textMuted}`}
            >
              Hours
            </motion.span>
          </div>

          <div className="pb-4 sm:pb-5">
            <ColonSeparator
              theme={theme}
              reducedMotion={reducedMotion}
              secondsValue={time.seconds}
            />
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1 sm:gap-2">
              <FlipDigitCell
                digit={m1}
                index={2}
                theme={theme}
                reducedMotion={reducedMotion}
              />
              <FlipDigitCell
                digit={m2}
                index={3}
                theme={theme}
                reducedMotion={reducedMotion}
              />
            </div>
            <motion.span
              key={`lbl-m-${time.minutes}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [1, 0.75] }}
              transition={{ duration: 0.6 }}
              style={reducedMotion ? undefined : { x: labelsShiftX }}
              className={`text-[9px] sm:text-[11px] font-telemetry tracking-[0.18em] ${theme.textMuted}`}
            >
              Minutes
            </motion.span>
          </div>

          <div className="pb-4 sm:pb-5">
            <ColonSeparator
              theme={theme}
              reducedMotion={reducedMotion}
              secondsValue={time.seconds}
            />
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1 sm:gap-2">
              <FlipDigitCell
                digit={s1}
                index={4}
                theme={theme}
                reducedMotion={reducedMotion}
                isSeconds
              />
              <FlipDigitCell
                digit={s2}
                index={5}
                theme={theme}
                reducedMotion={reducedMotion}
                isSeconds
              />
            </div>
            <motion.span
              key={`lbl-s-${time.seconds}`}
              initial={{ opacity: 0.85 }}
              animate={{ opacity: [1, 0.8] }}
              transition={{ duration: 0.45 }}
              style={reducedMotion ? undefined : { x: labelsShiftX }}
              className={`text-[9px] sm:text-[11px] font-telemetry tracking-[0.18em] ${theme.accentColor}`}
            >
              Seconds
            </motion.span>
          </div>
        </div>

        <div
          onClick={onToggle24Hour}
          className="flex lg:flex-col items-center justify-center gap-2 lg:pb-5 lg:pl-1.5 cursor-pointer"
          data-testid="meridiem-indicator"
          title="Click to toggle 12H / 24H format"
        >
          {!is24Hour ? (
            <div
              className="flex lg:flex-col items-center gap-1.5 p-1.5 rounded-xl transition-colors duration-300"
              style={{
                background: theme.digitCellBg,
                border: `1px solid ${theme.digitCellBorder}`,
                boxShadow: theme.digitCellShadow,
              }}
              aria-label={`Meridiem Indicator: ${time.period}`}
            >
              {(['AM', 'PM'] as const).map((meridiem) => {
                const isActive = time.period === meridiem;
                return (
                  <div
                    key={meridiem}
                    className={`relative px-2.5 py-1 rounded-lg font-horology text-xs sm:text-sm font-bold tracking-wider select-none transition-colors duration-200 ${
                      isActive ? '' : `${theme.textMuted} opacity-55`
                    }`}
                    style={{
                      color: isActive ? theme.accentHex : undefined,
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-meridiem-pill"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 28,
                        }}
                        className="pointer-events-none absolute inset-0 rounded-lg"
                        style={{
                          background: theme.accentSoftBg,
                          border: `1px solid ${theme.accentBorder}`,
                          boxShadow: `0 0 10px ${theme.accentSoftBg}`,
                        }}
                      />
                    )}
                    <span className="relative z-10">{meridiem}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex lg:flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl font-horology text-xs sm:text-sm font-bold tracking-wider select-none"
              style={{
                background: theme.digitCellBg,
                border: `1px solid ${theme.accentBorder}`,
                boxShadow: theme.digitCellShadow,
                color: theme.accentHex,
              }}
              aria-label="24-Hour Format Active"
            >
              <span>24H</span>
              <span
                className={`text-[10px] font-telemetry font-medium ${theme.textMuted}`}
              >
                {time.period}
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div
        className="mt-3 sm:mt-5 pt-2.5 border-t flex items-center justify-between gap-3 sm:gap-4"
        style={{ borderColor: theme.dividerColor }}
      >
        <span
          className={`text-[10px] sm:text-[11px] font-telemetry ${theme.textMuted} whitespace-nowrap shrink-0`}
        >
          Solar Cycle
        </span>
        <div
          className="relative flex-1 h-1.5 rounded-full overflow-hidden"
          style={{
            backgroundColor: theme.isDark
              ? 'rgba(255,255,255,0.06)'
              : 'rgba(15,23,42,0.08)',
          }}
        >
          <motion.div
            className="relative h-full rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${time.dayProgressPercent}%` }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundColor: theme.accentHex,
              boxShadow: `0 0 10px ${theme.accentHex}`,
            }}
          >
            {!reducedMotion && (
              <motion.div
                animate={{ x: ['-100%', '220%'] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-y-0 w-1/3"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)',
                }}
              />
            )}
          </motion.div>
        </div>
        <span
          className={`text-[10px] sm:text-[11px] font-telemetry ${theme.textSecondary} whitespace-nowrap shrink-0`}
        >
          {time.dayProgressPercent.toFixed(1)}%
        </span>
      </div>
    </section>
  );
};
