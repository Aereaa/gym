import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Difficulty } from '../data/types';
import { useTheme, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  difficulty: Difficulty;
}

export default function DifficultyBadge({ difficulty }: Props) {
  const { colors: C } = useTheme();

  const CONFIG: Record<Difficulty, { label: string; color: string; bg: string }> = {
    beginner: { label: 'Beginner', color: C.success, bg: C.accentLight },
    intermediate: { label: 'Intermediate', color: C.warning, bg: 'rgba(245,158,11,0.15)' },
    advanced: { label: 'Advanced', color: C.error, bg: 'rgba(239,68,68,0.15)' },
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
