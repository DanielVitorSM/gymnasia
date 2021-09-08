import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { AuthInput } from '../../../components/AuthInput'
import { Container } from '../../../components/Container'
import { authStyles } from '../../../global/styles/authStyles'
import { styles } from './styles'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthParamsList } from '../../../routes/auth.routes'

export function LoginEmailAndPassword({ navigation }: StackScreenProps<AuthParamsList, "EmailAndPasswordLogin">) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function handleRecovery(){
        navigation.navigate("EmailAndPasswordRecovery");
    }

    function handleRegister(){
        navigation.navigate("EmailAndPasswordRegister");
    }

    function handleValidateEmail(){
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(regEmail.test(email) === false)
            setEmailError("Email inválido");
        else
            setEmailError("");
    }

    function handleValidatePassword(){
        if(password.length === 0)
            setPasswordError("Este campo é obrigatório")
        else
            setPasswordError("")
    }

    return (
        <Container
            keyboardAvoid
            navButtons
            enabledNext={
                (email.length > 0 && emailError === "") 
                &&
                (password.length > 0 && passwordError === "") 
            }
            onPreviousPress={() => navigation.popToTop()}
            onNextPress={() => Alert.alert("oi")}
        >
            <View style={styles.container}>
                <Text style={authStyles.header}>Entrar</Text>
                <Text 
                    style={[
                        authStyles.small, 
                        { marginBottom: 10 }
                    ]} 
                >
                    Insira o email e senha para acessar sua conta
                </Text>
                
                <AuthInput 
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    error={emailError}
                    onEndEditing={handleValidateEmail}
                />
                <AuthInput
                    placeholder="Senha"
                    secureInput
                    onChangeText={setPassword}
                    value={password}
                    error={passwordError}
                    onEndEditing={handleValidatePassword}
                />

                <Text 
                    style={[
                        authStyles.text, 
                        authStyles.right,
                        styles.blue
                    ]}
                    onPress={handleRecovery}
                >
                        Esqueci minha senha
                </Text>
                <Text style={[
                    authStyles.text,
                    styles.signup,
                ]}>
                    Ainda não é cadastrado? <Text style={[authStyles.text, styles.blue]} onPress={handleRegister}>Cadastre-se</Text>
                </Text>
            </View>
        </Container>
    )
}