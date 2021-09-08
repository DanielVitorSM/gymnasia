import React, { useState } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 

import { theme } from '../../global/styles/theme'
import { styles } from './styles'
import { BorderlessButton } from 'react-native-gesture-handler';
import { authStyles } from '../../global/styles/authStyles';

type Props = TextInputProps & {
    secureInput?: boolean;
    error?: string;
}

export function AuthInput({ secureInput = false, error = "", ...rest }: Props) {
    const [focused, setFocused] = useState(false);
    const [secure, setSecure] = useState(secureInput);

    function handleChangeSecureInput(){
        setSecure(!secure);
    }

    return (
        <View>
            <View style={[styles.container, focused && styles.focus, (error !== "") && styles.error]}>
                <TextInput 
                    style={[styles.input, (error !== "") && styles.error]}
                    placeholder="Email"
                    placeholderTextColor={theme.colors.secondary_80}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    secureTextEntry={secure}
                    {...rest}

                />
                {
                    secureInput &&
                    <BorderlessButton onPress={handleChangeSecureInput}>
                        <FontAwesome 
                            style={styles.icon} 
                            name={secure ? "eye-slash" : "eye"}
                            size={18} 
                            color="white" 
                        />
                    </BorderlessButton>
                }
            </View>
            {
                error !== "" &&
                <Text style={[authStyles.small, { color: 'red' }]}>{ error }</Text>
            }
        </View>
    )
}
