import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
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

// Animated Emoji Component with bounce effect
const AnimatedEmoji: React.FC<{ emoji: string; delay?: number; size?: number }> = ({
  emoji,
  delay = 0,
  size = 80,
}) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(bounceAnim, {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [delay]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-10deg', '0deg'],
  });

  return (
    <Animated.View style={{ transform: [{ scale: bounceAnim }, { rotate }] }}>
      <Text style={{ fontSize: size }}>{emoji}</Text>
    </Animated.View>
  );
};

// Pulsing dot indicator
const PulsingDot: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.pulsingDot, { transform: [{ scale: pulseAnim }] }]} />
  );
};

// Speech bubble component for visual appeal
const SpeechBubble: React.FC<{ text: string; emoji?: string; variant?: 'primary' | 'secondary' }> = ({ 
  text, 
  emoji,
  variant = 'primary' 
}) => {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.speechBubble, 
        variant === 'secondary' && styles.speechBubbleSecondary,
        { transform: [{ translateY: slideAnim }], opacity: opacityAnim }
      ]}
    >
      {emoji && <Text style={styles.speechEmoji}>{emoji}</Text>}
      <Text style={[styles.speechText, variant === 'secondary' && styles.speechTextSecondary]}>
        {text}
      </Text>
      <View style={[styles.speechTail, variant === 'secondary' && styles.speechTailSecondary]} />
    </Animated.View>
  );
};

// Progress Bar Component
const StoryProgress: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  return (
    <View style={styles.progressContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressSegment,
            index < current && styles.progressSegmentFilled,
            index === current && styles.progressSegmentActive,
          ]}
        />
      ))}
    </View>
  );
};

// Floating Particles for celebration
const FloatingParticle: React.FC<{ emoji: string; delay: number }> = ({ emoji, delay }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const randomX = (Math.random() - 0.5) * 200;
    
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, tension: 100, friction: 5, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(translateY, { toValue: -150, duration: 1500, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: randomX, duration: 1500, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ]),
    ]).start();
  }, [delay]);

  return (
    <Animated.View
      style={[
        styles.particle,
        { opacity, transform: [{ translateY }, { translateX }, { scale }] },
      ]}
    >
      <Text style={styles.particleEmoji}>{emoji}</Text>
    </Animated.View>
  );
};

// Character illustration component
const CharacterIllustration: React.FC<{ type: 'speaking' | 'thinking' | 'celebrating' }> = ({ type }) => {
  const characters = {
    speaking: ['🧑‍🏫', '💬'],
    thinking: ['🤔', '💭'],
    celebrating: ['🎉', '🦉'],
  };
  
  return (
    <View style={styles.characterContainer}>
      <AnimatedEmoji emoji={characters[type][1]} size={40} delay={100} />
      <AnimatedEmoji emoji={characters[type][0]} size={60} delay={0} />
    </View>
  );
};

export const CultureCapsule: React.FC<CultureCapsuleProps> = ({
  capsule,
  onComplete,
  xpEarned = 5,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [phraseRevealed, setPhraseRevealed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  
  const totalSlides = 4;

  const animateSlideTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(cardOpacity, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 1, duration: 0, useNativeDriver: true }),
    ]).start(() => {
      callback();
      slideAnim.setValue(0);
      Animated.timing(cardOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  };

  const handleTap = () => {
    // On slide 2, if phrase not revealed, reveal it instead of moving forward
    if (currentSlide === 2 && !phraseRevealed) {
      setPhraseRevealed(true);
      return;
    }
    
    if (currentSlide < totalSlides - 1) {
      animateSlideTransition(() => {
        setCurrentSlide(currentSlide + 1);
        setPhraseRevealed(false);
      });
    } else {
      setShowCelebration(true);
    }
  };

  const getCategoryColor = () => {
    switch (capsule.category) {
      case 'slang': return '#FF6B6B';
      case 'etiquette': return '#4ECDC4';
      case 'gesture': return '#FFE66D';
      case 'dialect': return '#95E1D3';
      case 'tradition': return '#DDA0DD';
      default: return Colors.secondary;
    }
  };

  const getCategoryIcon = () => {
    switch (capsule.category) {
      case 'slang': return '🗣️';
      case 'etiquette': return '🎩';
      case 'gesture': return '👋';
      case 'dialect': return '🗺️';
      case 'tradition': return '🎭';
      default: return '📚';
    }
  };

  // Celebration Screen
  if (showCelebration) {
    const celebrationEmojis = ['🎉', '⭐', '🌟', '✨', '🎊', '💫', '🇪🇸', '🦉'];
    
    return (
      <View style={styles.celebrationContainer}>
        {celebrationEmojis.map((emoji, index) => (
          <FloatingParticle key={index} emoji={emoji} delay={index * 100} />
        ))}
        
        <View style={styles.trophyContainer}>
          <AnimatedEmoji emoji="🏆" size={100} />
        </View>
        
        <Text style={styles.celebrationTitle}>Culture Unlocked!</Text>
        <Text style={styles.celebrationSubtitle}>
          You learned about "{capsule.title}"
        </Text>
        
        <View style={styles.rewardRow}>
          <View style={styles.xpEarnedBadge}>
            <Text style={styles.xpEarnedIcon}>⭐</Text>
            <Text style={styles.xpEarnedText}>+{xpEarned} XP</Text>
          </View>
        </View>
        
        <View style={styles.completionCard}>
          <View style={styles.completionIcon}>
            <Text style={styles.completionEmoji}>{capsule.countryFlag}</Text>
          </View>
          <View style={styles.completionTextContainer}>
            <Text style={styles.completionTitle}>New Badge Earned!</Text>
            <Text style={styles.completionSubtitle}>Spanish Culture Explorer</Text>
          </View>
          <Text style={styles.checkEmoji}>✓</Text>
        </View>
        
        <Button
          title="Continue Learning 🚀"
          onPress={onComplete}
          variant="primary"
          size="large"
          fullWidth
          style={styles.continueButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onComplete} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <StoryProgress current={currentSlide} total={totalSlides} />
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{xpEarned}</Text>
          <Text style={styles.xpStar}>⭐</Text>
        </View>
      </View>

      {/* Main Card */}
      <Animated.View style={[styles.cardContainer, { opacity: cardOpacity }]}>
        <TouchableOpacity 
          activeOpacity={0.98} 
          onPress={handleTap}
          style={styles.cardTouchable}
        >
          <View style={styles.card}>
            <ScrollView 
              contentContainerStyle={styles.cardContent}
              showsVerticalScrollIndicator={false}
            >
              
              {/* Slide 0: Intro */}
              {currentSlide === 0 && (
                <View style={styles.slideWrapper}>
                  {/* Category Badge */}
                  <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor() + '25' }]}>
                    <Text style={[styles.categoryIcon]}>{getCategoryIcon()}</Text>
                    <Text style={[styles.categoryText, { color: getCategoryColor() }]}>
                      {capsule.category.toUpperCase()}
                    </Text>
                  </View>
                  
                  {/* Main Visual */}
                  <View style={styles.mainVisual}>
                    <View style={styles.emojiGlow}>
                      <AnimatedEmoji emoji={capsule.emoji} size={90} delay={200} />
                    </View>
                  </View>
                  
                  {/* Title */}
                  <Text style={styles.slideTitle}>{capsule.title}</Text>
                  
                  {/* Country Tag */}
                  <View style={styles.countryTag}>
                    <Text style={styles.countryFlag}>{capsule.countryFlag}</Text>
                    <Text style={styles.countryName}>{capsule.country}</Text>
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓</Text>
                    </View>
                  </View>
                  
                  {/* Visual decoration */}
                  <View style={styles.decorationRow}>
                    <Text style={styles.decorationEmoji}>🌍</Text>
                    <View style={styles.decorationLine} />
                    <Text style={styles.decorationEmoji}>📚</Text>
                    <View style={styles.decorationLine} />
                    <Text style={styles.decorationEmoji}>💡</Text>
                  </View>
                </View>
              )}

              {/* Slide 1: Main Content */}
              {currentSlide === 1 && (
                <View style={styles.slideWrapper}>
                  {/* Header with character */}
                  <View style={styles.contentHeaderRow}>
                    <CharacterIllustration type="speaking" />
                  </View>
                  
                  <View style={styles.didYouKnowBadge}>
                    <Text style={styles.didYouKnowEmoji}>💡</Text>
                    <Text style={styles.didYouKnowText}>Did you know?</Text>
                  </View>
                  
                  {/* Content in speech bubble style */}
                  <View style={styles.contentBox}>
                    <Text style={styles.contentText}>{capsule.content}</Text>
                  </View>
                  
                  {/* Visual examples row */}
                  <View style={styles.visualExamplesRow}>
                    <View style={styles.visualExample}>
                      <Text style={styles.visualEmoji}>{capsule.countryFlag}</Text>
                      <Text style={styles.visualLabel}>Origin</Text>
                    </View>
                    <View style={styles.visualDivider} />
                    <View style={styles.visualExample}>
                      <Text style={styles.visualEmoji}>{getCategoryIcon()}</Text>
                      <Text style={styles.visualLabel}>{capsule.category}</Text>
                    </View>
                    <View style={styles.visualDivider} />
                    <View style={styles.visualExample}>
                      <Text style={styles.visualEmoji}>🎯</Text>
                      <Text style={styles.visualLabel}>Daily Use</Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Slide 2: Interactive Example - FIXED LAYOUT */}
              {currentSlide === 2 && capsule.example && (
                <View style={styles.slideWrapper}>
                  {/* Header */}
                  <View style={styles.exampleHeaderContainer}>
                    <View style={styles.exampleBadge}>
                      <Text style={styles.exampleBadgeEmoji}>🎯</Text>
                      <Text style={styles.exampleBadgeText}>Real-Life Usage</Text>
                    </View>
                  </View>
                  
                  {/* Interactive Card - Only tappable when not revealed */}
                  {!phraseRevealed ? (
                    <TouchableOpacity 
                      onPress={() => setPhraseRevealed(true)}
                      activeOpacity={0.9}
                      style={styles.interactiveCardWrapper}
                    >
                      <View style={styles.interactiveCard}>
                        {/* Spanish Phrase */}
                        <View style={styles.phraseSection}>
                          <Text style={styles.languageLabel}>🇪🇸 Spanish</Text>
                          <Text style={styles.phraseText}>{capsule.example.phrase}</Text>
                        </View>
                        
                        {/* Divider */}
                        <View style={styles.phraseDivider}>
                          <View style={styles.dividerLine} />
                          <View style={styles.tapButton}>
                            <PulsingDot />
                            <Text style={styles.tapButtonText}>TAP</Text>
                          </View>
                          <View style={styles.dividerLine} />
                        </View>
                        
                        {/* Translation Hidden */}
                        <View style={styles.translationSection}>
                          <Text style={styles.languageLabel}>🇺🇸 English</Text>
                          <View style={styles.hiddenTranslation}>
                            <Text style={styles.hiddenText}>• • • • • •</Text>
                            <Text style={styles.tapHintSmall}>Tap card to reveal</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.interactiveCardWrapper}>
                      <View style={[styles.interactiveCard, styles.interactiveCardRevealed]}>
                        {/* Spanish Phrase */}
                        <View style={styles.phraseSection}>
                          <Text style={styles.languageLabel}>🇪🇸 Spanish</Text>
                          <Text style={styles.phraseText}>{capsule.example.phrase}</Text>
                        </View>
                        
                        {/* Divider */}
                        <View style={styles.phraseDivider}>
                          <View style={styles.dividerLine} />
                          <View style={styles.revealedIcon}>
                            <Text style={styles.revealedCheck}>✓</Text>
                          </View>
                          <View style={styles.dividerLine} />
                        </View>
                        
                        {/* Translation Revealed */}
                        <View style={styles.translationSection}>
                          <Text style={styles.languageLabel}>🇺🇸 English</Text>
                          <Text style={styles.translationText}>{capsule.example.translation}</Text>
                        </View>
                      </View>
                    </View>
                  )}
                  
                  {/* Context - Only show after reveal */}
                  {phraseRevealed && (
                    <View style={styles.contextCard}>
                      <Text style={styles.contextEmoji}>📍</Text>
                      <View style={styles.contextTextContainer}>
                        <Text style={styles.contextLabel}>When to use it:</Text>
                        <Text style={styles.contextValue}>{capsule.example.context}</Text>
                      </View>
                    </View>
                  )}
                </View>
              )}

              {/* Slide 3: Fun Fact */}
              {currentSlide === 3 && (
                <View style={styles.slideWrapper}>
                  <CharacterIllustration type="thinking" />
                  
                  <View style={styles.proTipBadge}>
                    <AnimatedEmoji emoji={capsule.tipEmoji} size={40} delay={100} />
                    <Text style={styles.proTipText}>Pro Tip!</Text>
                  </View>
                  
                  <View style={styles.funFactCard}>
                    <View style={styles.funFactQuote}>
                      <Text style={styles.quoteIcon}>"</Text>
                    </View>
                    <Text style={styles.funFactText}>{capsule.funFact}</Text>
                    <View style={styles.funFactQuoteEnd}>
                      <Text style={styles.quoteIcon}>"</Text>
                    </View>
                  </View>
                  
                  {/* Ready badge */}
                  <View style={styles.readySection}>
                    <View style={styles.readyBadge}>
                      <Text style={styles.readyEmoji}>🎉</Text>
                      <Text style={styles.readyText}>You're ready to use this!</Text>
                    </View>
                  </View>
                </View>
              )}
              
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom tap indicator */}
      <View style={styles.bottomIndicator}>
        <View style={styles.tapIndicatorPill}>
          <Text style={styles.tapIndicatorText}>
            {currentSlide === 2 && !phraseRevealed 
              ? '👆 Tap anywhere to reveal translation' 
              : '👆 Tap anywhere to continue'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  closeText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  progressSegmentFilled: {
    backgroundColor: Colors.primary,
  },
  progressSegmentActive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.xp + '30',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  xpText: {
    fontSize: Typography.sm,
    fontWeight: '700' as const,
    color: Colors.xp,
    marginRight: 4,
  },
  xpStar: {
    fontSize: 14,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.md,
  },
  cardTouchable: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardContent: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  slideWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  // Slide 0 styles
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.xl,
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: Spacing.xs,
  },
  categoryText: {
    fontSize: Typography.sm,
    fontWeight: '700' as const,
    letterSpacing: 1,
  },
  mainVisual: {
    marginBottom: Spacing.lg,
  },
  emojiGlow: {
    padding: Spacing.lg,
    backgroundColor: Colors.primary + '10',
    borderRadius: 100,
  },
  slideTitle: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 34,
    paddingHorizontal: Spacing.md,
  },
  countryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGray,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  countryFlag: {
    fontSize: 22,
    marginRight: Spacing.sm,
  },
  countryName: {
    fontSize: Typography.base,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  verifiedBadge: {
    marginLeft: Spacing.sm,
    backgroundColor: Colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '700' as const,
  },
  decorationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  decorationEmoji: {
    fontSize: 20,
  },
  decorationLine: {
    width: 40,
    height: 2,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  // Slide 1 styles
  contentHeaderRow: {
    marginBottom: Spacing.lg,
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  didYouKnowBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.xp + '20',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.lg,
  },
  didYouKnowEmoji: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  didYouKnowText: {
    fontSize: Typography.base,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  contentBox: {
    backgroundColor: Colors.backgroundGray,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    marginBottom: Spacing.xl,
  },
  contentText: {
    fontSize: Typography.base,
    color: Colors.textPrimary,
    lineHeight: 26,
    textAlign: 'left',
  },
  visualExamplesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  visualExample: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  visualEmoji: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  visualLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  visualDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  // Slide 2 styles - FIXED
  exampleHeaderContainer: {
    marginBottom: Spacing.lg,
    width: '100%',
    alignItems: 'center',
  },
  exampleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary + '20',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  exampleBadgeEmoji: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  exampleBadgeText: {
    fontSize: Typography.base,
    fontWeight: '700' as const,
    color: Colors.secondary,
  },
  interactiveCardWrapper: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  interactiveCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
    overflow: 'hidden',
  },
  interactiveCardRevealed: {
    borderColor: Colors.success,
  },
  phraseSection: {
    padding: Spacing.lg,
    backgroundColor: Colors.primary + '08',
  },
  languageLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    fontWeight: '600' as const,
  },
  phraseText: {
    fontSize: Typography.xl,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  phraseDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  tapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginHorizontal: Spacing.md,
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginRight: Spacing.xs,
  },
  tapButtonText: {
    fontSize: Typography.sm,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  revealedIcon: {
    backgroundColor: Colors.success,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.md,
  },
  revealedCheck: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '700' as const,
  },
  translationSection: {
    padding: Spacing.lg,
    backgroundColor: Colors.backgroundGray,
  },
  translationText: {
    fontSize: Typography.xl,
    fontWeight: '700' as const,
    color: Colors.success,
    textAlign: 'center',
  },
  hiddenTranslation: {
    alignItems: 'center',
  },
  hiddenText: {
    fontSize: Typography.xl,
    color: Colors.textLight,
    letterSpacing: 4,
  },
  tapHintSmall: {
    fontSize: Typography.xs,
    color: Colors.textLight,
    marginTop: Spacing.xs,
  },
  contextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary + '15',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    width: '100%',
    marginBottom: Spacing.md,
  },
  contextEmoji: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  contextTextContainer: {
    flex: 1,
  },
  contextLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  contextValue: {
    fontSize: Typography.sm,
    color: Colors.textPrimary,
    fontWeight: '500' as const,
  },
  continueHint: {
    marginTop: Spacing.md,
  },
  continueHintText: {
    fontSize: Typography.sm,
    color: Colors.textLight,
  },
  // Slide 3 styles
  proTipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  proTipText: {
    fontSize: Typography.xxl,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    marginLeft: Spacing.md,
  },
  funFactCard: {
    backgroundColor: '#FFF9E6',
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.xp + '50',
    position: 'relative',
    marginBottom: Spacing.xl,
  },
  funFactQuote: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.md,
  },
  funFactQuoteEnd: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.md,
  },
  quoteIcon: {
    fontSize: 40,
    color: Colors.xp + '40',
    fontWeight: '700' as const,
  },
  funFactText: {
    fontSize: Typography.base,
    color: Colors.textPrimary,
    lineHeight: 26,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  readySection: {
    alignItems: 'center',
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  readyEmoji: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  readyText: {
    fontSize: Typography.base,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  // Bottom indicator
  bottomIndicator: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  tapIndicatorPill: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  tapIndicatorText: {
    fontSize: Typography.sm,
    color: 'rgba(255,255,255,0.6)',
  },
  // Celebration styles
  celebrationContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  particle: {
    position: 'absolute',
  },
  particleEmoji: {
    fontSize: 30,
  },
  trophyContainer: {
    marginBottom: Spacing.lg,
  },
  celebrationTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.white,
    textAlign: 'center',
  },
  celebrationSubtitle: {
    fontSize: Typography.base,
    color: 'rgba(255,255,255,0.7)',
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  rewardRow: {
    marginTop: Spacing.xl,
  },
  xpEarnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.xp + '30',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.xp,
  },
  xpEarnedIcon: {
    fontSize: 28,
    marginRight: Spacing.sm,
  },
  xpEarnedText: {
    fontSize: Typography.xl,
    fontWeight: '700' as const,
    color: Colors.xp,
  },
  completionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.lg,
  },
  completionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  completionEmoji: {
    fontSize: 24,
  },
  completionTextContainer: {
    flex: 1,
  },
  completionTitle: {
    fontSize: Typography.sm,
    color: 'rgba(255,255,255,0.6)',
  },
  completionSubtitle: {
    fontSize: Typography.base,
    fontWeight: '600' as const,
    color: Colors.white,
    marginTop: 2,
  },
  checkEmoji: {
    fontSize: 20,
    color: Colors.success,
  },
  continueButton: {
    marginTop: Spacing.xxl,
  },
  // Speech bubble styles
  speechBubble: {
    backgroundColor: Colors.primary + '15',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderTopLeftRadius: 4,
    position: 'relative',
    maxWidth: '90%',
  },
  speechBubbleSecondary: {
    backgroundColor: Colors.backgroundGray,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: 4,
  },
  speechEmoji: {
    fontSize: 20,
    marginBottom: Spacing.xs,
  },
  speechText: {
    fontSize: Typography.base,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  speechTextSecondary: {
    fontStyle: 'italic',
  },
  speechTail: {
    position: 'absolute',
    top: 0,
    left: -8,
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderRightColor: Colors.primary + '15',
    borderTopWidth: 10,
    borderTopColor: 'transparent',
  },
  speechTailSecondary: {
    left: 'auto',
    right: -8,
    borderRightWidth: 0,
    borderLeftWidth: 10,
    borderLeftColor: Colors.backgroundGray,
  },
});
