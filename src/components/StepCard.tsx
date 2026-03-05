import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  stepNumber: number;
  instruction: string;
}

export default function StepCard({ stepNumber, instruction }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.numberBox}>
        <Text style={styles.number}>{stepNumber}</Text>
      </View>
      <Text style={styles.instruction}>{instruction}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  numberBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
    marginTop: 2,
  },
  number: {
    ...Typography.label,
    color: Colors.textOnPrimary,
    fontWeight: '700',
  },
  instruction: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 24,
  },
});
