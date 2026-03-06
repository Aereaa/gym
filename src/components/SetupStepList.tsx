import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SetupStep } from '../data/types';
import { useTheme, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  steps: SetupStep[];
}

export default function SetupStepList({ steps }: Props) {
  const { colors: C } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        title: {
          ...Typography.h4,
          color: C.textPrimary,
          marginBottom: Spacing.md,
        },
        stepRow: {
          flexDirection: 'row',
          marginBottom: 0,
        },
        leftCol: {
          alignItems: 'center',
          width: 40,
          marginRight: Spacing.md,
        },
        numberCircle: {
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: C.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        numberText: {
          ...Typography.label,
          color: C.textOnPrimary,
          fontWeight: '700',
        },
        connector: {
          width: 2,
          flex: 1,
          backgroundColor: C.border,
          marginVertical: 4,
          minHeight: 20,
        },
        stepContent: {
          flex: 1,
          backgroundColor: C.surface,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
          marginBottom: Spacing.sm,
          borderWidth: 1,
          borderColor: C.border,
        },
        instruction: {
          ...Typography.body,
          color: C.textPrimary,
          lineHeight: 24,
        },
      }),
    [C],
  );

  return (
    <View>
      <Text style={styles.title}>How to set up this machine</Text>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepRow}>
          <View style={styles.leftCol}>
            <View style={styles.numberCircle}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            {index < steps.length - 1 && <View style={styles.connector} />}
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.instruction}>{step.instruction}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
