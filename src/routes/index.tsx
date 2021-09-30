import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/authentication';
import { LoadScreen } from '../screens/LoadScreen';
import { StyleSheet, View } from 'react-native';
import { theme } from '../global/styles/theme';

import { AuthenticatedRoutes } from './authenticated.routes';
import { AuthenticationRoutes } from './authentication.routes';


export function Routes() {
    const { session, loading } = useAuth();

    if(loading)
        return <LoadScreen />

    return (
        <View style={styles.container}>
            <NavigationContainer>
                {
                    session.isDataColected
                    ?
                    <AuthenticatedRoutes />
                    :
                    <AuthenticationRoutes />
                }
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white
    }
});