import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { getAllNotes, markNoteAsSynced } from '@/sync/db/tables/notesTable';
import { Note } from '@/modules/Notes/types/noteTypes';
import { syncAnnotation } from '@/modules/Notes/services/noteService';

import { LoadingIndicator, MapScreenContent, SyncOverlay } from '@/design_system/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocationPermission } from '../../hooks/useLocationPermission';
import { theme } from '@/design_system/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NotesStackParamList } from '@/app/navigation/modules/NotesStack';
import { styles } from './styles';
import { useUserLocation } from '../../hooks/useUserLocation';

const MapScreen = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [syncing, setSyncing] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<NotesStackParamList>>();

  const { location: userLocation, loading: locationLoading } = useUserLocation();

  const { isGranted, loading: permissionLoading } = useLocationPermission(() => {
    navigation.replace('LocationPermissionDenied');
  });

  const fetchNotes = async () => {
    const all = await getAllNotes();
    setNotes(all);
  };

  const handleSync = async () => {
    setSyncing(true);

    setTimeout(async ()=> {
      const unsynced = notes.filter((note) => !note.synced);
      for (const note of unsynced) {
        try {
          await syncAnnotation({
            latitude: note.location.latitude,
            longitude: note.location.longitude,
            annotation: note.annotation,
            datetime: note.datetime,
            email: 'SEU@EMAIL.AQUI',
          });

          await markNoteAsSynced(note.id);
        } catch (error) {
          console.warn('Erro ao sincronizar:', error);
        }
      }

      await fetchNotes();
    }, 30000);
    
    setSyncing(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (permissionLoading || locationLoading || !userLocation) {
    return (
      <SafeAreaView style={styles.safe}>
        <LoadingIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (!isGranted) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <MapScreenContent
        notes={notes}
        userLocation={userLocation}
        onAddPress={() => navigation.navigate('AddNote')}
        onSyncPress={handleSync}
      />
      <SyncOverlay visible={syncing} />
    </SafeAreaView>
  );
};

export default MapScreen;
