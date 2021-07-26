import React, { useEffect } from 'react';
import { CardStyleInterpolators, createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import { TrainExercises } from '../screens/TrainExercises';
import { TrainFinish } from '../screens/TrainFinish';

import { theme } from '../global/styles/theme';
import { RootStackParamsList } from './app.routes';
import { TrainContextProvider } from '../hooks/train-context';
import { IExerciseTrain } from '../screens/Trains';
import { PraticExercise } from '../screens/PraticExercise';
import { RestExercise } from '../screens/RestExercise';

const Stack = createStackNavigator();

export function TrainRoutes({ route }: StackScreenProps<RootStackParamsList, "TrainRoutes">){
    const { data } = route.params;

    function getExerciseByOrder(exercises: IExerciseTrain[], order: number): IExerciseTrain{
        let result = exercises.find((value) => value.order === order);
        return result || {} as IExerciseTrain;
    }

    return(
        <TrainContextProvider 
            train={data}
            firstExercise={getExerciseByOrder(data.exercises, 1)}
        >
            <Stack.Navigator 
                headerMode="none"
                initialRouteName="PraticExercise"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: theme.colors.secondary_20
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    animationEnabled: true,
                    cardOverlayEnabled: true
                }}
            >
                <Stack.Screen
                    name="TrainExercises"
                    component={TrainExercises}
                />
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