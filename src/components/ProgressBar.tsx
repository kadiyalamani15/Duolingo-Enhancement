import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/Colors';
import { BorderRadius } from '../constants/Typography';

interface ProgressBarProps {
  progress: number; // 0-1
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 12,
  color = Colors.primary,
  backgroundColor = Colors.border,
}) => {
  const animatedWidth = new Animated.Value(progress);

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <Animated.View
        style={[
          styles.progress,
          {
            width: `${Math.min(Math.max(progress * 100, 0), 100)}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: BorderRadius.full,
  },
});

