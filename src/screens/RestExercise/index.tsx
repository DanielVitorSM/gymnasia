import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Animated, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addSeconds, format } from 'date-fns';

import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { useTrainContext } from '../../hooks/train-context';

export function RestExercise(){
    const Navigation = useNavigation();
    const { exerciseActive, train } = useTrainContext();
    const [time, setTime] = useState(train.interval);
    const helper = addSeconds(new Date(0), time);
    const timer = format(helper, "mm:ss");

    useEffect(() => {
        if(time > 0){
            const timerId = setInterval(() => setTime(time - 1), 1000);
            return () => clearInterval(timerId);
        }
        if(time == 0)
            handleNext()
    }, [time])

    function handleAddTenSeconds(){
        setTime(time + 10);
    }

    function handleNext(){
        Navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                { name: "PraticExercise" }
            ]
        }))
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Descanso
                </Text>

                <Text style={styles.timer}>
                    { timer }
                </Text>

                <View style={styles.control}>
                    <RectButton 
                        style={[styles.button, { backgroundColor: theme.colors.primary }]}
                        onPress={handleAddTenSeconds}
                    >
                        <Text style={[styles.text, { color: theme.colors.white }]}> +10s </Text>
                    </RectButton>
                    <RectButton 
                        style={styles.button}
                        onPress={handleNext}
                    >
                        <Text style={styles.text}> Pular </Text>
                    </RectButton>
                </View>
            </View>
            
            <View style={styles.footer}>
                <ProgressBar progress={(exerciseActive.order - 1)/train.exercises.length}/>

                <ImageBackground
                    source={{ uri: exerciseActive.gif }}
                    style={styles.image}
                >
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.progress}>
                                Próximo {exerciseActive.order}/{train.exercises.length}
                            </Text>
                            <Text style={styles.name}>
                                { exerciseActive.name }
                            </Text>
                        </View>
                        <Text style={styles.time}>
                            { format(addSeconds(new Date(0), exerciseActive.time), 'mm:ss') }
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}