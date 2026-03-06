import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { alert } from '../utils/alert';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/types';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../contexts/UserDataContext';
import { useMascot, getMascotEmoji, getPhaseLabel } from '../contexts/MascotContext';
import { gyms } from '../data';
import { Colors, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

export default function ProfileScreen({ navigation }: Props) {
  const { user, logout, isGuest } = useAuth();
  const { savedMachineIds, goals, addGoal, toggleGoal, workoutLogs } = useUserData();
  const { mascot, level, phase, mood } = useMascot();
  const [goalText, setGoalText] = useState('');

  const gym = user?.gymId ? gyms.find((g) => g.id === user.gymId) : null;
  const pendingGoals = goals.filter((g) => !g.completed);
  const completedGoals = goals.filter((g) => g.completed).length;

  const exerciseMap = new Map<string, { exerciseName: string; machineName: string; sessionCount: number; bestWeight?: number }>();
  for (const log of workoutLogs) {
    const existing = exerciseMap.get(log.exerciseId);
    const weights = log.sets.map((s) => s.weight).filter((w): w is number => w !== undefined);
    const maxW = weights.length > 0 ? Math.max(...weights) : undefined;
    if (existing) {
      existing.sessionCount += 1;
      if (maxW !== undefined && (existing.bestWeight === undefined || maxW > existing.bestWeight)) {
        existing.bestWeight = maxW;
      }
    } else {
      exerciseMap.set(log.exerciseId, {
        exerciseName: log.exerciseName,
        machineName: log.machineName,
        sessionCount: 1,
        bestWeight: maxW,
      });
    }
  }
  const trackedExercises = Array.from(exerciseMap.entries()).slice(0, 3);

  function handleLogout() {
    alert('Log out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => logout() },
    ]);
  }

  async function handleAddGoal() {
    const trimmed = goalText.trim();
    if (!trimmed) return;
    await addGoal(trimmed);
    setGoalText('');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>

          {/* ── Header ────────────────────────────────── */}
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Profile</Text>
            {!isGuest && (
              <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* ── User card ─────────────────────────────── */}
          {isGuest ? (
            <View style={styles.card}>
              <View style={styles.guestInner}>
                <View style={styles.avatarLg}>
                  <Text style={styles.avatarLetter}>?</Text>
                </View>
                <Text style={styles.guestTitle}>Browsing as guest</Text>
                <Text style={styles.guestSub}>Create an account to save your progress across sessions.</Text>
                <View style={styles.guestBtns}>
                  <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.btnPrimaryText}>Log in</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.btnOutlineText}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.card}>
              <View style={styles.userRow}>
                <View style={styles.avatarLg}>
                  <Text style={styles.avatarLetter}>{user?.name?.[0]?.toUpperCase() ?? '?'}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.userName}>{user?.name}</Text>
                  <Text style={styles.userMeta}>{user?.email}</Text>
                  {gym && <Text style={styles.userGym}>{gym.name}</Text>}
                </View>
              </View>
            </View>
          )}

          {/* ── Mascot mini ───────────────────────────── */}
          <TouchableOpacity
            style={styles.mascotMini}
            onPress={() => navigation.getParent()?.navigate('Mascot')}
          >
            <Text style={{ fontSize: 32 }}>{getMascotEmoji(phase, mood)}</Text>
            <View style={{ flex: 1, marginLeft: Spacing.sm }}>
              <Text style={styles.mascotMiniName}>{mascot.name}</Text>
              <Text style={styles.mascotMiniInfo}>{getPhaseLabel(phase)} &middot; Level {level} &middot; {mascot.xp} XP</Text>
            </View>
            <Text style={styles.menuArrow}>&rsaquo;</Text>
          </TouchableOpacity>

          {/* ── Stats ─────────────────────────────────── */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{savedMachineIds.length}</Text>
              <Text style={styles.statLabel}>Machines</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{completedGoals}/{goals.length}</Text>
              <Text style={styles.statLabel}>Goals</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{workoutLogs.length}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
          </View>

          {/* ── Goals ─────────────────────────────────── */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>My Goals</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.goalInput}>
              <TextInput
                style={styles.goalTextInput}
                value={goalText}
                onChangeText={setGoalText}
                placeholder="Add a goal — e.g. Squat 80 kg"
                placeholderTextColor={Colors.textDisabled}
                onSubmitEditing={handleAddGoal}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={[styles.goalAddBtn, !goalText.trim() && { opacity: 0.4 }]}
                onPress={handleAddGoal}
                disabled={!goalText.trim()}
              >
                <Text style={styles.goalAddText}>+</Text>
              </TouchableOpacity>
            </View>

            {pendingGoals.length === 0 && goals.length === 0 && (
              <Text style={styles.emptyHint}>No goals yet. Add one above to get started.</Text>
            )}

            {pendingGoals.slice(0, 4).map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={styles.goalRow}
                onPress={() => toggleGoal(goal.id)}
              >
                <View style={styles.checkbox}>
                  <View style={styles.checkboxInner} />
                </View>
                <Text style={styles.goalText} numberOfLines={1}>{goal.title}</Text>
              </TouchableOpacity>
            ))}

            {completedGoals > 0 && (
              <Text style={styles.completedNote}>{completedGoals} goal{completedGoals !== 1 ? 's' : ''} completed</Text>
            )}
          </View>

          {/* ── My Machines ───────────────────────────── */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>My Machines</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MyMachines')}>
                <Text style={styles.seeAll}>{savedMachineIds.length > 0 ? 'See all' : ''}</Text>
              </TouchableOpacity>
            </View>

            {savedMachineIds.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyHint}>No saved machines yet.</Text>
                <TouchableOpacity
                  style={styles.btnOutlineSm}
                  onPress={() => navigation.getParent()?.navigate('Search')}
                >
                  <Text style={styles.btnOutlineSmText}>Browse machines</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyMachines')}>
                <Text style={styles.menuIcon}>📌</Text>
                <Text style={styles.menuText}>{savedMachineIds.length} saved machine{savedMachineIds.length !== 1 ? 's' : ''}</Text>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.getParent()?.navigate('Search')}
            >
              <Text style={styles.menuIcon}>🔍</Text>
              <Text style={styles.menuText}>Browse & add machines</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* ── Progress ──────────────────────────────── */}
          {trackedExercises.length > 0 && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Progress</Text>
              </View>
              {trackedExercises.map(([exerciseId, data]) => (
                <TouchableOpacity
                  key={exerciseId}
                  style={styles.progressRow}
                  onPress={() => navigation.navigate('Progress', { exerciseId, exerciseName: data.exerciseName })}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.progressName}>{data.exerciseName}</Text>
                    <Text style={styles.progressMeta}>{data.machineName}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.progressStat}>{data.sessionCount} session{data.sessionCount !== 1 ? 's' : ''}</Text>
                    {data.bestWeight !== undefined && (
                      <Text style={styles.progressBest}>Best: {data.bestWeight} kg</Text>
                    )}
                  </View>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={{ height: Spacing.xxl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  page: { ...PageContainer, padding: Spacing.md, paddingTop: Spacing.lg },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.lg },
  screenTitle: { ...Typography.h1, color: Colors.textPrimary },
  logoutBtn: { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border },
  logoutText: { ...Typography.label, color: Colors.textSecondary },

  // Cards
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  cardTitle: { ...Typography.h4, color: Colors.textPrimary },
  seeAll: { ...Typography.label, color: Colors.primary },

  // Guest
  guestInner: { alignItems: 'center', paddingVertical: Spacing.md },
  guestTitle: { ...Typography.h3, color: Colors.textPrimary, marginTop: Spacing.md },
  guestSub: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.xs, maxWidth: 300 },
  guestBtns: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg },

  // User
  userRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  avatarLg: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  avatarLetter: { fontSize: 24, fontWeight: '700', color: Colors.primary },
  userName: { ...Typography.h3, color: Colors.textPrimary },
  userMeta: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  userGym: { ...Typography.bodySmall, color: Colors.accent, fontWeight: '500', marginTop: 2 },

  // Buttons
  btnPrimary: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 10, paddingHorizontal: Spacing.lg },
  btnPrimaryText: { ...Typography.button, color: Colors.textOnPrimary },
  btnOutline: { borderRadius: BorderRadius.md, paddingVertical: 10, paddingHorizontal: Spacing.lg, borderWidth: 1, borderColor: Colors.primary },
  btnOutlineText: { ...Typography.button, color: Colors.primary },
  btnOutlineSm: { borderRadius: BorderRadius.md, paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, borderWidth: 1, borderColor: Colors.primary, marginTop: Spacing.sm },
  btnOutlineSmText: { ...Typography.label, color: Colors.primary },

  // Mascot mini
  mascotMini: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.md, marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.primary,
    flexDirection: 'row', alignItems: 'center',
  },
  mascotMiniName: { ...Typography.h4, color: Colors.textPrimary },
  mascotMiniInfo: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  // Stats
  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  statCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md, alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  statValue: { ...Typography.h2, color: Colors.primary },
  statLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Goals
  goalInput: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm },
  goalTextInput: {
    flex: 1, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border,
    borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, height: 44,
    ...Typography.body, color: Colors.textPrimary,
  },
  goalAddBtn: {
    width: 44, height: 44, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  goalAddText: { fontSize: 22, color: Colors.textOnPrimary, fontWeight: '600' },
  goalRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  checkbox: { marginRight: Spacing.sm },
  checkboxInner: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: Colors.border,
  },
  goalText: { ...Typography.body, color: Colors.textPrimary, flex: 1 },
  completedNote: { ...Typography.bodySmall, color: Colors.accent, marginTop: Spacing.sm, fontWeight: '500' },
  emptyHint: { ...Typography.bodySmall, color: Colors.textSecondary, paddingVertical: Spacing.xs },
  emptyCard: { alignItems: 'center', paddingVertical: Spacing.sm },

  // Menu items
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  menuIcon: { fontSize: 18, marginRight: Spacing.sm },
  menuText: { ...Typography.body, color: Colors.textPrimary, flex: 1 },
  menuArrow: { fontSize: 20, color: Colors.textDisabled, marginLeft: Spacing.sm },

  // Progress
  progressRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.border, gap: Spacing.sm,
  },
  progressName: { ...Typography.label, color: Colors.textPrimary },
  progressMeta: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  progressStat: { ...Typography.caption, color: Colors.textSecondary },
  progressBest: { ...Typography.caption, color: Colors.primary, fontWeight: '600', marginTop: 2 },
});
