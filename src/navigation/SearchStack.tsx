import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchStackParamList } from './types';
import MachineSearchScreen from '../screens/MachineSearchScreen';
import MachineDetailScreen from '../screens/MachineDetailScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import LogWorkoutScreen from '../screens/LogWorkoutScreen';
import { Colors } from '../theme';

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.surface },
        headerTintColor: Colors.primary,
        headerTitleStyle: { color: Colors.textPrimary, fontWeight: '600' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="MachineSearch" component={MachineSearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MachineDetail" component={MachineDetailScreen} options={{ title: 'Machine' }} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{ title: 'Exercise' }} />
      <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} options={{ title: 'Log Workout', presentation: 'modal' }} />
    </Stack.Navigator>
  );
}
