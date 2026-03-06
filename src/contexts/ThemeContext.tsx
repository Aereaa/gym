import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Theme color type ─────────────────────────────────────────────────────────

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  textOnPrimary: string;
  error: string;
  warning: string;
  success: string;
  muscleActive: string;
  muscleSecondary: string;
  muscleInactive: string;
  border: string;
  borderFocus: string;
  glow: string;
}

// ── Theme presets ────────────────────────────────────────────────────────────

const BLUE: ThemeColors = {
  primary: '#2563EB',
  primaryLight: 'rgba(37,99,235,0.15)',
  primaryDark: '#1D4ED8',
  accent: '#10B981',
  accentLight: 'rgba(16,185,129,0.15)',
  background: '#0C0C12',
  surface: '#111118',
  surfaceAlt: '#18181F',
  textPrimary: '#F0F0F5',
  textSecondary: '#9CA3AF',
  textDisabled: '#4B5563',
  textOnPrimary: '#FFFFFF',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  muscleActive: '#2563EB',
  muscleSecondary: '#93C5FD',
  muscleInactive: '#1F1F2A',
  border: 'rgba(255,255,255,0.07)',
  borderFocus: '#2563EB',
  glow: 'rgba(37,99,235,0.4)',
};

const PINK: ThemeColors = {
  primary: '#EC4899',
  primaryLight: 'rgba(236,72,153,0.15)',
  primaryDark: '#DB2777',
  accent: '#F472B6',
  accentLight: 'rgba(244,114,182,0.15)',
  background: '#120C10',
  surface: '#181115',
  surfaceAlt: '#1F171C',
  textPrimary: '#F5F0F3',
  textSecondary: '#9CA3AF',
  textDisabled: '#4B5563',
  textOnPrimary: '#FFFFFF',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  muscleActive: '#EC4899',
  muscleSecondary: '#F9A8D4',
  muscleInactive: '#1F1F2A',
  border: 'rgba(255,255,255,0.07)',
  borderFocus: '#EC4899',
  glow: 'rgba(236,72,153,0.4)',
};

const GREEN: ThemeColors = {
  primary: '#10B981',
  primaryLight: 'rgba(16,185,129,0.15)',
  primaryDark: '#059669',
  accent: '#6EE7B7',
  accentLight: 'rgba(110,231,183,0.15)',
  background: '#0A100E',
  surface: '#101816',
  surfaceAlt: '#151F1C',
  textPrimary: '#F0F5F3',
  textSecondary: '#9CA3AF',
  textDisabled: '#4B5563',
  textOnPrimary: '#FFFFFF',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  muscleActive: '#10B981',
  muscleSecondary: '#6EE7B7',
  muscleInactive: '#1F1F2A',
  border: 'rgba(255,255,255,0.07)',
  borderFocus: '#10B981',
  glow: 'rgba(16,185,129,0.4)',
};

const RED_BLACK: ThemeColors = {
  primary: '#EF4444',
  primaryLight: 'rgba(239,68,68,0.15)',
  primaryDark: '#DC2626',
  accent: '#F87171',
  accentLight: 'rgba(248,113,113,0.15)',
  background: '#080808',
  surface: '#0F0F0F',
  surfaceAlt: '#171717',
  textPrimary: '#F5F0F0',
  textSecondary: '#9CA3AF',
  textDisabled: '#4B5563',
  textOnPrimary: '#FFFFFF',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  muscleActive: '#EF4444',
  muscleSecondary: '#FCA5A5',
  muscleInactive: '#1A1A1A',
  border: 'rgba(255,255,255,0.07)',
  borderFocus: '#EF4444',
  glow: 'rgba(239,68,68,0.4)',
};

export const THEMES = { blue: BLUE, pink: PINK, green: GREEN, redblack: RED_BLACK } as const;
export type ThemeName = keyof typeof THEMES;

export const THEME_META: { key: ThemeName; label: string; swatch: string }[] = [
  { key: 'blue', label: 'Ocean Blue', swatch: '#2563EB' },
  { key: 'pink', label: 'Pink Vibes', swatch: '#EC4899' },
  { key: 'green', label: 'Fresh Green', swatch: '#10B981' },
  { key: 'redblack', label: 'Red & Black', swatch: '#EF4444' },
];

// ── Context ──────────────────────────────────────────────────────────────────

interface ThemeContextValue {
  colors: ThemeColors;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: BLUE,
  themeName: 'blue',
  setTheme: () => {},
});

const STORAGE_KEY = '@gymfidence_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('blue');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((v) => {
      if (v && v in THEMES) setThemeName(v as ThemeName);
    });
  }, []);

  function setTheme(name: ThemeName) {
    setThemeName(name);
    AsyncStorage.setItem(STORAGE_KEY, name);
  }

  return (
    <ThemeContext.Provider value={{ colors: THEMES[themeName], themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
