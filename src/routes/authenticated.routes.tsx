import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { MainRoutes } from './main.routes';

const Stack = createStackNavigator();

export function AuthenticatedRoutes() {
    return(
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen 
                name="Home"
                component={MainRoutes}
            />
        </Stack.Navigator>
    )
}
