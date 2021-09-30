import React, { useCallback } from 'react';
import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, ListRenderItemInfo } from 'react-native';

import { ItemExercise } from '../../../components/ItemExercise';
import { TopHeader } from '../../../components/TopHeader';
import { exercises, IExerciseObject } from '../../../data/exercises';
import { styles } from './styles';

export function Exercises() {
    const renderListItem = useCallback(({ item, index, separators}: ListRenderItemInfo<IExerciseObject>) => (
        <ItemExercise 
            data={item}
            onPress={() => {}}
        />
    ), []);

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <SafeAreaView style={styles.container}>
                <TopHeader 
                    title="Exercícios"
                    extra="search"
                />
                <FlatList 
                    data={exercises}
                    keyExtractor={(item) => `flatlist-exercise-${item.uid}`}
                    renderItem={renderListItem}
                    contentContainerStyle={styles.list}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}