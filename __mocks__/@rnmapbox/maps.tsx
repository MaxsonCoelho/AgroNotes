import React from 'react';
import { View, Text } from 'react-native';

export const PointAnnotation = ({ children, id, coordinate }: any) => (
  <View
    testID="PointAnnotation"
    accessibilityLabel={`point-annotation-${id}`}
    accessibilityHint={JSON.stringify(coordinate)}
  >
    {children}
  </View>
);

export const Callout = ({ title }: { title: string }) => (
  <Text testID="Callout">{title}</Text>
);

const MapboxGL = {
  __esModule: true,
  default: {
    PointAnnotation,
    Callout,
  },
  PointAnnotation,
  Callout,
};

export default MapboxGL;
