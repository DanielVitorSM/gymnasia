import React, { Dispatch, SetStateAction } from 'react'
import { View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';

import ManSvg from '../../assets/man.svg'
import WomanSvg from '../../assets/woman.svg'
import { styles } from './styles'

type Props = {
    onChangeSex: Dispatch<SetStateAction<string>>;
    value: string;
}

export function SelectSexInput({ value, onChangeSex }: Props) {
    return (
        <View style={styles.container}>
            <RectButton onPress={() => onChangeSex("M")} style={[styles.card, value === "M" && styles.active]}>
                <ManSvg height={80} width={80}/>
                <Text style={styles.text}>Masculino</Text>
            </RectButton>
            <RectButton onPress={() => onChangeSex("F")} style={[styles.card, value === "F" && styles.active]}>
                <WomanSvg height={80} width={80}/>
                <Text style={styles.text}>Feminino</Text>
            </RectButton>
        </View>
    )
}
