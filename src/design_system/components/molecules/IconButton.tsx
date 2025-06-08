import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Icon } from '@/design_system/components/atoms/Icon';
import { theme } from '@/design_system/theme';

interface Props {
  icon: 'add' | 'sync' | 'back' | 'pin';
  onPress: () => void;
  size?: number;
  backgroundColor?: keyof typeof theme.colors | 'transparent';
  style?: ViewStyle;
}

export const IconButton = ({
  icon,
  onPress,
  size = 56,
  backgroundColor = 'primary',
  style,
}: Props) => {
  const bgColor =
    backgroundColor === 'transparent'
      ? 'transparent'
      : theme.colors[backgroundColor];

  const isPinMode = icon === 'pin';

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
          backgroundColor: bgColor,
          shadowColor:
            backgroundColor === 'transparent' ? 'transparent' : theme.colors.text,
          transform: isPinMode ? [{ scale: 1.08 }] : undefined,
          borderWidth: isPinMode ? 2 : 0,
          borderColor: 'transparent',
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      <Icon
        name={icon}
        size={28}
        color={backgroundColor === 'transparent' ? theme.colors.text : 'white'}
        style={isPinMode ? styles.pinIcon : undefined}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  pinIcon: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
});
