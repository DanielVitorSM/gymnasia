import React, { useState } from 'react'
import { View, Text, SafeAreaView, Pressable, ImageBackground } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';

import CountdownTimer from '../../../components/CountdownTimer'
import { ProgressBar } from '../../../components/ProgressBar';
import { getExerciseByUid } from '../../../data/exercises';
import { typography } from '../../../global/styles/typography';
import { useTrainingContext } from '../../../hooks/training'
import { styles } from './styles';
import { theme } from '../../../global/styles/theme';
import { TrainingScreenParams } from '../../../routes/training.routes';

export function Rest({ navigation }: StackScreenProps<TrainingScreenParams, "Rest">) {
    const { activeExercise, training } = useTrainingContext();
    const [time, setTime] = useState(activeExercise.order === 1 ? 3 : training.interval);
    const nextExercise = getExerciseByUid(activeExercise.uid);

    function handleGoToPractice() {
        navigation.replace("Practic");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.info}>
                <Text style={[typography.heading700, styles.text, { textAlign: 'center', marginBottom: 10 }]}>
                    { activeExercise.order === 1 ? "Prepare-se" : "Descanço"}
                </Text>
                <CountdownTimer 
                    duration={time}
                    running
                    style={[typography.heading400]}
                    onChange={(newTime => setTime(state => newTime))}
                    onFinish={handleGoToPractice}
                />
                <View style={styles.buttons}>
                    <Pressable
                        onPress={() => setTime(state => state + 10)}
                        android_ripple={{ color: theme.colors.overlay }}
                        style={[styles.button, { backgroundColor: theme.colors.primary_dark }]}
                    >
                        <Text style={[typography.text300, styles.text]}>+10 seg</Text>
                    </Pressable>
                    <Pressable 
                        android_ripple={{ color: theme.colors.overlay }}
                        style={styles.button}
                        onPress={handleGoToPractice}
                    >
                        <Text style={[typography.text300, styles.text]}>Pular</Text>
                    </Pressable>
                </View>
            </View>
            <ImageBackground 
                style={styles.image} 
                source={nextExercise?.image}
                resizeMode="cover"
                blurRadius={1}
            >
                <ProgressBar progress={activeExercise.order / training.exercises.length}/>
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <View>
                            <Text style={[typography.text300, styles.text]}>
                                PRÓXIMO { activeExercise.order}/{ training.exercises.length }
                            </Text>
                            <Text style={[typography.text700, styles.text, { textTransform: 'uppercase' }]}>
                                { nextExercise?.name }
                            </Text>
                        </View>
                        <Text style={[typography.heading400, styles.text]}>
                            { format(activeExercise.time * 1000, "mm:ss") }
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}