import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExploreStackParamList } from '../navigation/types';
import { machines, exercises } from '../data';
import { useTheme, Typography, Spacing, BorderRadius, PageContainer } from '../theme';
import ExerciseCard from '../components/ExerciseCard';
import SetupStepList from '../components/SetupStepList';
import EtiquetteList from '../components/EtiquetteList';

type Props = NativeStackScreenProps<ExploreStackParamList, 'MachineDetail'>;

type Tab = 'exercises' | 'setup' | 'etiquette';

export default function MachineDetailScreen({ route, navigation }: Props) {
  const { colors: C } = useTheme();
  const { machineId } = route.params;
  const machine = machines.find((m) => m.id === machineId);
  const [activeTab, setActiveTab] = useState<Tab>('exercises');

  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: C.background,
    },
    hero: {
      ...PageContainer,
      alignItems: 'center',
      padding: Spacing.lg,
      backgroundColor: C.surface,
      borderBottomWidth: 1,
      borderBottomColor: C.border,
    },
    heroIconBox: {
      width: 72,
      height: 72,
      borderRadius: BorderRadius.lg,
      backgroundColor: C.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.md,
    },
    heroIcon: {
      fontSize: 36,
    },
    machineName: {
      ...Typography.h2,
      color: C.textPrimary,
      textAlign: 'center',
      marginBottom: Spacing.sm,
    },
    machineDesc: {
      ...Typography.bodySmall,
      color: C.textSecondary,
      textAlign: 'center',
      maxWidth: 320,
    },
    tabBar: {
      ...PageContainer,
      flexDirection: 'row',
      backgroundColor: C.surface,
      borderBottomWidth: 1,
      borderBottomColor: C.border,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: Spacing.sm,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    tabActive: {
      borderBottomColor: C.primary,
    },
    tabIcon: {
      fontSize: 16,
      marginBottom: 2,
    },
    tabLabel: {
      ...Typography.caption,
      color: C.textSecondary,
      fontWeight: '500',
    },
    tabLabelActive: {
      color: C.primary,
      fontWeight: '700',
    },
    content: {
      ...PageContainer,
      padding: Spacing.md,
      paddingBottom: Spacing.xxl,
    },
    sectionHint: {
      ...Typography.bodySmall,
      color: C.textSecondary,
      marginBottom: Spacing.md,
    },
    errorText: {
      ...Typography.body,
      color: C.error,
      textAlign: 'center',
      marginTop: Spacing.xxl,
    },
  }), [C]);

  if (!machine) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Machine not found</Text>
      </SafeAreaView>
    );
  }

  const machineExercises = exercises.filter((e) =>
    machine.exerciseIds.includes(e.id),
  );

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'exercises', label: 'Exercises', icon: '\u{1F3CB}\uFE0F' },
    { key: 'setup', label: 'Setup', icon: '\u2699\uFE0F' },
    { key: 'etiquette', label: 'Etiquette', icon: '\u2705' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Machine hero */}
      <View style={styles.hero}>
        <View style={styles.heroIconBox}>
          <Text style={styles.heroIcon}>
            {machine.category === 'cardio' ? '\u{1F3C3}' : machine.category === 'cable' ? '\u{1F517}' : '\u{1F4AA}'}
          </Text>
        </View>
        <Text style={styles.machineName}>{machine.name}</Text>
        <Text style={styles.machineDesc}>{machine.description}</Text>
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab content */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'exercises' && (
          <View>
            <Text style={styles.sectionHint}>
              Tap an exercise to see step-by-step instructions.
            </Text>
            {machineExercises.map((ex) => (
              <ExerciseCard
                key={ex.id}
                exercise={ex}
                onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: ex.id })}
              />
            ))}
          </View>
        )}

        {activeTab === 'setup' && (
          <SetupStepList steps={machine.setupSteps} />
        )}

        {activeTab === 'etiquette' && (
          <EtiquetteList rules={machine.etiquetteRules} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
