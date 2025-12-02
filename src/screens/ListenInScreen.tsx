import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing, BorderRadius } from '../constants/Typography';
// Button component not needed - using custom close button
import {
  conversationTranscript,
  conversationContext,
  wordExplanations,
  WordExplanation,
  TranscriptLine,
} from '../data/listenInTranscript';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Video Placeholder Component
const VideoPlaceholder: React.FC = () => {
  return (
    <View style={styles.videoContainer}>
      <View style={styles.videoPlaceholder}>
        <View style={styles.videoIconContainer}>
          <Text style={styles.videoIcon}>🎬</Text>
        </View>
        <Text style={styles.videoText}>Conversation will appear here</Text>
        <View style={styles.videoControls}>
          <View style={styles.playButton}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </View>
        <View style={styles.videoProgress}>
          <View style={styles.videoProgressFill} />
        </View>
      </View>
      
      {/* Context Card */}
      <View style={styles.contextCard}>
        <View style={styles.contextHeader}>
          <Text style={styles.contextEmoji}>☕</Text>
          <View style={styles.contextTitleContainer}>
            <Text style={styles.contextTitle}>{conversationContext.title}</Text>
            <Text style={styles.contextTitleSpanish}>{conversationContext.titleSpanish}</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{conversationContext.level}</Text>
          </View>
        </View>
        <Text style={styles.contextDescription}>{conversationContext.description}</Text>
        <View style={styles.topicsRow}>
          {conversationContext.topics.map((topic, index) => (
            <View key={index} style={styles.topicChip}>
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

// Word Explanation Modal Component
const WordExplanationModal: React.FC<{
  visible: boolean;
  explanation: WordExplanation | null;
  onClose: () => void;
}> = ({ visible, explanation, onClose }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300);
    }
  }, [visible]);

  if (!explanation) return null;

  const getFormalityColor = () => {
    switch (explanation.formality) {
      case 'formal': return '#9B59B6';
      case 'informal': return '#E67E22';
      case 'neutral': return Colors.secondary;
      default: return Colors.secondary;
    }
  };

  const getFormalityLabel = () => {
    switch (explanation.formality) {
      case 'formal': return '🎩 Formal';
      case 'informal': return '😊 Informal';
      case 'neutral': return '🔄 Neutral';
      default: return 'Neutral';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPress={onClose} 
        />
        <Animated.View
          style={[
            styles.explanationModal,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Drag Handle */}
          <View style={styles.modalHeader}>
            <View style={styles.modalDragHandle} />
          </View>

          {/* Word Title Row */}
          <View style={styles.wordSection}>
            <Text style={styles.wordTitle}>{explanation.word}</Text>
            <View style={[styles.formalityBadge, { backgroundColor: getFormalityColor() + '20' }]}>
              <Text style={[styles.formalityText, { color: getFormalityColor() }]}>
                {getFormalityLabel()}
              </Text>
            </View>
          </View>

          {/* Meaning - Always visible */}
          <View style={styles.meaningSection}>
            <Text style={styles.meaningLabel}>📖 Meaning</Text>
            <Text style={styles.meaningText}>{explanation.meaning}</Text>
          </View>

          {/* Scrollable Details */}
          <ScrollView 
            style={styles.modalScroll} 
            showsVerticalScrollIndicator={true}
            bounces={false}
          >
            {/* Contextual Usage */}
            <View style={styles.usageSection}>
              <Text style={styles.sectionLabel}>💬 Usage</Text>
              <Text style={styles.usageText}>{explanation.contextualUsage}</Text>
            </View>

            {/* Examples */}
            {explanation.exampleSentences.length > 0 && (
              <View style={styles.examplesSection}>
                <Text style={styles.sectionLabel}>✏️ Examples</Text>
                {explanation.exampleSentences.slice(0, 2).map((sentence, index) => (
                  <Text key={index} style={styles.exampleText}>• {sentence}</Text>
                ))}
              </View>
            )}

            {/* Notes */}
            {explanation.notes && (
              <View style={styles.notesSection}>
                <View style={styles.notesBox}>
                  <Text style={styles.notesText}>💡 {explanation.notes}</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeButtonText}>Got it!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Individual Tappable Word Component with hover support
const TappableWord: React.FC<{
  word: string;
  isHighlighted: boolean;
  onPress: () => void;
}> = ({ word, isHighlighted, onPress }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={{ display: 'flex' }}
    >
      <Text
        style={[
          styles.tappableWord,
          isHovered && styles.hoveredWord,
          isHighlighted && styles.highlightedWord,
        ]}
      >
        {word}
      </Text>
    </Pressable>
  );
};

// Transcript Line Component with selectable words - ALL words are tappable
const TranscriptLineItem: React.FC<{
  line: TranscriptLine;
  onWordPress: (word: string, originalWord: string) => void;
  highlightedWord: string | null;
}> = ({ line, onWordPress, highlightedWord }) => {
  // Tokenize the text into words, keeping punctuation separate
  const words = line.text.split(/(\s+)/);

  const cleanWord = (word: string): string => {
    return word.replace(/[¡!¿?,."—:]/g, '').trim();
  };

  const isActualWord = (word: string): boolean => {
    const cleaned = cleanWord(word);
    return cleaned.length > 0 && !/^\s*$/.test(cleaned);
  };

  const getExplanationKey = (word: string): string | null => {
    const cleaned = cleanWord(word);
    
    // Check for exact match in predefined explanations
    const exactMatch = Object.keys(wordExplanations).find(
      key => key.toLowerCase() === cleaned.toLowerCase()
    );
    if (exactMatch) return exactMatch;

    // Check for phrase matches
    const phraseMatch = Object.keys(wordExplanations).find(
      key => key.split(' ').some(k => k.toLowerCase() === cleaned.toLowerCase())
    );
    if (phraseMatch) return phraseMatch;

    return null;
  };

  return (
    <View style={styles.transcriptLine}>
      <View style={[styles.speakerBadge, { backgroundColor: line.speakerColor + '20' }]}>
        <Text style={[styles.speakerName, { color: line.speakerColor }]}>
          {line.speaker}
        </Text>
      </View>
      
      <View style={styles.textContainer}>
        <View style={styles.spanishTextContainer}>
          {words.map((word, index) => {
            if (!isActualWord(word)) {
              // It's whitespace or empty, just render it
              return <Text key={index} style={styles.spanishText}>{word}</Text>;
            }

            const explanationKey = getExplanationKey(word);
            const cleaned = cleanWord(word);
            const isHighlighted = highlightedWord === (explanationKey || cleaned);

            return (
              <TappableWord
                key={index}
                word={word}
                isHighlighted={isHighlighted}
                onPress={() => onWordPress(explanationKey || cleaned, word)}
              />
            );
          })}
        </View>
        <Text style={styles.translationText}>{line.translation}</Text>
      </View>
    </View>
  );
};

// Generate a dynamic explanation for words without predefined explanations
const generateDynamicExplanation = (word: string): WordExplanation => {
  return {
    word: word,
    meaning: 'Tap to learn more about this word',
    contextualUsage: `"${word}" is used in this conversation. Understanding words in context helps you learn faster!`,
    formality: 'neutral',
    exampleSentences: [
      `This word appears in the conversation between Lucía and Mateo.`,
      `Try to understand its meaning from the context of the dialogue.`,
    ],
    notes: '💡 Tip: Even if you don\'t know every word, try to understand the overall meaning from context. This is how native speakers learn!',
  };
};

// Main ListenIn Screen
export const ListenInScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedOriginalWord, setSelectedOriginalWord] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleWordPress = (wordKey: string, originalWord: string) => {
    setSelectedWord(wordKey);
    setSelectedOriginalWord(originalWord);
    setShowExplanation(true);
  };

  const handleCloseExplanation = () => {
    setShowExplanation(false);
    setSelectedWord(null);
    setSelectedOriginalWord(null);
  };
  
  // Get explanation - either predefined or dynamic
  const getExplanation = (): WordExplanation | null => {
    if (!selectedWord) return null;
    
    // Check if we have a predefined explanation
    if (wordExplanations[selectedWord]) {
      return wordExplanations[selectedWord];
    }
    
    // Generate a dynamic explanation
    return generateDynamicExplanation(selectedOriginalWord || selectedWord);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleClose}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerIcon}>💬</Text>
          <Text style={styles.headerTitle}>Listen In</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+15 XP</Text>
          </View>
        </View>
      </View>

      {/* Instruction Banner */}
      <View style={styles.instructionBanner}>
        <Text style={styles.instructionEmoji}>👆</Text>
        <Text style={styles.instructionText}>
          Tap any word to learn its meaning
        </Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video Placeholder */}
        <VideoPlaceholder />

        {/* Transcript Section */}
        <View style={styles.transcriptSection}>
          <View style={styles.transcriptHeader}>
            <Text style={styles.transcriptTitle}>📜 Transcript</Text>
            <View style={styles.transcriptBadge}>
              <Text style={styles.transcriptBadgeText}>🇪🇸 Spanish</Text>
            </View>
          </View>

          {/* Transcript Lines */}
          <View style={styles.transcriptContent}>
            {conversationTranscript.map((line) => (
              <TranscriptLineItem
                key={line.id}
                line={line}
                onWordPress={handleWordPress}
                highlightedWord={selectedWord}
              />
            ))}
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Word Explanation Modal */}
      <WordExplanationModal
        visible={showExplanation}
        explanation={getExplanation()}
        onClose={handleCloseExplanation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundGray,
    borderRadius: 20,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.xl,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  headerRight: {
    width: 80,
    alignItems: 'flex-end',
  },
  xpBadge: {
    backgroundColor: Colors.xp + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  xpText: {
    fontSize: Typography.sm,
    fontWeight: '700' as const,
    color: Colors.xp,
  },
  instructionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary + '15',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
  instructionEmoji: {
    fontSize: 16,
    marginRight: Spacing.sm,
  },
  instructionText: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  content: {
    flex: 1,
  },
  // Video Placeholder Styles
  videoContainer: {
    padding: Spacing.base,
  },
  videoPlaceholder: {
    backgroundColor: '#1a1a2e',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  videoIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  videoIcon: {
    fontSize: 40,
  },
  videoText: {
    fontSize: Typography.base,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: Spacing.lg,
  },
  videoControls: {
    marginBottom: Spacing.md,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 20,
    color: Colors.white,
    marginLeft: 4,
  },
  videoProgress: {
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  videoProgressFill: {
    width: '35%',
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  // Context Card
  contextCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contextHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  contextEmoji: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  contextTitleContainer: {
    flex: 1,
  },
  contextTitle: {
    fontSize: Typography.lg,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  contextTitleSpanish: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  levelBadge: {
    backgroundColor: Colors.secondary + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  levelText: {
    fontSize: Typography.xs,
    fontWeight: '700' as const,
    color: Colors.secondary,
  },
  contextDescription: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  topicsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  topicChip: {
    backgroundColor: Colors.backgroundGray,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  topicText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  // Transcript Section
  transcriptSection: {
    padding: Spacing.base,
  },
  transcriptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  transcriptTitle: {
    fontSize: Typography.lg,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  transcriptBadge: {
    backgroundColor: Colors.streak + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  transcriptBadgeText: {
    fontSize: Typography.xs,
    fontWeight: '600' as const,
    color: Colors.streak,
  },
  transcriptContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  // Transcript Line
  transcriptLine: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  speakerBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
  },
  speakerName: {
    fontSize: Typography.xs,
    fontWeight: '700' as const,
  },
  textContainer: {
    marginLeft: Spacing.xs,
  },
  spanishTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  spanishText: {
    fontSize: Typography.base,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  tappableWord: {
    fontSize: Typography.base,
    color: Colors.textPrimary,
    lineHeight: 24,
    cursor: 'pointer',
    borderRadius: 3,
    paddingHorizontal: 1,
  },
  hoveredWord: {
    backgroundColor: Colors.secondary + '25',
    borderRadius: 3,
  },
  highlightedWord: {
    backgroundColor: Colors.primary + '35',
    borderRadius: 3,
  },
  translationText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 40,
  },
  // Modal Styles - Phone Optimized
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
  },
  explanationModal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 12,
    paddingBottom: 12,
    maxHeight: '45%',
  },
  modalHeader: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  modalDragHandle: {
    width: 36,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
  },
  wordSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  wordTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  formalityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  formalityText: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
  meaningSection: {
    marginBottom: 8,
    backgroundColor: Colors.primary + '10',
    padding: 8,
    borderRadius: 8,
  },
  meaningLabel: {
    fontSize: 10,
    fontWeight: '700' as const,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  meaningText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  modalScroll: {
    maxHeight: 120,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700' as const,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  usageSection: {
    marginBottom: 6,
  },
  usageText: {
    fontSize: 12,
    color: Colors.textPrimary,
    lineHeight: 16,
  },
  examplesSection: {
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
    marginBottom: 2,
  },
  notesSection: {
    marginBottom: 4,
  },
  notesBox: {
    backgroundColor: Colors.xp + '12',
    padding: 6,
    borderRadius: 6,
    borderLeftWidth: 2,
    borderLeftColor: Colors.xp,
  },
  notesText: {
    fontSize: 10,
    color: Colors.textPrimary,
    lineHeight: 14,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700' as const,
  },
});

export default ListenInScreen;

