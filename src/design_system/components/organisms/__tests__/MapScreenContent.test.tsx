import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MapScreenContent } from '../MapScreenContent';
import { Note } from '@/modules/Notes/types/noteTypes';

// Mocks do Mapbox
jest.mock('@rnmapbox/maps', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  const MapView = ({ children }: any) => <View testID="MapView">{children}</View>;
  const Camera = ({ centerCoordinate }: any) => (
    <Text testID="Camera">{`Camera: ${centerCoordinate?.join(',')}`}</Text>
  );

  return {
    __esModule: true,
    default: {
      MapView,
      Camera,
    },
    MapView,
    Camera,
  };
});

// Mock de MapPin e IconButton
jest.mock('@/design_system/components', () => {
  const { Text, View, TouchableOpacity } = require('react-native');
  const originalModule = jest.requireActual('@/design_system/components');

  return {
    ...originalModule,
    MapPin: ({ note }: { note: Note }) => (
      <Text testID="MapPin">{note.annotation}</Text>
    ),
    IconButton: ({
      icon,
      onPress,
      accessibilityLabel,
    }: {
      icon: string;
      onPress: () => void;
      accessibilityLabel?: string;
    }) => (
      <TouchableOpacity
        testID={`IconButton-${icon}`}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel ?? icon}
      >
        <Text>{icon}</Text>
      </TouchableOpacity>
    ),
  };
});

describe('MapScreenContent', () => {
  const mockOnAddPress = jest.fn();
  const mockOnSyncPress = jest.fn();

  const mockNotes: Note[] = [
    {
      id: 1,
      annotation: 'Nota 1',
      datetime: '2023-01-01T12:00:00Z',
      location: { latitude: -23.55, longitude: -46.63 },
      synced: false,
    },
    {
      id: 2,
      annotation: 'Nota 2',
      datetime: '2023-01-02T14:30:00Z',
      location: { latitude: -23.56, longitude: -46.62 },
      synced: true,
    },
  ];

  it('deve renderizar o mapa, pins e botões corretamente', () => {
    const { getByTestId, getAllByTestId, getByText } = render(
      <MapScreenContent
        notes={mockNotes}
        onAddPress={mockOnAddPress}
        onSyncPress={mockOnSyncPress}
      />
    );

    expect(getByTestId('MapView')).toBeTruthy();
    expect(getByTestId('Camera')).toBeTruthy();
    expect(getAllByTestId('MapPin')).toHaveLength(2);
    expect(getByText('Nota 1')).toBeTruthy();
    expect(getByText('Nota 2')).toBeTruthy();
  });

  it('deve chamar onAddPress ao clicar no botão de adicionar', () => {
    const { getByLabelText } = render(
      <MapScreenContent
        notes={mockNotes}
        onAddPress={mockOnAddPress}
        onSyncPress={mockOnSyncPress}
      />
    );

    fireEvent.press(getByLabelText('add'));
    expect(mockOnAddPress).toHaveBeenCalled();
  });

  it('deve chamar onSyncPress ao clicar no botão de sincronizar', () => {
    const { getByLabelText } = render(
      <MapScreenContent
        notes={mockNotes}
        onAddPress={mockOnAddPress}
        onSyncPress={mockOnSyncPress}
      />
    );

    fireEvent.press(getByLabelText('sync'));
    expect(mockOnSyncPress).toHaveBeenCalled();
  });
});
