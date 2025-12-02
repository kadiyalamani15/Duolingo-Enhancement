import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors } from '../constants/Colors';
import { Typography, Spacing } from '../constants/Typography';
import { Header } from '../components/Header';
import { LessonNode } from '../components/LessonNode';
import { ProgressBar } from '../components/ProgressBar';
import { Card } from '../components/Card';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const mockLessons = [
  { id: '1', title: 'Greetings', subtitle: 'Basics', isCompleted: false, isLocked: false, isCurrent: true },
  { id: '2', title: 'Objects', subtitle: 'Daily Items', isCompleted: false, isLocked: false, isCurrent: false },
  { id: '3', title: 'Places', subtitle: 'Directions', isCompleted: false, isLocked: false, isCurrent: false },
  { id: '4', title: 'Unit 4', subtitle: 'Coming Soon', isCompleted: false, isLocked: true, isCurrent: false },
  { id: '5', title: 'Unit 5', subtitle: 'Coming Soon', isCompleted: false, isLocked: true, isCurrent: false },
];

export const LearnScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleLessonPress = (lessonId: string) => {
    navigation.navigate('Lesson', { lessonId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header streak={7} gems={500} hearts={5} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Language Header */}
        <View style={styles.languageHeader}>
          <Text style={styles.languageTitle}>🇪🇸 Spanish</Text>
          <Text style={styles.languageSubtitle}>Section 1</Text>
        </View>

        {/* Progress Card */}
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Daily Goal</Text>
            <Text style={styles.progressValue}>13 / 20 XP</Text>
          </View>
          <ProgressBar progress={0.65} />
        </Card>

        {/* Learning Path */}
        <View style={styles.pathContainer}>
          {mockLessons.map((lesson, index) => (
            <View key={lesson.id} style={styles.lessonContainer}>
              {index > 0 && <View style={styles.connector} />}
              <LessonNode
                title={lesson.title}
                isCompleted={lesson.isCompleted}
                isLocked={lesson.isLocked}
                isCurrent={lesson.isCurrent}
                onPress={() => handleLessonPress(lesson.id)}
              />
            </View>
          ))}
        </View>

        {/* Character Placeholder */}
        <View style={styles.characterContainer}>
          <Text style={styles.characterEmoji}>🦉</Text>
          <Text style={styles.characterText}>Keep going! You're doing great!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xxxl,
  },
  languageHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  languageTitle: {
    fontSize: Typography.xxl,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  languageSubtitle: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  progressCard: {
    marginBottom: Spacing.xl,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  progressTitle: {
    fontSize: Typography.base,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  progressValue: {
    fontSize: Typography.sm,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  pathContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  lessonContainer: {
    alignItems: 'center',
  },
  connector: {
    width: 3,
    height: 40,
    backgroundColor: Colors.border,
    marginVertical: -Spacing.sm,
  },
  characterContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  characterEmoji: {
    fontSize: 80,
    marginBottom: Spacing.md,
  },
  characterText: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

