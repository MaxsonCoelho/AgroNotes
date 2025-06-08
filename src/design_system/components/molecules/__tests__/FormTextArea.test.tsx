import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTextArea } from '../FormTextArea';

const Wrapper: React.FC<{ children: React.ReactNode; defaultValues: any }> = ({
  children,
  defaultValues,
}) => {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('FormTextArea', () => {
  it('deve renderizar o label e o valor inicial', () => {
    const defaultValues = { description: 'Texto inicial' };

    const { getByText, getByDisplayValue } = render(
      <FormTextArea name="description" label="Descrição" placeholder="Digite aqui" />,
      {
        wrapper: ({ children }) => <Wrapper defaultValues={defaultValues}>{children}</Wrapper>,
      }
    );

    expect(getByText('Descrição')).toBeTruthy();
    expect(getByDisplayValue('Texto inicial')).toBeTruthy();
  });

  it('deve chamar onChangeText ao alterar o texto', () => {
    const defaultValues = { description: '' };

    const { getByPlaceholderText } = render(
      <FormTextArea name="description" label="Descrição" placeholder="Digite aqui" />,
      {
        wrapper: ({ children }) => <Wrapper defaultValues={defaultValues}>{children}</Wrapper>,
      }
    );

    const input = getByPlaceholderText('Digite aqui');
    fireEvent.changeText(input, 'Novo texto');

    expect(input.props.value).toBe('Novo texto');
  });
});
