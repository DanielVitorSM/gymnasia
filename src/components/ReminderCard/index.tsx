import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

export type NotificationData = {
    uid: string;
    ids: Array<string>;
    hour: number;
    minute: number;
    days: Array<number>;
    active: boolean;
}

type Props = {
    data: NotificationData;
    onRemove: (data: NotificationData) => void;
    onActiveChange: (value: boolean, data: NotificationData) => Promise<boolean>;
}

export function ReminderCard({ data, onRemove, onActiveChange }: Props){
    const [active, setActive] = useState(data.active);
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    function convertDaysToWeekdays(array: number[]){
        let days: string[] = [];
        array.map(value => {
            days.push(weekdays[value - 1]);
        })

        return days.join(", ");
    }

    return (
        <Swipeable
            overshootRight={false}
            containerStyle={styles.container}
            renderRightActions={() =>
                <RectButton
                    style={styles.button}
                    onPress={() => {
                        onRemove(data);
                    }}
                >
                    <Feather name="trash-2" size={32} color='white' />
                </RectButton>
            }
        >
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>
                        { data.hour > 9 ? data.hour : "0" + data.hour }:{ data.minute > 9 ? data.minute : "0" + data.minute }
                    </Text>

                    <View>
                        <Text style={styles.subtitle}>
                            Repetir
                        </Text>
                        <Text style={styles.text}>
                            { convertDaysToWeekdays(data.days) }
                        </Text>
                    </View>
                </View>
                <Switch
                    value={active}
                    onValueChange={async value => {
                        let newValue = await onActiveChange(value, data);
                        setActive(newValue);
                    }}
                />
            </View>
        </Swipeable>
    )
}