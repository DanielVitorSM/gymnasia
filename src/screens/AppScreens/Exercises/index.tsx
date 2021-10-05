import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, ListRenderItemInfo } from 'react-native';

import { ItemExercise } from '../../../components/ItemExercise';
import { TopHeader } from '../../../components/TopHeader';
import { exercises, IExerciseObject } from '../../../data/exercises';
import { styles } from './styles';

export function Exercises() {
    const Navigation = useNavigation();
    const [exercisesList, setExercisesList] = useState(exercises);

    const renderListItem = useCallback(({ item }: ListRenderItemInfo<IExerciseObject>) => (
        <ItemExercise 
            data={item}
            onPress={() => Navigation.navigate("ExerciseInfoModal", { exerciseUid: item.uid })}
        />
    ), [exercisesList]);

    const filterExercises= useCallback((text: string) => {
        setExercisesList(state => {
            const array = exercises.filter(value => {
                text = text.toLowerCase();
                return value.name.toLowerCase().search(text) !== -1 || value.muscles.toLowerCase().search(text) !== -1;
            })
            return array;
        })
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <SafeAreaView style={styles.container}>
                <TopHeader 
                    title="Exercícios"
                    extra="search"
                    onSeachChange={filterExercises}
                />
                <FlatList 
                    data={exercisesList}
                    keyExtractor={(item) => `flatlist-exercise-${item.uid}`}
                    renderItem={renderListItem}
                    contentContainerStyle={styles.list}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}