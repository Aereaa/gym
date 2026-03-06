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
import { useTheme, ACCENTS, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<SearchStackParamList, 'MachineSearch'>;

const CATEGORY_ICONS: Record<string, string> = {
  cardio: '\u{1F3C3}', strength: '\u{1F4AA}', cable: '\u{1F517}', 'free-weights': '\u{1F3CB}\uFE0F', bodyweight: '\u{1F938}',
};
const CATEGORY_LABELS: Record<string, string> = {
  cardio: 'Cardio', strength: 'Strength', cable: 'Cable', 'free-weights': 'Free weights', bodyweight: 'Bodyweight',
};

type CategoryFilter = 'all' | Machine['category'];
const FILTERS: CategoryFilter[] = ['all', 'cardio', 'strength', 'cable', 'free-weights'];

export default function MachineSearchScreen({ navigation }: Props) {
  const { colors: C } = useTheme();
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

  const styles = React.useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    page: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },

    title: { ...Typography.h1, color: C.textPrimary },
    subtitle: { ...Typography.bodySmall, color: C.textSecondary, marginTop: 4, marginBottom: Spacing.md },

    searchBar: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.surface, borderRadius: BorderRadius.md,
      borderWidth: 1, borderColor: C.border, paddingHorizontal: Spacing.md, height: 48,
      marginBottom: Spacing.md,
    },
    searchIcon: { fontSize: 16, marginRight: Spacing.sm },
    searchInput: { flex: 1, ...Typography.body, color: C.textPrimary },
    clearBtn: { fontSize: 16, color: C.textSecondary, padding: Spacing.xs },

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
      shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04, shadowRadius: 3, elevation: 2,
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

    saveBtn: {
      paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.full, borderWidth: 1, borderColor: C.border, marginLeft: Spacing.sm,
    },
    saveBtnActive: { backgroundColor: C.primaryLight, borderColor: C.primary },
    saveBtnText: { ...Typography.label, color: C.textSecondary },
    saveBtnTextActive: { color: C.primary },

    empty: { alignItems: 'center', marginTop: Spacing.xxl },
    emptyTitle: { ...Typography.h4, color: C.textSecondary },
    emptySub: { ...Typography.bodySmall, color: C.textDisabled, marginTop: Spacing.xs },
  }), [C]);

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
              <Text style={styles.searchIcon}>{'\u{1F50D}'}</Text>
              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder="Search machines..."
                placeholderTextColor={C.textDisabled}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery('')}>
                  <Text style={styles.clearBtn}>{'\u2715'}</Text>
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
        renderItem={({ item, index }) => {
          const saved = isMachineSaved(item.id);
          const iconColors = [ACCENTS.coralLight, ACCENTS.tealLight, ACCENTS.purpleLight, ACCENTS.amberLight];
          const iconBg = C.isDark ? C.primaryLight : iconColors[index % iconColors.length];
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('MachineDetail', { machineId: item.id })}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
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
