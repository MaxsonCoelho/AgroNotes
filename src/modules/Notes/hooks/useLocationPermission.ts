import { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
} from 'react-native-permissions';

export function useUserLocationPermission(onDeniedPermanently: () => void) {
  const [isGranted, setIsGranted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | null>(null);

  const permissionType =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  const evaluatePermission = useCallback(async () => {
    const result = await check(permissionType);
    setPermissionStatus(result);

    if (result === RESULTS.GRANTED) {
      setIsGranted(true);
    } else if (result === RESULTS.DENIED) {
      const newStatus = await request(permissionType);
      setPermissionStatus(newStatus);

      if (newStatus === RESULTS.GRANTED) {
        setIsGranted(true);
      } else if (newStatus === RESULTS.BLOCKED) {
        onDeniedPermanently();
      }
    } else if (result === RESULTS.BLOCKED) {
      onDeniedPermanently();
    }

    setLoading(false);
  }, [onDeniedPermanently, permissionType]);

  useEffect(() => {
    evaluatePermission();
  }, [evaluatePermission]);

  return {
    isGranted,
    loading,
    permissionStatus,
  };
}
