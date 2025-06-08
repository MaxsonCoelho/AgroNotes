export const check = jest.fn(() => Promise.resolve('granted'));
export const request = jest.fn(() => Promise.resolve('granted'));
export const PERMISSIONS = {
  IOS: {},
  ANDROID: {},
};
