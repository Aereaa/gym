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
import { useTheme, THEME_META, ACCENTS, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

export default function ProfileScreen({ navigation }: Props) {
  const { user, logout, isGuest } = useAuth();
  const { savedMachineIds, goals, addGoal, toggleGoal, workoutLogs } = useUserData();
  const { mascot, level, phase, mood } = useMascot();
  const { colors: C, themeName, setTheme } = useTheme();
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

  const cardShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  };

  const styles = React.useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    page: { ...PageContainer, padding: Spacing.md, paddingTop: Spacing.lg },

    // Header
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.lg },
    screenTitle: { ...Typography.h1, color: C.textPrimary },
    logoutBtn: { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: C.border },
    logoutText: { ...Typography.label, color: C.textSecondary },

    // Cards
    card: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.md,
      ...cardShadow,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
    cardTitle: { ...Typography.h4, color: C.textPrimary },
    seeAll: { ...Typography.label, color: C.primary },

    // Guest
    guestInner: { alignItems: 'center', paddingVertical: Spacing.md },
    guestTitle: { ...Typography.h3, color: C.textPrimary, marginTop: Spacing.md },
    guestSub: { ...Typography.body, color: C.textSecondary, textAlign: 'center', marginTop: Spacing.xs, maxWidth: 300 },
    guestBtns: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg },

    // User
    userRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
    avatarLg: {
      width: 56, height: 56, borderRadius: 28,
      backgroundColor: ACCENTS.coralLight, alignItems: 'center', justifyContent: 'center',
    },
    avatarLetter: { fontSize: 24, fontWeight: '700', color: ACCENTS.coral },
    userName: { ...Typography.h3, color: C.textPrimary },
    userMeta: { ...Typography.bodySmall, color: C.textSecondary, marginTop: 2 },
    userGym: { ...Typography.bodySmall, color: C.accent, fontWeight: '500', marginTop: 2 },

    // Buttons
    btnPrimary: {
      backgroundColor: C.primary,
      borderRadius: 12,
      height: 48,
      paddingHorizontal: Spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: C.glow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 6,
    },
    btnPrimaryText: { ...Typography.button, color: C.textOnPrimary },
    btnOutline: {
      borderRadius: 12,
      height: 48,
      paddingHorizontal: Spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: C.primary,
    },
    btnOutlineText: { ...Typography.button, color: C.primary },
    btnOutlineSm: { borderRadius: 12, paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, borderWidth: 1, borderColor: C.primary, marginTop: Spacing.sm },
    btnOutlineSmText: { ...Typography.label, color: C.primary },

    // Mascot mini
    mascotMini: {
      backgroundColor: C.surface, borderRadius: BorderRadius.lg,
      padding: Spacing.md, marginBottom: Spacing.md,
      borderWidth: 1, borderColor: C.primary,
      flexDirection: 'row', alignItems: 'center',
      ...cardShadow,
    },
    mascotMiniName: { ...Typography.h4, color: C.textPrimary },
    mascotMiniInfo: { ...Typography.caption, color: C.textSecondary, marginTop: 2 },

    // Theme picker
    themeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
    themeBtn: {
      flex: 1,
      minWidth: '40%' as unknown as number,
      borderRadius: 12,
      borderWidth: 2,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: C.surfaceAlt,
    },
    themeSwatch: { width: 32, height: 32, borderRadius: 16, marginBottom: Spacing.xs },
    themeLabel: { ...Typography.caption, color: C.textSecondary, fontWeight: '500' },
    themeCheck: { ...Typography.caption, color: C.primary, fontWeight: '700', marginTop: 2 },

    // Stats
    statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
    statCard: {
      flex: 1, borderRadius: 14,
      paddingVertical: Spacing.md, alignItems: 'center',
      ...cardShadow,
    },
    statLabel: { ...Typography.caption, color: C.textSecondary, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },

    // Goals
    goalInput: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm },
    goalTextInput: {
      flex: 1, backgroundColor: C.background, borderWidth: 1, borderColor: C.border,
      borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, height: 44,
      ...Typography.body, color: C.textPrimary,
    },
    goalAddBtn: {
      width: 44, height: 44, backgroundColor: C.primary, borderRadius: BorderRadius.md,
      alignItems: 'center', justifyContent: 'center',
    },
    goalAddText: { fontSize: 22, color: C.textOnPrimary, fontWeight: '600' },
    goalRow: {
      flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm,
      borderTopWidth: 1, borderTopColor: C.border,
    },
    checkbox: { marginRight: Spacing.sm },
    checkboxInner: {
      width: 22, height: 22, borderRadius: 4,
      borderWidth: 2, borderColor: C.border,
    },
    goalText: { ...Typography.body, color: C.textPrimary, flex: 1 },
    completedNote: { ...Typography.bodySmall, color: C.accent, marginTop: Spacing.sm, fontWeight: '500' },
    emptyHint: { ...Typography.bodySmall, color: C.textSecondary, paddingVertical: Spacing.xs },
    emptyCard: { alignItems: 'center', paddingVertical: Spacing.sm },

    // Menu items
    menuItem: {
      flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm,
      borderTopWidth: 1, borderTopColor: C.border,
    },
    menuIconBox: {
      width: 32, height: 32, borderRadius: 8,
      alignItems: 'center', justifyContent: 'center',
      marginRight: Spacing.sm,
    },
    menuIconText: { fontSize: 16 },
    menuText: { ...Typography.body, color: C.textPrimary, flex: 1 },
    menuArrow: { fontSize: 20, color: C.textDisabled, marginLeft: Spacing.sm },

    // Progress
    progressRow: {
      flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm,
      borderTopWidth: 1, borderTopColor: C.border, gap: Spacing.sm,
    },
    progressName: { ...Typography.label, color: C.textPrimary },
    progressMeta: { ...Typography.caption, color: C.textSecondary, marginTop: 2 },
    progressStat: { ...Typography.caption, color: C.textSecondary },
    progressBest: { ...Typography.caption, color: C.primary, fontWeight: '600', marginTop: 2 },
  }), [C]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Profile</Text>
            {!isGuest && (
              <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* User card */}
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

          {/* Mascot mini */}
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

          {/* Theme picker */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Theme</Text>
            <View style={styles.themeRow}>
              {THEME_META.map(t => (
                <TouchableOpacity
                  key={t.key}
                  style={[
                    styles.themeBtn,
                    { borderColor: themeName === t.key ? t.swatch : C.border },
                    themeName === t.key && { backgroundColor: t.swatch + '18' },
                  ]}
                  onPress={() => setTheme(t.key)}
                >
                  <View style={[styles.themeSwatch, { backgroundColor: t.swatch }]} />
                  <Text style={styles.themeLabel}>{t.label}</Text>
                  {themeName === t.key && <Text style={styles.themeCheck}>{'\u2713'}</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: ACCENTS.coralLight }]}>
              <Text style={[Typography.h2, { color: ACCENTS.coral }]}>{savedMachineIds.length}</Text>
              <Text style={styles.statLabel}>Machines</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: ACCENTS.tealLight }]}>
              <Text style={[Typography.h2, { color: ACCENTS.teal }]}>{completedGoals}/{goals.length}</Text>
              <Text style={styles.statLabel}>Goals</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: ACCENTS.purpleLight }]}>
              <Text style={[Typography.h2, { color: ACCENTS.purple }]}>{workoutLogs.length}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
          </View>

          {/* Goals */}
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
                placeholderTextColor={C.textDisabled}
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

          {/* My Machines */}
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
                <View style={[styles.menuIconBox, { backgroundColor: ACCENTS.coralLight }]}>
                  <Text style={styles.menuIconText}>{'\uD83D\uDCCC'}</Text>
                </View>
                <Text style={styles.menuText}>{savedMachineIds.length} saved machine{savedMachineIds.length !== 1 ? 's' : ''}</Text>
                <Text style={styles.menuArrow}>{'\u203A'}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.getParent()?.navigate('Search')}
            >
              <View style={[styles.menuIconBox, { backgroundColor: ACCENTS.tealLight }]}>
                <Text style={styles.menuIconText}>{'\uD83D\uDD0D'}</Text>
              </View>
              <Text style={styles.menuText}>Browse & add machines</Text>
              <Text style={styles.menuArrow}>{'\u203A'}</Text>
            </TouchableOpacity>
          </View>

          {/* Progress */}
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
                  <Text style={styles.menuArrow}>{'\u203A'}</Text>
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
