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
import { Alert } from '@/design_system/components/molecules/Alert';
import { PinModeInfoModal } from '@/design_system/components/molecules/PinModeInfoModal';
import { getStorage } from '@/services/storage';

const MapScreen = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [pinMode, setPinMode] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [showPinInfo, setShowPinInfo] = useState(true);

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
    let failedCount = 0;
    let failedNotes: string[] = [];

    // Garantir que os dados estão atualizados
    const allNotes = await getAllNotes();
    setNotes(allNotes);

    const unsynced = allNotes.filter((note) => !note.synced);

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
      } catch (error: any) {
        failedCount++;
        failedNotes.push(note.annotation.slice(0, 30));
        console.warn('Erro ao sincronizar:', error);
      }
    }

    await fetchNotes(); // Atualiza com notas sincronizadas
    setSyncing(false);

    if (failedCount > 0) {
      setAlertType('error');
      setAlertMessage(
        `Erro ao sincronizar ${failedCount} anotação(ões). ${
          failedNotes.length > 0 ? `Ex: "${failedNotes[0]}"` : ''
        }`
      );
    } else {
      setAlertType('success');
      setAlertMessage(`Sincronização concluída! ${unsynced.length} anotação(ões) enviadas.`);
    }

    setAlertVisible(true);
  };

  const addNotes = () => {
    if (!userLocation) return;

    const location: [number, number] =
      selectedLocation ?? [userLocation.longitude, userLocation.latitude];

    navigation.navigate('AddNote', { location });
  };

  const handleTogglePinMode = () => {
    setPinMode((prev) => {
      const newValue = !prev;
      setAlertType('success');
      setAlertMessage(newValue ? 'Modo PIN ativado.' : 'Modo PIN desativado.');
      setAlertVisible(true);
      return newValue;
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    (async () => {
      const hide = await getStorage<boolean>('hide_pin_mode_info');
      setShowPinInfo(!hide);
    })();
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
        key={notes.map(n => `${n.id}-${n.synced}`).join('-')}
        notes={notes}
        userLocation={userLocation}
        onAddPress={addNotes}
        onSyncPress={handleSync}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
        pinMode={pinMode}
        onTogglePinMode={handleTogglePinMode}
      />

      <SyncOverlay visible={syncing} />

      {alertVisible && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      )}

      <PinModeInfoModal
        visible={showPinInfo}
        onClose={() => setShowPinInfo(false)}
        title="📍 Como funciona o Modo PIN?"
        description="Ao ativar o Modo PIN, a navegação 
          automática é pausada. Você pode tocar em qualquer 
          ponto do mapa para marcar uma localização manualmente. 
          Ideal para registrar anotações em locais específicos!"
      />
    </SafeAreaView>
  );
};

export default MapScreen;
