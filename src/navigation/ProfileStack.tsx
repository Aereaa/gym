import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import GoalsScreen from '../screens/GoalsScreen';
import MyMachinesScreen from '../screens/MyMachinesScreen';
import MachineDetailScreen from '../screens/MachineDetailScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import LogWorkoutScreen from '../screens/LogWorkoutScreen';
import ProgressScreen from '../screens/ProgressScreen';
import TrainingPlansScreen from '../screens/TrainingPlansScreen';
import TrainingPlanDetailScreen from '../screens/TrainingPlanDetailScreen';
import FirstVisitGuideScreen from '../screens/FirstVisitGuideScreen';
import { useTheme } from '../theme';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  const { colors: C } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: C.surface },
        headerTintColor: C.primary,
        headerTitleStyle: { color: C.textPrimary, fontWeight: '600' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: C.background },
      }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log in' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Sign up' }} />
      <Stack.Screen name="Goals" component={GoalsScreen} options={{ title: 'My Goals' }} />
      <Stack.Screen name="MyMachines" component={MyMachinesScreen} options={{ title: 'My Machines' }} />
      <Stack.Screen name="TrainingPlans" component={TrainingPlansScreen} options={{ title: 'Training Plans' }} />
      <Stack.Screen name="TrainingPlanDetail" component={TrainingPlanDetailScreen} options={{ title: 'Plan' }} />
      <Stack.Screen name="FirstVisitGuide" component={FirstVisitGuideScreen} options={{ title: 'First Visit Guide' }} />
      <Stack.Screen name="MachineDetail" component={MachineDetailScreen} options={{ title: 'Machine' }} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{ title: 'Exercise' }} />
      <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} options={{ title: 'Log Workout', presentation: 'modal' }} />
      <Stack.Screen name="Progress" component={ProgressScreen} options={({ route }) => ({ title: route.params.exerciseName })} />
    </Stack.Navigator>
  );
}
