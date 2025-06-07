import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { theme } from '@/design_system/theme';

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = ({ label, onPress, disabled, style, textStyle }: Props) => {
  return (
    <TouchableOpacity
      testID="icon-button"
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  text: {
    color: theme.colors.shape,
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight as any,
    fontFamily: theme.typography.fontFamily,
  },
  disabled: {
    backgroundColor: theme.colors.border,
  },
});
