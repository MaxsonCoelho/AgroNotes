import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '@/design_system/components/atoms/Text';
import { TextArea } from '@/design_system/components/atoms/TextArea';
import { theme } from '@/design_system/theme';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const FormTextArea = ({
  label,
  value,
  onChangeText,
  placeholder,
  style,
}: Props) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Text variant="body" style={styles.label}>
        {label}
      </Text>
      <TextArea
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
});
