import { ViewStyle } from 'react-native';

export { Colors } from './colors';
export { Typography } from './typography';
export { useTheme, ThemeProvider, THEME_META, ACCENTS } from '../contexts/ThemeContext';
export type { ThemeColors, ThemeName } from '../contexts/ThemeContext';

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

/** Centered max-width wrapper for responsive desktop layout */
export const PageContainer: ViewStyle = {
  maxWidth: 640,
  width: '100%',
  alignSelf: 'center',
};
