import React from 'react';
import { Modal, ModalProps, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = ModalProps & {
    onReturnPress: () => void;
}

export function PauseModal({ onReturnPress, ...rest }: Props){
    return(
        <Modal
            animationType="slide"
            transparent={true}
            {...rest}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Pausado</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onReturnPress}
                    style={[styles.button, { backgroundColor: theme.colors.white_smoke }]}
                >
                    <Text style={styles.text}>Retomar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.button, { backgroundColor: "red" }]}
                >
                    <Text style={[styles.text, { color: 'white' }]}>Sair</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}