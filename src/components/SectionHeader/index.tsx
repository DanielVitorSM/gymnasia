import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = BorderlessButtonProps & {
    title: string;
    help?: string;
    typeRight?: string;
}

export function SectionHeader({ title, help, typeRight = "edit", ...rest }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.title}>{ title }</Text>
                <BorderlessButton style={styles.button}>
                    <FontAwesome5 name="info-circle" size={16} color={theme.colors.secondary_80} />
                </BorderlessButton>
            </View>
            <BorderlessButton rippleColor="white" {...rest} style={styles.button}>
                {
                    typeRight === "edit" && 
                    <MaterialIcons 
                        name="edit" 
                        size={24} 
                        color={theme.colors.secondary_80} 
                    />
                }
                {
                    typeRight === "add" && 
                    <MaterialIcons 
                        name="add" 
                        size={24} 
                        color={theme.colors.secondary_80} 
                    />
                }
            </BorderlessButton>
        </View>
    )
}
