import React from 'react';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { enableScreens } from 'react-native-screens';
import { LogBox, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import AppLoading from 'expo-app-loading';

import './src/config/firebase';
import { AuthProvider } from './src/hooks/auth-context';

import { Routes } from './src/routes';

enableScreens();

LogBox.ignoreLogs([
  'Setting a timer', 
  "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release."
]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  if(!fontsLoaded)
    return <AppLoading />

  return (
    <AuthProvider>
      <StatusBar 
        animated
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Routes />
    </AuthProvider>
  );
}