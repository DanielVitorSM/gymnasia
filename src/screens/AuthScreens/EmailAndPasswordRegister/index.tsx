import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'

import { AuthInput } from '../../../components/AuthInput'
import { Container } from '../../../components/Container'
import { styles } from './styles'
import { authStyles } from '../../../global/styles/authStyles'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthParamsList } from '../../../routes/auth.routes'

export function RegisterEmailAndPassword({ navigation }: StackScreenProps<AuthParamsList, "EmailAndPasswordRegister">) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    function handleLogin(){
        navigation.navigate("EmailAndPasswordLogin");
    }

    function handleValidateEmail(){
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(regEmail.test(email) === false)
            setEmailError("Insira um email válido");
        else
            setEmailError("");
    }

    function handleValidatePassword(){
        if(password.length <= 6)
            setPasswordError("A deve ter no mínimo 6 caracteres")
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
                (password.length > 6 && passwordError === "") 
            }
            onPreviousPress={() => navigation.popToTop()}
            onNextPress={() => Alert.alert("Oi")}
        >
            <View style={styles.container}>
                <Text style={authStyles.header}>Cadastrar</Text>
                <Text 
                    style={[
                        authStyles.small, 
                        { marginBottom: 10 }
                    ]} 
                >
                    Insira o email e senha para criar uma nova conta
                </Text>
                
                <AuthInput
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    error={emailError}
                    onChange={handleValidateEmail}
                />
                <AuthInput 
                    placeholder="Senha"
                    secureInput
                    onChangeText={setPassword}
                    value={password}
                    error={passwordError}
                    onChange={handleValidatePassword}
                />
                <Text style={[
                    authStyles.text,
                    styles.signup,
                ]}>
                    Já é cadastrado? <Text style={[authStyles.text, styles.blue]} onPress={handleLogin}>Entrar</Text>
                </Text>
            </View>
        </Container>
    )
}