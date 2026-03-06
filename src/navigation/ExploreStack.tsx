import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExploreStackParamList } from './types';
import MachineCatalogScreen from '../screens/MachineCatalogScreen';
import MachineDetailScreen from '../screens/MachineDetailScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import LogWorkoutScreen from '../screens/LogWorkoutScreen';
import { useTheme } from '../theme';

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export default function ExploreStack() {
  const { colors: C } = useTheme();

  const sharedOptions = {
    headerStyle: { backgroundColor: C.surface },
    headerTintColor: C.primary,
    headerTitleStyle: { color: C.textPrimary, fontWeight: '600' as const },
    headerShadowVisible: false,
    contentStyle: { backgroundColor: C.background },
  };

  return (
    <Stack.Navigator screenOptions={sharedOptions}>
      <Stack.Screen name="MachineCatalog" component={MachineCatalogScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MachineDetail" component={MachineDetailScreen} options={{ title: 'Machine' }} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{ title: 'Exercise' }} />
      <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} options={{ title: 'Log Workout', presentation: 'modal' }} />
    </Stack.Navigator>
  );
}
