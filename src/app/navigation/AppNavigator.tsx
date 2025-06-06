import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NotesStack from './modules/NotesStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';

const AppNavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Notes" component={NotesStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
