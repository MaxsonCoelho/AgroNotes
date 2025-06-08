
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));


jest.mock('@react-native-async-storage/async-storage');

jest.mock('react-native-geolocation-service');

jest.mock('react-native-permissions');
