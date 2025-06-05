import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import { theme } from '@/theme';

type Variant = 'heading' | 'body' | 'caption';

interface Props extends TextProps {
  children: React.ReactNode;
  variant?: Variant;
  color?: keyof typeof theme.colors;
  align?: 'left' | 'center' | 'right';
}

export const Text = ({
  children,
  variant = 'body',
  color = 'text',
  align = 'left',
  style,
  ...rest
}: Props) => {
  return (
    <RNText
      style={[
        styles[variant],
        { color: theme.colors[color], textAlign: align },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight as any,
    fontFamily: theme.typography.fontFamily,
  },
  body: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight as any,
    fontFamily: theme.typography.fontFamily,
  },
  caption: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight as any,
    fontFamily: theme.typography.fontFamily,
  },
});
