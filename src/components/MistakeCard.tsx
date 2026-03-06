import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommonMistake } from '../data/types';
import { useTheme, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  mistake: CommonMistake;
}

export default function MistakeCard({ mistake }: Props) {
  const { colors: C } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        card: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: C.surfaceAlt,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
          marginBottom: Spacing.sm,
          borderWidth: 1,
          borderColor: C.border,
        },
        iconBox: {
          width: 36,
          height: 36,
          borderRadius: BorderRadius.sm,
          backgroundColor: 'rgba(245,158,11,0.15)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.sm,
          flexShrink: 0,
        },
        icon: {
          fontSize: 18,
        },
        content: {
          flex: 1,
        },
        title: {
          ...Typography.h4,
          color: C.warning,
          marginBottom: Spacing.xs,
        },
        description: {
          ...Typography.bodySmall,
          color: C.textSecondary,
          lineHeight: 20,
        },
      }),
    [C],
  );

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>⚠️</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{mistake.title}</Text>
        <Text style={styles.description}>{mistake.description}</Text>
      </View>
    </View>
  );
}
