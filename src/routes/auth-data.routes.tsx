import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { RegisterWeightAndHeight } from '../screens/AuthScreens/RegisterA_WeightAndHeight'
import { RegisterBirthAndSex } from '../screens/AuthScreens/RegisterB_BirthAndSex'
import { RegisterReminder } from "../screens/AuthScreens/RegisterC_Reminder";
import { RegisterSuccess } from '../screens/AuthScreens/RegisterD_Success'

import { theme } from '../global/styles/theme';

export type AuthDataParamsList = {
    RegisterWeightAndHeight: undefined;
    RegisterBirthAndSex: undefined;
    RegisterReminder: undefined;
    RegisterSuccess: undefined;
}

const Stack = createStackNavigator();

export function AuthDataRoutes() {
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
                name="RegisterBirthAndSex" 
                component={RegisterBirthAndSex}
            />
            <Stack.Screen 
                name="RegisterReminder" 
                component={RegisterReminder}
            />
            <Stack.Screen 
                name="RegisterSuccess" 
                component={RegisterSuccess}
            />
        </Stack.Navigator>
    )
}
