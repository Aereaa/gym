import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommonMistake } from '../data/types';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  mistake: CommonMistake;
}

export default function MistakeCard({ mistake }: Props) {
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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF7ED',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#FEF3C7',
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
    color: '#92400E',
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.bodySmall,
    color: '#78350F',
    lineHeight: 20,
  },
});
