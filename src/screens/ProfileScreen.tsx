import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>Member</Text>
          <Text style={styles.memberSince}>Member since 2024</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {[
            { label: 'Gyms visited', value: '1', icon: '🏟️' },
            { label: 'Machines tried', value: '3', icon: '💪' },
            { label: 'Exercises learned', value: '5', icon: '📚' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings list */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App settings</Text>
          {[
            { label: 'Language', value: 'English', icon: '🌐' },
            { label: 'Notifications', value: 'On', icon: '🔔' },
            { label: 'My gym', value: 'FitArena Praha', icon: '🏋️' },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.settingRow}>
              <Text style={styles.settingIcon}>{item.icon}</Text>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Text style={styles.settingValue}>{item.value}</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Confidence message */}
        <View style={styles.encouragement}>
          <Text style={styles.encouragementEmoji}>🌟</Text>
          <Text style={styles.encouragementText}>
            You're doing great. Every visit makes you more confident.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.h2,
    color: Colors.textPrimary,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontSize: 36,
  },
  userName: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  memberSince: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statIcon: {
    fontSize: 22,
    marginBottom: Spacing.xs,
  },
  statValue: {
    ...Typography.h3,
    color: Colors.primary,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  section: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.textSecondary,
    padding: Spacing.md,
    paddingBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingIcon: {
    fontSize: 18,
    marginRight: Spacing.md,
  },
  settingLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  settingValue: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginRight: Spacing.sm,
  },
  settingArrow: {
    fontSize: 18,
    color: Colors.textDisabled,
  },
  encouragement: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.md,
    marginTop: Spacing.xl,
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  encouragementEmoji: {
    fontSize: 24,
  },
  encouragementText: {
    ...Typography.bodySmall,
    color: Colors.accent,
    flex: 1,
    fontWeight: '500',
  },
});
