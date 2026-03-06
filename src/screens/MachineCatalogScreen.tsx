import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExploreStackParamList } from '../navigation/types';
import { gyms, machines } from '../data';
import { Machine } from '../data/types';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ExploreStackParamList, 'MachineCatalog'>;

const CATEGORY_ICONS: Record<string, string> = {
  cardio: '\u{1F3C3}', strength: '\u{1F4AA}', cable: '\u{1F517}', 'free-weights': '\u{1F3CB}\uFE0F', bodyweight: '\u{1F938}',
};
const CATEGORY_LABELS: Record<string, string> = {
  all: 'All', cardio: 'Cardio', strength: 'Strength', cable: 'Cable', 'free-weights': 'Free weights', bodyweight: 'Bodyweight',
};

type CategoryFilter = 'all' | Machine['category'];
const FILTERS: CategoryFilter[] = ['all', 'cardio', 'strength', 'cable', 'free-weights', 'bodyweight'];

export default function MachineCatalogScreen({ route, navigation }: Props) {
  const { colors: C } = useTheme();
  const { user } = useAuth();
  const gymId = route.params?.gymId ?? user?.gymId ?? gyms[0]?.id;
  const gym = gyms.find((g) => g.id === gymId);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const gymMachines = machines.filter((m) => gym?.machineIds.includes(m.id));
  const availableFilters = FILTERS.filter((f) => f === 'all' || gymMachines.some((m) => m.category === f));
  const filtered = activeFilter === 'all' ? gymMachines : gymMachines.filter((m) => m.category === activeFilter);

  const styles = React.useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    page: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },

    header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: Spacing.md },
    gymName: { ...Typography.h1, color: C.textPrimary },
    subtitle: { ...Typography.bodySmall, color: C.textSecondary, marginTop: 2 },
    changeBtn: {
      paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.full, borderWidth: 1, borderColor: C.primary,
    },
    changeBtnText: { ...Typography.label, color: C.primary },

    filters: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg },
    chip: {
      paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.full, backgroundColor: C.surface,
      borderWidth: 1, borderColor: C.border,
    },
    chipActive: { backgroundColor: C.primary, borderColor: C.primary },
    chipText: { ...Typography.label, color: C.textSecondary },
    chipTextActive: { color: C.textOnPrimary },

    card: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.surface, borderRadius: BorderRadius.lg,
      padding: Spacing.md, borderWidth: 1, borderColor: C.border,
    },
    iconBox: {
      width: 52, height: 52, borderRadius: BorderRadius.md,
      backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
    },
    icon: { fontSize: 24 },
    cardInfo: { flex: 1 },
    machineName: { ...Typography.h4, color: C.textPrimary, marginBottom: 2 },
    machineCategory: { ...Typography.caption, color: C.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
    exerciseCount: { ...Typography.bodySmall, color: C.accent, fontWeight: '600' },
    chevron: { fontSize: 22, color: C.textDisabled, marginLeft: Spacing.sm },

    empty: { alignItems: 'center', marginTop: Spacing.xxl },
    emptyText: { ...Typography.body, color: C.textSecondary },
  }), [C]);

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
            <Text style={styles.chevron}>{'\u203A'}</Text>
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
