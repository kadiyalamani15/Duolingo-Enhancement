import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LearnScreen } from '../screens/LearnScreen';
import { PracticeScreen } from '../screens/PracticeScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';
import { ShopScreen } from '../screens/ShopScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

const Tab = createBottomTabNavigator();

const getTabIcon = (routeName: string, focused: boolean) => {
  const iconMap: { [key: string]: string } = {
    Learn: '🏠',
    Practice: '🎯',
    Leaderboard: '🏆',
    Shop: '🛒',
    Profile: '👤',
  };

  return iconMap[routeName] || '•';
};

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icon = getTabIcon(route.name, focused);
          return <Text style={{ fontSize: 24 }}>{icon}</Text>;
        },
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          backgroundColor: Colors.white,
        },
        tabBarLabelStyle: {
          fontSize: Typography.xs,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

