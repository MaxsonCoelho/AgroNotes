import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextArea } from '../TextArea';

describe('TextArea', () => {
  it('deve renderizar o placeholder corretamente', () => {
    const { getByPlaceholderText } = render(
      <TextArea placeholder="Digite sua anotação..." />
    );

    expect(getByPlaceholderText('Digite sua anotação...')).toBeTruthy();
  });

  it('deve renderizar o valor inicial', () => {
    const { getByDisplayValue } = render(
      <TextArea value="Texto inicial" />
    );

    expect(getByDisplayValue('Texto inicial')).toBeTruthy();
  });

  it('deve chamar o onChangeText ao digitar', () => {
    const mockFn = jest.fn();

    const { getByPlaceholderText } = render(
      <TextArea
        placeholder="Digite sua anotação..."
        onChangeText={mockFn}
      />
    );

    const input = getByPlaceholderText('Digite sua anotação...');
    fireEvent.changeText(input, 'Novo texto');

    expect(mockFn).toHaveBeenCalledWith('Novo texto');
  });

  it('deve possuir multiline, 5 linhas e alinhamento vertical ao topo', () => {
    const { getByPlaceholderText } = render(
      <TextArea placeholder="Multilinha" />
    );

    const input = getByPlaceholderText('Multilinha');

    expect(input.props.multiline).toBe(true);
    expect(input.props.numberOfLines).toBe(5);
    expect(input.props.textAlignVertical).toBe('top');
  });
});
