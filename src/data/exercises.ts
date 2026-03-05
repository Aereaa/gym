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

  // ── Global catalog exercises ───────────────────────────────────────────────

  {
    id: 'ex-smith-squat',
    machineId: 'machine-smith',
    name: 'Smith Machine Squat',
    difficulty: 'beginner',
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings', 'core'],
    description:
      'A guided squat using the Smith Machine. The fixed bar path makes it easier to focus on depth and form.',
    steps: [
      'Position the bar across your upper traps (not your neck). Unrack by rotating forward.',
      'Stand with feet shoulder-width apart, slightly in front of the bar.',
      'Squat down until thighs are parallel to the floor.',
      'Drive through your heels to stand back up.',
      'Rotate bar back to re-rack safely.',
    ],
    keyPoints: [
      { id: 'kp-ss-feet', title: 'Feet slightly forward', description: 'Unlike a free squat, your feet should be a bit forward of the bar to account for the fixed path.' },
      { id: 'kp-ss-depth', title: 'Hit parallel', description: 'Thighs should be at least parallel to the floor for full glute and quad activation.' },
    ],
    commonMistakes: [
      { id: 'cm-ss-forward-lean', title: 'Excessive forward lean', description: 'Keep your chest up. If you lean too far forward, your weight is too heavy.' },
    ],
    sets: 3,
    reps: '8–12',
  },
  {
    id: 'ex-incline-press',
    machineId: 'machine-incline-press',
    name: 'Incline Chest Press',
    difficulty: 'beginner',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    description:
      'Targets the upper chest and gives a more complete chest development.',
    steps: [
      'Adjust seat so handles are at upper chest level.',
      'Grip handles and plant feet flat.',
      'Press forward and slightly up until arms are almost fully extended.',
      'Slowly return to the start, feeling the chest stretch.',
    ],
    keyPoints: [
      { id: 'kp-ip-upper', title: 'Upper chest focus', description: 'Consciously try to squeeze the upper chest as you press.' },
    ],
    commonMistakes: [
      { id: 'cm-ip-shrug', title: 'Shrugging shoulders', description: 'Keep shoulders down and back. If you shrug, the weight is too heavy.' },
    ],
    sets: 3,
    reps: '10–12',
  },
  {
    id: 'ex-shoulder-press',
    machineId: 'machine-shoulder-press',
    name: 'Machine Shoulder Press',
    difficulty: 'beginner',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps'],
    description:
      'Builds shoulder size and strength overhead without the balance challenge of free weights.',
    steps: [
      'Sit with back flat against the pad, feet on the floor.',
      'Grip handles at ear level, elbows pointing down.',
      'Press up until arms are nearly straight.',
      'Lower slowly back to start.',
    ],
    keyPoints: [
      { id: 'kp-shp-wrists', title: 'Neutral wrists', description: 'Keep wrists straight, not bent back.' },
    ],
    commonMistakes: [
      { id: 'cm-shp-arch', title: 'Arching the lower back', description: 'Keep your core engaged to protect the spine.' },
    ],
    sets: 3,
    reps: '10–15',
  },
  {
    id: 'ex-pec-deck',
    machineId: 'machine-pec-deck',
    name: 'Pec Deck Fly',
    difficulty: 'beginner',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders'],
    description:
      'Isolates the chest with a wide hugging arc motion. Excellent for building chest thickness.',
    steps: [
      'Sit tall with back flat against the pad.',
      'Place forearms on the pads (or grip handles).',
      'Bring pads together in a controlled arc, squeezing chest at the centre.',
      'Slowly open back out until you feel a full chest stretch.',
    ],
    keyPoints: [
      { id: 'kp-pd-squeeze', title: 'Squeeze at centre', description: 'Pause at the centre for 1 second to maximise chest contraction.' },
    ],
    commonMistakes: [
      { id: 'cm-pd-too-wide', title: 'Going too far back', description: 'Stop before your elbows go past your torso line to protect the shoulder joint.' },
    ],
    sets: 3,
    reps: '12–15',
  },
  {
    id: 'ex-leg-curl',
    machineId: 'machine-leg-curl',
    name: 'Lying Leg Curl',
    difficulty: 'beginner',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['calves'],
    description:
      'Isolates the hamstrings — the muscles on the back of your thigh.',
    steps: [
      'Lie face down on the bench, pad just above the ankles.',
      'Keep hips flat on the bench throughout.',
      'Curl legs up toward your glutes in a smooth arc.',
      'Lower slowly — don\'t let the weight crash down.',
    ],
    keyPoints: [
      { id: 'kp-lc-hips', title: 'Hips stay down', description: 'If your hips lift, the weight is too heavy.' },
    ],
    commonMistakes: [
      { id: 'cm-lc-fast', title: 'Lowering too fast', description: 'The lowering phase builds as much muscle as lifting. Control it.' },
    ],
    sets: 3,
    reps: '12–15',
  },
  {
    id: 'ex-leg-extension',
    machineId: 'machine-leg-extension',
    name: 'Leg Extension',
    difficulty: 'beginner',
    primaryMuscles: ['quads'],
    secondaryMuscles: [],
    description:
      'Directly isolates the quadriceps through a knee-extension motion.',
    steps: [
      'Sit with your back against the pad, ankles under the lower pad.',
      'Extend legs until nearly straight — do not lock the knees.',
      'Lower slowly back to 90° or just past.',
    ],
    keyPoints: [
      { id: 'kp-le-top', title: 'Pause at the top', description: 'Pause briefly with legs extended to fully contract the quads.' },
    ],
    commonMistakes: [
      { id: 'cm-le-swing', title: 'Swinging the torso', description: 'Keep your back flat on the pad. No swinging.' },
    ],
    sets: 3,
    reps: '12–15',
  },
  {
    id: 'ex-hip-abductor',
    machineId: 'machine-hip-abductor',
    name: 'Hip Abductor',
    difficulty: 'beginner',
    primaryMuscles: ['glutes'],
    secondaryMuscles: [],
    description:
      'Strengthens the outer glutes and hip stabilisers — helps with knee tracking and posture.',
    steps: [
      'Sit upright with pads on the outside of your thighs.',
      'Push legs apart as wide as comfortable.',
      'Slowly bring legs back together — control the return.',
    ],
    keyPoints: [
      { id: 'kp-ha-sit', title: 'Sit upright', description: 'Leaning forward changes which muscles you target. Sit tall.' },
    ],
    commonMistakes: [
      { id: 'cm-ha-bounce', title: 'Bouncing at the end', description: 'Pause at full range, then control the return.' },
    ],
    sets: 3,
    reps: '15–20',
  },
  {
    id: 'ex-stationary-bike',
    machineId: 'machine-stationary-bike',
    name: 'Steady-State Cycling',
    difficulty: 'beginner',
    primaryMuscles: ['quads', 'calves'],
    secondaryMuscles: ['glutes', 'hamstrings'],
    description:
      'A low-impact way to build cardiovascular fitness and warm up the legs.',
    steps: [
      'Adjust seat so knee is slightly bent at the bottom of each pedal stroke.',
      'Start at low resistance, build up gradually.',
      'Aim for 60–80 RPM as a comfortable cadence.',
      'Cool down by reducing resistance for the last 2 minutes.',
    ],
    keyPoints: [
      { id: 'kp-bc-posture', title: 'Upright posture', description: 'Avoid hunching. Keep a light grip on the handlebars.' },
    ],
    commonMistakes: [
      { id: 'cm-bc-resist', title: 'Too little resistance', description: 'If you are bouncing in the seat, resistance is too low.' },
    ],
    durationSeconds: 1200,
  },
  {
    id: 'ex-elliptical',
    machineId: 'machine-elliptical',
    name: 'Elliptical Cardio',
    difficulty: 'beginner',
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings', 'core'],
    description:
      'Full-body, zero-impact cardio. Great for burning calories without stressing the joints.',
    steps: [
      'Step on, grab the moving handles, and start pedalling.',
      'Push and pull the handles to engage arms and back.',
      'Set resistance to a level where you can maintain a conversation.',
      'Try reverse pedalling every few minutes to hit the glutes and hamstrings more.',
    ],
    keyPoints: [
      { id: 'kp-el-push', title: 'Use the handles', description: 'Pushing and pulling the handles engages more muscle and increases calorie burn.' },
    ],
    commonMistakes: [
      { id: 'cm-el-passive', title: 'Passive arms', description: 'Don\'t just hold the handles — actively push and pull.' },
    ],
    durationSeconds: 1800,
  },
  {
    id: 'ex-rowing',
    machineId: 'machine-rowing',
    name: 'Rowing Machine',
    difficulty: 'beginner',
    primaryMuscles: ['back', 'quads'],
    secondaryMuscles: ['core', 'shoulders', 'hamstrings'],
    description:
      'One of the best full-body cardio exercises. Engages 86% of your muscles.',
    steps: [
      'Strap feet in. Sit upright, arms extended, shins vertical — this is the "catch".',
      'Drive with your legs first until they are straight.',
      'Then lean back slightly (about 11 o\'clock) and pull the handle to your lower chest.',
      'Reverse: arms forward first, then lean forward, then bend knees back to catch.',
    ],
    keyPoints: [
      { id: 'kp-row-sequence', title: 'Legs → Back → Arms', description: 'The sequence is critical. Most beginners use arms first — a common error.' },
    ],
    commonMistakes: [
      { id: 'cm-row-arms-first', title: 'Pulling with arms first', description: 'Your legs are the engine. Always initiate the drive with your legs.' },
    ],
    durationSeconds: 1200,
  },
  {
    id: 'ex-assisted-pull-up',
    machineId: 'machine-pull-up-assist',
    name: 'Assisted Pull-Up',
    difficulty: 'beginner',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'shoulders'],
    description:
      'Builds toward full pull-ups. The counterweight helps you complete the movement while still building strength.',
    steps: [
      'Select counterweight (heavier = easier). Start with 50% of your bodyweight.',
      'Grip the bar slightly wider than shoulders, palms facing away.',
      'Kneel on the pad and let it descend slowly.',
      'Pull yourself up until your chin clears the bar.',
      'Lower slowly back down.',
    ],
    keyPoints: [
      { id: 'kp-ap-elbows', title: 'Drive elbows down', description: 'Think of pulling your elbows to your hips, not your hands to the bar.' },
    ],
    commonMistakes: [
      { id: 'cm-ap-shrug', title: 'Shrugging at the top', description: 'Keep your shoulders down and away from your ears throughout.' },
    ],
    sets: 3,
    reps: '8–10',
  },
  {
    id: 'ex-cable-chest-fly',
    machineId: 'machine-cable-crossover',
    name: 'Cable Chest Fly',
    difficulty: 'intermediate',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders'],
    description:
      'Uses cables set at shoulder height for constant tension chest isolation.',
    steps: [
      'Set pulleys at shoulder height and attach D-ring handles.',
      'Stand in the centre, one foot forward for stability.',
      'Bring hands together in a wide arc, as if hugging a barrel.',
      'Let hands open back slowly — feel the full chest stretch.',
    ],
    keyPoints: [
      { id: 'kp-ccf-slight-bend', title: 'Slight elbow bend', description: 'Keep elbows slightly bent throughout — never fully locked.' },
    ],
    commonMistakes: [
      { id: 'cm-ccf-row', title: 'Turning it into a row', description: 'The motion should be a wide arc, not a pull. Keep elbows fixed.' },
    ],
    sets: 3,
    reps: '12–15',
  },
  {
    id: 'ex-face-pull',
    machineId: 'machine-cable-crossover',
    name: 'Face Pull',
    difficulty: 'beginner',
    primaryMuscles: ['shoulders', 'back'],
    secondaryMuscles: ['biceps'],
    description:
      'Targets the rear deltoids and rotator cuff — essential for shoulder health and posture.',
    steps: [
      'Set pulley to head height and attach a rope handle.',
      'Step back and grip the rope with thumbs pointing up.',
      'Pull the rope towards your face, elbows flaring high and wide.',
      'Pull hands apart at the end of the motion — squeeze rear delts.',
    ],
    keyPoints: [
      { id: 'kp-fp-elbows', title: 'Elbows high', description: 'Keep elbows above shoulder level throughout the pull.' },
    ],
    commonMistakes: [
      { id: 'cm-fp-heavy', title: 'Using too much weight', description: 'This is a health/posture exercise. Keep it light and focus on form.' },
    ],
    sets: 3,
    reps: '15–20',
  },
];
