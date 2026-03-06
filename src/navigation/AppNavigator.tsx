import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import GymSelectScreen from '../screens/GymSelectScreen';
import MainTabs from './MainTabs';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

function LoadingScreen() {
  const { colors: C } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: C.background }}>
      <ActivityIndicator size="large" color={C.primary} />
    </View>
  );
}

export default function AppNavigator() {
  const { loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="GymSelect" component={GymSelectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
