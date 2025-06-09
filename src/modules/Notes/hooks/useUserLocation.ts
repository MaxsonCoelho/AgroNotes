import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Geolocation, { GeoPosition, GeoError } from 'react-native-geolocation-service';
import { useUserLocationPermission } from './useLocationPermission';

type UserCoordinates = {
  latitude: number;
  longitude: number;
};

export const useUserLocation = () => {
  const [location, setLocation] = useState<UserCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { isGranted, loading: permissionLoading } = useUserLocationPermission(() => {
    setError('Permissão negada permanentemente.');
    setLoading(false);
  });

  useEffect(() => {
    let watchId: number | null = null;

    if (!isGranted || permissionLoading) return;

    watchId = Geolocation.watchPosition(
      (position: GeoPosition) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      (err: GeoError) => {
        console.warn('Erro ao obter localização:', err);
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        showLocationDialog: Platform.OS === 'android',
      }
    );

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [isGranted, permissionLoading]);

  return {
    location,
    error,
    loading: loading || permissionLoading,
    isGranted,
  };
};
