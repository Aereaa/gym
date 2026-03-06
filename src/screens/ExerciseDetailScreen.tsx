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
import { useTheme, Typography, Spacing, BorderRadius, PageContainer } from '../theme';
import MuscleMap from '../components/MuscleMap';
import StepCard from '../components/StepCard';
import KeyPointCard from '../components/KeyPointCard';
import MistakeCard from '../components/MistakeCard';
import DifficultyBadge from '../components/DifficultyBadge';
import { useUserData } from '../contexts/UserDataContext';

type Props = NativeStackScreenProps<ExploreStackParamList, 'ExerciseDetail'>;

type Section = 'how-to' | 'muscles' | 'tips' | 'mistakes';

export default function ExerciseDetailScreen({ route, navigation }: Props) {
  const { colors: C } = useTheme();
  const { exerciseId } = route.params;
  const exercise = exercises.find((e) => e.id === exerciseId);
  const [activeSection, setActiveSection] = useState<Section>('how-to');
  const { isMachineSaved, saveMachine, removeSavedMachine } = useUserData();

  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: C.background,
    },
    hero: {
      ...PageContainer,
      backgroundColor: C.surface,
    },
    videoPlaceholder: {
      height: 220,
      backgroundColor: C.background,
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
      color: C.textPrimary,
      marginTop: Spacing.sm,
      marginBottom: Spacing.sm,
    },
    exerciseDesc: {
      ...Typography.body,
      color: C.textSecondary,
      marginBottom: Spacing.md,
    },
    actionRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginTop: Spacing.md,
    },
    logBtn: {
      flex: 1,
      backgroundColor: C.primary,
      borderRadius: 12,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: C.glow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 6,
    },
    logBtnText: {
      ...Typography.button,
      color: C.textOnPrimary,
    },
    saveBtn: {
      width: 52,
      height: 52,
      backgroundColor: C.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: C.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveBtnActive: {
      backgroundColor: C.primaryLight,
      borderColor: C.primary,
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
      backgroundColor: C.primaryLight,
      borderRadius: BorderRadius.sm,
      padding: Spacing.sm,
      alignItems: 'center',
    },
    statValue: {
      ...Typography.h3,
      color: C.primary,
    },
    statLabel: {
      ...Typography.caption,
      color: C.primary,
      marginTop: 2,
    },
    sectionTabs: {
      ...PageContainer,
      backgroundColor: C.surface,
      borderBottomWidth: 1,
      borderBottomColor: C.border,
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
      borderBottomColor: C.primary,
    },
    sectionTabLabel: {
      ...Typography.label,
      color: C.textSecondary,
    },
    sectionTabLabelActive: {
      color: C.primary,
      fontWeight: '700',
    },
    sectionContent: {
      ...PageContainer,
      padding: Spacing.md,
      paddingBottom: Spacing.xxl,
    },
    sectionTitle: {
      ...Typography.h4,
      color: C.textPrimary,
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
      color: C.textSecondary,
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
      backgroundColor: C.muscleActive,
    },
    muscleTagSecondary: {
      backgroundColor: C.primaryLight,
    },
    muscleTagTextPrimary: {
      ...Typography.caption,
      color: C.textOnPrimary,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    muscleTagTextSecondary: {
      ...Typography.caption,
      color: C.primary,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    errorText: {
      ...Typography.body,
      color: C.error,
      textAlign: 'center',
      marginTop: Spacing.xxl,
    },
  }), [C]);

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
            <Text style={styles.videoIcon}>{'\u25B6'}</Text>
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
                <Text style={styles.logBtnText}>{'\u{1F4CA}'}  Log workout</Text>
              </TouchableOpacity>

              {machine && (
                <TouchableOpacity
                  style={[styles.saveBtn, machineSaved && styles.saveBtnActive]}
                  onPress={toggleMachineSave}
                >
                  <Text style={styles.saveBtnText}>{machineSaved ? '\u{1F516}' : '\uFF0B'}</Text>
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
                  <View style={[styles.legendDot, { backgroundColor: C.muscleActive }]} />
                  <Text style={styles.legendLabel}>Primary</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: C.muscleSecondary }]} />
                  <Text style={styles.legendLabel}>Secondary</Text>
                </View>
              </View>
              <View style={styles.muscleTagRow}>
                {exercise.primaryMuscles.map((m) => (
                  <View key={m} style={[styles.muscleTag, styles.muscleTagPrimary]}>
                    <Text style={styles.muscleTagTextPrimary}>{m}</Text>
                  </View>
                ))}
                {exercise.secondaryMuscles.map((m) => (
                  <View key={m} style={[styles.muscleTag, styles.muscleTagSecondary]}>
                    <Text style={styles.muscleTagTextSecondary}>{m}</Text>
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
