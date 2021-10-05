import React, { useCallback, useState } from 'react'
import { TouchableWithoutFeedback, SafeAreaView, FlatList, ListRenderItemInfo, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { ItemTraining } from '../../../components/ItemTraining';
import { TopHeader } from '../../../components/TopHeader'
import { styles } from './styles';
import { ITrainingObject, trainings } from '../../../data/trainings'

export function Trainings() {
    const Navigation = useNavigation();
    const [trainingList, setTrainingList] = useState(trainings);

    const renderListItem = useCallback(({ item }: ListRenderItemInfo<ITrainingObject>) => (
        <ItemTraining 
            data={item}
            onPress={() => Navigation.navigate("TrainingInfoModal", { data: item })}
        />
    ), [trainingList]);

    const filterTrainings= useCallback((text: string) => {
        setTrainingList(state => {
            const array = trainings.filter(value => {
                text = text.toLowerCase();
                return value.name.toLowerCase().search(text) !== -1 || value.extra?.toLowerCase().search(text) !== -1;
            })
            return array;
        })
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <SafeAreaView>
                <TopHeader
                    title="Treinos"
                    extra="search"
                    onSeachChange={filterTrainings}
                />
                <FlatList
                    data={trainingList}
                    keyExtractor={(item) => `flatlist-trainings-${item.uid}`}
                    renderItem={renderListItem}
                    style={styles.list}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}