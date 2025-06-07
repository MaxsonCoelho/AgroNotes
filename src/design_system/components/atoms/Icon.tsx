import React from 'react';
import { SvgProps } from 'react-native-svg';
import { View } from 'react-native';

import AddIcon from '@/assets/icons/icon-add.svg';
import SyncIcon from '@/assets/icons/icon-sync.svg';
import BackIcon from '@/assets/icons/button-back.svg';
import Pin from '@/assets/icons/pin.svg';
import LeafIcon from '@/assets/icons/leaf.svg';

const icons = {
  add: AddIcon,
  sync: SyncIcon,
  back: BackIcon,
  leaf: LeafIcon,
  pin: Pin
};

type IconName = keyof typeof icons;

interface Props extends SvgProps {
  name: IconName;
  size?: number;
}

export const Icon = ({ name, size = 24, ...rest }: Props) => {
  const SvgIcon = icons[name];
  return (
    <View style={{ width: size, height: size }}>
      <SvgIcon testID="icon-svg" width={size} height={size} {...rest} />
    </View>
  );
};
