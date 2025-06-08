import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { Feature, Geometry, Point } from 'geojson';

import { MapPin, IconButton, Icon } from '@/design_system/components';
import { Note } from '@/modules/Notes/types/noteTypes';

interface Props {
  notes: Note[];
  userLocation: {
    latitude: number;
    longitude: number;
  };
  onAddPress: () => void;
  onSyncPress: () => void;
  pinMode: boolean;
  onTogglePinMode: () => void;
  selectedLocation: [number, number] | null;
  onSelectLocation: (coords: [number, number] | null) => void;
}

export const MapScreenContent = ({
  notes,
  userLocation,
  onAddPress,
  onSyncPress,
  pinMode,
  onTogglePinMode,
  selectedLocation,
  onSelectLocation,
}: Props) => {
  const [annotationKey, setAnnotationKey] = useState(0);
  const [liveUserLocation, setLiveUserLocation] = useState<[number, number] | null>(null);
  const mapViewRef = useRef<MapboxGL.MapView>(null);

  const userCoords: [number, number] = [userLocation.longitude, userLocation.latitude];

  // Inicializa com localização do usuário marcada se não houver selectedLocation
  useEffect(() => {
    if (!pinMode) {
      // Se a localização ao vivo estiver disponível, use ela como selectedLocation
      if (liveUserLocation) {
        onSelectLocation(liveUserLocation);
      }
    } else if (!selectedLocation) {
      // Somente limpa ao entrar no modo pin se ainda não foi definido nenhum ponto
      onSelectLocation(null);
    }

    setAnnotationKey(prev => prev + 1);
  }, [pinMode, liveUserLocation]);

  const handleMapPress = async (feature: Feature<Geometry>) => {
    if (!pinMode) return;

    if (feature.geometry.type === 'Point') {
      const point = feature.geometry as Point;
      const [longitude, latitude] = point.coordinates;
      const newCoords: [number, number] = [longitude, latitude];

      if (Platform.OS === 'android') {
        onSelectLocation(null);
        await new Promise(res => setTimeout(res, 30));
      }

      setAnnotationKey(prev => prev + 1);
      onSelectLocation(newCoords);
    }
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        ref={mapViewRef}
        style={styles.map}
        attributionEnabled={false}
        logoEnabled={false}
        onPress={handleMapPress}
      >
        <MapboxGL.UserLocation
          visible={!pinMode}
          showsUserHeadingIndicator={false}
          onUpdate={({ coords }) => {
            const newCoords: [number, number] = [coords.longitude, coords.latitude];
            const isValidCoords = newCoords[0] !== 0 && newCoords[1] !== 0;

            if (isValidCoords) {
              setLiveUserLocation(newCoords);
            }
          }}
        />

        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={selectedLocation ?? userCoords}
        />

        {notes.map((note) => (
          <MapPin key={note.id.toString()} note={note} />
        ))}

        {!pinMode && liveUserLocation && (
          <MapboxGL.PointAnnotation
            key="live-user-pin"
            id="live-user-pin"
            coordinate={liveUserLocation}
          >
            <View style={styles.pinContainer}>
              <Icon name="pin" size={50} style={[styles.pinShadow, { opacity: 0.8 }]} />
            </View>
          </MapboxGL.PointAnnotation>
        )}

        {selectedLocation && (
          <MapboxGL.PointAnnotation
            key={`pin-${annotationKey}`}
            id={`pin-${annotationKey}`}
            coordinate={selectedLocation}
          >
            <View style={styles.pinContainer}>
              <Icon name="pin" size={50} style={styles.pinShadow} />
            </View>
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>

      <IconButton
        icon="pin"
        onPress={onTogglePinMode}
        style={{
          ...styles.pinModeButton,
          ...(pinMode ? styles.pinModeActive : {}),
        }}
        backgroundColor={pinMode ? 'success' : 'default'}
      />

      <IconButton icon="add" onPress={onAddPress} style={styles.addButton} />
      <IconButton icon="sync" onPress={onSyncPress} backgroundColor="success" style={styles.syncButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  syncButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
  },
  pinModeButton: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
  },
  pinModeActive: {
    transform: [{ scale: 1.1 }],
  },
});
