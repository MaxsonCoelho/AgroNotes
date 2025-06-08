import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import MapScreen from '../MapScreen';
import * as hooks from '../../hooks/useUserLocation';
import * as permissionHook from '../../hooks/useLocationPermission';
import { NavigationContainer } from '@react-navigation/native';

// Mock hooks
jest.mock('@/modules/Notes/hooks/useUserLocation', () => ({
  useUserLocation: jest.fn(),
}));
jest.mock('@/modules/Notes/hooks/useLocationPermission', () => ({
  useLocationPermission: jest.fn(),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      replace: jest.fn(),
    }),
  };
});

describe('MapScreen', () => {
  beforeEach(() => {
    (hooks.useUserLocation as jest.Mock).mockReturnValue({
      location: { latitude: -10, longitude: -50 },
      loading: false,
    });

    (permissionHook.useLocationPermission as jest.Mock).mockReturnValue({
      isGranted: true,
      loading: false,
    });
  });

  it('renderiza o mapa quando permissões e localização estão prontas', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <MapScreen />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByTestId('map-screen-content')).toBeTruthy();
    });
  });

  it('exibe loading enquanto a localização é carregada', () => {
    (hooks.useUserLocation as jest.Mock).mockReturnValue({
      location: null,
      loading: true,
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <MapScreen />
      </NavigationContainer>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
