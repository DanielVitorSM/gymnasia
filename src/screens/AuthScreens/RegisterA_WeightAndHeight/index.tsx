import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';

import { MeasureInput } from '../../../components/MeasureInput'
import { Container } from '../../../components/Container';

import { AuthDataParamsList } from '../../../routes/auth-data.routes';

import { useSignupContext } from '../../../hooks/signup-context';
import { styles } from './styles';

export function RegisterWeightAndHeight({ navigation }: StackScreenProps<AuthDataParamsList, "RegisterWeightAndHeight">) {
    const { state, setState } = useSignupContext();
    const [weight, setWeight] = useState(state.weight > 0 ? state.weight.toString : "");
    const [height, setHeight] = useState(state.height > 0 ? state.height.toString : "");

    function handleValidateFields(){
        var regexW = /^(\d{2,3})+(\.\d{1,2})?$/;
        var regexH = /^(\d{3})$/g;

        if(regexW.test(weight) && regexH.test(height)){
            setState({ 
                ...state,
                weight: Number(weight), 
                height: Number(height),
            })
            navigation.navigate("RegisterBirthAndSex");
        }
        else
            Alert.alert("Campos inválidos", "Alguns dados inseridos são inválidos, por favor corrija");
    }

    return (
        <Container 
            navButtons
            keyboardAvoid
            enabledPrevious={false}
            onPreviousPress={() => {}}
            enabledNext={weight !== "" && height !== ""}
            onNextPress={handleValidateFields}
        >
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
        </Container>
    )
}
