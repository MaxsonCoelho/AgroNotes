import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import MapboxGL from '@rnmapbox/maps';

export function useOfflineMapStatus() {
  const [isOfflineWithoutMap, setIsOfflineWithoutMap] = useState(false);
  const [checked, setChecked] = useState(false);

  const checkStatus = async () => {
    try {
      const net = await NetInfo.fetch();
      const packs = await MapboxGL.offlineManager.getPacks();
      const hasMap = packs && packs.length > 0;

      setIsOfflineWithoutMap(!net.isConnected && !hasMap);
    } catch (error) {
      console.warn('Erro ao verificar status offline:', error);
      setIsOfflineWithoutMap(false);
    } finally {
      setChecked(true);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return {
    isOfflineWithoutMap,
    checked,
    recheckOfflineStatus: checkStatus, 
  };
}
