import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography, BorderRadius, Spacing } from '../constants/Typography';

interface LessonNodeProps {
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent?: boolean;
  onPress: () => void;
}

export const LessonNode: React.FC<LessonNodeProps> = ({
  title,
  isCompleted,
  isLocked,
  isCurrent = false,
  onPress,
}) => {
  const getNodeColor = () => {
    if (isLocked) return Colors.lessonLocked;
    if (isCompleted) return Colors.lessonCompleted;
    return Colors.lessonCurrent;
  };

  const getNodeIcon = () => {
    if (isLocked) return '🔒';
    if (isCompleted) return '⭐';
    return '📚';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.node,
          { backgroundColor: getNodeColor() },
          isCurrent && styles.currentNode,
        ]}
        onPress={onPress}
        disabled={isLocked}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>{getNodeIcon()}</Text>
        {isCompleted && (
          <View style={styles.completeBadge}>
            <Text style={styles.completeBadgeText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  node: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  currentNode: {
    borderColor: Colors.primary,
    transform: [{ scale: 1.1 }],
  },
  icon: {
    fontSize: 32,
  },
  completeBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: Colors.success,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  completeBadgeText: {
    color: Colors.white,
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
  },
  title: {
    marginTop: Spacing.sm,
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 80,
  },
});

