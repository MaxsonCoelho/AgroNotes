import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddNoteScreen from '@/modules/Notes/screens/AddNoteScreen';
import MapScreen from '@/modules/Notes/screens/MapScreen';

export type NotesStackParamList = {
  NotesMap: undefined;
  Notes: undefined;
  AddNote: undefined;
};

const Stack = createNativeStackNavigator<NotesStackParamList>();

const NotesStack = () => {
  return (
    <Stack.Navigator initialRouteName="NotesMap" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotesMap" component={MapScreen} />
      <Stack.Screen name="AddNote" component={AddNoteScreen} />
    </Stack.Navigator>
  );
};

export default NotesStack;
