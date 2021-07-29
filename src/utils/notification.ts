import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { v4 as uuidv4 } from 'uuid';

import { NotificationData } from '../components/ReminderCard';

export async function setDailyNotification(hour: number, minute: number): Promise<string>{
    try{
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hora de se Exercitar!",
                body: 'Venha para o Gymnasia completar mais um treino!'
            },
            trigger: {
                weekday: 1,
                hour,
                minute,
                repeats: true
            },
        })

        return notificationId;
    }catch(error){
        throw new Error("Não foi possível configurar uma nova notificação!");
    }
}

export async function resetNotifications(){
    await AsyncStorage.removeItem("@gymnasia:notifications")
    await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function getAllNotifications(){
    return await Notifications.getAllScheduledNotificationsAsync();
}

export async function getNotificationsHistory(): Promise<NotificationData[] | []>{
    try{
        let rawNotifications = await AsyncStorage.getItem("@gymnasia:notifications");
        if(!rawNotifications)
            return [];

        let notifications = JSON.parse(rawNotifications);
        return notifications;
    }catch(error){
        return [];
    }
}

export async function createNotifications(time: Date, days: number[]) {
    try{
        let hour = time.getHours();
        let minute = time.getMinutes();
        let rawData = await AsyncStorage.getItem("@gymnasia:notifications");
        let oldNotifications: NotificationData[] = JSON.parse(rawData || "[]");

        const ids: string[] = []
        await Promise.all(days.map(async value => {
            ids.push(await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Hora de se Exercitar!",
                    body: 'Venha para o Gymnasia completar mais um treino!'
                },
                trigger: {
                    weekday: value,
                    hour,
                    minute,
                    repeats: true
                },
            }));
        }))

        let newNotifications: NotificationData[] = [ ...oldNotifications, {
            active: true,
            uuid: uuidv4(),
            days,
            hour,
            minute,
            ids
        }]

        await AsyncStorage.setItem("@gymnasia:notifications", JSON.stringify(newNotifications));

        return newNotifications;
    }catch(error){
        throw new Error("Erro ao criar notificação");
    }
}

export async function recreateNotification(notification: NotificationData){
    try{
        await Promise.all(notification.ids.map(async (value, index) => {
            await Notifications.scheduleNotificationAsync({
                identifier: value,
                content: {
                    title: "Hora de se Exercitar!",
                    body: 'Venha para o Gymnasia completar mais um treino!'
                },
                trigger: {
                    weekday: notification.days[index],
                    hour: notification.hour,
                    minute: notification.minute,
                    repeats: true
                }
            })
        }))
    }catch(error){
        console.warn("Erro bonito", error)
    }
}

export async function deleteNotification(notification: NotificationData){
    try{
        await Promise.all(notification.ids.map(async value => {
            await Notifications.cancelScheduledNotificationAsync(value);
        }))
    }catch(error){
        console.warn("Erro bonito", error)
    }
}

export async function deleteHistoryNotification(notification: NotificationData){
    try{
        let rawData = await AsyncStorage.getItem("@gymnasia:notifications");
        let data: NotificationData[] = JSON.parse(rawData || "[]");
        let index = data.indexOf(notification)
        if(index)
            data.splice(index, 1);
        
        await AsyncStorage.setItem("@gymnasia:notifications", JSON.stringify(data));
        return data;
    }catch(error){
        console.warn("Erro bonito", error)
    }
}