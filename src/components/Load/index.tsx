import React from 'react'
import { View, Text, ActivityIndicator, ActivityIndicatorProps } from 'react-native'

import { styles } from './styles';

export function Load({ ...rest }: ActivityIndicatorProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator color="red" size={32} { ...rest }/>
        </View>
    )
}
