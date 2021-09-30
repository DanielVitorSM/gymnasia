import React, { useCallback } from 'react'
import { TouchableWithoutFeedback, SafeAreaView, FlatList, ListRenderItemInfo, Keyboard } from 'react-native'

import { ItemTraining } from '../../../components/ItemTraining';
import { TopHeader } from '../../../components/TopHeader'
import { styles } from './styles';
import { ITrainingObject, trainings } from '../../../data/trainings'

export function Trainings() {
    const renderListItem = useCallback(({ item }: ListRenderItemInfo<ITrainingObject>) => (
        <ItemTraining data={item}/>
    ), []);

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <SafeAreaView>
                <TopHeader
                    title="Treinos"
                    extra="search"
                />
                <FlatList
                    data={trainings}
                    keyExtractor={(item) => `flatlist-trainings-${item.uid}`}
                    renderItem={renderListItem}
                    style={styles.list}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}