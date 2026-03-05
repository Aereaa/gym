import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyPoint } from '../data/types';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  keyPoint: KeyPoint;
}

export default function KeyPointCard({ keyPoint }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setExpanded((v) => !v)}
      activeOpacity={0.75}
    >
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>💡</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{keyPoint.title}</Text>
          {expanded && (
            <Text style={styles.description}>{keyPoint.description}</Text>
          )}
        </View>
        <Text style={styles.chevron}>{expanded ? '∧' : '∨'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#FEF9C3',
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
    color: Colors.textPrimary,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    lineHeight: 24,
  },
  chevron: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
    marginTop: 4,
  },
});
