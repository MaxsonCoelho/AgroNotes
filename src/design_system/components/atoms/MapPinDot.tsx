import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  color: string;
  style?: ViewStyle;
}

export const MapPinDot = ({ color, style }: Props) => {
  return (
    <View style={[styles.pin, { backgroundColor: color }, style]} />
  );
};

const styles = StyleSheet.create({
  pin: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
