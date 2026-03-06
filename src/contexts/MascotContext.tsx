import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { useUserData } from './UserDataContext';

// ── Types ────────────────────────────────────────────────────────────────────

export type MascotPhase = 'baby' | 'junior' | 'sportovec' | 'sampion' | 'legenda';
export type MascotMood = 'happy' | 'neutral' | 'sad' | 'sleeping';

export interface MascotData {
  xp: number;
  level: number;
  coins: number;
  lastCheckIn: string | null; // ISO date string
  name: string;
}

// ── XP thresholds per level ──────────────────────────────────────────────────

const LEVEL_THRESHOLDS = [
  0, 50, 120, 200, 300, 420, 560, 720, 900, 1100,
  1350, 1650, 2000, 2400, 2850, 3350, 3900, 4500, 5200, 6000,
  6900, 7900, 9000, 10200, 11500,
];

function getLevelFromXP(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export function getPhase(level: number): MascotPhase {
  if (level <= 3) return 'baby';
  if (level <= 7) return 'junior';
  if (level <= 12) return 'sportovec';
  if (level <= 18) return 'sampion';
  return 'legenda';
}

export function getPhaseLabel(phase: MascotPhase): string {
  switch (phase) {
    case 'baby': return 'Baby';
    case 'junior': return 'Junior';
    case 'sportovec': return 'Sportovec';
    case 'sampion': return 'Sampion';
    case 'legenda': return 'Legenda';
  }
}

export function getMascotEmoji(phase: MascotPhase, mood: MascotMood): string {
  if (mood === 'sleeping') return '\uD83D\uDCA4';
  if (mood === 'sad') return '\uD83D\uDC36';

  switch (phase) {
    case 'baby': return '\uD83D\uDC3E';
    case 'junior': return '\uD83D\uDC15';
    case 'sportovec': return '\uD83D\uDC29';
    case 'sampion': return '\uD83E\uDD3A';
    case 'legenda': return '\uD83C\uDFC6';
  }
}

export function getMoodMessage(mood: MascotMood, name: string): string {
  switch (mood) {
    case 'happy': return `${name} je stastny! Skvele trenujes!`;
    case 'neutral': return `${name} je ospalej... Kdy pujdeme cvicit?`;
    case 'sad': return `${name} smutni... Chybis mi!`;
    case 'sleeping': return `${name} spi... Ale az prijdes, rozjasni se!`;
  }
}

export function getXPForNextLevel(level: number): number {
  if (level >= LEVEL_THRESHOLDS.length) return 0;
  return LEVEL_THRESHOLDS[level]; // next level threshold
}

export function getXPProgress(xp: number, level: number): { current: number; needed: number; progress: number } {
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? currentThreshold;
  const current = xp - currentThreshold;
  const needed = nextThreshold - currentThreshold;
  if (needed === 0) return { current: 0, needed: 1, progress: 1 };
  return { current, needed, progress: Math.min(current / needed, 1) };
}

// ── Context ──────────────────────────────────────────────────────────────────

interface MascotContextValue {
  mascot: MascotData;
  level: number;
  phase: MascotPhase;
  mood: MascotMood;
  xpProgress: { current: number; needed: number; progress: number };
  dailyCheckIn: () => Promise<void>;
  renameMascot: (name: string) => Promise<void>;
}

const MascotContext = createContext<MascotContextValue | null>(null);

const STORAGE_KEY_PREFIX = '@gymfidence_mascot_';

function storageKey(userId: string) { return `${STORAGE_KEY_PREFIX}${userId}`; }

const DEFAULT_MASCOT: MascotData = {
  xp: 0,
  level: 1,
  coins: 0,
  lastCheckIn: null,
  name: 'Buddy',
};

export function MascotProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { workoutLogs, goals } = useUserData();
  const [mascotBase, setMascotBase] = useState<MascotData>(DEFAULT_MASCOT);

  // Load saved mascot data
  useEffect(() => {
    if (!user) { setMascotBase(DEFAULT_MASCOT); return; }
    (async () => {
      const raw = await AsyncStorage.getItem(storageKey(user.id));
      if (raw) {
        setMascotBase(JSON.parse(raw));
      } else {
        setMascotBase(DEFAULT_MASCOT);
      }
    })();
  }, [user?.id]);

  // Calculate XP from actual data
  const computedXP = React.useMemo(() => {
    let xp = mascotBase.xp;

    // +50 XP per workout logged
    const workoutXP = workoutLogs.length * 50;

    // +100 XP per completed goal
    const goalXP = goals.filter(g => g.completed).length * 100;

    // Compute coins: +10 per workout
    const earnedCoins = workoutLogs.length * 10;

    return {
      totalXP: workoutXP + goalXP + (mascotBase.xp - mascotBase.xp), // base from check-ins stored in mascotBase.xp
      checkInXP: mascotBase.xp,
      workoutXP,
      goalXP,
      coins: earnedCoins + mascotBase.coins,
    };
  }, [workoutLogs.length, goals, mascotBase.xp, mascotBase.coins]);

  const totalXP = computedXP.checkInXP + computedXP.workoutXP + computedXP.goalXP;
  const level = getLevelFromXP(totalXP);
  const phase = getPhase(level);
  const xpProgress = getXPProgress(totalXP, level);

  // Calculate mood from last workout
  const mood: MascotMood = React.useMemo(() => {
    if (workoutLogs.length === 0 && !mascotBase.lastCheckIn) return 'neutral';

    const lastWorkoutDate = workoutLogs.length > 0
      ? new Date(workoutLogs[0].date) // logs are newest-first
      : null;
    const lastCheckInDate = mascotBase.lastCheckIn ? new Date(mascotBase.lastCheckIn) : null;

    const lastActivity = [lastWorkoutDate, lastCheckInDate]
      .filter((d): d is Date => d !== null)
      .sort((a, b) => b.getTime() - a.getTime())[0];

    if (!lastActivity) return 'neutral';

    const daysSince = Math.floor((Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSince <= 2) return 'happy';
    if (daysSince <= 6) return 'neutral';
    if (daysSince <= 13) return 'sad';
    return 'sleeping';
  }, [workoutLogs, mascotBase.lastCheckIn]);

  const mascot: MascotData = {
    ...mascotBase,
    xp: totalXP,
    level,
    coins: computedXP.coins,
  };

  const persist = useCallback(async (data: MascotData) => {
    if (!user) return;
    await AsyncStorage.setItem(storageKey(user.id), JSON.stringify(data));
    setMascotBase(data);
  }, [user?.id]);

  async function dailyCheckIn() {
    const today = new Date().toISOString().split('T')[0];
    const lastDay = mascotBase.lastCheckIn?.split('T')[0];
    if (lastDay === today) return; // already checked in today

    await persist({
      ...mascotBase,
      xp: mascotBase.xp + 5,
      lastCheckIn: new Date().toISOString(),
    });
  }

  async function renameMascot(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    await persist({ ...mascotBase, name: trimmed });
  }

  return (
    <MascotContext.Provider value={{ mascot, level, phase, mood, xpProgress, dailyCheckIn, renameMascot }}>
      {children}
    </MascotContext.Provider>
  );
}

export function useMascot() {
  const ctx = useContext(MascotContext);
  if (!ctx) throw new Error('useMascot must be used inside MascotProvider');
  return ctx;
}
