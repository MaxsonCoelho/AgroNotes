import React from 'react';
import MapboxGL from '@rnmapbox/maps';
import { View, StyleSheet, Text } from 'react-native';
import { Note } from '@/modules/Notes/types/noteTypes';
import { theme } from '@/design_system/theme';
import { MapPinDot } from '../atoms/MapPinDot';
import dayjs from 'dayjs';

interface Props {
  note: Note;
}

export const MapPin = ({ note }: Props) => {
  const pinColor = note.synced
    ? theme.colors.placeholder 
    : theme.colors.success;

  const formattedDate = dayjs(note.datetime).format('DD/MM/YYYY HH:mm');

  return (
    <MapboxGL.PointAnnotation
      id={note.id.toString()}
      coordinate={[note.location.longitude, note.location.latitude]}
    >
      <MapPinDot color={pinColor} />

      <MapboxGL.Callout title="">
          <View style={styles.callout}>
            <Text style={styles.annotation}>{note.annotation}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
      </MapboxGL.Callout>
    </MapboxGL.PointAnnotation>
  );
};

const styles = StyleSheet.create({
  callout: {
    minWidth: 160,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  annotation: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
});
