import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing, BorderRadius } from '../constants/Typography';
import { Header } from '../components/Header';
import { Card } from '../components/Card';

const mockLeaderboard = [
  { id: '1', rank: 1, name: 'Maria Garcia', username: '@maria', xp: 2847, isCurrentUser: false },
  { id: '2', rank: 2, name: 'John Smith', username: '@john', xp: 2756, isCurrentUser: false },
  { id: '3', rank: 3, name: 'You', username: '@you', xp: 2654, isCurrentUser: true },
  { id: '4', rank: 4, name: 'Sophie Chen', username: '@sophie', xp: 2543, isCurrentUser: false },
  { id: '5', rank: 5, name: 'Alex Johnson', username: '@alex', xp: 2432, isCurrentUser: false },
  { id: '6', rank: 6, name: 'Emma Wilson', username: '@emma', xp: 2321, isCurrentUser: false },
  { id: '7', rank: 7, name: 'David Lee', username: '@david', xp: 2210, isCurrentUser: false },
];

export const LeaderboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'all'>('week');

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#FFD700'; // Gold
    if (rank === 2) return '#C0C0C0'; // Silver
    if (rank === 3) return '#CD7F32'; // Bronze
    return Colors.textSecondary;
  };

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header streak={7} gems={500} hearts={5} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Leaderboard</Text>
          <Text style={styles.subtitle}>Pearl League</Text>
          <Text style={styles.leagueEmoji}>🏆</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'week' && styles.activeTab]}
            onPress={() => setActiveTab('week')}
          >
            <Text style={[styles.tabText, activeTab === 'week' && styles.activeTabText]}>
              This Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'month' && styles.activeTab]}
            onPress={() => setActiveTab('month')}
          >
            <Text style={[styles.tabText, activeTab === 'month' && styles.activeTabText]}>
              This Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All Time
            </Text>
          </TouchableOpacity>
        </View>

        {/* Top 3 Podium */}
        <View style={styles.podium}>
          {/* Second Place */}
          <View style={styles.podiumSpot}>
            <Text style={styles.podiumRank}>🥈</Text>
            <View style={[styles.podiumAvatar, { backgroundColor: '#C0C0C0' + '30' }]}>
              <Text style={styles.podiumAvatarText}>👤</Text>
            </View>
            <Text style={styles.podiumName}>{mockLeaderboard[1].name}</Text>
            <Text style={styles.podiumXP}>{mockLeaderboard[1].xp} XP</Text>
          </View>

          {/* First Place */}
          <View style={[styles.podiumSpot, styles.podiumFirst]}>
            <Text style={styles.podiumRank}>🥇</Text>
            <View style={[styles.podiumAvatar, styles.podiumAvatarFirst, { backgroundColor: '#FFD700' + '30' }]}>
              <Text style={styles.podiumAvatarText}>👤</Text>
            </View>
            <Text style={styles.podiumName}>{mockLeaderboard[0].name}</Text>
            <Text style={styles.podiumXP}>{mockLeaderboard[0].xp} XP</Text>
          </View>

          {/* Third Place */}
          <View style={styles.podiumSpot}>
            <Text style={styles.podiumRank}>🥉</Text>
            <View style={[styles.podiumAvatar, { backgroundColor: '#CD7F32' + '30' }]}>
              <Text style={styles.podiumAvatarText}>👤</Text>
            </View>
            <Text style={styles.podiumName}>{mockLeaderboard[2].name}</Text>
            <Text style={styles.podiumXP}>{mockLeaderboard[2].xp} XP</Text>
          </View>
        </View>

        {/* Rankings List */}
        <View style={styles.rankingsList}>
          {mockLeaderboard.map((entry) => {
            const cardStyle = entry.isCurrentUser
              ? [styles.rankCard, styles.currentUserCard]
              : styles.rankCard;
            return (
              <Card key={entry.id} style={cardStyle}>
              <View style={styles.rankContent}>
                <View style={styles.rankLeft}>
                  <Text style={[styles.rankNumber, { color: getRankColor(entry.rank) }]}>
                    {entry.rank <= 3 ? getRankEmoji(entry.rank) : `#${entry.rank}`}
                  </Text>
                  <View style={styles.rankAvatar}>
                    <Text style={styles.rankAvatarText}>👤</Text>
                  </View>
                  <View style={styles.rankInfo}>
                    <Text style={styles.rankName}>{entry.name}</Text>
                    <Text style={styles.rankUsername}>{entry.username}</Text>
                  </View>
                </View>
                <Text style={styles.rankXP}>{entry.xp} XP</Text>
              </View>
            </Card>
            );
          })}
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
    paddingBottom: Spacing.xxxl,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  title: {
    fontSize: Typography.xxxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  leagueEmoji: {
    fontSize: 48,
    marginTop: Spacing.sm,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.semiBold,
  },
  activeTabText: {
    color: Colors.primary,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.xl,
  },
  podiumSpot: {
    alignItems: 'center',
    marginHorizontal: Spacing.sm,
    flex: 1,
  },
  podiumFirst: {
    marginBottom: Spacing.lg,
  },
  podiumRank: {
    fontSize: Typography.xxl,
    marginBottom: Spacing.xs,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundGray,
    marginBottom: Spacing.xs,
  },
  podiumAvatarFirst: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  podiumAvatarText: {
    fontSize: 32,
  },
  podiumName: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  podiumXP: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  rankingsList: {
    paddingHorizontal: Spacing.base,
  },
  rankCard: {
    marginBottom: Spacing.sm,
  },
  currentUserCard: {
    backgroundColor: Colors.primary + '10',
    borderColor: Colors.primary,
  },
  rankContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankNumber: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    width: 40,
  },
  rankAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: Spacing.md,
  },
  rankAvatarText: {
    fontSize: 20,
  },
  rankInfo: {
    flex: 1,
  },
  rankName: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  rankUsername: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  rankXP: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
});

