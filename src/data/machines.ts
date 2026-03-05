import { Machine } from './types';

export const machines: Machine[] = [
  {
    id: 'machine-leg-press',
    gymId: 'gym-fit-arena',
    name: 'Leg Press',
    category: 'strength',
    description:
      'A seated machine that lets you push a weighted platform with your legs. Great for building quad, glute, and hamstring strength without needing to balance a barbell.',
    setupSteps: [
      {
        id: 'setup-lp-1',
        instruction: 'Adjust the seat back — closer means deeper range of motion, further is easier on knees.',
      },
      {
        id: 'setup-lp-2',
        instruction: 'Set the weight by inserting the pin on the weight stack. Start light (20–30 kg).',
      },
      {
        id: 'setup-lp-3',
        instruction: 'Sit down, place feet on platform, and unlock the safety handles before starting.',
      },
    ],
    etiquetteRules: [
      { id: 'eq-lp-1', rule: 'Re-rack the weight to zero after use', icon: '🏋️' },
      { id: 'eq-lp-2', rule: 'Lock the safety handles before getting off', icon: '🔒' },
      { id: 'eq-lp-3', rule: 'Wipe down the seat and back pad', icon: '🧹' },
    ],
    exerciseIds: ['ex-leg-press-standard'],
  },
  {
    id: 'machine-lat-pulldown',
    gymId: 'gym-fit-arena',
    name: 'Lat Pulldown',
    category: 'cable',
    description:
      'A cable machine with an overhead bar that you pull down to your chest. Excellent for building a wider, stronger back.',
    setupSteps: [
      {
        id: 'setup-lpd-1',
        instruction: 'Adjust the thigh pad so it sits snugly on your thighs when seated.',
      },
      {
        id: 'setup-lpd-2',
        instruction: 'Set the weight — most beginners start with 20–30 kg.',
      },
      {
        id: 'setup-lpd-3',
        instruction: 'Stand, grip the bar, then sit down (do not try to sit first).',
      },
    ],
    etiquetteRules: [
      { id: 'eq-lpd-1', rule: 'Return the bar gently — do not let it crash up', icon: '🤫' },
      { id: 'eq-lpd-2', rule: 'Return weight to starting pin position', icon: '🔁' },
      { id: 'eq-lpd-3', rule: 'Wipe the seat after use', icon: '🧹' },
    ],
    exerciseIds: ['ex-lat-pulldown-wide'],
  },
  {
    id: 'machine-cable-row',
    gymId: 'gym-fit-arena',
    name: 'Cable Row',
    category: 'cable',
    description:
      'A low-cable station with a bench and foot platform. Used for seated rowing movements that build back thickness and improve posture.',
    setupSteps: [
      {
        id: 'setup-cr-1',
        instruction: 'Attach the close-grip V-bar handle to the low cable hook.',
      },
      {
        id: 'setup-cr-2',
        instruction: 'Set the weight — 20–30 kg is a good starting point.',
      },
      {
        id: 'setup-cr-3',
        instruction: 'Sit on the bench, place feet on the platform with knees slightly bent.',
      },
    ],
    etiquetteRules: [
      { id: 'eq-cr-1', rule: 'Remove handle attachment after use', icon: '🔧' },
      { id: 'eq-cr-2', rule: 'Return weight stack to rest position', icon: '🔁' },
      { id: 'eq-cr-3', rule: 'Wipe the bench pad', icon: '🧹' },
    ],
    exerciseIds: ['ex-cable-row'],
  },
  {
    id: 'machine-chest-press',
    gymId: 'gym-fit-arena',
    name: 'Chest Press Machine',
    category: 'strength',
    description:
      'A guided pressing machine that targets the chest muscles. Safer and easier to learn than a barbell bench press — perfect for beginners.',
    setupSteps: [
      {
        id: 'setup-cp-1',
        instruction: 'Adjust the seat height — handles should be at chest level.',
      },
      {
        id: 'setup-cp-2',
        instruction: 'Set the starting arm position — the arms should not be behind your shoulders.',
      },
      {
        id: 'setup-cp-3',
        instruction: 'Choose a light weight to start (10–20 kg). Increase once you can do 15 reps easily.',
      },
    ],
    etiquetteRules: [
      { id: 'eq-cp-1', rule: 'Wipe the seat and back pad after use', icon: '🧹' },
      { id: 'eq-cp-2', rule: 'Return seat to default height', icon: '🔁' },
      { id: 'eq-cp-3', rule: "Don't drop the handles — let them return slowly", icon: '🤫' },
    ],
    exerciseIds: ['ex-machine-chest-press'],
  },
  {
    id: 'machine-treadmill',
    gymId: 'gym-fit-arena',
    name: 'Treadmill',
    category: 'cardio',
    description:
      'A moving belt for walking or running. Great for warming up, cardio sessions, or cooling down.',
    setupSteps: [
      {
        id: 'setup-tr-1',
        instruction: 'Clip the safety key to your clothing before stepping on the belt.',
      },
      {
        id: 'setup-tr-2',
        instruction: 'Start by standing on the side rails, press Quick Start, then step onto the belt.',
      },
      {
        id: 'setup-tr-3',
        instruction: 'Use the + / - buttons to adjust speed. 5–6 km/h is a brisk walk.',
      },
    ],
    etiquetteRules: [
      { id: 'eq-tr-1', rule: 'Wipe down the handles and console', icon: '🧹' },
      { id: 'eq-tr-2', rule: 'Return incline to 0% after use', icon: '🔁' },
      { id: 'eq-tr-3', rule: 'Time limit of 30 min during peak hours', icon: '⏱️' },
    ],
    exerciseIds: ['ex-treadmill-walk'],
  },

  // ── Global catalog machines (not tied to a specific gym) ──────────────────

  {
    id: 'machine-smith',
    name: 'Smith Machine',
    category: 'strength',
    description:
      'A barbell fixed to vertical guide rails. Safer than a free barbell for beginners — great for squats, bench press, and overhead press.',
    setupSteps: [
      { id: 'setup-sm-1', instruction: 'Set the safety hooks at a height just below your lowest position.' },
      { id: 'setup-sm-2', instruction: 'Load weight plates evenly on both sides.' },
      { id: 'setup-sm-3', instruction: 'Rotate the bar forward to unrack; rotate backward to re-rack.' },
    ],
    etiquetteRules: [
      { id: 'eq-sm-1', rule: 'Remove all weight plates after use', icon: '🏋️' },
      { id: 'eq-sm-2', rule: 'Wipe the bar and bench pad', icon: '🧹' },
    ],
    exerciseIds: ['ex-smith-squat'],
  },
  {
    id: 'machine-incline-press',
    name: 'Incline Chest Press',
    category: 'strength',
    description:
      'Like the chest press machine but at an incline angle. Targets the upper chest and front shoulders more than a flat press.',
    setupSteps: [
      { id: 'setup-ip-1', instruction: 'Adjust the seat so handles are at upper chest level.' },
      { id: 'setup-ip-2', instruction: 'Select a lighter weight than you use on flat press — incline is harder.' },
    ],
    etiquetteRules: [
      { id: 'eq-ip-1', rule: 'Wipe seat and back pad after use', icon: '🧹' },
    ],
    exerciseIds: ['ex-incline-press'],
  },
  {
    id: 'machine-shoulder-press',
    name: 'Shoulder Press Machine',
    category: 'strength',
    description:
      'A machine for pressing weight overhead. Builds shoulder size and strength without the balance demands of dumbbells.',
    setupSteps: [
      { id: 'setup-sp-1', instruction: 'Adjust the seat so handles are at shoulder height.' },
      { id: 'setup-sp-2', instruction: 'Set a light weight — start with 10–20 kg.' },
    ],
    etiquetteRules: [
      { id: 'eq-sp-1', rule: 'Wipe seat after use', icon: '🧹' },
      { id: 'eq-sp-2', rule: 'Return the handles gently', icon: '🤫' },
    ],
    exerciseIds: ['ex-shoulder-press'],
  },
  {
    id: 'machine-pec-deck',
    name: 'Pec Deck / Chest Fly',
    category: 'strength',
    description:
      'Isolates the chest muscles through a hugging motion. Great for getting a deep chest stretch and contraction.',
    setupSteps: [
      { id: 'setup-pd-1', instruction: 'Adjust the seat so your elbows are level with your shoulders.' },
      { id: 'setup-pd-2', instruction: 'Adjust the starting arm width — don\'t let arms go too far back.' },
    ],
    etiquetteRules: [
      { id: 'eq-pd-1', rule: 'Control the return — don\'t let arms snap back', icon: '🤫' },
      { id: 'eq-pd-2', rule: 'Wipe handles and seat after use', icon: '🧹' },
    ],
    exerciseIds: ['ex-pec-deck'],
  },
  {
    id: 'machine-leg-curl',
    name: 'Leg Curl Machine',
    category: 'strength',
    description:
      'Lying or seated machine that isolates the hamstrings. Essential for balanced leg development.',
    setupSteps: [
      { id: 'setup-lc-1', instruction: 'Lie face down (or sit, depending on machine). Align the pad just above the ankle.' },
      { id: 'setup-lc-2', instruction: 'Set a moderate weight — hamstrings fatigue quickly.' },
    ],
    etiquetteRules: [
      { id: 'eq-lc-1', rule: 'Wipe the pad and handles after use', icon: '🧹' },
    ],
    exerciseIds: ['ex-leg-curl'],
  },
  {
    id: 'machine-leg-extension',
    name: 'Leg Extension Machine',
    category: 'strength',
    description:
      'Isolates the quadriceps through a knee-extension motion. Great for building quad definition.',
    setupSteps: [
      { id: 'setup-le-1', instruction: 'Adjust the back pad so your knees are at the seat edge.' },
      { id: 'setup-le-2', instruction: 'Position the ankle pad just above your ankles.' },
    ],
    etiquetteRules: [
      { id: 'eq-le-1', rule: 'Wipe seat and pad after use', icon: '🧹' },
      { id: 'eq-le-2', rule: 'Lower weight slowly — no sudden drops', icon: '🤫' },
    ],
    exerciseIds: ['ex-leg-extension'],
  },
  {
    id: 'machine-hip-abductor',
    name: 'Hip Abductor Machine',
    category: 'strength',
    description:
      'Strengthens the outer thighs and glutes through a push-apart motion. Helps with hip stability and posture.',
    setupSteps: [
      { id: 'setup-ha-1', instruction: 'Sit with pads on the outside of your thighs.' },
      { id: 'setup-ha-2', instruction: 'Start with a light weight — 20–30 kg.' },
    ],
    etiquetteRules: [
      { id: 'eq-ha-1', rule: 'Wipe seat and leg pads after use', icon: '🧹' },
    ],
    exerciseIds: ['ex-hip-abductor'],
  },
  {
    id: 'machine-stationary-bike',
    name: 'Stationary Bike',
    category: 'cardio',
    description:
      'Low-impact cardio machine. Easy on the joints — perfect warm-up or steady-state cardio.',
    setupSteps: [
      { id: 'setup-sb-1', instruction: 'Adjust the seat height — your knee should be slightly bent at the bottom of the pedal stroke.' },
      { id: 'setup-sb-2', instruction: 'Set resistance using the dial or touchscreen.' },
    ],
    etiquetteRules: [
      { id: 'eq-sb-1', rule: 'Wipe seat and handlebars after use', icon: '🧹' },
      { id: 'eq-sb-2', rule: '30-minute limit during peak hours', icon: '⏱️' },
    ],
    exerciseIds: ['ex-stationary-bike'],
  },
  {
    id: 'machine-elliptical',
    name: 'Elliptical Trainer',
    category: 'cardio',
    description:
      'Full-body, zero-impact cardio. The gliding motion works legs and arms simultaneously without stressing the joints.',
    setupSteps: [
      { id: 'setup-el-1', instruction: 'Step onto the pedals and grip the moving handles.' },
      { id: 'setup-el-2', instruction: 'Select your program or set resistance manually.' },
    ],
    etiquetteRules: [
      { id: 'eq-el-1', rule: 'Wipe handles and console after use', icon: '🧹' },
    ],
    exerciseIds: ['ex-elliptical'],
  },
  {
    id: 'machine-rowing',
    name: 'Rowing Machine',
    category: 'cardio',
    description:
      'Full-body cardio machine mimicking rowing a boat. Works legs, core, and back — burns more calories than most cardio machines.',
    setupSteps: [
      { id: 'setup-rm-1', instruction: 'Strap your feet in securely.' },
      { id: 'setup-rm-2', instruction: 'Set the damper (resistance) — 3–5 is recommended for most beginners.' },
      { id: 'setup-rm-3', instruction: 'Sit tall, grip the handle, and start with legs — then lean back — then pull arms.' },
    ],
    etiquetteRules: [
      { id: 'eq-rm-1', rule: 'Wind the handle back onto the machine after use', icon: '🔁' },
      { id: 'eq-rm-2', rule: 'Wipe the seat and handle', icon: '🧹' },
    ],
    exerciseIds: ['ex-rowing'],
  },
  {
    id: 'machine-pull-up-assist',
    name: 'Assisted Pull-Up Machine',
    category: 'strength',
    description:
      'Makes pull-ups accessible by offsetting some of your bodyweight. Great for building towards unassisted pull-ups.',
    setupSteps: [
      { id: 'setup-pu-1', instruction: 'Select counterweight — higher weight = easier. Start with 50% of bodyweight.' },
      { id: 'setup-pu-2', instruction: 'Kneel or stand on the pad and grip the bar.' },
    ],
    etiquetteRules: [
      { id: 'eq-pu-1', rule: 'Step off carefully — don\'t jump down', icon: '⚠️' },
      { id: 'eq-pu-2', rule: 'Wipe the handles and knee pad', icon: '🧹' },
    ],
    exerciseIds: ['ex-assisted-pull-up'],
  },
  {
    id: 'machine-cable-crossover',
    name: 'Cable Crossover',
    category: 'cable',
    description:
      'Dual high-cable station for chest flies, face-pulls, tricep pushdowns and much more. One of the most versatile machines in any gym.',
    setupSteps: [
      { id: 'setup-cc-1', instruction: 'Attach the appropriate handle to the cable you need.' },
      { id: 'setup-cc-2', instruction: 'Set the pulley height to suit the exercise.' },
      { id: 'setup-cc-3', instruction: 'Select a light weight to start — cables feel lighter but isolate muscles effectively.' },
    ],
    etiquetteRules: [
      { id: 'eq-cc-1', rule: 'Return handles to the station after use', icon: '🔧' },
      { id: 'eq-cc-2', rule: 'Don\'t leave cables hanging unattended', icon: '⚠️' },
    ],
    exerciseIds: ['ex-cable-chest-fly', 'ex-face-pull'],
  },
];
