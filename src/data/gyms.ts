import { Gym } from './types';

export const gyms: Gym[] = [
  {
    id: 'gym-fit-arena',
    name: 'FitArena Praha',
    address: 'Wenceslas Square 22',
    city: 'Prague',
    memberCount: 1240,
    machineIds: [
      'machine-leg-press',
      'machine-lat-pulldown',
      'machine-cable-row',
      'machine-chest-press',
      'machine-treadmill',
    ],
  },
  {
    id: 'gym-power-house',
    name: 'PowerHouse Brno',
    address: 'Náměstí Svobody 8',
    city: 'Brno',
    memberCount: 870,
    machineIds: [
      'machine-leg-press',
      'machine-lat-pulldown',
      'machine-chest-press',
      'machine-treadmill',
    ],
  },
  {
    id: 'gym-urban-fit',
    name: 'Urban Fit Ostrava',
    address: 'Stodolní 14',
    city: 'Ostrava',
    memberCount: 540,
    machineIds: [
      'machine-lat-pulldown',
      'machine-cable-row',
      'machine-chest-press',
      'machine-treadmill',
    ],
  },
];
