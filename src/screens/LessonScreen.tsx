import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing, BorderRadius } from '../constants/Typography';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

interface Question {
  id: string;
  type: 'multiple-choice' | 'translate' | 'listen';
  question: string;
  options?: string[];
  correctAnswer: string;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'Select the correct translation:\n\n"Hello"',
    options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
    correctAnswer: 'Hola',
  },
  {
    id: '2',
    type: 'multiple-choice',
    question: 'What does "Gracias" mean?',
    options: ['Please', 'Thank you', 'Goodbye', 'Hello'],
    correctAnswer: 'Thank you',
  },
  {
    id: '3',
    type: 'translate',
    question: 'Translate this:\n\n"Good morning"',
    options: ['Buenos días', 'Buenas noches', 'Buenas tardes', 'Hasta luego'],
    correctAnswer: 'Buenos días',
  },
];

export const LessonScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const question = mockQuestions[currentQuestion];
  const progress = (currentQuestion + 1) / mockQuestions.length;

  const handleExit = () => {
    Alert.alert(
      'Exit Lesson',
      'Are you sure you want to quit? Your progress will be lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => navigation.goBack(),
          style: 'destructive',
        },
      ]
    );
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 10);
    }
  };

  const handleContinue = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // Lesson complete
      const finalScore = score + (isCorrect ? 10 : 0);
      Alert.alert(
        'Lesson Complete! 🎉',
        `You earned ${finalScore} XP!`,
        [
          {
            text: 'Continue',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const getOptionStyle = (option: string) => {
    if (!isCorrect && isCorrect !== null) {
      // Answer was checked
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

  return (
    <SafeAreaView style={styles.container}>
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
    fontWeight: Typography.bold,
  },
  content: {
    flex: 1,
    padding: Spacing.base,
  },
  questionContainer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxxl,
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
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
  },
  optionsContainer: {
    marginTop: Spacing.lg,
  },
  optionCard: {
    marginBottom: Spacing.md,
    paddingVertical: Spacing.lg,
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
    fontSize: Typography.lg,
    fontWeight: Typography.semiBold,
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
    fontWeight: Typography.bold,
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
});

