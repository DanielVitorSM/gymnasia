import React from 'react'
import { View, Text, TouchableHighlight, Image, TouchableHighlightProps, Pressable, PressableProps, Alert } from 'react-native'

import DragIconSVG from '../../assets/icons/drag-alt.svg';
import CloseIconSVG from '../../assets/icons/close-alt';
import { styles } from './styles';
import { typography } from '../../global/styles/typography';
import { ITrainingExerciseItem } from '../../data/trainings';
import { getExerciseByUid } from '../../data/exercises';
import { format } from 'date-fns';

type Props = PressableProps & {
    data: ITrainingExerciseItem;
    onClosePress?: () => void;
}

export function ItemExerciseDraggable({ 
    data, 
    onClosePress = () => {},
    ...rest 
}: Props){
    const exercise = getExerciseByUid(data.uid);

    return(
        <View style={styles.container}>
            <Image 
                source={exercise?.image}
                resizeMode="cover"
                style={styles.image}
            />
            <View style={styles.group}>
                <Text 
                    numberOfLines={1} 
                    style={[
                        typography.text700, 
                        { paddingBottom: 5 }
                    ]}
                >
                    { exercise?.name }
                </Text>
                <Text 
                    numberOfLines={2} 
                    style={typography.sub300}
                >
                    { format(new Date(data.time * 1000), "mm:ss") }
                </Text>
            </View>
            <Pressable
                style={styles.close} 
                onPress={() => Alert.alert("Tem certeza?", "Deseja mesmo remover este exercício do treino?", [
                    {
                        text: "Cancelar",
                        style: "cancel"
                    },
                    {
                        text: "Remover",
                        onPress: onClosePress,
                        style: "destructive"
                    }
                ], 
                { 
                    cancelable: true 
                }
                )} 
                android_ripple={{ 
                    color: 'red', 
                    borderless: true
                }}
            >
                <CloseIconSVG />
            </Pressable>
            <Pressable { ...rest }>
                <DragIconSVG />
            </Pressable>
        </View>
    )
}