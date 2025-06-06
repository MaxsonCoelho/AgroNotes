import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormTextArea } from '../FormTextArea';

describe('FormTextArea', () => {
  it('deve renderizar o label e o valor inicial', () => {
    const { getByText, getByDisplayValue } = render(
      <FormTextArea
        label="Descrição"
        value="Texto inicial"
        onChangeText={jest.fn()}
        placeholder="Digite aqui"
      />
    );

    expect(getByText('Descrição')).toBeTruthy();
    expect(getByDisplayValue('Texto inicial')).toBeTruthy();
  });

  it('deve chamar onChangeText ao alterar o texto', () => {
    const mockOnChange = jest.fn();

    const { getByPlaceholderText } = render(
      <FormTextArea
        label="Observações"
        value=""
        onChangeText={mockOnChange}
        placeholder="Digite algo..."
      />
    );

    const input = getByPlaceholderText('Digite algo...');
    fireEvent.changeText(input, 'Novo texto');

    expect(mockOnChange).toHaveBeenCalledWith('Novo texto');
  });
});
