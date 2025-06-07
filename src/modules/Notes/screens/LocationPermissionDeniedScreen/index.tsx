import React, { useRef } from 'react';
import { BackHandler, Linking, Platform, AppState, AppStateStatus, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNRestart from 'react-native-restart';

import { Text, Button } from '@/design_system/components';
import { theme } from '@/design_system/theme';
import { styles } from './styles';

export const LocationPermissionDeniedScreen = () => {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const openAppSettings = () => {
    Linking.openSettings();
  };

  const checkPermissionAgain = async () => {
    const permissionType =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await check(permissionType);
    if (result === RESULTS.GRANTED) {
      console.log('[Permissão] Concedida — reiniciando app...');
      RNRestart.restart(); 
    } else {
      console.log('[Permissão] Ainda bloqueada.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('[AppState] Voltou para o app, verificando permissão...');
          checkPermissionAgain();
        }
        appState.current = nextAppState;
      };

      const subscription = AppState.addEventListener('change', handleAppStateChange);

      return () => {
        subscription.remove();
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permissão de Localização Necessária</Text>
      <Text style={styles.description}>
        Para utilizar o mapa, precisamos da sua permissão de localização. Vá até as configurações do app e permita o acesso à sua localização.
      </Text>

      <Button label="Abrir Configurações" onPress={openAppSettings} style={styles.button} />

      <Button
        label="Reiniciar o app"
        onPress={() => {
            RNRestart.restart();
        }}
        style={[styles.button, { backgroundColor: theme.colors.danger }]}
      />
    </View>
  );
};
