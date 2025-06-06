import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '@/theme';

interface Props {
  progress: number; // de 0 a 1
}

export const ProgressBar = ({ progress }: Props) => {
  const width = new Animated.Value(progress * 100);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.bar, { width: `${progress * 100}%` }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.radius.full,
    overflow: 'hidden',
    marginTop: theme.spacing.md,
  },
  bar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
});
