import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExploreStackParamList } from '../navigation/types';
import { gyms, machines } from '../data';
import { Machine } from '../data/types';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

type Props = NativeStackScreenProps<ExploreStackParamList, 'MachineCatalog'>;

const CATEGORY_ICONS: Record<string, string> = {
  cardio: '🏃',
  strength: '💪',
  cable: '🔗',
  'free-weights': '🏋️',
  bodyweight: '🤸',
};

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  cardio: 'Cardio',
  strength: 'Strength',
  cable: 'Cable',
  'free-weights': 'Free weights',
  bodyweight: 'Bodyweight',
};

type CategoryFilter = 'all' | Machine['category'];
const FILTERS: CategoryFilter[] = ['all', 'cardio', 'strength', 'cable', 'free-weights', 'bodyweight'];

export default function MachineCatalogScreen({ route, navigation }: Props) {
  const { gymId } = route.params;
  const gym = gyms.find((g) => g.id === gymId);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const gymMachines = machines.filter((m) => gym?.machineIds.includes(m.id));
  const filtered =
    activeFilter === 'all'
      ? gymMachines
      : gymMachines.filter((m) => m.category === activeFilter);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.gymName}>{gym?.name ?? 'Your Gym'}</Text>
          <Text style={styles.subtitle}>{gymMachines.length} machines available</Text>
        </View>
        <TouchableOpacity
          style={styles.changeGymBtn}
          onPress={() => navigation.getParent()?.getParent()?.navigate('GymSelect')}
        >
          <Text style={styles.changeGymText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Category filters */}
      <FlatList
        data={FILTERS.filter((f) => {
          if (f === 'all') return true;
          return gymMachines.some((m) => m.category === f);
        })}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === item && styles.filterChipActive]}
            onPress={() => setActiveFilter(item)}
          >
            <Text style={[styles.filterText, activeFilter === item && styles.filterTextActive]}>
              {item !== 'all' && `${CATEGORY_ICONS[item]} `}
              {CATEGORY_LABELS[item]}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Machine grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.machineCard}
            onPress={() =>
              navigation.navigate('MachineDetail', { machineId: item.id, gymId })
            }
            activeOpacity={0.7}
          >
            <View style={styles.machineIconBox}>
              <Text style={styles.machineIcon}>{CATEGORY_ICONS[item.category]}</Text>
            </View>
            <View style={styles.machineInfo}>
              <Text style={styles.machineName}>{item.name}</Text>
              <Text style={styles.machineCategory}>{CATEGORY_LABELS[item.category]}</Text>
              <Text style={styles.machineExerciseCount}>
                {item.exerciseIds.length} exercise{item.exerciseIds.length !== 1 ? 's' : ''}
              </Text>
            </View>
            <View style={styles.chevron}>
              <Text style={styles.chevronText}>›</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No machines in this category</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  gymName: {
    ...Typography.h2,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  changeGymBtn: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  changeGymText: {
    ...Typography.label,
    color: Colors.primary,
  },
  filtersRow: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.xs,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.textOnPrimary,
  },
  grid: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  machineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  machineIconBox: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  machineIcon: {
    fontSize: 26,
  },
  machineInfo: {
    flex: 1,
  },
  machineName: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  machineCategory: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  machineExerciseCount: {
    ...Typography.bodySmall,
    color: Colors.accent,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: Spacing.sm,
  },
  chevronText: {
    fontSize: 22,
    color: Colors.textDisabled,
  },
  empty: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
});
