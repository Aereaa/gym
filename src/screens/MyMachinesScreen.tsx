import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/types';
import { machines } from '../data';
import { useUserData } from '../contexts/UserDataContext';
import { useTheme, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'MyMachines'>;

const CATEGORY_ICONS: Record<string, string> = {
  cardio: '\uD83C\uDFC3', strength: '\uD83D\uDCAA', cable: '\uD83D\uDD17', 'free-weights': '\uD83C\uDFCB\uFE0F', bodyweight: '\uD83E\uDD38',
};

export default function MyMachinesScreen({ navigation }: Props) {
  const { savedMachineIds, removeSavedMachine } = useUserData();
  const { colors: C } = useTheme();
  const saved = machines.filter((m) => savedMachineIds.includes(m.id));

  const styles = React.useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    list: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },
    card: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: C.border,
      overflow: 'hidden',
    },
    cardMain: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
    iconBox: {
      width: 52, height: 52, borderRadius: BorderRadius.sm,
      backgroundColor: C.primaryLight,
      alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
    },
    icon: { fontSize: 24 },
    info: { flex: 1 },
    name: { ...Typography.h4, color: C.textPrimary, marginBottom: 4 },
    meta: { ...Typography.bodySmall, color: C.accent, fontWeight: '600' },
    chevron: { fontSize: 20, color: C.textDisabled },
    unsaveBtn: {
      alignItems: 'center',
      paddingVertical: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: C.border,
    },
    unsaveBtnText: { ...Typography.label, color: C.error },
    empty: { alignItems: 'center', marginTop: Spacing.xxl },
    emptyEmoji: { fontSize: 48, marginBottom: Spacing.md },
    emptyText: { ...Typography.h3, color: C.textPrimary, marginBottom: Spacing.sm },
    emptySubtext: { ...Typography.body, color: C.textSecondary, textAlign: 'center', maxWidth: 280 },
  }), [C]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>{'\uD83D\uDCCC'}</Text>
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
              <Text style={styles.chevron}>{'\u203A'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.unsaveBtn}
              onPress={() => removeSavedMachine(item.id)}
            >
              <Text style={styles.unsaveBtnText}>{'\uD83D\uDDD1'} Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
