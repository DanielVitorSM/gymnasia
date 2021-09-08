import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { Container } from '../../../components/Container';
import { TimeInput } from '../../../components/TimeInput'

import { useSignupContext } from '../../../hooks/signup-context';
import { styles } from './styles';

export function RegisterReminder() {
    const { state, setState } = useSignupContext();
    const [time, setTime] = useState(new Date());
    const Navigation = useNavigation();

    function handleNext(){
        setState({
            ...state,
            reminder: time
        })
        Navigation.navigate("RegisterSuccess");
    }

    return (
        <Container
            navButtons
            enabledNext
            onNextPress={handleNext}
        >
            <View style={styles.formContainer}>
                <Text style={styles.title}>Informe a hora em que devemos te notificar</Text>
                <TimeInput 
                    setTime={setTime} 
                    time={time}
                />
            </View>
        </Container>
    )
}
