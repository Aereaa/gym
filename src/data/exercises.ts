import { Exercise } from './types';

export const exercises: Exercise[] = [
  // ── Leg Press ──────────────────────────────────────────────────────────────
  {
    id: 'ex-leg-press-standard',
    machineId: 'machine-leg-press',
    name: 'Standard Leg Press',
    difficulty: 'beginner',
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves'],
    description:
      'The leg press is a great starting exercise for building lower-body strength without needing to balance a barbell. Perfect for beginners.',
    steps: [
      'Sit down and place your feet shoulder-width apart on the platform.',
      'Release the safety handles and lower the platform until your knees are at ~90°.',
      'Press through your heels to extend your legs — do not lock your knees at the top.',
      'Slowly lower the platform back down in a controlled motion.',
      'Complete your reps, then re-engage the safety handles before getting up.',
    ],
    keyPoints: [
      {
        id: 'kp-feet-position',
        title: 'Foot position',
        description:
          'Keep feet flat on the platform, shoulder-width apart. Your toes can point slightly outward.',
      },
      {
        id: 'kp-knee-tracking',
        title: 'Knee tracking',
        description:
          'Your knees should track over your toes. Avoid letting them cave inward.',
      },
      {
        id: 'kp-lower-back',
        title: 'Lower back',
        description:
          'Keep your lower back firmly against the seat pad throughout the movement.',
      },
      {
        id: 'kp-range-of-motion',
        title: 'Range of motion',
        description:
          'Lower until knees are at 90° or slightly past — avoid bringing knees to your chest which can round the lower back.',
      },
    ],
    commonMistakes: [
      {
        id: 'cm-locking-knees',
        title: 'Locking out the knees',
        description:
          "Fully locking your knees at the top puts stress on the joint. Stop just short of full extension.",
      },
      {
        id: 'cm-lifting-butt',
        title: 'Lifting your hips',
        description:
          'If your hips lift off the seat, the weight is too heavy or you are going too deep.',
      },
    ],
    sets: 3,
    reps: '10–15',
  },

  // ── Lat Pulldown ──────────────────────────────────────────────────────────
  {
    id: 'ex-lat-pulldown-wide',
    machineId: 'machine-lat-pulldown',
    name: 'Wide-Grip Lat Pulldown',
    difficulty: 'beginner',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'shoulders'],
    description:
      'The lat pulldown targets your lats — the large wing-shaped muscles of your back — giving you that V-taper shape and improving posture.',
    steps: [
      'Adjust the thigh pad so your legs fit snugly underneath when seated.',
      'Grip the bar slightly wider than shoulder-width, palms facing away.',
      'Sit down, lean back slightly (~15°), and brace your core.',
      'Pull the bar down to your upper chest by driving your elbows towards your hips.',
      'Slowly let the bar rise back up until your arms are fully extended.',
    ],
    keyPoints: [
      {
        id: 'kp-elbow-drive',
        title: 'Drive with elbows',
        description:
          'Think "elbows to hips" rather than "pull with hands". This ensures your back muscles do the work.',
      },
      {
        id: 'kp-chest-up',
        title: 'Chest up',
        description:
          'Keep your chest lifted and shoulders back throughout. Avoid rounding forward.',
      },
      {
        id: 'kp-full-stretch',
        title: 'Full stretch at top',
        description:
          'Allow your shoulder blades to rise at the top of each rep for a full range of motion.',
      },
    ],
    commonMistakes: [
      {
        id: 'cm-using-momentum',
        title: 'Using momentum',
        description:
          'Swinging back aggressively to pull the weight down takes tension off the lats. Stay controlled.',
      },
      {
        id: 'cm-pulling-to-neck',
        title: 'Pulling to the neck',
        description:
          'Pull to your upper chest, not behind your neck — the behind-the-neck variation stresses the cervical spine.',
      },
    ],
    sets: 3,
    reps: '10–12',
  },

  // ── Cable Row ─────────────────────────────────────────────────────────────
  {
    id: 'ex-cable-row',
    machineId: 'machine-cable-row',
    name: 'Seated Cable Row',
    difficulty: 'beginner',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'shoulders'],
    description:
      'The seated cable row builds thickness in your mid-back and helps improve posture. The cable provides constant tension throughout the movement.',
    steps: [
      'Attach the close-grip handle to the low cable.',
      'Sit on the bench with feet on the platform, knees slightly bent.',
      'Grip the handle and straighten your back — this is your starting position.',
      'Pull the handle to your lower sternum, driving elbows back and squeezing your shoulder blades.',
      'Slowly extend your arms back to the start without rounding your lower back.',
    ],
    keyPoints: [
      {
        id: 'kp-neutral-spine',
        title: 'Neutral spine',
        description:
          "Maintain a straight, neutral spine throughout. Don't round your lower back when reaching forward.",
      },
      {
        id: 'kp-shoulder-blades',
        title: 'Squeeze shoulder blades',
        description:
          'At the end of each rep, squeeze your shoulder blades together for 1 second.',
      },
    ],
    commonMistakes: [
      {
        id: 'cm-using-lower-back',
        title: 'Hinging with lower back',
        description:
          'Rocking back and forth uses your lower back as momentum. Keep your torso stable.',
      },
    ],
    sets: 3,
    reps: '10–12',
  },

  // ── Chest Press ───────────────────────────────────────────────────────────
  {
    id: 'ex-machine-chest-press',
    machineId: 'machine-chest-press',
    name: 'Machine Chest Press',
    difficulty: 'beginner',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    description:
      'A beginner-friendly alternative to the bench press. The machine guides the movement so you can focus on feeling your chest muscles work.',
    steps: [
      'Adjust the seat so the handles are at chest height.',
      'Sit with your back flat against the pad and feet flat on the floor.',
      'Grip the handles at shoulder-width, elbows at roughly 45° from your torso.',
      'Press the handles forward until your arms are almost fully extended.',
      'Slowly return to the start, letting your chest stretch at the end.',
    ],
    keyPoints: [
      {
        id: 'kp-elbow-angle',
        title: 'Elbow angle',
        description:
          "Keep elbows at about 45–75° from your torso — not flared out to 90° which stresses the shoulder.",
      },
      {
        id: 'kp-squeeze-chest',
        title: 'Squeeze at the top',
        description:
          'At full extension, squeeze your chest muscles for a moment before returning.',
      },
    ],
    commonMistakes: [
      {
        id: 'cm-arching-back',
        title: 'Arching the lower back',
        description:
          'Keep your lower back on the pad. Excessive arching moves the work away from the chest.',
      },
    ],
    sets: 3,
    reps: '10–15',
  },

  // ── Treadmill ─────────────────────────────────────────────────────────────
  {
    id: 'ex-treadmill-walk',
    machineId: 'machine-treadmill',
    name: 'Incline Walk',
    difficulty: 'beginner',
    primaryMuscles: ['calves', 'glutes', 'hamstrings'],
    secondaryMuscles: ['core'],
    description:
      'An incline walk is a low-impact cardio session that burns more calories than flat walking and activates your glutes and calves.',
    steps: [
      'Step onto the side rails (not the belt) and press Start.',
      'Set speed to 4–5 km/h, then step onto the moving belt.',
      'Gradually increase incline to 8–12% using the incline buttons.',
      'Walk with a natural stride, swinging your arms freely.',
      'To finish, reduce incline to 0%, slow to 3 km/h, then press Stop.',
    ],
    keyPoints: [
      {
        id: 'kp-no-handrail',
        title: 'Let go of the handrails',
        description:
          'Holding the rails reduces calorie burn and disrupts your natural gait. Only hold if needed for balance.',
      },
      {
        id: 'kp-upright-posture',
        title: 'Stand tall',
        description:
          'Lean slightly forward from the ankles (not the waist) to match the incline.',
      },
    ],
    commonMistakes: [
      {
        id: 'cm-holding-rails',
        title: 'Gripping the handrails',
        description:
          'Many people hold the rails tightly on high incline, reducing the effectiveness significantly.',
      },
    ],
    durationSeconds: 1800,
  },
];
