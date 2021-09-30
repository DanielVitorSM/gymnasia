import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import UpIconSVG from '../../assets/icons/up-alt.svg';
import DownIconSVG from '../../assets/icons/down-alt.svg';

import { styles } from './styles'
import { typography } from '../../global/styles/typography';

type Props = {
    minutesAndSeconds?: boolean;
    value: Date;
    onChangeValue: (date: Date) => void;
}

export function InputTime({ value = new Date(0), onChangeValue, minutesAndSeconds = false }: Props) {
    const [num1, setNum1] = useState(minutesAndSeconds ? value.getMinutes() : value.getUTCHours() - 3);
    const [num2, setNum2] = useState(minutesAndSeconds ? value.getSeconds() : value.getMinutes());
    
    useEffect(() => {
        var seconds = minutesAndSeconds ? num1 * 60 + num2 : (num1 + 3) * 3600 + num2 * 60;
        let newValue = new Date(seconds * 1000);
        onChangeValue(newValue);
    }, [num1, num2]);

    return (
        <View style={styles.container}>
            <View style={styles.group}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNum1(state => {
                        let num = state + 1;
                        return minutesAndSeconds ? num % 60 : num % 24
                    })}
                >
                    <UpIconSVG />
                </TouchableOpacity>

                <Text style={[typography.text300, styles.text]}>
                    { num1 } { minutesAndSeconds ? "m" : "h"}
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNum1(state => {
                        let num = state - 1;
                        if(num < 0)
                            return minutesAndSeconds ? 60 + num : 24 + num
                        return minutesAndSeconds ? num % -60 : num % -24
                    })}
                >
                    <DownIconSVG />
                </TouchableOpacity>
            </View>

            <Text style={typography.text300}>:</Text>

            <View style={styles.group}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNum2(state => (state + 1) % 60)}
                >
                    <UpIconSVG />
                </TouchableOpacity>

                <Text style={[typography.text300, styles.text]}>
                    { num2 } { minutesAndSeconds ? "s" : "m"}
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNum2(state => {
                        let num = state - 1;
                        return (num < 0) ? 60 + num : num % 60;
                    })}
                >
                    <DownIconSVG />
                </TouchableOpacity>
            </View>
        </View>
    )
}
