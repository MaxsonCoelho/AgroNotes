import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async <T = any>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn(`Erro ao recuperar ${key} do AsyncStorage`, error);
    return null;
  }
};

export const setStorage = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Erro ao salvar ${key} no AsyncStorage`, error);
  }
};
