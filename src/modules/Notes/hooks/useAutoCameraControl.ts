import Mapbox from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';


type Coords = [number, number];

interface Props {
  selectedLocation: Coords | null;
  userCoords: Coords;
  cameraRef: React.RefObject<Mapbox.Camera | null>;
}

export function useAutoCameraControl({ selectedLocation, userCoords, cameraRef }: Props) {
  const [autoCameraEnabled, setAutoCameraEnabled] = useState(true);
  const lastInteractionTimestampRef = useRef(Date.now());
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimeout = () => {
    setAutoCameraEnabled(false);
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);

    idleTimeoutRef.current = setTimeout(() => {
      setAutoCameraEnabled(true);
      focusOnUser();
    }, 60_000);
  };

  const focusOnUser = (customCoords?: Coords) => {
    setAutoCameraEnabled(true);
    lastInteractionTimestampRef.current = Date.now();

    cameraRef.current?.setCamera({
      centerCoordinate: customCoords ?? selectedLocation ?? userCoords,
      zoomLevel: 16,
      animationMode: 'none',
    });
  };

  const onRegionDidChange = () => {
    lastInteractionTimestampRef.current = Date.now();
    setAutoCameraEnabled(false);
    resetIdleTimeout();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const inactiveFor = now - lastInteractionTimestampRef.current;

      if (!autoCameraEnabled && inactiveFor > 60000) {
        setAutoCameraEnabled(true);
        focusOnUser();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [autoCameraEnabled]);

  return {
    autoCameraEnabled,
    focusOnUser,
    onRegionDidChange,
  };
}
