import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Text } from '@/design_system/components/atoms/Text';
import { TextArea } from '@/design_system/components/atoms/TextArea';
import { theme } from '@/design_system/theme';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  style?: ViewStyle;
  textAreaStyle?: StyleProp<TextStyle>;
}

export const FormTextArea = ({
  name,
  label,
  placeholder,
  style,
  textAreaStyle,
}: Props) => {
  const { control, formState: { errors } } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <View style={[styles.wrapper, style]}>
      <Text variant="body" style={styles.label}>
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextArea
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            style={textAreaStyle}
          />
        )}
      />

      {errorMessage && (
        <Text variant="caption" style={styles.error}>
          {errorMessage}
        </Text>
      )}
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
  error: {
    color: theme.colors.danger || '#d00',
    marginTop: theme.spacing.xs,
  },
});
