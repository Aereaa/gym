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
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'GymSelect'>;

export default function GymSelectScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  const filtered = gyms.filter(
    (g) =>
      g.name.toLowerCase().includes(query.toLowerCase()) ||
      g.city.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (gym: Gym) => {
    navigation.replace('MainTabs', {
      screen: 'Explore',
      params: {
        screen: 'MachineCatalog',
        params: { gymId: gym.id },
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.logo}>💪</Text>
        <Text style={styles.heroTitle}>Gymfidence</Text>
        <Text style={styles.heroSubtitle}>
          Select your gym to get started. We'll show you exactly how every machine works.
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by gym name or city…"
          placeholderTextColor={Colors.textDisabled}
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
            <Text style={styles.arrow}>›</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
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
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
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
    color: Colors.textPrimary,
  },
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  separator: {
    height: Spacing.sm,
  },
  gymCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  gymAvatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  gymAvatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
  },
  gymInfo: {
    flex: 1,
  },
  gymName: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  gymCity: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  gymMeta: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 22,
    color: Colors.textDisabled,
    marginLeft: Spacing.sm,
  },
  empty: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  emptyText: {
    ...Typography.h4,
    color: Colors.textSecondary,
  },
  emptySubtext: {
    ...Typography.bodySmall,
    color: Colors.textDisabled,
    marginTop: Spacing.xs,
  },
});
