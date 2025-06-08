import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import { theme } from '@/design_system/theme';

type AlertType = 'success' | 'error' | 'info';

interface DsAlertProps {
  title?: string;
  message: string;
  type?: AlertType;
  onClose?: () => void;
  duration?: number;
}

const screenWidth = Dimensions.get('window').width;

export const Alert: React.FC<DsAlertProps> = ({
  title,
  message,
  type = 'info',
  onClose,
  duration = 4000,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset posição inicial antes de animar
    translateY.setValue(-100);

    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    // Timeout para esconder o alerta
    timeoutRef.current = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (onClose) onClose();
      });
    }, duration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message]); 

  const backgroundColor =
    type === 'success'
      ? theme.colors.success
      : type === 'error'
      ? theme.colors.danger
      : theme.colors.success;

  const alertTitle =
    title || (type === 'success' ? 'Sucesso' : type === 'error' ? 'Erro' : 'Aviso');

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          backgroundColor,
        },
      ]}
    >
      <View style={styles.textContent}>
        <Text style={styles.title}>{alertTitle}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    width: screenWidth - 40,
    minHeight: 60,
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 4,
    zIndex: 1000,
  },
  textContent: {
    flex: 1,
    paddingHorizontal: 8,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  message: {
    color: '#fff',
    fontSize: 12,
  },
});
