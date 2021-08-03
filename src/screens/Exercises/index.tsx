import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, Image, ActivityIndicator, View, ImageBackground } from 'react-native';
import { RectButton, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

import { Load } from '../../components/Load';
import { Header } from '../../components/Header';
import { styles } from './styles';
import { useDatabaseConnection } from '../../storage/connection';
import { ExerciseModel } from '../../storage/ExercisesRepository';
import { exercises } from '../../utils/exercises';
import SadPng from '../../assets/sad.png';
import { useNavigation } from '@react-navigation/native';

export type ExercisesType = {
    id?: string;
    uuid: string;
    name: string;
    image: any;
    muscles: string;
    capacity: string;
    howTo: string;
}

export function Exercises() {
    const Navigation = useNavigation();
    const { exercisesRepository } = useDatabaseConnection();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(exercises);

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
                        <TouchableHighlight
                            key={item.uuid + "Button"}
                            style={styles.cardItem}
                            onPress={() => {
                                Navigation.navigate("ExerciseModal", { data: item });
                            }}
                        >
                            <View>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardLabel}>{item.name}</Text>
                                </View>
                                <Image
                                    style={styles.cardImage}
                                    source={item.image}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableHighlight>
                    )}
                    keyExtractor={item => String(item.uuid)}
                />
            }
        </SafeAreaView>
    )
}