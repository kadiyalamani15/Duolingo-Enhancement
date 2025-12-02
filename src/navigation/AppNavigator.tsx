import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { LessonScreen } from '../screens/LessonScreen';

export type RootStackParamList = {
  Main: undefined;
  Lesson: { lessonId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen 
        name="Lesson" 
        component={LessonScreen}
        options={{
          presentation: 'fullScreenModal',
        }}
      />
    </Stack.Navigator>
  );
};

