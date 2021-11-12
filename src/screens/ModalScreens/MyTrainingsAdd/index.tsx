import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, Pressable, SafeAreaView, Alert } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { Modalize } from 'react-native-modalize';

import PlusIconSVG from '../../../assets/icons/plus-alt.svg';
import { InputNumber } from '../../../components/InputNumber';
import { InputText } from '../../../components/InputText';
import { ItemExerciseDraggable } from '../../../components/ItemExerciseDraggable';
import { ModalSelectExercise } from '../../../components/ModalSelectExercise';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { ITrainingExerciseItem } from '../../../data/trainings';
import { theme } from '../../../global/styles/theme';
import { typography } from '../../../global/styles/typography';
import { RootStackScreenParams } from '../../../routes/authenticated.routes';
import { TrainingModel, TrainingService } from '../../../storage/models/Trainings';
import { styles } from './styles';

export function MyTrainingsAdd({ navigation }: StackScreenProps<RootStackScreenParams, "MyTrainingsAdd">) {
    const [showSelectExerciseModal, setShowSelectExerciseModal] = useState(false);
    const [exercisesList, setExercisesList] = useState<ITrainingExerciseItem[]>([]);
    const [name, setName] = useState("");
    const [interval, setInterval] = useState(10);
    const [level, setLevel] = useState("Iniciante");
    const modalInfoRef = useRef<Modalize>(null);

    const renderExerciseListItem = useCallback(({ item, index, drag }: RenderItemParams<ITrainingExerciseItem>) => (
        <ItemExerciseDraggable 
            data={item} 
            onLongPress={drag} 
            onClosePress={() => orderExercisesList(exercisesList.filter((_, i) => i !== index))}
        />
    ), [exercisesList]);

    function orderExercisesList(data: ITrainingExerciseItem[]){
        setExercisesList(state => data.map((value, index) => {
            return {
                ...value,
                order: index + 1
            }
        }))
    }

    async function handleCreateNewTraining(){
        if(exercisesList.length < 1){
            return Alert.alert("Nenhum exercício", "Adicione ao menos um exercício para criar este treino");
        }

        if(name.length < 1){
            return Alert.alert("Nome muito curto", "O nome do treino deve ter ao menos 5 caracteres");
        }

        let allDurationSeconds = (exercisesList.length - 1) * interval;
        exercisesList.forEach(value => allDurationSeconds += value.time)
        const newTraining = new TrainingModel(name, level, Math.round(allDurationSeconds / 60) + " mins", interval, JSON.stringify(exercisesList))
        if(await TrainingService.add(newTraining) > 0){
            return navigation.popToTop();
        }
        Alert.alert("Houve um problema", "Tivemos um problema ao adicionar o treino, tente novamente.")
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text style={typography.heading700}>Novo treino</Text>
                <View style={styles.header}>
                    <Text style={typography.info700}>Quais os exercícios desse treino?</Text>
                    <Pressable
                        android_ripple={{
                            color: theme.colors.primary_light,
                            borderless: true,
                            radius: 20
                        }}
                        hitSlop={40}
                        onPress={() => setShowSelectExerciseModal(true)}
                    >
                        <PlusIconSVG stroke={theme.colors.primary_light}/>
                    </Pressable>
                </View>
                <DraggableFlatList
                    data={exercisesList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `draggable-exercise-${item.uid}-${index}`}
                    renderItem={renderExerciseListItem}
                    onDragEnd={({ data }) => orderExercisesList(data)}
                />
                <View style={styles.footer}>
                    <PrimaryButton 
                        text="Cancelar"
                        style={{ backgroundColor: theme.colors.gray_medium, flex: 1/3, marginRight: 20 }}
                        onPress={() => navigation.popToTop()}
                    />
                    <PrimaryButton 
                        style={{ flex: 2/3 }}
                        onPress={() => exercisesList.length >= 1 ? modalInfoRef.current?.open() : Alert.alert("Nenhum exercício", "Adicione ao menos um exercício para continuar")}
                    />
                </View>
            </SafeAreaView>
            <ModalSelectExercise 
                visible={showSelectExerciseModal}
                onClose={() => setShowSelectExerciseModal(false)}
                onSelectExercise={exercise => setExercisesList(state => [...state, { ...exercise, order: state.length }])}
            />
            <Modalize
                ref={modalInfoRef}
                handlePosition="inside"
                childrenStyle={{ padding: 20, paddingTop: 30 }}
                adjustToContentHeight
                closeOnOverlayTap={false}
            >
                <Text style={[typography.info700, styles.text]}>Como quer chamar esse treino?</Text>
                <InputText 
                    placeholder="Nome do Treino"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={[typography.info700, styles.text]}>Quanto tempo de descanso entre cada exercício?</Text>
                <InputNumber 
                    numberValue={interval}
                    onChangeNumberValue={setInterval}
                    minNumber={5}
                    maxNumber={120}
                />
                <Text style={[typography.info700, styles.text, { marginTop: 10 }]}>Qual a dificuldade desse treino?</Text>
                <View style={styles.select}>
                    <Pressable
                        style={[styles.button, level == "Iniciante" && styles.active]}
                        onPress={() => setLevel("Iniciante")}
                    >
                        <Text style={typography.sub400}>Iniciante</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, level == "Intermediário" && styles.active]}
                        onPress={() => setLevel("Intermediário")}
                    >
                        <Text style={typography.sub400}>Intermediário</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, level == "Avançado" && styles.active]}
                        onPress={() => setLevel("Avançado")}
                    >
                        <Text style={typography.sub400}>Avançado</Text>
                    </Pressable>
                </View>
                <PrimaryButton 
                    style={{ marginTop: 20 }}
                    enabled={name.length >= 5}
                    text="Adicionar"
                    onPress={handleCreateNewTraining}
                />
                <PrimaryButton 
                    style={{ marginTop: 10, backgroundColor: theme.colors.red }}
                    text="Cancelar"
                    onPress={() => modalInfoRef.current?.close()}
                />
            </Modalize>
        </>
    )
}
