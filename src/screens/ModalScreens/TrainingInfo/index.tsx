import { StackScreenProps } from '@react-navigation/stack'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ImageBackground, Pressable } from 'react-native'
import { Modalize } from 'react-native-modalize';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

import PlusIconSVG from '../../../assets/icons/plus-alt.svg';
import LevelIconSVG from '../../../assets/icons/level-alt.svg';
import TimerIconSVG from '../../../assets/icons/timer-alt.svg';
import SandIconSVG from '../../../assets/icons/sand-full-alt.svg';
import EditIconSVG from '../../../assets/icons/edit-alt.svg';

import { PrimaryButton } from '../../../components/PrimaryButton';
import { ItemExerciseDraggable } from '../../../components/ItemExerciseDraggable';
import { TopHeaderSimple } from '../../../components/TopHeaderSimple'
import { theme } from '../../../global/styles/theme'
import { typography } from '../../../global/styles/typography'
import { RootStackScreenParams } from '../../../routes/authenticated.routes'
import { ITrainingExerciseItem, ITrainingObject } from '../../../data/trainings';
import { styles } from './styles';
import { ModalSelectExercise } from '../../../components/ModalSelectExercise';
import { ModalTime } from '../../../components/ModalTime';
import { InputTime } from '../../../components/InputTime';

export function TrainingInfo({ route, navigation }: StackScreenProps<RootStackScreenParams, "TrainingInfoModal">) {
    const { image, extra, interval, name, difficulty, exercises } = route.params.data;
    const [exercisesList, setExercisesList] = useState(exercises);
    const [intervalDuration, setIntervalDuration] = useState(interval);
    const [showModalSelect, setShowModalSelect] = useState(false);
    const [showModalInterval, setShowModalInterval] = useState(false);

    function orderExercisesList(data: ITrainingExerciseItem[]){
        setExercisesList(state => data.map((value, index) => {
            return {
                ...value,
                order: index + 1
            }
        }))
    }

    const calcDurationOfTraining = useCallback((): number => {
        let time = interval * (exercisesList.length - 1);
        exercisesList.forEach(value => time += value.time);
        return Math.round(time / 60);
    }, [exercisesList]);

    const renderDraggableItem = useCallback(({ drag, item, index }: RenderItemParams<ITrainingExerciseItem>) => 
        <ItemExerciseDraggable 
            data={item} 
            onLongPress={drag}
            onClosePress={() => {
                orderExercisesList(exercisesList.filter((_, i) => i !== index));
            }}
        />
    , [exercisesList]);

    function handleGoToPractice(){
        console.log(exercisesList)
        let trainingEdited = {
            ...route.params.data,
            interval: intervalDuration,
            exercises: exercisesList
        } as ITrainingObject;
        navigation.navigate("TrainingRoutes", { data: trainingEdited })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground 
                style={styles.image}
                source={image}
                resizeMode="cover"
            >
                <View style={styles.content}>
                    <TopHeaderSimple />
                    <View style={styles.info}>
                        <Text style={[typography.info700, { color: theme.colors.yellow_sun, textTransform: 'uppercase' }]}>
                            { extra }
                        </Text>
                        <Text style={[typography.heading700, styles.text]}>{ name }</Text>
                        <View style={[styles.row, { marginTop: 15, justifyContent: 'space-between' }]}>
                            <View style={styles.row}>
                                <LevelIconSVG/>
                                <Text style={[typography.small300, styles.text, styles.small]}>{ difficulty }</Text>
                                <TimerIconSVG/>
                                <Text style={[typography.small300, styles.text, styles.small]}>{ calcDurationOfTraining() } mins</Text>
                                <SandIconSVG/>
                                <Text style={[typography.small300, styles.text, styles.small]}>{ intervalDuration } segs</Text>
                            </View>
                            <Pressable 
                                style={styles.edit}
                                android_ripple={{
                                    color: theme.colors.gray_light,
                                    borderless: true,
                                    radius: 20
                                }}
                                hitSlop={25}
                                onPress={() => setShowModalInterval(true)}
                            >
                                <EditIconSVG />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.bottom}>
                <DraggableFlatList 
                    data={exercisesList}
                    keyExtractor={(item, index) => `draggable-item-${index}-${item.uid}`}
                    renderItem={renderDraggableItem}
                    showsVerticalScrollIndicator={false}
                    onDragEnd={({ data }) => orderExercisesList(data)}
                    ItemSeparatorComponent={() => <View style={styles.line}/>}
                />
                <View style={{ paddingTop: 20, flexDirection: 'row' }}>
                    <Pressable 
                        style={styles.add}
                        android_ripple={{ 
                            color: theme.colors.gray_light, 
                            borderless: true, 
                            radius: 25
                        }}
                        onPress={() => setShowModalSelect(true)}
                    >
                        <PlusIconSVG />
                    </Pressable>
                    <PrimaryButton 
                        style={{ flex: 1 }} 
                        text="Treinar"
                        onPress={handleGoToPractice}
                    />
                </View>
            </View>

            <ModalSelectExercise 
                visible={showModalSelect}
                onSelectExercise={exercise => {
                    let data = { ...exercise, order: exercisesList.length + 1 } as ITrainingExerciseItem
                    setExercisesList(state => [...state, data]);
                    setShowModalSelect(false);
                }}
                onClose={() => setShowModalSelect(false)}
            />

            <ModalTime
                title="Quanto tempo de intervalo entre cada série?"
                visible={showModalInterval}
                onCancel={() => setShowModalInterval(false)}
                onSubmit={() => setShowModalInterval(false)}
            >
                <InputTime
                    minutesAndSeconds
                    value={new Date(intervalDuration * 1000)} 
                    onChangeValue={date => {
                        setIntervalDuration(date.getTime() / 1000);
                    }}
                />
            </ModalTime>
        </SafeAreaView>
    )
}