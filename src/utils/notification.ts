import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { NotificationContentInput } from 'expo-notifications';
import { v4 as uidv4 } from 'uuid';

import { NotificationData } from '../components/ReminderCard';
import { GYMNASIA_NOTIFICATIONS } from '../global/constants/asyncStorage';

const content: NotificationContentInput = {
    title: "Hora de se Exercitar!",
    body: 'Venha para o Gymnasia completar mais um treino!'
}

const allDays: number[] = [1, 2, 3, 4, 5, 6, 7]

/**
 * Get all notifications saved in AsyncStorage
 * @returns An NotificationData array contains all notifications
 */

export async function getNotificationsHistory(): Promise<NotificationData[] | []>{
    try{
        let rawNotifications = await AsyncStorage.getItem(GYMNASIA_NOTIFICATIONS);
        if(!rawNotifications)
            return [];

        let notifications = JSON.parse(rawNotifications);
        return notifications;
    }catch(error){
        return [];
    }
}

/**
 * Create notifications on time in certain days
 * @param time Date contains hours and minutes of notifications
 * @param days Array or null, contains days of week to allow notifications
 * @returns Returns new NotificationData array saved in AsyncStorage.
 */

export async function createNotifications(time: Date, days: number[] | null) {
    try{
        let hour = time.getHours();
        let minute = time.getMinutes();
        let rawData = await AsyncStorage.getItem(GYMNASIA_NOTIFICATIONS);
        let oldNotifications: NotificationData[] = JSON.parse(rawData || "[]");
        let trigger = {
            hour,
            minute,
            repeats: true
        }

        const ids: string[] = []

        if(days){
            await Promise.all(days.map(async value => {
                ids.push(await Notifications.scheduleNotificationAsync({
                    content,
                    trigger: {
                        weekday: value,
                        ...trigger
                    },
                }));
            }))
        }else{
            ids.push(await Notifications.scheduleNotificationAsync({
                content,
                trigger
            }));
        }

        let newNotifications: NotificationData[] = [ ...oldNotifications, {
            active: true,
            uid: uidv4(),
            days: days ? days : allDays,
            hour,
            minute,
            ids
        }]

        await AsyncStorage.setItem(GYMNASIA_NOTIFICATIONS, JSON.stringify(newNotifications));

        return newNotifications;
    }catch(error){
        throw new Error("Erro ao criar notificação");
    }
}

/**
 * Recreate schedule notification saved in AsyncStorage
 * @param notification Notification data to recreate on device
 */

export async function recreateNotification(notification: NotificationData){
    try{
        await Promise.all(notification.ids.map(async (value, index) => {
            await Notifications.scheduleNotificationAsync({
                identifier: value,
                content,
                trigger: {
                    weekday: notification.days[index],
                    hour: notification.hour,
                    minute: notification.minute,
                    repeats: true
                }
            })
        }))
    }catch(error){
        console.warn("Erro ao recrear notificação", error)
    }
}

/**
 * Delete notification from device
 * @param notification An NotificationData contains the notification
 */

export async function deleteNotification(notification: NotificationData){
    try{
        await Promise.all(notification.ids.map(async value => {
            await Notifications.cancelScheduledNotificationAsync(value);
        }))
    }catch(error){
        console.warn("Erro ao deletar notificação", error)
    }
}

/**
 * Delete notification from device and from AsyncStorage
 * @param notification An NotificationData contains the notification
 */

export async function deleteHistoryNotification(notification: NotificationData){
    try{
        await deleteNotification(notification);
        let rawData = await AsyncStorage.getItem(GYMNASIA_NOTIFICATIONS);
        let data: NotificationData[] = JSON.parse(rawData || "[]");
        let index = data.indexOf(notification)
        if(index)
            data.splice(index, 1);
        
        await AsyncStorage.setItem(GYMNASIA_NOTIFICATIONS, JSON.stringify(data));
        return data;
    }catch(error){
        console.warn("Erro ao deletar notificação", error)
    }
}