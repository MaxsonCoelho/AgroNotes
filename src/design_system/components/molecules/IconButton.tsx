import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Icon } from '@/design_system/components/atoms/Icon';
import { theme } from '@/design_system/theme';

interface Props {
  icon: 'add' | 'sync' | 'back'; 
  onPress: () => void;
  size?: number;
  backgroundColor?: keyof typeof theme.colors;
  style?: ViewStyle;
}

export const IconButton = ({
  icon,
  onPress,
  size = 56,
  backgroundColor = 'primary',
  style,
}: Props) => {
  return (
    <TouchableOpacity
      testID="icon-button"
      onPress={onPress}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors[backgroundColor],
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      <Icon name={icon} size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
