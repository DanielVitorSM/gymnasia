import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles'
import { theme } from '../../global/styles/theme';

type Props = {
    name: string;
    rightButton?: ReactNode
    onLeftPress?: () => void;
}

export function HeaderWithBack({ 
    name, 
    rightButton = <View style={styles.icon}/>, 
    onLeftPress 
}: Props) {
    const Navigation = useNavigation();

    function handleLeftPress(){
        if(onLeftPress){
            return onLeftPress();
        }
        Navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.icon}
                onPress={handleLeftPress}
            >
                <Ionicons name="arrow-back-outline" size={24} color={theme.colors.secondary_100} />
            </TouchableOpacity>
            <Text style={styles.title}>{ name }</Text>
            { rightButton }
        </View>
    )
}
