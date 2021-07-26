import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Dimensions, Text, Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 
import Carousel from 'react-native-snap-carousel';

import { styles } from './styles';
import { ProgressTimer } from '../../components/ProgressTimer';
import { CarrouselItem } from '../../components/CarrouselItem';
import { CircleVisor } from '../../components/CircleVisor';
import { useTrainContext } from '../../hooks/train-context';
import { useNavigation } from '@react-navigation/native';

export function TrainExercises() {
    const Navigation = useNavigation();
    const { exerciseActive, nextExercise, train } = useTrainContext();
    const { exercises } = train;
    const [wait, setWait] = useState(3);
    const [timer, setTimer] = useState(wait);
    const [isInterval, setIsInterval] = useState(true);

    useEffect(() => {
        if(exerciseActive.uuid === undefined)
            Navigation.navigate("TrainFinish");
    },[exerciseActive])


    return (
        <SafeAreaView  style={styles.container}>
            <ProgressTimer progress={exerciseActive.order / exercises.length}/>

            <View>
                <Carousel
                    layout={"default"}
                    data={exercises}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={300}
                    renderItem={CarrouselItem}
                    scrollEnabled={false}
                    firstItem={exerciseActive.order - 1}
                    slideStyle={{ height: 300 }}
                />
            </View>

            <Animated.View>
                {
                    isInterval 
                    ?
                    <CircleVisor 
                        title={exerciseActive.order == 1 ? "Preparando para começar" : "Descanço"} 
                        time={wait}
                        value={timer}
                        setValue={setTimer}
                        onTimeFinish={() => {
                            setWait(exerciseActive.time);
                            setTimer(exerciseActive.time);
                            setIsInterval(false);
                        }}
                    />
                    :
                    <CircleVisor 
                        title={"Tempo"} 
                        time={wait}
                        value={timer}
                        setValue={setTimer}
                        onTimeFinish={() => {
                            nextExercise();
                            setWait(train.interval);
                            setTimer(train.interval);
                            setIsInterval(true);
                        }}
                    />
                }
            </Animated.View>

            <View style={styles.buttons}>
                {/* <RectButton 
                    style={styles.button}
                    onPress={() => setOrder(order - 1)}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                    <Text style={styles.text}>Voltar</Text>
                </RectButton> */}
                <RectButton 
                    style={[
                        styles.button, 
                        { backgroundColor: 'white' }
                    ]}
                    onPress={() => nextExercise()}
                >
                    <Text style={[styles.text, { color: 'black' }]}>Próximo</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                </RectButton>
            </View>
        </SafeAreaView>
    )
}