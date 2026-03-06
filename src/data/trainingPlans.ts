import { TrainingPlan } from './types';

export const trainingPlans: TrainingPlan[] = [
  {
    id: 'plan-fullbody-30',
    name: '30 min Fullbody',
    description:
      'Quick full-body workout hitting all major muscle groups. Perfect for busy days or beginners who want a balanced session.',
    durationMinutes: 30,
    difficulty: 'beginner',
    targetMuscles: ['chest', 'back', 'quads', 'glutes', 'shoulders'],
    icon: '\u{1F525}',
    exercises: [
      { exerciseId: 'ex-leg-press-standard', sets: 3, reps: '12-15', restSeconds: 60 },
      { exerciseId: 'ex-machine-chest-press', sets: 3, reps: '10-12', restSeconds: 60 },
      { exerciseId: 'ex-lat-pulldown-wide', sets: 3, reps: '10-12', restSeconds: 60 },
      { exerciseId: 'ex-shoulder-press', sets: 2, reps: '12-15', restSeconds: 60 },
      { exerciseId: 'ex-stationary-bike', sets: 1, reps: '10 min', restSeconds: 0 },
    ],
  },
  {
    id: 'plan-back-shoulders',
    name: 'Back & Shoulders',
    description:
      'Focused pull-day session for building a wider back and stronger shoulders. Great for improving posture.',
    durationMinutes: 40,
    difficulty: 'beginner',
    targetMuscles: ['back', 'shoulders', 'biceps'],
    icon: '\u{1F4AA}',
    exercises: [
      { exerciseId: 'ex-lat-pulldown-wide', sets: 3, reps: '10-12', restSeconds: 90 },
      { exerciseId: 'ex-cable-row', sets: 3, reps: '10-12', restSeconds: 90 },
      { exerciseId: 'ex-assisted-pull-up', sets: 3, reps: '8-10', restSeconds: 90 },
      { exerciseId: 'ex-shoulder-press', sets: 3, reps: '10-12', restSeconds: 60 },
      { exerciseId: 'ex-face-pull', sets: 3, reps: '15-20', restSeconds: 60 },
    ],
  },
  {
    id: 'plan-legs-core',
    name: 'Legs & Core',
    description:
      'Lower body focused workout for building strong legs and a stable core. Essential for everyday strength.',
    durationMinutes: 35,
    difficulty: 'beginner',
    targetMuscles: ['quads', 'hamstrings', 'glutes', 'calves', 'core'],
    icon: '\u{1F9B5}',
    exercises: [
      { exerciseId: 'ex-leg-press-standard', sets: 4, reps: '10-15', restSeconds: 90 },
      { exerciseId: 'ex-leg-extension', sets: 3, reps: '12-15', restSeconds: 60 },
      { exerciseId: 'ex-leg-curl', sets: 3, reps: '12-15', restSeconds: 60 },
      { exerciseId: 'ex-hip-abductor', sets: 3, reps: '15-20', restSeconds: 60 },
      { exerciseId: 'ex-treadmill-walk', sets: 1, reps: '10 min incline', restSeconds: 0 },
    ],
  },
  {
    id: 'plan-upper-push',
    name: 'Upper Body Push',
    description:
      'Push-day workout targeting chest, shoulders, and triceps. Builds upper body pressing strength.',
    durationMinutes: 35,
    difficulty: 'beginner',
    targetMuscles: ['chest', 'shoulders', 'triceps'],
    icon: '\u{1F3CB}\uFE0F',
    exercises: [
      { exerciseId: 'ex-machine-chest-press', sets: 3, reps: '10-12', restSeconds: 90 },
      { exerciseId: 'ex-incline-press', sets: 3, reps: '10-12', restSeconds: 90 },
      { exerciseId: 'ex-pec-deck', sets: 3, reps: '12-15', restSeconds: 60 },
      { exerciseId: 'ex-shoulder-press', sets: 3, reps: '10-15', restSeconds: 60 },
      { exerciseId: 'ex-cable-chest-fly', sets: 3, reps: '12-15', restSeconds: 60 },
    ],
  },
  {
    id: 'plan-cardio-mix',
    name: 'Cardio Mix',
    description:
      'A varied cardio session combining different machines for a fun, full-body cardiovascular workout.',
    durationMinutes: 30,
    difficulty: 'beginner',
    targetMuscles: ['quads', 'glutes', 'calves', 'back', 'core'],
    icon: '\u{1F3C3}',
    exercises: [
      { exerciseId: 'ex-rowing', sets: 1, reps: '10 min', restSeconds: 60 },
      { exerciseId: 'ex-elliptical', sets: 1, reps: '10 min', restSeconds: 60 },
      { exerciseId: 'ex-treadmill-walk', sets: 1, reps: '10 min incline', restSeconds: 0 },
    ],
  },
];
