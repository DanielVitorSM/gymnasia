import React from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native'
import { styles } from './styles'
import { theme } from '../../global/styles/theme'

type Props = TextInputProps & {
    hint: string;
}

export function MeasureInput({ hint, ...rest}: Props) {
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholderTextColor={theme.colors.secondary_100} 
                {...rest}
            />
            <Text style={styles.text}>{ hint }</Text>
        </View>
    )
}
