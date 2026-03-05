import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExploreStackParamList } from '../navigation/types';
import { gyms, machines } from '../data';
import { Machine } from '../data/types';
import { useAuth } from '../contexts/AuthContext';
import { Colors, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ExploreStackParamList, 'MachineCatalog'>;

const CATEGORY_ICONS: Record<string, string> = {
  cardio: '🏃', strength: '💪', cable: '🔗', 'free-weights': '🏋️', bodyweight: '🤸',
};
const CATEGORY_LABELS: Record<string, string> = {
  all: 'All', cardio: 'Cardio', strength: 'Strength', cable: 'Cable', 'free-weights': 'Free weights', bodyweight: 'Bodyweight',
};

type CategoryFilter = 'all' | Machine['category'];
const FILTERS: CategoryFilter[] = ['all', 'cardio', 'strength', 'cable', 'free-weights', 'bodyweight'];

export default function MachineCatalogScreen({ route, navigation }: Props) {
  const { user } = useAuth();
  const gymId = route.params?.gymId ?? user?.gymId ?? gyms[0]?.id;
  const gym = gyms.find((g) => g.id === gymId);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const gymMachines = machines.filter((m) => gym?.machineIds.includes(m.id));
  const availableFilters = FILTERS.filter((f) => f === 'all' || gymMachines.some((m) => m.category === f));
  const filtered = activeFilter === 'all' ? gymMachines : gymMachines.filter((m) => m.category === activeFilter);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.page}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <View style={{ flex: 1 }}>
                <Text style={styles.gymName}>{gym?.name ?? 'Your Gym'}</Text>
                <Text style={styles.subtitle}>{gymMachines.length} machines available</Text>
              </View>
              <TouchableOpacity
                style={styles.changeBtn}
                onPress={() => navigation.getParent()?.getParent()?.navigate('GymSelect')}
              >
                <Text style={styles.changeBtnText}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Filters */}
            <View style={styles.filters}>
              {availableFilters.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.chip, activeFilter === f && styles.chipActive]}
                  onPress={() => setActiveFilter(f)}
                >
                  <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>
                    {f !== 'all' && `${CATEGORY_ICONS[f]}  `}{CATEGORY_LABELS[f]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('MachineDetail', { machineId: item.id, gymId })}
            activeOpacity={0.7}
          >
            <View style={styles.iconBox}>
              <Text style={styles.icon}>{CATEGORY_ICONS[item.category]}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.machineName}>{item.name}</Text>
              <Text style={styles.machineCategory}>{CATEGORY_LABELS[item.category]}</Text>
              <Text style={styles.exerciseCount}>
                {item.exerciseIds.length} exercise{item.exerciseIds.length !== 1 ? 's' : ''}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
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
  safe: { flex: 1, backgroundColor: Colors.background },
  page: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },

  header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: Spacing.md },
  gymName: { ...Typography.h1, color: Colors.textPrimary },
  subtitle: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  changeBtn: {
    paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.primary,
  },
  changeBtnText: { ...Typography.label, color: Colors.primary },

  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg },
  chip: {
    paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full, backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { ...Typography.label, color: Colors.textSecondary },
  chipTextActive: { color: Colors.textOnPrimary },

  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  iconBox: {
    width: 52, height: 52, borderRadius: BorderRadius.md,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  icon: { fontSize: 24 },
  cardInfo: { flex: 1 },
  machineName: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 2 },
  machineCategory: { ...Typography.caption, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  exerciseCount: { ...Typography.bodySmall, color: Colors.accent, fontWeight: '600' },
  chevron: { fontSize: 22, color: Colors.textDisabled, marginLeft: Spacing.sm },

  empty: { alignItems: 'center', marginTop: Spacing.xxl },
  emptyText: { ...Typography.body, color: Colors.textSecondary },
});
