import React, { useState } from 'react'
import { View, TouchableOpacity, Text} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

import CalendarIconSVG from '../../assets/icons/calendar-alt.svg';
import { typography } from '../../global/styles/typography';
import { styles } from './styles';
import { format } from 'date-fns';

type Props = {
    date?: Date;
    onChangeDate?: (date: Date) => void;
    minimumDate?: Date;
    maximumDate?: Date;
}

export function InputDate({ 
    onChangeDate = () => {}, 
    date = new Date(),
    minimumDate = new Date(Date.now() - (114 * 31536000000)),
    maximumDate = new Date(Date.now() - (12 * 31536000000))
}: Props) {
    const [showDatePicker, setShowDatePicker] = useState(false);

    function handleChangeDate(_: any, date?: Date) {
        if(date){
            onChangeDate(date);
        }
        setShowDatePicker(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => setShowDatePicker(true)}
        >
                <Text
                    style={typography.text300}
                >
                    { format(date, "dd/MM/yyyy")}
                </Text>
                <CalendarIconSVG/>
            </TouchableOpacity>
            {
                showDatePicker
                &&
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    onChange={handleChangeDate}
                />
            }
        </View>
    )
}
