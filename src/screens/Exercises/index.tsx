import React from 'react';
import { Text, SafeAreaView, FlatList, Image, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { Header } from '../../components/Header';
import { styles } from './styles';
import { exercises } from '../../utils/exercises';
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

    return (
        <SafeAreaView style={styles.container}>
            <Header name="Exercícios"/>
            <FlatList
                contentContainerStyle={styles.list}
                data={exercises}
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
        </SafeAreaView>
    )
}