import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getAllNotes, markNoteAsSynced } from '@/sync/db/tables/notesTable';
import { Note } from '@/modules/Notes/types/noteTypes';
import { syncAnnotation } from '@/modules/Notes/services/noteService';

import { MapScreenContent, SyncOverlay } from '@/design_system/components';
import { SafeAreaView } from 'react-native-safe-area-context';

const MapScreen = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [syncing, setSyncing] = useState(false);
  const navigation = useNavigation();

  const fetchNotes = async () => {
    const all = await getAllNotes();
    setNotes(all);
  };

  const handleSync = async () => {
    setSyncing(true);

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
    setSyncing(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <MapScreenContent
          notes={notes}
          onAddPress={() => navigation.navigate('AddNote' as never)}
          onSyncPress={handleSync}
        />
        <SyncOverlay visible={syncing} />
    </SafeAreaView>
  );
};

export default MapScreen;
