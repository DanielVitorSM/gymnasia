import React, { useEffect, useState } from 'react'
import { View, Text, TextProps } from 'react-native'
import { format } from 'date-fns';

import { styles } from './styles';

type Props = TextProps & {
    running?: boolean;
    duration?: number;
    onChange?: (time: number) => void;
    onFinish?: () => void;
}

export default function CountdownTimer({ 
    onFinish = () => {},
    onChange,
    duration = 10,
    running = true,
    style,
    ...rest
}: Props) {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        if(time <= 0)
            return onFinish();
        if(time > 0 && running){
            const timer = setTimeout(() => {
                if(onChange)
                    onChange(time - 1)
                else
                    setTime(state => state - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [time, running]);

    useEffect(() => {
        setTime(state => duration);
    }, [duration])

    return (
        <Text
            style={[style, styles.text]}
            { ...rest }
        >
            { format(time * 1000, "mm:ss") }
        </Text>
    )
}
