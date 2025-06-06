import React from 'react';
import MapboxGL from '@rnmapbox/maps';
import { View, StyleSheet } from 'react-native';
import { Note } from '@/modules/Notes/types/noteTypes';
import { theme } from '@/design_system/theme';

interface Props {
  note: Note;
}

export const MapPin = ({ note }: Props) => {
  const pinColor = note.synced
    ? theme.colors.placeholder 
    : theme.colors.success;    

  return (
    <MapboxGL.PointAnnotation
      id={note.id.toString()}
      coordinate={[note.location.longitude, note.location.latitude]}
    >
      <View style={[styles.pin, { backgroundColor: pinColor }]} />
      <MapboxGL.Callout title={`${note.annotation}\n${note.datetime}`} />
    </MapboxGL.PointAnnotation>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
