import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { getAllNotes, markNoteAsSynced } from '@/sync/db/tables/notesTable';
import { Note } from '@/modules/Notes/types/noteTypes';
import { syncAnnotation } from '@/modules/Notes/services/noteService';
import MapboxGL from '@rnmapbox/maps';

import { LoadingIndicator, MapScreenContent, SyncOverlay } from '@/design_system/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/design_system/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NotesStackParamList } from '@/app/navigation/modules/NotesStack';
import { styles } from './styles';
import { useUserLocation } from '../../hooks/useUserLocation';
import { Alert } from '@/design_system/components/molecules/Alert';
import { PinModeInfoModal } from '@/design_system/components/molecules/PinModeInfoModal';
import { getStorage } from '@/services/storage';
import { useUserLocationPermission } from '../../hooks/useLocationPermission';
import { observeNetwork, stopObservingNetwork } from '@/sync';
import { useOfflineMapStatus } from '../../hooks/useOfflineMapStatus';
import { BackHandler, Platform } from 'react-native';

const MapScreen = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [pinMode, setPinMode] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [showPinInfo, setShowPinInfo] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isConnected, setIsConnected] = useState(true);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [showOfflineBlockModal, setShowOfflineBlockModal] = useState(false);

  const alreadyDownloadedRef = useRef(false);

  const navigation = useNavigation<NativeStackNavigationProp<NotesStackParamList>>();

  const { isOfflineWithoutMap, checked: offlineStatusChecked } = useOfflineMapStatus();

  const {
    loading: permissionLoading,
    permissionStatus,
  } = useUserLocationPermission(() => {
    if (!hasRedirected) {
      setHasRedirected(true);
      navigation.replace('LocationPermissionDenied');
    }
  });

  const { location: userLocation } = useUserLocation();

  useEffect(() => {
    if (permissionStatus === 'blocked' || permissionStatus === 'denied') {
      navigation.replace('LocationPermissionDenied');
    }
  }, [permissionStatus]);

  useEffect(() => {
    let previousConnection: boolean | null = null;

    observeNetwork((connected) => {
      setIsConnected(connected);

      if (previousConnection === null) {
        previousConnection = connected;
        return;
      }

      if (!connected && previousConnection !== false) {
        setAlertType('error');
        setAlertMessage(
          'Você está offline. Acesse o mapa pelo menos uma vez com internet para poder usá-lo offline depois.'
        );
        setAlertVisible(true);
      }

      if (connected && previousConnection === false) {
        setAlertType('success');
        setAlertMessage('Conexão restabelecida! Agora você pode sincronizar suas anotações.');
        setAlertVisible(true);
      }

      previousConnection = connected;
    });

    return () => {
      stopObservingNetwork
    };
  }, []);

  useEffect(() => {
    if (offlineStatusChecked && isOfflineWithoutMap) {
      setShowOfflineBlockModal(true);
    }
  }, [offlineStatusChecked, isOfflineWithoutMap]);

  useFocusEffect(
    useCallback(() => {
      fetchNotes(); // carrega todas as anotações novamente (inclusive as verdes)
    }, [])
  );

  useEffect(() => {
    (async () => {
      const hide = await getStorage<boolean>('hide_pin_mode_info');
      setShowPinInfo(!hide);
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (
        !alreadyDownloadedRef.current &&
        userLocation &&
        userLocation.latitude !== undefined &&
        userLocation.longitude !== undefined
      ) {
        alreadyDownloadedRef.current = true;
        downloadOfflineMapTiles();
      }
    }, [userLocation])
  );

  const fetchNotes = async () => {
    const all = await getAllNotes();
    setNotes(all);
    setRefreshKey(Date.now()); 
  };

  const handleSync = async () => {
    if (!isConnected) {
      setAlertType('error');
      setAlertMessage(
        'Sem conexão com a internet. É necessário estar online pelo menos uma vez para sincronizar as anotações.'
      );
      setAlertVisible(true);
      return;
    }

    setSyncing(true);
    setSyncProgress(0);
    const allNotes = await getAllNotes();
    const unsynced = allNotes.filter((note) => !note.synced);
    let failedCount = 0;
    let failedNotes: string[] = [];

    for (let i = 0; i < unsynced.length; i++) {
      const note = unsynced[i];
      try {
        await syncAnnotation({
          latitude: note.location.latitude,
          longitude: note.location.longitude,
          annotation: note.annotation,
          datetime: note.datetime,
          email: 'maxsoncoelho@gmail.com',
        });
        await markNoteAsSynced(note.id);
      } catch (error: any) {
        failedCount++;
        failedNotes.push(note.annotation.slice(0, 30));
      }

      setSyncProgress((i + 1) / unsynced.length);
    }

    await fetchNotes();
    setSyncing(false);

    setAlertType(failedCount > 0 ? 'error' : 'success');
    setAlertMessage(
      failedCount > 0
        ? `Erro ao sincronizar ${failedCount} anotação(ões). ${failedNotes[0] ?? ''}`
        : `Sincronização concluída! ${unsynced.length} anotação(ões) enviadas.`
    );
    setAlertVisible(true);
  };

  const addNotes = () => {
    if (selectedLocation) {
      navigation.navigate('AddNote', { location: selectedLocation });
      return;
    }

    if (
      !userLocation ||
      typeof userLocation.latitude !== 'number' ||
      typeof userLocation.longitude !== 'number'
    ) {
      setAlertType('error');
      setAlertMessage('Localização não disponível. Ative o GPS ou toque no mapa para selecionar um ponto.');
      setAlertVisible(true);
      return;
    }

    navigation.navigate('AddNote', {
      location: [userLocation.longitude, userLocation.latitude],
    });
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

  const downloadOfflineMapTiles = async () => {
    const currentLocation = userLocation 
      ? { latitude: userLocation.latitude, longitude: userLocation.longitude } 
      : null;

    if (
      !currentLocation ||
      typeof currentLocation.latitude !== 'number' ||
      typeof currentLocation.longitude !== 'number'
    ) {
      console.warn('Localização atual indisponível ou inválida.');
      return;
    }

    const BUFFER = 0.01;

    const southwest: [number, number] = [
      parseFloat((currentLocation.longitude - BUFFER).toFixed(6)),
      parseFloat((currentLocation.latitude - BUFFER).toFixed(6)),
    ];

    const northeast: [number, number] = [
      parseFloat((currentLocation.longitude + BUFFER).toFixed(6)),
      parseFloat((currentLocation.latitude + BUFFER).toFixed(6)),
    ];

    const latDiff = Math.abs(northeast[1] - southwest[1]);
    const lonDiff = Math.abs(northeast[0] - southwest[0]);

    if (latDiff < 0.001 || lonDiff < 0.001) {
      console.warn('Área muito pequena para criar o pack offline. Operação cancelada.');
      return;
    }

    const bounds: [[number, number], [number, number]] = [southwest, northeast];

    try {
      await MapboxGL.offlineManager.createPack(
        {
          name: `map-pack-${Date.now()}`,
          styleURL: MapboxGL.StyleURL.Street,
          minZoom: 12,
          maxZoom: 16,
          bounds,
        },
        (pack) => {
          console.log('Pack criado com sucesso:', pack);
        },
        (err) => {
          console.error('Erro ao criar pack offline:', err);
        }
      );
    } catch (error) {
      console.error('Erro geral ao criar o pack offline:', error);
    }
  };

  if (permissionLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <LoadingIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <MapScreenContent
        key={refreshKey}
        notes={notes}
        userLocation={
          userLocation ?? { latitude: 0, longitude: 0 }
        }
        onAddPress={addNotes}
        onSyncPress={handleSync}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
        pinMode={pinMode}
        onTogglePinMode={handleTogglePinMode}
      />

      <SyncOverlay 
        visible={syncing} 
        progress={syncProgress} 
      />

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
      <PinModeInfoModal
        visible={showOfflineBlockModal}
        onClose={() => {
          if (Platform.OS === 'android') {
            BackHandler.exitApp(); 
          } else {
            setShowOfflineBlockModal(false); 
          }
        }}
        title="📡 Mapa indisponível"
        description="Você está sem internet e ainda não possui o mapa salvo offline. 
        Conecte-se à internet e abra o app pelo menos uma vez para usá-lo offline no futuro."
        buttonLabel="Fechar o App"
        activeCheck={false}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
