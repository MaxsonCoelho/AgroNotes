import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AddNoteScreenContent } from '../AddNoteScreenContent';
import { useForm, FormProvider } from 'react-hook-form';

const Wrapper: React.FC<{ children: React.ReactNode; defaultValues: any }> = ({
  children,
  defaultValues,
}) => {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('AddNoteScreenContent', () => {
  const mockOnSave = jest.fn();

  const defaultValues = { annotation: 'Anotação inicial' };

  const renderWithForm = () =>
    render(
      <AddNoteScreenContent onSave={mockOnSave} />,
      {
        wrapper: ({ children }) => (
          <Wrapper defaultValues={defaultValues}>{children}</Wrapper>
        ),
      }
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o conteúdo corretamente', () => {
    const { getByText, getByPlaceholderText } = renderWithForm();

    expect(getByText('Anotação')).toBeTruthy();
    expect(getByPlaceholderText('Digite sua anotação aqui...')).toBeTruthy();
    expect(getByText('Salvar')).toBeTruthy();
  });

  it('deve atualizar o valor do campo ao digitar', () => {
    const { getByPlaceholderText } = renderWithForm();

    const input = getByPlaceholderText('Digite sua anotação aqui...');
    fireEvent.changeText(input, 'Nova anotação');

    expect(input.props.value).toBe('Nova anotação');
  });

  it('deve chamar onSave ao pressionar "Salvar"', () => {
    const { getByText } = renderWithForm();
    fireEvent.press(getByText('Salvar'));
    expect(mockOnSave).toHaveBeenCalled();
  });

  it('deve chamar onSave ao pressionar o botão de salvar', () => {
    const { getByTestId } = renderWithForm();
    fireEvent.press(getByTestId('icon-button'));
    expect(mockOnSave).toHaveBeenCalled();
  });
  
});