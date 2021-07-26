import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { NextButton } from '../../components/NavButtons';
import { BackgroundImage } from '../../components/BackgroundImage'
import { MeasureInput } from '../../components/MeasureInput'

import { useSignupContext } from '../../hooks/signup-context';
import { styles } from './styles';
import LogoSvg from '../../assets/logo.svg'

export function RegisterWeightAndHeight() {
    const { state, setState } = useSignupContext();
    const [weight, setWeight] = useState(state.weight > 0 ? state.weight.toString : "");
    const [height, setHeight] = useState(state.height > 0 ? state.height.toString : "");
    const Navigation = useNavigation();

    function handleValidateFields(){
        var regexW = /^(\d{2,3})+(\.\d{1,2})?$/;
        var regexH = /^(\d{3})$/g;

        if(regexW.test(weight) && regexH.test(height)){
            setState({ 
                ...state,
                weight: Number(weight), 
                height: Number(height),
            })
            Navigation.navigate("RegisterBirthAndSex");
        }
        else
            Alert.alert("Campos inválidos", "Alguns dados inseridos são inválidos, por favor corrija");
    }

    return (
        <BackgroundImage>
            <KeyboardAvoidingView 
                behavior="height" 
                keyboardVerticalOffset={10} 
                style={styles.container}
            >
                <LogoSvg height={37} width={177}/>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Informe o seu peso e altura para continuar</Text>
                    <View style={styles.inputs}>
                        <MeasureInput 
                            hint="kg" 
                            keyboardType="decimal-pad" 
                            placeholder="00.0" 
                            maxLength={5}
                            value={weight}
                            onChangeText={setWeight}
                        />
                        <MeasureInput 
                            hint="cm" 
                            keyboardType="numeric" 
                            placeholder="000" 
                            maxLength={3}
                            value={height}
                            onChangeText={setHeight}
                        />
                    </View>
                </View>
                <NextButton onPress={handleValidateFields}/>
            </KeyboardAvoidingView>
        </BackgroundImage>
    )
}
