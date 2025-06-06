import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AddNoteScreenContent } from '../AddNoteScreenContent';

describe('AddNoteScreenContent', () => {
  const mockSetAnnotation = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnBack = jest.fn();

  const defaultProps = {
    annotation: 'Anotação inicial',
    setAnnotation: mockSetAnnotation,
    onSave: mockOnSave,
    onBack: mockOnBack,
  };

  it('deve renderizar o conteúdo corretamente', () => {
    const { getByText, getByPlaceholderText } = render(
      <AddNoteScreenContent {...defaultProps} />
    );

    expect(getByText('Anotação')).toBeTruthy();
    expect(getByPlaceholderText('Digite sua anotação aqui...')).toBeTruthy();
    expect(getByText('Salvar')).toBeTruthy();
    expect(getByText('Voltar')).toBeTruthy();
  });

  it('deve chamar setAnnotation quando o texto mudar', () => {
    const { getByPlaceholderText } = render(
      <AddNoteScreenContent {...defaultProps} />
    );

    const input = getByPlaceholderText('Digite sua anotação aqui...');
    fireEvent.changeText(input, 'Nova anotação');
    expect(mockSetAnnotation).toHaveBeenCalledWith('Nova anotação');
  });

  it('deve chamar onSave ao pressionar "Salvar"', () => {
    const { getByText } = render(<AddNoteScreenContent {...defaultProps} />);
    fireEvent.press(getByText('Salvar'));
    expect(mockOnSave).toHaveBeenCalled();
  });

  it('deve chamar onBack ao pressionar "Voltar"', () => {
    const { getByText } = render(<AddNoteScreenContent {...defaultProps} />);
    fireEvent.press(getByText('Voltar'));
    expect(mockOnBack).toHaveBeenCalled();
  });
});
