import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView,
} from 'react-native';
import { alert } from '../utils/alert';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExploreStackParamList } from '../navigation/types';
import { useUserData } from '../contexts/UserDataContext';
import { WorkoutSet } from '../data/types';
import { useTheme, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ExploreStackParamList, 'LogWorkout'>;

interface SetRow {
  weight: string;
  reps: string;
}

export default function LogWorkoutScreen({ route, navigation }: Props) {
  const { colors: C } = useTheme();
  const { exerciseId, exerciseName, machineName } = route.params;
  const { logWorkout } = useUserData();

  const [sets, setSets] = useState<SetRow[]>([{ weight: '', reps: '' }]);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  function addSet() {
    const last = sets[sets.length - 1];
    setSets([...sets, { weight: last.weight, reps: last.reps }]);
  }

  function removeSet(index: number) {
    if (sets.length === 1) return;
    setSets(sets.filter((_, i) => i !== index));
  }

  function updateSet(index: number, field: 'weight' | 'reps', value: string) {
    setSets(sets.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  async function handleSave() {
    const hasData = sets.some((s) => s.weight || s.reps);
    if (!hasData) {
      alert('Add some data', 'Please enter at least weight or reps for one set.');
      return;
    }
    setSaving(true);
    const workoutSets: WorkoutSet[] = sets.map((s) => ({
      weight: s.weight ? parseFloat(s.weight) : undefined,
      reps: s.reps ? parseInt(s.reps, 10) : undefined,
    }));
    await logWorkout({ exerciseId, exerciseName, machineName, sets: workoutSets, notes: notes.trim() || undefined });
    setSaving(false);
    navigation.goBack();
  }

  const styles = React.useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    scroll: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },
    exerciseInfo: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.lg,
      borderWidth: 1,
      borderColor: C.border,
    },
    machineName: { ...Typography.caption, color: C.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
    exerciseName: { ...Typography.h3, color: C.textPrimary, marginTop: 4, marginBottom: 4 },
    dateLabel: { ...Typography.bodySmall, color: C.accent },
    setsSection: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: C.border,
    },
    setsHeader: { marginBottom: Spacing.sm },
    setsTitle: { ...Typography.h4, color: C.textPrimary, marginBottom: Spacing.sm },
    columnHeaders: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 2 },
    colHeader: { ...Typography.caption, color: C.textSecondary, textTransform: 'uppercase', flex: 1 },
    setRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.sm,
      gap: Spacing.sm,
    },
    setNumber: {
      ...Typography.label,
      color: C.textSecondary,
      width: 24,
      textAlign: 'center',
    },
    setInput: {
      flex: 1,
      height: 44,
      backgroundColor: C.background,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: BorderRadius.sm,
      textAlign: 'center',
      ...Typography.body,
      color: C.textPrimary,
      fontWeight: '600',
    },
    removeSetBtn: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeSetIcon: { fontSize: 20, color: C.error },
    addSetBtn: {
      alignItems: 'center',
      paddingVertical: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: C.border,
      marginTop: Spacing.xs,
    },
    addSetText: { ...Typography.label, color: C.primary },
    notesSection: { marginBottom: Spacing.lg },
    notesLabel: { ...Typography.label, color: C.textSecondary, marginBottom: Spacing.xs },
    notesInput: {
      backgroundColor: C.surface,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      ...Typography.body,
      color: C.textPrimary,
      minHeight: 80,
      textAlignVertical: 'top',
    },
    saveBtn: {
      backgroundColor: C.primary,
      borderRadius: 12,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: C.glow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 6,
    },
    saveBtnDisabled: { opacity: 0.6 },
    saveBtnText: { ...Typography.button, color: C.textOnPrimary },
  }), [C]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Exercise info */}
        <View style={styles.exerciseInfo}>
          <Text style={styles.machineName}>{machineName}</Text>
          <Text style={styles.exerciseName}>{exerciseName}</Text>
          <Text style={styles.dateLabel}>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
        </View>

        {/* Sets */}
        <View style={styles.setsSection}>
          <View style={styles.setsHeader}>
            <Text style={styles.setsTitle}>Sets</Text>
            <View style={styles.columnHeaders}>
              <Text style={[styles.colHeader, { flex: 0.3 }]}>#</Text>
              <Text style={[styles.colHeader, { flex: 1 }]}>kg</Text>
              <Text style={[styles.colHeader, { flex: 1 }]}>Reps</Text>
              <View style={{ width: 32 }} />
            </View>
          </View>

          {sets.map((set, i) => (
            <View key={i} style={styles.setRow}>
              <Text style={styles.setNumber}>{i + 1}</Text>
              <TextInput
                style={styles.setInput}
                value={set.weight}
                onChangeText={(v) => updateSet(i, 'weight', v)}
                placeholder="0"
                placeholderTextColor={C.textDisabled}
                keyboardType="decimal-pad"
              />
              <TextInput
                style={styles.setInput}
                value={set.reps}
                onChangeText={(v) => updateSet(i, 'reps', v)}
                placeholder="0"
                placeholderTextColor={C.textDisabled}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={styles.removeSetBtn}
                onPress={() => removeSet(i)}
                disabled={sets.length === 1}
              >
                <Text style={[styles.removeSetIcon, sets.length === 1 && { opacity: 0.2 }]}>{'\u2212'}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.addSetBtn} onPress={addSet}>
            <Text style={styles.addSetText}>{'\uFF0B'} Add set</Text>
          </TouchableOpacity>
        </View>

        {/* Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.notesLabel}>Notes (optional)</Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="e.g. Felt strong today, increased weight from last time"
            placeholderTextColor={C.textDisabled}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Save */}
        <TouchableOpacity
          style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveBtnText}>{saving ? 'Saving\u2026' : 'Save workout'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
