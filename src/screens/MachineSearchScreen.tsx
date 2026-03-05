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
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

type Props = NativeStackScreenProps<SearchStackParamList, 'MachineSearch'>;

const CATEGORY_ICONS: Record<string, string> = {
  cardio: '🏃',
  strength: '💪',
  cable: '🔗',
  'free-weights': '🏋️',
  bodyweight: '🤸',
};

const CATEGORY_LABELS: Record<string, string> = {
  cardio: 'Cardio',
  strength: 'Strength',
  cable: 'Cable',
  'free-weights': 'Free weights',
  bodyweight: 'Bodyweight',
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Machines</Text>
        <Text style={styles.subtitle}>
          Browse all machines. Save any to your profile.
        </Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search machines…"
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

      {/* Category chips */}
      <FlatList
        data={FILTERS}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.chip, activeFilter === item && styles.chipActive]}
            onPress={() => setActiveFilter(item)}
          >
            <Text style={[styles.chipText, activeFilter === item && styles.chipTextActive]}>
              {item !== 'all' ? `${CATEGORY_ICONS[item]} ` : ''}{item === 'all' ? 'All' : CATEGORY_LABELS[item]}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        renderItem={({ item }) => {
          const saved = isMachineSaved(item.id);
          return (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.cardMain}
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
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveBtn, saved && styles.saveBtnActive]}
                onPress={() => toggleSave(item)}
              >
                <Text style={styles.saveIcon}>{saved ? '🔖' : '＋'}</Text>
                <Text style={[styles.saveBtnText, saved && styles.saveBtnTextActive]}>
                  {saved ? 'Saved' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No machines found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.lg, paddingBottom: Spacing.sm },
  title: { ...Typography.h2, color: Colors.textPrimary },
  subtitle: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 4 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  searchIcon: { fontSize: 16, marginRight: Spacing.sm },
  searchInput: { flex: 1, ...Typography.body, color: Colors.textPrimary },
  clearBtn: { fontSize: 16, color: Colors.textSecondary, padding: Spacing.xs },
  chips: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.sm, gap: Spacing.xs },
  chip: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.xs,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { ...Typography.label, color: Colors.textSecondary },
  chipTextActive: { color: Colors.textOnPrimary },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxl },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  cardMain: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  icon: { fontSize: 24 },
  cardInfo: { flex: 1 },
  machineName: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 2 },
  machineCategory: { ...Typography.caption, color: Colors.textSecondary, textTransform: 'uppercase', marginBottom: 4 },
  exerciseCount: { ...Typography.bodySmall, color: Colors.accent, fontWeight: '600' },
  chevron: { fontSize: 20, color: Colors.textDisabled },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.xs,
  },
  saveBtnActive: { backgroundColor: Colors.primaryLight },
  saveIcon: { fontSize: 16 },
  saveBtnText: { ...Typography.label, color: Colors.textSecondary },
  saveBtnTextActive: { color: Colors.primary },
  empty: { alignItems: 'center', marginTop: Spacing.xxl },
  emptyText: { ...Typography.h4, color: Colors.textSecondary },
  emptySubtext: { ...Typography.bodySmall, color: Colors.textDisabled, marginTop: Spacing.xs },
});
