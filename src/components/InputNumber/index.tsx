import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, TextInputProps, Alert } from 'react-native'

import PlusIconSVG from '../../assets/icons/plus-alt.svg';
import SubIconSVG from '../../assets/icons/sub-alt.svg';
import { typography } from '../../global/styles/typography';

import { styles } from './styles';

type Props = TextInputProps & {
    numberValue?: number;
    onChangeNumberValue?: (text: number) => void;
    decimal?: boolean;
    step?: number;
    rightText?: string;
    maxNumber?: number;
    minNumber?: number;
}

export function InputNumber({ 
    numberValue = 0,
    onChangeNumberValue = () => {},
    rightText = "",
    decimal = false, 
    step = 1,
    maxNumber = 500,
    minNumber = 0,
    ...rest 
}: Props) {
    const [value, setValue] = useState(rightText !== "" ? numberValue.toString() + " " + rightText : numberValue.toString());
    const [isPressed, setIsPressed] = useState(false);

    function handleChangeValue(){
        var cleaned = getNumber();
        if(cleaned < minNumber || cleaned > maxNumber){
            setValue(formatValue(numberValue))
            return Alert.alert("Valor inválido", "Insira um valor válido para este campo");
        }
        updateValues(cleaned)
    }

    function updateValues(num: number){
        onChangeNumberValue(num);
        setValue(formatValue(num));
    }

    function handleIncrement(positive: boolean){
        let num = getNumber() + (positive ? 1 : -1);
        if(num >= maxNumber || num <= minNumber){
            return updateValues(num > maxNumber ? maxNumber : minNumber);
        }
        updateValues(num)
    }

    function formatValue(text: number){
        var newText = decimal ? text.toFixed(1) : text.toFixed(0);
        if(rightText)
            return newText + " " + rightText;
        return newText;
    }

    function getNumber(){
        var num = value.match(/(\d+\.)?\d+/g);
        return Number(num) || 0;
    }

    function handleFocus(){
        var num = getNumber();
        setValue(decimal ? num.toFixed(1) : num.toString());
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleIncrement(false)}
                style={styles.button}
            >
                <SubIconSVG/>
            </TouchableOpacity>

            <TextInput
                value={value}
                style={[typography.text300, styles.input]}
                keyboardType="decimal-pad"
                onChangeText={setValue}
                onEndEditing={e => handleChangeValue()}
                onFocus={handleFocus}

                { ...rest }
            />

            <TouchableOpacity 
                style={styles.button}
                onPress={() => handleIncrement(true)}
            >
                <PlusIconSVG/>
            </TouchableOpacity>
        </View>
    )
}
