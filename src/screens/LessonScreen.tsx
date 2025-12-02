import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, Modal } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing, BorderRadius } from '../constants/Typography';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { CultureCapsule } from '../components/CultureCapsule';
import { LessonComplete } from '../components/LessonComplete';
import { getCapsuleById } from '../data/cultureCapsules';
import { getLessonById } from '../data/lessonContent';
import { RootStackParamList } from '../navigation/AppNavigator';

type LessonState = 'questions' | 'complete' | 'capsule';
type LessonScreenRouteProp = RouteProp<RootStackParamList, 'Lesson'>;

export const LessonScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<LessonScreenRouteProp>();
  const { lessonId } = route.params;
  
  // Get lesson data based on lessonId
  const lessonData = getLessonById(lessonId) || getLessonById('1')!;
  const questions = lessonData.questions;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [lessonState, setLessonState] = useState<LessonState>('questions');
  const [showExitModal, setShowExitModal] = useState(false);

  const question = questions[currentQuestion];
  const progress = (currentQuestion + 1) / questions.length;
  const xpEarned = score * 10 + 5;

  // Get culture capsule for this lesson
  const cultureCapsule = getCapsuleById(lessonData.cultureCapsuleId)!;

  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    setShowExitModal(false);
    navigation.goBack();
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setLessonState('complete');
    }
  };

  const handleShowCapsule = () => {
    setLessonState('capsule');
  };

  const handleCapsuleComplete = () => {
    navigation.goBack();
  };

  const getOptionStyle = (option: string) => {
    if (isCorrect !== null) {
      if (option === selectedAnswer) {
        return isCorrect ? styles.optionCorrect : styles.optionIncorrect;
      }
      if (option === question.correctAnswer) {
        return styles.optionCorrect;
      }
    }
    if (option === selectedAnswer) {
      return styles.optionSelected;
    }
    return styles.option;
  };

  const getDifficultyColor = () => {
    switch (lessonData.difficulty) {
      case 'beginner': return Colors.success;
      case 'elementary': return Colors.xp;
      case 'intermediate': return Colors.streak;
      default: return Colors.primary;
    }
  };

  // Render Culture Capsule
  if (lessonState === 'capsule') {
    return (
      <CultureCapsule
        capsule={cultureCapsule}
        onComplete={handleCapsuleComplete}
        xpEarned={5}
      />
    );
  }

  // Render Lesson Complete
  if (lessonState === 'complete') {
    return (
      <LessonComplete
        score={score}
        totalQuestions={questions.length}
        xpEarned={xpEarned}
        onContinue={handleShowCapsule}
        hasCultureCapsule={true}
      />
    );
  }

  // Render Questions
  return (
    <SafeAreaView style={styles.container}>
      {/* Exit Confirmation Modal */}
      <Modal
        visible={showExitModal}
        transparent
        animationType="fade"
        onRequestClose={cancelExit}
      >
        <View style={styles.exitModalOverlay}>
          <View style={styles.exitModalContent}>
            <Text style={styles.exitModalTitle}>Exit Lesson?</Text>
            <Text style={styles.exitModalMessage}>
              Are you sure you want to quit? Your progress will be lost.
            </Text>
            <View style={styles.exitModalButtons}>
              <TouchableOpacity 
                style={styles.exitModalCancelButton} 
                onPress={cancelExit}
              >
                <Text style={styles.exitModalCancelText}>Keep Learning</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.exitModalExitButton} 
                onPress={confirmExit}
              >
                <Text style={styles.exitModalExitText}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleExit}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} height={16} />
        </View>
        <View style={styles.heartsContainer}>
          <Text style={styles.heartsText}>❤️ 5</Text>
        </View>
      </View>

      {/* Unit Info Badge */}
      <View style={styles.unitBadgeContainer}>
        <View style={[styles.unitBadge, { backgroundColor: getDifficultyColor() + '20' }]}>
          <Text style={[styles.unitBadgeText, { color: getDifficultyColor() }]}>
            {lessonData.unitTitle} • {lessonData.topic}
          </Text>
        </View>
      </View>

      {/* Question */}
      <View style={styles.content}>
        <View style={styles.questionContainer}>
          <View style={styles.questionTypeIcon}>
            <Text style={styles.questionIcon}>
              {question.type === 'multiple-choice' ? '📝' : '🗣️'}
            </Text>
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options?.map((option) => {
            const optionStyle = getOptionStyle(option);
            return (
              <TouchableOpacity
                key={option}
                onPress={() => handleAnswerSelect(option)}
                disabled={isCorrect !== null}
                activeOpacity={0.7}
              >
                <View style={[styles.optionCard, optionStyle]}>
                  <Text style={styles.optionText}>{option}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Result Feedback */}
      {isCorrect !== null && (
        <View style={[styles.feedback, isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect]}>
          <View style={styles.feedbackContent}>
            <Text style={styles.feedbackIcon}>{isCorrect ? '✓' : '✗'}</Text>
            <View style={styles.feedbackTextContainer}>
              <Text style={styles.feedbackTitle}>
                {isCorrect ? 'Excellent!' : 'Correct answer:'}
              </Text>
              {!isCorrect && (
                <Text style={styles.feedbackAnswer}>{question.correctAnswer}</Text>
              )}
            </View>
          </View>
          <Button
            title="CONTINUE"
            onPress={handleContinue}
            variant={isCorrect ? 'primary' : 'secondary'}
            fullWidth
            size="large"
          />
        </View>
      )}

      {/* Check Button */}
      {isCorrect === null && (
        <View style={styles.footer}>
          <Button
            title="CHECK"
            onPress={handleCheckAnswer}
            disabled={!selectedAnswer}
            fullWidth
            size="large"
          />
        </View>
      )}
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
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: Typography.xxl,
    color: Colors.textSecondary,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  heartsContainer: {
    width: 60,
    alignItems: 'flex-end',
  },
  heartsText: {
    fontSize: Typography.base,
    fontWeight: '700' as const,
  },
  unitBadgeContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  unitBadge: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  unitBadgeText: {
    fontSize: Typography.sm,
    fontWeight: '600' as const,
  },
  content: {
    flex: 1,
    padding: Spacing.base,
  },
  questionContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  questionTypeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  questionIcon: {
    fontSize: 40,
  },
  questionText: {
    fontSize: Typography.xl,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 30,
  },
  optionsContainer: {
    marginTop: Spacing.md,
  },
  optionCard: {
    marginBottom: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  option: {
    borderColor: Colors.border,
  },
  optionSelected: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary + '10',
  },
  optionCorrect: {
    borderColor: Colors.success,
    backgroundColor: Colors.success + '10',
  },
  optionIncorrect: {
    borderColor: Colors.error,
    backgroundColor: Colors.error + '10',
  },
  optionText: {
    fontSize: Typography.base,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  feedback: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
  },
  feedbackCorrect: {
    backgroundColor: Colors.success + '20',
    borderTopWidth: 3,
    borderTopColor: Colors.success,
  },
  feedbackIncorrect: {
    backgroundColor: Colors.error + '20',
    borderTopWidth: 3,
    borderTopColor: Colors.error,
  },
  feedbackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  feedbackIcon: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  feedbackTextContainer: {
    flex: 1,
  },
  feedbackTitle: {
    fontSize: Typography.xl,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  feedbackAnswer: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  footer: {
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  // Exit Modal Styles
  exitModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  exitModalContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  exitModalTitle: {
    fontSize: Typography.xl,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  exitModalMessage: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  exitModalButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
  exitModalCancelButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  exitModalCancelText: {
    color: Colors.white,
    fontSize: Typography.sm,
    fontWeight: '700' as const,
  },
  exitModalExitButton: {
    flex: 1,
    backgroundColor: Colors.backgroundGray,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  exitModalExitText: {
    color: Colors.error,
    fontSize: Typography.sm,
    fontWeight: '700' as const,
  },
});
