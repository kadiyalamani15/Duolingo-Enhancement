import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing, BorderRadius } from '../constants/Typography';
import { Button } from './Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface CultureCapsuleData {
  id: string;
  title: string;
  emoji: string;
  category: 'slang' | 'etiquette' | 'gesture' | 'dialect' | 'tradition';
  country: string;
  countryFlag: string;
  content: string;
  example?: {
    phrase: string;
    translation: string;
    context: string;
  };
  funFact?: string;
  tipEmoji: string;
}

interface CultureCapsuleProps {
  capsule: CultureCapsuleData;
  onComplete: () => void;
  xpEarned?: number;
}

export const CultureCapsule: React.FC<CultureCapsuleProps> = ({
  capsule,
  onComplete,
  xpEarned = 5,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Show tip after a delay
    const timer = setTimeout(() => setShowTip(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const getCategoryColor = () => {
    switch (capsule.category) {
      case 'slang':
        return '#FF6B6B';
      case 'etiquette':
        return '#4ECDC4';
      case 'gesture':
        return '#FFE66D';
      case 'dialect':
        return '#95E1D3';
      case 'tradition':
        return '#DDA0DD';
      default:
        return Colors.secondary;
    }
  };

  const getCategoryLabel = () => {
    switch (capsule.category) {
      case 'slang':
        return '🗣️ Slang';
      case 'etiquette':
        return '🎩 Etiquette';
      case 'gesture':
        return '👋 Gesture';
      case 'dialect':
        return '🗺️ Dialect';
      case 'tradition':
        return '🎭 Tradition';
      default:
        return '📚 Culture';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Header Badge */}
      <View style={styles.headerBadge}>
        <Text style={styles.headerBadgeText}>🎭 CULTURE CAPSULE</Text>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{xpEarned} XP</Text>
        </View>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        {/* Country & Category */}
        <View style={styles.topRow}>
          <View style={styles.countryBadge}>
            <Text style={styles.countryFlag}>{capsule.countryFlag}</Text>
            <Text style={styles.countryName}>{capsule.country}</Text>
          </View>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor() + '30' }]}>
            <Text style={[styles.categoryText, { color: getCategoryColor() }]}>
              {getCategoryLabel()}
            </Text>
          </View>
        </View>

        {/* Main Emoji */}
        <View style={styles.emojiContainer}>
          <Text style={styles.mainEmoji}>{capsule.emoji}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{capsule.title}</Text>

        {/* Content */}
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.content}>{capsule.content}</Text>

          {/* Example Section */}
          {capsule.example && (
            <View style={styles.exampleContainer}>
              <View style={styles.exampleHeader}>
                <Text style={styles.exampleHeaderText}>💬 Real Example</Text>
              </View>
              <View style={styles.exampleContent}>
                <Text style={styles.examplePhrase}>"{capsule.example.phrase}"</Text>
                <Text style={styles.exampleTranslation}>{capsule.example.translation}</Text>
                <View style={styles.contextBubble}>
                  <Text style={styles.contextText}>📍 {capsule.example.context}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Fun Fact */}
          {capsule.funFact && showTip && (
            <Animated.View style={styles.funFactContainer}>
              <Text style={styles.funFactEmoji}>{capsule.tipEmoji}</Text>
              <Text style={styles.funFactText}>{capsule.funFact}</Text>
            </Animated.View>
          )}
        </ScrollView>
      </View>

      {/* Bottom Action */}
      <View style={styles.bottomSection}>
        <View style={styles.progressDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <Button
          title="Got it! 🎉"
          onPress={onComplete}
          variant="primary"
          size="large"
          fullWidth
        />
        <Text style={styles.skipText}>Swipe up for more capsules</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.base,
  },
  headerBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerBadgeText: {
    fontSize: Typography.sm,
    fontWeight: '700' as const,
    color: '#FFD700',
    letterSpacing: 2,
  },
  xpBadge: {
    backgroundColor: Colors.xp + '30',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  xpText: {
    fontSize: Typography.sm,
    fontWeight: '700' as const,
    color: Colors.xp,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  countryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGray,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  countryFlag: {
    fontSize: 20,
    marginRight: Spacing.xs,
  },
  countryName: {
    fontSize: Typography.sm,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  categoryText: {
    fontSize: Typography.xs,
    fontWeight: '700' as const,
  },
  emojiContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  mainEmoji: {
    fontSize: 80,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 32,
  },
  contentScroll: {
    flex: 1,
  },
  content: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  exampleContainer: {
    backgroundColor: Colors.primary + '10',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  exampleHeader: {
    backgroundColor: Colors.primary + '20',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  exampleHeaderText: {
    fontSize: Typography.sm,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  exampleContent: {
    padding: Spacing.md,
  },
  examplePhrase: {
    fontSize: Typography.xl,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  exampleTranslation: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  contextBubble: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignSelf: 'center',
  },
  contextText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  funFactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.xp,
  },
  funFactEmoji: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  funFactText: {
    flex: 1,
    fontSize: Typography.sm,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  bottomSection: {
    paddingTop: Spacing.lg,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  skipText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: Typography.xs,
    marginTop: Spacing.md,
  },
});

