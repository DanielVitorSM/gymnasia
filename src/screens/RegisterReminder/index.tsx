import React, { useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { NextButton, PreviousButton } from '../../components/NavButtons';
import { BackgroundImage } from '../../components/BackgroundImage'
import { TimeInput } from '../../components/TimeInput'

import { useSignupContext } from '../../hooks/signup-context';
import { styles } from './styles';
import LogoSvg from '../../assets/logo.svg'

export function RegisterReminder() {
    const { state, setState } = useSignupContext();
    const [time, setTime] = useState(new Date());
    const Navigation = useNavigation();

    function handleGoBack(){
        Navigation.goBack();
    }

    function handleNext(){
        setState({
            ...state,
            reminder: time
        })
        Navigation.navigate("RegisterSuccess");
    }

    return (
        <BackgroundImage>
            <SafeAreaView 
                style={styles.container}
            >
                <LogoSvg height={37} width={177}/>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Informe a hora em que devemos te notificar</Text>
                    <TimeInput 
                        setTime={setTime} 
                        time={time}
                    />
                </View>
                <View style={styles.navButtons}>
                    <PreviousButton onPress={handleGoBack}/>
                    <NextButton onPress={handleNext}/>
                </View>
            </SafeAreaView>
        </BackgroundImage>
    )
}
