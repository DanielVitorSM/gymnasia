import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, Image, ActivityIndicator, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Load } from '../../components/Load';
import { Header } from '../../components/Header';
import { styles } from './styles';
import { ExerciseModal } from '../ExerciseModal';
import { useDatabaseConnection } from '../../storage/connection';
import { ExerciseModel } from '../../storage/ExercisesRepository';
import Data from '../../utils/exercises.json';
import SadPng from '../../assets/sad.png';
import { useNavigation } from '@react-navigation/native';

export type ExercisesType = {
    id: string;
    name: string;
    gif?: string;
    muscles?: string;
    capacity?: string;
    howTo?: string;
}

export function Exercises() {
    const Navigation = useNavigation();
    const { exercisesRepository } = useDatabaseConnection();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ExerciseModel[]>(Data as ExerciseModel[]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseModel>({} as ExerciseModel);

    async function handleGetExercises(){
        let data = await exercisesRepository.getAll();

        // if(data.length == 0){
        //     await exercisesRepository.createMany(Data);
        //     data = await exercisesRepository.getAll();
        // }


        // setLoading(true)
        // handleGetExercises();
        // setLoading(false)

        setData(data);
    }

    useEffect(() => {
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header name="Exercícios"/>

            {
                loading
                ? 
                <Load />
                :
                <FlatList
                    contentContainerStyle={styles.list}
                    data={data}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <RectButton
                            enabled
                            key={item.uuid}
                            style={styles.cardItem}
                            onPress={() => {
                                Navigation.navigate("ExerciseModal", { data: item });
                            }}
                        >
                            <Image style={styles.cardImage} source={item.gif ? { uri: item.gif } : SadPng}/>
                            <Text style={styles.cardLabel}>{item.name}</Text>
                        </RectButton>
                    )}
                    keyExtractor={item => String(item.uuid)}
                />
            }
        </SafeAreaView>
    )
}