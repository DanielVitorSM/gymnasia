import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { BorderlessButton } from 'react-native-gesture-handler';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { styles } from './styles'
import { theme } from '../../global/styles/theme';

type Props = {
    name: string;
}

export function Header({ name }: Props) {
    const Navigation = useNavigation();

    return (
        <View style={styles.container}>
            <BorderlessButton 
                style={styles.icon}
                onPress={() => {
                    Navigation.dispatch(DrawerActions.openDrawer())
                }}
            >
                <Feather name="menu" size={24} color={theme.colors.secondary_100} />
            </BorderlessButton>
            <Text style={styles.title}>{ name }</Text>
            <View style={styles.icon}/>
        </View>
    )
}
