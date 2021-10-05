import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import HomeIconSVG from '../assets/icons/home-alt';
import DumbbellIconSVG from '../assets/icons/dumbbell-alt';
import LogoSVG from '../assets/logo.svg';
import InfoIconSVG from '../assets/icons/info-alt';
import BellIconSVG from '../assets/icons/bell-alt';
import SettingsIconSVG from '../assets/icons/settings-alt';

import { theme } from '../global/styles/theme';

import { MainRoutes } from './main.routes';
import { MyTrainings } from '../screens/ExtraScreens/MyTrainings';
import { Reminder } from '../screens/ExtraScreens/Reminder';
import { Settings } from '../screens/ExtraScreens/Settings';
import { About } from '../screens/ExtraScreens/About';

const Drawer = createDrawerNavigator();

export function DrawerRoutes() {
    return (
        <Drawer.Navigator
            detachInactiveScreens
            drawerPosition="left"
            openByDefault={false}
            drawerContent={CustomDrawerContent}
            drawerContentOptions={{
                contentContainerStyle: styles.drawerContent,
                activeBackgroundColor: theme.colors.transparent,
                inactiveBackgroundColor: theme.colors.transparent,
                activeTintColor: theme.colors.primary_dark,
                inactiveTintColor: theme.colors.white,
                labelStyle: styles.label,
            }}
            drawerType="slide"
        >
            <Drawer.Screen 
                name="Início"
                component={MainRoutes}
                options={{
                    drawerIcon: ({ color }) => <HomeIconSVG fill={color}/>
                }}
            />
            <Drawer.Screen 
                name="Meus Treinos"
                component={MyTrainings}
                options={{
                    drawerIcon: ({ color }) => <DumbbellIconSVG fill={color}/>
                }}
            />
            <Drawer.Screen 
                name="Lembretes"
                component={Reminder}
                options={{
                    drawerIcon: ({ color }) => <BellIconSVG fill={color}/>
                }}
            />
            <Drawer.Screen 
                name="Configurações"
                component={Settings}
                options={{
                    drawerIcon: ({ color }) => <SettingsIconSVG fill={color}/>
                }}
            />
            <Drawer.Screen 
                name="Sobre"
                component={About}
                options={{
                    drawerIcon: ({ color }) => <InfoIconSVG fill={color}/>
                }}
            />
        </Drawer.Navigator>
    )
}

function CustomDrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>){
    return(
        <DrawerContentScrollView {...props}>
            <LogoSVG style={styles.logo}/>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    logo: {
        marginVertical: 40,
        alignSelf: 'center'
    },
    drawerContent: {
        backgroundColor: theme.colors.primary_light,
        flex: 1,
    },
    label: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
    }
});