import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/design_system/theme';

interface Props {
  height?: number;
  color?: keyof typeof theme.colors;
  marginVertical?: number;
}

export const Divider = ({
  height = 1,
  color = 'border',
  marginVertical = theme.spacing.md,
}: Props) => (
  <View
    testID="divider"
    style={[
      styles.divider,
      {
        height,
        backgroundColor: theme.colors[color],
        marginVertical,
      },
    ]}
  />
);

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});
