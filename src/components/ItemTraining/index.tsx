import React from 'react';
import { View, Text, Pressable, ImageBackground, PressableProps } from 'react-native';
import { ITrainingObject } from '../../data/trainings';
import { styles } from './styles';

import LevelIconSVG from '../../assets/icons/level-alt.svg';
import TimerIconSVG from '../../assets/icons/timer-alt.svg';
import { typography } from '../../global/styles/typography';
import { theme } from '../../global/styles/theme';

type Props = PressableProps & {
    data: ITrainingObject
}

export function ItemTraining({ data, ...rest }: Props) {
    return (
        <ImageBackground
            resizeMode="cover"
            source={data.image}
            style={styles.container}
        >
            <Pressable
                android_ripple={{
                    color: theme.colors.primary_light
                }}
                style={styles.button}
                { ...rest }
            >
                <View>
                    <Text numberOfLines={1} style={[typography.info700, { color: theme.colors.yellow_sun, textTransform: 'uppercase' }]}>{ data.extra }</Text>
                    <Text numberOfLines={2} style={[typography.text700, styles.title]}>{ data.name }</Text>
                </View>
                <View>
                    <View style={styles.row}>
                        <LevelIconSVG width={16} height={16} style={styles.icon}/>
                        <Text style={[typography.small300, styles.text]}>{ data.difficulty }</Text>
                    </View>
                    <View style={styles.row}>
                        <TimerIconSVG width={16} height={16} style={styles.icon}/>
                        <Text style={[typography.small300, styles.text]}>{ data.duration }</Text>
                    </View>
                </View>
            </Pressable>
        </ImageBackground>
    )
}
