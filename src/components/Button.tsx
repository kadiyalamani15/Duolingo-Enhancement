import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography, BorderRadius, Spacing } from '../constants/Typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BorderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    switch (size) {
      case 'small':
        baseStyle.paddingVertical = Spacing.sm;
        baseStyle.paddingHorizontal = Spacing.base;
        break;
      case 'large':
        baseStyle.paddingVertical = Spacing.lg;
        baseStyle.paddingHorizontal = Spacing.xl;
        break;
      default:
        baseStyle.paddingVertical = Spacing.md;
        baseStyle.paddingHorizontal = Spacing.lg;
    }

    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = Colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 2;
        baseStyle.borderColor = Colors.primary;
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
      default:
        baseStyle.backgroundColor = Colors.primary;
    }

    if (disabled) {
      baseStyle.opacity = 0.5;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: Typography.bold,
      color: Colors.white,
    };

    switch (size) {
      case 'small':
        baseStyle.fontSize = Typography.sm;
        break;
      case 'large':
        baseStyle.fontSize = Typography.xl;
        break;
      default:
        baseStyle.fontSize = Typography.base;
    }

    if (variant === 'outline' || variant === 'ghost') {
      baseStyle.color = Colors.primary;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.primary : Colors.white} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

