import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, FlatList } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { NotificationData, ReminderCard } from '../../components/ReminderCard';
import { createNotifications, deleteHistoryNotification, deleteNotification, getNotificationsHistory, recreateNotification } from '../../utils/notification';
import { Entypo } from '@expo/vector-icons'; 
import { styles } from './styles';
import { ModalDaysSelect } from '../../components/ModalDaysSelect';

export function Reminder() {
    const [data, setData] = useState<NotificationData[] | []>([]);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDaysSelect, setShowDaysSelect] = useState(false);
    const [time, setTime] = useState(new Date());

    function handleChangeTime(event: any, selectedTime: Date | undefined): void {
        setShowTimePicker(false);
        if(selectedTime){
            setTime(selectedTime);
            setShowDaysSelect(true);
        }
    }

    async function handleSubmitDaysSelect(days: number[]){
        setShowDaysSelect(false);
        if(days.length == 0)
            return false;
        let newData = await createNotifications(time, days);
        setData(newData);
    }

    async function handleDelete(notification: NotificationData){
        await deleteNotification(notification)
        let newData = await deleteHistoryNotification(notification);
        if(newData)
            setData(newData);
    }

    async function handleAble(value: boolean, notification: NotificationData): Promise<boolean>{
        if(value){
            await recreateNotification(notification);
            return true;
        }else{
            await deleteNotification(notification);
            return false;
        }
    }

    useEffect(() => {
        async function loadNotifications(){
            let loadedData = await getNotificationsHistory();
            setData(loadedData);
        }

        loadNotifications();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header name="Lembrete" />
            <FlatList 
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => 
                    <ReminderCard 
                        data={item}
                        onActiveChange={handleAble}
                        onRemove={handleDelete}
                    />
                }
                style={styles.list}
            />
            <BorderlessButton 
                style={styles.button}
                onPress={() => setShowTimePicker(true)}
            >
                <Entypo name="plus" size={32} color="white" />
            </BorderlessButton>
            {
                showTimePicker && 
                <DateTimePicker 
                    value={time}
                    mode="time"
                    display="spinner"
                    onChange={handleChangeTime}
                />
            }
            <ModalDaysSelect
                visible={showDaysSelect}
                onCompleteSelection={handleSubmitDaysSelect}
            />
        </SafeAreaView>
    )
}