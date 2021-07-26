import React, { useState } from 'react';
import { Text, SafeAreaView, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TrainCard } from '../../components/TrainCard';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { styles } from './styles';
import Data from '../../utils/train.json';

export interface ITrain {
    title: string,
    difficulty: string,
    duration: string,
    description: string,
    interval: number,
    uri: string,
    exercises: IExerciseTrain[];
}
export interface IExerciseTrain {
    order: number,
    name: string,
    gif: string,
    uuid: string,
    time: number,
}

export function Trains() {
    const [loading, setLoading] = useState(false);
    const Navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Header name="Treinos"/>
            {
                loading
                ?
                <Load />
                :
                <SectionList 
                    sections={Data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TrainCard data={item} onPress={() => Navigation.navigate("TrainModal", { data: item })}/>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.section}>{title}</Text>
                    )}
                    contentContainerStyle={styles.content}
                />
            }
        </SafeAreaView>
    )
}