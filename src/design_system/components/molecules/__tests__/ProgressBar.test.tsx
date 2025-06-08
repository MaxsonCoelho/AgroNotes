import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  it('renderiza corretamente', () => {
    const { getByTestId } = render(<ProgressBar progress={0.5} />);
    const progressBar = getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();
  });

  it('aplica corretamente a largura proporcional ao progresso', () => {
    const { getByTestId } = render(<ProgressBar progress={0.25} />);
    const progressBar = getByTestId('progress-bar');
    const style = progressBar.props.style;

    // Extrai o estilo mesclado (array ou objeto)
    const widthStyle = Array.isArray(style) ? style.find(s => s.width) : style;

    expect(widthStyle.width).toBe('25%');
  });

  it('renderiza com largura 0% quando progress é 0', () => {
    const { getByTestId } = render(<ProgressBar progress={0} />);
    const progressBar = getByTestId('progress-bar');
    const style = progressBar.props.style;

    const widthStyle = Array.isArray(style) ? style.find(s => s.width) : style;

    expect(widthStyle.width).toBe('0%');
  });

  it('renderiza com largura 100% quando progress é 1', () => {
    const { getByTestId } = render(<ProgressBar progress={1} />);
    const progressBar = getByTestId('progress-bar');
    const style = progressBar.props.style;

    const widthStyle = Array.isArray(style) ? style.find(s => s.width) : style;

    expect(widthStyle.width).toBe('100%');
  });
});
