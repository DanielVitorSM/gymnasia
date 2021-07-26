import React, { ReactNode } from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps & {
    icon: "user-alt" | "ruler-vertical" | "weight" | "venus-mars" | "ruler" | "calendar-alt";
    value: string | undefined;
    title: string;
    onClick?: ( title: string ) => void;
    children?: ReactNode;
}

export function SimpleDataCard({ icon, value, title, onClick, ...rest }: Props){
    function handleOnClick(){
        if(!onClick)
            return () => {};
        return onClick(title);
    }

    return(
        <RectButton onPress={handleOnClick} style={styles.container} {...rest}>
            <View  style={styles.header}>
                <FontAwesome5 
                    style={styles.icon} 
                    name={icon}
                    size={20} 
                    color={theme.colors.secondary_100} 
                />
                <Text style={styles.title}>
                    { title }
                </Text>
            </View>
            <Text style={styles.text}>
                { value || "Não definido"}
            </Text>
        </RectButton>
    );
};