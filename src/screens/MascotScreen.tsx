import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme, Typography, Spacing, BorderRadius, PageContainer } from '../theme';
import {
  useMascot, getPhaseLabel, getMascotEmoji, getMoodMessage, getPhase,
} from '../contexts/MascotContext';
import { useUserData } from '../contexts/UserDataContext';

const MOOD_COLORS = {
  happy: '#10B981',
  neutral: '#F59E0B',
  sad: '#EF4444',
  sleeping: '#6B7280',
} as const;

const PHASE_COLORS = {
  baby: '#93C5FD',
  junior: '#60A5FA',
  sportovec: '#2563EB',
  sampion: '#F59E0B',
  legenda: '#A855F7',
} as const;

export default function MascotScreen() {
  const { mascot, level, phase, mood, xpProgress, dailyCheckIn, renameMascot } = useMascot();
  const { workoutLogs, goals } = useUserData();
  const { colors: C } = useTheme();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(mascot.name);
  const [checkedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    // Auto check-in when opening the mascot screen
    dailyCheckIn().then(() => setCheckedIn(true));
  }, []);

  function handleSaveName() {
    renameMascot(nameInput);
    setEditing(false);
  }

  const completedGoals = goals.filter(g => g.completed).length;
  const emoji = getMascotEmoji(phase, mood);
  const moodMsg = getMoodMessage(mood, mascot.name);
  const phaseColor = PHASE_COLORS[phase];
  const moodColor = MOOD_COLORS[mood];

  const styles = React.useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    page: { ...PageContainer, padding: Spacing.md, paddingTop: Spacing.lg },

    screenTitle: { ...Typography.h1, color: C.textPrimary, marginBottom: Spacing.lg },

    // Mascot card
    mascotCard: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      borderWidth: 2,
      alignItems: 'center',
    },
    mascotCircle: {
      width: 120, height: 120, borderRadius: 60,
      alignItems: 'center', justifyContent: 'center',
      marginBottom: Spacing.md,
    },
    mascotEmoji: { fontSize: 64 },

    mascotName: { ...Typography.h2, color: C.textPrimary, textAlign: 'center' },
    tapToEdit: { ...Typography.caption, color: C.textDisabled, textAlign: 'center', marginTop: 2 },

    nameEditRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
    nameInput: {
      ...Typography.h3, color: C.textPrimary, textAlign: 'center',
      borderBottomWidth: 2, borderBottomColor: C.primary, paddingVertical: 4,
      minWidth: 120,
    },
    nameSaveBtn: { backgroundColor: C.primary, borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, paddingVertical: 6 },
    nameSaveText: { ...Typography.button, color: C.textOnPrimary, fontSize: 13 },

    phaseBadge: {
      borderRadius: BorderRadius.full, paddingHorizontal: Spacing.md, paddingVertical: 4,
      marginTop: Spacing.sm,
    },
    phaseBadgeText: { ...Typography.label, color: '#fff', fontWeight: '700' },

    moodBubble: {
      flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
      borderWidth: 1, borderRadius: BorderRadius.full,
      paddingHorizontal: Spacing.md, paddingVertical: 6,
      marginTop: Spacing.md,
    },
    moodDot: { width: 8, height: 8, borderRadius: 4 },
    moodText: { ...Typography.bodySmall, fontWeight: '500' },

    // Cards
    card: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: C.border,
    },
    cardTitle: { ...Typography.h4, color: C.textPrimary, marginBottom: Spacing.md },

    // XP bar
    xpBarOuter: {
      height: 12, backgroundColor: C.surfaceAlt, borderRadius: 6,
      overflow: 'hidden', marginBottom: Spacing.sm,
    },
    xpBarInner: { height: '100%', borderRadius: 6 },
    xpRow: { flexDirection: 'row', justifyContent: 'space-between' },
    xpText: { ...Typography.label, color: C.textPrimary },
    xpTotal: { ...Typography.caption, color: C.textSecondary },
    xpHint: { ...Typography.caption, color: C.textSecondary, marginTop: 4 },

    // Stats
    statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
    statCard: {
      flex: 1, backgroundColor: C.surface, borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md, alignItems: 'center', borderWidth: 1, borderColor: C.border,
    },
    statEmoji: { fontSize: 20, marginBottom: 4 },
    statValue: { ...Typography.h2, color: C.primary },
    statLabel: { ...Typography.caption, color: C.textSecondary, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },

    // XP sources
    xpSource: {
      flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
      paddingVertical: Spacing.sm, borderTopWidth: 1, borderTopColor: C.border,
    },
    xpSourceIcon: { fontSize: 22 },
    xpSourceText: { ...Typography.label, color: C.textPrimary },
    xpSourceDetail: { ...Typography.caption, color: C.textSecondary, marginTop: 1 },
    xpSourceCount: { ...Typography.label, color: C.primary, fontWeight: '700' },
    checkInDone: { ...Typography.caption, color: C.success },

    // Phases
    phaseRow: {
      flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
      paddingVertical: Spacing.sm, paddingHorizontal: Spacing.sm,
      borderRadius: BorderRadius.md,
    },
    phaseEmoji: { fontSize: 24 },
    phaseRowLabel: { ...Typography.body, color: C.textPrimary },
    phaseRowRange: { ...Typography.caption, color: C.textSecondary },
    activeTag: { borderRadius: BorderRadius.full, paddingHorizontal: 10, paddingVertical: 2 },
    activeTagText: { ...Typography.caption, color: '#fff', fontWeight: '700', fontSize: 10 },

    // Mood info
    moodInfo: { ...Typography.bodySmall, color: C.textSecondary, marginBottom: Spacing.sm },
    moodRow: {
      flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
      paddingVertical: 4,
    },
    moodInfoDot: { fontSize: 18 },
    moodInfoText: { ...Typography.bodySmall, color: C.textPrimary, flex: 1 },
  }), [C]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>

          {/* Header */}
          <Text style={styles.screenTitle}>Mazlicek</Text>

          {/* Mascot display */}
          <View style={[styles.mascotCard, { borderColor: phaseColor }]}>
            <View style={[styles.mascotCircle, { backgroundColor: phaseColor + '20' }]}>
              <Text style={styles.mascotEmoji}>{emoji}</Text>
            </View>

            {/* Name */}
            {editing ? (
              <View style={styles.nameEditRow}>
                <TextInput
                  style={styles.nameInput}
                  value={nameInput}
                  onChangeText={setNameInput}
                  onSubmitEditing={handleSaveName}
                  autoFocus
                  maxLength={20}
                  returnKeyType="done"
                />
                <TouchableOpacity style={styles.nameSaveBtn} onPress={handleSaveName}>
                  <Text style={styles.nameSaveText}>OK</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => { setNameInput(mascot.name); setEditing(true); }}>
                <Text style={styles.mascotName}>{mascot.name}</Text>
                <Text style={styles.tapToEdit}>klepni pro prejmenovani</Text>
              </TouchableOpacity>
            )}

            {/* Phase & Level */}
            <View style={[styles.phaseBadge, { backgroundColor: phaseColor }]}>
              <Text style={styles.phaseBadgeText}>
                {getPhaseLabel(phase)} &middot; Level {level}
              </Text>
            </View>

            {/* Mood */}
            <View style={[styles.moodBubble, { borderColor: moodColor }]}>
              <View style={[styles.moodDot, { backgroundColor: moodColor }]} />
              <Text style={[styles.moodText, { color: moodColor }]}>{moodMsg}</Text>
            </View>
          </View>

          {/* XP Progress */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>XP Pokrok</Text>
            <View style={styles.xpBarOuter}>
              <View style={[styles.xpBarInner, { width: `${Math.round(xpProgress.progress * 100)}%`, backgroundColor: phaseColor }]} />
            </View>
            <View style={styles.xpRow}>
              <Text style={styles.xpText}>{xpProgress.current} / {xpProgress.needed} XP</Text>
              <Text style={styles.xpTotal}>Celkem: {mascot.xp} XP</Text>
            </View>
            {level < 25 && (
              <Text style={styles.xpHint}>
                Dalsi level za {xpProgress.needed - xpProgress.current} XP
              </Text>
            )}
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>{'\u2B50'}</Text>
              <Text style={styles.statValue}>{mascot.xp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>{'\uD83E\uDE99'}</Text>
              <Text style={styles.statValue}>{mascot.coins}</Text>
              <Text style={styles.statLabel}>GymCoiny</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>{'\uD83C\uDFC5'}</Text>
              <Text style={styles.statValue}>{level}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
          </View>

          {/* How XP is earned */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Jak ziskavat XP</Text>
            <View style={styles.xpSource}>
              <Text style={styles.xpSourceIcon}>{'\uD83C\uDFCB\uFE0F'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.xpSourceText}>Dokonceny trening</Text>
                <Text style={styles.xpSourceDetail}>+50 XP, +10 GymCoinu</Text>
              </View>
              <Text style={styles.xpSourceCount}>{workoutLogs.length}x</Text>
            </View>
            <View style={styles.xpSource}>
              <Text style={styles.xpSourceIcon}>{'\u2705'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.xpSourceText}>Splneny cil</Text>
                <Text style={styles.xpSourceDetail}>+100 XP</Text>
              </View>
              <Text style={styles.xpSourceCount}>{completedGoals}x</Text>
            </View>
            <View style={styles.xpSource}>
              <Text style={styles.xpSourceIcon}>{'\uD83D\uDC4B'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.xpSourceText}>Denni check-in</Text>
                <Text style={styles.xpSourceDetail}>+5 XP (otevri mazlicka)</Text>
              </View>
              {checkedIn && <Text style={styles.checkInDone}>{'\u2714\uFE0F'} Dnes splneno</Text>}
            </View>
          </View>

          {/* Phase progression info */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Faze rustu</Text>
            {(['baby', 'junior', 'sportovec', 'sampion', 'legenda'] as const).map((p, i) => {
              const isActive = p === phase;
              const levelRange = i === 0 ? '1-3' : i === 1 ? '4-7' : i === 2 ? '8-12' : i === 3 ? '13-18' : '19-25';
              return (
                <View key={p} style={[styles.phaseRow, isActive && { backgroundColor: PHASE_COLORS[p] + '15' }]}>
                  <Text style={styles.phaseEmoji}>{getMascotEmoji(p, 'happy')}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.phaseRowLabel, isActive && { color: PHASE_COLORS[p], fontWeight: '700' }]}>
                      {getPhaseLabel(p)}
                    </Text>
                    <Text style={styles.phaseRowRange}>Level {levelRange}</Text>
                  </View>
                  {isActive && (
                    <View style={[styles.activeTag, { backgroundColor: PHASE_COLORS[p] }]}>
                      <Text style={styles.activeTagText}>Nyni</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Mood info */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nalada mazlicka</Text>
            <Text style={styles.moodInfo}>
              Mazlicek reaguje na tvou aktivitu. Cim casteji cvicis, tim je stastnejsi!
            </Text>
            <View style={styles.moodRow}>
              <Text style={styles.moodInfoDot}>{'\uD83D\uDE04'}</Text>
              <Text style={styles.moodInfoText}>Stastny — trenujes pravidelne (0-2 dny)</Text>
            </View>
            <View style={styles.moodRow}>
              <Text style={styles.moodInfoDot}>{'\uD83D\uDE34'}</Text>
              <Text style={styles.moodInfoText}>Ospalej — 3-6 dni bez treninku</Text>
            </View>
            <View style={styles.moodRow}>
              <Text style={styles.moodInfoDot}>{'\uD83D\uDE22'}</Text>
              <Text style={styles.moodInfoText}>Smutny — 7-13 dni bez treninku</Text>
            </View>
            <View style={styles.moodRow}>
              <Text style={styles.moodInfoDot}>{'\uD83D\uDCA4'}</Text>
              <Text style={styles.moodInfoText}>Spi — 14+ dni bez treninku</Text>
            </View>
            <Text style={[styles.moodInfo, { marginTop: Spacing.sm, fontStyle: 'italic' }]}>
              Mazlicek nikdy neztraci XP ani level. Jen vizualne smutni.
            </Text>
          </View>

          <View style={{ height: Spacing.xxl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
