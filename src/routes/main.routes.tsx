import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ExerciseIconSVG from '../assets/icons/exercise-alt';
import DumbbellIconSVG from '../assets/icons/dumbbell-alt';
import UserIconSVG from '../assets/icons/user-alt';
import ReportIconSVG from '../assets/icons/report-alt';

import { theme } from '../global/styles/theme';

import { Exercises } from '../screens/AppScreens/Exercises';
import { Trainings } from '../screens/AppScreens/Trainings';
import { Reports } from '../screens/AppScreens/Reports';
import { User } from '../screens/AppScreens/User';

const Tabs = createBottomTabNavigator();

export function MainRoutes() {
    return (
        <Tabs.Navigator
            backBehavior="history"
            detachInactiveScreens
            lazy
            initialRouteName="Treinos"
            sceneContainerStyle={{
                backgroundColor: theme.colors.white
            }}
            tabBarOptions={{
                showLabel: false,
                keyboardHidesTabBar: true,
                style: {
                    borderWidth: 0,
                    height: 50,
                    elevation: 0,
                    paddingHorizontal: 20,
                    backgroundColor: theme.colors.white
                },
                activeTintColor: theme.colors.primary_light,
                inactiveTintColor: theme.colors.gray_dark
            }}
        >
            <Tabs.Screen 
                name="Exercícios"
                component={Exercises}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <DumbbellIconSVG fill={color} width={size} height={size}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="Treinos"
                component={Trainings}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <ExerciseIconSVG fill={color} width={size} height={size}/>
                    )
                }}
                
            />
            <Tabs.Screen 
                name="Relatórios"
                component={Reports}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <ReportIconSVG fill={color} width={size} height={size}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="Informações Pessoais"
                component={User}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <UserIconSVG fill={color} width={size} height={size}/>
                    )
                }}
            />
        </Tabs.Navigator>
    )
}
