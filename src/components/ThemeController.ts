// Author: @officialashutoshsrivastav - Full Stack Developer

export type ThemeId = 'obsidian' | 'amber' | 'cryo' | 'ceramic';

export interface AmbientTheme {
  id: ThemeId;
  name: string;
  subtitle: string;
  isDark: boolean;
  bgHex: string;
  deskSurfaceGradient: string;
  deskEdgeLine: string;
  standSurface: string;
  standShadow: string;
  orbPrimary: string;
  orbSecondary: string;
  orbTertiary: string;
  cursorSpotlight: string;
  particleRgb: string;
  cardSurface: string;
  cardBorder: string;
  cardOuterShadow: string;
  cardInnerHighlight: string;
  wellSurface: string;
  wellInsetShadow: string;
  wellBorder: string;
  digitCellBg: string;
  digitCellBorder: string;
  digitCellShadow: string;
  digitTextColor: string;
  digitGlow: string;
  ghostSegmentColor: string;
  accentColor: string;
  accentHex: string;
  accentSoftBg: string;
  accentBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  dividerColor: string;
  buttonSurface: string;
  buttonBorder: string;
  buttonShadowDefault: string;
  buttonShadowHover: string;
  buttonShadowActive: string;
}

export const AMBIENT_THEMES: Record<ThemeId, AmbientTheme> = {
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Sapphire',
    subtitle: 'Deep Space Horology',
    isDark: true,
    bgHex: '#05070B',
    deskSurfaceGradient:
      'linear-gradient(180deg, rgba(10, 15, 26, 0.95) 0%, rgba(4, 6, 11, 1) 100%)',
    deskEdgeLine: 'rgba(56, 189, 248, 0.16)',
    standSurface:
      'linear-gradient(180deg, rgba(24, 33, 50, 0.95) 0%, rgba(9, 13, 21, 0.98) 100%)',
    standShadow: '0 22px 45px rgba(0, 0, 0, 0.95)',
    orbPrimary: 'rgba(56, 189, 248, 0.13)',
    orbSecondary: 'rgba(99, 102, 241, 0.10)',
    orbTertiary: 'rgba(14, 165, 233, 0.08)',
    cursorSpotlight: 'rgba(56, 189, 248, 0.11)',
    particleRgb: '186, 230, 253',
    cardSurface:
      'linear-gradient(155deg, rgba(22, 30, 46, 0.86) 0%, rgba(9, 13, 22, 0.94) 100%)',
    cardBorder: 'rgba(255, 255, 255, 0.12)',
    cardOuterShadow:
      '0 36px 75px rgba(0, 2, 6, 0.95), 20px 24px 56px rgba(1, 3, 8, 0.9), -14px -14px 40px rgba(36, 50, 76, 0.22), 0 0 0 1px rgba(56, 189, 248, 0.1)',
    cardInnerHighlight:
      'inset 0 2px 2px rgba(255, 255, 255, 0.22), inset 0 -3px 6px rgba(0, 0, 0, 0.8)',
    wellSurface:
      'linear-gradient(180deg, rgba(4, 7, 12, 0.92) 0%, rgba(10, 15, 25, 0.85) 100%)',
    wellInsetShadow:
      'inset 10px 12px 26px rgba(1, 3, 7, 0.98), inset -8px -8px 20px rgba(30, 42, 64, 0.25)',
    wellBorder: 'rgba(255, 255, 255, 0.07)',
    digitCellBg:
      'linear-gradient(165deg, rgba(20, 28, 44, 0.78) 0%, rgba(8, 12, 20, 0.92) 100%)',
    digitCellBorder: 'rgba(255, 255, 255, 0.09)',
    digitCellShadow:
      '6px 8px 18px rgba(1, 3, 7, 0.85), -3px -3px 10px rgba(38, 52, 78, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
    digitTextColor: '#F8FAFC',
    digitGlow:
      '0 0 24px rgba(56, 189, 248, 0.38), 0 2px 6px rgba(0, 0, 0, 0.85)',
    ghostSegmentColor: 'rgba(148, 163, 184, 0.055)',
    accentColor: 'text-sky-400',
    accentHex: '#38BDF8',
    accentSoftBg: 'rgba(56, 189, 248, 0.13)',
    accentBorder: 'rgba(56, 189, 248, 0.36)',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    dividerColor: 'rgba(255, 255, 255, 0.07)',
    buttonSurface:
      'linear-gradient(145deg, rgba(22, 30, 46, 0.92), rgba(11, 15, 25, 0.96))',
    buttonBorder: 'rgba(255, 255, 255, 0.1)',
    buttonShadowDefault:
      '8px 10px 22px rgba(2, 4, 9, 0.9), -6px -6px 16px rgba(34, 47, 72, 0.26), inset 0 1px 1px rgba(255, 255, 255, 0.16)',
    buttonShadowHover:
      '10px 12px 26px rgba(2, 4, 9, 0.96), -6px -6px 18px rgba(45, 62, 95, 0.34), 0 0 18px rgba(56, 189, 248, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.24)',
    buttonShadowActive:
      'inset 6px 6px 14px rgba(2, 4, 9, 0.94), inset -4px -4px 10px rgba(34, 47, 72, 0.24)',
  },
  amber: {
    id: 'amber',
    name: 'Chronos Titanium',
    subtitle: 'Warm Phosphor Reserve',
    isDark: true,
    bgHex: '#080706',
    deskSurfaceGradient:
      'linear-gradient(180deg, rgba(20, 16, 13, 0.95) 0%, rgba(7, 6, 5, 1) 100%)',
    deskEdgeLine: 'rgba(245, 158, 11, 0.16)',
    standSurface:
      'linear-gradient(180deg, rgba(38, 32, 27, 0.95) 0%, rgba(15, 12, 10, 0.98) 100%)',
    standShadow: '0 22px 45px rgba(0, 0, 0, 0.96)',
    orbPrimary: 'rgba(245, 158, 11, 0.12)',
    orbSecondary: 'rgba(217, 119, 6, 0.09)',
    orbTertiary: 'rgba(251, 191, 36, 0.07)',
    cursorSpotlight: 'rgba(245, 158, 11, 0.10)',
    particleRgb: '253, 230, 138',
    cardSurface:
      'linear-gradient(155deg, rgba(30, 25, 21, 0.86) 0%, rgba(14, 12, 10, 0.94) 100%)',
    cardBorder: 'rgba(254, 243, 199, 0.11)',
    cardOuterShadow:
      '0 36px 75px rgba(2, 1, 0, 0.96), 20px 24px 56px rgba(2, 2, 1, 0.92), -14px -14px 40px rgba(48, 40, 34, 0.22), 0 0 0 1px rgba(245, 158, 11, 0.1)',
    cardInnerHighlight:
      'inset 0 2px 2px rgba(254, 243, 199, 0.2), inset 0 -3px 6px rgba(0, 0, 0, 0.82)',
    wellSurface:
      'linear-gradient(180deg, rgba(9, 8, 7, 0.94) 0%, rgba(17, 14, 12, 0.86) 100%)',
    wellInsetShadow:
      'inset 10px 12px 26px rgba(3, 2, 2, 0.98), inset -8px -8px 20px rgba(44, 37, 31, 0.24)',
    wellBorder: 'rgba(254, 243, 199, 0.07)',
    digitCellBg:
      'linear-gradient(165deg, rgba(31, 26, 22, 0.78) 0%, rgba(13, 11, 9, 0.92) 100%)',
    digitCellBorder: 'rgba(254, 243, 199, 0.08)',
    digitCellShadow:
      '6px 8px 18px rgba(3, 2, 1, 0.85), -3px -3px 10px rgba(52, 43, 36, 0.18), inset 0 1px 1px rgba(254, 243, 199, 0.12)',
    digitTextColor: '#FEF3C7',
    digitGlow:
      '0 0 24px rgba(245, 158, 11, 0.38), 0 2px 6px rgba(0, 0, 0, 0.85)',
    ghostSegmentColor: 'rgba(217, 119, 6, 0.065)',
    accentColor: 'text-amber-400',
    accentHex: '#F59E0B',
    accentSoftBg: 'rgba(245, 158, 11, 0.13)',
    accentBorder: 'rgba(245, 158, 11, 0.36)',
    textPrimary: 'text-stone-100',
    textSecondary: 'text-stone-300',
    textMuted: 'text-stone-400',
    dividerColor: 'rgba(254, 243, 199, 0.07)',
    buttonSurface:
      'linear-gradient(145deg, rgba(32, 27, 23, 0.92), rgba(16, 14, 12, 0.96))',
    buttonBorder: 'rgba(254, 243, 199, 0.1)',
    buttonShadowDefault:
      '8px 10px 22px rgba(3, 2, 1, 0.9), -6px -6px 16px rgba(48, 40, 34, 0.25), inset 0 1px 1px rgba(254, 243, 199, 0.15)',
    buttonShadowHover:
      '10px 12px 26px rgba(3, 2, 1, 0.96), -6px -6px 18px rgba(60, 50, 42, 0.32), 0 0 18px rgba(245, 158, 11, 0.24), inset 0 1px 1px rgba(254, 243, 199, 0.22)',
    buttonShadowActive:
      'inset 6px 6px 14px rgba(3, 2, 1, 0.94), inset -4px -4px 10px rgba(48, 40, 34, 0.22)',
  },
  cryo: {
    id: 'cryo',
    name: 'Abyssal Lume',
    subtitle: 'Sub-Zero Super-LumiNova',
    isDark: true,
    bgHex: '#04080B',
    deskSurfaceGradient:
      'linear-gradient(180deg, rgba(9, 20, 24, 0.95) 0%, rgba(3, 7, 9, 1) 100%)',
    deskEdgeLine: 'rgba(45, 212, 191, 0.16)',
    standSurface:
      'linear-gradient(180deg, rgba(18, 38, 44, 0.95) 0%, rgba(7, 16, 19, 0.98) 100%)',
    standShadow: '0 22px 45px rgba(0, 0, 0, 0.96)',
    orbPrimary: 'rgba(45, 212, 191, 0.12)',
    orbSecondary: 'rgba(16, 185, 129, 0.09)',
    orbTertiary: 'rgba(6, 182, 212, 0.08)',
    cursorSpotlight: 'rgba(45, 212, 191, 0.10)',
    particleRgb: '167, 243, 208',
    cardSurface:
      'linear-gradient(155deg, rgba(15, 30, 35, 0.86) 0%, rgba(7, 15, 18, 0.94) 100%)',
    cardBorder: 'rgba(204, 251, 241, 0.11)',
    cardOuterShadow:
      '0 36px 75px rgba(1, 3, 4, 0.96), 20px 24px 56px rgba(1, 4, 5, 0.92), -14px -14px 40px rgba(22, 46, 52, 0.22), 0 0 0 1px rgba(45, 212, 191, 0.1)',
    cardInnerHighlight:
      'inset 0 2px 2px rgba(204, 251, 241, 0.2), inset 0 -3px 6px rgba(0, 0, 0, 0.82)',
    wellSurface:
      'linear-gradient(180deg, rgba(4, 10, 13, 0.94) 0%, rgba(8, 18, 22, 0.86) 100%)',
    wellInsetShadow:
      'inset 10px 12px 26px rgba(1, 5, 6, 0.98), inset -8px -8px 20px rgba(20, 44, 50, 0.24)',
    wellBorder: 'rgba(204, 251, 241, 0.07)',
    digitCellBg:
      'linear-gradient(165deg, rgba(16, 33, 38, 0.78) 0%, rgba(6, 15, 18, 0.92) 100%)',
    digitCellBorder: 'rgba(204, 251, 241, 0.08)',
    digitCellShadow:
      '6px 8px 18px rgba(1, 4, 5, 0.85), -3px -3px 10px rgba(26, 54, 60, 0.18), inset 0 1px 1px rgba(204, 251, 241, 0.12)',
    digitTextColor: '#ECFDF5',
    digitGlow:
      '0 0 24px rgba(45, 212, 191, 0.38), 0 2px 6px rgba(0, 0, 0, 0.84)',
    ghostSegmentColor: 'rgba(45, 212, 191, 0.055)',
    accentColor: 'text-teal-400',
    accentHex: '#2DD4BF',
    accentSoftBg: 'rgba(45, 212, 191, 0.13)',
    accentBorder: 'rgba(45, 212, 191, 0.36)',
    textPrimary: 'text-teal-50',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    dividerColor: 'rgba(204, 251, 241, 0.07)',
    buttonSurface:
      'linear-gradient(145deg, rgba(17, 34, 39, 0.92), rgba(9, 18, 22, 0.96))',
    buttonBorder: 'rgba(204, 251, 241, 0.1)',
    buttonShadowDefault:
      '8px 10px 22px rgba(1, 4, 5, 0.9), -6px -6px 16px rgba(24, 50, 56, 0.25), inset 0 1px 1px rgba(204, 251, 241, 0.15)',
    buttonShadowHover:
      '10px 12px 26px rgba(1, 4, 5, 0.96), -6px -6px 18px rgba(30, 64, 72, 0.32), 0 0 18px rgba(45, 212, 191, 0.24), inset 0 1px 1px rgba(204, 251, 241, 0.22)',
    buttonShadowActive:
      'inset 6px 6px 14px rgba(1, 4, 5, 0.94), inset -4px -4px 10px rgba(24, 50, 56, 0.22)',
  },
  ceramic: {
    id: 'ceramic',
    name: 'Sculpted Alabaster',
    subtitle: 'Tactile Daylight Neomorphism',
    isDark: false,
    bgHex: '#E4EAF1',
    deskSurfaceGradient:
      'linear-gradient(180deg, rgba(216, 225, 236, 0.95) 0%, rgba(198, 210, 224, 1) 100%)',
    deskEdgeLine: 'rgba(255, 255, 255, 0.85)',
    standSurface:
      'linear-gradient(180deg, rgba(235, 241, 247, 0.98) 0%, rgba(205, 216, 229, 0.98) 100%)',
    standShadow: '0 20px 38px rgba(140, 156, 176, 0.65)',
    orbPrimary: 'rgba(14, 165, 233, 0.14)',
    orbSecondary: 'rgba(99, 102, 241, 0.10)',
    orbTertiary: 'rgba(56, 189, 248, 0.12)',
    cursorSpotlight: 'rgba(255, 255, 255, 0.65)',
    particleRgb: '71, 85, 105',
    cardSurface:
      'linear-gradient(155deg, rgba(246, 249, 252, 0.9) 0%, rgba(226, 233, 242, 0.95) 100%)',
    cardBorder: 'rgba(255, 255, 255, 0.92)',
    cardOuterShadow:
      '0 32px 64px rgba(152, 168, 188, 0.65), 20px 24px 50px rgba(164, 178, 198, 0.55), -18px -18px 46px rgba(255, 255, 255, 0.95)',
    cardInnerHighlight:
      'inset 2px 2px 4px rgba(255, 255, 255, 0.98), inset -2px -3px 6px rgba(168, 182, 200, 0.5)',
    wellSurface:
      'linear-gradient(180deg, rgba(220, 228, 237, 0.95) 0%, rgba(234, 240, 246, 0.9) 100%)',
    wellInsetShadow:
      'inset 8px 8px 18px rgba(166, 180, 198, 0.68), inset -8px -8px 18px rgba(255, 255, 255, 0.96)',
    wellBorder: 'rgba(255, 255, 255, 0.75)',
    digitCellBg:
      'linear-gradient(165deg, rgba(249, 251, 253, 0.95) 0%, rgba(232, 238, 246, 0.95) 100%)',
    digitCellBorder: 'rgba(255, 255, 255, 0.92)',
    digitCellShadow:
      '6px 6px 14px rgba(172, 185, 202, 0.55), -5px -5px 12px rgba(255, 255, 255, 0.92), inset 0 1px 1px rgba(255, 255, 255, 1)',
    digitTextColor: '#0F172A',
    digitGlow:
      '0 2px 10px rgba(2, 132, 199, 0.18), 0 1px 2px rgba(15, 23, 42, 0.15)',
    ghostSegmentColor: 'rgba(100, 116, 139, 0.08)',
    accentColor: 'text-sky-600',
    accentHex: '#0284C7',
    accentSoftBg: 'rgba(2, 132, 199, 0.11)',
    accentBorder: 'rgba(2, 132, 199, 0.32)',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-700',
    textMuted: 'text-slate-500',
    dividerColor: 'rgba(15, 23, 42, 0.08)',
    buttonSurface:
      'linear-gradient(145deg, rgba(246, 249, 252, 0.96), rgba(227, 234, 242, 0.96))',
    buttonBorder: 'rgba(255, 255, 255, 0.92)',
    buttonShadowDefault:
      '8px 8px 18px rgba(168, 182, 199, 0.62), -7px -7px 16px rgba(255, 255, 255, 0.96), inset 0 1px 1px rgba(255, 255, 255, 1)',
    buttonShadowHover:
      '10px 10px 22px rgba(160, 175, 194, 0.74), -8px -8px 18px rgba(255, 255, 255, 1), 0 0 16px rgba(2, 132, 199, 0.2)',
    buttonShadowActive:
      'inset 5px 5px 12px rgba(168, 182, 199, 0.7), inset -5px -5px 12px rgba(255, 255, 255, 0.96)',
  },
};

export const THEME_ORDER: ThemeId[] = ['obsidian', 'amber', 'cryo', 'ceramic'];

export function getNextThemeId(current: ThemeId): ThemeId {
  const idx = THEME_ORDER.indexOf(current);
  return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
}
