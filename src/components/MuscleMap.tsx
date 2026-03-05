import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Ellipse, Path, G } from 'react-native-svg';
import { MuscleGroup } from '../data/types';
import { Colors } from '../theme';

interface Props {
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
}

/** Returns fill colour for a given muscle group */
function getMuscleColor(
  muscle: MuscleGroup,
  primary: MuscleGroup[],
  secondary: MuscleGroup[],
): string {
  if (primary.includes(muscle)) return Colors.muscleActive;
  if (secondary.includes(muscle)) return Colors.muscleSecondary;
  return Colors.muscleInactive;
}

/**
 * Simple front-of-body schematic built with basic SVG shapes.
 * Each shape represents a muscle region. Real production would use detailed
 * SVG anatomy art, but this gives clear, functional feedback.
 */
export default function MuscleMap({ primaryMuscles, secondaryMuscles }: Props) {
  const c = (muscle: MuscleGroup) =>
    getMuscleColor(muscle, primaryMuscles, secondaryMuscles);

  return (
    <View style={styles.container}>
      <Svg width={220} height={400} viewBox="0 0 220 400">
        <G>
          {/* ── Head ── */}
          <Ellipse cx={110} cy={28} rx={24} ry={28} fill="#D1D5DB" />

          {/* ── Neck ── */}
          <Path d="M98 52 L122 52 L118 72 L102 72 Z" fill="#D1D5DB" />

          {/* ── Shoulders ── */}
          <Ellipse cx={70} cy={80} rx={22} ry={14} fill={c('shoulders')} />
          <Ellipse cx={150} cy={80} rx={22} ry={14} fill={c('shoulders')} />

          {/* ── Chest ── */}
          <Path
            d="M88 72 C88 72 74 80 74 100 L110 108 L146 100 C146 80 132 72 132 72 Z"
            fill={c('chest')}
          />

          {/* ── Biceps (upper arms front) ── */}
          <Path d="M50 90 C42 90 38 110 40 128 L58 122 C60 108 56 94 50 90 Z" fill={c('biceps')} />
          <Path d="M170 90 C178 90 182 110 180 128 L162 122 C160 108 164 94 170 90 Z" fill={c('biceps')} />

          {/* ── Forearms ── */}
          <Path d="M42 130 C38 148 40 170 44 180 L56 174 C54 160 52 142 58 124 Z" fill={c('forearms')} />
          <Path d="M178 130 C182 148 180 170 176 180 L164 174 C166 160 168 142 162 124 Z" fill={c('forearms')} />

          {/* ── Core / Abs ── */}
          {/* Upper abs */}
          <Path d="M92 108 L110 112 L128 108 L128 128 L110 132 L92 128 Z" fill={c('core')} />
          {/* Lower abs */}
          <Path d="M92 130 L110 134 L128 130 L126 154 L110 158 L94 154 Z" fill={c('core')} />

          {/* ── Obliques implied by torso shape ── */}
          <Path d="M74 100 L90 126 L90 154 L80 168 L70 140 Z" fill={c('core')} opacity={0.7} />
          <Path d="M146 100 L130 126 L130 154 L140 168 L150 140 Z" fill={c('core')} opacity={0.7} />

          {/* ── Hip / waist ── */}
          <Path d="M86 156 L110 162 L134 156 L138 178 L110 182 L82 178 Z" fill="#D1D5DB" />

          {/* ── Glutes implied from front ── */}
          <Path d="M82 178 L110 184 L138 178 L142 200 L110 206 L78 200 Z" fill={c('glutes')} />

          {/* ── Quads ── */}
          <Path d="M80 202 C76 220 74 248 78 268 L98 268 C100 248 100 220 100 202 Z" fill={c('quads')} />
          <Path d="M120 202 C120 220 120 248 122 268 L142 268 C146 248 144 220 140 202 Z" fill={c('quads')} />

          {/* ── Knees ── */}
          <Ellipse cx={88} cy={274} rx={16} ry={10} fill="#D1D5DB" />
          <Ellipse cx={132} cy={274} rx={16} ry={10} fill="#D1D5DB" />

          {/* ── Calves ── */}
          <Path d="M74 282 C72 306 76 330 80 344 L96 344 C100 330 104 306 100 282 Z" fill={c('calves')} />
          <Path d="M120 282 C116 306 120 330 124 344 L140 344 C144 330 148 306 146 282 Z" fill={c('calves')} />

          {/* ── Feet ── */}
          <Ellipse cx={86} cy={352} rx={18} ry={8} fill="#D1D5DB" />
          <Ellipse cx={134} cy={352} rx={18} ry={8} fill="#D1D5DB" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 8,
  },
});
