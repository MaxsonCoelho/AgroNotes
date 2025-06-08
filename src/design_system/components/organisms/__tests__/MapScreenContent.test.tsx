import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MapScreenContent } from '../MapScreenContent';
import { Note } from '@/modules/Notes/types/noteTypes';
import MapboxGL from '@rnmapbox/maps';

jest.mock('@rnmapbox/maps', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: {
      MapView: ({ children, ...props }: any) => <>{children}</>,
      UserLocation: ({ onUpdate }: any) => {
        // Simula localização do usuário
        React.useEffect(() => {
          onUpdate({ coords: { latitude: -3.1, longitude: -60.0 } });
        }, []);
        return null;
      },
      Camera: () => null,
      PointAnnotation: ({ children }: any) => <>{children}</>,
      Callout: ({ children }: any) => <>{children}</>,
    },
  };
});

jest.mock('../../molecules/MapLegend.tsx', () => ({
  MapLegend: () => <></>,
}));

jest.mock('@/design_system/components/atoms/Icon', () => ({
  Icon: ({ name }: { name: string }) => <>{name}</>,
}));

describe('MapScreenContent', () => {
  const mockNotes: Note[] = [
    {
      id: 1,
      annotation: 'Nota de teste',
      datetime: '2025-06-08 12:00:00',
      location: { latitude: -3.1, longitude: -60.01 },
      synced: false,
    },
  ];

  const baseProps = {
    notes: mockNotes,
    userLocation: { latitude: -3.1, longitude: -60.0 },
    onAddPress: jest.fn(),
    onSyncPress: jest.fn(),
    pinMode: false,
    onTogglePinMode: jest.fn(),
    selectedLocation: null,
    onSelectLocation: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza corretamente com todos os elementos principais', () => {
    const { getByTestId, getByTestId: id } = render(
      <MapScreenContent {...baseProps} />
    );

    expect(getByTestId('map-screen-content')).toBeTruthy();
    expect(id('IconButton-add')).toBeTruthy();
    expect(id('IconButton-sync')).toBeTruthy();
    expect(id('IconButton-pin')).toBeTruthy();
  });

  it('chama onAddPress ao tocar no botão "add"', () => {
    const { getByTestId } = render(<MapScreenContent {...baseProps} />);
    fireEvent.press(getByTestId('IconButton-add'));
    expect(baseProps.onAddPress).toHaveBeenCalled();
  });

  it('chama onSyncPress ao tocar no botão "sync"', () => {
    const { getByTestId } = render(<MapScreenContent {...baseProps} />);
    fireEvent.press(getByTestId('IconButton-sync'));
    expect(baseProps.onSyncPress).toHaveBeenCalled();
  });

  it('chama onTogglePinMode ao tocar no botão "pin"', () => {
    const { getByTestId } = render(<MapScreenContent {...baseProps} />);
    fireEvent.press(getByTestId('IconButton-pin'));
    expect(baseProps.onTogglePinMode).toHaveBeenCalled();
  });

  it('chama onSelectLocation quando pinMode é falso e localização é atualizada', () => {
    const onSelectLocation = jest.fn();

    render(
      <MapScreenContent
        {...baseProps}
        onSelectLocation={onSelectLocation}
        selectedLocation={null}
      />
    );

    // useEffect simulado no mock já chama onUpdate com localização válida
    expect(onSelectLocation).toHaveBeenCalledWith([-60.0, -3.1]);
  });

  it('não chama onSelectLocation se pinMode estiver ativo', () => {
    const onSelectLocation = jest.fn();

    render(
      <MapScreenContent
        {...baseProps}
        pinMode={true}
        selectedLocation={[0, 0]} 
        onSelectLocation={onSelectLocation}
      />
    );

    expect(onSelectLocation).not.toHaveBeenCalled();
  });

  it('mostra pino de anotação com conteúdo correto', () => {
    const { getByText } = render(<MapScreenContent {...baseProps} />);
    expect(getByText('Nota de teste')).toBeTruthy();
    expect(getByText('08/06/2025 12:00')).toBeTruthy();
  });
});
