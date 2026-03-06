import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polyline, Circle, Line, Text as SvgText } from 'react-native-svg';
import { WorkoutLog } from '../data/types';
import { useTheme, Typography, Spacing, BorderRadius } from '../theme';

interface Props {
  logs: WorkoutLog[]; // oldest first
  metric: 'weight' | 'reps';
}

function maxMetric(log: WorkoutLog, metric: 'weight' | 'reps'): number | null {
  const vals = log.sets.map((s) => (metric === 'weight' ? s.weight : s.reps)).filter((v): v is number => v !== undefined);
  return vals.length > 0 ? Math.max(...vals) : null;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

const W = 320;
const H = 160;
const PAD = { top: 16, right: 16, bottom: 36, left: 40 };
const CHART_W = W - PAD.left - PAD.right;
const CHART_H = H - PAD.top - PAD.bottom;

export default function ProgressChart({ logs, metric }: Props) {
  const { colors: C } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: C.surface,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
          borderWidth: 1,
          borderColor: C.border,
          marginBottom: Spacing.lg,
        },
        badgeRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
          marginBottom: Spacing.sm,
        },
        badge: {
          paddingVertical: 4,
          paddingHorizontal: Spacing.sm,
          borderRadius: BorderRadius.full,
        },
        badgeGood: { backgroundColor: C.accentLight },
        badgeSame: { backgroundColor: C.surfaceAlt },
        badgeText: { ...Typography.caption, fontWeight: '700', color: C.accent },
        badgeLabel: { ...Typography.caption, color: C.textSecondary },
        axisLabel: {
          ...Typography.caption,
          color: C.textSecondary,
          textAlign: 'center',
          marginTop: 4,
        },
        placeholder: {
          backgroundColor: C.surfaceAlt,
          borderRadius: BorderRadius.md,
          padding: Spacing.lg,
          alignItems: 'center',
          marginBottom: Spacing.lg,
        },
        placeholderText: {
          ...Typography.bodySmall,
          color: C.textSecondary,
          textAlign: 'center',
        },
      }),
    [C],
  );

  // Only use logs that have data for this metric
  const points = logs
    .map((log) => ({ value: maxMetric(log, metric), date: log.date }))
    .filter((p): p is { value: number; date: string } => p.value !== null);

  if (points.length < 2) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          Log at least 2 sessions to see your progress chart.
        </Text>
      </View>
    );
  }

  const values = points.map((p) => p.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const valRange = maxVal - minVal || 1;

  const toX = (i: number) => PAD.left + (i / (points.length - 1)) * CHART_W;
  const toY = (v: number) => PAD.top + CHART_H - ((v - minVal) / valRange) * CHART_H;

  const polylinePoints = points.map((p, i) => `${toX(i)},${toY(p.value)}`).join(' ');

  // Pick label indices to avoid crowding
  const labelIndices = points.length <= 5
    ? points.map((_, i) => i)
    : [0, Math.floor(points.length / 2), points.length - 1];

  const hasImproved = points[points.length - 1].value > points[0].value;
  const delta = points[points.length - 1].value - points[0].value;

  return (
    <View style={styles.container}>
      {/* Improvement badge */}
      <View style={styles.badgeRow}>
        <View style={[styles.badge, hasImproved ? styles.badgeGood : styles.badgeSame]}>
          <Text style={styles.badgeText}>
            {delta > 0 ? `+${delta.toFixed(1)} ${metric === 'weight' ? 'kg' : 'reps'}` : delta === 0 ? 'Maintaining' : `${delta.toFixed(1)}`}
          </Text>
        </View>
        <Text style={styles.badgeLabel}>since first session</Text>
      </View>

      <Svg width={W} height={H}>
        {/* Y axis gridlines */}
        {[0, 0.5, 1].map((frac) => {
          const y = PAD.top + CHART_H * (1 - frac);
          const label = (minVal + frac * valRange).toFixed(frac === 0 ? 0 : 1);
          return (
            <React.Fragment key={frac}>
              <Line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke={C.border} strokeWidth={1} strokeDasharray="4,4" />
              <SvgText x={PAD.left - 4} y={y + 4} fontSize={10} fill={C.textSecondary} textAnchor="end">{label}</SvgText>
            </React.Fragment>
          );
        })}

        {/* Line */}
        <Polyline points={polylinePoints} fill="none" stroke={C.primary} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {/* Dots */}
        {points.map((p, i) => (
          <Circle key={i} cx={toX(i)} cy={toY(p.value)} r={4} fill={C.primary} />
        ))}

        {/* X axis labels */}
        {labelIndices.map((i) => (
          <SvgText key={i} x={toX(i)} y={H - 4} fontSize={10} fill={C.textSecondary} textAnchor="middle">
            {formatDate(points[i].date)}
          </SvgText>
        ))}
      </Svg>

      <Text style={styles.axisLabel}>{metric === 'weight' ? 'Max weight (kg)' : 'Max reps'}</Text>
    </View>
  );
}
