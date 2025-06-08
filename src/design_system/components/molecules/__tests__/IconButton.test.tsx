import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { IconButton } from '../IconButton';

describe('IconButton', () => {
  it('deve renderizar com ícone e tamanho padrão', () => {
    const { getByTestId } = render(<IconButton icon="add" onPress={() => {}} />);
    const button = getByTestId('IconButton-add');

    expect(button).toBeTruthy();

    const flatStyle = Array.isArray(button.props.style)
      ? Object.assign({}, ...button.props.style)
      : button.props.style;

    expect(flatStyle.width).toBe(56);
    expect(flatStyle.height).toBe(56);
    expect(flatStyle.borderRadius).toBe(28);
  });

  it('deve chamar onPress ao tocar', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<IconButton icon="sync" onPress={onPressMock} />);
    fireEvent.press(getByTestId('IconButton-sync'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar estilos customizados', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <IconButton icon="back" onPress={() => {}} style={customStyle} />
    );

    const button = getByTestId('IconButton-back');

    const flatStyle = Array.isArray(button.props.style)
      ? Object.assign({}, ...button.props.style)
      : button.props.style;

    expect(flatStyle.backgroundColor).toBe('red');
  });
});
