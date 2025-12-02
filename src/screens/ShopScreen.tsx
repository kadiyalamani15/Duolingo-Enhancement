import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography, Spacing, BorderRadius } from '../constants/Typography';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const shopItems = [
  {
    id: '1',
    title: 'Streak Freeze',
    description: 'Protect your streak for 1 day',
    icon: '🧊',
    price: 200,
    currency: 'gems',
  },
  {
    id: '2',
    title: 'Heart Refill',
    description: 'Refill all your hearts',
    icon: '❤️',
    price: 350,
    currency: 'gems',
  },
  {
    id: '3',
    title: 'Bonus XP',
    description: 'Get 2x XP for 15 minutes',
    icon: '⚡',
    price: 150,
    currency: 'gems',
  },
  {
    id: '4',
    title: 'Legendary',
    description: 'Upgrade lesson to legendary',
    icon: '👑',
    price: 500,
    currency: 'gems',
  },
];

export const ShopScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header streak={7} gems={500} hearts={5} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Shop Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Shop</Text>
          <Text style={styles.subtitle}>Use your gems to buy power-ups</Text>
        </View>

        {/* Gems Balance */}
        <Card style={styles.balanceCard}>
          <View style={styles.balanceContent}>
            <Text style={styles.balanceEmoji}>💎</Text>
            <View style={styles.balanceText}>
              <Text style={styles.balanceLabel}>Your Gems</Text>
              <Text style={styles.balanceValue}>500</Text>
            </View>
            <Button title="Get More" onPress={() => {}} size="small" variant="secondary" />
          </View>
        </Card>

        {/* Shop Items */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Power-ups</Text>
          
          {shopItems.map((item) => (
            <Card key={item.id} style={styles.itemCard}>
              <View style={styles.itemContent}>
                <View style={styles.itemIcon}>
                  <Text style={styles.itemEmoji}>{item.icon}</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceIcon}>💎</Text>
                    <Text style={styles.priceText}>{item.price}</Text>
                  </View>
                </View>
                <Button
                  title="Buy"
                  onPress={() => console.log('Buy', item.id)}
                  size="small"
                />
              </View>
            </Card>
          ))}
        </View>

        {/* Earn Gems Section */}
        <View style={styles.earnSection}>
          <Text style={styles.sectionTitle}>Earn More Gems</Text>
          
          <Card style={styles.earnCard}>
            <Text style={styles.earnEmoji}>📺</Text>
            <Text style={styles.earnTitle}>Watch an Ad</Text>
            <Text style={styles.earnSubtitle}>Earn 5 gems</Text>
            <Button
              title="Watch Now"
              onPress={() => {}}
              variant="secondary"
              style={styles.earnButton}
            />
          </Card>

          <Card style={styles.earnCard}>
            <Text style={styles.earnEmoji}>🎯</Text>
            <Text style={styles.earnTitle}>Complete Lessons</Text>
            <Text style={styles.earnSubtitle}>Earn 1 gem per perfect lesson</Text>
            <Button
              title="Start Learning"
              onPress={() => {}}
              variant="primary"
              style={styles.earnButton}
            />
          </Card>
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
    padding: Spacing.base,
    paddingBottom: Spacing.xxxl,
  },
  header: {
    paddingVertical: Spacing.lg,
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
  balanceCard: {
    backgroundColor: Colors.gems + '10',
    borderColor: Colors.gems,
    marginBottom: Spacing.xl,
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceEmoji: {
    fontSize: 48,
    marginRight: Spacing.base,
  },
  balanceText: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  balanceValue: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  itemsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  itemCard: {
    marginBottom: Spacing.sm,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  itemEmoji: {
    fontSize: 32,
  },
  itemInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  itemTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  itemDescription: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  priceIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  priceText: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.gems,
  },
  earnSection: {
    marginBottom: Spacing.xl,
  },
  earnCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  earnEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  earnTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  earnSubtitle: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.base,
  },
  earnButton: {
    minWidth: 150,
  },
});

