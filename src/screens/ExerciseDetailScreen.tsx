import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExploreStackParamList } from '../navigation/types';
import { exercises, machines } from '../data';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import MuscleMap from '../components/MuscleMap';
import StepCard from '../components/StepCard';
import KeyPointCard from '../components/KeyPointCard';
import MistakeCard from '../components/MistakeCard';
import DifficultyBadge from '../components/DifficultyBadge';
import { useUserData } from '../contexts/UserDataContext';

type Props = NativeStackScreenProps<ExploreStackParamList, 'ExerciseDetail'>;

type Section = 'how-to' | 'muscles' | 'tips' | 'mistakes';

export default function ExerciseDetailScreen({ route, navigation }: Props) {
  const { exerciseId } = route.params;
  const exercise = exercises.find((e) => e.id === exerciseId);
  const [activeSection, setActiveSection] = useState<Section>('how-to');
  const { isMachineSaved, saveMachine, removeSavedMachine } = useUserData();

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </SafeAreaView>
    );
  }

  const machine = machines.find((m) => m.id === exercise.machineId);
  const machineSaved = machine ? isMachineSaved(machine.id) : false;

  function toggleMachineSave() {
    if (!machine) return;
    if (machineSaved) removeSavedMachine(machine.id);
    else saveMachine(machine.id);
  }

  const sections: { key: Section; label: string }[] = [
    { key: 'how-to', label: 'How-To' },
    { key: 'muscles', label: 'Muscles' },
    { key: 'tips', label: 'Key tips' },
    { key: 'mistakes', label: 'Mistakes' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          {/* Video placeholder */}
          <View style={styles.videoPlaceholder}>
            <Text style={styles.videoIcon}>▶</Text>
            <Text style={styles.videoLabel}>Exercise demo video</Text>
          </View>

          <View style={styles.heroContent}>
            <DifficultyBadge difficulty={exercise.difficulty} />
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDesc}>{exercise.description}</Text>

            {/* Quick stats */}
            {(exercise.sets || exercise.reps || exercise.durationSeconds) && (
              <View style={styles.statsRow}>
                {exercise.sets && (
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>{exercise.sets}</Text>
                    <Text style={styles.statLabel}>Sets</Text>
                  </View>
                )}
                {exercise.reps && (
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>{exercise.reps}</Text>
                    <Text style={styles.statLabel}>Reps</Text>
                  </View>
                )}
                {exercise.durationSeconds && (
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>{exercise.durationSeconds / 60}</Text>
                    <Text style={styles.statLabel}>Minutes</Text>
                  </View>
                )}
              </View>
            )}

            {/* Action buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.logBtn}
                onPress={() =>
                  navigation.navigate('LogWorkout', {
                    exerciseId: exercise.id,
                    exerciseName: exercise.name,
                    machineName: machine?.name ?? 'Machine',
                  })
                }
              >
                <Text style={styles.logBtnText}>📊  Log workout</Text>
              </TouchableOpacity>

              {machine && (
                <TouchableOpacity
                  style={[styles.saveBtn, machineSaved && styles.saveBtnActive]}
                  onPress={toggleMachineSave}
                >
                  <Text style={styles.saveBtnText}>{machineSaved ? '🔖' : '＋'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Section tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.sectionTabs}
          contentContainerStyle={styles.sectionTabsContent}
        >
          {sections.map((s) => (
            <TouchableOpacity
              key={s.key}
              style={[styles.sectionTab, activeSection === s.key && styles.sectionTabActive]}
              onPress={() => setActiveSection(s.key)}
            >
              <Text
                style={[
                  styles.sectionTabLabel,
                  activeSection === s.key && styles.sectionTabLabelActive,
                ]}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section content */}
        <View style={styles.sectionContent}>
          {activeSection === 'how-to' && (
            <View>
              <Text style={styles.sectionTitle}>Step-by-step</Text>
              {exercise.steps.map((step, index) => (
                <StepCard key={index} stepNumber={index + 1} instruction={step} />
              ))}
            </View>
          )}

          {activeSection === 'muscles' && (
            <View>
              <MuscleMap
                primaryMuscles={exercise.primaryMuscles}
                secondaryMuscles={exercise.secondaryMuscles}
              />
              <View style={styles.muscleLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: Colors.muscleActive }]} />
                  <Text style={styles.legendLabel}>Primary</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: Colors.muscleSecondary }]} />
                  <Text style={styles.legendLabel}>Secondary</Text>
                </View>
              </View>
              <View style={styles.muscleTagRow}>
                {exercise.primaryMuscles.map((m) => (
                  <View key={m} style={[styles.muscleTag, styles.muscleTagPrimary]}>
                    <Text style={styles.muscleTagText}>{m}</Text>
                  </View>
                ))}
                {exercise.secondaryMuscles.map((m) => (
                  <View key={m} style={[styles.muscleTag, styles.muscleTagSecondary]}>
                    <Text style={[styles.muscleTagText, { color: Colors.primary }]}>{m}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeSection === 'tips' && (
            <View>
              <Text style={styles.sectionTitle}>Key points</Text>
              {exercise.keyPoints.map((kp) => (
                <KeyPointCard key={kp.id} keyPoint={kp} />
              ))}
            </View>
          )}

          {activeSection === 'mistakes' && (
            <View>
              <Text style={styles.sectionTitle}>Common mistakes to avoid</Text>
              {exercise.commonMistakes.map((cm) => (
                <MistakeCard key={cm.id} mistake={cm} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    backgroundColor: Colors.surface,
  },
  videoPlaceholder: {
    height: 220,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoIcon: {
    fontSize: 40,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  videoLabel: {
    ...Typography.bodySmall,
    color: 'rgba(255,255,255,0.6)',
  },
  heroContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  exerciseName: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  exerciseDesc: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  logBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logBtnText: {
    ...Typography.button,
    color: Colors.textOnPrimary,
  },
  saveBtn: {
    width: 48,
    height: 44,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  saveBtnText: {
    fontSize: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h3,
    color: Colors.primary,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.primary,
    marginTop: 2,
  },
  sectionTabs: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTabsContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  sectionTab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginRight: Spacing.xs,
  },
  sectionTabActive: {
    borderBottomColor: Colors.primary,
  },
  sectionTabLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  sectionTabLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  sectionContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  muscleLegend: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  muscleTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  muscleTag: {
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  muscleTagPrimary: {
    backgroundColor: Colors.muscleActive,
  },
  muscleTagSecondary: {
    backgroundColor: Colors.primaryLight,
  },
  muscleTagText: {
    ...Typography.caption,
    color: Colors.textOnPrimary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  errorText: {
    ...Typography.body,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});
