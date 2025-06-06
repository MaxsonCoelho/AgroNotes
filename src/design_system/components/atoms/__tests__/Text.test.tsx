// src/design_system/components/atoms/__tests__/Text.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from '../Text';
import { theme } from '@/design_system/theme';

describe('Text', () => {
  const getFilteredStyle = (element: any) => {
    const style = element.props.style;
    return Array.isArray(style)
      ? style.flat().filter(Boolean)
      : [style];
  };

  it('deve renderizar o conteúdo corretamente', () => {
    const { getByText } = render(<Text>Olá, mundo!</Text>);
    expect(getByText('Olá, mundo!')).toBeTruthy();
  });

  it('deve aplicar o estilo default (body, text, left)', () => {
    const { getByText } = render(<Text>Texto padrão</Text>);
    const element = getByText('Texto padrão');
    const styles = getFilteredStyle(element);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: theme.typography.body.fontSize,
          fontWeight: theme.typography.body.fontWeight,
          fontFamily: theme.typography.fontFamily,
        }),
        expect.objectContaining({
          color: theme.colors.text,
          textAlign: 'left',
        }),
      ])
    );
  });

  it('deve aplicar a variant "heading" e alinhamento "center"', () => {
    const { getByText } = render(
      <Text variant="heading" align="center">Título</Text>
    );
    const element = getByText('Título');
    const styles = getFilteredStyle(element);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: theme.typography.heading.fontSize,
          fontWeight: theme.typography.heading.fontWeight,
          fontFamily: theme.typography.fontFamily,
        }),
        expect.objectContaining({
          color: theme.colors.text,
          textAlign: 'center',
        }),
      ])
    );
  });

  it('deve aplicar cor customizada', () => {
    const { getByText } = render(
      <Text color="primary">Com cor primária</Text>
    );
    const element = getByText('Com cor primária');
    const styles = getFilteredStyle(element);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: theme.colors.primary,
        }),
      ])
    );
  });
});
