import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  stepNumber: number;
  instruction: string;
}

export default function StepCard({ stepNumber, instruction }: Props) {
  const { colors: C } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        card: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: C.surface,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
          marginBottom: Spacing.sm,
          borderWidth: 1,
          borderColor: C.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 3,
          elevation: 2,
        },
        numberBox: {
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: C.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.md,
          flexShrink: 0,
          marginTop: 2,
        },
        number: {
          ...Typography.label,
          color: C.textOnPrimary,
          fontWeight: '700',
        },
        instruction: {
          ...Typography.body,
          color: C.textPrimary,
          flex: 1,
          lineHeight: 24,
        },
      }),
    [C],
  );

  return (
    <View style={styles.card}>
      <View style={styles.numberBox}>
        <Text style={styles.number}>{stepNumber}</Text>
      </View>
      <Text style={styles.instruction}>{instruction}</Text>
    </View>
  );
}
