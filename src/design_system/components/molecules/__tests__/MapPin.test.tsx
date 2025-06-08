import React from 'react';
import { render } from '@testing-library/react-native';
import { MapPin } from '../MapPin';
import { Note } from '@/modules/Notes/types/noteTypes';
import dayjs from 'dayjs';

describe('MapPin', () => {
  const mockNote: Note = {
    id: 1,
    annotation: 'Teste de anotação',
    datetime: '2025-06-06T10:00:00Z',
    location: {
      latitude: -3.123,
      longitude: -60.023,
    },
    synced: false,
  };

  it('deve renderizar o pin com os dados corretos', () => {
    const { getByText } = render(<MapPin note={mockNote} />);

    expect(getByText('Teste de anotação')).toBeTruthy();

    const formattedDate = dayjs(mockNote.datetime).format('DD/MM/YYYY HH:mm');
    expect(getByText(formattedDate)).toBeTruthy();
  });
});
