import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing } from '../constants/Typography';

interface StatItemProps {
  icon: string;
  value: number;
  color: string;
  label?: string;
}

export const StatItem: React.FC<StatItemProps> = ({ icon, value, color, label }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Text style={[styles.icon, { color }]}>{icon}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.value}>{value}</Text>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  icon: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  value: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  label: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

