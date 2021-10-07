import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Alert, Pressable, View } from 'react-native'

import ArrowLeftIconSVG from '../../assets/icons/arrow-left-alt'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'

type Props = {
    color?: string;
    share?: boolean;
}
export function TopHeaderSimple({ color = theme.colors.primary_light }: Props) {
    const Navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable
                hitSlop={50}
                onPress={() => Navigation.canGoBack() ? Navigation.goBack() : Alert.alert("Não tem como voltar")}
            >
                <ArrowLeftIconSVG stroke={color}/>
            </Pressable>
        </View>
    )
}
