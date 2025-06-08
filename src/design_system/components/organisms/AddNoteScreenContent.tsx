import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FormTextArea, Divider } from '@/design_system/components';
import { useFormContext } from 'react-hook-form';
import { theme } from '@/design_system/theme';

interface Props {
  onSave: () => void;
}

export const AddNoteScreenContent = ({ onSave }: Props) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <View style={styles.container}>
      <FormTextArea
        name="annotation"
        label="Anotação"
        placeholder="Digite sua anotação aqui..."
        textAreaStyle={{
          minHeight: '50%',
          textAlignVertical: 'top',
          padding: theme.spacing.md,
          backgroundColor: theme.colors.shape,
          borderColor: theme.colors.border,
          borderWidth: 1,
          borderRadius: theme.radius.md,
          color: theme.colors.text,
        }}
      />

      <Divider height={1} />

      <Button
        label="Salvar"
        onPress={onSave}
        disabled={isSubmitting}
      />

      <Divider height={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
