// __mocks__/@rnmapbox/maps.ts
import React from 'react';
import { View } from 'react-native';

export const PointAnnotation = ({ children }: any) => <View testID="mock-annotation">{children}</View>;
export const Callout = ({ children }: any) => <View testID="mock-callout">{children}</View>;

export default {
  PointAnnotation,
  Callout,
};
