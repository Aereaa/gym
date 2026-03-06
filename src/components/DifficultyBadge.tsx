import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Difficulty } from '../data/types';
import { useTheme, ACCENTS, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  difficulty: Difficulty;
}

export default function DifficultyBadge({ difficulty }: Props) {
  const { colors: C } = useTheme();

  const CONFIG: Record<Difficulty, { label: string; color: string; bg: string }> = {
    beginner: {
      label: 'Beginner',
      color: C.isDark ? C.success : '#065F46',
      bg: C.isDark ? C.accentLight : ACCENTS.greenLight,
    },
    intermediate: {
      label: 'Intermediate',
      color: C.isDark ? C.warning : '#92400E',
      bg: C.isDark ? 'rgba(245,158,11,0.15)' : ACCENTS.amberLight,
    },
    advanced: {
      label: 'Advanced',
      color: C.isDark ? C.error : ACCENTS.coralDark,
      bg: C.isDark ? 'rgba(239,68,68,0.15)' : ACCENTS.coralLight,
    },
  };

  const { label, color, bg } = CONFIG[difficulty];

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        badge: {
          alignSelf: 'flex-start',
          paddingVertical: Spacing.xs,
          paddingHorizontal: Spacing.sm,
          borderRadius: BorderRadius.full,
        },
        text: {
          ...Typography.caption,
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
      }),
    [C],
  );

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}
