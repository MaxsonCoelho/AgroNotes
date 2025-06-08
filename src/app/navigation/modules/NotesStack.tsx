import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '@/modules/Notes/screens/MapScreen';
import { Icon } from '@/design_system/components/atoms/Icon';
import { IconButton } from '@/design_system/components';
import { Platform, View } from 'react-native';
import { theme } from '@/design_system/theme';
import { LocationPermissionDeniedScreen } from '@/modules/Notes/screens/LocationPermissionDeniedScreen';
import { AddNoteScreen } from '@/modules/Notes/screens/AddNoteScreen';

export type NotesStackParamList = {
  NotesMap: undefined;
  AddNote: { location: [number, number] };
  LocationPermissionDenied: undefined;
};

const Stack = createNativeStackNavigator<NotesStackParamList>();

const NotesStack = () => {

  function Logo() {
    return (
      <View
        style={{
          height: 70,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          marginTop: Platform.OS === 'android' ? 10 : 0,
          ...Platform.select({
            ios: {
              position: 'absolute',
              bottom: -50,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
      >
        <Icon name="leaf" size={60} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="NotesMap"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="NotesMap"
        component={MapScreen}
        options={{
          headerTitle: () => (
            <Logo/>
          ),
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Logo/>
          ),
          headerLeft: () => (
            <IconButton
              icon="back"
              onPress={() => navigation.goBack()}
              backgroundColor="transparent"
            />
          ),
        })}
      />
      <Stack.Screen
        name="LocationPermissionDenied"
        component={LocationPermissionDeniedScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Logo/>
          )
        })}
      />
    </Stack.Navigator>
  );
};

export default NotesStack;
