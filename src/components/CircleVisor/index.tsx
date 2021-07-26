import React, { useState, useEffect, SetStateAction, Dispatch, useCallback } from 'react'
import { View, Text } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'

import { styles } from './styles';

type Props = {
    title: string;
    time: number;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    onTimeFinish: () => void;
}

export function CircleVisor({ title, onTimeFinish, time, value, setValue }: Props) {
    useEffect(() => {
        if(value <= 0)
            return onTimeFinish();
        if(value > 0){
            let intervalId = setInterval(() => {
                setValue(value - 1);
            }, 1000);
    
            return () => clearInterval(intervalId);
        }
    }, [value])
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{ title }</Text>

            <ProgressCircle
                style={ { height: 120, width: 120 } }
                progress={value / time}
                progressColor={'purple'}
                startAngle={ -Math.PI }
                endAngle={ Math.PI }
            >
                <Text style={styles.time}>{ value }</Text>
            </ProgressCircle>
            
        </View>
    )
}
