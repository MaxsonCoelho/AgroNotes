import React from 'react';
import { render } from '@testing-library/react-native';
import { Divider } from '../Divider';
import { theme } from '@/design_system/theme';

describe('Divider', () => {
  it('deve renderizar com os estilos padrão', () => {
    const { getByTestId } = render(<Divider />);
    const divider = getByTestId('divider');

    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: 1,
          backgroundColor: theme.colors.border,
          marginVertical: theme.spacing.md,
        }),
      ])
    );
  });

  it('deve aceitar props personalizados', () => {
    const { getByTestId } = render(
      <Divider height={4} color="primary" marginVertical={8} />
    );
    const divider = getByTestId('divider');

    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: 4,
          backgroundColor: theme.colors.primary,
          marginVertical: 8,
        }),
      ])
    );
  });
});
