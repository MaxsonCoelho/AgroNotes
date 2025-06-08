const AsyncStorageMock = {
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
};

export default AsyncStorageMock;
