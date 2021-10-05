import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ListRenderItemInfo, FlatList, Pressable, ActivityIndicator, Alert } from 'react-native';

import TimeIconSVG from '../../../assets/icons/timer-alt.svg';
import LevelIconSVG from '../../../assets/icons/level-alt.svg';
import TrashIconSVG from '../../../assets/icons/trash-alt.svg';

import { TopHeader } from '../../../components/TopHeader';
import { ITrainingObject, trainings } from '../../../data/trainings';
import { styles } from './styles';
import { theme } from '../../../global/styles/theme';
import { typography } from '../../../global/styles/typography';
import { FloatingActionButton } from '../../../components/FloatingActionButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { TrainingService } from '../../../storage/models/Trainings';

export function MyTrainings() {
    const Navigation = useNavigation();
    const [trainingsList, setTrainingsList] = useState<ITrainingObject[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(() => {
        setLoading(true)
        getTrainings();
        setLoading(false)
    })

    async function getTrainings(){
        setTrainingsList(await TrainingService.find());
    }

    function deleteTraining(uid: string){
        Alert.alert("Tem certeza?", "Se não tiver um backup essa ação não poderá ser desfeita!", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Apagar Treino",
                onPress: async() => {
                    await TrainingService.deleteById(uid) > 0;
                    setTrainingsList(await TrainingService.find());
                },
                style: "destructive"
            }
        ], { cancelable: true });
    }

    const renderTrainingItem = useCallback(({ item }: ListRenderItemInfo<ITrainingObject>) => (
        <View style={styles.item}>
            <Pressable 
                style={styles.press}
                android_ripple={{
                    color: theme.colors.primary_light
                }}
                onPress={() => Navigation.navigate("TrainingInfoModal", { data: item })}
            >
                <View style={{ flex: 1 }}>
                    <Text style={[typography.info700, { color: theme.colors.pink_cardinal }]}>{ item.exercises.length } EXERCÍCIOS</Text>
                    <Text style={[typography.text700, { marginBottom: 10 }]}>{ item.name.toUpperCase() }</Text>
                    <View style={styles.row}>
                        <LevelIconSVG width={20} style={{ marginRight: 5 }} fill={theme.colors.pink_cardinal}/>
                        <Text style={typography.small300}>{ item.difficulty }</Text>
                        <TimeIconSVG width={20} style={{ marginRight: 5, marginLeft: 15 }} fill={theme.colors.pink_cardinal}/>
                        <Text style={typography.small300}>{ item.duration }</Text>
                    </View>
                </View>
                <Pressable
                    android_ripple={{
                        color: theme.colors.red,
                        borderless: true,
                        radius: 20
                    }}
                    style={{ alignSelf: 'flex-start' }}
                    onPress={() => deleteTraining(item.uid)}
                >
                    <TrashIconSVG />
                </Pressable>
            </Pressable>
        </View>
    ), [trainingsList]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopHeader 
                title="Meus Treinos"
            />
            <View style={styles.container}>
                {
                    loading || trainingsList.length < 1
                    ?
                    <Text style={[typography.text300, { textAlign: 'center' }]}>Nenhum treino encontrado</Text>
                    :
                    <FlatList
                        data={trainingsList}
                        keyExtractor={(item, index) => `flatlist-my-training-${item.uid}-${index}`}
                        renderItem={renderTrainingItem}
                    />
                }
                <FloatingActionButton onPress={() => Navigation.navigate("MyTrainingsAdd")}/>
            </View>
        </SafeAreaView>
    )
}