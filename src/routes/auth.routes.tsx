import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { AuthStart } from '../screens/AuthScreens/AuthStart';
import { LoginEmailAndPassword } from '../screens/AuthScreens/EmailAndPasswordLogin';
import { RecoveryEmailAndPassword } from '../screens/AuthScreens/EmailAndPasswordRecovery';
import { RegisterEmailAndPassword } from '../screens/AuthScreens/EmailAndPasswordRegister';

import { theme } from '../global/styles/theme';

export type AuthParamsList = {
    AuthStart: undefined;
    EmailAndPasswordLogin: undefined;
    EmailAndPasswordRegister: undefined;
    EmailAndPasswordRecovery: undefined;
}

const Stack = createStackNavigator();

export function AuthRoutes() {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="AuthStart"
            mode="card"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: theme.colors.black
                }
            }}
        >
            <Stack.Screen 
                name="AuthStart" 
                component={AuthStart}
            />
            <Stack.Screen 
                name="EmailAndPasswordLogin" 
                component={LoginEmailAndPassword}
            />
            <Stack.Screen 
                name="EmailAndPasswordRegister" 
                component={RegisterEmailAndPassword}
            />
            <Stack.Screen 
                name="EmailAndPasswordRecovery" 
                component={RecoveryEmailAndPassword}
            />
        </Stack.Navigator>
    )
}
