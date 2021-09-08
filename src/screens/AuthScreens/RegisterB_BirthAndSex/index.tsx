import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { differenceInYears } from 'date-fns';

import { DateInput } from '../../../components/DateInput'
import { SelectSexInput } from '../../../components/SelectSexInput'
import { Container } from '../../../components/Container';

import { useSignupContext } from '../../../hooks/signup-context';
import { styles } from './styles';

export function RegisterBirthAndSex() {
    const { state, setState } = useSignupContext();
    const [date, setDate] = useState<Date>(state.birth_date || new Date());
    const [sex, setSex] = useState<string>("");
    const Navigation = useNavigation();

    function handleValidateFields(){
        const age = differenceInYears(Date.now(), date);
        if(age < 12)
            return Alert.alert("Você é muito novo", "Gymnasia é recomendado para maiores de 12 anos, que tal ir brincar com seus amigos?");
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
        <Container
            navButtons
            enabledNext={date && sex !== ""}
            onNextPress={handleValidateFields}
        >
            <View style={styles.formContainer}>
                <Text style={styles.title}>Informe sua data de nascimento</Text>
                <DateInput 
                    date={date}
                    setDate={setDate}
                />
                <Text style={styles.title}>Informe seu sexo</Text>
                <SelectSexInput onChangeSex={setSex} value={sex}/>
            </View>
        </Container>
    )
}
