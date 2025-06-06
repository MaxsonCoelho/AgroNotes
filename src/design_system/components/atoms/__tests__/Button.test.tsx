import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('deve renderizar com o label', () => {
    const { getByText } = render(<Button label="Salvar" onPress={() => {}} />);
    expect(getByText('Salvar')).toBeTruthy();
  });

  it('deve chamar onPress ao ser pressionado', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<Button label="Salvar" onPress={mockPress} />);
    const button = getByText('Salvar');
    fireEvent.press(button);
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
