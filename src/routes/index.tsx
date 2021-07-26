import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/auth-context';
import { SignupContextProvider } from '../hooks/signup-context';

export function Routes() {
    const { session } = useAuth();

    return (
        <NavigationContainer>
            { 
                session.uuid
                ?
                <AppRoutes />
                :
                <SignupContextProvider>
                    <AuthRoutes />
                </SignupContextProvider>
            }
        </NavigationContainer>
    )
}
