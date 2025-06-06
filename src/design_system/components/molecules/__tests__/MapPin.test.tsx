// src/design_system/components/molecules/__tests__/MapPin.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { MapPin } from '../MapPin';
import { Note } from '@/modules/Notes/types/noteTypes';

describe('MapPin', () => {
  const mockNote: Note = {
    id: 1,
    annotation: 'Teste de anotação',
    datetime: '2025-06-06 10:00',
    location: {
      latitude: -3.123,
      longitude: -60.023,
    },
    synced: false,
  };

  it('deve renderizar o pin com os dados corretos', () => {
    const { getByTestId } = render(<MapPin note={mockNote} />);
    const annotation = getByTestId('PointAnnotation');
    const callout = getByTestId('Callout');

    // Não podemos acessar props diretamente, então usamos texto
    expect(callout.props.children).toContain('Teste de anotação');
    expect(callout.props.children).toContain('2025-06-06 10:00');
  });
});
