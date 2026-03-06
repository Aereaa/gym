import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { gyms } from '../data';
import { Gym } from '../data/types';
import { useTheme, Typography, Spacing, BorderRadius, PageContainer } from '../theme';
import { useAuth } from '../contexts/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'GymSelect'>;

export default function GymSelectScreen({ navigation }: Props) {
  const { updateUser } = useAuth();
  const { colors: C } = useTheme();
  const [query, setQuery] = useState('');

  const filtered = gyms.filter(
    (g) =>
      g.name.toLowerCase().includes(query.toLowerCase()) ||
      g.city.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = async (gym: Gym) => {
    await updateUser({ gymId: gym.id });
    navigation.replace('MainTabs', {
      screen: 'Explore',
      params: {
        screen: 'MachineCatalog',
        params: { gymId: gym.id },
      },
    });
  };

  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: C.background,
    },
    hero: {
      ...PageContainer,
      alignItems: 'center',
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.lg,
      paddingHorizontal: Spacing.lg,
    },
    logo: {
      fontSize: 48,
      marginBottom: Spacing.sm,
    },
    heroTitle: {
      ...Typography.h1,
      color: C.textPrimary,
      marginBottom: Spacing.sm,
    },
    heroSubtitle: {
      ...Typography.body,
      color: C.textSecondary,
      textAlign: 'center',
      maxWidth: 300,
    },
    searchWrapper: {
      ...PageContainer,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: C.surface,
      marginBottom: Spacing.md,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: C.border,
      paddingHorizontal: Spacing.md,
      height: 48,
    },
    searchIcon: {
      fontSize: 16,
      marginRight: Spacing.sm,
    },
    searchInput: {
      flex: 1,
      ...Typography.body,
      color: C.textPrimary,
    },
    list: {
      ...PageContainer,
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.xl,
    },
    separator: {
      height: Spacing.sm,
    },
    gymCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: C.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: C.border,
    },
    gymAvatar: {
      width: 48,
      height: 48,
      borderRadius: BorderRadius.sm,
      backgroundColor: C.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
    },
    gymAvatarText: {
      fontSize: 22,
      fontWeight: '700',
      color: C.primary,
    },
    gymInfo: {
      flex: 1,
    },
    gymName: {
      ...Typography.h4,
      color: C.textPrimary,
      marginBottom: 2,
    },
    gymCity: {
      ...Typography.bodySmall,
      color: C.textSecondary,
      marginBottom: 2,
    },
    gymMeta: {
      ...Typography.caption,
      color: C.accent,
      fontWeight: '600',
    },
    arrow: {
      fontSize: 22,
      color: C.textDisabled,
      marginLeft: Spacing.sm,
    },
    empty: {
      alignItems: 'center',
      marginTop: Spacing.xxl,
    },
    emptyText: {
      ...Typography.h4,
      color: C.textSecondary,
    },
    emptySubtext: {
      ...Typography.bodySmall,
      color: C.textDisabled,
      marginTop: Spacing.xs,
    },
  }), [C]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={C.isDark ? 'light-content' : 'dark-content'} backgroundColor={C.background} />

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.logo}>{'\uD83D\uDCAA'}</Text>
        <Text style={styles.heroTitle}>Gymfidence</Text>
        <Text style={styles.heroSubtitle}>
          Select your gym to get started. We'll show you exactly how every machine works.
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>{'\uD83D\uDD0D'}</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by gym name or city..."
          placeholderTextColor={C.textDisabled}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Gym list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gymCard}
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
          >
            <View style={styles.gymAvatar}>
              <Text style={styles.gymAvatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.gymInfo}>
              <Text style={styles.gymName}>{item.name}</Text>
              <Text style={styles.gymCity}>{item.city} · {item.address}</Text>
              {item.memberCount && (
                <Text style={styles.gymMeta}>{item.memberCount.toLocaleString()} members</Text>
              )}
            </View>
            <Text style={styles.arrow}>{'\u203A'}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No gyms found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
