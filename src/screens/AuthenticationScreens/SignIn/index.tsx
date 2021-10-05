import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './styles';

import BannerSVG from '../../../assets/banner.svg';
import GoogleIconSVG from '../../../assets/icons/google-alt.svg';
import WifiOffIconSVG from '../../../assets/icons/wifi-off-alt.svg';

import { typography } from '../../../global/styles/typography';
import { InputTextEmail, InputTextPassword } from '../../../components/InputText';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { useEffect } from 'react';
import { theme } from '../../../global/styles/theme';
import { useAuth } from '../../../hooks/authentication';

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const { signInEmailAndPassword, signUpEmailAndPassword, signInGoogle, signInAnonymous } = useAuth();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        }
        );
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    function handleSubmit(){
        if(isLogin)
            return signInEmailAndPassword(email, password);
        signUpEmailAndPassword(email, password);
    }

    function handleChangeSignMethod(){
        setIsLogin(state => !state);
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback 
                style={styles.container}
                onPress={() => Keyboard.dismiss()}
            >
                <KeyboardAvoidingView 
                    behavior="position"
                    style={styles.container}
                    contentContainerStyle={styles.container}
                    keyboardVerticalOffset={-100}
                >
                    <BannerSVG style={styles.banner}/>
                    <View style={styles.content}>
                        <View style={styles.part}>
                            <Text style={typography.heading400}>
                                Bem-vindo ao
                            </Text>
                            <Text style={[typography.heading700, { marginTop: -10, marginBottom: 30 }]}>
                                Gymnasia
                            </Text>
                            <InputTextEmail 
                                value={email}
                                onChangeText={setEmail}
                                showError={!isLogin}
                            />
                            <InputTextPassword
                                value={password}
                                onChangeText={setPassword}
                                showError={!isLogin}
                                withRecovery={isLogin}
                                onRecoveryPress={() => alert("Função indisponível")}
                            />
                            <PrimaryButton
                                text={isLogin ? "Entrar" : "Cadastrar"}
                                enabled={email !== "" && password !== ""}
                                onPress={handleSubmit}
                            />

                            <View style={[styles.row, { marginTop: 15 }]}>
                                <Text style={typography.small300}>
                                    { isLogin ? "Novo por aqui?" : "Já é cadastrado?"}
                                </Text>
                                <Text 
                                    style={[typography.small300, { color: theme.colors.primary_light, marginLeft: 5 }]}
                                    onPress={handleChangeSignMethod}
                                >
                                    { isLogin ? "Cadastre-se" : "Entrar"}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.part, isKeyboardVisible && { display: 'none' }]}>    
                            <Text style={typography.small300}>Ou pode entrar com</Text>
                            <View style={styles.row}>
                                <Pressable 
                                    style={styles.borderless}
                                    android_ripple={{
                                        borderless: true,
                                        radius: 20
                                    }}
                                    onPress={signInGoogle}
                                    >
                                    <GoogleIconSVG />
                                </Pressable>
                                <Pressable 
                                    style={styles.borderless}
                                    android_ripple={{
                                        borderless: true,
                                        radius: 20
                                    }}
                                    onPress={signInAnonymous}
                                >
                                    <WifiOffIconSVG />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}