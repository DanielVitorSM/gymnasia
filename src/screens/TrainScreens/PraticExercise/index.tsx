import React, { useState } from 'react';
import { View, SafeAreaView, Text, Image } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 

import { useTrainContext } from '../../../hooks/train-context';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { PauseModal } from '../../PauseModal';
import { styles } from './styles';
import { theme } from '../../../global/styles/theme';
import { IExerciseTrain } from '../../MainScreens/Trains';

export function PraticExercise(){
    const Navigation = useNavigation();
    const { exerciseActive, nextExercise, setFinishedAt, previousExercise } = useTrainContext();
    const [paused, setPaused] = useState(false);
    const [exercise, setExercise] = useState({} as IExerciseTrain);

    function handleNext(){
        let next = nextExercise();
        if(next)
            return Navigation.navigate("RestExercise");
        
        setFinishedAt(Date.now());
        Navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                { name: "TrainFinish" }
            ]
        }))
    }

    function handlePrevious(){
        let previous = previousExercise();
        if(previous)
            return Navigation.navigate("RestExercise");
    }

    useFocusEffect(() => setExercise(exerciseActive));

    return(
        <SafeAreaView style={styles.container}>
            <Image 
                source={exerciseActive.image}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    { exercise.name }
                </Text>

                <View  style={styles.control}>
                    <BorderlessButton
                        style={[styles.button, (exerciseActive.order == 1) && styles.inactive]}
                        rippleColor='white'
                        enabled={exerciseActive.order == 1 ? false : true}
                        onPress={handlePrevious}
                    >
                        <AntDesign name="caretleft" size={24} color="white" />
                    </BorderlessButton>

                    <CountdownCircleTimer
                        isPlaying={!paused}
                        duration={ exerciseActive.time + 1 }
                        colors={[
                            [theme.colors.tertiary, 1],
                        ]}
                        onComplete={handleNext}
                        size={120}
                    >
                        {({ remainingTime, animatedColor }) => (
                            <Text style={[styles.text, { color: animatedColor }]}>
                                { remainingTime - 1 }
                            </Text>
                        )}
                    </CountdownCircleTimer>

                    <BorderlessButton 
                        style={styles.button}
                        rippleColor='white'
                        onPress={handleNext}
                    >
                        <AntDesign name="caretright" size={24} color="white" />
                    </BorderlessButton>
                </View>

                <RectButton 
                    style={styles.stop}
                    onPress={() => setPaused(true)}
                >
                    <Text style={styles.stop_text}>
                        Pausar
                    </Text>
                </RectButton>
            </View>
            <PauseModal 
                visible={paused}
                onReturnPress={() => setPaused(false)}
            />
        </SafeAreaView>
    )
}