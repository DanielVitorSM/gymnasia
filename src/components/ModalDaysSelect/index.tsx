import React, { useState, useCallback } from "react";
import { Modal, View, Text, TouchableOpacity, ModalProps } from "react-native";
import CheckBox from '@react-native-community/checkbox';

import { styles } from "./styles";

type Props = ModalProps & {
    onCompleteSelection: (days: number[]) => void;
}

export function ModalDaysSelect({ onCompleteSelection, ...rest }: Props){
    const [dom, setDom] = useState(false)
    const [seg, setSeg] = useState(false)
    const [ter, setTer] = useState(false)
    const [qua, setQua] = useState(false)
    const [qui, setQui] = useState(false)
    const [sex, setSex] = useState(false)
    const [sab, setSab] = useState(false)

    function handleSubmit(){
        let array = [
            dom ? 1 : 0,
            seg ? 2 : 0,
            ter ? 3 : 0,
            qua ? 4 : 0,
            qui ? 5 : 0,
            sex ? 6 : 0,
            sab ? 7 : 0,
        ]
        array = array.filter(value => value != 0);
        onCompleteSelection(array);
    }

    return(
        <Modal
            transparent
            animationType="fade"
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>

                    <Text style={styles.title}>Repetir</Text>
                    <View style={styles.check}>
                        <CheckBox
                            disabled={false}
                            value={dom}
                            onValueChange={setDom}
                        />
                        <Text>Domingo</Text>
                    </View>
                    <View style={styles.check}>
                        <CheckBox
                            disabled={false}
                            value={seg}
                            onValueChange={setSeg}
                        />
                        <Text>Segunda</Text>
                    </View>
                    <View style={styles.check}>
                        <CheckBox
                            disabled={false}
                            value={ter}
                            onValueChange={setTer}
                        />
                        <Text>Terça</Text>
                    </View>
                    <View style={styles.check}>
                        <CheckBox
                            disabled={false}
                            value={qua}
                            onValueChange={setQua}
                        />
                        <Text>Quarta</Text>
                    </View>
                    <View style={styles.check}>
                        <CheckBox
                            disabled={false}
                            value={qui}
                            onValueChange={setQui}
                        />
                        <Text>Quinta</Text>
                    </View>
                    <View style={styles.check}>
                        <CheckBox
                            disabled={false}
                            value={sex}
                            onValueChange={setSex}
                        />
                        <Text>Sexta</Text>
                    </View>
                    <View style={styles.check}>
                        <CheckBox
                            disabled={false}
                            value={sab}
                            onValueChange={setSab}
                        />
                        <Text>Sábado</Text>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity 
                            style={styles.button}
                            activeOpacity={.5}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.text}>
                                Adicionar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}