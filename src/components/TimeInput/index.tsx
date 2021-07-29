import React, { useState, Dispatch,SetStateAction } from 'react'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'react-native'
import { format } from 'date-fns'

import { styles } from './styles'

type Props = RectButtonProps & {
    time: Date;
    setTime: Dispatch<SetStateAction<Date>>;
}

export function TimeInput({ time, setTime, ...rest}: Props) {
    const [show, setShow] = useState<boolean>(false);

    function handleChangeTime(event: any, selectedTime: Date | undefined): void {
        setShow(false)
        setTime(selectedTime || time);
    }

    return (
        <>
            <RectButton onPress={() => setShow(true)} style={styles.container}>
                <Text style={styles.text}>{ format(time, "HH:mm") }</Text>
            </RectButton>
            {
                show && 
                <DateTimePicker 
                    value={time}
                    mode="time"
                    display="spinner"
                    onChange={handleChangeTime}
                />
            }
        </>
    )
}
