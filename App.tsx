import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { Colors } from './src/constants/Colors';

export default function App() {
  // Check if running on web
  const isWeb = Platform.OS === 'web';

  return (
    <SafeAreaProvider>
      <View style={isWeb ? styles.webContainer : styles.mobileContainer}>
        <View style={isWeb ? styles.phoneFrame : styles.fullScreen}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <AppNavigator />
          </NavigationContainer>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  mobileContainer: {
    flex: 1,
  },
  phoneFrame: {
    width: 430,
    height: 932,
    maxWidth: '100vw',
    maxHeight: '100vh',
    backgroundColor: Colors.white,
    borderRadius: 50,
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
