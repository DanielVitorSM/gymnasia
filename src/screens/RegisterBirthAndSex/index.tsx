import React, { useState } from 'react'
import { View, Text, SafeAreaView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { differenceInYears } from 'date-fns';

import { NextButton, PreviousButton } from '../../components/NavButtons';
import { BackgroundImage } from '../../components/BackgroundImage'
import { DateInput } from '../../components/DateInput'
import { SelectSexInput } from '../../components/SelectSexInput'

import { useSignupContext } from '../../hooks/signup-context';
import { styles } from './styles';
import LogoSvg from '../../assets/logo.svg'

export function RegisterBirthAndSex() {
    const { state, setState } = useSignupContext();
    const [date, setDate] = useState<Date>(state.birth_date || new Date());
    const [sex, setSex] = useState<string>("");
    const Navigation = useNavigation();

    function handleGoBack(){
        Navigation.goBack();
    }

    function handleValidateFields(){
        const age = differenceInYears(Date.now(), date);
        if(age < 12)
            return Alert.alert("Você é muito novo", "Que tal ir brincar com seus amigos?");
        if(age > 120)
            return Alert.alert("Tem certeza?", "Com essa idade você corre sérios riscos de se acidentar!");
        if(sex !== "M" && sex !== "F")
            return Alert.alert("Informe seu sexo", "Seu sexo é necessário para alguns cálculos, informe por favor");
        setState({
            ...state,
            birth_date: date,
            sex
        });
        Navigation.navigate("RegisterReminder");
    }

    return (
        <BackgroundImage>
            <SafeAreaView 
                style={styles.container}
            >
                <LogoSvg height={37} width={177}/>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Informe sua data de nascimento</Text>
                    <DateInput 
                        date={date}
                        setDate={setDate}
                    />

                    <Text style={styles.title}>Informe seu sexo</Text>
                    <SelectSexInput onChangeSex={setSex} value={sex}/>
                </View>
                <View style={styles.navButtons}>
                    <PreviousButton onPress={handleGoBack}/>
                    <NextButton onPress={handleValidateFields}/>
                </View>
            </SafeAreaView>
        </BackgroundImage>
    )
}
