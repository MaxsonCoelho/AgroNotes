import React from 'react';
import { View, ViewProps } from 'react-native';

const SvgMock: React.FC<ViewProps & { testID?: string }> = (props) => {
  return <View {...props} testID={props.testID || 'icon-svg'} />;
};

export default SvgMock;
