import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/types';
import { trainingPlans, exercises, machines } from '../data';
import DifficultyBadge from '../components/DifficultyBadge';
import { useTheme, ACCENTS, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'TrainingPlanDetail'>;

const MUSCLE_LABELS: Record<string, string> = {
  chest: 'Chest', back: 'Back', shoulders: 'Shoulders', biceps: 'Biceps',
  triceps: 'Triceps', forearms: 'Forearms', core: 'Core', glutes: 'Glutes',
  quads: 'Quads', hamstrings: 'Hamstrings', calves: 'Calves',
};

const accentColors = [ACCENTS.coralLight, ACCENTS.tealLight, ACCENTS.purpleLight, ACCENTS.amberLight, ACCENTS.greenLight];

export default function TrainingPlanDetailScreen({ route, navigation }: Props) {
  const { colors: C } = useTheme();
  const plan = trainingPlans.find((p) => p.id === route.params.planId);

  const planExercises = plan?.exercises.map((pe) => {
    const ex = exercises.find((e) => e.id === pe.exerciseId);
    const machine = ex ? machines.find((m) => m.id === ex.machineId) : undefined;
    return { ...pe, exercise: ex, machine };
  }) ?? [];

  const styles = React.useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    scroll: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },
    hero: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.lg,
      borderWidth: 1,
      borderColor: C.border,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 2,
    },
    heroIcon: { fontSize: 40, marginBottom: Spacing.sm },
    heroName: { ...Typography.h1, color: C.textPrimary, textAlign: 'center' },
    heroDesc: { ...Typography.body, color: C.textSecondary, textAlign: 'center', marginTop: Spacing.sm, maxWidth: 320 },
    heroMeta: { flexDirection: 'row', gap: Spacing.lg, marginTop: Spacing.md },
    metaItem: { alignItems: 'center' },
    metaValue: { ...Typography.h3, color: C.primary },
    metaLabel: { ...Typography.caption, color: C.textSecondary, marginTop: 2 },
    muscleRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginTop: Spacing.md },
    muscleChip: {
      paddingVertical: 3, paddingHorizontal: Spacing.sm,
      borderRadius: BorderRadius.full, backgroundColor: C.surfaceAlt,
    },
    muscleChipText: { ...Typography.caption, color: C.textSecondary },
    sectionTitle: { ...Typography.h3, color: C.textPrimary, marginBottom: Spacing.md },
    exerciseCard: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: C.border,
      marginBottom: Spacing.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 2,
    },
    exerciseMain: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
    stepNumber: {
      width: 28, height: 28, borderRadius: 14,
      backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
      marginRight: Spacing.sm,
    },
    stepNumberText: { ...Typography.caption, color: C.textOnPrimary, fontWeight: '700' },
    exerciseInfo: { flex: 1 },
    exerciseName: { ...Typography.h4, color: C.textPrimary },
    machineName: { ...Typography.caption, color: C.textSecondary, marginTop: 2 },
    exerciseParams: { alignItems: 'flex-end' },
    paramText: { ...Typography.label, color: C.accent },
    restText: { ...Typography.caption, color: C.textSecondary, marginTop: 2 },
    exerciseAction: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md,
      borderTopWidth: 1, borderTopColor: C.border,
    },
    viewLink: { ...Typography.label, color: C.primary },
    logLink: { ...Typography.label, color: ACCENTS.teal },
  }), [C]);

  if (!plan) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ ...Typography.body, color: C.textSecondary }}>Plan not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>{plan.icon}</Text>
          <Text style={styles.heroName}>{plan.name}</Text>
          <DifficultyBadge difficulty={plan.difficulty} />
          <Text style={styles.heroDesc}>{plan.description}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{plan.durationMinutes}</Text>
              <Text style={styles.metaLabel}>minutes</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{plan.exercises.length}</Text>
              <Text style={styles.metaLabel}>exercises</Text>
            </View>
          </View>
          <View style={styles.muscleRow}>
            {plan.targetMuscles.map((m) => (
              <View key={m} style={styles.muscleChip}>
                <Text style={styles.muscleChipText}>{MUSCLE_LABELS[m]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Exercises */}
        <Text style={styles.sectionTitle}>Exercises</Text>
        {planExercises.map((pe, i) => (
          <View key={pe.exerciseId} style={styles.exerciseCard}>
            <View style={styles.exerciseMain}>
              <View style={[styles.stepNumber, { backgroundColor: C.isDark ? C.primary : accentColors[i % accentColors.length] }]}>
                <Text style={[styles.stepNumberText, { color: C.isDark ? C.textOnPrimary : C.textPrimary }]}>{i + 1}</Text>
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{pe.exercise?.name ?? 'Unknown'}</Text>
                <Text style={styles.machineName}>{pe.machine?.name ?? ''}</Text>
              </View>
              <View style={styles.exerciseParams}>
                <Text style={styles.paramText}>{pe.sets} x {pe.reps}</Text>
                {pe.restSeconds > 0 && (
                  <Text style={styles.restText}>{pe.restSeconds}s rest</Text>
                )}
              </View>
            </View>
            <View style={styles.exerciseAction}>
              <TouchableOpacity onPress={() => {
                if (pe.exercise) navigation.navigate('ExerciseDetail', { exerciseId: pe.exercise.id });
              }}>
                <Text style={styles.viewLink}>How to do it \u203A</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                if (pe.exercise && pe.machine) {
                  navigation.navigate('LogWorkout', {
                    exerciseId: pe.exercise.id,
                    exerciseName: pe.exercise.name,
                    machineName: pe.machine.name,
                  });
                }
              }}>
                <Text style={styles.logLink}>Log workout</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
