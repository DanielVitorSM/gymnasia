import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';

import { createNotifications } from '../../utils/notification';
import { useSignupContext } from '../../hooks/signup-context';
import { BackgroundImage } from '../../components/BackgroundImage';
import { useAuth } from '../../hooks/auth-context';
import { styles } from './styles';
import CheckSvg from '../../assets/check.svg';
import LogoSvg from '../../assets/logo.svg';

export function RegisterSuccess() {
    const { state } = useSignupContext();
    const { newUser } = useAuth();

    useEffect(() => {
        (async() => {
            createNotifications(state.reminder, null);
            newUser(state);
        })()
    }, [])

    return (
        <BackgroundImage>
            <SafeAreaView 
                style={styles.container}
            >
                <LogoSvg height={37} width={177}/>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Estamos preparando tudo para começar</Text>
                    <CheckSvg width={100} height={100} />
                </View>
                <ActivityIndicator color="red" size={32}/>
            </SafeAreaView>
        </BackgroundImage>
    )
}
