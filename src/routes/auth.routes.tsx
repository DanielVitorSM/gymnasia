import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { RegisterWeightAndHeight } from '../screens/RegisterWeightAndHeight'
import { RegisterSuccess } from '../screens/RegisterSuccess'
import { RegisterBirthAndSex } from '../screens/RegisterBirthAndSex'

import { theme } from '../global/styles/theme';

const Stack = createStackNavigator();

export function AuthRoutes() {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="RegisterWeightAndHeight"
            mode="card"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: theme.colors.black
                }
            }}
        >
            <Stack.Screen 
                name="RegisterWeightAndHeight" 
                component={RegisterWeightAndHeight}
            />
            <Stack.Screen 
                name="RegisterSuccess" 
                component={RegisterSuccess}
            />
            <Stack.Screen 
                name="RegisterBirthAndSex" 
                component={RegisterBirthAndSex}
            />
        </Stack.Navigator>
    )
}
