import React, { useCallback } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns'

import AwardImageSVG from '../../../assets/award.svg';
import FlashIconSVG from '../../../assets/icons/flash-alt.svg';
import TimerIconSVG from '../../../assets/icons/timer-alt.svg';
import DumbbellIconSVG from '../../../assets/icons/dumbbell-alt';

import { PrimaryButton } from '../../../components/PrimaryButton';
import { theme } from '../../../global/styles/theme'
import { typography } from '../../../global/styles/typography'
import { styles } from './styles'
import { useTrainingContext } from '../../../hooks/training';
import { TrainingScreenParams } from '../../../routes/training.routes';
import { useAuth } from '../../../hooks/authentication';

const mets = [{ type: "Iniciante", met: 3.5 }, { type: "Intermediário", met: 5 }, { type: "Avançado", met: 7.5 }]

export function Finish({ navigation }: StackScreenProps<TrainingScreenParams, "Finish">) {
    const { totalDuration, training } = useTrainingContext();
    const { userData: { weight } } = useAuth();

    const calcKcalLost = useCallback(() => {
        let duration = (training.exercises.length - 1) * training.interval;
        training.exercises.forEach(value => duration += value.time);
        let hours = (totalDuration / 1000) < duration ? totalDuration / 3600000 : duration / 3600;
        let met = mets.find(value => value.type === training.difficulty)?.met || mets[0].met;
        return hours * met * weight;
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <AwardImageSVG width={150}/>
            <Text style={[typography.heading700, styles.title]}>Parabéns por ter completado este treino</Text>
            <View style={styles.row}>
                <View style={styles.card}>
                    <FlashIconSVG style={styles.icon} width={32} height={32}/>
                    <Text style={[typography.text500, styles.text]}>{ calcKcalLost().toFixed(0) } kcal</Text>
                    <Text style={[typography.small300, styles.text]}>perdidas</Text>
                </View>
                <View style={styles.card}>
                    <TimerIconSVG style={styles.icon} width={32} height={32}/>
                    <Text style={[typography.text500, styles.text]}>{ format(totalDuration, "mm:ss") }</Text>
                    <Text style={[typography.small300, styles.text]}>decorridos</Text>
                </View>
                <View style={styles.card}>
                    <DumbbellIconSVG style={styles.icon} width={32} height={32} fill={theme.colors.yellow_sun}/>
                    <Text style={[typography.text500, styles.text]}>{ training.exercises.length }</Text>
                    <Text style={[typography.small300, styles.text]}>exercícios</Text>
                </View>
            </View>
            <PrimaryButton 
                style={{ backgroundColor: theme.colors.primary_dark, elevation: 5 }}
                onPress={() => navigation.popToTop()}
            />
        </SafeAreaView>
    )
}