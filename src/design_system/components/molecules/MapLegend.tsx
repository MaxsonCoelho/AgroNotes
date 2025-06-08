import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@/design_system/components/atoms/Icon';
import { theme } from '@/design_system/theme';
import { MapPinDot } from '../atoms/MapPinDot';

export const MapLegend = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MapPinDot color={theme.colors.placeholder} />
        <Text style={styles.label}>Sincronizado</Text>
      </View>
      <View style={styles.row}>
        <MapPinDot color={theme.colors.success} />
        <Text style={styles.label}>Não sincronizado</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffffa5',
    borderColor: theme.colors.placeholder,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: 'absolute',
    top: 16,
    right: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    marginLeft: 6,
    color: theme.colors.text,
    fontSize: 14,
  },
});
