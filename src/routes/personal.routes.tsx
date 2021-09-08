import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

import { theme } from '../global/styles/theme';
import { Community } from '../screens/PersonalScreens/Community';
import { MyTrains } from '../screens/PersonalScreens/MyTrains';
import { Personal } from '../screens/PersonalScreens/Personal';

const Tabs = createBottomTabNavigator();

export function PersonalRoutes() {
    return (
        <Tabs.Navigator
            initialRouteName="Treinos"
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
                name="Comunidade"
                component={Community}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="group" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen 
                name="Meus Treinos"
                component={MyTrains}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="human-handsup" size={24} color={color}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="Personal"
                component={Personal}
                options={{
                    tabBarIcon: ({color}) => (
                        <Ionicons name="body" size={24} color={color} />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}
