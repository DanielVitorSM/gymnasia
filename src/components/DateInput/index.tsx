import React, { useState, Dispatch,SetStateAction } from 'react'
import { Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { styles } from './styles'

type Props = RectButtonProps & {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
}

export function DateInput({ date, setDate, ...rest}: Props) {
    const [show, setShow] = useState<boolean>(false);

    function handleChangeDate(event: any, selectedDate: Date | undefined): void {
        setShow(false)
        setDate(selectedDate || date);
    }

    return (
        <>
            <RectButton onPress={() => setShow(true)} style={styles.container}>
                <Text style={styles.text}>{ format(date, "dd/MM/yyyy") }</Text>
            </RectButton>
            {
                show && 
                <DateTimePicker 
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={handleChangeDate}
                />
            }
        </>
    )
}
