import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { Feature, Geometry, Point } from 'geojson';

import { MapPin, IconButton, Icon } from '@/design_system/components';
import { Note } from '@/modules/Notes/types/noteTypes';

interface Props {
  notes: Note[];
  userLocation: [number, number];
  onAddPress: () => void;
  onSyncPress: () => void;
}

export const MapScreenContent = ({
  notes,
  userLocation,
  onAddPress,
  onSyncPress,
}: Props) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [annotationKey, setAnnotationKey] = useState(0);
  const mapViewRef = useRef<MapboxGL.MapView>(null);

  const handleMapPress = async (feature: Feature<Geometry>) => {
    if (feature.geometry.type === 'Point') {
      const point = feature.geometry as Point;
      const [longitude, latitude] = point.coordinates;
      const newCoords: [number, number] = [longitude, latitude];

      if (Platform.OS === 'android') {
        setSelectedLocation(null);
        await new Promise(res => setTimeout(res, 30));
      }

      setAnnotationKey(prev => prev + 1);
      setSelectedLocation(newCoords);
    }
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        ref={mapViewRef}
        style={styles.map}
        attributionEnabled={false}
        logoEnabled={false}
        onDidFinishLoadingMap={() => setMapLoaded(true)}
        onPress={(e) => handleMapPress(e)}
      >
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={userLocation}
        />

        {notes.map((note) => (
          <MapPin key={note.id.toString()} note={note} />
        ))}

        {selectedLocation && (
          <MapboxGL.PointAnnotation
            key={`pin-${annotationKey}`}
            id={`pin-${annotationKey}`}
            coordinate={selectedLocation}
          >
            <View style={styles.pinContainer}>
              <Icon name="pin" size={50} />
            </View>
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>

      <IconButton icon="add" onPress={onAddPress} style={styles.addButton} />
      <IconButton icon="sync" onPress={onSyncPress} backgroundColor="success" style={styles.syncButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
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
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
