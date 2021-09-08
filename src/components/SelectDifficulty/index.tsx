import React, { ReactNode, useState } from 'react'
import { View, TouchableWithoutFeedback, TouchableOpacity, TouchableOpacityProps, Modal, StyleProp, TextStyle, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = TouchableOpacityProps & {
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    onDimiss?: () => void;
    onChange?: (value: string) => void;
}

export function SelectDifficulty({ onDimiss = () => {}, label, labelStyle, style, onChange = () => {}, ...rest }: Props) {
    const [visible, setVisible] = useState(false);

    function handleOnDimiss(){
        setVisible(false);
        onDimiss();
    }

    function handleSelect(value: string){
        onChange(value);
        setVisible(false);
    }

    return (
        <> 
            <TouchableOpacity 
                activeOpacity={.8}
                style={[styles.button, style]}
                onPress={() => setVisible(true)}
                {...rest}
            >
                <Ionicons name="caret-down" style={styles.icon} size={10} color={theme.colors.secondary_80} />
                <Text style={[styles.label, labelStyle]}>{ label }</Text>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                style={styles.container}
                onDismiss={handleOnDimiss}
                visible={visible}
                transparent
                statusBarTranslucent
            >
                <TouchableWithoutFeedback
                    onPress={handleOnDimiss}
                >
                    <View style={styles.overlay}>
                        <View style={styles.content}>
                            <TouchableOpacity onPress={() => handleSelect("Fácil")} style={styles.item}>
                                <Text style={styles.text}>Fácil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleSelect("Médio")} style={styles.item}>
                                <Text style={styles.text}>Médio</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleSelect("Difícil")} style={styles.item}>
                                <Text style={styles.text}>Difícil</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}
