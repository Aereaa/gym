import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Exercise } from '../data/types';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import DifficultyBadge from './DifficultyBadge';

interface Props {
  exercise: Exercise;
  onPress: () => void;
}

export default function ExerciseCard({ exercise, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.top}>
        <View style={styles.info}>
          <Text style={styles.name}>{exercise.name}</Text>
          <DifficultyBadge difficulty={exercise.difficulty} />
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>

      <View style={styles.muscles}>
        {exercise.primaryMuscles.map((m) => (
          <View key={m} style={styles.muscleTag}>
            <Text style={styles.muscleText}>{m}</Text>
          </View>
        ))}
      </View>

      <View style={styles.meta}>
        {exercise.sets && (
          <Text style={styles.metaText}>{exercise.sets} sets</Text>
        )}
        {exercise.reps && (
          <Text style={styles.metaText}>· {exercise.reps} reps</Text>
        )}
        {exercise.durationSeconds && (
          <Text style={styles.metaText}>· {exercise.durationSeconds / 60} min</Text>
        )}
        <Text style={styles.metaText}>· {exercise.keyPoints.length} key tips</Text>
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
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  info: {
    flex: 1,
  },
  name: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  arrow: {
    fontSize: 22,
    color: Colors.textDisabled,
    marginLeft: Spacing.sm,
    marginTop: 2,
  },
  muscles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  muscleTag: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  muscleText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  metaText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
