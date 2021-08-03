import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import "reflect-metadata";
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'react-native';

import { DatabaseConnectionProvider, createDatabaseConnectionSync } from './src/storage/connection';
import { AuthProvider, loadSession } from './src/hooks/auth-context';

import { Routes } from './src/routes';

enableScreens();

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
  const [sessionLoaded, session] = loadSession();
  const [connectionCreated] = createDatabaseConnectionSync();

  if(!fontsLoaded || !sessionLoaded || !connectionCreated)
    return <AppLoading />

  return (
    <DatabaseConnectionProvider>
      <StatusBar 
        animated
        translucent
        barStyle="light-content"
      />
      <AuthProvider hasSession={session}>
        <Routes />
      </AuthProvider>
    </DatabaseConnectionProvider>
  );
}