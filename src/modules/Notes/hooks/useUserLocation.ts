import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { useLocationPermission } from './useLocationPermission'; 

type Coordinates = [number, number];

export const useUserLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { isGranted, loading: permissionLoading } = useLocationPermission(() => {
    setError('Permissão negada permanentemente.');
    setLoading(false);
  });

  useEffect(() => {
    if (!isGranted || permissionLoading) return;

    Geolocation.getCurrentPosition(
      (position: GeoPosition) => {
        setLocation([
          position.coords.longitude,
          position.coords.latitude,
        ]);
        setLoading(false);
      },
      (err) => {
        console.warn('Erro ao obter localização:', err);
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: Platform.OS === 'android',
      }
    );
  }, [isGranted, permissionLoading]);

  return { location, error, loading };
};
