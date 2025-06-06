// src/design_system/components/molecules/__tests__/IconButton.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { IconButton } from '../IconButton';
import { theme } from '@/design_system/theme';

describe('IconButton', () => {
  it('deve renderizar com ícone e tamanho padrão', () => {
    const { getByTestId } = render(
      <IconButton icon="add" onPress={jest.fn()} />
    );

    const button = getByTestId('icon-button');
    const styles = Array.isArray(button.props.style) ? button.props.style.flat() : [button.props.style];

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 56,
          height: 56,
          backgroundColor: theme.colors.primary,
        }),
      ])
    );
  });

  it('deve chamar onPress ao tocar', () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <IconButton icon="sync" onPress={onPressMock} />
    );

    fireEvent.press(getByTestId('icon-button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar estilos customizados', () => {
    const { getByTestId } = render(
      <IconButton
        icon="back"
        onPress={jest.fn()}
        size={40}
        backgroundColor="success"
        style={{ margin: 10 }}
      />
    );

    const button = getByTestId('icon-button');
    const styles = Array.isArray(button.props.style) ? button.props.style.flat() : [button.props.style];

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: theme.colors.success,
        }),
        expect.objectContaining({ margin: 10 }),
      ])
    );
  });
});
