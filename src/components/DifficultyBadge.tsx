import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Difficulty } from '../data/types';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

const CONFIG: Record<Difficulty, { label: string; color: string; bg: string }> = {
  beginner: { label: 'Beginner', color: Colors.success, bg: Colors.accentLight },
  intermediate: { label: 'Intermediate', color: Colors.warning, bg: '#FEF3C7' },
  advanced: { label: 'Advanced', color: Colors.error, bg: '#FEE2E2' },
};

interface Props {
  difficulty: Difficulty;
}

export default function DifficultyBadge({ difficulty }: Props) {
  const { label, color, bg } = CONFIG[difficulty];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
