import React, { ReactNode, useEffect, useState } from 'react';
import { View, SafeAreaView, ImageBackground, Text, Pressable, PressableProps, Modal } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import ControlNextIconSVG from '../../../assets/icons/controller-next-alt.svg';
import InfoIconSVG from '../../../assets/icons/info-alt';
import ControlPauseIconSVG from '../../../assets/icons/pause-alt.svg';

import CountdownTimer from '../../../components/CountdownTimer';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { getExerciseByUid, IExerciseObject } from '../../../data/exercises';
import { theme } from '../../../global/styles/theme';
import { typography } from '../../../global/styles/typography';
import { useTrainingContext } from '../../../hooks/training';
import { TrainingScreenParams } from '../../../routes/training.routes';
import { styles } from './styles';

export function Practice({ navigation }: StackScreenProps<TrainingScreenParams, "Practic">) {
    const { activeExercise, training, nextExercise } = useTrainingContext();
    const [exercise, setExercise] = useState<IExerciseObject | undefined>();
    const [paused, setPaused] = useState(false);
    const [showPausedModal, setShowPausedModal] = useState(false);
    const Navigation = useNavigation();

    useEffect(() => {
        setExercise(getExerciseByUid(activeExercise.uid))
    }, []);

    useFocusEffect(() => {
        if(!showPausedModal)
            handlePause(false)
    });

    function handleNextExercise(){
        if(nextExercise())
            return navigation.replace("Rest");
        navigation.replace("Finish");
    }

    function handlePause(type: boolean){
        setPaused(state => type);
        setShowPausedModal(state => type);
    }

    const Control = ({ children, ...rest }: PressableProps & { children: ReactNode } ) => (
        <Pressable
            android_ripple={{
                color: theme.colors.gray_light,
                borderless: true,
                radius: 30
            }}
            hitSlop={20}
            { ...rest }
        >
            { children }
        </Pressable>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground 
                source={exercise?.image}
                style={styles.image}
            >
                <View style={styles.info}>
                    <Pressable
                        android_ripple={{
                            color: theme.colors.black
                        }}
                        hitSlop={30}
                        style={styles.info_button}
                        onPress={() => {
                            setPaused(true);
                            Navigation.navigate("ExerciseInfoModal", { exerciseUid: activeExercise.uid });
                        }}
                    >
                        <InfoIconSVG style={{ marginRight: 5 }} fill={theme.colors.yellow_sun} width={16} height={16}/>
                        <Text style={[typography.info700, { color: theme.colors.yellow_sun }]}>Mais Informações</Text>
                    </Pressable>
                </View>
            </ImageBackground>
            <View style={styles.container}>
                <Text numberOfLines={3} style={[typography.text300, styles.text]}>{ exercise?.name }</Text>
                <CountdownTimer
                    running={!paused}
                    duration={activeExercise.time}
                    onFinish={handleNextExercise}
                    style={styles.countdown}
                />
                <View style={styles.controls}>
                    <Control
                        onPress={() => handlePause(true)}
                    >
                        <ControlPauseIconSVG />
                    </Control>
                    <Control
                        onPress={handleNextExercise}
                    >
                        <ControlNextIconSVG />
                    </Control>
                </View>
            </View>
            <Modal
                visible={showPausedModal}
                onDismiss={() => handlePause(false)}
                transparent
                style={{ flex: 1 }}
            >
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={[typography.small300, { textAlign: "center" }]}>{ training.name }</Text>
                        <Text style={[typography.heading700, { marginBottom: 20 }]}>PAUSADO</Text>
                        <PrimaryButton  
                            text="Retomar"
                            onPress={() => handlePause(false)}
                        />
                        <PrimaryButton
                            onPress={() => {
                                handlePause(false);
                                navigation.popToTop();
                            }}
                            style={{ backgroundColor: theme.colors.red, marginTop: 10 }} 
                            text="Sair do Treino"
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}