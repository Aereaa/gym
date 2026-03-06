import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { MainTabParamList } from './types';
import ExploreStack from './ExploreStack';
import SearchStack from './SearchStack';
import MascotScreen from '../screens/MascotScreen';
import ProfileStack from './ProfileStack';
import { useTheme } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<string, string> = {
  Explore: '\uD83C\uDFCB\uFE0F',
  Search: '\uD83D\uDD0D',
  Mascot: '\uD83D\uDC3E',
  Profile: '\uD83D\uDC64',
};

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.6 }}>
      {ICONS[label] ?? '●'}
    </Text>
  );
}

export default function MainTabs() {
  const { colors: C } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon label={route.name} focused={focused} />,
        tabBarActiveTintColor: C.primary,
        tabBarInactiveTintColor: C.textSecondary,
        tabBarStyle: {
          backgroundColor: C.surface,
          borderTopColor: C.border,
          paddingBottom: 4,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreStack} options={{ title: 'My Gym' }} />
      <Tab.Screen name="Search" component={SearchStack} options={{ title: 'Discover' }} />
      <Tab.Screen name="Mascot" component={MascotScreen} options={{ title: 'Mazlicek' }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
