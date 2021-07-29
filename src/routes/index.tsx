import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { SignupContextProvider } from '../hooks/signup-context';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '../hooks/auth-context';

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
