import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Alert } from '../Alert';
import { theme } from '@/design_system/theme';

jest.useFakeTimers();

describe('<Alert />', () => {
  it('renderiza com título e mensagem personalizados', () => {
    const { getByText } = render(
      <Alert title="Atenção" message="Algo aconteceu" type="info" />
    );

    expect(getByText('Atenção')).toBeTruthy();
    expect(getByText('Algo aconteceu')).toBeTruthy();
  });

  it('exibe título padrão de sucesso quando não é passado', () => {
    const { getByText } = render(
      <Alert message="Sucesso ao salvar" type="success" />
    );

    expect(getByText('Sucesso')).toBeTruthy();
    expect(getByText('Sucesso ao salvar')).toBeTruthy();
  });

  it('exibe título padrão de erro quando não é passado', () => {
    const { getByText } = render(
      <Alert message="Falha ao salvar" type="error" />
    );

    expect(getByText('Erro')).toBeTruthy();
    expect(getByText('Falha ao salvar')).toBeTruthy();
  });

  it('chama onClose após o tempo padrão', () => {
    const onClose = jest.fn();

    render(<Alert message="Fechando..." onClose={onClose} />);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Como a animação é assíncrona, forçamos todas as promises a concluírem
    act(() => {
      jest.runAllTimers();
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('chama onClose após tempo customizado', () => {
    const onClose = jest.fn();

    render(<Alert message="Timeout personalizado" onClose={onClose} duration={2000} />);

    act(() => {
      jest.advanceTimersByTime(2000);
      jest.runAllTimers();
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('aplica a cor correta para o tipo "success"', () => {
    const { getByTestId } = render(
      <Alert message="Mensagem de sucesso" type="success" />
    );

    const container = getByTestId('alert-container');

    expect(container.props.style).toMatchObject({
      backgroundColor: theme.colors.success,
    });
  });
});
