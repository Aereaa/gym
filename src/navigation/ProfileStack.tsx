import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import ProfileScreen from '../screens/ProfileScreen';
import MyMachinesScreen from '../screens/MyMachinesScreen';
import MachineDetailScreen from '../screens/MachineDetailScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import LogWorkoutScreen from '../screens/LogWorkoutScreen';
import ProgressScreen from '../screens/ProgressScreen';
import { Colors } from '../theme';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
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
      <Stack.Screen name="ProfileHome" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MyMachines" component={MyMachinesScreen} options={{ title: 'My Machines' }} />
      <Stack.Screen name="MachineDetail" component={MachineDetailScreen} options={{ title: 'Machine' }} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{ title: 'Exercise' }} />
      <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} options={{ title: 'Log Workout', presentation: 'modal' }} />
      <Stack.Screen name="Progress" component={ProgressScreen} options={({ route }) => ({ title: route.params.exerciseName })} />
    </Stack.Navigator>
  );
}
