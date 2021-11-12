import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import MaleIconSVG from '../../assets/icons/male-alt.svg';
import FemaleIconSVG from '../../assets/icons/female-alt.svg';

import { styles } from './styles';

export type ISexOption = "F" | "M";

type Props = {
    sex?: string;
    onChangeSex?: (text: ISexOption) => void;
}

export function InputSex({ 
    sex = "",
    onChangeSex = () => {}
}: Props) {
    function handleChangeSelected(val: ISexOption){
        onChangeSex(val);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={.9}
                containerStyle={[styles.button, sex === "M" && styles.selected]}
                onPress={() => handleChangeSelected("M")}
            >
                <MaleIconSVG />
            </TouchableOpacity>
            <TouchableOpacity 
                activeOpacity={.9}
                containerStyle={[styles.button, sex === "F" && styles.selected]}
                onPress={() => handleChangeSelected("F")}
            >
                <FemaleIconSVG />
            </TouchableOpacity>
        </View>
    )
}
