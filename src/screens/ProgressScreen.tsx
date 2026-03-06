import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { alert } from '../utils/alert';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/types';
import { useUserData } from '../contexts/UserDataContext';
import { WorkoutLog } from '../data/types';
import ProgressChart from '../components/ProgressChart';
import { useTheme, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Progress'>;

function LogCard({ log, onDelete }: { log: WorkoutLog; onDelete: () => void }) {
  const { colors: C } = useTheme();
  const date = new Date(log.date);
  const maxWeight = Math.max(...log.sets.map((s) => s.weight ?? 0));
  const totalReps = log.sets.reduce((sum, s) => sum + (s.reps ?? 0), 0);

  const cardStyles = React.useMemo(() => StyleSheet.create({
    logCard: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      borderWidth: 1,
      borderColor: C.border,
    },
    logCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm },
    logDate: { ...Typography.label, color: C.textPrimary },
    logTime: { ...Typography.caption, color: C.textSecondary },
    logDeleteBtn: { padding: Spacing.xs },
    logDeleteIcon: { fontSize: 14, color: C.textDisabled },
    logStats: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.sm },
    logStat: { alignItems: 'center' },
    logStatValue: { ...Typography.h4, color: C.primary },
    logStatLabel: { ...Typography.caption, color: C.textSecondary },
    setLine: { ...Typography.bodySmall, color: C.textSecondary, marginTop: 2 },
    logNotes: { ...Typography.bodySmall, color: C.textSecondary, marginTop: Spacing.sm, fontStyle: 'italic' },
  }), [C]);

  return (
    <View style={cardStyles.logCard}>
      <View style={cardStyles.logCardTop}>
        <View>
          <Text style={cardStyles.logDate}>
            {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
          </Text>
          <Text style={cardStyles.logTime}>{date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
        <TouchableOpacity onPress={onDelete} style={cardStyles.logDeleteBtn}>
          <Text style={cardStyles.logDeleteIcon}>{'\u2715'}</Text>
        </TouchableOpacity>
      </View>

      <View style={cardStyles.logStats}>
        <View style={cardStyles.logStat}>
          <Text style={cardStyles.logStatValue}>{log.sets.length}</Text>
          <Text style={cardStyles.logStatLabel}>Sets</Text>
        </View>
        {maxWeight > 0 && (
          <View style={cardStyles.logStat}>
            <Text style={cardStyles.logStatValue}>{maxWeight} kg</Text>
            <Text style={cardStyles.logStatLabel}>Max weight</Text>
          </View>
        )}
        {totalReps > 0 && (
          <View style={cardStyles.logStat}>
            <Text style={cardStyles.logStatValue}>{totalReps}</Text>
            <Text style={cardStyles.logStatLabel}>Total reps</Text>
          </View>
        )}
      </View>

      {/* Set breakdown */}
      {log.sets.map((s, i) => (
        <Text key={i} style={cardStyles.setLine}>
          Set {i + 1}: {s.weight ? `${s.weight} kg` : '\u2014'} \u00D7 {s.reps ? `${s.reps} reps` : '\u2014'}
        </Text>
      ))}

      {log.notes ? <Text style={cardStyles.logNotes}>{'\uD83D\uDCAC'} {log.notes}</Text> : null}
    </View>
  );
}

export default function ProgressScreen({ route }: Props) {
  const { exerciseId, exerciseName } = route.params;
  const { getExerciseLogs, deleteLog } = useUserData();
  const { colors: C } = useTheme();
  const [metric, setMetric] = useState<'weight' | 'reps'>('weight');

  const logs = getExerciseLogs(exerciseId); // newest first from context
  const chronological = [...logs].reverse(); // oldest first for chart

  function handleDelete(log: WorkoutLog) {
    alert('Delete this log?', `${new Date(log.date).toLocaleDateString()}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteLog(log.id) },
    ]);
  }

  const styles = React.useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    scroll: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },
    exerciseName: { ...Typography.h2, color: C.textPrimary, marginBottom: 4 },
    sessionCount: { ...Typography.bodySmall, color: C.textSecondary, marginBottom: Spacing.lg },
    toggle: {
      flexDirection: 'row',
      backgroundColor: C.surface,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: C.border,
      marginBottom: Spacing.md,
      padding: 4,
    },
    toggleBtn: {
      flex: 1,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.sm,
      alignItems: 'center',
    },
    toggleBtnActive: { backgroundColor: C.primary },
    toggleBtnText: { ...Typography.label, color: C.textSecondary },
    toggleBtnTextActive: { color: C.textOnPrimary },
    prSection: { marginBottom: Spacing.lg },
    sectionTitle: { ...Typography.h4, color: C.textPrimary, marginBottom: Spacing.sm },
    prRow: { flexDirection: 'row', gap: Spacing.sm },
    prCard: {
      flex: 1,
      backgroundColor: C.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: C.border,
    },
    prValue: { ...Typography.h3, color: C.primary, marginBottom: 4 },
    prLabel: { ...Typography.caption, color: C.textSecondary, textAlign: 'center' },
    empty: { alignItems: 'center', marginTop: Spacing.xxl },
    emptyEmoji: { fontSize: 48, marginBottom: Spacing.md },
    emptyText: { ...Typography.h3, color: C.textPrimary, marginBottom: Spacing.sm },
    emptySubtext: { ...Typography.body, color: C.textSecondary, textAlign: 'center', maxWidth: 280 },
  }), [C]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.exerciseName}>{exerciseName}</Text>
        <Text style={styles.sessionCount}>{logs.length} session{logs.length !== 1 ? 's' : ''} logged</Text>

        {/* Metric toggle */}
        <View style={styles.toggle}>
          {(['weight', 'reps'] as const).map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.toggleBtn, metric === m && styles.toggleBtnActive]}
              onPress={() => setMetric(m)}
            >
              <Text style={[styles.toggleBtnText, metric === m && styles.toggleBtnTextActive]}>
                {m === 'weight' ? 'Weight (kg)' : 'Reps'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        <ProgressChart logs={chronological} metric={metric} />

        {/* Personal records */}
        {logs.length > 0 && (
          <View style={styles.prSection}>
            <Text style={styles.sectionTitle}>Personal Records</Text>
            <View style={styles.prRow}>
              {(() => {
                const allWeights = logs.flatMap((l) => l.sets.map((s) => s.weight)).filter((w): w is number => w !== undefined);
                const allReps = logs.flatMap((l) => l.sets.map((s) => s.reps)).filter((r): r is number => r !== undefined);
                return (
                  <>
                    {allWeights.length > 0 && (
                      <View style={styles.prCard}>
                        <Text style={styles.prValue}>{Math.max(...allWeights)} kg</Text>
                        <Text style={styles.prLabel}>{'\uD83C\uDFC6'} Best weight</Text>
                      </View>
                    )}
                    {allReps.length > 0 && (
                      <View style={styles.prCard}>
                        <Text style={styles.prValue}>{Math.max(...allReps)}</Text>
                        <Text style={styles.prLabel}>{'\uD83C\uDFC6'} Best reps</Text>
                      </View>
                    )}
                    <View style={styles.prCard}>
                      <Text style={styles.prValue}>{logs.length}</Text>
                      <Text style={styles.prLabel}>{'\uD83D\uDCC5'} Sessions</Text>
                    </View>
                  </>
                );
              })()}
            </View>
          </View>
        )}

        {/* History */}
        {logs.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginBottom: Spacing.md }]}>Session history</Text>
            {logs.map((log) => (
              <LogCard key={log.id} log={log} onDelete={() => handleDelete(log)} />
            ))}
          </>
        )}

        {logs.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>{'\uD83D\uDCCA'}</Text>
            <Text style={styles.emptyText}>No sessions logged yet</Text>
            <Text style={styles.emptySubtext}>
              Tap "Log workout" on the exercise screen to start tracking your progress.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
