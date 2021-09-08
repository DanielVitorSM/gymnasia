import React, { useCallback } from 'react';
import { Text, Modal, FlatList, TouchableOpacity, Image } from 'react-native';
import { ExercisesType } from '../../screens/MainScreens/Exercises';

import { exercises } from '../../utils/exercises';
import { HeaderWithBack } from '../HeaderWithBack';
import { styles } from './styles';

type Props = {
    visible: boolean;
    onSelect?: (value: ExercisesType) => void;
    onDimiss?: () => void;
}

export function SelectExercise({ 
    visible, 
    onDimiss = () => {},
    onSelect = () => {}
}: Props) {

    return (
        <Modal
            visible={visible}
            animationType="fade"
        >
            <HeaderWithBack 
                name="Adicionar Exercício"
                onLeftPress={() => onDimiss()}
            />
            <FlatList
                numColumns={1}
                data={exercises}
                contentContainerStyle={styles.list}
                keyExtractor={item => item.uid}
                renderItem={useCallback(({ item }) => (
                    <TouchableOpacity
                        activeOpacity={.8}
                        key={item.uid + "-button"}
                        style={styles.item}
                        onPress={() => onSelect(item)}
                    >
                        <Image
                            key={item.uid + "-image"}
                            style={styles.image}
                            source={item.image}
                            resizeMode="contain"
                        />
                        <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                ), [])}
            />
        </Modal>
    )
}
