import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

import { MapPin, IconButton } from '@/components';
import { Note } from '@/modules/Notes/types/noteTypes';
import { theme } from '@/theme';

interface Props {
  notes: Note[];
  onAddPress: () => void;
  onSyncPress: () => void;
}

export const MapScreenContent = ({ notes, onAddPress, onSyncPress }: Props) => {
  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={
            notes.length > 0
              ? [notes[0].location.longitude, notes[0].location.latitude]
              : [-46.6333, -23.5505] // fallback para São Paulo
          }
        />

        {notes.map((note) => (
          <MapPin key={note.id.toString()} note={note} />
        ))}
      </MapboxGL.MapView>

      <IconButton
        icon="add"
        onPress={onAddPress}
        style={styles.addButton}
      />

      <IconButton
        icon="sync"
        onPress={onSyncPress}
        backgroundColor="success"
        style={styles.syncButton}
      />
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
});
