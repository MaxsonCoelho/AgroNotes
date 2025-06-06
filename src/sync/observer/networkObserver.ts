import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

type Callback = (isConnected: boolean) => void;

let unsubscribe: (() => void) | null = null;

export const observeNetwork = (callback: Callback) => {
  unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
    callback(state.isConnected ?? false);
  });
};

export const stopObservingNetwork = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
};
