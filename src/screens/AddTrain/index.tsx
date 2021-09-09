import React, { useState, useCallback, useEffect } from 'react'
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import { View, Text, Image, TouchableHighlight, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Keyboard, Animated, FlatList, ListRenderItemInfo, Pressable } from 'react-native'
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';

import { exercises as exercisesData } from '../../utils/exercises';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { ExercisesType } from '../MainScreens/Exercises';

export type IExerciseSelected = {
    name: string;
    uid: string;
    time: number;
}

const exampleData: IExerciseSelected[] = [
    {
        name: 'Abdominal supra esplinhal do quadrado do cateto',
        uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
        time: 30
    },
    {
        name: 'Polichinelo',
        uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
        time: 60
    },
    {
        name: 'Afundo',
        uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
        time: 20
    },
    {
        name: 'Agachamento',
        uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
        time: 15
    },
    {
        name: 'Agachamento',
        uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
        time: 15
    },
    {
        name: 'Agachamento',
        uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
        time: 15
    },
]

export function AddTrain() {
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("Médio");
    const [interval, setInterval] = useState("10");
    const [exercises, setExercises] = useState<IExerciseSelected[]>([]);
    const [isPublic, setIsPublic] = useState(false);

    const [exerciseMenuState, setExerciseMenuState] = useState({
        showModal: false,
        index: -1,
        dy: 0,
        data: {} as IExerciseSelected
    });
    const [exerciseSelectState, setExerciseSelectState] = useState({
        showModal: false,
        showIntervalModal: false,
        selectedInterval: '30',
        selectedExercise: {} as ExercisesType
    });

    function handleCloseExerciseMenuModal(){
        setExerciseMenuState({
            ...exerciseMenuState,
            showModal: false
        })
    }

    function handleCloseExerciseSelectModal(){
        setExerciseSelectState({
            ...exerciseSelectState,
            showModal: false,
            showIntervalModal: false
        })
    }

    function handleOpenExerciseIntevalModal(selected: ExercisesType){
        setExerciseSelectState({
            ...exerciseSelectState,
            showModal: true,
            showIntervalModal: true,
            selectedExercise: selected
        })
    }

    function handleCloseExerciseIntervalModal(){
        setExerciseSelectState({
            ...exerciseSelectState,
            showIntervalModal: false
        })
    }

    function addNewExerciseToList(){
        const { selectedExercise, selectedInterval } = exerciseSelectState;
        let newExercise: IExerciseSelected = {
            name: selectedExercise.name,
            time: Number(selectedInterval),
            uid: selectedExercise.uid
        }
        setExercises(state => {
            state.push(newExercise);
            return state;
        })
        setExerciseSelectState({
            ...exerciseSelectState,
            showIntervalModal: false,
            showModal: false,
            selectedExercise: {} as ExercisesType
        });
    }

    /**
     * List of selected exercises, has the selected exercises and a menu button to edit that
     */

    const exerciseRenderItem = useCallback(({ item, index, drag, isActive }: RenderItemParams<IExerciseSelected>) => (
            <TouchableOpacity 
                activeOpacity={.9} 
                onLongPress={drag}
                style={styles.item}
            >
                <Text numberOfLines={1} style={[styles.value, { flex: 1, textTransform: 'capitalize' }]}> { item.name } </Text>
                <View style={styles.row}>
                    <Text  style={styles.text}> { item.time }s </Text>
                    <TouchableOpacity 
                        activeOpacity={.9} 
                        style={styles.menu}
                        onPress={() => {
                            setExerciseMenuState({
                                dy: 0,
                                data: item,
                                index: index || 0,
                                showModal: true,
                            })
                        }}
                    >
                        <FontAwesome5 name="ellipsis-v" size={20} color={theme.colors.secondary_60} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
    ), [exercises]);

    /**
     * List of exercises footer, have a button to open Modal Select
     */

    const footerRenderItem = useCallback(() => (
        <TouchableOpacity 
            activeOpacity={.9}
            style={[styles.item, styles.add]}
            onPress={() => {
                setExerciseSelectState({
                    ...exerciseSelectState,
                    showModal: true,
                    showIntervalModal: false
                });
            }}
        >
            <FontAwesome5 name="plus" size={20} color={theme.colors.secondary_60} />
        </TouchableOpacity>
    ), []);

    /**
     * Modal Select Exercise Item, has a list with exercises to select
     */

    const exerciseSelectRenderItem = useCallback(({ item }: ListRenderItemInfo<ExercisesType>) => (
        <TouchableHighlight 
            underlayColor={theme.colors.black_transparent} 
            activeOpacity={1} 
            onPress={() => handleOpenExerciseIntevalModal(item)}
        >
            <View style={styles.exercise}>
                <Image 
                    style={styles.thumb}
                    source={item.image}
                />
                <View style={styles.info}>
                    <Text numberOfLines={1} style={[styles.heading, { textTransform: "uppercase" }]}>{ item.name }</Text>
                    <Text numberOfLines={2} style={styles.text}>{ item.muscles }</Text>
                </View>
                <FontAwesome5 name="angle-right" size={16} color={theme.colors.secondary_80} />
            </View>
        </TouchableHighlight>
    ), []);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback 
                containerStyle={styles.container}
                style={styles.container}
                onPress={() => Keyboard.dismiss()}
            >
                <View style={styles.header}>
                    <Text style={styles.heading}>Novo treino</Text>
                </View>

                <KeyboardAvoidingView 
                    style={[styles.container, { padding: 20 }]}
                    behavior="height"
                >
                    <Text style={styles.text}>Nome do treino:</Text>
                    <TextInput 
                        style={[styles.inputText, styles.value]}
                        keyboardType="default"
                        onChangeText={setName}
                        value={name}
                    />

                    <View style={styles.row}>
                        <View style={{ flex: 2/5 }}>
                            <Text style={styles.text}>Dificuldade:</Text>
                            <View style={styles.inputText}>
                                <Picker
                                    style={[styles.value]}
                                    mode="dialog"
                                    selectedValue={difficulty}
                                    onValueChange={setDifficulty}
                                    dropdownIconColor={theme.colors.secondary_80}
                                >
                                    <Picker.Item label="Fácil" value="Fácil"/>
                                    <Picker.Item label="Médio" value="Médio"/>
                                    <Picker.Item label="Difícil" value="Difícil"/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flex: 2/5 }}>
                            <Text style={styles.text}>Intervalo:</Text>
                            <View style={[styles.inputText, styles.row]}>
                                <TextInput 
                                    style={[styles.value, { flex: 1 }]}
                                    keyboardType="numeric"
                                    onChangeText={setInterval}
                                    value={interval}
                                />
                                <Text style={styles.text}>segundos</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.text}>Adicionar exercícios:</Text>
                        <View style={styles.row}>
                            <FontAwesome5 name="clock" size={16} color={theme.colors.secondary_80} />
                            <Text style={[styles.text, { marginLeft: 5 }]}>40s</Text>
                        </View>
                    </View>

                    <DraggableFlatList
                        data={exercises}
                        numColumns={1}
                        keyExtractor={(_, index) => `draggable-item-${index.toString()}`}
                        onDragEnd={({ data }) => setExercises(data)}
                        renderItem={exerciseRenderItem}
                        ListFooterComponent={footerRenderItem}
                        containerStyle={{ flex: 1, marginTop: 5 }}
                    />
                    <TouchableWithoutFeedback
                        onPress={() => setIsPublic(!isPublic)}
                        style={[styles.row, styles.check]}
                    >
                        <CheckBox 
                            value={isPublic}
                            onValueChange={setIsPublic}
                            boxType="square"
                            tintColors={{
                                true: theme.colors.primary,
                                false: theme.colors.secondary_70
                            }}
                        />
                        <Text style={styles.text}>Compartilhar com a comunidade</Text>
                    </TouchableWithoutFeedback>

                    <RectButton 
                        style={[
                            styles.button, 
                            !(name.length > 0 && difficulty.length > 0 && interval.length > 0 && exercises.length > 0) &&
                            { backgroundColor: theme.colors.secondary_70 }
                        ]}
                        enabled={name.length > 0 && difficulty.length > 0 && interval.length > 0 && exercises.length > 0}
                    >
                        <Text style={[styles.value, { color: 'white' }]}>Criar treino</Text>
                    </RectButton>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

            <Modal
                isVisible={exerciseMenuState.showModal}
                style={styles.overlay}
                coverScreen
                hasBackdrop
                useNativeDriver
                useNativeDriverForBackdrop
                backdropColor="black"
                swipeDirection={["down"]}
                backdropOpacity={0.75}
                onSwipeComplete={handleCloseExerciseMenuModal}
                onBackdropPress={handleCloseExerciseMenuModal}
                onBackButtonPress={handleCloseExerciseMenuModal}
                swipeThreshold={100}
                onSwipeMove={(p, g) => setExerciseMenuState({ ...exerciseMenuState, dy: g.dy})}
                onSwipeCancel={() => setExerciseMenuState({ ...exerciseMenuState, dy: 0})}
            >
                <Animated.View style={[styles.modal, {
                    paddingBottom: 20,
                    transform: [{
                        translateY: exerciseMenuState.dy
                    }]
                }]}>
                    <View style={styles.line} />
                    <TouchableOpacity 
                        style={styles.touchable}
                        onPress={() => {
                            
                        }}
                    >
                        <Text style={styles.value}>Alterar Tempo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.touchable}
                        onPress={() => {
                        }}
                    >
                        <Text style={styles.value}>Alterar Exercício</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.touchable}
                        onPress={() => {
                            setExercises(state => {
                                state.splice(exerciseMenuState.index, 0, exerciseMenuState.data);
                                return state;
                            })
                            handleCloseExerciseMenuModal();
                        }}
                    >
                        <Text style={styles.value}>Duplicar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.touchable}
                        onPress={() => {
                            setExercises(state => {
                                let newExercises = state.filter((value, index) => index !== exerciseMenuState.index);
                                return newExercises;
                            })
                            handleCloseExerciseMenuModal();
                        }}
                    >
                        <Text style={[styles.value, { color: 'red' }]}>Remover</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Modal>

            <Modal
                isVisible={exerciseSelectState.showModal}
                style={styles.overlay}
                coverScreen
                hasBackdrop
                useNativeDriver
                useNativeDriverForBackdrop
                backdropColor="black"
                backdropOpacity={0.75}
                onBackdropPress={handleCloseExerciseSelectModal}
                onBackButtonPress={handleCloseExerciseSelectModal}
            >
                <View style={styles.modal}>
                    <View style={[styles.line, { marginVertical: 20 }]} />
                    <FlatList 
                        data={exercisesData}
                        keyExtractor={item => `draggable-select-item-${item.uid}`}
                        renderItem={exerciseSelectRenderItem}
                        contentContainerStyle={styles.select}
                    />
                </View>
            </Modal>

            <Modal
                isVisible={exerciseSelectState.showIntervalModal}
                coverScreen
                hasBackdrop
                useNativeDriver
                useNativeDriverForBackdrop
                backdropColor="black"
                backdropOpacity={0.75}
                onBackdropPress={handleCloseExerciseIntervalModal}
                onBackButtonPress={handleCloseExerciseIntervalModal}
            >
                <View style={styles.dialog}>
                    <Text style={[styles.value, { color: 'black', textAlign: 'center' }]}>Em quanto tempo esse exercício deve ser realizado?</Text>
                    <TextInput 
                        style={styles.input} 
                        keyboardType="numeric"
                        value={exerciseSelectState.selectedInterval}
                        onChangeText={value => setExerciseSelectState({ ...exerciseSelectState, selectedInterval: value })}
                    />
                    <TouchableOpacity
                        activeOpacity={.7}
                        style={[
                            styles.press, 
                            (exerciseSelectState.selectedInterval === '') 
                            && 
                            { backgroundColor: theme.colors.secondary_70 }
                        ]}
                        disabled={exerciseSelectState.selectedInterval === ''}
                        onPress={addNewExerciseToList}
                    >
                        <Text style={[styles.heading, { color: theme.colors.white_smoke }]}>Adicionar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.7}
                        style={[styles.press, { backgroundColor: 'transparent'}]}
                        onPress={handleCloseExerciseIntervalModal}
                    >
                        <Text style={[styles.heading, { color: theme.colors.tertiary }]}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>

    )
}
