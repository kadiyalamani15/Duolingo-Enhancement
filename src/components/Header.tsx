import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing } from '../constants/Typography';
import { StatItem } from './StatItem';

interface HeaderProps {
  streak?: number;
  gems?: number;
  hearts?: number;
  showStats?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  streak = 0,
  gems = 0,
  hearts = 5,
  showStats = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </TouchableOpacity>
      </View>

      {showStats && (
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{streak}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>💎</Text>
            <Text style={styles.statValue}>{gems}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>❤️</Text>
            <Text style={styles.statValue}>{hearts}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Spacing.base,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.backgroundGray,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  statValue: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
});

