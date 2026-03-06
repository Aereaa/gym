import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EtiketteRule } from '../data/types';
import { useTheme, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  rules: EtiketteRule[];
}

export default function EtiquetteList({ rules }: Props) {
  const { colors: C } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        title: {
          ...Typography.h4,
          color: C.textPrimary,
          marginBottom: Spacing.xs,
        },
        subtitle: {
          ...Typography.bodySmall,
          color: C.textSecondary,
          marginBottom: Spacing.md,
          lineHeight: 20,
        },
        ruleCard: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: C.surface,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
          marginBottom: Spacing.sm,
          borderWidth: 1,
          borderColor: C.border,
        },
        ruleIcon: {
          fontSize: 22,
          marginRight: Spacing.md,
        },
        ruleText: {
          ...Typography.body,
          color: C.textPrimary,
          flex: 1,
        },
      }),
    [C],
  );

  return (
    <View>
      <Text style={styles.title}>Gym etiquette</Text>
      <Text style={styles.subtitle}>
        Following these simple rules makes the gym a better place for everyone — and helps you feel more comfortable too.
      </Text>
      {rules.map((rule) => (
        <View key={rule.id} style={styles.ruleCard}>
          <Text style={styles.ruleIcon}>{rule.icon}</Text>
          <Text style={styles.ruleText}>{rule.rule}</Text>
        </View>
      ))}
    </View>
  );
}
