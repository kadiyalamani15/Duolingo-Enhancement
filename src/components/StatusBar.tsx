import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '../constants/Colors';

export const StatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Only show on web
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.statusBar}>
      {/* Left side - Time */}
      <View style={styles.leftSection}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </View>

      {/* Right side - Icons */}
      <View style={styles.rightSection}>
        <Text style={styles.iconText}>••••</Text>
        <View style={styles.wifiIcon}>
          <Text style={styles.iconSymbol}>📶</Text>
        </View>
        <View style={styles.batteryContainer}>
          <View style={styles.battery}>
            <View style={styles.batteryLevel} />
          </View>
          <View style={styles.batteryTip} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9998,
  },
  leftSection: {
    flex: 1,
    paddingLeft: 10,
  },
  timeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.3,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 10,
  },
  iconText: {
    fontSize: 16,
    color: '#000000',
    marginRight: 2,
  },
  wifiIcon: {
    marginRight: 2,
  },
  iconSymbol: {
    fontSize: 12,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  battery: {
    width: 24,
    height: 11,
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 3,
    padding: 1.5,
  },
  batteryLevel: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 1.5,
  },
  batteryTip: {
    width: 1.5,
    height: 4,
    backgroundColor: '#000000',
    marginLeft: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
  },
});

