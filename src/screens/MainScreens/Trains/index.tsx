import React, { useState } from 'react';
import { Text, SafeAreaView, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TrainCard } from '../../../components/TrainCard';
import { Header } from '../../../components/Header';
import { Load } from '../../../components/Load';
import { styles } from './styles';
import { trains } from '../../../utils/train';

export interface ITrain {
    title: string,
    difficulty: string,
    duration: string,
    description: string,
    interval: number,
    image: any,
    exercises: IExerciseTrain[];
}
export interface IExerciseTrain {
    order: number,
    name: string,
    image: any,
    uid: string,
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
                    sections={trains}
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