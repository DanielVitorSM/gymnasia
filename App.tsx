import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import "reflect-metadata";

import { DatabaseConnectionProvider, createDatabaseConnectionSync } from './src/storage/connection';
import { AuthProvider, loadSession } from './src/hooks/auth-context';

import { Routes } from './src/routes';

enableScreens();

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
        style="light"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider hasSession={session}>
        <Routes />
      </AuthProvider>
    </DatabaseConnectionProvider>
  );
}