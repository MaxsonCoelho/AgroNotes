import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

import { MapPin, IconButton } from '@/design_system/components';
import { Note } from '@/modules/Notes/types/noteTypes';
import { theme } from '@/design_system/theme';

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
  const [mapLoaded, setMapLoaded] = React.useState(false);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        onDidFinishLoadingMap={() => setMapLoaded(true)}
      >
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={userLocation}
        />

        {mapLoaded && notes.map((note) => (
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
