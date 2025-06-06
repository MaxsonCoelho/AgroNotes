import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  it('deve renderizar a barra com largura proporcional ao progresso', () => {
    const progress = 0.65;
    const { getByTestId } = render(<ProgressBar progress={progress} />);
    const bar = getByTestId('progress-bar');

    expect(bar.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: `${progress * 100}%`,
        }),
      ])
    );
  });
});
