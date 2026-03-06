import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/types';
import { trainingPlans, exercises } from '../data';
import DifficultyBadge from '../components/DifficultyBadge';
import { useTheme, ACCENTS, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'TrainingPlans'>;

const MUSCLE_LABELS: Record<string, string> = {
  chest: 'Chest', back: 'Back', shoulders: 'Shoulders', biceps: 'Biceps',
  triceps: 'Triceps', forearms: 'Forearms', core: 'Core', glutes: 'Glutes',
  quads: 'Quads', hamstrings: 'Hamstrings', calves: 'Calves',
};

const accentColors = [ACCENTS.coralLight, ACCENTS.tealLight, ACCENTS.purpleLight, ACCENTS.amberLight];

export default function TrainingPlansScreen({ navigation }: Props) {
  const { colors: C } = useTheme();

  const styles = React.useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    list: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },
    intro: { marginBottom: Spacing.lg },
    introTitle: { ...Typography.h2, color: C.textPrimary, marginBottom: Spacing.xs },
    introSub: { ...Typography.body, color: C.textSecondary },
    card: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: C.border,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 2,
    },
    cardMain: { padding: Spacing.md },
    cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
    iconBox: {
      width: 48, height: 48, borderRadius: BorderRadius.sm,
      alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
    },
    iconText: { fontSize: 22 },
    cardTitleArea: { flex: 1 },
    planName: { ...Typography.h3, color: C.textPrimary },
    planMeta: { ...Typography.caption, color: C.textSecondary, marginTop: 2 },
    desc: { ...Typography.bodySmall, color: C.textSecondary, marginBottom: Spacing.sm },
    muscleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    muscleChip: {
      paddingVertical: 2, paddingHorizontal: Spacing.xs,
      borderRadius: BorderRadius.full, backgroundColor: C.surfaceAlt,
    },
    muscleChipText: { ...Typography.caption, color: C.textSecondary },
    cardFooter: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md,
      borderTopWidth: 1, borderTopColor: C.border,
    },
    exerciseCount: { ...Typography.label, color: C.accent },
    startText: { ...Typography.label, color: C.primary },
  }), [C]);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={trainingPlans}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.intro}>
            <Text style={styles.introTitle}>Training Plans</Text>
            <Text style={styles.introSub}>
              Pre-built workouts to guide your session. Pick a plan and follow along.
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        renderItem={({ item, index }) => {
          const exerciseCount = item.exercises.length;
          const iconBg = C.isDark ? C.primaryLight : accentColors[index % accentColors.length];
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('TrainingPlanDetail', { planId: item.id })}
              activeOpacity={0.7}
            >
              <View style={styles.cardMain}>
                <View style={styles.cardTop}>
                  <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
                    <Text style={styles.iconText}>{item.icon}</Text>
                  </View>
                  <View style={styles.cardTitleArea}>
                    <Text style={styles.planName}>{item.name}</Text>
                    <Text style={styles.planMeta}>
                      {item.durationMinutes} min
                    </Text>
                  </View>
                  <DifficultyBadge difficulty={item.difficulty} />
                </View>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
                <View style={styles.muscleRow}>
                  {item.targetMuscles.map((m) => (
                    <View key={m} style={styles.muscleChip}>
                      <Text style={styles.muscleChipText}>{MUSCLE_LABELS[m]}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.exerciseCount}>
                  {exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''}
                </Text>
                <Text style={styles.startText}>View plan \u203A</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
