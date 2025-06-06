import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingIndicator } from '../LoadingIndicator';
import { theme } from '@/design_system/theme';

describe('LoadingIndicator', () => {
  it('deve renderizar com os valores padrão', () => {
    const { getByTestId } = render(<LoadingIndicator testID="loading" />);
    const indicator = getByTestId('loading');

    expect(indicator.props.size).toBe('large');
    expect(indicator.props.color).toBe(theme.colors.primary);
  });

  it('deve aceitar props personalizados', () => {
    const { getByTestId } = render(
      <LoadingIndicator testID="loading" size="small" color="red" />
    );
    const indicator = getByTestId('loading');

    expect(indicator.props.size).toBe('small');
    expect(indicator.props.color).toBe('red');
  });
});
