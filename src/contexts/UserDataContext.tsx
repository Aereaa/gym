import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal, WorkoutLog, WorkoutSet } from '../data/types';
import { useAuth } from './AuthContext';

function goalsKey(userId: string) { return `@gymfidence_goals_${userId}`; }
function logsKey(userId: string)  { return `@gymfidence_logs_${userId}`; }

interface UserDataContextValue {
  // Saved machines
  savedMachineIds: string[];
  saveMachine: (id: string) => Promise<void>;
  removeSavedMachine: (id: string) => Promise<void>;
  isMachineSaved: (id: string) => boolean;

  // Goals
  goals: Goal[];
  addGoal: (title: string) => Promise<void>;
  toggleGoal: (id: string) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;

  // Workout logs
  workoutLogs: WorkoutLog[];
  logWorkout: (params: {
    exerciseId: string;
    exerciseName: string;
    machineName: string;
    sets: WorkoutSet[];
    notes?: string;
  }) => Promise<void>;
  getExerciseLogs: (exerciseId: string) => WorkoutLog[];
  deleteLog: (id: string) => Promise<void>;
}

const UserDataContext = createContext<UserDataContextValue | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const { user, updateUser } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);

  const savedMachineIds = user?.savedMachineIds ?? [];

  // Load data when user changes
  useEffect(() => {
    if (!user) {
      setGoals([]);
      setWorkoutLogs([]);
      return;
    }
    (async () => {
      const [rawGoals, rawLogs] = await Promise.all([
        AsyncStorage.getItem(goalsKey(user.id)),
        AsyncStorage.getItem(logsKey(user.id)),
      ]);
      setGoals(rawGoals ? JSON.parse(rawGoals) : []);
      setWorkoutLogs(rawLogs ? JSON.parse(rawLogs) : []);
    })();
  }, [user?.id]);

  // ── Saved machines ────────────────────────────────────────────────────────

  async function saveMachine(id: string) {
    if (!user || savedMachineIds.includes(id)) return;
    await updateUser({ savedMachineIds: [...savedMachineIds, id] });
  }

  async function removeSavedMachine(id: string) {
    await updateUser({ savedMachineIds: savedMachineIds.filter((m) => m !== id) });
  }

  function isMachineSaved(id: string) {
    return savedMachineIds.includes(id);
  }

  // ── Goals ─────────────────────────────────────────────────────────────────

  async function persistGoals(updated: Goal[]) {
    if (!user) return;
    await AsyncStorage.setItem(goalsKey(user.id), JSON.stringify(updated));
    setGoals(updated);
  }

  async function addGoal(title: string) {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    await persistGoals([...goals, newGoal]);
  }

  async function toggleGoal(id: string) {
    await persistGoals(
      goals.map((g) =>
        g.id === id
          ? { ...g, completed: !g.completed, completedAt: !g.completed ? new Date().toISOString() : undefined }
          : g,
      ),
    );
  }

  async function deleteGoal(id: string) {
    await persistGoals(goals.filter((g) => g.id !== id));
  }

  // ── Workout logs ──────────────────────────────────────────────────────────

  async function persistLogs(updated: WorkoutLog[]) {
    if (!user) return;
    await AsyncStorage.setItem(logsKey(user.id), JSON.stringify(updated));
    setWorkoutLogs(updated);
  }

  async function logWorkout({
    exerciseId,
    exerciseName,
    machineName,
    sets,
    notes,
  }: {
    exerciseId: string;
    exerciseName: string;
    machineName: string;
    sets: WorkoutSet[];
    notes?: string;
  }) {
    const entry: WorkoutLog = {
      id: `log-${Date.now()}`,
      exerciseId,
      exerciseName,
      machineName,
      date: new Date().toISOString(),
      sets,
      notes,
    };
    await persistLogs([entry, ...workoutLogs]);
  }

  function getExerciseLogs(exerciseId: string) {
    return workoutLogs.filter((l) => l.exerciseId === exerciseId);
  }

  async function deleteLog(id: string) {
    await persistLogs(workoutLogs.filter((l) => l.id !== id));
  }

  return (
    <UserDataContext.Provider
      value={{
        savedMachineIds,
        saveMachine,
        removeSavedMachine,
        isMachineSaved,
        goals,
        addGoal,
        toggleGoal,
        deleteGoal,
        workoutLogs,
        logWorkout,
        getExerciseLogs,
        deleteLog,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error('useUserData must be used inside UserDataProvider');
  return ctx;
}
