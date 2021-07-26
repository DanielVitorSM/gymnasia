import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { MainRoutes } from './main.routes';
import { PersonalData } from '../screens/PersonalData';
import { ExerciseModal } from '../screens/ExerciseModal';
import { ExercisesType } from '../screens/Exercises';
import { TrainModal } from '../screens/TrainModal';
import { TrainExercises } from '../screens/TrainExercises';
import { TrainFinish } from '../screens/TrainFinish';
import { ITrain } from '../screens/Trains';
import { TrainRoutes } from './train.routes';

import { theme } from '../global/styles/theme';
import LogoSvg from '../assets/logo.svg';

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

export type RootStackParamsList = {
    Main: undefined;
    ExerciseModal: { data: ExercisesType };
    TrainModal: { data: ITrain };
    TrainRoutes: { data: ITrain };
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
            <Drawer.Screen name="Lembrete" component={MainRoutes} />
            <Drawer.Screen name="Sobre" component={MainRoutes} />
        </Drawer.Navigator>
    )
}

function CustomDrawerContent(props: DrawerContentComponentProps){
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
                    onPress={() => Alert.alert("Recurso em Desenvolvimento", "Aguardo algumas atualizações para usar este recurso")}
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