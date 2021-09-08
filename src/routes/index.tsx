import React from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native';

import { SignupContextProvider } from '../hooks/signup-context';
import { AuthRoutes } from './auth.routes';
import { AuthDataRoutes } from './auth-data.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '../hooks/auth-context';
import { LoadScreen } from '../screens/LoadScreen';

export function Routes() {
    const { session, user, loading } = useAuth();
    
    if(loading.type === "start" && !loading.loaded)
        return <LoadScreen />;

    return (
        <NavigationContainer
            theme={DarkTheme}
        >
            { 
                user.uid !== undefined
                ?
                <AppRoutes />
                :
                (
                    session.uid === undefined
                    ?
                    <AuthRoutes />
                    :
                    <SignupContextProvider>
                        <AuthDataRoutes />
                    </SignupContextProvider>
                )
            }
        </NavigationContainer>
    )
}
