import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { useThemeAwareObject } from '../theme/hooks';
import { Theme } from '../theme/types';
import { center } from '../theme/common';

type Variant = 'primary' | 'secondary';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const Button: FC<ButtonProps> = (props) => {
  const { label, onPress, variant = 'primary', style, labelStyle, disabled = false } = props;
  const themedVariants = useThemeAwareObject(variants(disabled));
  const themedStyles = useThemeAwareObject(styles);
  const variantStyles = themedVariants[variant];

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[variantStyles.container, themedStyles.container, style]}
      onPress={onPress}
    >
      <Text adjustsFontSizeToFit numberOfLines={1} style={[variantStyles.label, themedStyles.label, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface ButtonVariant {
  label: TextStyle;
  container: ViewStyle;
}

const variants =
  (disabled: boolean) =>
  (theme: Theme): Record<Variant, ButtonVariant> => {
    return {
      primary: {
        container: {
          borderColor: disabled ? theme.colors.disabled : theme.colors.primary,
          backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary,
        },
        label: {
          color: theme.colors.white,
        },
      },
      secondary: {
        container: {
          borderColor: disabled ? theme.colors.disabled : theme.colors.primary,
          backgroundColor: theme.colors.white,
        },
        label: {
          color: disabled ? theme.colors.disabled : theme.colors.primary,
        },
      },
    };
  };

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      height: 46,
      borderRadius: 23,
      paddingHorizontal: 34,
      borderWidth: 2,
      ...center,
      ...theme.boxShadows.m,
    },
    label: {
      textTransform: 'uppercase',
      ...theme.fonts.primary.bold,
      ...theme.fontSizes.m,
    },
  });
};

export default Button;
