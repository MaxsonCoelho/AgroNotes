import React from 'react';
import { render } from '@testing-library/react-native';
import { Icon } from '../Icon';

describe('Icon', () => {
  it('deve renderizar o ícone padrão "add" com tamanho padrão', () => {
    const { getByTestId } = render(<Icon name="add" />);
    const svg = getByTestId('icon-svg');

    expect(svg).toBeTruthy();
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);
  });

  it('deve renderizar o ícone "pin" com tamanho customizado', () => {
    const { getByTestId } = render(<Icon name="pin" size={40} />);
    const svg = getByTestId('icon-svg');

    expect(svg.props.width).toBe(40);
    expect(svg.props.height).toBe(40);
  });

  it('deve aceitar props extras como fill', () => {
    const { getByTestId } = render(<Icon name="leaf" fill="green" />);
    const svg = getByTestId('icon-svg');

    expect(svg.props.fill).toBe('green');
  });
});
