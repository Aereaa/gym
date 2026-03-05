import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../navigation/types';
import { machines } from '../data';
import { Machine } from '../data/types';
import { useUserData } from '../contexts/UserDataContext';
import { Colors, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<SearchStackParamList, 'MachineSearch'>;

const CATEGORY_ICONS: Record<string, string> = {
  cardio: '🏃', strength: '💪', cable: '🔗', 'free-weights': '🏋️', bodyweight: '🤸',
};
const CATEGORY_LABELS: Record<string, string> = {
  cardio: 'Cardio', strength: 'Strength', cable: 'Cable', 'free-weights': 'Free weights', bodyweight: 'Bodyweight',
};

type CategoryFilter = 'all' | Machine['category'];
const FILTERS: CategoryFilter[] = ['all', 'cardio', 'strength', 'cable', 'free-weights'];

export default function MachineSearchScreen({ navigation }: Props) {
  const { saveMachine, removeSavedMachine, isMachineSaved } = useUserData();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filtered = useMemo(() => {
    return machines.filter((m) => {
      const matchesQuery =
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeFilter === 'all' || m.category === activeFilter;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeFilter]);

  async function toggleSave(machine: Machine) {
    if (isMachineSaved(machine.id)) {
      await removeSavedMachine(machine.id);
    } else {
      await saveMachine(machine.id);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filtered}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.page}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Discover Machines</Text>
            <Text style={styles.subtitle}>Browse all machines. Save any to your profile.</Text>

            {/* Search bar */}
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder="Search machines..."
                placeholderTextColor={Colors.textDisabled}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery('')}>
                  <Text style={styles.clearBtn}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Filters */}
            <View style={styles.filters}>
              {FILTERS.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.chip, activeFilter === f && styles.chipActive]}
                  onPress={() => setActiveFilter(f)}
                >
                  <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>
                    {f !== 'all' ? `${CATEGORY_ICONS[f]}  ` : ''}{f === 'all' ? 'All' : CATEGORY_LABELS[f]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        renderItem={({ item }) => {
          const saved = isMachineSaved(item.id);
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('MachineDetail', { machineId: item.id })}
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
              <TouchableOpacity
                style={[styles.saveBtn, saved && styles.saveBtnActive]}
                onPress={() => toggleSave(item)}
              >
                <Text style={[styles.saveBtnText, saved && styles.saveBtnTextActive]}>
                  {saved ? 'Saved' : 'Save'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No machines found</Text>
            <Text style={styles.emptySub}>Try a different search term</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  page: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },

  title: { ...Typography.h1, color: Colors.textPrimary },
  subtitle: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 4, marginBottom: Spacing.md },

  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.md, height: 48,
    marginBottom: Spacing.md,
  },
  searchIcon: { fontSize: 16, marginRight: Spacing.sm },
  searchInput: { flex: 1, ...Typography.body, color: Colors.textPrimary },
  clearBtn: { fontSize: 16, color: Colors.textSecondary, padding: Spacing.xs },

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

  saveBtn: {
    paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border, marginLeft: Spacing.sm,
  },
  saveBtnActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  saveBtnText: { ...Typography.label, color: Colors.textSecondary },
  saveBtnTextActive: { color: Colors.primary },

  empty: { alignItems: 'center', marginTop: Spacing.xxl },
  emptyTitle: { ...Typography.h4, color: Colors.textSecondary },
  emptySub: { ...Typography.bodySmall, color: Colors.textDisabled, marginTop: Spacing.xs },
});
