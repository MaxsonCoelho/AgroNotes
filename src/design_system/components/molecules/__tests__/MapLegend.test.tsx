import React from 'react';
import { render } from '@testing-library/react-native';
import { MapLegend } from '../MapLegend';
import { theme } from '@/design_system/theme';

describe('<MapLegend />', () => {
  it('renderiza os rótulos corretamente', () => {
    const { getByText } = render(<MapLegend />);

    expect(getByText('Sincronizado')).toBeTruthy();
    expect(getByText('Não sincronizado')).toBeTruthy();
  });

  it('renderiza os pontos de pin com as cores corretas', () => {
    const { getAllByTestId } = render(<MapLegend />);
    const pins = getAllByTestId('map-pin-dot');

    // O primeiro deve ter cor "placeholder"
    expect(pins[0].props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: theme.colors.placeholder }),
      ])
    );

    // O segundo deve ter cor "success"
    expect(pins[1].props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: theme.colors.success }),
      ])
    );
  });
});
