import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, SafeAreaView,
} from 'react-native';
import { alert } from '../utils/alert';
import { useUserData } from '../contexts/UserDataContext';
import { Goal } from '../data/types';
import { useTheme, Typography, Spacing, BorderRadius, PageContainer } from '../theme';
import type { ThemeColors } from '../theme';

function GoalItem({
  goal,
  onToggle,
  onDelete,
  C,
}: {
  goal: Goal;
  onToggle: () => void;
  onDelete: () => void;
  C: ThemeColors;
}) {
  const styles = React.useMemo(() => StyleSheet.create({
    goalCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: C.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      borderWidth: 1,
      borderColor: C.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 2,
    },
    goalCardDone: { opacity: 0.6 },
    checkbox: { marginRight: Spacing.md },
    checkboxInner: {
      width: 26,
      height: 26,
      borderRadius: 13,
      borderWidth: 2,
      borderColor: C.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxChecked: {
      backgroundColor: C.accent,
      borderColor: C.accent,
    },
    checkmark: { color: '#fff', fontSize: 14, fontWeight: '700' },
    goalTitle: { ...Typography.body, color: C.textPrimary, flex: 1 },
    goalTitleDone: { textDecorationLine: 'line-through', color: C.textSecondary },
    deleteBtn: { padding: Spacing.xs, marginLeft: Spacing.sm },
    deleteIcon: { fontSize: 14, color: C.textDisabled },
  }), [C]);

  return (
    <View style={[styles.goalCard, goal.completed && styles.goalCardDone]}>
      <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
        <View style={[styles.checkboxInner, goal.completed && styles.checkboxChecked]}>
          {goal.completed && <Text style={styles.checkmark}>{'\u2713'}</Text>}
        </View>
      </TouchableOpacity>

      <Text
        style={[styles.goalTitle, goal.completed && styles.goalTitleDone]}
        numberOfLines={2}
      >
        {goal.title}
      </Text>

      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteIcon}>{'\u2715'}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function GoalsScreen() {
  const { colors: C } = useTheme();
  const { goals, addGoal, toggleGoal, deleteGoal } = useUserData();
  const [text, setText] = useState('');

  const pending = goals.filter((g) => !g.completed);
  const done = goals.filter((g) => g.completed);

  async function handleAdd() {
    const trimmed = text.trim();
    if (!trimmed) return;
    await addGoal(trimmed);
    setText('');
  }

  function handleDelete(goal: Goal) {
    alert('Delete goal?', `"${goal.title}"`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteGoal(goal.id) },
    ]);
  }

  const styles = React.useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    header: {
      ...PageContainer,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.md,
    },
    title: { ...Typography.h2, color: C.textPrimary },
    subtitle: { ...Typography.bodySmall, color: C.textSecondary, marginTop: 4 },
    addRow: {
      ...PageContainer,
      flexDirection: 'row',
      paddingHorizontal: Spacing.md,
      marginBottom: Spacing.md,
      gap: Spacing.sm,
    },
    input: {
      flex: 1,
      backgroundColor: C.surface,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      height: 52,
      ...Typography.body,
      color: C.textPrimary,
    },
    addBtn: {
      backgroundColor: C.primary,
      borderRadius: 12,
      paddingHorizontal: Spacing.md,
      justifyContent: 'center',
      height: 52,
      shadowColor: C.glow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 6,
    },
    addBtnDisabled: { opacity: 0.4 },
    addBtnText: { ...Typography.button, color: C.textOnPrimary },
    list: { ...PageContainer, paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxl },
    sectionLabel: {
      ...Typography.label,
      color: C.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginTop: Spacing.md,
      marginBottom: Spacing.sm,
    },
    empty: { alignItems: 'center', marginTop: Spacing.xxl },
    emptyEmoji: { fontSize: 48, marginBottom: Spacing.md },
    emptyText: { ...Typography.h3, color: C.textPrimary, marginBottom: Spacing.sm },
    emptySubtext: { ...Typography.body, color: C.textSecondary, textAlign: 'center', maxWidth: 280 },
  }), [C]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Goals</Text>
        <Text style={styles.subtitle}>Set goals, track your progress.</Text>
      </View>

      {/* Add goal */}
      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a goal \u2014 e.g. Squat 80 kg"
          placeholderTextColor={C.textDisabled}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.addBtn, !text.trim() && styles.addBtnDisabled]}
          onPress={handleAdd}
          disabled={!text.trim()}
        >
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...(pending.length > 0 ? [{ type: 'section', label: `Active (${pending.length})` }] : []),
               ...pending.map((g) => ({ type: 'goal', goal: g })),
               ...(done.length > 0 ? [{ type: 'section', label: `Completed (${done.length})` }] : []),
               ...done.map((g) => ({ type: 'goal', goal: g }))]}
        keyExtractor={(item, i) =>
          item.type === 'section' ? `section-${i}` : (item as any).goal.id
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>{'\u{1F3AF}'}</Text>
            <Text style={styles.emptyText}>No goals yet</Text>
            <Text style={styles.emptySubtext}>
              Add your first goal above {'\u2014'} big or small, any goal counts.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          if (item.type === 'section') {
            return <Text style={styles.sectionLabel}>{(item as any).label}</Text>;
          }
          const goal = (item as any).goal as Goal;
          return (
            <GoalItem
              goal={goal}
              onToggle={() => toggleGoal(goal.id)}
              onDelete={() => handleDelete(goal)}
              C={C}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
