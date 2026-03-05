import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExploreStackParamList } from './types';
import MachineCatalogScreen from '../screens/MachineCatalogScreen';
import MachineDetailScreen from '../screens/MachineDetailScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import { Colors } from '../theme';

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export default function ExploreStack() {
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
      <Stack.Screen
        name="MachineCatalog"
        component={MachineCatalogScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MachineDetail"
        component={MachineDetailScreen}
        options={{ title: 'Machine' }}
      />
      <Stack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={{ title: 'Exercise' }}
      />
    </Stack.Navigator>
  );
}
