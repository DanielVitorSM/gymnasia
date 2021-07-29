import React from 'react';
import { CardStyleInterpolators, createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import { TrainFinish } from '../screens/TrainFinish';

import { theme } from '../global/styles/theme';
import { RootStackParamsList } from './app.routes';
import { TrainContextProvider } from '../hooks/train-context';
import { PraticExercise } from '../screens/PraticExercise';
import { RestExercise } from '../screens/RestExercise';

const Stack = createStackNavigator();

export function TrainRoutes({ route }: StackScreenProps<RootStackParamsList, "TrainRoutes">){
    const { data, startedAt } = route.params;

    return(
        <TrainContextProvider 
            train={data}
            startedAt={startedAt}
        >
            <Stack.Navigator 
                headerMode="none"
                initialRouteName="RestExercise"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: theme.colors.secondary_20
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
                    animationEnabled: true,
                    cardOverlayEnabled: true
                }}
            >
                <Stack.Screen
                    name="TrainFinish"
                    component={TrainFinish}
                />
                <Stack.Screen
                    name="PraticExercise"
                    component={PraticExercise}
                />
                <Stack.Screen
                    name="RestExercise"
                    component={RestExercise}
                />
            </Stack.Navigator>
        </TrainContextProvider>
    )
}