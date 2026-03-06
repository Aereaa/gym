import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Exercise } from '../data/types';
import { useTheme, ACCENTS, Typography, Spacing, BorderRadius } from '../theme';
import DifficultyBadge from './DifficultyBadge';

interface Props {
  exercise: Exercise;
  onPress: () => void;
}

const MUSCLE_COLORS = [
  { bg: ACCENTS.coralLight, text: ACCENTS.coral },
  { bg: ACCENTS.tealLight, text: ACCENTS.tealDark },
  { bg: ACCENTS.purpleLight, text: ACCENTS.purple },
  { bg: ACCENTS.amberLight, text: '#92400E' },
];

export default function ExerciseCard({ exercise, onPress }: Props) {
  const { colors: C } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        card: {
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
          color: C.textPrimary,
          marginBottom: Spacing.xs,
        },
        arrow: {
          fontSize: 22,
          color: C.textDisabled,
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
          paddingVertical: 2,
          paddingHorizontal: Spacing.sm,
          borderRadius: BorderRadius.full,
        },
        muscleText: {
          ...Typography.caption,
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
          color: C.textSecondary,
        },
      }),
    [C],
  );

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.top}>
        <View style={styles.info}>
          <Text style={styles.name}>{exercise.name}</Text>
          <DifficultyBadge difficulty={exercise.difficulty} />
        </View>
        <Text style={styles.arrow}>{'\u203A'}</Text>
      </View>

      <View style={styles.muscles}>
        {exercise.primaryMuscles.map((m, i) => {
          const mc = C.isDark
            ? { bg: C.primaryLight, text: C.primary }
            : MUSCLE_COLORS[i % MUSCLE_COLORS.length];
          return (
            <View key={m} style={[styles.muscleTag, { backgroundColor: mc.bg }]}>
              <Text style={[styles.muscleText, { color: mc.text }]}>{m}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.meta}>
        {exercise.sets && (
          <Text style={styles.metaText}>{exercise.sets} sets</Text>
        )}
        {exercise.reps && (
          <Text style={styles.metaText}>{'\u00B7'} {exercise.reps} reps</Text>
        )}
        {exercise.durationSeconds && (
          <Text style={styles.metaText}>{'\u00B7'} {exercise.durationSeconds / 60} min</Text>
        )}
        <Text style={styles.metaText}>{'\u00B7'} {exercise.keyPoints.length} key tips</Text>
      </View>
    </TouchableOpacity>
  );
}
