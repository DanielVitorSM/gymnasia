import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { NotificationContentInput } from 'expo-notifications';
import { v4 as uidv4 } from 'uuid';

import { GYMNASIA_NOTIFICATIONS } from '../global/constants/asyncStorage';

export interface INotificationData {
    uid: string,
    days: number[],
    time: Date;
    ids: string[]
}

const content: NotificationContentInput = {
    title: "Hora de se Exercitar!",
    body: 'Venha para o Gymnasia completar mais um treino!'
}

const allDays: number[] = [1, 2, 3, 4, 5, 6, 7]

/**
 * Get all notifications saved in AsyncStorage
 * @returns An NotificationData array contains all notifications
 */

export async function getNotificationsHistory(): Promise<INotificationData[]>{
    try{
        let rawNotifications = await AsyncStorage.getItem(GYMNASIA_NOTIFICATIONS);
        return rawNotifications ? JSON.parse(rawNotifications) : [];
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

export async function createNotifications(time: Date, days: number[] = allDays) {
    try{
        const hour = time.getHours();
        const minute = time.getMinutes();
        const rawData = await AsyncStorage.getItem(GYMNASIA_NOTIFICATIONS);
        const oldNotifications = JSON.parse(rawData || "[]") as INotificationData[];
        const trigger = {
            hour,
            minute,
            repeats: true
        };
        let ids: string[] = [];

        if(days.length !== 7){
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

        let newNotifications: INotificationData[] = [ ...oldNotifications, {
            uid: uidv4(),
            days,
            time,
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

export async function recreateNotification(notification: INotificationData){
    try{
        await Promise.all(notification.ids.map(async (value, index) => {
            if(notification.days.length === 7){
                await Notifications.scheduleNotificationAsync({
                    identifier: value,
                    content,
                    trigger: {
                        hour: notification.time.getHours(),
                        minute: notification.time.getHours(),
                        repeats: true
                    }
                })
            }else{
                await Notifications.scheduleNotificationAsync({
                    identifier: value,
                    content,
                    trigger: {
                        weekday: notification.days[index],
                        hour: notification.time.getHours(),
                        minute: notification.time.getHours(),
                        repeats: true
                    }
                })
            }
        }))
    }catch(error: any){
        throw new Error("Erro ao ativar a notificação: " + error.message);
    }
}

/**
 * Delete notification from device
 * @param notification An NotificationData contains the notification
 */

export async function deleteNotification(notification: INotificationData){
    try{
        await Promise.all(notification.ids.map(async value => {
            await Notifications.cancelScheduledNotificationAsync(value);
        }))
    }catch(error: any){
        throw new Error("Erro ao desativar a notificação: " + error.message);
    }
}

/**
 * Delete notification from device and from AsyncStorage
 * @param notification An NotificationData contains the notification
 */

export async function deleteHistoryNotification(notification: INotificationData){
    try{
        await deleteNotification(notification);
        let rawData = await AsyncStorage.getItem(GYMNASIA_NOTIFICATIONS);
        let data = JSON.parse(rawData || "[]") as INotificationData[];
        let newData = data.filter(value => value.uid !== notification.uid)
        await AsyncStorage.setItem(GYMNASIA_NOTIFICATIONS, JSON.stringify(newData));
        
        return newData;
    }catch(error: any){
        throw new Error("Erro ao deletar a notificação: " + error.message);
    }
}

/**
 * Delete all notification from device and from AsyncStorage
 */

export async function deleteAllNotifications(){
    try{
        await Notifications.cancelAllScheduledNotificationsAsync();
        await AsyncStorage.removeItem(GYMNASIA_NOTIFICATIONS);
    }catch(error: any){
        throw new Error("Erro ao deletar todas as notificações: " + error.message);
    }
}