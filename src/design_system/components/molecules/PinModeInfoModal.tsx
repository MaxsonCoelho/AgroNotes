import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { theme } from '@/design_system/theme';
import { setStorage } from '@/services/storage';

interface Props {
  visible: boolean;
  onClose: (dontShowAgain: boolean) => void;
  title: string;
  description: string;
  buttonLabel?: string;
  activeCheck?: boolean;
}

export const PinModeInfoModal = ({
  visible,
  onClose,
  title,
  description,
  buttonLabel = 'Entendi',
  activeCheck = true
}: Props) => {
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

  const handleConfirm = async () => {
    if (dontShowAgain) {
      await setStorage('hide_pin_mode_info', true);
    }
    onClose(dontShowAgain);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{description}</Text>

          {activeCheck && (
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setDontShowAgain(prev => !prev)}
              >
                <View style={[styles.checkbox, dontShowAgain && styles.checkboxChecked]} />
                <Text style={styles.checkboxLabel}>Não mostrar essa mensagem novamente</Text>
              </TouchableOpacity>
          )}

          <Pressable style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0008',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxWidth: 360,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.text,
  },
  text: {
    fontSize: 15,
    color: theme.colors.text,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
  },
  checkboxLabel: {
    fontSize: 13,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
