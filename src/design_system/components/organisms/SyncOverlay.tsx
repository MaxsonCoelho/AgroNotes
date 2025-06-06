import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from '@/components';
import { theme } from '@/design_system/theme';
import { LoadingIndicator } from '@/components';

interface Props {
  visible: boolean;
}

export const SyncOverlay = ({ visible }: Props) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LoadingIndicator />
      <Text style={styles.text}>Sincronização em andamento...</Text>
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
  },
  text: {
    marginTop: 16,
    color: theme.colors.text,
    fontSize: 16,
  },
});