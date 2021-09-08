import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { MainRoutes } from './main.routes';
import { PersonalData } from '../screens/PersonalData';
import { ExerciseModal } from '../screens/ExerciseModal';
import { ExercisesType } from '../screens/MainScreens/Exercises';
import { TrainModal } from '../screens/TrainModal';
import { Reminder } from '../screens/Reminder';
import { ITrain } from '../screens/MainScreens/Trains';
import { TrainRoutes } from './train.routes';
import { PersonalRoutes } from './personal.routes';

import { theme } from '../global/styles/theme';
import LogoSvg from '../assets/logo.svg';
import { useAuth } from '../hooks/auth-context';
import { errorAlert } from '../utils/alerts';
import { AddTrain } from '../screens/AddTrain';

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

export type RootStackParamsList = {
    Main: undefined;
    ExerciseModal: { data: ExercisesType };
    TrainModal: { data: ITrain };
    TrainRoutes: { 
        data: ITrain;
        startedAt: number; 
    };
}

export function AppRoutes(){
    return(
        <RootStack.Navigator 
            headerMode="screen"
            initialRouteName="Main"
            screenOptions={{
                cardStyle: {
                    backgroundColor: theme.colors.secondary_20
                },
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: true,
                headerStyle: { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 },
                headerTintColor: theme.colors.secondary_100,
                headerTitle: "",
                animationEnabled: true,
                cardOverlayEnabled: true
            }}
        >
            <RootStack.Screen 
                name="Main" 
                component={DrawerRoutes}
                options={{
                    headerShown: false
                }}
            />
            <RootStack.Screen 
                name="ExerciseModal" 
                component={ExerciseModal}
            />
            <RootStack.Screen 
                name="TrainModal"
                component={TrainModal}
                options={{
                    headerTransparent: true
                }}
            />
            <RootStack.Screen 
                name="TrainRoutes"
                component={TrainRoutes}
                options={{
                    headerTransparent: true
                }}
            />
            <RootStack.Screen 
                name="AddTrain"
                component={AddTrain}
                options={{
                    headerTransparent: true
                }}
            />
        </RootStack.Navigator>
    )
}

export function DrawerRoutes(){
    return(
        <Drawer.Navigator
            backBehavior="firstRoute"
            drawerContent={(props) => <CustomDrawerContent {...props}/>}
            drawerContentOptions={{
                activeTintColor: theme.colors.primary,
                inactiveTintColor: theme.colors.secondary_100,
                itemStyle: styles.item,
                labelStyle: styles.label
            }}
            sceneContainerStyle={{
                backgroundColor: theme.colors.secondary_20
            }}
        >
            <Drawer.Screen
                name="Home"
                component={MainRoutes}
            />
            <Drawer.Screen name="Dados Pessoais" component={PersonalData} />
            <Drawer.Screen name="Personal" component={PersonalRoutes} />
            <Drawer.Screen name="Lembrete" component={Reminder} />
        </Drawer.Navigator>
    )
}

function CustomDrawerContent(props: DrawerContentComponentProps){
    const { signOut, user } = useAuth();

    return (
        <DrawerContentScrollView style={styles.container} {...props}>
            <View style={styles.content}>
                <LogoSvg width="60%" height={150}/>
                <DrawerItemList {...props} />
                <DrawerItem 
                    style={styles.item} 
                    label="Sair" 
                    inactiveTintColor="red" 
                    labelStyle={styles.label}  
                    onPress={async () => {
                        try{
                            await signOut();
                        }catch({ message }){
                            errorAlert(message, () => {});
                        }
                    }}
                />
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black'
    },
    content: {
        justifyContent: 'center', 
        flex: 1, 
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        fontFamily: theme.fonts.text400
    },
    item: {
        width: '80%',
        backgroundColor: 'transparent'
    }
});