export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'core'
  | 'glutes'
  | 'quads'
  | 'hamstrings'
  | 'calves';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface KeyPoint {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
}

export interface CommonMistake {
  id: string;
  title: string;
  description: string;
}

export interface Exercise {
  id: string;
  machineId: string;
  name: string;
  difficulty: Difficulty;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  description: string;
  videoUrl?: string;
  steps: string[];
  keyPoints: KeyPoint[];
  commonMistakes: CommonMistake[];
  durationSeconds?: number;
  sets?: number;
  reps?: string;
}

export interface SetupStep {
  id: string;
  instruction: string;
  videoUrl?: string;
}

export interface EtiketteRule {
  id: string;
  rule: string;
  icon: string;
}

export interface Machine {
  id: string;
  /** undefined = global catalog machine not tied to a specific gym */
  gymId?: string;
  name: string;
  category: 'cardio' | 'strength' | 'free-weights' | 'cable' | 'bodyweight';
  description: string;
  imageUrl?: string;
  setupSteps: SetupStep[];
  etiquetteRules: EtiketteRule[];
  exerciseIds: string[];
}

export interface Gym {
  id: string;
  name: string;
  address: string;
  city: string;
  logoUrl?: string;
  machineIds: string[];
  memberCount?: number;
}

// ── User / Auth ────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  /** Plain-text stored locally — replace with real auth/backend in production */
  password: string;
  gymId?: string;
  savedMachineIds: string[];
  createdAt: string;
}

// ── Goals ─────────────────────────────────────────────────────────────────────

export interface Goal {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

// ── Training plans ────────────────────────────────────────────────────────────

export interface TrainingPlanExercise {
  exerciseId: string;
  sets: number;
  reps: string;
  restSeconds: number;
}

export interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  difficulty: Difficulty;
  targetMuscles: MuscleGroup[];
  exercises: TrainingPlanExercise[];
  icon: string;
}

// ── Workout logging ───────────────────────────────────────────────────────────

export interface WorkoutSet {
  weight?: number; // kg
  reps?: number;
  duration?: number; // seconds, for cardio
}

export interface WorkoutLog {
  id: string;
  exerciseId: string;
  exerciseName: string;
  machineName: string;
  date: string; // ISO string
  sets: WorkoutSet[];
  notes?: string;
}
