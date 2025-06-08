import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { PinModeInfoModal } from '../PinModeInfoModal';
import { setStorage } from '@/services/storage';

// Mock do serviço de armazenamento
jest.mock('@/services/storage', () => ({
  setStorage: jest.fn(),
}));

describe('<PinModeInfoModal />', () => {
  const defaultProps = {
    visible: true,
    onClose: jest.fn(),
    title: 'Modo de Pinagem',
    description: 'Toque para fixar anotações no mapa.',
    buttonLabel: 'Entendi',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza título, descrição e botão', () => {
    const { getByText } = render(<PinModeInfoModal {...defaultProps} />);

    expect(getByText('Modo de Pinagem')).toBeTruthy();
    expect(getByText('Toque para fixar anotações no mapa.')).toBeTruthy();
    expect(getByText('Entendi')).toBeTruthy();
    expect(getByText('Não mostrar essa mensagem novamente')).toBeTruthy();
  });

  it('executa onClose com `false` quando checkbox não está marcado', async () => {
    const { getByText } = render(<PinModeInfoModal {...defaultProps} />);
    fireEvent.press(getByText('Entendi'));

    await waitFor(() => {
      expect(defaultProps.onClose).toHaveBeenCalledWith(false);
      expect(setStorage).not.toHaveBeenCalled();
    });
  });

  it('marca o checkbox e chama setStorage + onClose com `true`', async () => {
    const { getByText, getByRole } = render(<PinModeInfoModal {...defaultProps} />);
    const checkboxLabel = getByText('Não mostrar essa mensagem novamente');

    fireEvent.press(checkboxLabel);
    fireEvent.press(getByText('Entendi'));

    await waitFor(() => {
      expect(setStorage).toHaveBeenCalledWith('hide_pin_mode_info', true);
      expect(defaultProps.onClose).toHaveBeenCalledWith(true);
    });
  });
});
