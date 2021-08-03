import React from 'react'
import { View, Text, ImageBackground, Alert } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme'; 
import { ITrain } from '../../screens/Trains';

type Props = RectButtonProps & {
    data: ITrain;
}

export function TrainCard({ data, ...rest }: Props) {
    return (
        <RectButton style={styles.container} { ...rest } rippleColor="white">
            <ImageBackground
                source={data.image}
                style={styles.image}
                imageStyle={{opacity: 0.7}}
            >
                <Text style={styles.title}>
                    {data.title}
                </Text>
                <View style={styles.content}>
                    <Ionicons 
                        name="speedometer" 
                        size={16} 
                        color={theme.colors.white} 
                    />
                    <Text style={styles.label}>
                        {data.difficulty}
                    </Text>

                    <Ionicons 
                        name="time" 
                        size={20} 
                        color={theme.colors.white} 
                    />
                    <Text style={styles.label}>
                        {data.duration}
                    </Text>
                </View>
            </ImageBackground>
        </RectButton>
    )
}
