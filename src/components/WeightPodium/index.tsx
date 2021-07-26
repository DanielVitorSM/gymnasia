import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

type Props = {
    min: number;
    now: number;
    max: number;
}

export function WeightPodium({ min, max, now }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.rank}>
                <Text style={styles.number}>{ min.toFixed(1) }</Text>
                <Text style={styles.label}>Menor Peso</Text>
            </View>
            <View style={styles.rank}>
                <Text style={[styles.number, styles.bigNumber]}>{ now.toFixed(1) }</Text>
                <Text style={[styles.label, styles.bigLabel]}>Peso Atual</Text>
            </View>
            <View style={styles.rank}>
                <Text style={styles.number}>{ max.toFixed(1) }</Text>
                <Text style={styles.label}>Maior Peso</Text>
            </View>
        </View>
    )
}
