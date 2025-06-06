import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FormTextArea, Divider } from '@/design_system/components';
import { theme } from '@/design_system/theme';

interface Props {
  annotation: string;
  setAnnotation: (value: string) => void;
  onSave: () => void;
  onBack: () => void;
}

export const AddNoteScreenContent = ({
  annotation,
  setAnnotation,
  onSave,
  onBack,
}: Props) => {
  return (
    <View style={styles.container}>
      <FormTextArea
        label="Anotação"
        value={annotation}
        onChangeText={setAnnotation}
        placeholder="Digite sua anotação aqui..."
      />

      <Divider height={16} />

      <Button label="Salvar" onPress={onSave} />

      <Divider height={12} />

      <Button
        label="Voltar"
        onPress={onBack}
        style={{ backgroundColor: theme.colors.border }}
        textStyle={{ color: theme.colors.text }}
      />
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
