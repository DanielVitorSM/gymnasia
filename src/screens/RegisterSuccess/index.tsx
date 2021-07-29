import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Image, ActivityIndicator } from 'react-native';

import { setDailyNotification } from '../../utils/notification';
import { useSignupContext } from '../../hooks/signup-context';
import { BackgroundImage } from '../../components/BackgroundImage';
import { useAuth } from '../../hooks/auth-context';
import { styles } from './styles';
import CheckPng from '../../assets/check.png';
import LogoSvg from '../../assets/logo.svg';

export function RegisterSuccess() {
    const { state, setState } = useSignupContext();
    const { newUser } = useAuth();

    useEffect(() => {
        setDailyNotification(state.reminder.getHours(), state.reminder.getMinutes());
        newUser(state);
    }, [])

    return (
        <BackgroundImage>
            <SafeAreaView 
                style={styles.container}
            >
                <LogoSvg height={37} width={177}/>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Estamos preparando tudo para começar</Text>
                    <Image source={CheckPng} style={styles.image}/>
                </View>
                <ActivityIndicator color="red" size={32}/>
            </SafeAreaView>
        </BackgroundImage>
    )
}
