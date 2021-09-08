import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import * as Linking from 'expo-linking';

import { useSignupContext } from '../../../hooks/signup-context';
import { useAuth } from '../../../hooks/auth-context';
import { styles } from './styles';
import CheckSvg from '../../../assets/check.svg';
import { Container } from '../../../components/Container';
import { AuthDataParamsList } from '../../../routes/auth-data.routes';
import { errorAlert } from '../../../utils/alerts';

export function RegisterSuccess({ navigation }: StackScreenProps<AuthDataParamsList, "RegisterSuccess">) {
    const { state } = useSignupContext();
    const { newUser } = useAuth();

    useEffect(() => {
        try {
            newUser(state);
        }catch({ message }){
            errorAlert(message, () => navigation.goBack());
        }
    }, [])

    return (
        <Container>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Estamos preparando tudo para começar</Text>
                <CheckSvg width={100} height={100} />
            </View>
            <ActivityIndicator color="red" size={32}/>
        </Container>
    )
}
