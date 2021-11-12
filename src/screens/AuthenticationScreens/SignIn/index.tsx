import React, { useRef, useState } from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, Animated, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import BannerSVG from '../../../assets/banner.svg';
import GoogleIconSVG from '../../../assets/icons/google-alt.svg';
import WifiOffIconSVG from '../../../assets/icons/wifi-off-alt.svg';

import { typography } from '../../../global/styles/typography';
import { InputTextEmail, InputTextPassword } from '../../../components/InputText';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { styles } from './styles';
import { theme } from '../../../global/styles/theme';
import { useAuth } from '../../../hooks/authentication';

const { height } = Dimensions.get("screen");

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const { signInEmailAndPassword, signUpEmailAndPassword, signInGoogle, signInAnonymous } = useAuth();

    async function handleLogin(){
        setLoading(true);
        const worked = await signInEmailAndPassword(email, password);
        setLoading(worked);
    }

    async function handleRegister(){
        setLoading(true);
        const worked = await signUpEmailAndPassword(email, password);
        setLoading(worked);
    }

    async function handleGoogleLogin(){
        setLoading(true);
        const worked = await signInGoogle();
        setLoading(worked);
    }

    async function handleOfflineLogin(){
        setLoading(true);
        const worked = await signInAnonymous();
        setLoading(worked);
    }

    function handleChangeToRegister(){
        scrollViewRef.current?.scrollToEnd()
    }

    function handleChangeToLogin(){
        scrollViewRef.current?.scrollTo({ x: 0 })
    }


    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ minHeight: height }}
            onTouchStart={() => Keyboard.dismiss()}
            showsVerticalScrollIndicator={false}
            renderToHardwareTextureAndroid
        >
            <KeyboardAvoidingView
                behavior={ Platform.OS === 'ios' ? 'position' : undefined}
                style={styles.container}
                contentContainerStyle={styles.container}
                keyboardVerticalOffset={-100}
                renderToHardwareTextureAndroid
            >
                <BannerSVG style={styles.banner}/>
                <View style={styles.content}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%'}}
                        scrollEnabled={false}
                        alwaysBounceHorizontal
                    >

                        <View style={styles.part}>
                            <Text style={[typography.heading400, { textAlign: 'left', marginBottom: 15, width: '100%' }]}>
                                Entrar{'\n'}
                                no <Text style={typography.heading700}>Gymnasia</Text>
                            </Text>

                            <InputTextEmail 
                                value={email}
                                onChangeText={setEmail}
                                showError={false}
                            />
                            <InputTextPassword
                                value={password}
                                onChangeText={setPassword}
                                showError={false}
                                withRecovery
                                onRecoveryPress={() => alert("Função indisponível")}
                            />
                            <PrimaryButton
                                text={"Entrar"}
                                enabled={email !== "" && password !== ""}
                                loading={loading}
                                onPress={handleLogin}
                            />

                            <View style={[styles.row, { marginTop: 15 }]}>
                                <Text style={typography.small300}>
                                    Novo por aqui?
                                </Text>
                                <Pressable
                                    onPress={handleChangeToRegister}
                                    hitSlop={20}
                                >
                                    <Text 
                                        style={[typography.small300, { color: theme.colors.primary_light, marginLeft: 5 }]}
                                    >
                                        Cadastrar
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <View 
                            style={styles.part}
                        >
                            <Text style={[typography.heading400, { textAlign: 'left', marginBottom: 15, width: '100%' }]}>
                                Cadastrar{'\n'}
                                no <Text style={typography.heading700}>Gymnasia</Text>
                            </Text>

                            <InputTextEmail 
                                value={email}
                                onChangeText={setEmail}
                                showError
                            />
                            <InputTextPassword
                                value={password}
                                onChangeText={setPassword}
                                showError
                            />
                            <PrimaryButton
                                text={"Cadastrar"}
                                enabled={email !== "" && password !== ""}
                                loading={loading}
                                onPress={handleRegister}
                            />

                            <View style={[styles.row, { marginTop: 15 }]}>
                                <Text style={typography.small300}>
                                    Já é cadastrado?
                                </Text>
                                <Pressable
                                    onPress={handleChangeToLogin}
                                    hitSlop={20}
                                >
                                    <Text style={[typography.small300, { color: theme.colors.primary_light, marginLeft: 5 }]}>
                                        Entrar
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.part}>    
                        <Text style={typography.small300}>Ou pode entrar com</Text>
                        <View style={styles.row}>
                            <Pressable 
                                style={styles.borderless}
                                android_ripple={{
                                    borderless: true,
                                    radius: 20
                                }}
                                onPress={handleGoogleLogin}
                                >
                                <GoogleIconSVG />
                            </Pressable>
                            <Pressable 
                                style={styles.borderless}
                                android_ripple={{
                                    borderless: true,
                                    radius: 20
                                }}
                                onPress={handleOfflineLogin}
                            >
                                <WifiOffIconSVG />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}