import NetInfo from '@react-native-community/netinfo';
import { observeNetwork, stopObservingNetwork } from '../networkObserver';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
}));

describe('networkObserver', () => {
  let mockUnsubscribe: jest.Mock;

  beforeEach(() => {
    mockUnsubscribe = jest.fn();
    (NetInfo.addEventListener as jest.Mock).mockReturnValue(mockUnsubscribe);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call callback with network status when observing', () => {
    const callback = jest.fn();
    const mockListener = (handler: any) => {
      // Simula chamada do listener com isConnected: true
      handler({ isConnected: true });
      return mockUnsubscribe;
    };

    (NetInfo.addEventListener as jest.Mock).mockImplementation(mockListener);

    observeNetwork(callback);

    expect(NetInfo.addEventListener).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(true);
  });

  it('should stop observing the network', () => {
    const callback = jest.fn();
    observeNetwork(callback);
    stopObservingNetwork();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
