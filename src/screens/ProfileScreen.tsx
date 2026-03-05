import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { alert } from '../utils/alert';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/types';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../contexts/UserDataContext';
import { gyms } from '../data';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

export default function ProfileScreen({ navigation }: Props) {
  const { user, logout, isGuest } = useAuth();
  const { savedMachineIds, goals, workoutLogs } = useUserData();

  const gym = user?.gymId ? gyms.find((g) => g.id === user.gymId) : null;
  const completedGoals = goals.filter((g) => g.completed).length;

  // Build per-exercise progress summary
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
  const trackedExercises = Array.from(exerciseMap.entries()).slice(0, 5);

  function handleLogout() {
    alert('Log out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => logout() },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          {!isGuest && (
            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          )}
        </View>

        {isGuest ? (
          <View style={styles.guestSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>?</Text>
            </View>
            <Text style={styles.guestTitle}>You're browsing as a guest</Text>
            <Text style={styles.guestSubtitle}>Log in or create an account to save your progress.</Text>
            <View style={styles.guestButtons}>
              <TouchableOpacity style={styles.guestLoginBtn} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.guestLoginText}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.guestRegisterBtn} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.guestRegisterText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>{user?.name?.[0]?.toUpperCase() ?? '?'}</Text>
            </View>
            <View>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              {gym && <Text style={styles.userGym}>🏋️  {gym.name}</Text>}
            </View>
          </View>
        )}

        <View style={styles.statsRow}>
          {[
            { icon: '📌', value: String(savedMachineIds.length), label: 'Saved machines' },
            { icon: '🎯', value: `${completedGoals}/${goals.length}`, label: 'Goals done' },
            { icon: '📊', value: String(workoutLogs.length), label: 'Sessions logged' },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.menuRow} onPress={() => navigation.navigate('MyMachines')}>
          <Text style={styles.menuIcon}>📌</Text>
          <View style={styles.menuInfo}>
            <Text style={styles.menuLabel}>My Machines</Text>
            <Text style={styles.menuMeta}>{savedMachineIds.length} saved</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        {trackedExercises.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Progress</Text>
            {trackedExercises.map(([exerciseId, data]) => (
              <TouchableOpacity
                key={exerciseId}
                style={styles.progressRow}
                onPress={() => navigation.navigate('Progress', { exerciseId, exerciseName: data.exerciseName })}
              >
                <View style={styles.progressInfo}>
                  <Text style={styles.progressExercise}>{data.exerciseName}</Text>
                  <Text style={styles.progressMachine}>{data.machineName}</Text>
                </View>
                <View style={styles.progressStats}>
                  <Text style={styles.progressSessions}>{data.sessionCount} session{data.sessionCount !== 1 ? 's' : ''}</Text>
                  {data.bestWeight !== undefined && (
                    <Text style={styles.progressBest}>Best: {data.bestWeight} kg</Text>
                  )}
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.encouragement}>
          <Text style={styles.encourageEmoji}>🌟</Text>
          <Text style={styles.encourageText}>
            You're doing great. Every visit makes you more confident.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.xxl },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingTop: Spacing.lg, paddingBottom: Spacing.md,
  },
  title: { ...Typography.h2, color: Colors.textPrimary },
  logoutBtn: {
    paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border,
  },
  logoutText: { ...Typography.label, color: Colors.textSecondary },
  avatarSection: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border,
    gap: Spacing.md,
  },
  avatar: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  avatarLetter: { fontSize: 28, fontWeight: '700', color: Colors.primary },
  userName: { ...Typography.h3, color: Colors.textPrimary },
  userEmail: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  userGym: { ...Typography.bodySmall, color: Colors.accent, marginTop: 4, fontWeight: '500' },
  statsRow: { flexDirection: 'row', padding: Spacing.md, gap: Spacing.sm },
  statCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: BorderRadius.md,
    padding: Spacing.sm, alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { ...Typography.h4, color: Colors.primary },
  statLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center', marginTop: 2 },
  menuRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md, marginBottom: Spacing.sm,
    padding: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border,
  },
  menuIcon: { fontSize: 22, marginRight: Spacing.md },
  menuInfo: { flex: 1 },
  menuLabel: { ...Typography.h4, color: Colors.textPrimary },
  menuMeta: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  menuArrow: { fontSize: 22, color: Colors.textDisabled },
  section: {
    marginHorizontal: Spacing.md, marginBottom: Spacing.md,
    backgroundColor: Colors.surface, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.border, overflow: 'hidden',
  },
  sectionTitle: {
    ...Typography.label, color: Colors.textSecondary, textTransform: 'uppercase',
    letterSpacing: 0.5, padding: Spacing.md, paddingBottom: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  progressRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  progressInfo: { flex: 1 },
  progressExercise: { ...Typography.label, color: Colors.textPrimary },
  progressMachine: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  progressStats: { alignItems: 'flex-end', marginRight: Spacing.sm },
  progressSessions: { ...Typography.caption, color: Colors.textSecondary },
  progressBest: { ...Typography.caption, color: Colors.primary, fontWeight: '600', marginTop: 2 },
  encouragement: {
    flexDirection: 'row', alignItems: 'center',
    margin: Spacing.md, marginTop: Spacing.sm,
    backgroundColor: Colors.accentLight, borderRadius: BorderRadius.md,
    padding: Spacing.md, gap: Spacing.sm,
  },
  encourageEmoji: { fontSize: 24 },
  encourageText: { ...Typography.bodySmall, color: Colors.accent, flex: 1, fontWeight: '500' },
  guestSection: {
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  guestTitle: { ...Typography.h3, color: Colors.textPrimary, marginTop: Spacing.md },
  guestSubtitle: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.xs, maxWidth: 280 },
  guestButtons: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg },
  guestLoginBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  guestLoginText: { ...Typography.button, color: Colors.textOnPrimary },
  guestRegisterBtn: {
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  guestRegisterText: { ...Typography.button, color: Colors.primary },
});
