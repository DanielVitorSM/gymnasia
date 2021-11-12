import React from 'react';
import { StatusBar } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { ExerciseInfo } from '../screens/ModalScreens/ExerciseInfo';
import { DrawerRoutes } from './drawer.routes';
import { TrainingInfo } from '../screens/ModalScreens/TrainingInfo';
import { ITrainingObject, trainings } from '../data/trainings';
import { TrainingRoutes } from './training.routes';
import { MyTrainingsAdd } from '../screens/ModalScreens/MyTrainingsAdd';
import { theme } from '../global/styles/theme';

export type RootStackScreenParams = {
    Main: undefined;
    ExerciseInfoModal: { 
        exerciseUid: string;
    };
    TrainingInfoModal: {
        data: ITrainingObject;
    };
    TrainingRoutes: {
        data: ITrainingObject;
    };
    MyTrainingsAdd : undefined;
}

const RootStack = createStackNavigator<RootStackScreenParams>();

export function AuthenticatedRoutes() {
    return(
        <>

            <StatusBar 
                barStyle="light-content"
                backgroundColor={theme.colors.primary_dark}
                translucent={false}
            /> 
            <RootStack.Navigator
                headerMode="none"
                initialRouteName="Main"
                mode="modal"
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    animationEnabled: true,
                    animationTypeForReplace: "push",
                }}
                detachInactiveScreens={true}
            >
                <RootStack.Screen 
                    name="Main"
                    component={DrawerRoutes}
                />
                <RootStack.Screen 
                    name="ExerciseInfoModal"
                    component={ExerciseInfo}
                    initialParams={{ exerciseUid: "258008ba-d567-403c-af10-b19e41791f4b" }}
                />
                <RootStack.Screen 
                    name="TrainingInfoModal"
                    component={TrainingInfo}
                    initialParams={{ data: trainings[0] }}
                />
                <RootStack.Screen 
                    name="TrainingRoutes"
                    component={TrainingRoutes}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
                    }}
                />
                <RootStack.Screen 
                    name="MyTrainingsAdd"
                    component={MyTrainingsAdd}
                />
            </RootStack.Navigator>
        </>
    )
}
