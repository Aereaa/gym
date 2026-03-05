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
  gymId: string;
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
