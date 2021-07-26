import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { format } from 'date-fns';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 

import { styles } from './styles';
import { useTrainContext } from '../../hooks/train-context';

export function TrainFinish() {
    const { startedAt } = useTrainContext();
    let spendTime = format(Date.now() - startedAt, "mm:ss");

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.time}>{ spendTime }</Text>
            <Text style={styles.info}>Tempo de Treino</Text>
            <Text style={styles.title}>
                <Text style={styles.green}>Parabéns</Text>
                , você completou {'\n'} mais uma sessão de treino!
            </Text>

            {/* <View style={styles.card}>
                <Text style={styles.number}>75</Text>
                <Text style={styles.info}>kcal perdidas</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.number}>12</Text>
                <Text style={styles.info}>exercícios realizados</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.number}>5</Text>
                <Text style={styles.info}>treinos completos</Text>
            </View>

            <RectButton style={styles.share}>
                <FontAwesome name="share" size={24} color="white" />
                <Text style={styles.text}>Compartilhar</Text>
            </RectButton> */}
        </SafeAreaView>
    )
}
