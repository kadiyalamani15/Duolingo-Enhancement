import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing, BorderRadius } from '../constants/Typography';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';

const achievements = [
  { id: '1', title: 'Scholar', icon: '🎓', unlocked: true },
  { id: '2', title: 'Sharpshooter', icon: '🎯', unlocked: true },
  { id: '3', title: 'Sage', icon: '🧙', unlocked: false },
  { id: '4', title: 'Champion', icon: '🏆', unlocked: false },
];

const stats = [
  { id: '1', label: 'Day Streak', value: '7', icon: '🔥', color: Colors.streak },
  { id: '2', label: 'Total XP', value: '2654', icon: '⭐', color: Colors.xp },
  { id: '3', label: 'Current League', value: 'Pearl', icon: '💎', color: Colors.gems },
  { id: '4', label: 'Lessons', value: '48', icon: '📚', color: Colors.primary },
];

export const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.name}>Your Name</Text>
          <Text style={styles.username}>@username</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Level 12</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <Card key={stat.id} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementLocked,
                ]}
                activeOpacity={0.7}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Text style={styles.unlockedText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Progress to Next Level */}
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progress to Level 13</Text>
            <Text style={styles.progressValue}>654 / 1000 XP</Text>
          </View>
          <ProgressBar progress={0.654} />
        </Card>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity>
            <Card style={styles.settingCard}>
              <Text style={styles.settingIcon}>👤</Text>
              <Text style={styles.settingText}>Edit Profile</Text>
              <Text style={styles.settingArrow}>›</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card style={styles.settingCard}>
              <Text style={styles.settingIcon}>🔔</Text>
              <Text style={styles.settingText}>Notifications</Text>
              <Text style={styles.settingArrow}>›</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card style={styles.settingCard}>
              <Text style={styles.settingIcon}>🌙</Text>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Text style={styles.settingArrow}>›</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card style={styles.settingCard}>
              <Text style={styles.settingIcon}>🌐</Text>
              <Text style={styles.settingText}>Learning Language</Text>
              <Text style={styles.settingArrow}>›</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card style={styles.settingCard}>
              <Text style={styles.settingIcon}>ℹ️</Text>
              <Text style={styles.settingText}>About</Text>
              <Text style={styles.settingArrow}>›</Text>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <Button
          title="Sign Out"
          onPress={() => console.log('Sign out')}
          variant="outline"
          style={styles.logoutButton}
          fullWidth
        />
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.primary,
    marginBottom: Spacing.base,
  },
  avatarText: {
    fontSize: 48,
  },
  name: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  username: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  levelBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.sm,
  },
  levelText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.white,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  achievementLocked: {
    borderColor: Colors.border,
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 48,
    marginBottom: Spacing.xs,
  },
  achievementTitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  unlockedBadge: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    backgroundColor: Colors.success,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedText: {
    color: Colors.white,
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
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
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  progressValue: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  settingArrow: {
    fontSize: Typography.xxl,
    color: Colors.textLight,
  },
  logoutButton: {
    marginTop: Spacing.base,
  },
});

