import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/design_system/theme';
import { LoadingIndicator, ProgressBar, Text } from '@/design_system/components';

interface Props {
  visible: boolean;
  progress?: number; // opcional, de 0 a 1
}

export const SyncOverlay = ({ visible, progress = 0 }: Props) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LoadingIndicator />
      <Text style={styles.text}>Sincronização em andamento...</Text>
      <ProgressBar progress={progress} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background + 'EE',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    paddingHorizontal: 32,
  },
  text: {
    marginTop: 16,
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
});