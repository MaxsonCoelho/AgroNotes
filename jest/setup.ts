jest.mock('react-native-sqlite-storage', () => {
  const mock = {
    openDatabase: jest.fn(() => ({
      transaction: jest.fn(),
      readTransaction: jest.fn(),
      close: jest.fn(),
      executeSql: jest.fn(),
    })),
    enablePromise: jest.fn(),
  };

  return mock;
});
