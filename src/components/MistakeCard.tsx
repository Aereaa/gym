import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommonMistake } from '../data/types';
import { useTheme, ACCENTS, Typography, Spacing, BorderRadius } from '../theme';

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
          backgroundColor: C.isDark ? C.surfaceAlt : ACCENTS.amberLight,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
          marginBottom: Spacing.sm,
          borderWidth: 1,
          borderColor: C.isDark ? C.border : '#FDEDB7',
        },
        iconBox: {
          width: 36,
          height: 36,
          borderRadius: BorderRadius.sm,
          backgroundColor: C.isDark ? 'rgba(245,158,11,0.15)' : ACCENTS.amberLight,
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
          color: C.isDark ? C.warning : '#92400E',
          marginBottom: Spacing.xs,
        },
        description: {
          ...Typography.bodySmall,
          color: C.isDark ? C.textSecondary : '#92400E',
          lineHeight: 20,
        },
      }),
    [C],
  );

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{'\u26A0\uFE0F'}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{mistake.title}</Text>
        <Text style={styles.description}>{mistake.description}</Text>
      </View>
    </View>
  );
}
