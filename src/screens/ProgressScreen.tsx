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
import { Colors, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Progress'>;

function LogCard({ log, onDelete }: { log: WorkoutLog; onDelete: () => void }) {
  const date = new Date(log.date);
  const maxWeight = Math.max(...log.sets.map((s) => s.weight ?? 0));
  const totalReps = log.sets.reduce((sum, s) => sum + (s.reps ?? 0), 0);

  return (
    <View style={styles.logCard}>
      <View style={styles.logCardTop}>
        <View>
          <Text style={styles.logDate}>
            {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
          </Text>
          <Text style={styles.logTime}>{date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
        <TouchableOpacity onPress={onDelete} style={styles.logDeleteBtn}>
          <Text style={styles.logDeleteIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logStats}>
        <View style={styles.logStat}>
          <Text style={styles.logStatValue}>{log.sets.length}</Text>
          <Text style={styles.logStatLabel}>Sets</Text>
        </View>
        {maxWeight > 0 && (
          <View style={styles.logStat}>
            <Text style={styles.logStatValue}>{maxWeight} kg</Text>
            <Text style={styles.logStatLabel}>Max weight</Text>
          </View>
        )}
        {totalReps > 0 && (
          <View style={styles.logStat}>
            <Text style={styles.logStatValue}>{totalReps}</Text>
            <Text style={styles.logStatLabel}>Total reps</Text>
          </View>
        )}
      </View>

      {/* Set breakdown */}
      {log.sets.map((s, i) => (
        <Text key={i} style={styles.setLine}>
          Set {i + 1}: {s.weight ? `${s.weight} kg` : '—'} × {s.reps ? `${s.reps} reps` : '—'}
        </Text>
      ))}

      {log.notes ? <Text style={styles.logNotes}>💬 {log.notes}</Text> : null}
    </View>
  );
}

export default function ProgressScreen({ route }: Props) {
  const { exerciseId, exerciseName } = route.params;
  const { getExerciseLogs, deleteLog } = useUserData();
  const [metric, setMetric] = useState<'weight' | 'reps'>('weight');

  const logs = getExerciseLogs(exerciseId); // newest first from context
  const chronological = [...logs].reverse(); // oldest first for chart

  function handleDelete(log: WorkoutLog) {
    alert('Delete this log?', `${new Date(log.date).toLocaleDateString()}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteLog(log.id) },
    ]);
  }

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
                        <Text style={styles.prLabel}>🏆 Best weight</Text>
                      </View>
                    )}
                    {allReps.length > 0 && (
                      <View style={styles.prCard}>
                        <Text style={styles.prValue}>{Math.max(...allReps)}</Text>
                        <Text style={styles.prLabel}>🏆 Best reps</Text>
                      </View>
                    )}
                    <View style={styles.prCard}>
                      <Text style={styles.prValue}>{logs.length}</Text>
                      <Text style={styles.prLabel}>📅 Sessions</Text>
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
            <Text style={styles.emptyEmoji}>📊</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },
  exerciseName: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 4 },
  sessionCount: { ...Typography.bodySmall, color: Colors.textSecondary, marginBottom: Spacing.lg },
  toggle: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  toggleBtnActive: { backgroundColor: Colors.primary },
  toggleBtnText: { ...Typography.label, color: Colors.textSecondary },
  toggleBtnTextActive: { color: Colors.textOnPrimary },
  prSection: { marginBottom: Spacing.lg },
  sectionTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: Spacing.sm },
  prRow: { flexDirection: 'row', gap: Spacing.sm },
  prCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  prValue: { ...Typography.h3, color: Colors.primary, marginBottom: 4 },
  prLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center' },
  logCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm },
  logDate: { ...Typography.label, color: Colors.textPrimary },
  logTime: { ...Typography.caption, color: Colors.textSecondary },
  logDeleteBtn: { padding: Spacing.xs },
  logDeleteIcon: { fontSize: 14, color: Colors.textDisabled },
  logStats: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.sm },
  logStat: { alignItems: 'center' },
  logStatValue: { ...Typography.h4, color: Colors.primary },
  logStatLabel: { ...Typography.caption, color: Colors.textSecondary },
  setLine: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  logNotes: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: Spacing.sm, fontStyle: 'italic' },
  empty: { alignItems: 'center', marginTop: Spacing.xxl },
  emptyEmoji: { fontSize: 48, marginBottom: Spacing.md },
  emptyText: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.sm },
  emptySubtext: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', maxWidth: 280 },
});
