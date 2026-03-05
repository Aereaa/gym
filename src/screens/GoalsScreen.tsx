import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, SafeAreaView, Alert,
} from 'react-native';
import { useUserData } from '../contexts/UserDataContext';
import { Goal } from '../data/types';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

function GoalItem({
  goal,
  onToggle,
  onDelete,
}: {
  goal: Goal;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={[styles.goalCard, goal.completed && styles.goalCardDone]}>
      <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
        <View style={[styles.checkboxInner, goal.completed && styles.checkboxChecked]}>
          {goal.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <Text
        style={[styles.goalTitle, goal.completed && styles.goalTitleDone]}
        numberOfLines={2}
      >
        {goal.title}
      </Text>

      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function GoalsScreen() {
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
    Alert.alert('Delete goal?', `"${goal.title}"`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteGoal(goal.id) },
    ]);
  }

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
          placeholder="Add a goal — e.g. Squat 80 kg"
          placeholderTextColor={Colors.textDisabled}
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
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyText}>No goals yet</Text>
            <Text style={styles.emptySubtext}>
              Add your first goal above — big or small, any goal counts.
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
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: { ...Typography.h2, color: Colors.textPrimary },
  subtitle: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 4 },
  addRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 48,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  addBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
    height: 48,
  },
  addBtnDisabled: { opacity: 0.4 },
  addBtnText: { ...Typography.button, color: Colors.textOnPrimary },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxl },
  sectionLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  goalCardDone: { opacity: 0.6 },
  checkbox: { marginRight: Spacing.md },
  checkboxInner: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: '700' },
  goalTitle: { ...Typography.body, color: Colors.textPrimary, flex: 1 },
  goalTitleDone: { textDecorationLine: 'line-through', color: Colors.textSecondary },
  deleteBtn: { padding: Spacing.xs, marginLeft: Spacing.sm },
  deleteIcon: { fontSize: 14, color: Colors.textDisabled },
  empty: { alignItems: 'center', marginTop: Spacing.xxl },
  emptyEmoji: { fontSize: 48, marginBottom: Spacing.md },
  emptyText: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.sm },
  emptySubtext: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', maxWidth: 280 },
});
