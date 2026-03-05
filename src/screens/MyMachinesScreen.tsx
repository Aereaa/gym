import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/types';
import { machines } from '../data';
import { useUserData } from '../contexts/UserDataContext';
import { Colors, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'MyMachines'>;

const CATEGORY_ICONS: Record<string, string> = {
  cardio: '🏃', strength: '💪', cable: '🔗', 'free-weights': '🏋️', bodyweight: '🤸',
};

export default function MyMachinesScreen({ navigation }: Props) {
  const { savedMachineIds, removeSavedMachine } = useUserData();
  const saved = machines.filter((m) => savedMachineIds.includes(m.id));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📌</Text>
            <Text style={styles.emptyText}>No saved machines</Text>
            <Text style={styles.emptySubtext}>
              Go to the Discover tab and tap "Save" on any machine to add it here.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardMain}
              onPress={() => navigation.navigate('MachineDetail', { machineId: item.id })}
              activeOpacity={0.7}
            >
              <View style={styles.iconBox}>
                <Text style={styles.icon}>{CATEGORY_ICONS[item.category]}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>{item.exerciseIds.length} exercise{item.exerciseIds.length !== 1 ? 's' : ''}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.unsaveBtn}
              onPress={() => removeSavedMachine(item.id)}
            >
              <Text style={styles.unsaveBtnText}>🗑 Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  cardMain: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  iconBox: {
    width: 52, height: 52, borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  icon: { fontSize: 24 },
  info: { flex: 1 },
  name: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 4 },
  meta: { ...Typography.bodySmall, color: Colors.accent, fontWeight: '600' },
  chevron: { fontSize: 20, color: Colors.textDisabled },
  unsaveBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  unsaveBtnText: { ...Typography.label, color: Colors.error },
  empty: { alignItems: 'center', marginTop: Spacing.xxl },
  emptyEmoji: { fontSize: 48, marginBottom: Spacing.md },
  emptyText: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.sm },
  emptySubtext: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', maxWidth: 280 },
});
