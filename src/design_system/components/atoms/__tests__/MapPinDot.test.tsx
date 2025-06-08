import React from 'react';
import { render } from '@testing-library/react-native';
import { MapPinDot } from '../MapPinDot';

describe('<MapPinDot />', () => {
  it('renderiza com a cor de fundo correta', () => {
    const { getByTestId } = render(<MapPinDot color="#FF0000" />);
    const pin = getByTestId('map-pin-dot');

    expect(pin).toBeTruthy();
    expect(pin.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: '#FF0000' }),
      ])
    );
  });

  it('aplica estilo adicional quando fornecido', () => {
    const customStyle = { marginTop: 10 };
    const { getByTestId } = render(
      <MapPinDot color="#00FF00" style={customStyle} />
    );
    const pin = getByTestId('map-pin-dot');

    expect(pin.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: '#00FF00' }),
        expect.objectContaining({ marginTop: 10 }),
      ])
    );
  });
});
