import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'; 

import { styles } from './styles';

type Props = RectButtonProps & {
    icon: "facebook-f" | "google" | "envelope" | "user-secret";
    color: string;
    text: string;
    loading?: boolean;
}

export function ButtonSocial({ color, icon, text, loading = false, ...rest }: Props) {
    return (
        <RectButton 
            style={[
                styles.button, 
                { backgroundColor: color }
            ]}
            {...rest}
        >
            {
                loading 
                ?
                <ActivityIndicator style={styles.load} color="white" size={24}/>
                :
                <>
                    <FontAwesome 
                        style={styles.icon} 
                        name={icon}
                        size={24} 
                        color="white" 
                    />
                    <Text style={styles.text}>
                        { text }
                    </Text>
                </>
            }
        </RectButton>
    )
}
