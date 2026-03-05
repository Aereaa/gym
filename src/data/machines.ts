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
];
