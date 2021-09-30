import React, { useEffect } from 'react';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ubuntu_300Light, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'
import { enableScreens } from 'react-native-screens';
import { LogBox, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import AppLoading from 'expo-app-loading';

import './src/config/firebase';
import { AuthProvider } from './src/hooks/authentication';

import { Routes } from './src/routes';
import DatabaseInit from './src/storage/init';

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
  const dbInit = new DatabaseInit();

  const [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    
  });

  if(!fontsLoaded)
    return <AppLoading />

  dbInit.InitDb();

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}