import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import firebase from 'firebase';
import "firebase/auth";

import { Container } from '../../../components/Container'
import { ButtonSocial } from '../../../components/ButtonSocial';
import { styles } from './styles';
import { theme } from '../../../global/styles/theme';
import { AuthParamsList } from '../../../routes/auth.routes';
import { useAuth } from '../../../hooks/auth-context';


export function AuthStart({ navigation }: StackScreenProps<AuthParamsList, "AuthStart">) {
    const { signInGoogle, loading } = useAuth();

    function handleGuestLogin(){
        firebase
        .auth()
        .signInAnonymously()
        .finally(() => {
            // setState({
            //     ...state,
            //     uid: firebase.auth().currentUser?.uid || uidv4()
            // })
            // navigation.navigate("RegisterWeightAndHeight");
            console.log(firebase.auth().currentUser);
        });
    }

    function handleEmailLogin(){
        navigation.navigate("EmailAndPasswordLogin");
    }

    return (
        <Container>
            <View style={styles.content}>
                <Text style={styles.title}>Escolha um método abaixo para se conectar</Text>
                <ButtonSocial 
                    icon="google" 
                    text="Entrar com Google" 
                    color={theme.colors.google}
                    onPress={signInGoogle}
                    loading={loading.type === "google" && !loading.loaded}
                />
                <ButtonSocial 
                    icon="envelope" 
                    text="Entrar com email e senha" 
                    color={theme.colors.email}
                    onPress={handleEmailLogin}
                    loading={loading.type === "email" && !loading.loaded}
                />
                <ButtonSocial 
                    icon="user-secret" 
                    text="Entrar sem se cadastrar" 
                    color={theme.colors.guest}
                    onPress={handleGuestLogin}
                    loading={loading.type === "guest" && !loading.loaded}
                />
            </View>
        </Container>
    )
}