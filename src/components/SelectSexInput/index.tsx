import React, { Dispatch, SetStateAction, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';

import ManPng from '../../assets/man.png'
import WomanPng from '../../assets/woman.png'
import { styles } from './styles'

type Props = {
    onChangeSex: Dispatch<SetStateAction<string>>;
    value: string;
}

export function SelectSexInput({ value, onChangeSex }: Props) {
    const [selected, setSelected] = useState("M");

    return (
        <View style={styles.container}>
            <RectButton onPress={() => onChangeSex("M")} style={[styles.card, value === "M" && styles.active]}>
                <Image 
                    source={ManPng} 
                    style={styles.image}
                />
                <Text style={styles.text}>Masculino</Text>
            </RectButton>
            <RectButton onPress={() => onChangeSex("F")} style={[styles.card, value === "F" && styles.active]}>
                <Image 
                    source={WomanPng} 
                    style={styles.image}
                />
                <Text style={styles.text}>Feminino</Text>
            </RectButton>
        </View>
    )
}
