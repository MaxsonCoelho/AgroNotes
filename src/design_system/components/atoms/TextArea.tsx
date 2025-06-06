import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
} from 'react-native';
import { theme } from '@/design_system/theme';

export const TextArea = (props: TextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        multiline
        numberOfLines={5}
        placeholderTextColor={theme.colors.placeholder}
        style={[styles.textArea, props.style]}
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.shape,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
  },
  textArea: {
    fontSize: theme.typography.body.fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.text,
    padding: theme.spacing.md,
  },
});
