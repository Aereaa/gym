import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Platform } from 'react-native';
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
      {ICONS[label] ?? '\u25CF'}
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
        tabBarInactiveTintColor: C.textDisabled,
        tabBarStyle: {
          backgroundColor: C.isDark ? C.surface : 'rgba(255,255,255,0.95)',
          borderTopColor: C.border,
          paddingBottom: 4,
          height: 60,
          ...(C.isDark ? {} : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 8,
          }),
          ...Platform.select({ web: { backdropFilter: 'blur(10px)' } as any }),
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' as const },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreStack} options={{ title: 'My Gym' }} />
      <Tab.Screen name="Search" component={SearchStack} options={{ title: 'Discover' }} />
      <Tab.Screen name="Mascot" component={MascotScreen} options={{ title: 'Mazlicek' }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
