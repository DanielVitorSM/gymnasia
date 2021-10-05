import React, { useRef, Ref, RefObject, createRef, useImperativeHandle, forwardRef, useEffect, useState } from 'react'
import { View, Text, Modal, Alert } from 'react-native'
import { styles } from './styles'
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { typography } from '../../global/styles/typography';
import { exercises } from '../../data/exercises';
import { ItemExercise } from '../ItemExercise';
import { ModalTime } from '../ModalTime';
import { InputTime } from '../InputTime';

type Props = ModalizeProps & {
    visible?: boolean;
    onSelectExercise?: (exercise: { uid: string, time: number }) => void;
}

export function ModalSelectExercise({ 
    visible = true,
    onSelectExercise = () => {},
    ...rest 
}: Props){
    const [time, setTime] = useState(new Date(30000));
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [exercise, setExercise] = useState("");
    const modalRef = useRef<Modalize>(null);

    function handleSubmitExercise(){
        onSelectExercise({
            uid: exercise,
            time: Math.round(time.getTime() / 1000)
        })
        setShowTimeModal(false);
        modalRef.current?.close();
    }

    useEffect(() => {
        if(visible)
            return modalRef.current?.open()
        modalRef.current?.close()
    }, [visible])

    return(
        <>
            <ModalTime 
                title="Em quanto tempo deve ser realizado?" 
                visible={showTimeModal} 
                onCancel={() => setShowTimeModal(false)}
                onSubmit={handleSubmitExercise}
            >
                <InputTime value={time} onChangeValue={setTime} minutesAndSeconds />
            </ModalTime>
            <Modalize
                handlePosition="inside"
                snapPoint={600}
                modalStyle={styles.container}
                ref={modalRef}
                { ...rest }
                HeaderComponent={() => (
                    <Text style={[typography.small700, { marginBottom: 15 }]}>Escolha o exercício para adicionar:</Text>
                )}
                flatListProps={{
                    data: exercises,
                    keyExtractor: (item, index) => `flatlist-exercise-${item.uid}`,
                    renderItem: ({ item }) => <ItemExercise data={item} onPress={() => {
                        setExercise(item.uid);
                        setShowTimeModal(true);
                    }}/>
                }}
            />
        </>
    )
}
