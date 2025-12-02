import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing, BorderRadius } from '../constants/Typography';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface LessonCompleteProps {
  score: number;
  totalQuestions: number;
  xpEarned: number;
  onContinue: () => void;
  hasCultureCapsule?: boolean;
}

export const LessonComplete: React.FC<LessonCompleteProps> = ({
  score,
  totalQuestions,
  xpEarned,
  onContinue,
  hasCultureCapsule = true,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));
  const [xpCountAnim] = useState(new Animated.Value(0));
  const [showCapsuleUnlock, setShowCapsuleUnlock] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfect = percentage === 100;
  const isGood = percentage >= 70;

  useEffect(() => {
    // Entrance animations
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(xpCountAnim, {
        toValue: xpEarned,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();

    // Show culture capsule unlock after delay
    if (hasCultureCapsule) {
      const timer = setTimeout(() => setShowCapsuleUnlock(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const getEmoji = () => {
    if (isPerfect) return '🎉';
    if (isGood) return '⭐';
    return '💪';
  };

  const getMessage = () => {
    if (isPerfect) return 'Perfect!';
    if (isGood) return 'Great job!';
    return 'Keep practicing!';
  };

  const getSubMessage = () => {
    if (isPerfect) return 'You nailed every question!';
    if (isGood) return 'You\'re making great progress!';
    return 'Practice makes perfect!';
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      {/* Celebration Emoji */}
      <Animated.View
        style={[
          styles.emojiContainer,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.emoji}>{getEmoji()}</Text>
      </Animated.View>

      {/* Message */}
      <Text style={styles.title}>{getMessage()}</Text>
      <Text style={styles.subtitle}>{getSubMessage()}</Text>

      {/* Score Card */}
      <View style={styles.scoreCard}>
        <View style={styles.scoreRow}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.scoreValue}>
              {score}/{totalQuestions}
            </Text>
          </View>
          <View style={styles.scoreDivider} />
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Accuracy</Text>
            <Text style={[styles.scoreValue, { color: isGood ? Colors.success : Colors.error }]}>
              {percentage}%
            </Text>
          </View>
        </View>
        
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>Lesson Progress</Text>
          <ProgressBar progress={percentage / 100} height={12} />
        </View>
      </View>

      {/* XP Earned */}
      <View style={styles.xpContainer}>
        <View style={styles.xpBadge}>
          <Text style={styles.xpIcon}>⭐</Text>
          <Text style={styles.xpValue}>+{xpEarned} XP</Text>
        </View>
      </View>

      {/* Culture Capsule Unlock */}
      {hasCultureCapsule && showCapsuleUnlock && (
        <Animated.View style={styles.capsuleUnlock}>
          <View style={styles.capsuleUnlockContent}>
            <Text style={styles.capsuleEmoji}>🎭</Text>
            <View style={styles.capsuleTextContainer}>
              <Text style={styles.capsuleUnlockTitle}>Culture Capsule Unlocked!</Text>
              <Text style={styles.capsuleUnlockSubtitle}>
                Learn a fun cultural fact about Spanish
              </Text>
            </View>
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={hasCultureCapsule ? "View Culture Capsule 🎭" : "Continue"}
          onPress={onContinue}
          variant="primary"
          size="large"
          fullWidth
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    fontSize: Typography.xxxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  scoreCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: Spacing.lg,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  scoreLabel: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  scoreValue: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  progressSection: {
    marginTop: Spacing.sm,
  },
  progressLabel: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  xpContainer: {
    marginBottom: Spacing.lg,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.xp + '20',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.xp,
  },
  xpIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  xpValue: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.xp,
  },
  capsuleUnlock: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  capsuleUnlockContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0E6FF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: '#9B59B6',
    borderStyle: 'dashed',
  },
  capsuleEmoji: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  capsuleTextContainer: {
    flex: 1,
  },
  capsuleUnlockTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: '#9B59B6',
  },
  capsuleUnlockSubtitle: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  newBadge: {
    backgroundColor: '#9B59B6',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  newBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.white,
  },
  buttonContainer: {
    width: '100%',
    marginTop: Spacing.md,
  },
});

