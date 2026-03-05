import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EtiketteRule } from '../data/types';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  rules: EtiketteRule[];
}

export default function EtiquetteList({ rules }: Props) {
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

const styles = StyleSheet.create({
  title: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  ruleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ruleIcon: {
    fontSize: 22,
    marginRight: Spacing.md,
  },
  ruleText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
});
