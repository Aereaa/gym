import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  GymSelect: { afterAuth?: boolean };
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Explore: NavigatorScreenParams<ExploreStackParamList>;
  Search: NavigatorScreenParams<SearchStackParamList>;
  Goals: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type ExploreStackParamList = {
  MachineCatalog: { gymId: string };
  MachineDetail: { machineId: string; gymId?: string };
  ExerciseDetail: { exerciseId: string };
  LogWorkout: { exerciseId: string; exerciseName: string; machineName: string };
};

export type SearchStackParamList = {
  MachineSearch: undefined;
  MachineDetail: { machineId: string; gymId?: string };
  ExerciseDetail: { exerciseId: string };
  LogWorkout: { exerciseId: string; exerciseName: string; machineName: string };
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  MyMachines: undefined;
  MachineDetail: { machineId: string; gymId?: string };
  ExerciseDetail: { exerciseId: string };
  LogWorkout: { exerciseId: string; exerciseName: string; machineName: string };
  Progress: { exerciseId: string; exerciseName: string };
};
