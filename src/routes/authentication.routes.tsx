import React from 'react'

import { Info } from '../screens/AuthenticationScreens/Info';
import { SignIn } from '../screens/AuthenticationScreens/SignIn';
import { useAuth } from '../hooks/authentication';
import { StatusBar } from 'react-native';


export function AuthenticationRoutes() {
    const { session } = useAuth();

    return (
        <>
            <StatusBar 
                translucent
                animated
                barStyle="dark-content"
            />
            {
                session.isLogged
                ?
                <Info />
                :
                <SignIn />
            }
        </>
    )
}
