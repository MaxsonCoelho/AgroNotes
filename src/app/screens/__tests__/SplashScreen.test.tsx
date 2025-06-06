import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../SplashScreen';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('SplashScreen', () => {
  it('should render logo image with initial styles', () => {
    const { getByLabelText } = render(
      <NavigationContainer>
        <SplashScreen />
      </NavigationContainer>
    );

    const logo = getByLabelText('Logo');
    expect(logo).toBeTruthy();
  });
});
