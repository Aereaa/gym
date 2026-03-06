import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
} from 'react-native';
import { useTheme, ACCENTS, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

interface Section {
  icon: string;
  title: string;
  color: string;
  bgColor: string;
  items: string[];
}

const SECTIONS: Section[] = [
  {
    icon: '\u{1F392}',
    title: 'What to bring',
    color: ACCENTS.coral,
    bgColor: ACCENTS.coralLight,
    items: [
      'Comfortable workout clothes and trainers',
      'A water bottle (most gyms have fountains)',
      'A small towel to wipe machines after use',
      'A lock for the locker (some gyms provide them)',
      'Headphones if you like music while training',
    ],
  },
  {
    icon: '\u{1F6BD}',
    title: 'How the locker room works',
    color: ACCENTS.teal,
    bgColor: ACCENTS.tealLight,
    items: [
      'Find an empty locker and store your belongings',
      'Change into your workout clothes',
      'Keep valuables locked up \u2014 don\'t leave them on benches',
      'Showers and toilets are usually nearby',
      'Most gyms provide hair dryers',
    ],
  },
  {
    icon: '\u{1F91D}',
    title: 'Gym etiquette basics',
    color: ACCENTS.purple,
    bgColor: ACCENTS.purpleLight,
    items: [
      'Always wipe down machines after use',
      'Put weights back where you found them',
      'Don\'t hog a machine \u2014 let others work in between your sets',
      'Keep your phone calls short or take them outside',
      'It\'s OK to ask staff for help \u2014 that\'s what they\'re there for',
      'Everyone started as a beginner \u2014 no one is judging you',
    ],
  },
  {
    icon: '\u{1F3CB}\uFE0F',
    title: 'Your first workout (20 min)',
    color: ACCENTS.amber,
    bgColor: ACCENTS.amberLight,
    items: [
      '5 min warm-up: Stationary bike at easy pace',
      'Leg Press \u2014 2 sets of 12 reps (light weight)',
      'Chest Press Machine \u2014 2 sets of 12 reps (light weight)',
      'Lat Pulldown \u2014 2 sets of 10 reps (light weight)',
      'Treadmill \u2014 5 min walk at comfortable pace',
      'Don\'t worry about heavy weights \u2014 focus on learning the movements',
    ],
  },
  {
    icon: '\u{1F4A1}',
    title: 'Good to know',
    color: ACCENTS.green,
    bgColor: ACCENTS.greenLight,
    items: [
      'Feeling sore 1\u20132 days after is normal (DOMS)',
      'Rest at least 1 day between sessions when starting',
      'Results come with consistency \u2014 aim for 2\u20133 visits per week',
      'You don\'t need supplements \u2014 eat well and sleep enough',
      'Track your workouts to see progress over time',
    ],
  },
];

export default function FirstVisitGuideScreen() {
  const { colors: C } = useTheme();

  const styles = React.useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    scroll: { ...PageContainer, padding: Spacing.md, paddingBottom: Spacing.xxl },
    hero: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: C.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 2,
    },
    heroEmoji: { fontSize: 48, marginBottom: Spacing.sm },
    heroTitle: { ...Typography.h1, color: C.textPrimary, textAlign: 'center' },
    heroSub: { ...Typography.body, color: C.textSecondary, textAlign: 'center', marginTop: Spacing.xs, maxWidth: 300 },
    section: {
      backgroundColor: C.surface,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: C.border,
      marginBottom: Spacing.md,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 2,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.md,
    },
    sectionIconBox: {
      width: 40, height: 40, borderRadius: BorderRadius.sm,
      alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm,
    },
    sectionIcon: { fontSize: 20 },
    sectionTitle: { ...Typography.h3, color: C.textPrimary, flex: 1 },
    sectionBody: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md },
    item: {
      flexDirection: 'row',
      paddingVertical: Spacing.xs,
    },
    bullet: { ...Typography.body, color: C.primary, marginRight: Spacing.sm, lineHeight: 22 },
    itemText: { ...Typography.body, color: C.textPrimary, flex: 1, lineHeight: 22 },
    encouragement: {
      backgroundColor: ACCENTS.greenLight,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      alignItems: 'center',
      marginTop: Spacing.sm,
    },
    encourageEmoji: { fontSize: 32, marginBottom: Spacing.xs },
    encourageText: { ...Typography.h3, color: ACCENTS.green, textAlign: 'center' },
    encourageSub: { ...Typography.body, color: C.textSecondary, textAlign: 'center', marginTop: Spacing.xs },
  }), [C]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{'\u{1F3E0}'}</Text>
          <Text style={styles.heroTitle}>Your First Gym Visit</Text>
          <Text style={styles.heroSub}>
            Everything you need to know before stepping into the gym for the first time.
          </Text>
        </View>

        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBox, { backgroundColor: C.isDark ? C.primaryLight : section.bgColor }]}>
                <Text style={styles.sectionIcon}>{section.icon}</Text>
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.sectionBody}>
              {section.items.map((item, i) => (
                <View key={i} style={styles.item}>
                  <Text style={styles.bullet}>{'\u2022'}</Text>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={[styles.encouragement, C.isDark && { backgroundColor: 'rgba(16,185,129,0.15)' }]}>
          <Text style={styles.encourageEmoji}>{'\u{1F4AA}'}</Text>
          <Text style={[styles.encourageText, C.isDark && { color: ACCENTS.green }]}>
            You showed up — that's the hardest part!
          </Text>
          <Text style={styles.encourageSub}>
            Every expert was once a beginner. Be proud of yourself.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
