import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

import { Exercises } from '../screens/Exercises';
import { Trains } from '../screens/Trains';
import { Reports } from '../screens/Reports';

import { theme } from '../global/styles/theme';

const Tabs = createBottomTabNavigator();

export function MainRoutes() {
    return (
        <Tabs.Navigator
            initialRouteName="Exercises"
            tabBarOptions={{
                activeTintColor: theme.colors.primary,
                inactiveTintColor: theme.colors.secondary_100,
                iconStyle: {
                    marginBottom: -10
                },
                style: {
                    borderTopWidth: 0,
                    backgroundColor: theme.colors.secondary_10,
                    paddingHorizontal: 20
                },
                
            }}
            sceneContainerStyle={{
                backgroundColor: theme.colors.secondary_20
            }}
            detachInactiveScreens={true}
        >
            <Tabs.Screen 
                name="Exercícios"
                component={Exercises}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="fitness-center" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen 
                name="Treinos"
                component={Trains}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="human-handsup" size={24} color={color}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="Relatórios"
                component={Reports}
                options={{
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="chart-pie" size={24} color={color} />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}
