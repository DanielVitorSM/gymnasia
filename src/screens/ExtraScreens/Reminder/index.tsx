import { format } from 'date-fns/esm/fp'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, ListRenderItemInfo, Pressable, Alert } from 'react-native'
import { Modalize } from 'react-native-modalize'

import TrashIconSVG from '../../../assets/icons/trash-alt.svg'

import { FloatingActionButton } from '../../../components/FloatingActionButton'
import { InputTime } from '../../../components/InputTime'
import { PrimaryButton } from '../../../components/PrimaryButton'

import { TopHeader } from '../../../components/TopHeader'
import { theme } from '../../../global/styles/theme'
import { typography } from '../../../global/styles/typography'
import { INotificationData, getNotificationsHistory, createNotifications, deleteHistoryNotification } from '../../../utils/notification'
import { styles } from './styles'

const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const weekDaysMin = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export function Reminder() {
    const modalRef = useRef<Modalize>(null);
    const [notifications, setNotifications] = useState<INotificationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [showActionButton, setShowActionButton] = useState(true);

    const [selectedTime, setSelectedTime] = useState(new Date(21 * 3600000));
    const [selectedDays, setSelectedDays] = useState([1, 2, 3, 4, 5, 6, 7]);

    function handleOpenModal(){
        setShowActionButton(false);
        modalRef.current?.open();
    }

    useEffect(() => {
        setLoading(true);
        (async() => {
            setNotifications(await getNotificationsHistory())
        })();
        setLoading(false);
    }, []);

    const PressableWeekDayBagdes = useCallback(() => {
        return weekDays.map((value, index) => {
            const isActive = selectedDays.indexOf(index + 1) !== -1;
            return(
                <View 
                    key={`badge-weekday-view-${index}`} 
                    style={[styles.badge, isActive && styles.active]}
                >
                    <Pressable 
                        key={`badge-weekday-button-${index}`}
                        onPress={() => {
                            setSelectedDays(state => {
                                if(isActive)
                                    return state.filter(value => value !== index + 1);
                                return [...state, index + 1];
                            })
                        }}
                    >
                        <Text key={`badge-weekday-text-${index}`} style={[typography.sub400, isActive && styles.active]}>{ value }</Text>
                    </Pressable>
                </View>
            );
        })
    }, [selectedDays]);

    const renderNotificationItem = useCallback(({ item }: ListRenderItemInfo<INotificationData>) => (
        <View style={styles.item}>
            <View>
                <Text style={[typography.heading400, { marginBottom: 5 }]}>{ `${item.hour}:${item.minute < 10 ? "0" + item.minute : item.minute}` }</Text>
                <Text style={typography.small300}>Repetir</Text>
                <Text style={typography.sub400}>{ item.days.map(value => weekDaysMin[value - 1]).join(", ") }</Text>
            </View>
            <View>
                <Pressable 
                    android_ripple={{
                        color: theme.colors.red,
                        borderless: true,
                        radius: 20
                    }}
                    style={styles.remove}
                    onPress={() => Alert.alert("Tem certeza?", "Tem certeza que deseja apagar essa notificação?", [
                        {
                            text: "Cancelar",
                            style: "cancel"
                        },
                        {
                            text: "Remover",
                            style: "destructive",
                            onPress: async () => {
                                let newNotifications = await deleteHistoryNotification(item);
                                setNotifications(state => newNotifications)
                            }
                        },
                    ], { cancelable: true })}
                >
                    <TrashIconSVG />
                </Pressable>
            </View>
        </View>
    ), [notifications]);

    return (
        <SafeAreaView style={styles.container}>
            <TopHeader 
                title="Lembretes"
            />
            {
                loading
                ?
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator style={{ alignSelf: "center" }} size={32} color={theme.colors.primary_light}/>
                </View>
                :
                <FlatList 
                    data={notifications}
                    keyExtractor={item => `flatlist-notification-${item.uid}`}
                    renderItem={renderNotificationItem}
                    contentContainerStyle={styles.list}
                />
            }
            {
                showActionButton
                &&
                <FloatingActionButton
                    onPress={() => handleOpenModal()}
                />
            }
            <Modalize
                ref={modalRef}
                onClose={() => setShowActionButton(true)}
                handlePosition="inside"
                modalStyle={{ borderTopEndRadius: 30, borderTopStartRadius: 30 }}
                childrenStyle={styles.modal}
                adjustToContentHeight
            >
                <Text style={[typography.info700, styles.center]}>Em qual horário deseja ser lembrado?</Text>
                <InputTime value={selectedTime} onChangeValue={setSelectedTime}/>
                <Text style={[typography.info700, styles.center, { marginTop: 20 }]}>Em quais dias da semana?</Text>
                <View style={[styles.badges, styles.center]}>
                    { PressableWeekDayBagdes() }
                </View>
                <PrimaryButton 
                    style={{ marginTop: 20 }} 
                    text="Adicionar"
                    onPress={async() => {
                        setNotifications(await createNotifications(selectedTime, selectedDays.sort()));
                        modalRef.current?.close()
                    }}
                />
            </Modalize>
        </SafeAreaView>
    )
}