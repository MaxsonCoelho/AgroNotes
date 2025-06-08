import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { theme } from '@/design_system/theme';

interface Props extends ActivityIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingIndicator = ({
  size = 'large',
  color = theme.colors.primary,
  ...rest
}: Props) => {
  return <ActivityIndicator testID="loading-indicator" size={size} color={color} {...rest} />;
};
