import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing, BorderRadius } from '../constants/Typography';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { LinearGradient } from 'expo-linear-gradient';

const practiceTypes = [
  {
    id: 'review',
    title: 'Practice',
    subtitle: 'Reinforce your skills',
    icon: '🎯',
    color: Colors.primary,
    xp: 20,
  },
  {
    id: 'story',
    title: 'Stories',
    subtitle: 'Learn through reading',
    icon: '📖',
    color: Colors.secondary,
    xp: 15,
  },
  {
    id: 'speaking',
    title: 'Speaking',
    subtitle: 'Practice pronunciation',
    icon: '🎤',
    color: '#FF9600',
    xp: 10,
  },
  {
    id: 'listening',
    title: 'Listening',
    subtitle: 'Train your ear',
    icon: '👂',
    color: '#CE82FF',
    xp: 10,
  },
];

const mistakes = [
  { id: '1', word: 'Hola', translation: 'Hello', lastMistake: '2 days ago' },
  { id: '2', word: 'Gracias', translation: 'Thank you', lastMistake: '3 days ago' },
  { id: '3', word: 'Por favor', translation: 'Please', lastMistake: '5 days ago' },
];

export const PracticeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header streak={7} gems={500} hearts={5} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Practice Hub</Text>
        
        {/* Practice Types */}
        <View style={styles.practiceGrid}>
          {practiceTypes.map((practice) => (
            <TouchableOpacity
              key={practice.id}
              style={styles.practiceCard}
              activeOpacity={0.8}
            >
              <Card style={styles.practiceCardInner}>
                <View style={[styles.practiceIcon, { backgroundColor: practice.color + '20' }]}>
                  <Text style={styles.practiceEmoji}>{practice.icon}</Text>
                </View>
                <Text style={styles.practiceTitle}>{practice.title}</Text>
                <Text style={styles.practiceSubtitle}>{practice.subtitle}</Text>
                <View style={styles.xpBadge}>
                  <Text style={styles.xpText}>+{practice.xp} XP</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mistakes Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Review Mistakes</Text>
            <Text style={styles.sectionSubtitle}>Practice words you got wrong</Text>
          </View>

          {mistakes.map((mistake) => (
            <TouchableOpacity key={mistake.id} activeOpacity={0.7}>
              <Card style={styles.mistakeCard}>
                <View style={styles.mistakeContent}>
                  <View style={styles.mistakeIcon}>
                    <Text style={styles.mistakeEmoji}>❌</Text>
                  </View>
                  <View style={styles.mistakeText}>
                    <Text style={styles.mistakeWord}>{mistake.word}</Text>
                    <Text style={styles.mistakeTranslation}>{mistake.translation}</Text>
                  </View>
                  <Text style={styles.mistakeTime}>{mistake.lastMistake}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Streak Protection */}
        <Card style={styles.streakCard}>
          <View style={styles.streakContent}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <View style={styles.streakText}>
              <Text style={styles.streakTitle}>7 Day Streak!</Text>
              <Text style={styles.streakSubtitle}>Don't break it now!</Text>
            </View>
          </View>
        </Card>
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
    padding: Spacing.base,
    paddingBottom: Spacing.xxxl,
  },
  sectionTitle: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  practiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  practiceCard: {
    width: '48%',
    marginBottom: Spacing.base,
  },
  practiceCardInner: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  practiceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  practiceEmoji: {
    fontSize: 32,
  },
  practiceTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  practiceSubtitle: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  xpBadge: {
    backgroundColor: Colors.xp + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  xpText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.xp,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
  sectionSubtitle: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  mistakeCard: {
    marginBottom: Spacing.sm,
  },
  mistakeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mistakeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.error + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  mistakeEmoji: {
    fontSize: 20,
  },
  mistakeText: {
    flex: 1,
  },
  mistakeWord: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  mistakeTranslation: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  mistakeTime: {
    fontSize: Typography.xs,
    color: Colors.textLight,
  },
  streakCard: {
    backgroundColor: Colors.streak + '10',
    borderColor: Colors.streak + '40',
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakEmoji: {
    fontSize: 48,
    marginRight: Spacing.base,
  },
  streakText: {
    flex: 1,
  },
  streakTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  streakSubtitle: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});

