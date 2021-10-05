import React, { useState } from 'react'
import { View, Text, TextInput, TextInputProps, Pressable } from 'react-native'
import { BorderlessButton, RectButton, TouchableOpacity } from 'react-native-gesture-handler';

import EmailIconSVG from '../../assets/icons/email-alt.svg';
import SecureIconSVG from '../../assets/icons/secure-alt.svg';
import ViewOffIconSVG from '../../assets/icons/view-off-alt.svg';
import { theme } from '../../global/styles/theme';

import { typography } from '../../global/styles/typography';
import { styles } from './styles';

type TextProps = TextInputProps & {
    onChangeText?: (text: string) => void;
    minLength?: number;
    showError?: boolean;
}

type EmailProps = TextInputProps & {
    onChangeText: (text: string) => void;
    showError?: boolean;
}

type PasswordProps = TextInputProps & {
    onChangeText: (text: string) => void;
    showError?: boolean;
    withRecovery?: boolean;
    onRecoveryPress?: () => void;
}

export function InputTextEmail({ onChangeText, showError = true, ...rest }: EmailProps) {
    const [error, setError] = useState("");

    function handleValidateField(text: string){
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!regex.test(text) && showError){
            setError("Insira um email válido");
        }else{
            setError("");
        }
        onChangeText(text);
    }

    return (
        <View style={styles.container}>
            <View style={[styles.content, error !== "" && styles.error]}>
                <EmailIconSVG style={styles.icon}/>
                <TextInput 
                    style={[
                        typography.text300, 
                        styles.input,
                        error !== "" && styles.error
                    ]}
                    placeholder="Email"
                    keyboardType="default"
                    onChangeText={handleValidateField}
                    { ...rest }
                />
            </View>
            {
                error !== ""
                &&
                (
                    <Text style={[typography.small300, styles.error, { marginTop: 5 }]}>
                        { error }
                    </Text>
                )
            }
        </View>
    )
}

export function InputTextPassword({ 
    onChangeText, 
    showError = true, 
    withRecovery = false,
    onRecoveryPress = () => {},
    ...rest 
}: PasswordProps) {
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    function handleShowPassword(){
        setShow(state => !state);
    }

    function handleValidateField(text: string){
        if(text.length < 6 && showError){
            setError("Senha muito curta");
        }else{
            setError("");
        }
        onChangeText(text);
    }

    return (
        <View style={styles.container}>
            <View style={[styles.content, error !== "" && styles.error]}>
                <SecureIconSVG style={styles.icon}/>
                <TextInput 
                    style={[
                        typography.text300, 
                        styles.input,
                        error !== "" && styles.error
                    ]}
                    placeholder="Senha"
                    keyboardType="default"
                    onChangeText={handleValidateField}
                    secureTextEntry={!show}
                    { ...rest }
                />
                <View style={[withRecovery ? styles.right : styles.border]}>
                    {
                        withRecovery
                        ?
                        <Text 
                            style={[typography.text300, { color: theme.colors.primary_light }]}
                            onPress={onRecoveryPress}
                        >
                            Esqueceu?
                        </Text>
                        :
                        <TouchableOpacity
                            onPress={handleShowPassword}
                        >
                            <ViewOffIconSVG style={[styles.icon, !show && { opacity: 0.3 }]}/>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            {
                error !== ""
                &&
                (
                    <Text style={[typography.small300, styles.error, { marginTop: 5 }]}>
                        { error }
                    </Text>
                )
            }
        </View>
    )
}

export function InputText({ onChangeText = () => {}, showError = true, minLength = 5, ...rest }: TextProps) {
    const [error, setError] = useState("");

    function handleValidateField(text: string){
        if(text.length < minLength && showError){
            setError("Muito curto");
        }else{
            setError("");
        }
        onChangeText(text);
    }

    return (
        <View style={styles.container}>
            <View style={[styles.content, { paddingHorizontal: 15 } ,error !== "" && styles.error]}>
                <TextInput 
                    style={[
                        typography.text300, 
                        styles.input,
                        error !== "" && styles.error
                    ]}
                    placeholder="Texto"
                    keyboardType="default"
                    onChangeText={handleValidateField}
                    { ...rest }
                />
            </View>
            {
                error !== ""
                &&
                (
                    <Text style={[typography.small300, styles.error, { marginTop: 5 }]}>
                        { error }
                    </Text>
                )
            }
        </View>
    )
}