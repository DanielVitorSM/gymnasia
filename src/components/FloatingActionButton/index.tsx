import React from 'react';
import { View, Text, Pressable, PressableProps } from 'react-native';

import PlusIconSVG from '../../assets/icons/plus-alt.svg';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function FloatingActionButton({ ...rest }: PressableProps) {
    return (
        <View style={styles.container}>
            <Pressable 
                style={styles.button}
                android_ripple={{
                    color: theme.colors.gray_light,
                    borderless: true,
                    radius: 30
                }}
                { ...rest }
            >
                <PlusIconSVG stroke={theme.colors.white} width={32} height={32}/>
            </Pressable>
        </View>
    )
}
