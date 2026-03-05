import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  GymSelect: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Explore: NavigatorScreenParams<ExploreStackParamList>;
  Profile: undefined;
};

export type ExploreStackParamList = {
  MachineCatalog: { gymId: string };
  MachineDetail: { machineId: string; gymId: string };
  ExerciseDetail: { exerciseId: string };
};
