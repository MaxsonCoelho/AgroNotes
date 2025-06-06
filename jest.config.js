module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|@react-native-community|@react-native-picker|@react-native-async-storage)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '^@rnmapbox/maps$': '<rootDir>/__mocks__/@rnmapbox/maps.tsx',
  },
};
