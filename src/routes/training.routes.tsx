import React from 'react';
import { CardStyleInterpolators, createStackNavigator, StackScreenProps, StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { Alert, Pressable } from 'react-native';

import { Finish } from '../screens/TrainingScreens/Finish';
import { Practice } from '../screens/TrainingScreens/Practice';
import { Rest } from '../screens/TrainingScreens/Rest';
import { TrainingContextProvider } from '../hooks/training';
import { RootStackScreenParams } from './authenticated.routes';
import ArrowLeftIconSVG from '../assets/icons/arrow-left-alt';
import { theme } from '../global/styles/theme';

export type TrainingScreenParams = {
    Practic: undefined;
    Rest: undefined;
    Finish: undefined;
};

const TrainingStack = createStackNavigator<TrainingScreenParams>();

export function TrainingRoutes({ route, navigation }: StackScreenProps<RootStackScreenParams, "TrainingRoutes">){
    const { data } = route.params

    const BackHeaderButton = ({ tintColor, onPress }: StackHeaderLeftButtonProps) => (
        <Pressable
            android_ripple={{
                color: theme.colors.gray_light,
                borderless: true,
                radius: 30
            }}
            style={{ marginLeft: 20 }}
            hitSlop={30}
            onPress={() => Alert.alert("Deseja sair?", "Quer encerrar esse treino e voltar para a tela inicial?", [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: () => navigation.popToTop()
                }
            ], {
                cancelable: true
            })}
        >
            <ArrowLeftIconSVG stroke={tintColor}/>
        </Pressable>
    );

    return(
        <TrainingContextProvider
            training={data}
        >
            <TrainingStack.Navigator
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerTransparent: true,
                    headerStyle: { height: 72 },
                    headerTitleStyle: { display: 'none' },
                    headerLeft: BackHeaderButton,
                    headerTintColor: theme.colors.white,
                    detachPreviousScreen: true,
                }}
                detachInactiveScreens={true}
                headerMode="screen"
                mode="modal"
                initialRouteName="Rest"
            >
                <TrainingStack.Screen 
                    name="Practic"
                    component={Practice}
                    options={{ headerTintColor: theme.colors.primary_light }}
                />
                <TrainingStack.Screen 
                    name="Rest"
                    component={Rest}
                />
                <TrainingStack.Screen 
                    name="Finish"
                    component={Finish}
                />
            </TrainingStack.Navigator>
        </TrainingContextProvider>
    )
}