import React from 'react';
import { render } from '@testing-library/react-native';
import { SyncOverlay } from '../SyncOverlay';

jest.mock('@/design_system/components', () => {
  const { View, Text, ActivityIndicator } = require('react-native');

  return {
    Text: ({ children, style }: any) => <Text style={style}>{children}</Text>,
    LoadingIndicator: () => <ActivityIndicator testID="LoadingIndicator" />,
  };
});

describe('SyncOverlay', () => {
  it('não deve renderizar nada quando visible é false', () => {
    const { queryByTestId, queryByText } = render(<SyncOverlay visible={false} />);
    expect(queryByTestId('LoadingIndicator')).toBeNull();
    expect(queryByText(/Sincronização/)).toBeNull();
  });

  it('deve renderizar o overlay com indicador e texto quando visible é true', () => {
    const { getByTestId, getByText } = render(<SyncOverlay visible={true} />);
    expect(getByTestId('LoadingIndicator')).toBeTruthy();
    expect(getByText('Sincronização em andamento...')).toBeTruthy();
  });
});
