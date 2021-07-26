import React from 'react';
import { ImageBackground, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { IExerciseTrain } from '../../screens/Trains';

type Props = {
    item: IExerciseTrain,
    index: number
}

/**
 * Elemento renderizado pelo carrousel do TrainExercise
 */

export function CarrouselItem({ item, index }: Props){
    const { black_transparent, transparent, white } = theme.colors;
    let { gif, name } = item;

    return (
        <ImageBackground
            source={{uri: gif || "sgers"}}
            style={styles.container}
        >
            <LinearGradient
                colors={[transparent, "#00000044"]}
                style={styles.gradient}
            >
                <Text style={styles.name}>{ name }</Text>
            </LinearGradient>
        </ImageBackground>

    )
}